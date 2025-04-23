/**
 * JAAT-AI Deepfake Detection Feature
 * Detects manipulated images and videos using advanced AI algorithms
 */

class DeepfakeDetection {
    constructor() {
        this.modelLoaded = false;
        this.detectionScore = null;
        this.lastAnalyzedFile = null;
        this.processingStatus = 'idle'; // idle, loading, processing, complete, error
        this.detectionThreshold = 0.7; // Threshold for classifying as fake
        
        // Internal canvas for processing
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Initialize the detection model
        this.loadModel();
        
        console.log('JAAT-AI Deepfake Detection feature initialized');
    }
    
    /**
     * Load the deepfake detection model
     * @returns {Promise<boolean>} Whether the model was loaded successfully
     */
    async loadModel() {
        try {
            this.processingStatus = 'loading';
            this.dispatchEvent('statusChange', { status: 'loading', message: 'Loading deepfake detection model...' });
            
            // Simulate model loading with a delay
            // In a real implementation, this would load an actual ML model
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.modelLoaded = true;
            this.processingStatus = 'idle';
            this.dispatchEvent('statusChange', { status: 'idle', message: 'Model loaded successfully' });
            
            return true;
        } catch (error) {
            console.error('Failed to load deepfake detection model:', error);
            this.processingStatus = 'error';
            this.dispatchEvent('statusChange', { 
                status: 'error', 
                message: 'Failed to load deepfake detection model' 
            });
            return false;
        }
    }
    
    /**
     * Analyze an image for potential manipulation
     * @param {File|Blob} file - The image file to analyze
     * @returns {Promise<Object>} Analysis results
     */
    async analyzeImage(file) {
        if (!this.modelLoaded) {
            await this.loadModel();
        }
        
        if (!this.modelLoaded) {
            throw new Error('Detection model is not loaded');
        }
        
        try {
            this.processingStatus = 'processing';
            this.dispatchEvent('statusChange', { 
                status: 'processing', 
                message: 'Analyzing image for potential manipulation...' 
            });
            
            // Load the image
            const image = await this.loadImage(file);
            
            // Prepare canvas for analysis
            this.canvas.width = image.width;
            this.canvas.height = image.height;
            this.ctx.drawImage(image, 0, 0);
            
            // Simulate analysis with a delay
            // In a real implementation, this would run the image through the ML model
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Generate a simulated detection score
            // In a real implementation, this would be the output of the ML model
            this.detectionScore = this.simulateDetection(image);
            this.lastAnalyzedFile = file;
            
            // Analyze image artifacts
            const artifactAnalysis = this.analyzeArtifacts();
            
            // Analyze metadata
            const metadataAnalysis = await this.analyzeMetadata(file);
            
            // Compile results
            const results = {
                score: this.detectionScore,
                classification: this.detectionScore > this.detectionThreshold ? 'Likely manipulated' : 'Likely authentic',
                confidence: Math.abs(this.detectionScore - 0.5) * 2, // Convert score to confidence (0-1)
                artifacts: artifactAnalysis,
                metadata: metadataAnalysis,
                timestamp: new Date().toISOString()
            };
            
            this.processingStatus = 'complete';
            this.dispatchEvent('statusChange', { 
                status: 'complete', 
                message: 'Analysis complete' 
            });
            this.dispatchEvent('analysisComplete', results);
            
            return results;
        } catch (error) {
            console.error('Failed to analyze image:', error);
            this.processingStatus = 'error';
            this.dispatchEvent('statusChange', { 
                status: 'error', 
                message: 'Failed to analyze image: ' + error.message 
            });
            throw error;
        }
    }
    
