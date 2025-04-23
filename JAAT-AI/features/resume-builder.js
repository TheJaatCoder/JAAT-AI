/**
 * JAAT-AI Resume Builder Feature
 * Generate professional resumes with customizable templates
 */

class ResumeBuilder {
    constructor() {
        this.templates = [
            { id: 'modern', name: 'Modern', primaryColor: '#3b82f6' },
            { id: 'classic', name: 'Classic', primaryColor: '#10b981' },
            { id: 'minimal', name: 'Minimal', primaryColor: '#6366f1' },
            { id: 'professional', name: 'Professional', primaryColor: '#f59e0b' },
            { id: 'creative', name: 'Creative', primaryColor: '#ec4899' },
            { id: 'executive', name: 'Executive', primaryColor: '#64748b' }
        ];
        
        this.currentTemplate = this.templates[0];
        this.resumeData = {
            personal: {
                name: '',
                title: '',
                email: '',
                phone: '',
                address: '',
                website: '',
                linkedin: '',
                github: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            interests: []
        };
        
        this.pdfOptions = {
            margin: 20,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
    }

    /**
     * Initialize the resume builder
     * @param {Object} options - Custom default options
     * @returns {Promise<ResumeBuilder>} This instance
     */
    async init(options = {}) {
        // Apply custom options
        Object.assign(this, options);
        
        // Try to load previously saved resume data
        this.loadSavedData();
        
        console.log('Resume Builder initialized');
        return this;
    }

    /**
     * Load previously saved resume data from localStorage
     */
    loadSavedData() {
        try {
            const savedData = localStorage.getItem('jaat-resume-data');
            if (savedData) {
                this.resumeData = JSON.parse(savedData);
                console.log('Loaded saved resume data');
            }
            
            const savedTemplate = localStorage.getItem('jaat-resume-template');
            if (savedTemplate) {
                const template = this.templates.find(t => t.id === savedTemplate);
                if (template) {
                    this.currentTemplate = template;
                }
            }
        } catch (e) {
            console.warn('Failed to load saved resume data:', e);
        }
    }

    /**
     * Save current resume data to localStorage
     */
    saveData() {
        try {
            localStorage.setItem('jaat-resume-data', JSON.stringify(this.resumeData));
            localStorage.setItem('jaat-resume-template', this.currentTemplate.id);
            
            // Show success notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('Resume data saved successfully', 'success');
            }
        } catch (e) {
            console.warn('Failed to save resume data:', e);
            
            // Show error notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('Failed to save resume data', 'error');
            }
        }
    }

    /**
     * Create the resume builder UI
     * @param {HTMLElement|string} container - Container element or ID
     * @returns {HTMLElement} The created UI
     */
    createUI(container) {
        // Get container element
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        
        if (!container) {
            console.error('Container element not found');
            return null;
        }
        
        // Clear container
        container.innerHTML = '';
        
        // Create main wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'resume-builder-container';
        container.appendChild(wrapper);
        
        // Create header
        const header = document.createElement('div');
        header.className = 'resume-builder-header';
        wrapper.appendChild(header);
        
        const title = document.createElement('h2');
        title.className = 'resume-builder-title';
        title.textContent = 'AI Resume Builder';
        header.appendChild(title);
        
        const description = document.createElement('p');
        description.className = 'resume-builder-description';
        description.textContent = 'Create a professional resume with our easy-to-use builder';
        header.appendChild(description);
        
        // Create template selector
        const templateSelector = document.createElement('div');
        templateSelector.className = 'resume-template-selector';
        wrapper.appendChild(templateSelector);
        
        const templateLabel = document.createElement('label');
        templateLabel.textContent = 'Select Template:';
        templateSelector.appendChild(templateLabel);
        
        const templateSelectContainer = document.createElement('div');
        templateSelectContainer.className = 'resume-template-select-container';
        templateSelector.appendChild(templateSelectContainer);
        
        // Add template options
        this.templates.forEach(template => {
            const templateItem = document.createElement('div');
            templateItem.className = 'resume-template-item';
            if (template.id === this.currentTemplate.id) {
                templateItem.classList.add('selected');
            }
            templateItem.dataset.id = template.id;
            
            const templatePreview = document.createElement('div');
            templatePreview.className = 'resume-template-preview';
            templatePreview.style.backgroundColor = template.primaryColor;
            templateItem.appendChild(templatePreview);
            
            const templateName = document.createElement('div');
            templateName.className = 'resume-template-name';
            templateName.textContent = template.name;
            templateItem.appendChild(templateName);
            
            templateItem.addEventListener('click', () => {
                // Remove selected class from all items
                document.querySelectorAll('.resume-template-item').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Add selected class to clicked item
                templateItem.classList.add('selected');
                
                // Update current template
                this.currentTemplate = template;
                this.saveData();
                
                // Update preview
                this.updatePreview();
            });
            
            templateSelectContainer.appendChild(templateItem);
        });
        
        // Create tabs for different sections
        const tabsContainer = document.createElement('div');
        tabsContainer.className = 'resume-tabs-container';
        wrapper.appendChild(tabsContainer);
        
        const tabsList = document.createElement('div');
        tabsList.className = 'resume-tabs-list';
        tabsContainer.appendChild(tabsList);
        
        const tabsContent = document.createElement('div');
        tabsContent.className = 'resume-tabs-content';
        tabsContainer.appendChild(tabsContent);
        
        // Define tabs
        const tabs = [
            { id: 'personal', label: 'Personal Info', icon: 'ri-user-line' },
            { id: 'experience', label: 'Experience', icon: 'ri-briefcase-line' },
            { id: 'education', label: 'Education', icon: 'ri-book-open-line' },
            { id: 'skills', label: 'Skills', icon: 'ri-tools-line' },
            { id: 'projects', label: 'Projects', icon: 'ri-folder-line' },
            { id: 'additional', label: 'Additional', icon: 'ri-file-list-line' }
        ];
        
        // Create tabs and content
        tabs.forEach((tab, index) => {
            // Create tab
            const tabItem = document.createElement('div');
            tabItem.className = 'resume-tab-item';
            if (index === 0) {
                tabItem.classList.add('active');
            }
            tabItem.dataset.tab = tab.id;
            
            const tabIcon = document.createElement('i');
            tabIcon.className = tab.icon;
            tabItem.appendChild(tabIcon);
            
            const tabLabel = document.createElement('span');
            tabLabel.textContent = tab.label;
            tabItem.appendChild(tabLabel);
            
            tabItem.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.resume-tab-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Remove active class from all content
                document.querySelectorAll('.resume-tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tabItem.classList.add('active');
                
                // Add active class to corresponding content
                const content = document.querySelector(`.resume-tab-content[data-tab="${tab.id}"]`);
                if (content) {
                    content.classList.add('active');
                }
            });
            
            tabsList.appendChild(tabItem);
            
            // Create tab content
            const tabContent = document.createElement('div');
            tabContent.className = 'resume-tab-content';
            if (index === 0) {
                tabContent.classList.add('active');
            }
            tabContent.dataset.tab = tab.id;
            
            // Add fields based on tab ID
            switch (tab.id) {
                case 'personal':
                    this.createPersonalInfoFields(tabContent);
                    break;
                case 'experience':
                    this.createExperienceFields(tabContent);
                    break;
                case 'education':
                    this.createEducationFields(tabContent);
                    break;
                case 'skills':
                    this.createSkillsFields(tabContent);
                    break;
                case 'projects':
                    this.createProjectsFields(tabContent);
                    break;
                case 'additional':
                    this.createAdditionalFields(tabContent);
                    break;
            }
            
            tabsContent.appendChild(tabContent);
        });
        
        // Create preview and action buttons
        const previewContainer = document.createElement('div');
        previewContainer.className = 'resume-preview-container';
        wrapper.appendChild(previewContainer);
        
        const previewTitle = document.createElement('h3');
        previewTitle.className = 'resume-preview-title';
        previewTitle.textContent = 'Resume Preview';
        previewContainer.appendChild(previewTitle);
        
        const previewFrame = document.createElement('div');
        previewFrame.className = 'resume-preview-frame';
        previewFrame.id = 'resumePreview';
        previewContainer.appendChild(previewFrame);
        
        // Action buttons
        const actionButtons = document.createElement('div');
        actionButtons.className = 'resume-action-buttons';
        wrapper.appendChild(actionButtons);
        
        // Preview button
        const previewButton = document.createElement('button');
        previewButton.className = 'btn btn-primary resume-preview-btn';
        previewButton.innerHTML = '<i class="ri-eye-line"></i> Update Preview';
        previewButton.addEventListener('click', () => this.updatePreview());
        actionButtons.appendChild(previewButton);
        
