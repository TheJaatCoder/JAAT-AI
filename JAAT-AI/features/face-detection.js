/**
 * JAAT-AI Face Detection Feature
 * Detect and track faces in webcam or image inputs
 */

class FaceDetection {
    constructor() {
        this.isWebcamActive = false;
        this.stream = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.ctx = null;
        this.faceTracker = null;
        this.faceDetectionInterval = null;
        this.landmarks = [];
        this.detectedFaces = [];
        
        // Configuration
        this.config = {
            detectionInterval: 100, // ms
            drawLandmarks: true,
            drawBoundingBox: true,
            mirrorVideo: true,
            minDetectionConfidence: 0.5,
            landmarkColor: '#00ff00',
            boundingBoxColor: '#ff0000',
            boundingBoxThickness: 2,
            enableExpressionDetection: true,
            enableAgeGenderDetection: false, // Requires additional models
            debugMode: false
        };
        
        // Callback functions
        this.onFaceDetected = null;
        this.onFaceLost = null;
        this.onExpressionDetected = null;
        this.onTrackingStats = null;
    }

    /**
     * Initialize face detection
     * @param {Object} options - Configuration options
     * @returns {Promise<FaceDetection>} This instance
     */
    async init(options = {}) {
        // Apply options
        this.config = { ...this.config, ...options };
        
        try {
            // Try to load face-api.js if available
            if (typeof faceapi !== 'undefined') {
                // Load face-api models if available
                await this.loadModels();
                console.log('Face Detection initialized with face-api.js');
                return this;
            }
            
            console.warn('Face Detection initialized without face-api.js');
            
            // Fallback to using mock implementation until face-api.js is loaded
            this.detectFaces = this.mockDetectFaces;
            
            return this;
        } catch (error) {
            console.error('Error initializing Face Detection:', error);
            throw error;
        }
    }

    /**
     * Load face-api models
     * @returns {Promise<void>}
     */
    async loadModels() {
        if (typeof faceapi === 'undefined') {
            console.warn('face-api.js not loaded');
            return;
        }
        
        try {
            // Determine models path
            const modelsPath = '/models';
            
            // Load required models
            await faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath);
            await faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath);
            
            // Load optional models based on configuration
            if (this.config.enableExpressionDetection) {
                await faceapi.nets.faceExpressionNet.loadFromUri(modelsPath);
            }
            
            if (this.config.enableAgeGenderDetection) {
                await faceapi.nets.ageGenderNet.loadFromUri(modelsPath);
            }
            