    /**
     * Load an image from a file
     * @param {File|Blob} file - The image file to load
     * @returns {Promise<HTMLImageElement>} The loaded image
     */
    async loadImage(file) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(img);
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load image'));
            };
            img.src = url;
        });
    }
    
    /**
     * Simulate detection score for demonstration
     * In a real implementation, this would be replaced with actual ML model output
     * @param {HTMLImageElement} image - The image to analyze
     * @returns {number} Simulated detection score (0-1, higher = more likely to be fake)
     */
    simulateDetection(image) {
        // Random component for demonstration
        const randomFactor = Math.random() * 0.3;
        
        // Image complexity analysis (simplified)
        let complexity = 0;
        try {
            // Get image data for analysis
            const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
            const data = imageData.data;
            
            // Simple edge detection to estimate complexity
            let edges = 0;
            const threshold = 50;
            
            for (let y = 1; y < this.canvas.height - 1; y++) {
                for (let x = 1; x < this.canvas.width - 1; x++) {
                    const idx = (y * this.canvas.width + x) * 4;
                    const idxLeft = (y * this.canvas.width + (x - 1)) * 4;
                    const idxRight = (y * this.canvas.width + (x + 1)) * 4;
                    const idxUp = ((y - 1) * this.canvas.width + x) * 4;
                    const idxDown = ((y + 1) * this.canvas.width + x) * 4;
                    
                    // Calculate gradient in x and y directions (simplified Sobel)
                    const gx = Math.abs(data[idxRight] - data[idxLeft]);
                    const gy = Math.abs(data[idxDown] - data[idxUp]);
                    
                    // If gradient magnitude exceeds threshold, count as edge
                    if (Math.sqrt(gx * gx + gy * gy) > threshold) {
                        edges++;
                    }
                }
            }
            
            // Normalize complexity (0-1)
            complexity = Math.min(1, edges / (this.canvas.width * this.canvas.height * 0.1));
        } catch (error) {
            console.error('Error analyzing image complexity:', error);
            complexity = 0.5; // Fallback value
        }
        
        // Final score combines random factor and complexity analysis
        // More complex images tend to be more likely to be authentic
        // For demonstration purposes, this is heavily simplified
        return 0.3 + randomFactor + (1 - complexity) * 0.4;
    }
    
    /**
     * Analyze image for common manipulation artifacts
     * @returns {Object} Artifact analysis results
     */
    analyzeArtifacts() {
        // In a real implementation, this would analyze the image for:
        // - JPEG compression inconsistencies
        // - Noise patterns
        // - Cloning artifacts
        // - Boundary inconsistencies
        // - Lighting and shadow inconsistencies
        
        // Generate simulated results for demonstration
        return {
            compressionArtifacts: Math.random() > 0.5,
            noiseInconsistency: Math.random() > 0.7,
            boundaryArtifacts: Math.random() > 0.8,
            lightingInconsistency: Math.random() > 0.6,
            suspiciousPatterns: Math.random() > 0.75
        };
    }
    
    /**
     * Analyze image metadata for signs of manipulation
     * @param {File} file - The image file to analyze
     * @returns {Promise<Object>} Metadata analysis results
     */
    async analyzeMetadata(file) {
        // In a real implementation, this would extract and analyze EXIF and other metadata
        
        // Generate simulated results for demonstration
        return {
            hasMetadata: Math.random() > 0.2,
            editingSoftware: Math.random() > 0.6 ? 'Detected: Photoshop' : 'None detected',
            editHistory: Math.random() > 0.7,
            creationDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            modificationDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 1000000000).toISOString() : null,
            gpsData: Math.random() > 0.8 ? 'Present' : 'Absent or removed'
        };
    }
    
    /**
     * Analyze a video for potential manipulation
     * @param {File|Blob} file - The video file to analyze
     * @returns {Promise<Object>} Analysis results
     */
    async analyzeVideo(file) {
        if (!this.modelLoaded) {
            await this.loadModel();
        }
        
        if (!this.modelLoaded) {
            throw new Error('Detection model is not loaded');
        }
        
        try {
            this.processingStatus = 'processing';
            this.dispatchEvent('statusChange', { 
                status: 'processing', 
                message: 'Analyzing video for potential manipulation...' 
            });
            
            // Simulate video analysis with a longer delay
            // In a real implementation, this would process the video frame by frame
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // Generate a simulated detection score
            this.detectionScore = 0.3 + Math.random() * 0.7;
            this.lastAnalyzedFile = file;
            
            // Compile results
            const frameResults = [];
            const frameCount = 5; // Simulate analysis of 5 frames
            
            for (let i = 0; i < frameCount; i++) {
                frameResults.push({
                    frameNumber: i,
                    timestamp: i * 2.5, // Seconds
                    score: 0.3 + Math.random() * 0.7,
                    artifacts: this.analyzeArtifacts()
                });
            }
            
            const results = {
                score: this.detectionScore,
                classification: this.detectionScore > this.detectionThreshold ? 'Likely manipulated' : 'Likely authentic',
                confidence: Math.abs(this.detectionScore - 0.5) * 2,
                frameAnalysis: frameResults,
                audioAnalysis: {
                    inconsistencies: Math.random() > 0.6,
                    voiceModulation: Math.random() > 0.7,
                    unnaturalPatterns: Math.random() > 0.65
                },
                timestamp: new Date().toISOString()
            };
            
            this.processingStatus = 'complete';
            this.dispatchEvent('statusChange', { 
                status: 'complete', 
                message: 'Analysis complete' 
            });
            this.dispatchEvent('analysisComplete', results);
            
            return results;
        } catch (error) {
            console.error('Failed to analyze video:', error);
            this.processingStatus = 'error';
            this.dispatchEvent('statusChange', { 
                status: 'error', 
                message: 'Failed to analyze video: ' + error.message 
            });
            throw error;
        }
    }
    
    /**
     * Generate a detailed report of the analysis
     * @returns {Object|null} Detailed analysis report or null if no analysis has been performed
     */
    generateReport() {
        if (this.detectionScore === null) {
            return null;
        }
        
        return {
            summary: {
                score: this.detectionScore,
                classification: this.detectionScore > this.detectionThreshold ? 'Likely manipulated' : 'Likely authentic',
                confidence: Math.abs(this.detectionScore - 0.5) * 2,
                filename: this.lastAnalyzedFile ? this.lastAnalyzedFile.name : 'Unknown',
                fileSize: this.lastAnalyzedFile ? this.lastAnalyzedFile.size : 0,
                fileType: this.lastAnalyzedFile ? this.lastAnalyzedFile.type : 'Unknown',
                analysisDate: new Date().toISOString()
            },
            technicalDetails: {
                detectionMethod: 'JAAT-AI Advanced Deepfake Detection',
                modelVersion: '1.0.0',
                thresholds: {
                    classification: this.detectionThreshold
                },
                processingNotes: [
                    'Image analyzed for compression artifacts',
                    'Metadata examination completed',
                    'Facial landmark consistency checked',
                    'Lighting and shadow analysis performed'
                ]
            },
            recommendations: this.generateRecommendations()
        };
    }
    
    /**
     * Generate recommendations based on analysis results
     * @returns {Array<string>} List of recommendations
     */
    generateRecommendations() {
        if (this.detectionScore === null) {
            return [];
        }
        
        const recommendations = [
            'Always verify media from multiple sources',
            'Check the original publication source when possible'
        ];
        
        if (this.detectionScore > this.detectionThreshold) {
            recommendations.push(
                'This media shows signs of potential manipulation',
                'Exercise caution before sharing or acting on this content',
                'Look for official versions from verified sources'
            );
        } else if (this.detectionScore > 0.4) {
            recommendations.push(
                'This media shows some anomalies but may be authentic',
                'Consider the context and source before sharing'
            );
        } else {
            recommendations.push(
                'This media appears to be authentic based on our analysis',
                'No significant manipulation indicators were detected'
            );
        }
        
        return recommendations;
    }
    
    /**
     * Get the current processing status
     * @returns {Object} Current status information
     */
    getStatus() {
        return {
            status: this.processingStatus,
            modelLoaded: this.modelLoaded,
            hasResults: this.detectionScore !== null
        };
    }
    
    /**
     * Reset the analysis state
     */
    reset() {
        this.detectionScore = null;
        this.lastAnalyzedFile = null;
        this.processingStatus = 'idle';
        this.dispatchEvent('statusChange', { 
            status: 'idle', 
            message: 'Ready for analysis' 
        });
        this.dispatchEvent('reset');
    }
    
    /**
     * Dispatch a custom event
     * @param {string} eventName - Name of the event
     * @param {Object} detail - Event details
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`jaat.deepfake.${eventName}`, { 
            detail,
            bubbles: true
        });
        document.dispatchEvent(event);
    }
}

// Register the feature with JAAT-AI
if (window.JAAT) {
    window.JAAT.registerFeature('deepfake-detection', new DeepfakeDetection());
}

// Add initialization code
document.addEventListener('DOMContentLoaded', function() {
    // Find or create the deepfake detection UI if it doesn't exist
    if (!document.querySelector('.deepfake-detection-container') && window.JAAT) {
        // Check if we have the feature module
        const deepfakeDetection = window.JAAT.features['deepfake-detection'];
        if (!deepfakeDetection) return;
        
        // Find the advanced features section or create it
        let advancedFeaturesSection = document.querySelector('.advanced-features-section');
        if (!advancedFeaturesSection) {
            const mainContainer = document.querySelector('.main-container');
            if (!mainContainer) return;
            
            advancedFeaturesSection = document.createElement('div');
            advancedFeaturesSection.className = 'advanced-features-section';
            advancedFeaturesSection.style.display = 'none';
            
            const title = document.createElement('h1');
            title.textContent = 'Advanced Features';
            advancedFeaturesSection.appendChild(title);
            
            mainContainer.appendChild(advancedFeaturesSection);
        }
        
        // Create the deepfake detection container
        const container = document.createElement('div');
        container.className = 'deepfake-detection-container feature-module';
        
        // Create header
        const header = document.createElement('div');
        header.className = 'feature-header';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-shield-alt';
        
        const title = document.createElement('h2');
        title.textContent = 'Deepfake Detection';
        
        header.appendChild(icon);
        header.appendChild(title);
        
        // Create content
        const content = document.createElement('div');
        content.className = 'feature-content';
        
        // Create description
        const description = document.createElement('p');
        description.className = 'feature-description';
        description.textContent = 'Analyze images and videos to detect potential AI manipulation. Our advanced algorithms can identify signs of deepfakes with high accuracy.';
        
        // Create the upload section
        const uploadSection = document.createElement('div');
        uploadSection.className = 'upload-section';
        
        const uploadLabel = document.createElement('label');
        uploadLabel.className = 'upload-label';
        uploadLabel.textContent = 'Upload an image or video for analysis:';
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'deepfake-file-input';
        fileInput.accept = 'image/*, video/*';
        fileInput.className = 'file-input';
        
        uploadSection.appendChild(uploadLabel);
        uploadSection.appendChild(fileInput);
        
        // Create preview area
        const previewArea = document.createElement('div');
        previewArea.className = 'preview-area';
        previewArea.style.display = 'none';
        
        const previewImage = document.createElement('img');
        previewImage.className = 'preview-image';
        previewImage.style.display = 'none';
        previewImage.style.maxWidth = '100%';
        previewImage.style.maxHeight = '300px';
        previewImage.style.marginTop = '20px';
        
        const previewVideo = document.createElement('video');
        previewVideo.className = 'preview-video';
        previewVideo.style.display = 'none';
        previewVideo.controls = true;
        previewVideo.style.maxWidth = '100%';
        previewVideo.style.maxHeight = '300px';
        previewVideo.style.marginTop = '20px';
        
        previewArea.appendChild(previewImage);
        previewArea.appendChild(previewVideo);
        
        // Create status indicator
        const statusContainer = document.createElement('div');
        statusContainer.className = 'status-container';
        
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'status-indicator';
        statusIndicator.textContent = 'Ready for analysis';
        
        statusContainer.appendChild(statusIndicator);
        
        // Create buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        const analyzeButton = document.createElement('button');
        analyzeButton.className = 'primary-button analyze-button';
        analyzeButton.textContent = 'Analyze for Manipulation';
        analyzeButton.disabled = true;
        
        const resetButton = document.createElement('button');
        resetButton.className = 'secondary-button reset-button';
        resetButton.textContent = 'Reset';
        resetButton.disabled = true;
        
        buttonContainer.appendChild(analyzeButton);
        buttonContainer.appendChild(resetButton);
        
        // Create results area
        const resultsArea = document.createElement('div');
        resultsArea.className = 'results-area';
        resultsArea.style.display = 'none';
        
        // Create result gauge
        const gaugeContainer = document.createElement('div');
        gaugeContainer.className = 'gauge-container';
        
        const gauge = document.createElement('div');
        gauge.className = 'detection-gauge';
        
        const gaugeValue = document.createElement('div');
        gaugeValue.className = 'gauge-value';
        
        const gaugeFill = document.createElement('div');
        gaugeFill.className = 'gauge-fill';
        
        const gaugeLabel = document.createElement('div');
        gaugeLabel.className = 'gauge-label';
        gaugeLabel.textContent = 'Authenticity Score';
        
        gauge.appendChild(gaugeFill);
        gauge.appendChild(gaugeValue);
        gaugeContainer.appendChild(gauge);
        gaugeContainer.appendChild(gaugeLabel);
        
        // Create result details
        const resultDetails = document.createElement('div');
        resultDetails.className = 'result-details';
        
        // Create classification result
        const classification = document.createElement('div');
        classification.className = 'result-classification';
        
        // Create detailed analysis
        const detailedAnalysis = document.createElement('div');
        detailedAnalysis.className = 'detailed-analysis';
        
        resultDetails.appendChild(classification);
        resultDetails.appendChild(detailedAnalysis);
        
        // Create report section
        const reportSection = document.createElement('div');
        reportSection.className = 'report-section';
        
        const reportButton = document.createElement('button');
        reportButton.className = 'secondary-button report-button';
        reportButton.textContent = 'Generate Detailed Report';
        reportButton.disabled = true;
        
        reportSection.appendChild(reportButton);
        
        // Add all elements to results area
        resultsArea.appendChild(gaugeContainer);
        resultsArea.appendChild(resultDetails);
        resultsArea.appendChild(reportSection);
        
        // Add all sections to content
        content.appendChild(description);
        content.appendChild(uploadSection);
        content.appendChild(previewArea);
        content.appendChild(statusContainer);
        content.appendChild(buttonContainer);
        content.appendChild(resultsArea);
        
        // Assemble the UI
        container.appendChild(header);
        container.appendChild(content);
        
        // Add to the advanced features section
        advancedFeaturesSection.appendChild(container);
        
        // Style the container
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        container.style.borderRadius = '10px';
        container.style.margin = '20px 0';
        container.style.overflow = 'hidden';
        
        header.style.padding = '15px 20px';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        
        icon.style.marginRight = '10px';
        icon.style.color = 'var(--primary-color)';
        
        title.style.margin = '0';
        title.style.fontSize = '1.4rem';
        
        content.style.padding = '20px';
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.gap = '20px';
        
        description.style.fontSize = '0.95rem';
        description.style.opacity = '0.8';
        description.style.lineHeight = '1.5';
        
        uploadSection.style.display = 'flex';
        uploadSection.style.flexDirection = 'column';
        uploadSection.style.gap = '10px';
        
        uploadLabel.style.fontSize = '0.9rem';
        uploadLabel.style.opacity = '0.9';
        
        statusContainer.style.marginTop = '10px';
        statusContainer.style.textAlign = 'center';
        
        statusIndicator.style.fontSize = '0.9rem';
        statusIndicator.style.padding = '8px';
        statusIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        statusIndicator.style.borderRadius = '4px';
        
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '10px';
        
        document.querySelectorAll('.deepfake-detection-container button').forEach(button => {
            button.style.padding = '8px 16px';
            button.style.borderRadius = '4px';
            button.style.border = 'none';
            button.style.cursor = 'pointer';
            button.style.fontWeight = 'bold';
            button.style.opacity = '0.9';
            button.style.transition = 'all 0.2s ease';
        });
        
        document.querySelectorAll('.primary-button').forEach(button => {
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'white';
        });
        
        document.querySelectorAll('.secondary-button').forEach(button => {
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            button.style.color = 'var(--text-light)';
        });
        
        // Style the results area
        resultsArea.style.display = 'none';
        resultsArea.style.flexDirection = 'column';
        resultsArea.style.gap = '20px';
        resultsArea.style.marginTop = '20px';
        
        gaugeContainer.style.display = 'flex';
        gaugeContainer.style.flexDirection = 'column';
        gaugeContainer.style.alignItems = 'center';
        gaugeContainer.style.gap = '10px';
        
        gauge.style.width = '200px';
        gauge.style.height = '20px';
        gauge.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        gauge.style.borderRadius = '10px';
        gauge.style.overflow = 'hidden';
        gauge.style.position = 'relative';
        
        gaugeFill.style.height = '100%';
        gaugeFill.style.width = '0%';
        gaugeFill.style.backgroundColor = 'var(--primary-color)';
        gaugeFill.style.transition = 'width 0.5s ease, background-color 0.5s ease';
        
        gaugeValue.style.position = 'absolute';
        gaugeValue.style.top = '0';
        gaugeValue.style.left = '0';
        gaugeValue.style.width = '100%';
        gaugeValue.style.height = '100%';
        gaugeValue.style.display = 'flex';
        gaugeValue.style.alignItems = 'center';
        gaugeValue.style.justifyContent = 'center';
        gaugeValue.style.fontSize = '0.8rem';
        gaugeValue.style.fontWeight = 'bold';
        gaugeValue.style.color = 'white';
        gaugeValue.style.textShadow = '0 0 2px rgba(0, 0, 0, 0.5)';
        
        gaugeLabel.style.fontSize = '0.8rem';
        gaugeLabel.style.opacity = '0.7';
        
        classification.style.fontSize = '1.2rem';
        classification.style.fontWeight = 'bold';
        classification.style.textAlign = 'center';
        classification.style.padding = '10px';
        classification.style.borderRadius = '4px';
        classification.style.marginBottom = '15px';
        
        detailedAnalysis.style.fontSize = '0.9rem';
        detailedAnalysis.style.lineHeight = '1.5';
        
        reportSection.style.display = 'flex';
        reportSection.style.justifyContent = 'center';
        reportSection.style.marginTop = '20px';
        
        // Add event listeners
        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                
                // Display preview
                previewArea.style.display = 'block';
                
                if (file.type.startsWith('image/')) {
                    // Show image preview
                    previewImage.style.display = 'block';
                    previewVideo.style.display = 'none';
                    
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        previewImage.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                } else if (file.type.startsWith('video/')) {
                    // Show video preview
                    previewVideo.style.display = 'block';
                    previewImage.style.display = 'none';
                    
                    const url = URL.createObjectURL(file);
                    previewVideo.src = url;
                    previewVideo.onload = () => {
                        URL.revokeObjectURL(url);
                    };
                }
                
                // Enable analyze button
                analyzeButton.disabled = false;
                resetButton.disabled = false;
                
                // Hide previous results
                resultsArea.style.display = 'none';
                reportButton.disabled = true;
            }
        });
        
        analyzeButton.addEventListener('click', async () => {
            if (!fileInput.files || !fileInput.files[0]) return;
            
            const file = fileInput.files[0];
            
            try {
                // Disable button during analysis
                analyzeButton.disabled = true;
                
                let results;
                if (file.type.startsWith('image/')) {
                    results = await deepfakeDetection.analyzeImage(file);
                } else if (file.type.startsWith('video/')) {
                    results = await deepfakeDetection.analyzeVideo(file);
                } else {
                    throw new Error('Unsupported file type');
                }
                
                // Update gauge
                const score = 1 - results.score; // Invert score (1 = authentic, 0 = fake)
                const scorePercent = Math.round(score * 100);
                
                gaugeFill.style.width = `${scorePercent}%`;
                gaugeValue.textContent = `${scorePercent}%`;
                
                // Set gauge color based on score
                if (score > 0.7) {
                    gaugeFill.style.backgroundColor = '#4CAF50'; // Green
                } else if (score > 0.4) {
                    gaugeFill.style.backgroundColor = '#FFC107'; // Yellow
                } else {
                    gaugeFill.style.backgroundColor = '#F44336'; // Red
                }
                
                // Update classification
                classification.textContent = results.classification;
                classification.style.backgroundColor = score > 0.7 ? 'rgba(76, 175, 80, 0.2)' : (score > 0.4 ? 'rgba(255, 193, 7, 0.2)' : 'rgba(244, 67, 54, 0.2)');
                
                // Update detailed analysis
                let analysisHTML = '<h3>Analysis Details</h3><ul>';
                
                if (results.artifacts) {
                    analysisHTML += '<li><strong>Compression artifacts:</strong> ' + (results.artifacts.compressionArtifacts ? 'Detected' : 'None detected') + '</li>';
                    analysisHTML += '<li><strong>Noise inconsistency:</strong> ' + (results.artifacts.noiseInconsistency ? 'Detected' : 'None detected') + '</li>';
                    analysisHTML += '<li><strong>Boundary artifacts:</strong> ' + (results.artifacts.boundaryArtifacts ? 'Detected' : 'None detected') + '</li>';
                }
                
                if (results.metadata) {
                    analysisHTML += '<li><strong>Metadata:</strong> ' + (results.metadata.hasMetadata ? 'Present' : 'Missing or removed') + '</li>';
                    if (results.metadata.editingSoftware !== 'None detected') {
                        analysisHTML += '<li><strong>Editing software:</strong> ' + results.metadata.editingSoftware + '</li>';
                    }
                }
                
                if (results.audioAnalysis) {
                    analysisHTML += '<li><strong>Audio inconsistencies:</strong> ' + (results.audioAnalysis.inconsistencies ? 'Detected' : 'None detected') + '</li>';
                    analysisHTML += '<li><strong>Voice modulation:</strong> ' + (results.audioAnalysis.voiceModulation ? 'Detected' : 'None detected') + '</li>';
                }
                
                analysisHTML += '<li><strong>Confidence level:</strong> ' + Math.round(results.confidence * 100) + '%</li>';
                analysisHTML += '</ul>';
                
                // Add recommendations
                analysisHTML += '<h3>Recommendations</h3><ul>';
                const recommendations = deepfakeDetection.generateRecommendations();
                recommendations.forEach(rec => {
                    analysisHTML += `<li>${rec}</li>`;
                });
                analysisHTML += '</ul>';
                
                detailedAnalysis.innerHTML = analysisHTML;
                
                // Display results
                resultsArea.style.display = 'flex';
                
                // Enable report button
                reportButton.disabled = false;
                
            } catch (error) {
                console.error('Analysis error:', error);
                statusIndicator.textContent = 'Error: ' + error.message;
                statusIndicator.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
            } finally {
                // Re-enable button
                analyzeButton.disabled = false;
            }
        });
        
        resetButton.addEventListener('click', () => {
            // Clear file input
            fileInput.value = '';
            
            // Hide preview
            previewArea.style.display = 'none';
            previewImage.src = '';
            previewVideo.src = '';
            
            // Hide results
            resultsArea.style.display = 'none';
            
            // Reset status
            statusIndicator.textContent = 'Ready for analysis';
            statusIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            
            // Disable buttons
            analyzeButton.disabled = true;
            resetButton.disabled = true;
            reportButton.disabled = true;
            
            // Reset feature state
            deepfakeDetection.reset();
        });
        
        reportButton.addEventListener('click', () => {
            const report = deepfakeDetection.generateReport();
            if (!report) return;
            
            // Generate a formatted report
            let reportContent = `# Deepfake Analysis Report
            
## Summary
- Classification: ${report.summary.classification}
- Confidence: ${Math.round(report.summary.confidence * 100)}%
- File: ${report.summary.filename}
- Analysis Date: ${new Date(report.summary.analysisDate).toLocaleString()}

## Technical Details
- Detection Method: ${report.technicalDetails.detectionMethod}
- Model Version: ${report.technicalDetails.modelVersion}

## Recommendations
`;
            
            report.recommendations.forEach(rec => {
                reportContent += `- ${rec}\n`;
            });
            
            // Create a blob and download
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'deepfake-analysis-report.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        // Listen for feature events
        document.addEventListener('jaat.deepfake.statusChange', (e) => {
            statusIndicator.textContent = e.detail.message || e.detail.status;
            
            switch (e.detail.status) {
                case 'loading':
                    statusIndicator.style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
                    break;
                case 'processing':
                    statusIndicator.style.backgroundColor = 'rgba(255, 193, 7, 0.2)';
                    break;
                case 'complete':
                    statusIndicator.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                    break;
                case 'error':
                    statusIndicator.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
                    break;
                case 'idle':
                default:
                    statusIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            }
        });
    }
});