        // Generate PDF button
        const generateButton = document.createElement('button');
        generateButton.className = 'btn btn-success resume-generate-btn';
        generateButton.innerHTML = '<i class="ri-file-pdf-line"></i> Generate PDF';
        generateButton.addEventListener('click', () => this.generatePDF());
        actionButtons.appendChild(generateButton);
        
        // Save button
        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-outline resume-save-btn';
        saveButton.innerHTML = '<i class="ri-save-line"></i> Save Data';
        saveButton.addEventListener('click', () => this.saveData());
        actionButtons.appendChild(saveButton);
        
        // Initialize the preview
        this.updatePreview();
        
        return wrapper;
    }

    /**
     * Create personal info form fields
     * @param {HTMLElement} container - Tab content container
     */
    createPersonalInfoFields(container) {
        // Create form
        const form = document.createElement('form');
        form.className = 'resume-form personal-info-form';
        container.appendChild(form);
        
        // Name field
        const nameGroup = this.createFormGroup('name', 'Full Name', 'text', this.resumeData.personal.name);
        form.appendChild(nameGroup);
        
        // Title field
        const titleGroup = this.createFormGroup('title', 'Professional Title', 'text', this.resumeData.personal.title);
        form.appendChild(titleGroup);
        
        // Contact info
        const contactContainer = document.createElement('div');
        contactContainer.className = 'resume-form-row';
        form.appendChild(contactContainer);
        
        // Email field
        const emailGroup = this.createFormGroup('email', 'Email', 'email', this.resumeData.personal.email);
        emailGroup.classList.add('form-group-half');
        contactContainer.appendChild(emailGroup);
        
        // Phone field
        const phoneGroup = this.createFormGroup('phone', 'Phone', 'tel', this.resumeData.personal.phone);
        phoneGroup.classList.add('form-group-half');
        contactContainer.appendChild(phoneGroup);
        
        // Address field
        const addressGroup = this.createFormGroup('address', 'Address', 'text', this.resumeData.personal.address);
        form.appendChild(addressGroup);
        
        // Online presence
        const onlineContainer = document.createElement('div');
        onlineContainer.className = 'resume-form-row';
        form.appendChild(onlineContainer);
        
        // Website field
        const websiteGroup = this.createFormGroup('website', 'Website', 'url', this.resumeData.personal.website);
        websiteGroup.classList.add('form-group-half');
        onlineContainer.appendChild(websiteGroup);
        
        // LinkedIn field
        const linkedinGroup = this.createFormGroup('linkedin', 'LinkedIn', 'url', this.resumeData.personal.linkedin);
        linkedinGroup.classList.add('form-group-half');
        onlineContainer.appendChild(linkedinGroup);
        
        // GitHub field
        const githubGroup = this.createFormGroup('github', 'GitHub', 'url', this.resumeData.personal.github);
        githubGroup.classList.add('form-group-half');
        onlineContainer.appendChild(githubGroup);
        
        // Summary field
        const summaryGroup = document.createElement('div');
        summaryGroup.className = 'resume-form-group';
        form.appendChild(summaryGroup);
        
        const summaryLabel = document.createElement('label');
        summaryLabel.className = 'resume-form-label';
        summaryLabel.textContent = 'Professional Summary';
        summaryGroup.appendChild(summaryLabel);
        
        const summary = document.createElement('textarea');
        summary.className = 'resume-form-textarea';
        summary.id = 'summary';
        summary.rows = 5;
        summary.value = this.resumeData.personal.summary;
        summary.addEventListener('input', () => {
            this.resumeData.personal.summary = summary.value;
        });
        summaryGroup.appendChild(summary);
        
        // Add AI button to generate summary
        const aiButton = document.createElement('button');
        aiButton.type = 'button';
        aiButton.className = 'btn btn-primary ai-assist-btn';
        aiButton.innerHTML = '<i class="ri-robot-line"></i> Generate with AI';
        aiButton.addEventListener('click', () => this.generateSummaryWithAI());
        summaryGroup.appendChild(aiButton);
    }

    /**
     * Create experience form fields
     * @param {HTMLElement} container - Tab content container
     */
    createExperienceFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form experience-form';
        container.appendChild(form);
        
        // Experience items container
        const experienceContainer = document.createElement('div');
        experienceContainer.className = 'resume-items-container';
        experienceContainer.id = 'experienceContainer';
        form.appendChild(experienceContainer);
        
        // Render existing experience items
        this.resumeData.experience.forEach((item, index) => {
            this.renderExperienceItem(experienceContainer, item, index);
        });
        
        // Add experience button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'btn btn-outline resume-add-btn';
        addButton.innerHTML = '<i class="ri-add-line"></i> Add Experience';
        addButton.addEventListener('click', () => {
            const newItem = {
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            };
            
            this.resumeData.experience.push(newItem);
            this.renderExperienceItem(experienceContainer, newItem, this.resumeData.experience.length - 1);
        });
        form.appendChild(addButton);
    }

    /**
     * Render single experience item
     * @param {HTMLElement} container - Experience container
     * @param {Object} item - Experience data
     * @param {number} index - Array index
     */
    renderExperienceItem(container, item, index) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'resume-item experience-item';
        
        // Header with company and position
        const header = document.createElement('div');
        header.className = 'resume-item-header';
        itemContainer.appendChild(header);
        
        const title = document.createElement('div');
        title.className = 'resume-item-title';
        title.textContent = item.position || 'New Position';
        header.appendChild(title);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'resume-item-delete';
        deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this experience?')) {
                this.resumeData.experience.splice(index, 1);
                container.removeChild(itemContainer);
                
                // Update all indices
                const items = container.querySelectorAll('.experience-item');
                items.forEach((item, newIndex) => {
                    item.querySelectorAll('[data-index]').forEach(el => {
                        el.dataset.index = newIndex;
                    });
                });
            }
        });
        header.appendChild(deleteButton);
        
        // Form fields
        const form = document.createElement('div');
        form.className = 'resume-item-form';
        itemContainer.appendChild(form);
        
        // Company and position
        const row1 = document.createElement('div');
        row1.className = 'resume-form-row';
        form.appendChild(row1);
        
        // Company field
        const companyGroup = this.createFormGroup(`experience-${index}-company`, 'Company', 'text', item.company);
        companyGroup.classList.add('form-group-half');
        companyGroup.querySelector('input').addEventListener('input', e => {
            item.company = e.target.value;
            if (e.target.value) {
                title.textContent = `${e.target.value} - ${item.position || 'Position'}`;
            } else {
                title.textContent = item.position || 'New Position';
            }
        });
        row1.appendChild(companyGroup);
        
        // Position field
        const positionGroup = this.createFormGroup(`experience-${index}-position`, 'Position', 'text', item.position);
        positionGroup.classList.add('form-group-half');
        positionGroup.querySelector('input').addEventListener('input', e => {
            item.position = e.target.value;
            if (item.company) {
                title.textContent = `${item.company} - ${e.target.value || 'Position'}`;
            } else {
                title.textContent = e.target.value || 'New Position';
            }
        });
        row1.appendChild(positionGroup);
        
        // Location and dates
        const row2 = document.createElement('div');
        row2.className = 'resume-form-row';
        form.appendChild(row2);
        
        // Location field
        const locationGroup = this.createFormGroup(`experience-${index}-location`, 'Location', 'text', item.location);
        locationGroup.classList.add('form-group-third');
        locationGroup.querySelector('input').addEventListener('input', e => {
            item.location = e.target.value;
        });
        row2.appendChild(locationGroup);
        
        // Start date field
        const startDateGroup = this.createFormGroup(`experience-${index}-startDate`, 'Start Date', 'month', item.startDate);
        startDateGroup.classList.add('form-group-third');
        startDateGroup.querySelector('input').addEventListener('input', e => {
            item.startDate = e.target.value;
        });
        row2.appendChild(startDateGroup);
        
        // End date field with current checkbox
        const endDateGroup = document.createElement('div');
        endDateGroup.className = 'resume-form-group form-group-third';
        row2.appendChild(endDateGroup);
        
        const endDateLabel = document.createElement('label');
        endDateLabel.className = 'resume-form-label';
        endDateLabel.textContent = 'End Date';
        endDateGroup.appendChild(endDateLabel);
        
        const endDateInput = document.createElement('input');
        endDateInput.type = 'month';
        endDateInput.className = 'resume-form-input';
        endDateInput.id = `experience-${index}-endDate`;
        endDateInput.value = item.endDate;
        endDateInput.disabled = item.current;
        endDateInput.addEventListener('input', e => {
            item.endDate = e.target.value;
        });
        endDateGroup.appendChild(endDateInput);
        
        const currentContainer = document.createElement('div');
        currentContainer.className = 'resume-checkbox-container';
        endDateGroup.appendChild(currentContainer);
        
        const currentCheckbox = document.createElement('input');
        currentCheckbox.type = 'checkbox';
        currentCheckbox.id = `experience-${index}-current`;
        currentCheckbox.checked = item.current;
        currentCheckbox.addEventListener('change', e => {
            item.current = e.target.checked;
            endDateInput.disabled = e.target.checked;
            if (e.target.checked) {
                item.endDate = 'Present';
            } else {
                item.endDate = '';
            }
        });
        currentContainer.appendChild(currentCheckbox);
        
        const currentLabel = document.createElement('label');
        currentLabel.htmlFor = `experience-${index}-current`;
        currentLabel.textContent = 'Current Position';
        currentContainer.appendChild(currentLabel);
        
        // Description field
        const descriptionGroup = document.createElement('div');
        descriptionGroup.className = 'resume-form-group';
        form.appendChild(descriptionGroup);
        
        const descriptionLabel = document.createElement('label');
        descriptionLabel.className = 'resume-form-label';
        descriptionLabel.textContent = 'Description';
        descriptionGroup.appendChild(descriptionLabel);
        
        const description = document.createElement('textarea');
        description.className = 'resume-form-textarea';
        description.id = `experience-${index}-description`;
        description.rows = 4;
        description.value = item.description;
        description.addEventListener('input', e => {
            item.description = e.target.value;
        });
        descriptionGroup.appendChild(description);
        
        // Add AI button to generate description
        const aiButton = document.createElement('button');
        aiButton.type = 'button';
        aiButton.className = 'btn btn-primary ai-assist-btn';
        aiButton.innerHTML = '<i class="ri-robot-line"></i> Generate with AI';
        aiButton.dataset.index = index;
        aiButton.addEventListener('click', () => this.generateExperienceDescriptionWithAI(index));
        descriptionGroup.appendChild(aiButton);
        
        container.appendChild(itemContainer);
    }

    /**
     * Create education form fields
     * @param {HTMLElement} container - Tab content container
     */
    createEducationFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form education-form';
        container.appendChild(form);
        
        // Education items container
        const educationContainer = document.createElement('div');
        educationContainer.className = 'resume-items-container';
        educationContainer.id = 'educationContainer';
        form.appendChild(educationContainer);
        
        // Render existing education items
        this.resumeData.education.forEach((item, index) => {
            this.renderEducationItem(educationContainer, item, index);
        });
        
        // Add education button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'btn btn-outline resume-add-btn';
        addButton.innerHTML = '<i class="ri-add-line"></i> Add Education';
        addButton.addEventListener('click', () => {
            const newItem = {
                institution: '',
                degree: '',
                field: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                gpa: '',
                description: ''
            };
            
            this.resumeData.education.push(newItem);
            this.renderEducationItem(educationContainer, newItem, this.resumeData.education.length - 1);
        });
        form.appendChild(addButton);
    }

    /**
     * Render single education item
     * @param {HTMLElement} container - Education container
     * @param {Object} item - Education data
     * @param {number} index - Array index
     */
    renderEducationItem(container, item, index) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'resume-item education-item';
        
        // Header with institution and degree
        const header = document.createElement('div');
        header.className = 'resume-item-header';
        itemContainer.appendChild(header);
        
        const title = document.createElement('div');
        title.className = 'resume-item-title';
        title.textContent = item.institution || 'New Education';
        header.appendChild(title);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'resume-item-delete';
        deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this education?')) {
                this.resumeData.education.splice(index, 1);
                container.removeChild(itemContainer);
                
                // Update all indices
                const items = container.querySelectorAll('.education-item');
                items.forEach((item, newIndex) => {
                    item.querySelectorAll('[data-index]').forEach(el => {
                        el.dataset.index = newIndex;
                    });
                });
            }
        });
        header.appendChild(deleteButton);
        
        // Form fields
        const form = document.createElement('div');
        form.className = 'resume-item-form';
        itemContainer.appendChild(form);
        
        // Institution and degree
        const row1 = document.createElement('div');
        row1.className = 'resume-form-row';
        form.appendChild(row1);
        
        // Institution field
        const institutionGroup = this.createFormGroup(`education-${index}-institution`, 'Institution', 'text', item.institution);
        institutionGroup.classList.add('form-group-half');
        institutionGroup.querySelector('input').addEventListener('input', e => {
            item.institution = e.target.value;
            title.textContent = e.target.value || 'New Education';
        });
        row1.appendChild(institutionGroup);
        
        // Degree field
        const degreeGroup = this.createFormGroup(`education-${index}-degree`, 'Degree', 'text', item.degree);
        degreeGroup.classList.add('form-group-half');
        degreeGroup.querySelector('input').addEventListener('input', e => {
            item.degree = e.target.value;
        });
        row1.appendChild(degreeGroup);
        
        // Field and location
        const row2 = document.createElement('div');
        row2.className = 'resume-form-row';
        form.appendChild(row2);
        
        // Field of study
        const fieldGroup = this.createFormGroup(`education-${index}-field`, 'Field of Study', 'text', item.field);
        fieldGroup.classList.add('form-group-half');
        fieldGroup.querySelector('input').addEventListener('input', e => {
            item.field = e.target.value;
        });
        row2.appendChild(fieldGroup);
        
        // Location field
        const locationGroup = this.createFormGroup(`education-${index}-location`, 'Location', 'text', item.location);
        locationGroup.classList.add('form-group-half');
        locationGroup.querySelector('input').addEventListener('input', e => {
            item.location = e.target.value;
        });
        row2.appendChild(locationGroup);
        
        // Dates and GPA
        const row3 = document.createElement('div');
        row3.className = 'resume-form-row';
        form.appendChild(row3);
        
        // Start date field
        const startDateGroup = this.createFormGroup(`education-${index}-startDate`, 'Start Date', 'month', item.startDate);
        startDateGroup.classList.add('form-group-third');
        startDateGroup.querySelector('input').addEventListener('input', e => {
            item.startDate = e.target.value;
        });
        row3.appendChild(startDateGroup);
        
        // End date field with current checkbox
        const endDateGroup = document.createElement('div');
        endDateGroup.className = 'resume-form-group form-group-third';
        row3.appendChild(endDateGroup);
        
        const endDateLabel = document.createElement('label');
        endDateLabel.className = 'resume-form-label';
        endDateLabel.textContent = 'End Date';
        endDateGroup.appendChild(endDateLabel);
        
        const endDateInput = document.createElement('input');
        endDateInput.type = 'month';
        endDateInput.className = 'resume-form-input';
        endDateInput.id = `education-${index}-endDate`;
        endDateInput.value = item.endDate;
        endDateInput.disabled = item.current;
        endDateInput.addEventListener('input', e => {
            item.endDate = e.target.value;
        });
        endDateGroup.appendChild(endDateInput);
        
        const currentContainer = document.createElement('div');
        currentContainer.className = 'resume-checkbox-container';
        endDateGroup.appendChild(currentContainer);
        
        const currentCheckbox = document.createElement('input');
        currentCheckbox.type = 'checkbox';
        currentCheckbox.id = `education-${index}-current`;
        currentCheckbox.checked = item.current;
        currentCheckbox.addEventListener('change', e => {
            item.current = e.target.checked;
            endDateInput.disabled = e.target.checked;
            if (e.target.checked) {
                item.endDate = 'Present';
            } else {
                item.endDate = '';
            }
        });
        currentContainer.appendChild(currentCheckbox);
        
        const currentLabel = document.createElement('label');
        currentLabel.htmlFor = `education-${index}-current`;
        currentLabel.textContent = 'Currently Enrolled';
        currentContainer.appendChild(currentLabel);
        
        // GPA field
        const gpaGroup = this.createFormGroup(`education-${index}-gpa`, 'GPA (optional)', 'text', item.gpa);
        gpaGroup.classList.add('form-group-third');
        gpaGroup.querySelector('input').addEventListener('input', e => {
            item.gpa = e.target.value;
        });
        row3.appendChild(gpaGroup);
        
        // Description field
        const descriptionGroup = document.createElement('div');
        descriptionGroup.className = 'resume-form-group';
        form.appendChild(descriptionGroup);
        
        const descriptionLabel = document.createElement('label');
        descriptionLabel.className = 'resume-form-label';
        descriptionLabel.textContent = 'Description (optional)';
        descriptionGroup.appendChild(descriptionLabel);
        
        const description = document.createElement('textarea');
        description.className = 'resume-form-textarea';
        description.id = `education-${index}-description`;
        description.rows = 3;
        description.value = item.description;
        description.addEventListener('input', e => {
            item.description = e.target.value;
        });
        descriptionGroup.appendChild(description);
        
        container.appendChild(itemContainer);
    }

    /**
     * Create skills form fields
     * @param {HTMLElement} container - Tab content container
     */
    createSkillsFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form skills-form';
        container.appendChild(form);
        
        // Skills section description
        const description = document.createElement('p');
        description.className = 'resume-section-description';
        description.textContent = 'Add your skills with optional proficiency level';
        form.appendChild(description);
        
        // Skills items container
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'resume-skills-container';
        skillsContainer.id = 'skillsContainer';
        form.appendChild(skillsContainer);
        
        // Render existing skills items
        this.resumeData.skills.forEach((item, index) => {
            this.renderSkillItem(skillsContainer, item, index);
        });
        
        // Add skill button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'btn btn-outline resume-add-btn';
        addButton.innerHTML = '<i class="ri-add-line"></i> Add Skill';
        addButton.addEventListener('click', () => {
            const newItem = {
                name: '',
                level: 80  // Default level (0-100)
            };
            
            this.resumeData.skills.push(newItem);
            this.renderSkillItem(skillsContainer, newItem, this.resumeData.skills.length - 1);
        });
        form.appendChild(addButton);
        
        // AI Suggestion button
        const aiButton = document.createElement('button');
        aiButton.type = 'button';
        aiButton.className = 'btn btn-primary resume-ai-btn';
        aiButton.innerHTML = '<i class="ri-robot-line"></i> Suggest Skills with AI';
        aiButton.addEventListener('click', () => this.suggestSkillsWithAI());
        form.appendChild(aiButton);
    }

    /**
     * Render single skill item
     * @param {HTMLElement} container - Skills container
     * @param {Object} item - Skill data
     * @param {number} index - Array index
     */
    renderSkillItem(container, item, index) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'resume-skill-item';
        
        // Skill name field
        const nameGroup = document.createElement('div');
        nameGroup.className = 'resume-skill-name-group';
        itemContainer.appendChild(nameGroup);
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'resume-form-input';
        nameInput.id = `skill-${index}-name`;
        nameInput.value = item.name;
        nameInput.placeholder = 'Skill name';
        nameInput.addEventListener('input', e => {
            item.name = e.target.value;
        });
        nameGroup.appendChild(nameInput);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'resume-skill-delete';
        deleteButton.innerHTML = '<i class="ri-close-line"></i>';
        deleteButton.addEventListener('click', () => {
            this.resumeData.skills.splice(index, 1);
            container.removeChild(itemContainer);
            
            // Update all indices
            const items = container.querySelectorAll('.resume-skill-item');
            items.forEach((item, newIndex) => {
                item.querySelectorAll('[id^="skill-"]').forEach(el => {
                    el.id = el.id.replace(/skill-\d+/, `skill-${newIndex}`);
                });
            });
        });
        nameGroup.appendChild(deleteButton);
        
        // Skill level slider
        const levelGroup = document.createElement('div');
        levelGroup.className = 'resume-skill-level-group';
        itemContainer.appendChild(levelGroup);
        
        const levelValueContainer = document.createElement('div');
        levelValueContainer.className = 'resume-skill-level-value';
        levelGroup.appendChild(levelValueContainer);
        
        const levelValue = document.createElement('span');
        levelValue.textContent = item.level + '%';
        levelValueContainer.appendChild(levelValue);
        
        const levelInput = document.createElement('input');
        levelInput.type = 'range';
        levelInput.className = 'resume-skill-slider';
        levelInput.id = `skill-${index}-level`;
        levelInput.min = 0;
        levelInput.max = 100;
        levelInput.step = 5;
        levelInput.value = item.level;
        levelInput.addEventListener('input', e => {
            item.level = parseInt(e.target.value, 10);
            levelValue.textContent = item.level + '%';
        });
        levelGroup.appendChild(levelInput);
        
        container.appendChild(itemContainer);
    }

    /**
     * Create projects form fields
     * @param {HTMLElement} container - Tab content container
     */
    createProjectsFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form projects-form';
        container.appendChild(form);
        
        // Projects items container
        const projectsContainer = document.createElement('div');
        projectsContainer.className = 'resume-items-container';
        projectsContainer.id = 'projectsContainer';
        form.appendChild(projectsContainer);
        
        // Render existing project items
        this.resumeData.projects.forEach((item, index) => {
            this.renderProjectItem(projectsContainer, item, index);
        });
        
        // Add project button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'btn btn-outline resume-add-btn';
        addButton.innerHTML = '<i class="ri-add-line"></i> Add Project';
        addButton.addEventListener('click', () => {
            const newItem = {
                name: '',
                role: '',
                url: '',
                startDate: '',
                endDate: '',
                description: ''
            };
            
            this.resumeData.projects.push(newItem);
            this.renderProjectItem(projectsContainer, newItem, this.resumeData.projects.length - 1);
        });
        form.appendChild(addButton);
    }

    /**
     * Render single project item
     * @param {HTMLElement} container - Projects container
     * @param {Object} item - Project data
     * @param {number} index - Array index
     */
    renderProjectItem(container, item, index) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'resume-item project-item';
        
        // Header with project name
        const header = document.createElement('div');
        header.className = 'resume-item-header';
        itemContainer.appendChild(header);
        
        const title = document.createElement('div');
        title.className = 'resume-item-title';
        title.textContent = item.name || 'New Project';
        header.appendChild(title);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'resume-item-delete';
        deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this project?')) {
                this.resumeData.projects.splice(index, 1);
                container.removeChild(itemContainer);
                
                // Update all indices
                const items = container.querySelectorAll('.project-item');
                items.forEach((item, newIndex) => {
                    item.querySelectorAll('[data-index]').forEach(el => {
                        el.dataset.index = newIndex;
                    });
                });
            }
        });
        header.appendChild(deleteButton);
        
        // Form fields
        const form = document.createElement('div');
        form.className = 'resume-item-form';
        itemContainer.appendChild(form);
        
        // Project name and role
        const row1 = document.createElement('div');
        row1.className = 'resume-form-row';
        form.appendChild(row1);
        
        // Project name field
        const nameGroup = this.createFormGroup(`project-${index}-name`, 'Project Name', 'text', item.name);
        nameGroup.classList.add('form-group-half');
        nameGroup.querySelector('input').addEventListener('input', e => {
            item.name = e.target.value;
            title.textContent = e.target.value || 'New Project';
        });
        row1.appendChild(nameGroup);
        
        // Role field
        const roleGroup = this.createFormGroup(`project-${index}-role`, 'Your Role', 'text', item.role);
        roleGroup.classList.add('form-group-half');
        roleGroup.querySelector('input').addEventListener('input', e => {
            item.role = e.target.value;
        });
        row1.appendChild(roleGroup);
        
        // URL and dates
        const row2 = document.createElement('div');
        row2.className = 'resume-form-row';
        form.appendChild(row2);
        
        // URL field
        const urlGroup = this.createFormGroup(`project-${index}-url`, 'Project URL (optional)', 'url', item.url);
        urlGroup.classList.add('form-group-half');
        urlGroup.querySelector('input').addEventListener('input', e => {
            item.url = e.target.value;
        });
        row2.appendChild(urlGroup);
        
        // Date range container
        const dateRangeGroup = document.createElement('div');
        dateRangeGroup.className = 'resume-form-group form-group-half';
        row2.appendChild(dateRangeGroup);
        
        const dateRangeLabel = document.createElement('label');
        dateRangeLabel.className = 'resume-form-label';
        dateRangeLabel.textContent = 'Date Range';
        dateRangeGroup.appendChild(dateRangeLabel);
        
        const dateRangeContainer = document.createElement('div');
        dateRangeContainer.className = 'resume-date-range';
        dateRangeGroup.appendChild(dateRangeContainer);
        
        // Start date input
        const startDateInput = document.createElement('input');
        startDateInput.type = 'month';
        startDateInput.className = 'resume-form-input';
        startDateInput.id = `project-${index}-startDate`;
        startDateInput.value = item.startDate;
        startDateInput.addEventListener('input', e => {
            item.startDate = e.target.value;
        });
        dateRangeContainer.appendChild(startDateInput);
        
        const dateSeparator = document.createElement('span');
        dateSeparator.className = 'date-separator';
        dateSeparator.textContent = 'to';
        dateRangeContainer.appendChild(dateSeparator);
        
        // End date input
        const endDateInput = document.createElement('input');
        endDateInput.type = 'month';
        endDateInput.className = 'resume-form-input';
        endDateInput.id = `project-${index}-endDate`;
        endDateInput.value = item.endDate;
        endDateInput.addEventListener('input', e => {
            item.endDate = e.target.value;
        });
        dateRangeContainer.appendChild(endDateInput);
        
        // Description field
        const descriptionGroup = document.createElement('div');
        descriptionGroup.className = 'resume-form-group';
        form.appendChild(descriptionGroup);
        
        const descriptionLabel = document.createElement('label');
        descriptionLabel.className = 'resume-form-label';
        descriptionLabel.textContent = 'Description';
        descriptionGroup.appendChild(descriptionLabel);
        
        const description = document.createElement('textarea');
        description.className = 'resume-form-textarea';
        description.id = `project-${index}-description`;
        description.rows = 3;
        description.value = item.description;
        description.addEventListener('input', e => {
            item.description = e.target.value;
        });
        descriptionGroup.appendChild(description);
        
        // Add AI button to generate project description
        const aiButton = document.createElement('button');
        aiButton.type = 'button';
        aiButton.className = 'btn btn-primary ai-assist-btn';
        aiButton.innerHTML = '<i class="ri-robot-line"></i> Generate with AI';
        aiButton.dataset.index = index;
        aiButton.addEventListener('click', () => this.generateProjectDescriptionWithAI(index));
        descriptionGroup.appendChild(aiButton);
        
        container.appendChild(itemContainer);
    }

    /**
     * Create additional form fields (certifications, languages, interests)
     * @param {HTMLElement} container - Tab content container
     */
    createAdditionalFields(container) {
        // Create tabs for additional sections
        const additionalTabs = document.createElement('div');
        additionalTabs.className = 'resume-additional-tabs';
        container.appendChild(additionalTabs);
        
        // Define tabs
        const tabs = [
            { id: 'certifications', label: 'Certifications', icon: 'ri-award-line' },
            { id: 'languages', label: 'Languages', icon: 'ri-translate-2' },
            { id: 'interests', label: 'Interests', icon: 'ri-heart-line' }
        ];
        
        // Create tab buttons
        tabs.forEach((tab, index) => {
            const tabButton = document.createElement('button');
            tabButton.type = 'button';
            tabButton.className = 'resume-additional-tab';
            if (index === 0) tabButton.classList.add('active');
            tabButton.dataset.tab = tab.id;
            
            const tabIcon = document.createElement('i');
            tabIcon.className = tab.icon;
            tabButton.appendChild(tabIcon);
            
            const tabText = document.createElement('span');
            tabText.textContent = tab.label;
            tabButton.appendChild(tabText);
            
            tabButton.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.resume-additional-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tabButton.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.resume-additional-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show selected tab content
                const content = document.getElementById(`${tab.id}Content`);
                if (content) content.style.display = 'block';
            });
            
            additionalTabs.appendChild(tabButton);
        });
        
        // Create tab content container
        const additionalContent = document.createElement('div');
        additionalContent.className = 'resume-additional-content-container';
        container.appendChild(additionalContent);
        
        // Create certifications content
        const certificationsContent = document.createElement('div');
        certificationsContent.className = 'resume-additional-content';
        certificationsContent.id = 'certificationsContent';
        certificationsContent.style.display = 'block';  // Show first tab by default
        additionalContent.appendChild(certificationsContent);
        
        this.createCertificationsFields(certificationsContent);
        
        // Create languages content
        const languagesContent = document.createElement('div');
        languagesContent.className = 'resume-additional-content';
        languagesContent.id = 'languagesContent';
        languagesContent.style.display = 'none';
        additionalContent.appendChild(languagesContent);
        
        this.createLanguagesFields(languagesContent);
        
        // Create interests content
        const interestsContent = document.createElement('div');
        interestsContent.className = 'resume-additional-content';
        interestsContent.id = 'interestsContent';
        interestsContent.style.display = 'none';
        additionalContent.appendChild(interestsContent);
        
        this.createInterestsFields(interestsContent);
    }

    /**
     * Create form fields for certifications
     * @param {HTMLElement} container - Content container
     */
    createCertificationsFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form certifications-form';
        container.appendChild(form);
        
        // Certifications container
        const certificationsContainer = document.createElement('div');
        certificationsContainer.className = 'resume-items-container';
        certificationsContainer.id = 'certificationsContainer';
        form.appendChild(certificationsContainer);
        
        // Render existing certification items
        this.resumeData.certifications.forEach((item, index) => {
            this.renderCertificationItem(certificationsContainer, item, index);
        });
        
        // Add certification button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'btn btn-outline resume-add-btn';
        addButton.innerHTML = '<i class="ri-add-line"></i> Add Certification';
        addButton.addEventListener('click', () => {
            const newItem = {
                name: '',
                issuer: '',
                date: '',
                url: ''
            };
            
            this.resumeData.certifications.push(newItem);
            this.renderCertificationItem(certificationsContainer, newItem, this.resumeData.certifications.length - 1);
        });
        form.appendChild(addButton);
    }

    /**
     * Render single certification item
     * @param {HTMLElement} container - Certifications container
     * @param {Object} item - Certification data
     * @param {number} index - Array index
     */
    renderCertificationItem(container, item, index) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'resume-item certification-item';
        
        // Certification name and issuer
        const row1 = document.createElement('div');
        row1.className = 'resume-form-row';
        itemContainer.appendChild(row1);
        
        // Name field
        const nameGroup = this.createFormGroup(`certification-${index}-name`, 'Certification Name', 'text', item.name);
        nameGroup.classList.add('form-group-half');
        nameGroup.querySelector('input').addEventListener('input', e => {
            item.name = e.target.value;
        });
        row1.appendChild(nameGroup);
        
        // Issuer field
        const issuerGroup = this.createFormGroup(`certification-${index}-issuer`, 'Issuing Organization', 'text', item.issuer);
        issuerGroup.classList.add('form-group-half');
        issuerGroup.querySelector('input').addEventListener('input', e => {
            item.issuer = e.target.value;
        });
        row1.appendChild(issuerGroup);
        
        // Date and URL
        const row2 = document.createElement('div');
        row2.className = 'resume-form-row';
        itemContainer.appendChild(row2);
        
        // Date field
        const dateGroup = this.createFormGroup(`certification-${index}-date`, 'Date', 'month', item.date);
        dateGroup.classList.add('form-group-half');
        dateGroup.querySelector('input').addEventListener('input', e => {
            item.date = e.target.value;
        });
        row2.appendChild(dateGroup);
        
        // URL field
        const urlGroup = this.createFormGroup(`certification-${index}-url`, 'Credential URL (optional)', 'url', item.url);
        urlGroup.classList.add('form-group-half');
        urlGroup.querySelector('input').addEventListener('input', e => {
            item.url = e.target.value;
        });
        row2.appendChild(urlGroup);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-ghost resume-delete-btn';
        deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i> Remove';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this certification?')) {
                this.resumeData.certifications.splice(index, 1);
                container.removeChild(itemContainer);
                
                // Update all indices
                const items = container.querySelectorAll('.certification-item');
                items.forEach((item, newIndex) => {
                    item.querySelectorAll('[id^="certification-"]').forEach(el => {
                        el.id = el.id.replace(/certification-\d+/, `certification-${newIndex}`);
                    });
                });
            }
        });
        itemContainer.appendChild(deleteButton);
        
        container.appendChild(itemContainer);
    }

    /**
     * Create form fields for languages
     * @param {HTMLElement} container - Content container
     */
    createLanguagesFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form languages-form';
        container.appendChild(form);
        
        // Languages container
        const languagesContainer = document.createElement('div');
        languagesContainer.className = 'resume-items-container';
        languagesContainer.id = 'languagesContainer';
        form.appendChild(languagesContainer);
        
        // Render existing language items
        this.resumeData.languages.forEach((item, index) => {
            this.renderLanguageItem(languagesContainer, item, index);
        });
        
        // Add language button
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'btn btn-outline resume-add-btn';
        addButton.innerHTML = '<i class="ri-add-line"></i> Add Language';
        addButton.addEventListener('click', () => {
            const newItem = {
                language: '',
                proficiency: 'Intermediate'
            };
            
            this.resumeData.languages.push(newItem);
            this.renderLanguageItem(languagesContainer, newItem, this.resumeData.languages.length - 1);
        });
        form.appendChild(addButton);
    }

    /**
     * Render single language item
     * @param {HTMLElement} container - Languages container
     * @param {Object} item - Language data
     * @param {number} index - Array index
     */
    renderLanguageItem(container, item, index) {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'resume-item language-item';
        
        // Language and proficiency
        const row = document.createElement('div');
        row.className = 'resume-form-row';
        itemContainer.appendChild(row);
        
        // Language field
        const languageGroup = this.createFormGroup(`language-${index}-name`, 'Language', 'text', item.language);
        languageGroup.classList.add('form-group-half');
        languageGroup.querySelector('input').addEventListener('input', e => {
            item.language = e.target.value;
        });
        row.appendChild(languageGroup);
        
        // Proficiency field
        const proficiencyGroup = document.createElement('div');
        proficiencyGroup.className = 'resume-form-group form-group-half';
        row.appendChild(proficiencyGroup);
        
        const proficiencyLabel = document.createElement('label');
        proficiencyLabel.className = 'resume-form-label';
        proficiencyLabel.textContent = 'Proficiency';
        proficiencyGroup.appendChild(proficiencyLabel);
        
        const proficiencySelect = document.createElement('select');
        proficiencySelect.className = 'resume-form-input';
        proficiencySelect.id = `language-${index}-proficiency`;
        proficiencySelect.addEventListener('change', e => {
            item.proficiency = e.target.value;
        });
        proficiencyGroup.appendChild(proficiencySelect);
        
        // Add proficiency options
        const proficiencyLevels = [
            'Native',
            'Fluent',
            'Advanced',
            'Intermediate',
            'Elementary',
            'Beginner'
        ];
        
        proficiencyLevels.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            if (item.proficiency === level) {
                option.selected = true;
            }
            proficiencySelect.appendChild(option);
        });
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'btn btn-ghost resume-delete-btn';
        deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i> Remove';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this language?')) {
                this.resumeData.languages.splice(index, 1);
                container.removeChild(itemContainer);
                
                // Update all indices
                const items = container.querySelectorAll('.language-item');
                items.forEach((item, newIndex) => {
                    item.querySelectorAll('[id^="language-"]').forEach(el => {
                        el.id = el.id.replace(/language-\d+/, `language-${newIndex}`);
                    });
                });
            }
        });
        itemContainer.appendChild(deleteButton);
        
        container.appendChild(itemContainer);
    }

    /**
     * Create form fields for interests
     * @param {HTMLElement} container - Content container
     */
    createInterestsFields(container) {
        // Create form
        const form = document.createElement('div');
        form.className = 'resume-form interests-form';
        container.appendChild(form);
        
        // Interests description
        const description = document.createElement('p');
        description.className = 'resume-section-description';
        description.textContent = 'Add your interests, hobbies, or activities';
        form.appendChild(description);
        
        // Interests input
        const interestsField = document.createElement('div');
        interestsField.className = 'resume-form-group';
        form.appendChild(interestsField);
        
        const interestsLabel = document.createElement('label');
        interestsLabel.className = 'resume-form-label';
        interestsLabel.textContent = 'Interests (one per line)';
        interestsField.appendChild(interestsLabel);
        
        const interestsInput = document.createElement('textarea');
        interestsInput.className = 'resume-form-textarea';
        interestsInput.id = 'interestsInput';
        interestsInput.rows = 6;
        interestsInput.placeholder = 'Web Development\nHiking\nPhotography\nPlaying Guitar\nReading';
        interestsInput.value = this.resumeData.interests.join('\n');
        interestsInput.addEventListener('input', () => {
            this.resumeData.interests = interestsInput.value
                .split('\n')
                .map(s => s.trim())
                .filter(s => s.length > 0);
        });
        interestsField.appendChild(interestsInput);
        
        // AI Suggestion button
        const aiButton = document.createElement('button');
        aiButton.type = 'button';
        aiButton.className = 'btn btn-primary resume-ai-btn';
        aiButton.innerHTML = '<i class="ri-robot-line"></i> Suggest with AI';
        aiButton.addEventListener('click', () => this.suggestInterestsWithAI());
        form.appendChild(aiButton);
    }

    /**
     * Create form group
     * @param {string} id - Input ID
     * @param {string} label - Label text
     * @param {string} type - Input type
     * @param {string} value - Initial value
     * @returns {HTMLElement} The created form group
     */
    createFormGroup(id, label, type, value) {
        const group = document.createElement('div');
        group.className = 'resume-form-group';
        
        const labelEl = document.createElement('label');
        labelEl.className = 'resume-form-label';
        labelEl.htmlFor = id;
        labelEl.textContent = label;
        group.appendChild(labelEl);
        
        const input = document.createElement('input');
        input.type = type;
        input.className = 'resume-form-input';
        input.id = id;
        input.value = value || '';
        group.appendChild(input);
        
        return group;
    }

    /**
     * Update resume preview
     */
    updatePreview() {
        const previewContainer = document.getElementById('resumePreview');
        if (!previewContainer) return;
        
        // Generate HTML for selected template
        let html = '';
        switch (this.currentTemplate.id) {
            case 'modern':
                html = this.generateModernTemplate();
                break;
            case 'classic':
                html = this.generateClassicTemplate();
                break;
            case 'minimal':
                html = this.generateMinimalTemplate();
                break;
            default:
                html = this.generateModernTemplate();
        }
        
        previewContainer.innerHTML = html;
        
        // Apply template-specific styles
        this.applyTemplateStyles();
    }

    /**
     * Apply template-specific styles
     */
    applyTemplateStyles() {
        const styleElement = document.getElementById('resume-template-styles');
        if (styleElement) {
            document.head.removeChild(styleElement);
        }
        
        const style = document.createElement('style');
        style.id = 'resume-template-styles';
        
        let css = '';
        switch (this.currentTemplate.id) {
            case 'modern':
                css = this.getModernTemplateStyles();
                break;
            case 'classic':
                css = this.getClassicTemplateStyles();
                break;
            case 'minimal':
                css = this.getMinimalTemplateStyles();
                break;
            default:
                css = this.getModernTemplateStyles();
        }
        
        style.textContent = css;
        document.head.appendChild(style);
    }

    /**
     * Generate modern template HTML
     * @returns {string} HTML for modern template
     */
    generateModernTemplate() {
        // Template implementation goes here
        return `
            <div class="resume-preview modern-template">
                <div class="resume-header">
                    <h1 class="resume-name">${this.resumeData.personal.name || 'Your Name'}</h1>
                    <p class="resume-title">${this.resumeData.personal.title || 'Professional Title'}</p>
                </div>
                
                <div class="resume-contact">
                    ${this.resumeData.personal.email ? `<div class="contact-item"><i class="ri-mail-line"></i>${this.resumeData.personal.email}</div>` : ''}
                    ${this.resumeData.personal.phone ? `<div class="contact-item"><i class="ri-phone-line"></i>${this.resumeData.personal.phone}</div>` : ''}
                    ${this.resumeData.personal.address ? `<div class="contact-item"><i class="ri-map-pin-line"></i>${this.resumeData.personal.address}</div>` : ''}
                    ${this.resumeData.personal.website ? `<div class="contact-item"><i class="ri-global-line"></i>${this.resumeData.personal.website}</div>` : ''}
                    ${this.resumeData.personal.linkedin ? `<div class="contact-item"><i class="ri-linkedin-box-line"></i>${this.resumeData.personal.linkedin}</div>` : ''}
                    ${this.resumeData.personal.github ? `<div class="contact-item"><i class="ri-github-line"></i>${this.resumeData.personal.github}</div>` : ''}
                </div>
                
                ${this.resumeData.personal.summary ? `
                <div class="resume-section">
                    <h2 class="section-title">Professional Summary</h2>
                    <div class="resume-summary">
                        <p>${this.resumeData.personal.summary}</p>
                    </div>
                </div>
                ` : ''}
                
                ${this.resumeData.experience.length > 0 ? `
                <div class="resume-section">
                    <h2 class="section-title">Experience</h2>
                    <div class="resume-experience">
                        ${this.resumeData.experience.map(exp => `
                            <div class="experience-item">
                                <div class="experience-header">
                                    <h3 class="experience-position">${exp.position || 'Position'}</h3>
                                    <div class="experience-company">${exp.company || 'Company'}</div>
                                    <div class="experience-duration">
                                        ${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'}) : 'Start Date'} - 
                                        ${exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'}) : 'End Date')}
                                    </div>
                                    ${exp.location ? `<div class="experience-location">${exp.location}</div>` : ''}
                                </div>
                                ${exp.description ? `<div class="experience-description">${exp.description}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${this.resumeData.education.length > 0 ? `
                <div class="resume-section">
                    <h2 class="section-title">Education</h2>
                    <div class="resume-education">
                        ${this.resumeData.education.map(edu => `
                            <div class="education-item">
                                <div class="education-header">
                                    <h3 class="education-degree">${edu.degree || 'Degree'} ${edu.field ? `in ${edu.field}` : ''}</h3>
                                    <div class="education-institution">${edu.institution || 'Institution'}</div>
                                    <div class="education-duration">
                                        ${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'}) : 'Start Date'} - 
                                        ${edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'}) : 'End Date')}
                                    </div>
                                    ${edu.location ? `<div class="education-location">${edu.location}</div>` : ''}
                                </div>
                                ${edu.gpa ? `<div class="education-gpa">GPA: ${edu.gpa}</div>` : ''}
                                ${edu.description ? `<div class="education-description">${edu.description}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${this.resumeData.skills.length > 0 ? `
                <div class="resume-section">
                    <h2 class="section-title">Skills</h2>
                    <div class="resume-skills">
                        ${this.resumeData.skills.map(skill => `
                            <div class="skill-item">
                                <div class="skill-name">${skill.name || 'Skill'}</div>
                                <div class="skill-level-container">
                                    <div class="skill-level-bar" style="width: ${skill.level}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                ${this.resumeData.projects.length > 0 ? `
                <div class="resume-section">
                    <h2 class="section-title">Projects</h2>
                    <div class="resume-projects">
                        ${this.resumeData.projects.map(project => `
                            <div class="project-item">
                                <div class="project-header">
                                    <h3 class="project-name">${project.name || 'Project Name'}</h3>
                                    ${project.role ? `<div class="project-role">${project.role}</div>` : ''}
                                    ${project.startDate || project.endDate ? `
                                        <div class="project-duration">
                                            ${project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'}) : ''}
                                            ${project.startDate && project.endDate ? ' - ' : ''}
                                            ${project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short'}) : ''}
                                        </div>
                                    ` : ''}
                                </div>
                                ${project.url ? `<div class="project-url"><a href="${project.url}" target="_blank">${project.url}</a></div>` : ''}
                                ${project.description ? `<div class="project-description">${project.description}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="resume-footer">
                    ${this.resumeData.certifications.length > 0 ? `
                    <div class="resume-certifications">
                        <h2 class="section-title">Certifications</h2>
                        <ul class="certifications-list">
                            ${this.resumeData.certifications.map(cert => `
                                <li>
                                    <strong>${cert.name || 'Certification'}</strong>
                                    ${cert.issuer ? `, ${cert.issuer}` : ''}
                                    ${cert.date ? ` (${new Date(cert.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short'})})` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${this.resumeData.languages.length > 0 ? `
                    <div class="resume-languages">
                        <h2 class="section-title">Languages</h2>
                        <ul class="languages-list">
                            ${this.resumeData.languages.map(lang => `
                                <li>
                                    <strong>${lang.language || 'Language'}</strong>
                                    ${lang.proficiency ? ` - ${lang.proficiency}` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${this.resumeData.interests.length > 0 ? `
                    <div class="resume-interests">
                        <h2 class="section-title">Interests</h2>
                        <ul class="interests-list">
                            ${this.resumeData.interests.map(interest => `
                                <li>${interest}</li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    /**
     * Generate CSS styles for modern template
     * @returns {string} CSS styles
     */
    getModernTemplateStyles() {
        return `
            .resume-preview {
                font-family: 'Open Sans', Arial, sans-serif;
                color: #333;
                line-height: 1.5;
                padding: 25px;
                max-width: 800px;
                margin: 0 auto;
                background-color: white;
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
            }
            
            .modern-template .resume-header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px solid ${this.currentTemplate.primaryColor};
                padding-bottom: 20px;
            }
            
            .modern-template .resume-name {
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                color: #333;
            }
            
            .modern-template .resume-title {
                font-size: 18px;
                color: ${this.currentTemplate.primaryColor};
                margin: 5px 0 0;
            }
            
            .modern-template .resume-contact {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 15px;
                margin-bottom: 25px;
                font-size: 14px;
            }
            
            .modern-template .contact-item {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .modern-template .contact-item i {
                color: ${this.currentTemplate.primaryColor};
            }
            
            .modern-template .resume-section {
                margin-bottom: 25px;
            }
            
            .modern-template .section-title {
                font-size: 18px;
                font-weight: 600;
                margin: 0 0 15px;
                color: ${this.currentTemplate.primaryColor};
                border-bottom: 1px solid #eee;
                padding-bottom: 5px;
            }
            
            .modern-template .resume-summary p {
                margin: 0;
                text-align: justify;
            }
            
            .modern-template .experience-item,
            .modern-template .education-item,
            .modern-template .project-item {
                margin-bottom: 15px;
            }
            
            .modern-template .experience-header,
            .modern-template .education-header,
            .modern-template .project-header {
                margin-bottom: 5px;
            }
            
            .modern-template .experience-position,
            .modern-template .education-degree,
            .modern-template .project-name {
                font-size: 16px;
                font-weight: 600;
                margin: 0;
                color: #333;
            }
            
            .modern-template .experience-company,
            .modern-template .education-institution,
            .modern-template .project-role {
                font-weight: 600;
                color: #666;
            }
            
            .modern-template .experience-duration,
            .modern-template .education-duration,
            .modern-template .project-duration,
            .modern-template .experience-location,
            .modern-template .education-location {
                font-size: 14px;
                color: #777;
            }
            
            .modern-template .experience-description,
            .modern-template .education-description,
            .modern-template .project-description {
                font-size: 14px;
                margin-top: 5px;
                text-align: justify;
            }
            
            .modern-template .resume-skills {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px 20px;
            }
            
            .modern-template .skill-item {
                margin-bottom: 5px;
            }
            
            .modern-template .skill-name {
                font-weight: 600;
                margin-bottom: 3px;
            }
            
            .modern-template .skill-level-container {
                height: 6px;
                background-color: #eee;
                border-radius: 3px;
            }
            
            .modern-template .skill-level-bar {
                height: 100%;
                background-color: ${this.currentTemplate.primaryColor};
                border-radius: 3px;
            }
            
            .modern-template .resume-footer {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-top: 20px;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }
            
            .modern-template .certifications-list,
            .modern-template .languages-list,
            .modern-template .interests-list {
                padding-left: 20px;
                margin: 0;
            }
            
            .modern-template .certifications-list li,
            .modern-template .languages-list li,
            .modern-template .interests-list li {
                margin-bottom: 5px;
            }
            
            @media print {
                body * {
                    visibility: hidden;
                }
                
                .resume-preview, .resume-preview * {
                    visibility: visible;
                }
                
                .resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    box-shadow: none;
                }
            }
        `;
    }

    /**
     * Generate classic template HTML
     * @returns {string} HTML for classic template
     */
    generateClassicTemplate() {
        // Classic template implementation
        return this.generateModernTemplate(); // Placeholder
    }

    /**
     * Generate CSS styles for classic template
     * @returns {string} CSS styles
     */
    getClassicTemplateStyles() {
        // Classic template styles
        return this.getModernTemplateStyles(); // Placeholder
    }

    /**
     * Generate minimal template HTML
     * @returns {string} HTML for minimal template
     */
    generateMinimalTemplate() {
        // Minimal template implementation
        return this.generateModernTemplate(); // Placeholder
    }

    /**
     * Generate CSS styles for minimal template
     * @returns {string} CSS styles
     */
    getMinimalTemplateStyles() {
        // Minimal template styles
        return this.getModernTemplateStyles(); // Placeholder
    }

    /**
     * Generate PDF from resume
     */
    generatePDF() {
        const previewContainer = document.getElementById('resumePreview');
        if (!previewContainer) return;
        
        // Show loading notification
        if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
            JaatUIAnimator.showNotification('Generating PDF...', 'info');
        }
        
        try {
            // Use HTML to PDF library
            import('html2pdf.js')
                .then(html2pdf => {
                    const filename = `resume-${this.currentTemplate.id}-${Date.now()}.pdf`;
                    
                    // Generate PDF
                    html2pdf.default()
                        .from(previewContainer)
                        .set({
                            margin: 10,
                            filename: filename,
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: { scale: 2 },
                            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                        })
                        .save()
                        .then(() => {
                            // Show success notification
                            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                                JaatUIAnimator.showNotification('PDF Generated Successfully!', 'success');
                            }
                        })
                        .catch(error => {
                            console.error('Error generating PDF:', error);
                            
                            // Show error notification
                            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                                JaatUIAnimator.showNotification('Failed to generate PDF', 'error');
                            }
                        });
                })
                .catch(error => {
                    console.error('Error loading html2pdf:', error);
                    
                    // Show fallback message
                    alert('PDF generation library not loaded. Please try again later.');
                });
        } catch (error) {
            console.error('Error generating PDF:', error);
            
            // Show error notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('Failed to generate PDF', 'error');
            }
        }
    }

    /**
     * Generate profile summary with AI
     */
    generateSummaryWithAI() {
        // Collect data for AI
        const name = this.resumeData.personal.name;
        const title = this.resumeData.personal.title;
        const experience = this.resumeData.experience;
        const skills = this.resumeData.skills.map(s => s.name).filter(Boolean);
        
        // Check if we have enough data
        if (!name && !title && experience.length === 0 && skills.length === 0) {
            alert('Please fill in some basic information first (name, title, experience, or skills)');
            return;
        }
        
        // Show loading state
        const summaryField = document.getElementById('summary');
        if (summaryField) {
            const originalValue = summaryField.value;
            summaryField.value = 'Generating professional summary with AI...';
            summaryField.disabled = true;
            
            // Simulate AI generation
            setTimeout(() => {
                // Generate summary based on available data
                let summary = '';
                
                if (title) {
                    summary += `Highly motivated ${title} `;
                } else {
                    summary += 'Highly motivated professional ';
                }
                
                if (experience.length > 0) {
                    summary += `with ${experience.length} years of experience `;
                    
                    // Add most recent role
                    const recentExp = experience[0];
                    if (recentExp.position && recentExp.company) {
                        summary += `as a ${recentExp.position} at ${recentExp.company}. `;
                    } else {
                        summary += 'in the industry. ';
                    }
                } else {
                    summary += 'seeking to leverage skills and knowledge in a challenging role. ';
                }
                
                if (skills.length > 0) {
                    summary += 'Skilled in ' + skills.slice(0, 3).join(', ');
                    if (skills.length > 3) {
                        summary += `, and other technical competencies. `;
                    } else {
                        summary += '. ';
                    }
                }
                
                summary += 'Strong analytical and problem-solving abilities with a proven track record of delivering results in fast-paced environments.';
                
                // Update field
                summaryField.value = summary;
                summaryField.disabled = false;
                
                // Update state
                this.resumeData.personal.summary = summary;
                
                // Show success notification
                if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                    JaatUIAnimator.showNotification('AI-generated summary created!', 'success');
                }
            }, 1500);
        }
    }

    /**
     * Generate experience description with AI
     * @param {number} index - Experience index
     */
    generateExperienceDescriptionWithAI(index) {
        const experience = this.resumeData.experience[index];
        if (!experience) return;
        
        const descField = document.getElementById(`experience-${index}-description`);
        if (!descField) return;
        
        // Check if we have enough data
        if (!experience.position && !experience.company) {
            alert('Please fill in position and company first');
            return;
        }
        
        // Show loading state
        const originalValue = descField.value;
        descField.value = 'Generating experience description with AI...';
        descField.disabled = true;
        
        // Simulate AI generation
        setTimeout(() => {
            // Generate description based on available data
            let description = '';
            
            if (experience.position && experience.company) {
                description += `As a ${experience.position} at ${experience.company}, I was responsible for managing key projects and initiatives. `;
                description += 'Led cross-functional teams to deliver high-quality solutions on time and within budget. ';
                description += 'Implemented best practices and innovative approaches that resulted in significant improvements in efficiency and performance. ';
                description += 'Collaborated with stakeholders to identify requirements and ensure successful project outcomes.';
            } else if (experience.position) {
                description += `As a ${experience.position}, I was responsible for managing key projects and initiatives. `;
                description += 'Led cross-functional teams to deliver high-quality solutions on time and within budget. ';
                description += 'Implemented best practices and innovative approaches that resulted in significant improvements in efficiency and performance. ';
                description += 'Collaborated with stakeholders to identify requirements and ensure successful project outcomes.';
            } else if (experience.company) {
                description += `During my time at ${experience.company}, I was responsible for managing key projects and initiatives. `;
                description += 'Led cross-functional teams to deliver high-quality solutions on time and within budget. ';
                description += 'Implemented best practices and innovative approaches that resulted in significant improvements in efficiency and performance. ';
                description += 'Collaborated with stakeholders to identify requirements and ensure successful project outcomes.';
            }
            
            // Update field
            descField.value = description;
            descField.disabled = false;
            
            // Update state
            experience.description = description;
            
            // Show success notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('AI-generated description created!', 'success');
            }
        }, 1500);
    }

    /**
     * Generate project description with AI
     * @param {number} index - Project index
     */
    generateProjectDescriptionWithAI(index) {
        const project = this.resumeData.projects[index];
        if (!project) return;
        
        const descField = document.getElementById(`project-${index}-description`);
        if (!descField) return;
        
        // Check if we have enough data
        if (!project.name) {
            alert('Please fill in project name first');
            return;
        }
        
        // Show loading state
        const originalValue = descField.value;
        descField.value = 'Generating project description with AI...';
        descField.disabled = true;
        
        // Simulate AI generation
        setTimeout(() => {
            // Generate description based on available data
            let description = '';
            
            if (project.name && project.role) {
                description += `As ${project.role} for the ${project.name} project, I led the development and implementation of key features. `;
                description += 'Collaborated with team members to design and deliver a robust solution that met all requirements. ';
                description += 'Applied best practices in software development and project management to ensure successful outcomes.';
            } else if (project.name) {
                description += `The ${project.name} project involved designing and implementing a comprehensive solution to address specific challenges. `;
                description += 'Led development efforts and collaborated with stakeholders to ensure all requirements were met. ';
                description += 'Utilized modern technologies and methodologies to deliver a high-quality result on time and within budget.';
            }
            
            // Update field
            descField.value = description;
            descField.disabled = false;
            
            // Update state
            project.description = description;
            
            // Show success notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('AI-generated description created!', 'success');
            }
        }, 1500);
    }

    /**
     * Suggest skills with AI
     */
    suggestSkillsWithAI() {
        // Collect data for AI
        const title = this.resumeData.personal.title;
        const experience = this.resumeData.experience;
        
        // Check if we have enough data
        if (!title && experience.length === 0) {
            alert('Please fill in title or experience information first');
            return;
        }
        
        // Show loading notification
        if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
            JaatUIAnimator.showNotification('Generating skills suggestions...', 'info');
        }
        
        // Simulate AI generation
        setTimeout(() => {
            // Generate skills based on available data
            const suggestedSkills = [];
            
            if (title && title.toLowerCase().includes('developer')) {
                suggestedSkills.push(
                    { name: 'JavaScript', level: 85 },
                    { name: 'React.js', level: 80 },
                    { name: 'Node.js', level: 75 },
                    { name: 'TypeScript', level: 70 },
                    { name: 'HTML/CSS', level: 90 },
                    { name: 'Git', level: 85 },
                    { name: 'RESTful APIs', level: 80 }
                );
            } else if (title && title.toLowerCase().includes('designer')) {
                suggestedSkills.push(
                    { name: 'UI/UX Design', level: 90 },
                    { name: 'Adobe Creative Suite', level: 85 },
                    { name: 'Figma', level: 80 },
                    { name: 'Sketch', level: 75 },
                    { name: 'Prototyping', level: 85 },
                    { name: 'User Research', level: 70 },
                    { name: 'Design Systems', level: 75 }
                );
            } else if (title && title.toLowerCase().includes('manager')) {
                suggestedSkills.push(
                    { name: 'Project Management', level: 90 },
                    { name: 'Leadership', level: 85 },
                    { name: 'Strategic Planning', level: 80 },
                    { name: 'Team Building', level: 85 },
                    { name: 'Budgeting', level: 75 },
                    { name: 'Stakeholder Management', level: 80 },
                    { name: 'Risk Management', level: 75 }
                );
            } else {
                // Default skills for various roles
                suggestedSkills.push(
                    { name: 'Problem Solving', level: 85 },
                    { name: 'Communication', level: 90 },
                    { name: 'Team Collaboration', level: 85 },
                    { name: 'Time Management', level: 80 },
                    { name: 'Critical Thinking', level: 85 },
                    { name: 'Adaptability', level: 80 },
                    { name: 'Leadership', level: 75 }
                );
            }
            
            // Add suggested skills
            const skillsContainer = document.getElementById('skillsContainer');
            if (skillsContainer) {
                // Add the skills to the state
                this.resumeData.skills = this.resumeData.skills.concat(suggestedSkills);
                
                // Clear container and re-render all skills
                skillsContainer.innerHTML = '';
                this.resumeData.skills.forEach((skill, index) => {
                    this.renderSkillItem(skillsContainer, skill, index);
                });
                
                // Show success notification
                if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                    JaatUIAnimator.showNotification('AI skills suggestion added!', 'success');
                }
            }
        }, 1500);
    }

    /**
     * Suggest interests with AI
     */
    suggestInterestsWithAI() {
        const interestsInput = document.getElementById('interestsInput');
        if (!interestsInput) return;
        
        // Show loading state
        const originalValue = interestsInput.value;
        interestsInput.value = 'Generating interests suggestions with AI...';
        interestsInput.disabled = true;
        
        // Simulate AI generation
        setTimeout(() => {
            // Generate interests
            const suggestedInterests = [
                'Web Development',
                'Reading Technology Blogs',
                'Hiking',
                'Photography',
                'Learning New Programming Languages',
                'Open Source Contributing',
                'Tech Meetups',
                'Fitness & Running'
            ];
            
            // Update field
            interestsInput.value = suggestedInterests.join('\n');
            interestsInput.disabled = false;
            
            // Update state
            this.resumeData.interests = suggestedInterests;
            
            // Show success notification
            if (window.JaatUIAnimator && JaatUIAnimator.showNotification) {
                JaatUIAnimator.showNotification('AI-generated interests created!', 'success');
            }
        }, 1500);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResumeBuilder };
} else {
    // Add to global scope for browser usage
    window.ResumeBuilder = ResumeBuilder;
}