            console.log('Face-api models loaded successfully');
        } catch (error) {
            console.error('Error loading face-api models:', error);
            throw error;
        }
    }

    /**
     * Start webcam and face detection
     * @param {HTMLVideoElement|string} videoElement - Video element or selector
     * @param {HTMLCanvasElement|string} canvasElement - Canvas element or selector
     * @returns {Promise<boolean>} Whether webcam was started successfully
     */
    async startWebcam(videoElement, canvasElement) {
        // Get video element
        if (typeof videoElement === 'string') {
            videoElement = document.querySelector(videoElement);
        }
        
        // Get canvas element
        if (typeof canvasElement === 'string') {
            canvasElement = document.querySelector(canvasElement);
        }
        
        if (!videoElement || !canvasElement) {
            console.error('Video or canvas element not found');
            return false;
        }
        
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        
        // Configure canvas
        this.canvasElement.width = this.videoElement.width;
        this.canvasElement.height = this.videoElement.height;
        
        // Stop any existing stream
        this.stopWebcam();
        
        try {
            // Request webcam access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            });
            
            // Set video source
            this.videoElement.srcObject = this.stream;
            
            // Wait for video to load metadata
            await new Promise((resolve) => {
                this.videoElement.onloadedmetadata = () => {
                    resolve();
                };
            });
            
            // Start playing
            await this.videoElement.play();
            
            // Update canvas dimensions to match video
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;
            
            // Start face detection
            this.startFaceDetection();
            
            this.isWebcamActive = true;
            return true;
        } catch (error) {
            console.error('Error starting webcam:', error);
            return false;
        }
    }

    /**
     * Stop webcam and face detection
     */
    stopWebcam() {
        // Stop face detection
        this.stopFaceDetection();
        
        // Stop webcam stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        // Clear video source
        if (this.videoElement) {
            this.videoElement.srcObject = null;
        }
        
        this.isWebcamActive = false;
    }

    /**
     * Start face detection
     */
    startFaceDetection() {
        // Stop any existing detection
        this.stopFaceDetection();
        
        // Start detection loop
        this.faceDetectionInterval = setInterval(() => {
            this.detectFaces();
        }, this.config.detectionInterval);
    }

    /**
     * Stop face detection
     */
    stopFaceDetection() {
        if (this.faceDetectionInterval) {
            clearInterval(this.faceDetectionInterval);
            this.faceDetectionInterval = null;
        }
    }

    /**
     * Detect faces in video element
     */
    async detectFaces() {
        if (!this.videoElement || !this.ctx || typeof faceapi === 'undefined') {
            return;
        }
        
        try {
            // Get face-api detections
            const detectionOptions = new faceapi.TinyFaceDetectorOptions({
                inputSize: 224,
                scoreThreshold: this.config.minDetectionConfidence
            });
            
            // Prepare detection options
            let detectionTask = faceapi.detectAllFaces(this.videoElement, detectionOptions);
            
            // Add landmarks
            detectionTask = detectionTask.withFaceLandmarks();
            
            // Add expressions if enabled
            if (this.config.enableExpressionDetection) {
                detectionTask = detectionTask.withFaceExpressions();
            }
            
            // Add age and gender if enabled
            if (this.config.enableAgeGenderDetection) {
                detectionTask = detectionTask.withAgeAndGender();
            }
            
            // Get results
            const detections = await detectionTask;
            
            // Store detected faces
            const previousFaceCount = this.detectedFaces.length;
            this.detectedFaces = detections;
            
            // Call callbacks
            if (detections.length > 0) {
                if (previousFaceCount === 0 && typeof this.onFaceDetected === 'function') {
                    this.onFaceDetected(detections);
                }
                
                // Expression detection
                if (this.config.enableExpressionDetection && typeof this.onExpressionDetected === 'function') {
                    for (const detection of detections) {
                        if (detection.expressions) {
                            // Find dominant expression
                            const expressions = detection.expressions;
                            let dominantExpression = Object.keys(expressions)[0];
                            let maxScore = expressions[dominantExpression];
                            
                            for (const expression in expressions) {
                                if (expressions[expression] > maxScore) {
                                    dominantExpression = expression;
                                    maxScore = expressions[expression];
                                }
                            }
                            
                            if (maxScore > 0.5) { // Only report confident expressions
                                this.onExpressionDetected(dominantExpression, maxScore, detection);
                            }
                        }
                    }
                }
            } else if (previousFaceCount > 0 && typeof this.onFaceLost === 'function') {
                this.onFaceLost();
            }
            
            // Report tracking stats
            if (typeof this.onTrackingStats === 'function') {
                this.onTrackingStats({
                    faceCount: detections.length,
                    processingTime: 0, // Not available in this implementation
                    frameRate: 0 // Not available in this implementation
                });
            }
            
            // Draw detections if configured
            this.drawDetections(detections);
            
        } catch (error) {
            console.error('Error detecting faces:', error);
        }
    }

    /**
     * Mock face detection for fallback
     */
    mockDetectFaces() {
        if (!this.videoElement || !this.ctx) {
            return;
        }
        
        // Draw video frame on canvas
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        
        if (this.config.mirrorVideo) {
            this.ctx.save();
            this.ctx.translate(this.canvasElement.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        
        // Show message about face-api not being loaded
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvasElement.width, 40);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('Face detection requires face-api.js library', this.canvasElement.width / 2, 20);
    }

    /**
     * Draw face detections on canvas
     * @param {Array} detections - Face detections from face-api
     */
    drawDetections(detections) {
        if (!this.ctx) {
            return;
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        
        // Draw video frame on canvas
        if (this.config.mirrorVideo) {
            this.ctx.save();
            this.ctx.translate(this.canvasElement.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
        }
        
        // Create face-api canvas if available
        if (typeof faceapi !== 'undefined' && detections.length > 0) {
            const displaySize = { width: this.canvasElement.width, height: this.canvasElement.height };
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            
            if (this.config.mirrorVideo) {
                // Mirror detections for mirrored video
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.canvasElement.width, 0);
            }
            
            // Draw bounding boxes
            if (this.config.drawBoundingBox) {
                faceapi.draw.drawDetections(this.canvasElement, resizedDetections, {
                    boxColor: this.config.boundingBoxColor,
                    lineWidth: this.config.boundingBoxThickness
                });
            }
            
            // Draw landmarks
            if (this.config.drawLandmarks) {
                faceapi.draw.drawFaceLandmarks(this.canvasElement, resizedDetections, {
                    lineWidth: 1,
                    color: this.config.landmarkColor
                });
            }
            
            // Draw expressions if enabled
            if (this.config.enableExpressionDetection) {
                faceapi.draw.drawFaceExpressions(this.canvasElement, resizedDetections);
            }
            
            if (this.config.mirrorVideo) {
                this.ctx.restore();
            }
            
            // Draw debug info
            if (this.config.debugMode) {
                this.drawDebugInfo(detections);
            }
        }
    }

    /**
     * Draw debug information on canvas
     * @param {Array} detections - Face detections
     */
    drawDebugInfo(detections) {
        if (!this.ctx) {
            return;
        }
        
        // Draw debug panel
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(10, 10, 220, 30 + detections.length * 20);
        
        // Draw debug text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(`Detected faces: ${detections.length}`, 20, 20);
        
        // Draw face details
        for (let i = 0; i < detections.length; i++) {
            const detection = detections[i];
            let infoText = `Face ${i + 1}:`;
            
            // Add confidence
            if (detection.detection) {
                infoText += ` Score ${detection.detection.score.toFixed(2)}`;
            }
            
            // Add expression
            if (detection.expressions) {
                // Find dominant expression
                let dominantExpression = Object.keys(detection.expressions)[0];
                let maxScore = detection.expressions[dominantExpression];
                
                for (const expression in detection.expressions) {
                    if (detection.expressions[expression] > maxScore) {
                        dominantExpression = expression;
                        maxScore = detection.expressions[expression];
                    }
                }
                
                infoText += ` | ${dominantExpression} (${maxScore.toFixed(2)})`;
            }
            
            // Add age and gender
            if (detection.age) {
                infoText += ` | Age: ${Math.round(detection.age)}`;
            }
            
            if (detection.gender) {
                infoText += ` | ${detection.gender} (${detection.genderProbability.toFixed(2)})`;
            }
            
            this.ctx.fillText(infoText, 20, 40 + i * 20);
        }
    }

    /**
     * Detect faces in an image element
     * @param {HTMLImageElement|string} imageElement - Image element or selector
     * @param {HTMLCanvasElement|string} canvasElement - Canvas element or selector
     * @returns {Promise<Array>} Detected faces
     */
    async detectFacesInImage(imageElement, canvasElement) {
        // Get image element
        if (typeof imageElement === 'string') {
            imageElement = document.querySelector(imageElement);
        }
        
        // Get canvas element
        if (typeof canvasElement === 'string') {
            canvasElement = document.querySelector(canvasElement);
        }
        
        if (!imageElement || !canvasElement) {
            console.error('Image or canvas element not found');
            return [];
        }
        
        this.canvasElement = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        
        // Configure canvas
        this.canvasElement.width = imageElement.width || imageElement.naturalWidth;
        this.canvasElement.height = imageElement.height || imageElement.naturalHeight;
        
        // Draw image on canvas
        this.ctx.drawImage(imageElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
        
        if (typeof faceapi === 'undefined') {
            console.warn('face-api.js not loaded');
            return [];
        }
        
        try {
            // Get face-api detections
            const detectionOptions = new faceapi.TinyFaceDetectorOptions({
                inputSize: 224,
                scoreThreshold: this.config.minDetectionConfidence
            });
            
            // Prepare detection options
            let detectionTask = faceapi.detectAllFaces(imageElement, detectionOptions);
            
            // Add landmarks
            detectionTask = detectionTask.withFaceLandmarks();
            
            // Add expressions if enabled
            if (this.config.enableExpressionDetection) {
                detectionTask = detectionTask.withFaceExpressions();
            }
            
            // Add age and gender if enabled
            if (this.config.enableAgeGenderDetection) {
                detectionTask = detectionTask.withAgeAndGender();
            }
            
            // Get results
            const detections = await detectionTask;
            
            // Store detected faces
            this.detectedFaces = detections;
            
            // Draw detections
            this.drawDetections(detections);
            
            return detections;
        } catch (error) {
            console.error('Error detecting faces in image:', error);
            return [];
        }
    }

    /**
     * Capture a single frame from the webcam
     * @returns {string|null} Data URL of captured frame or null if webcam is not active
     */
    captureFrame() {
        if (!this.isWebcamActive || !this.videoElement || !this.canvasElement || !this.ctx) {
            return null;
        }
        
        try {
            // Create temporary canvas to capture the original frame
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = this.videoElement.videoWidth;
            tempCanvas.height = this.videoElement.videoHeight;
            const tempCtx = tempCanvas.getContext('2d');
            
            // Draw video frame
            if (this.config.mirrorVideo) {
                tempCtx.save();
                tempCtx.translate(tempCanvas.width, 0);
                tempCtx.scale(-1, 1);
                tempCtx.drawImage(this.videoElement, 0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.restore();
            } else {
                tempCtx.drawImage(this.videoElement, 0, 0, tempCanvas.width, tempCanvas.height);
            }
            
            // Convert to data URL
            return tempCanvas.toDataURL('image/png');
        } catch (error) {
            console.error('Error capturing frame:', error);
            return null;
        }
    }

    /**
     * Capture a frame with face detections drawn
     * @returns {string|null} Data URL of frame with detections or null if webcam is not active
     */
    captureFrameWithDetections() {
        if (!this.isWebcamActive || !this.canvasElement) {
            return null;
        }
        
        try {
            // Convert current canvas (with detections) to data URL
            return this.canvasElement.toDataURL('image/png');
        } catch (error) {
            console.error('Error capturing frame with detections:', error);
            return null;
        }
    }

    /**
     * Create face detection UI
     * @param {HTMLElement|string} container - Container element or selector
     * @returns {HTMLElement} The created UI
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Create UI container
        const uiContainer = document.createElement('div');
        uiContainer.className = 'face-detection-container';
        container.appendChild(uiContainer);
        
        // Create video container
        const videoContainer = document.createElement('div');
        videoContainer.className = 'face-detection-video-container';
        uiContainer.appendChild(videoContainer);
        
        // Create video element
        const videoElement = document.createElement('video');
        videoElement.className = 'face-detection-video';
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('autoplay', '');
        videoElement.width = 640;
        videoElement.height = 480;
        videoContainer.appendChild(videoElement);
        
        // Create canvas element
        const canvasElement = document.createElement('canvas');
        canvasElement.className = 'face-detection-canvas';
        canvasElement.width = 640;
        canvasElement.height = 480;
        videoContainer.appendChild(canvasElement);
        
        // Create controls container
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'face-detection-controls';
        uiContainer.appendChild(controlsContainer);
        
        // Create start/stop button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'face-detection-toggle-btn';
        toggleButton.textContent = 'Start Camera';
        toggleButton.addEventListener('click', async () => {
            if (this.isWebcamActive) {
                this.stopWebcam();
                toggleButton.textContent = 'Start Camera';
                captureButton.disabled = true;
                statusText.textContent = 'Camera stopped';
            } else {
                const started = await this.startWebcam(videoElement, canvasElement);
                if (started) {
                    toggleButton.textContent = 'Stop Camera';
                    captureButton.disabled = false;
                    statusText.textContent = 'Camera active, detecting faces...';
                } else {
                    statusText.textContent = 'Failed to start camera';
                }
            }
        });
        controlsContainer.appendChild(toggleButton);
        
        // Create capture button
        const captureButton = document.createElement('button');
        captureButton.className = 'face-detection-capture-btn';
        captureButton.textContent = 'Capture Photo';
        captureButton.disabled = true;
        captureButton.addEventListener('click', () => {
            const imageData = this.captureFrameWithDetections();
            if (imageData) {
                // Create preview of captured image
                const preview = document.createElement('div');
                preview.className = 'face-detection-preview';
                
                const previewImage = document.createElement('img');
                previewImage.src = imageData;
                previewImage.alt = 'Captured photo';
                previewImage.className = 'face-detection-preview-img';
                preview.appendChild(previewImage);
                
                // Create download link
                const downloadLink = document.createElement('a');
                downloadLink.href = imageData;
                downloadLink.download = `face-detection-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
                downloadLink.className = 'face-detection-download-btn';
                downloadLink.textContent = 'Download';
                preview.appendChild(downloadLink);
                
                // Create close button
                const closeButton = document.createElement('button');
                closeButton.className = 'face-detection-close-btn';
                closeButton.textContent = 'Close';
                closeButton.addEventListener('click', () => {
                    uiContainer.removeChild(preview);
                });
                preview.appendChild(closeButton);
                
                uiContainer.appendChild(preview);
                
                statusText.textContent = 'Photo captured';
            } else {
                statusText.textContent = 'Failed to capture photo';
            }
        });
        controlsContainer.appendChild(captureButton);
        
        // Create settings button
        const settingsButton = document.createElement('button');
        settingsButton.className = 'face-detection-settings-btn';
        settingsButton.textContent = 'Settings';
        settingsButton.addEventListener('click', () => {
            if (settingsPanel.style.display === 'none') {
                settingsPanel.style.display = 'block';
            } else {
                settingsPanel.style.display = 'none';
            }
        });
        controlsContainer.appendChild(settingsButton);
        
        // Create status text
        const statusText = document.createElement('div');
        statusText.className = 'face-detection-status';
        statusText.textContent = 'Ready';
        controlsContainer.appendChild(statusText);
        
        // Create settings panel
        const settingsPanel = document.createElement('div');
        settingsPanel.className = 'face-detection-settings-panel';
        settingsPanel.style.display = 'none';
        uiContainer.appendChild(settingsPanel);
        
        // Add settings options
        const createCheckboxOption = (id, label, checked, onChange) => {
            const container = document.createElement('div');
            container.className = 'face-detection-setting';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            checkbox.checked = checked;
            checkbox.addEventListener('change', () => {
                onChange(checkbox.checked);
            });
            
            const labelElement = document.createElement('label');
            labelElement.htmlFor = id;
            labelElement.textContent = label;
            
            container.appendChild(checkbox);
            container.appendChild(labelElement);
            
            return container;
        };
        
        // Draw landmarks option
        settingsPanel.appendChild(
            createCheckboxOption('draw-landmarks', 'Draw Facial Landmarks', this.config.drawLandmarks, (checked) => {
                this.config.drawLandmarks = checked;
            })
        );
        
        // Draw bounding box option
        settingsPanel.appendChild(
            createCheckboxOption('draw-box', 'Draw Bounding Box', this.config.drawBoundingBox, (checked) => {
                this.config.drawBoundingBox = checked;
            })
        );
        
        // Mirror video option
        settingsPanel.appendChild(
            createCheckboxOption('mirror-video', 'Mirror Video', this.config.mirrorVideo, (checked) => {
                this.config.mirrorVideo = checked;
            })
        );
        
        // Expression detection option
        settingsPanel.appendChild(
            createCheckboxOption('expression-detection', 'Detect Expressions', this.config.enableExpressionDetection, (checked) => {
                this.config.enableExpressionDetection = checked;
            })
        );
        
        // Debug mode option
        settingsPanel.appendChild(
            createCheckboxOption('debug-mode', 'Debug Mode', this.config.debugMode, (checked) => {
                this.config.debugMode = checked;
            })
        );
        
        // Set up face detection events
        this.onFaceDetected = (detections) => {
            statusText.textContent = `Detected ${detections.length} face(s)`;
        };
        
        this.onFaceLost = () => {
            statusText.textContent = 'No faces detected';
        };
        
        this.onExpressionDetected = (expression, confidence) => {
            if (this.config.debugMode) {
                statusText.textContent = `Expression: ${expression} (${(confidence * 100).toFixed(0)}%)`;
            }
        };
        
        // Add styles
        this.addUIStyles();
        
        return uiContainer;
    }

    /**
     * Add CSS styles for the UI
     */
    addUIStyles() {
        const styleId = 'face-detection-styles';
        
        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }
        
        const style = document.createElement('style');
        style.id = styleId;
        
        style.textContent = `
            .face-detection-container {
                font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif);
                background-color: var(--bg-secondary, #161b22);
                border-radius: var(--radius, 0.5rem);
                padding: 1rem;
                margin: 1rem 0;
                box-shadow: 0 4px 6px var(--shadow-color, rgba(0, 0, 0, 0.1));
                max-width: 100%;
                overflow: hidden;
            }
            
            .face-detection-video-container {
                position: relative;
                width: 100%;
                max-width: 640px;
                margin: 0 auto;
                border-radius: 0.5rem;
                overflow: hidden;
                background-color: #000;
            }
            
            .face-detection-video {
                display: block;
                width: 100%;
                height: auto;
                max-height: 480px;
                object-fit: cover;
            }
            
            .face-detection-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .face-detection-controls {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .face-detection-toggle-btn,
            .face-detection-capture-btn,
            .face-detection-settings-btn,
            .face-detection-download-btn,
            .face-detection-close-btn {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: var(--radius-sm, 0.375rem);
                background-color: var(--accent-primary, #7c3aed);
                color: white;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.2s;
            }
            
            .face-detection-toggle-btn:hover,
            .face-detection-capture-btn:hover,
            .face-detection-settings-btn:hover,
            .face-detection-download-btn:hover,
            .face-detection-close-btn:hover {
                background-color: var(--accent-hover, #6d28d9);
                transform: translateY(-1px);
            }
            
            .face-detection-toggle-btn:active,
            .face-detection-capture-btn:active,
            .face-detection-settings-btn:active,
            .face-detection-download-btn:active,
            .face-detection-close-btn:active {
                transform: translateY(0);
            }
            
            .face-detection-toggle-btn:disabled,
            .face-detection-capture-btn:disabled,
            .face-detection-settings-btn:disabled,
            .face-detection-download-btn:disabled,
            .face-detection-close-btn:disabled {
                background-color: var(--border-color, #30363d);
                color: var(--text-secondary, #8b949e);
                cursor: not-allowed;
                transform: none;
            }
            
            .face-detection-settings-btn {
                background-color: var(--bg-primary, #0d1117);
                color: var(--text-primary, #f0f6fc);
                border: 1px solid var(--border-color, #30363d);
            }
            
            .face-detection-settings-btn:hover {
                background-color: var(--bg-secondary, #161b22);
            }
            
            .face-detection-status {
                margin-left: auto;
                color: var(--text-secondary, #8b949e);
                font-size: 0.875rem;
            }
            
            .face-detection-settings-panel {
                margin-top: 1rem;
                padding: 1rem;
                background-color: var(--bg-primary, #0d1117);
                border-radius: var(--radius-sm, 0.375rem);
                border: 1px solid var(--border-color, #30363d);
            }
            
            .face-detection-setting {
                display: flex;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .face-detection-setting input[type="checkbox"] {
                margin-right: 0.5rem;
            }
            
            .face-detection-setting label {
                color: var(--text-primary, #f0f6fc);
                font-size: 0.875rem;
            }
            
            .face-detection-preview {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 2rem;
            }
            
            .face-detection-preview-img {
                max-width: 100%;
                max-height: 80vh;
                border-radius: var(--radius, 0.5rem);
                margin-bottom: 1rem;
            }
            
            .face-detection-download-btn {
                margin-right: 0.5rem;
            }
            
            .face-detection-close-btn {
                background-color: var(--error-color, #f87171);
            }
            
            .face-detection-close-btn:hover {
                background-color: var(--error-color, #ef4444);
            }
            
            @media (max-width: 640px) {
                .face-detection-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .face-detection-status {
                    margin: 0.5rem 0 0 0;
                    text-align: center;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FaceDetection };
} else {
    // Add to global scope for browser usage
    window.FaceDetection = FaceDetection;
}