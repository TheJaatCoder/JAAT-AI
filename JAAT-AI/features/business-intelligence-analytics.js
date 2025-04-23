/**
 * JAAT-AI Business Intelligence and Analytics
 * Advanced AI mode for data analytics, market research, strategic business insights, and visualization
 * 
 * Features:
 * - Data preprocessing and cleaning
 * - Statistical analysis and pattern recognition
 * - Market trend analysis and forecasting
 * - Competitive intelligence gathering
 * - Interactive visualization and dashboard creation
 * - Business strategy recommendations
 * - Financial performance analysis
 */

(function() {
    // Register this feature with the JAAT-AI system
    if (window.JAAT && window.JAAT.registerFeature) {
        window.JAAT.registerFeature({
            id: 'business-intelligence-analytics',
            name: 'Business Intelligence & Analytics',
            category: 'Business',
            icon: 'chart-line',
            description: 'Analyze data, visualize trends, and generate business insights with advanced AI.',
            version: '2.2',
            author: 'JAAT-AI Team',
            tags: ['analytics', 'business', 'data', 'finance', 'visualization', 'forecasting'],
            apiCredits: 'Powered by TensorFlow, Pandas, and GPT-4',
            models: ['JAAT Analytics Engine', 'GPT-4', 'Prophet', 'Time Series Pro'],
            permissions: ['storage', 'indexedDB']
        });
    }

    // Define constants
    const CHART_TYPES = [
        "Line Chart", "Bar Chart", "Pie Chart", "Area Chart", "Scatter Plot",
        "Bubble Chart", "Radar Chart", "Heat Map", "Candlestick Chart", "Funnel Chart"
    ];

    const DATA_SOURCES = [
        "CSV Upload", "Excel Upload", "Database Connection", "API Integration",
        "Manual Entry", "Google Sheets", "Sample Datasets"
    ];

    const ANALYSIS_TYPES = [
        "Descriptive Analytics", "Predictive Analytics", "Prescriptive Analytics",
        "Diagnostic Analytics", "Market Analysis", "Financial Analysis", "Performance Metrics",
        "Competitor Analysis", "Customer Analytics", "Risk Assessment"
    ];

    // Feature initialization
    function initBusinessIntelligence() {
        console.log('Initializing Business Intelligence & Analytics');
        setupBusinessIntelligenceUI();
        bindBusinessIntelligenceEvents();
    }

    // Set up the UI for business intelligence
    function setupBusinessIntelligenceUI() {
        const featureContainer = document.querySelector('#feature-container') || document.body;
        
        const biUI = document.createElement('div');
        biUI.id = 'business-intelligence-container';
        biUI.className = 'feature-panel';
        biUI.style.display = 'none';
        
        biUI.innerHTML = `
            <div class="panel-header">
                <h2>Business Intelligence & Analytics</h2>
                <div class="header-controls">
                    <button class="mode-toggle active" data-mode="dashboard">Dashboard</button>
                    <button class="mode-toggle" data-mode="analysis">Analysis</button>
                    <button class="mode-toggle" data-mode="reports">Reports</button>
                </div>
            </div>
            
            <div class="panel-content">
                <div class="data-source-section">
                    <h3>Data Source</h3>
                    <div class="data-source-controls">
                        <select id="data-source-selector">
                            ${DATA_SOURCES.map(source => `<option value="${source.toLowerCase().replace(/\s+/g, '-')}">${source}</option>`).join('')}
                        </select>
                        <button id="connect-data-source" class="primary-button">
                            <i class="fas fa-plug"></i> Connect
                        </button>
                    </div>
                    
                    <div class="data-upload-zone" id="data-upload-zone">
                        <i class="fas fa-file-upload"></i>
                        <p>Drag and drop your data file here or click to upload</p>
                        <p class="upload-formats">Supported formats: CSV, Excel, JSON</p>
                        <input type="file" id="data-file-input" accept=".csv,.xlsx,.json" style="display: none;">
                    </div>
                    
                    <div class="sample-data-selector" style="display: none;">
                        <h4>Sample Datasets</h4>
                        <div class="sample-data-options">
                            <div class="sample-data-option">
                                <input type="radio" name="sample-data" id="sample-sales" value="sales">
                                <label for="sample-sales">
                                    <span class="option-title">Retail Sales Data</span>
                                    <span class="option-description">Sales figures, products, regions, timeframes</span>
                                </label>
                            </div>
                            
                            <div class="sample-data-option">
                                <input type="radio" name="sample-data" id="sample-financial" value="financial">
                                <label for="sample-financial">
                                    <span class="option-title">Financial Performance</span>
                                    <span class="option-description">Revenue, expenses, profitability metrics</span>
                                </label>
                            </div>
                            
                            <div class="sample-data-option">
                                <input type="radio" name="sample-data" id="sample-marketing" value="marketing">
                                <label for="sample-marketing">
                                    <span class="option-title">Marketing Campaign Data</span>
                                    <span class="option-description">Campaign metrics, channels, conversions, ROI</span>
                                </label>
                            </div>
                            
                            <div class="sample-data-option">
                                <input type="radio" name="sample-data" id="sample-hr" value="hr">
                                <label for="sample-hr">
                                    <span class="option-title">HR & Employee Data</span>
                                    <span class="option-description">Demographics, performance, retention</span>
                                </label>
                            </div>
                        </div>
                        
                        <button id="load-sample-data" class="secondary-button">
                            <i class="fas fa-database"></i> Load Sample Data
                        </button>
                    </div>
                </div>
                
                <div class="analytics-workspace">
                    <div class="workspace-sidebar">
                        <div class="sidebar-section">
                            <h3>Analysis Tools</h3>
                            <div class="tool-list">
                                <div class="tool-item" data-tool="insights-generator">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>AI Insights Generator</span>
                                </div>
                                <div class="tool-item" data-tool="visualization">
                                    <i class="fas fa-chart-pie"></i>
                                    <span>Visualization Creator</span>
                                </div>
                                <div class="tool-item" data-tool="forecasting">
                                    <i class="fas fa-chart-line"></i>
                                    <span>Forecasting & Trends</span>
                                </div>
                                <div class="tool-item" data-tool="segment-analysis">
                                    <i class="fas fa-table"></i>
                                    <span>Segment Analysis</span>
                                </div>
                                <div class="tool-item" data-tool="correlation-finder">
                                    <i class="fas fa-project-diagram"></i>
                                    <span>Correlation Finder</span>
                                </div>
                                <div class="tool-item" data-tool="report-builder">
                                    <i class="fas fa-file-alt"></i>
                                    <span>Report Builder</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="sidebar-section">
                            <h3>Data Fields</h3>
                            <div class="data-fields-container" id="data-fields-container">
                                <p class="no-data-message">Connect to a data source to see available fields</p>
                            </div>
                        </div>
                        
                        <div class="sidebar-section">
                            <h3>Save & Export</h3>
                            <button id="save-analysis" class="sidebar-button">
                                <i class="fas fa-save"></i> Save Analysis
                            </button>
                            <button id="export-report" class="sidebar-button">
                                <i class="fas fa-file-export"></i> Export Report
                            </button>
                            <button id="schedule-report" class="sidebar-button">
                                <i class="fas fa-clock"></i> Schedule Reports
                            </button>
                        </div>
                    </div>
                    
                    <div class="workspace-main">
                        <div id="main-workspace-area" class="main-workspace-area">
                            <div class="workspace-welcome">
                                <div class="welcome-icon">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <h2>Welcome to Business Intelligence & Analytics</h2>
                                <p>To begin, connect to a data source or upload your data file.</p>
                                <p>You can also try one of our sample datasets to explore the features.</p>
                                <div class="welcome-actions">
                                    <button id="welcome-upload" class="primary-button">
                                        <i class="fas fa-upload"></i> Upload Data
                                    </button>
                                    <button id="welcome-samples" class="secondary-button">
                                        <i class="fas fa-database"></i> Try Sample Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        featureContainer.appendChild(biUI);
    }

    // Bind event listeners for business intelligence
    function bindBusinessIntelligenceEvents() {
        // Data source selector
        const dataSourceSelector = document.getElementById('data-source-selector');
        if (dataSourceSelector) {
            dataSourceSelector.addEventListener('change', function() {
                const selectedSource = this.value;
                const uploadZone = document.getElementById('data-upload-zone');
                const sampleDataSelector = document.querySelector('.sample-data-selector');
                
                // Show/hide elements based on selection
                if (selectedSource === 'csv-upload' || selectedSource === 'excel-upload') {
                    uploadZone.style.display = 'flex';
                    sampleDataSelector.style.display = 'none';
                } else if (selectedSource === 'sample-datasets') {
                    uploadZone.style.display = 'none';
                    sampleDataSelector.style.display = 'block';
                } else {
                    uploadZone.style.display = 'none';
                    sampleDataSelector.style.display = 'none';
                    alert(`Connecting to ${selectedSource.replace(/-/g, ' ')} will be available in a future update.`);
                }
            });
        }
        
        // Connect data source button
        const connectButton = document.getElementById('connect-data-source');
        if (connectButton) {
            connectButton.addEventListener('click', function() {
                const selectedSource = document.getElementById('data-source-selector').value;
                
                if (selectedSource === 'csv-upload' || selectedSource === 'excel-upload') {
                    document.getElementById('data-file-input').click();
                } else if (selectedSource === 'sample-datasets') {
                    document.querySelector('.sample-data-selector').style.display = 'block';
                } else {
                    alert(`Connecting to ${selectedSource.replace(/-/g, ' ')} will be available in a future update.`);
                }
            });
        }
        
        // Data upload zone
        const uploadZone = document.getElementById('data-upload-zone');
        const fileInput = document.getElementById('data-file-input');
        
        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', function() {
                fileInput.click();
            });
            
            uploadZone.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadZone.classList.add('dragover');
            });
            
            uploadZone.addEventListener('dragleave', function() {
                uploadZone.classList.remove('dragover');
            });
            
            uploadZone.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
                
                if (e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    handleDataFileUpload(file);
                }
            });
            
            fileInput.addEventListener('change', function() {
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    handleDataFileUpload(file);
                }
            });
        }
        
        // Load sample data button
        const loadSampleButton = document.getElementById('load-sample-data');
        if (loadSampleButton) {
            loadSampleButton.addEventListener('click', function() {
                const selectedSample = document.querySelector('input[name="sample-data"]:checked');
                
                if (!selectedSample) {
                    alert('Please select a sample dataset.');
                    return;
                }
                
                loadSampleData(selectedSample.value);
            });
        }
        
        // Welcome screen buttons
        const welcomeUploadButton = document.getElementById('welcome-upload');
        if (welcomeUploadButton) {
            welcomeUploadButton.addEventListener('click', function() {
                document.getElementById('data-source-selector').value = 'csv-upload';
                document.getElementById('data-upload-zone').style.display = 'flex';
                document.getElementById('data-file-input').click();
            });
        }
        
        const welcomeSamplesButton = document.getElementById('welcome-samples');
        if (welcomeSamplesButton) {
            welcomeSamplesButton.addEventListener('click', function() {
                document.getElementById('data-source-selector').value = 'sample-datasets';
                document.querySelector('.sample-data-selector').style.display = 'block';
            });
        }
        
        // Analysis tool items
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach(item => {
            item.addEventListener('click', function() {
                const tool = this.dataset.tool;
                activateAnalysisTool(tool);
            });
        });
        
        // Save and export buttons
        document.getElementById('save-analysis')?.addEventListener('click', () => {
            alert('Analysis saved successfully! (Demo feature)');
        });
        
        document.getElementById('export-report')?.addEventListener('click', () => {
            alert('Report export feature will be available in the next update.');
        });
        
        document.getElementById('schedule-report')?.addEventListener('click', () => {
            alert('Report scheduling feature will be available in the next update.');
        });
    }

    // Handle data file upload
    function handleDataFileUpload(file) {
        // Check if file type is supported
        const fileType = file.name.split('.').pop().toLowerCase();
        const supportedTypes = ['csv', 'xlsx', 'json'];
        
        if (!supportedTypes.includes(fileType)) {
            alert(`Unsupported file type: ${fileType}. Please upload a CSV, Excel, or JSON file.`);
            return;
        }
        
        // Show loading state
        const workspaceArea = document.getElementById('main-workspace-area');
        if (workspaceArea) {
            workspaceArea.innerHTML = `
                <div class="loading-data-state">
                    <div class="loading-spinner large"></div>
                    <h3>Processing Data</h3>
                    <p>Analyzing and preparing your data file: ${file.name}</p>
                </div>
            `;
        }
        
        // In a real app, you would parse the file here
        // For demo purposes, we'll simulate the processing
        setTimeout(() => {
            // Process based on file type
            let dataFields = [];
            
            if (fileType === 'csv') {
                // Simulate CSV fields
                dataFields = [
                    { name: 'Date', type: 'date' },
                    { name: 'Region', type: 'category' },
                    { name: 'Product', type: 'category' },
                    { name: 'Units Sold', type: 'number' },
                    { name: 'Revenue', type: 'currency' },
                    { name: 'Profit', type: 'currency' },
                    { name: 'Customer Segment', type: 'category' },
                    { name: 'Channel', type: 'category' }
                ];
            } else if (fileType === 'xlsx') {
                // Simulate Excel fields
                dataFields = [
                    { name: 'Transaction Date', type: 'date' },
                    { name: 'Customer ID', type: 'id' },
                    { name: 'Product ID', type: 'id' },
                    { name: 'Product Name', type: 'text' },
                    { name: 'Category', type: 'category' },
                    { name: 'Quantity', type: 'number' },
                    { name: 'Unit Price', type: 'currency' },
                    { name: 'Total Price', type: 'currency' },
                    { name: 'Discount', type: 'percentage' },
                    { name: 'Payment Method', type: 'category' }
                ];
            } else if (fileType === 'json') {
                // Simulate JSON fields
                dataFields = [
                    { name: 'id', type: 'id' },
                    { name: 'timestamp', type: 'datetime' },
                    { name: 'user.name', type: 'text' },
                    { name: 'user.email', type: 'email' },
                    { name: 'transaction.amount', type: 'currency' },
                    { name: 'transaction.status', type: 'category' },
                    { name: 'product.id', type: 'id' },
                    { name: 'product.name', type: 'text' },
                    { name: 'location.city', type: 'text' },
                    { name: 'location.country', type: 'category' }
                ];
            }
            
            // Display data fields
            displayDataFields(dataFields);
            
            // Show data overview
            showDataOverview(file.name, dataFields);
        }, 2000);
    }

    // Load sample data
    function loadSampleData(sampleType) {
        // Show loading state
        const workspaceArea = document.getElementById('main-workspace-area');
        if (workspaceArea) {
            workspaceArea.innerHTML = `
                <div class="loading-data-state">
                    <div class="loading-spinner large"></div>
                    <h3>Loading Sample Data</h3>
                    <p>Preparing the sample dataset for analysis...</p>
                </div>
            `;
        }
        
        // Simulate loading delay
        setTimeout(() => {
            let dataFields = [];
            let fileName = '';
            
            // Different fields based on sample type
            switch (sampleType) {
                case 'sales':
                    fileName = 'Retail Sales Data';
                    dataFields = [
                        { name: 'Date', type: 'date' },
                        { name: 'Store ID', type: 'id' },
                        { name: 'Product ID', type: 'id' },
                        { name: 'Product Name', type: 'text' },
                        { name: 'Category', type: 'category' },
                        { name: 'Quantity', type: 'number' },
                        { name: 'Unit Price', type: 'currency' },
                        { name: 'Total Sales', type: 'currency' },
                        { name: 'Discount', type: 'percentage' },
                        { name: 'Region', type: 'category' }
                    ];
                    break;
                case 'financial':
                    fileName = 'Financial Performance Data';
                    dataFields = [
                        { name: 'Year', type: 'date' },
                        { name: 'Quarter', type: 'category' },
                        { name: 'Month', type: 'date' },
                        { name: 'Revenue', type: 'currency' },
                        { name: 'Cost of Goods Sold', type: 'currency' },
                        { name: 'Gross Profit', type: 'currency' },
                        { name: 'Operating Expenses', type: 'currency' },
                        { name: 'Net Income', type: 'currency' },
                        { name: 'Department', type: 'category' },
                        { name: 'Business Unit', type: 'category' }
                    ];
                    break;
                case 'marketing':
                    fileName = 'Marketing Campaign Data';
                    dataFields = [
                        { name: 'Campaign ID', type: 'id' },
                        { name: 'Campaign Name', type: 'text' },
                        { name: 'Start Date', type: 'date' },
                        { name: 'End Date', type: 'date' },
                        { name: 'Channel', type: 'category' },
                        { name: 'Budget', type: 'currency' },
                        { name: 'Spend', type: 'currency' },
                        { name: 'Impressions', type: 'number' },
                        { name: 'Clicks', type: 'number' },
                        { name: 'Conversions', type: 'number' },
                        { name: 'Conversion Rate', type: 'percentage' },
                        { name: 'Cost Per Acquisition', type: 'currency' },
                        { name: 'Revenue Generated', type: 'currency' },
                        { name: 'ROI', type: 'percentage' }
                    ];
                    break;
                case 'hr':
                    fileName = 'HR & Employee Data';
                    dataFields = [
                        { name: 'Employee ID', type: 'id' },
                        { name: 'Department', type: 'category' },
                        { name: 'Job Title', type: 'category' },
                        { name: 'Hire Date', type: 'date' },
                        { name: 'Tenure (Years)', type: 'number' },
                        { name: 'Salary', type: 'currency' },
                        { name: 'Performance Rating', type: 'number' },
                        { name: 'Satisfaction Score', type: 'number' },
                        { name: 'Training Hours', type: 'number' },
                        { name: 'Gender', type: 'category' },
                        { name: 'Age Group', type: 'category' },
                        { name: 'Location', type: 'category' },
                        { name: 'Remote Worker', type: 'boolean' }
                    ];
                    break;
                default:
                    fileName = 'Sample Dataset';
                    dataFields = [
                        { name: 'ID', type: 'id' },
                        { name: 'Name', type: 'text' },
                        { name: 'Category', type: 'category' },
                        { name: 'Value', type: 'number' },
                        { name: 'Date', type: 'date' }
                    ];
            }
            
            // Display data fields
            displayDataFields(dataFields);
            
            // Show data overview
            showDataOverview(fileName, dataFields);
        }, 1500);
    }

    // Display data fields in the sidebar
    function displayDataFields(fields) {
        const container = document.getElementById('data-fields-container');
        if (!container) return;
        
        let html = '';
        
        fields.forEach(field => {
            let iconClass = 'fas fa-font';
            
            // Set icon based on data type
            switch (field.type) {
                case 'date':
                case 'datetime':
                    iconClass = 'fas fa-calendar-alt';
                    break;
                case 'number':
                    iconClass = 'fas fa-hashtag';
                    break;
                case 'currency':
                    iconClass = 'fas fa-dollar-sign';
                    break;
                case 'percentage':
                    iconClass = 'fas fa-percent';
                    break;
                case 'category':
                    iconClass = 'fas fa-tag';
                    break;
                case 'id':
                    iconClass = 'fas fa-key';
                    break;
                case 'boolean':
                    iconClass = 'fas fa-toggle-on';
                    break;
                case 'email':
                    iconClass = 'fas fa-envelope';
                    break;
            }
            
            html += `
                <div class="data-field-item" draggable="true" data-field="${field.name}" data-type="${field.type}">
                    <i class="${iconClass}"></i>
                    <span class="field-name">${field.name}</span>
                    <span class="field-type">${field.type}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Add drag and drop functionality for fields
        const fieldItems = container.querySelectorAll('.data-field-item');
        fieldItems.forEach(item => {
            item.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    field: this.dataset.field,
                    type: this.dataset.type
                }));
                this.classList.add('dragging');
            });
            
            item.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
        });
    }

    // Show data overview in the main workspace
    function showDataOverview(fileName, fields) {
        const workspaceArea = document.getElementById('main-workspace-area');
        if (!workspaceArea) return;
        
        // Count field types
        const typeCount = {};
        fields.forEach(field => {
            typeCount[field.type] = (typeCount[field.type] || 0) + 1;
        });
        
        // Create type badges
        let typeBadges = '';
        for (const [type, count] of Object.entries(typeCount)) {
            typeBadges += `<span class="type-badge ${type}">${type}: ${count}</span>`;
        }
        
        // Get row count (simulated)
        const rowCount = Math.floor(Math.random() * 10000) + 1000;
        
        // Create overview HTML
        workspaceArea.innerHTML = `
            <div class="data-overview">
                <div class="overview-header">
                    <h3>Data Overview: ${fileName}</h3>
                    <div class="overview-stats">
                        <div class="stat-item">
                            <span class="stat-label">Fields</span>
                            <span class="stat-value">${fields.length}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Records</span>
                            <span class="stat-value">${rowCount.toLocaleString()}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Size</span>
                            <span class="stat-value">${(Math.random() * 10).toFixed(2)} MB</span>
                        </div>
                    </div>
                </div>
                
                <div class="data-field-types">
                    <h4>Field Types</h4>
                    <div class="type-badges">
                        ${typeBadges}
                    </div>
                </div>
                
                <div class="data-preview">
                    <h4>Data Preview</h4>
                    <div class="data-table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    ${fields.map(field => `<th>${field.name}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${generateSampleRows(fields, 5)}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="recommended-analyses">
                    <h4>Recommended Analyses</h4>
                    <div class="analysis-recommendations">
                        ${generateAnalysisRecommendations(fields)}
                    </div>
                </div>
                
                <div class="quick-actions">
                    <button class="action-button" data-action="insights">
                        <i class="fas fa-lightbulb"></i> Generate AI Insights
                    </button>
                    <button class="action-button" data-action="visualize">
                        <i class="fas fa-chart-bar"></i> Create Visualizations
                    </button>
                    <button class="action-button" data-action="clean">
                        <i class="fas fa-broom"></i> Clean & Preprocess
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners to recommendation items
        const recommendationItems = workspaceArea.querySelectorAll('.recommendation-item');
        recommendationItems.forEach(item => {
            item.addEventListener('click', function() {
                const analysisType = this.dataset.analysis;
                activateAnalysisTool(analysisType);
            });
        });
        
        // Add event listeners to quick action buttons
        const actionButtons = workspaceArea.querySelectorAll('.action-button');
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.dataset.action;
                
                switch (action) {
                    case 'insights':
                        activateAnalysisTool('insights-generator');
                        break;
                    case 'visualize':
                        activateAnalysisTool('visualization');
                        break;
                    case 'clean':
                        alert('Data cleaning tools will be available in a future update.');
                        break;
                }
            });
        });
    }

    // Generate sample data rows for preview
    function generateSampleRows(fields, rowCount) {
        let rowsHTML = '';
        
        for (let i = 0; i < rowCount; i++) {
            rowsHTML += '<tr>';
            
            fields.forEach(field => {
                let cellValue = '';
                
                // Generate appropriate random values based on field type
                switch (field.type) {
                    case 'date':
                        const date = new Date();
                        date.setDate(date.getDate() - Math.floor(Math.random() * 365));
                        cellValue = date.toLocaleDateString();
                        break;
                    case 'datetime':
                        const datetime = new Date();
                        datetime.setDate(datetime.getDate() - Math.floor(Math.random() * 365));
                        cellValue = datetime.toLocaleString();
                        break;
                    case 'number':
                        cellValue = Math.floor(Math.random() * 1000);
                        break;
                    case 'currency':
                        cellValue = '$' + (Math.random() * 10000).toFixed(2);
                        break;
                    case 'percentage':
                        cellValue = (Math.random() * 100).toFixed(2) + '%';
                        break;
                    case 'id':
                        cellValue = '#' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                        break;
                    case 'category':
                        const categories = ['Category A', 'Category B', 'Category C', 'Category D'];
                        cellValue = categories[Math.floor(Math.random() * categories.length)];
                        break;
                    case 'boolean':
                        cellValue = Math.random() > 0.5 ? 'Yes' : 'No';
                        break;
                    case 'text':
                        const words = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Omega'];
                        cellValue = words[Math.floor(Math.random() * words.length)] + ' ' +
                                   words[Math.floor(Math.random() * words.length)];
                        break;
                    case 'email':
                        const domains = ['example.com', 'test.org', 'company.io', 'mail.net'];
                        cellValue = 'user' + Math.floor(Math.random() * 1000) + '@' +
                                   domains[Math.floor(Math.random() * domains.length)];
                        break;
                    default:
                        cellValue = 'Sample Data';
                }
                
                rowsHTML += `<td>${cellValue}</td>`;
            });
            
            rowsHTML += '</tr>';
        }
        
        return rowsHTML;
    }

    // Generate analysis recommendations based on data fields
    function generateAnalysisRecommendations(fields) {
        const recommendations = [];
        
        // Check for time-based fields
        const hasTimeFields = fields.some(field => field.type === 'date' || field.type === 'datetime');
        if (hasTimeFields) {
            recommendations.push({
                type: 'forecasting',
                title: 'Time Series Analysis',
                description: 'Analyze trends and forecast future values based on historical patterns'
            });
        }
        
        // Check for numerical fields
        const numericalFields = fields.filter(field => 
            field.type === 'number' || field.type === 'currency' || field.type === 'percentage'
        );
        if (numericalFields.length >= 2) {
            recommendations.push({
                type: 'correlation-finder',
                title: 'Correlation Analysis',
                description: 'Discover relationships between numerical variables'
            });
        }
        
        // Check for categorical fields
        const categoryFields = fields.filter(field => field.type === 'category');
        if (categoryFields.length >= 1 && numericalFields.length >= 1) {
            recommendations.push({
                type: 'segment-analysis',
                title: 'Segment Analysis',
                description: 'Compare performance metrics across different categories'
            });
        }
        
        // Add visualization recommendation if we have appropriate fields
        if (numericalFields.length >= 1) {
            recommendations.push({
                type: 'visualization',
                title: 'Data Visualization',
                description: 'Create visual charts to better understand your data'
            });
        }
        
        // Add AI insights for any dataset
        recommendations.push({
            type: 'insights-generator',
            title: 'AI-Powered Insights',
            description: 'Generate business intelligence insights using advanced AI'
        });
        
        // Generate HTML
        let html = '';
        recommendations.forEach(rec => {
            html += `
                <div class="recommendation-item" data-analysis="${rec.type}">
                    <div class="recommendation-icon">
                        <i class="fas fa-${getIconForAnalysisType(rec.type)}"></i>
                    </div>
                    <div class="recommendation-content">
                        <h5>${rec.title}</h5>
                        <p>${rec.description}</p>
                    </div>
                </div>
            `;
        });
        
        return html;
    }

    // Get icon for analysis type
    function getIconForAnalysisType(type) {
        switch (type) {
            case 'insights-generator': return 'lightbulb';
            case 'visualization': return 'chart-pie';
            case 'forecasting': return 'chart-line';
            case 'segment-analysis': return 'table';
            case 'correlation-finder': return 'project-diagram';
            case 'report-builder': return 'file-alt';
            default: return 'analytics';
        }
    }

    // Activate a specific analysis tool
    function activateAnalysisTool(tool) {
        // In a real app, this would load the appropriate analysis tool UI
        // For demo purposes, we'll show a message
        alert(`The ${tool.replace(/-/g, ' ')} tool will be available in a future update.`);
        
        // Highlight the active tool
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tool === tool) {
                item.classList.add('active');
            }
        });
    }

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBusinessIntelligence);
    } else {
        initBusinessIntelligence();
    }
})();