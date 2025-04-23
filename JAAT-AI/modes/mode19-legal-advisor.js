/**
 * JAAT-AI Legal Advisor Mode
 * AI mode providing general legal information and guidance
 * Mode ID: 19
 */

class LegalAdvisorMode {
    constructor() {
        // Mode metadata
        this.id = "19";
        this.name = "Legal Advisor";
        this.description = "Your AI assistant for general legal information and guidance";
        this.icon = "ri-scales-3-line";
        this.color = "#8b5cf6"; // Purple color
        this.category = "professional";
        this.version = "1.0.0";
        
        // Mode configuration
        this.config = {
            maxResponseLength: 4000,
            responseSpeed: "detailed", // fast, moderate, detailed
            personalityLevel: 5, // 1-10 scale (higher = more personality)
            creativityLevel: 4, // 1-10 scale
            formalityLevel: 8, // 1-10 scale (higher = more formal)
            memoryEnabled: true,
            contextualAwarenessEnabled: true,
            suggestionsEnabled: true,
            clarityLevel: 9, // 1-10 scale
            cautionLevel: 10, // 1-10 scale
            jurisdictionAwareness: true
        };
        
        // Mode state
        this.state = {
            conversationHistory: [],
            lastInteractionTime: null,
            userPreferences: {},
            legalTopics: [], // Topics the user has explored
            currentJurisdiction: "general", // Default to general (non-specific) jurisdiction
            userSituation: null, // Brief description of user's legal situation
            sessionStartTime: new Date(),
            responseCount: 0,
            disclaimerAccepted: false
        };
        
        // Legal topics and areas
        this.legalAreas = {
            "contract_law": {
                name: "Contract Law",
                description: "Formation, terms, performance, and remedies for breaches of agreements",
                subtopics: [
                    "Contract Formation",
                    "Contract Terms and Interpretation",
                    "Breach of Contract",
                    "Remedies for Breach",
                    "Contract Defenses",
                    "Types of Contracts"
                ]
            },
            "family_law": {
                name: "Family Law",
                description: "Legal issues related to family relationships, including marriage, divorce, and child custody",
                subtopics: [
                    "Marriage and Civil Unions",
                    "Divorce and Separation",
                    "Child Custody and Support",
                    "Adoption",
                    "Domestic Violence",
                    "Prenuptial Agreements"
                ]
            },
            "employment_law": {
                name: "Employment Law",
                description: "Legal rights and obligations within the employer-employee relationship",
                subtopics: [
                    "Hiring and Firing",
                    "Workplace Discrimination",
                    "Workplace Harassment",
                    "Wages and Hours",
                    "Employee Benefits",
                    "Workplace Safety",
                    "Employment Contracts"
                ]
            },
            "real_estate_law": {
                name: "Real Estate Law",
                description: "Legal aspects of property ownership, transfer, and rental",
                subtopics: [
                    "Property Ownership",
                    "Buying and Selling Property",
                    "Landlord-Tenant Relationships",
                    "Zoning and Land Use",
                    "Mortgages and Foreclosure",
                    "Property Disputes"
                ]
            },
            "intellectual_property": {
                name: "Intellectual Property",
                description: "Legal protection for creations of the mind",
                subtopics: [
                    "Copyright",
                    "Trademarks",
                    "Patents",
                    "Trade Secrets",
                    "IP Licensing",
                    "IP Infringement"
                ]
            },
            "business_law": {
                name: "Business Law",
                description: "Legal aspects of forming and operating a business",
                subtopics: [
                    "Business Formation",
                    "Business Structures",
                    "Corporate Governance",
                    "Business Contracts",
                    "Business Regulations",
                    "Mergers and Acquisitions"
                ]
            },
            "consumer_law": {
                name: "Consumer Law",
                description: "Legal protections for consumers in the marketplace",
                subtopics: [
                    "Consumer Contracts",
                    "Consumer Protection",
                    "Product Liability",
                    "Debt Collection",
                    "Credit and Lending",
                    "Consumer Privacy"
                ]
            },
            "criminal_law": {
                name: "Criminal Law",
                description: "Laws related to crimes and their punishment",
                subtopics: [
                    "Criminal Offenses",
                    "Criminal Procedure",
                    "Criminal Defenses",
                    "Sentencing",
                    "Rights of the Accused",
                    "Juvenile Justice"
                ]
            },
            "personal_injury": {
                name: "Personal Injury Law",
                description: "Legal recourse for injuries caused by others",
                subtopics: [
                    "Negligence",
                    "Premises Liability",
                    "Medical Malpractice",
                    "Product Liability Injuries",
                    "Car Accident Injuries",
                    "Workplace Injuries"
                ]
            },
            "immigration_law": {
                name: "Immigration Law",
                description: "Laws governing immigration and citizenship",
                subtopics: [
                    "Visas",
                    "Green Cards",
                    "Citizenship",
                    "Deportation",
                    "Asylum and Refugee Status",
                    "Immigration Enforcement"
                ]
            }
        };
        
        // Common legal terms and definitions
        this.legalTerms = {
            "plaintiff": "The person who initiates a lawsuit.",
            "defendant": "The person against whom a lawsuit is filed.",
            "tort": "A civil wrong that causes harm to another person.",
            "negligence": "Failure to exercise reasonable care, resulting in damage or injury to another.",
            "contract": "A legally binding agreement between two or more parties.",
            "statute": "A law enacted by a legislative body.",
            "jurisdiction": "The authority of a court to hear and decide a case.",
            "liability": "Legal responsibility for one's actions or omissions.",
            "damages": "Money awarded by a court to compensate for harm caused by another party.",
            "deposition": "Sworn testimony given outside of court.",
            "discovery": "The pre-trial phase where parties obtain evidence from each other.",
            "litigation": "The process of resolving disputes through the court system.",
            "mediation": "A form of alternative dispute resolution where a neutral third party helps parties reach a settlement.",
            "arbitration": "A form of alternative dispute resolution where a neutral third party makes a binding decision.",
            "injunction": "A court order requiring a party to do or refrain from doing a specific action.",
            "affidavit": "A written statement sworn under oath.",
            "subpoena": "A legal document ordering a person to appear in court or provide documents.",
            "precedent": "A previous court decision that guides future similar cases.",
            "statute_of_limitations": "The time limit for filing a lawsuit.",
            "burden_of_proof": "The obligation to prove one's claims in court."
        };
        
        // Major jurisdictions and their characteristics
        this.jurisdictions = {
            "general": {
                name: "General Legal Information",
                description: "General legal principles without jurisdiction-specific details",
                disclaimer: "This information is very general and does not account for specific laws in your jurisdiction. Laws vary significantly by country, state, and locality."
            },
            "us": {
                name: "United States",
                description: "Federal legal system with state-specific variations",
                disclaimer: "The US has both federal laws and state-specific laws that may vary considerably. This information is general and may not apply to your specific state or locality."
            },
            "uk": {
                name: "United Kingdom",
                description: "Common law system with regional variations",
                disclaimer: "The UK legal system has variations between England and Wales, Scotland, and Northern Ireland. This information is general and may not address jurisdiction-specific details."
            },
            "eu": {
                name: "European Union",
                description: "Supranational legal framework with member state implementations",
                disclaimer: "EU law provides a framework, but implementation and additional laws vary by member state. This information is general and may not account for country-specific regulations."
            },
            "canada": {
                name: "Canada",
                description: "Federal legal system with provincial variations",
                disclaimer: "Canada has both federal laws and provincial laws that may vary. This information is general and may not apply to your specific province or territory."
            },
            "australia": {
                name: "Australia",
                description: "Federal legal system with state and territorial variations",
                disclaimer: "Australia has both federal laws and state/territory laws that may vary. This information is general and may not apply to your specific state or territory."
            }
        };
        
        // Legal document types and descriptions
        this.legalDocuments = {
            "contract": {
                name: "Contract",
                description: "A legally binding agreement between parties",
                key_elements: [
                    "Offer and acceptance",
                    "Consideration (something of value exchanged)",
                    "Legal capacity of parties",
                    "Lawful purpose",
                    "Mutual agreement (meeting of the minds)"
                ]
            },
            "will": {
                name: "Last Will and Testament",
                description: "A legal document specifying how a person's assets are to be distributed after death",
                key_elements: [
                    "Identification of the testator (person making the will)",
                    "Clear distribution instructions",
                    "Appointment of executor",
                    "Signature of testator",
                    "Witness signatures",
                    "Date of creation"
                ]
            },
            "power_of_attorney": {
                name: "Power of Attorney",
                description: "A legal document giving one person authority to act for another person",
                key_elements: [
                    "Identification of principal (person granting authority)",
                    "Identification of agent/attorney-in-fact (person receiving authority)",
                    "Scope of powers granted",
                    "Duration of authority",
                    "Signature of principal",
                    "Notarization (often required)"
                ]
            },
            "lease": {
                name: "Lease Agreement",
                description: "A contract outlining terms for renting property",
                key_elements: [
                    "Identification of landlord and tenant",
                    "Description of property",
                    "Rental amount and payment terms",
                    "Lease duration",
                    "Deposit information",
                    "Rights and responsibilities of both parties",
                    "Signatures of all parties"
                ]
            },
            "nda": {
                name: "Non-Disclosure Agreement",
                description: "A contract requiring confidentiality of shared information",
                key_elements: [
                    "Identification of parties",
                    "Definition of confidential information",
                    "Scope of confidentiality obligation",
                    "Exclusions from confidentiality",
                    "Term of agreement",
                    "Remedies for breach",
                    "Signatures of all parties"
                ]
            }
        };
        
        // Legal process guides
        this.legalProcesses = {
            "lawsuit": {
                name: "Filing a Lawsuit",
                description: "The process of initiating a legal action against another party",
                general_steps: [
                    "Consult with an attorney to evaluate your case",
                    "Prepare a complaint that outlines your claims",
                    "File the complaint with the appropriate court",
                    "Serve the complaint on the defendant",
                    "Await the defendant's response",
                    "Engage in the discovery process",
                    "Participate in pre-trial proceedings",
                    "Attend trial if no settlement is reached",
                    "Consider appeals if necessary"
                ]
            },
            "small_claims": {
                name: "Small Claims Court",
                description: "Simplified court process for resolving minor disputes",
                general_steps: [
                    "Determine if your case meets small claims criteria (usually based on amount)",
                    "Gather documentation supporting your claim",
                    "File a claim form with the small claims court",
                    "Pay the filing fee",
                    "Serve notice to the other party",
                    "Prepare your presentation",
                    "Attend the hearing",
                    "Collect judgment if successful"
                ]
            },
            "mediation": {
                name: "Mediation Process",
                description: "A voluntary process using a neutral third party to resolve disputes",
                general_steps: [
                    "Agree to mediation with the other party",
                    "Select a mediator",
                    "Prepare your case and documentation",
                    "Attend mediation session(s)",
                    "Work with the mediator to identify issues and potential solutions",
                    "Negotiate toward a mutually acceptable agreement",
                    "Formalize the agreement if resolution is reached"
                ]
            },
            "incorporation": {
                name: "Business Incorporation",
                description: "The process of legally forming a corporation",
                general_steps: [
                    "Choose a business name and check availability",
                    "Select a corporate structure",
                    "File articles of incorporation with state agency",
                    "Pay filing fees",
                    "Create corporate bylaws",
                    "Hold initial board of directors meeting",
                    "Issue stock certificates",
                    "Obtain necessary business licenses and permits",
                    "Apply for an EIN (Employer Identification Number)",
                    "Open a corporate bank account"
                ]
            },
            "divorce": {
                name: "Divorce Process",
                description: "Legal dissolution of a marriage",
                general_steps: [
                    "Ensure you meet residency requirements for filing",
                    "File a petition for divorce",
                    "Serve divorce papers to your spouse",
                    "Wait for your spouse's response",
                    "Exchange financial information and disclosures",
                    "Negotiate settlement on property, support, and custody",
                    "Attend mediation if required or desired",
                    "Prepare a settlement agreement if terms are agreed upon",
                    "Attend court hearing(s)",
                    "Receive final judgment of divorce"
                ]
            }
        };
        
        // Common legal questions and answers
        this.commonQuestions = {
            "contract_law": [
                {
                    question: "Is a verbal agreement legally binding?",
                    answer: "In many jurisdictions, verbal agreements can be legally binding, but certain types of contracts (such as those involving real estate or contracts that cannot be performed within one year) typically must be in writing under the Statute of Frauds. Even when verbal agreements are legally binding, they can be difficult to prove without documentation."
                },
                {
                    question: "What makes a contract invalid?",
                    answer: "A contract may be invalid for several reasons, including: lack of capacity (e.g., one party is a minor or mentally incompetent), illegal purpose, fraud or misrepresentation, duress or undue influence, mistake about a material fact, lack of consideration, or violation of public policy."
                }
            ],
            "family_law": [
                {
                    question: "How is child custody determined?",
                    answer: "Child custody determinations typically focus on the 'best interests of the child.' Courts consider factors such as each parent's ability to provide care, the child's relationship with each parent, stability, health and safety issues, and sometimes the child's preferences (depending on age). Many jurisdictions favor arrangements that allow the child to maintain relationships with both parents when possible."
                },
                {
                    question: "How is property divided in a divorce?",
                    answer: "Property division varies by jurisdiction. In 'community property' states/regions, marital assets are typically split 50/50. In 'equitable distribution' jurisdictions, assets are divided 'fairly' but not necessarily equally, based on factors like the length of marriage, each spouse's contribution, economic circumstances, and future needs."
                }
            ],
            "employment_law": [
                {
                    question: "Can I be fired without a reason?",
                    answer: "This depends on your jurisdiction and employment status. In many places with 'at-will employment,' employers can terminate employment without cause, unless the termination violates anti-discrimination laws, employment contracts, or certain public policies. Other jurisdictions may require just cause for termination or follow specific procedural requirements."
                },
                {
                    question: "What constitutes workplace harassment?",
                    answer: "Workplace harassment generally involves unwelcome conduct based on protected characteristics (race, gender, religion, etc.) that creates a hostile work environment or results in adverse employment decisions. This can include offensive jokes, slurs, physical assaults, threats, intimidation, ridicule, insults, offensive pictures, or interference with work."
                }
            ]
        };
        
        // Suggestions specific to this mode
        this.suggestions = [
            "What's involved in creating a will?",
            "Can I break my lease early?",
            "What should I do after a car accident?",
            "How do I form an LLC?",
            "What are my rights as an employee?",
            "How does child custody work?",
            "Do I need a patent for my invention?",
            "What's the difference between a felony and misdemeanor?",
            "How do I file a small claims case?",
            "What are the legal requirements for a contract?"
        ];
        
        // Special features
        this.features = {
            jurisdictionAwareness: true,
            legalDefinitions: true,
            documentTemplates: true,
            processGuidance: true,
            commonQuestionsAnswered: true,
            resourceReferrals: true,
            legalResearch: true,
            caseEvaluation: true,
            documentAnalysis: true,
            preventativeLegalAdvice: true
        };
        
        // Constants
        this.constants = {
            MAX_MEMORY_ITEMS: 50,
            DISCLAIMER: "This information is provided for general informational purposes only and does not constitute legal advice. It should not be relied upon as a substitute for consultation with a qualified attorney in your jurisdiction. Legal rules vary significantly by location and specific circumstances.",
            GREETING_PHRASES: [
                "Welcome to the Legal Advisor. How can I assist you with legal information today?",
                "Hello, I'm your AI legal information assistant. What legal topic would you like to explore?",
                "I can provide general legal information and guidance. What would you like to know?",
                "I'm here to help with legal information. What legal question can I assist with today?",
                "Welcome. I can provide general legal information but not specific legal advice. What topic are you interested in?"
            ]
        };
    }
    
    /**
     * Initialize the mode
     * @param {Object} options - Initialization options
     * @returns {Promise<boolean>} Initialization success status
     */
    async initialize(options = {}) {
        console.log(`Initializing Legal Advisor mode...`);
        
        // Apply custom options if provided
        if (options.config) {
            this.config = { ...this.config, ...options.config };
        }
        
        // Set jurisdiction if provided
        if (options.jurisdiction && this.jurisdictions[options.jurisdiction]) {
            this.state.currentJurisdiction = options.jurisdiction;
        }
        
        // Set user situation if provided
        if (options.userSituation) {
            this.state.userSituation = options.userSituation;
        }
        
        // Load user preferences from storage if available
        try {
            const savedPreferences = localStorage.getItem('jaat-mode19-preferences');
            if (savedPreferences) {
                this.state.userPreferences = JSON.parse(savedPreferences);
                console.log("User preferences loaded for Legal Advisor mode");
                
                // Load jurisdiction if saved
                if (this.state.userPreferences.currentJurisdiction) {
                    this.state.currentJurisdiction = this.state.userPreferences.currentJurisdiction;
                }
                
                // Load legal topics if saved
                if (this.state.userPreferences.legalTopics) {
                    this.state.legalTopics = this.state.userPreferences.legalTopics;
                }
                
                // Load user situation if saved
                if (this.state.userPreferences.userSituation) {
                    this.state.userSituation = this.state.userPreferences.userSituation;
                }
                
                // Load disclaimer acceptance if saved
                if (this.state.userPreferences.disclaimerAccepted) {
                    this.state.disclaimerAccepted = this.state.userPreferences.disclaimerAccepted;
                }
            }
        } catch (error) {
            console.error("Error loading user preferences:", error);
        }
        
        // Load conversation history if memory is enabled
        if (this.config.memoryEnabled) {
            try {
                const savedHistory = localStorage.getItem('jaat-mode19-history');
                if (savedHistory) {
                    this.state.conversationHistory = JSON.parse(savedHistory);
                    
                    // Trim history if it exceeds max length
                    if (this.state.conversationHistory.length > this.constants.MAX_MEMORY_ITEMS) {
                        this.state.conversationHistory = this.state.conversationHistory.slice(
                            -this.constants.MAX_MEMORY_ITEMS
                        );
                    }
                    
                    console.log(`Loaded ${this.state.conversationHistory.length} conversation items`);
                }
            } catch (error) {
                console.error("Error loading conversation history:", error);
                this.state.conversationHistory = [];
            }
        }
        
        // Record initialization time
        this.state.sessionStartTime = new Date();
        
        console.log(`Legal Advisor mode initialized with jurisdiction: ${this.state.currentJurisdiction}`);
        return true;
    }
    
    /**
     * Get a greeting message
     * @returns {string} Greeting message
     */
    getGreeting() {
        const { GREETING_PHRASES } = this.constants;
        const randomIndex = Math.floor(Math.random() * GREETING_PHRASES.length);
        return GREETING_PHRASES[randomIndex];
    }
    
    /**
     * Process user input and generate a legal response
     * @param {string} userInput - The user's input text
     * @param {Object} context - Additional context for the response
     * @returns {Promise<Object>} Response object with legal content
     */
    async processInput(userInput, context = {}) {
        if (!userInput || userInput.trim() === '') {
            return {
                text: "I'm your AI legal information assistant. I can provide general legal information on various topics like contracts, employment, family law, and more. Note that I don't provide specific legal advice, and laws vary by jurisdiction. What legal topic can I help you understand today?",
                type: "text",
                source: this.name
            };
        }
        
        console.log(`Processing legal request`);
        
        // Record interaction time
        this.state.lastInteractionTime = new Date();
        
        // Check if disclaimer has been accepted yet
        if (!this.state.disclaimerAccepted) {
            // If user accepts the disclaimer
            if (/\b(?:i\s+(?:accept|agree|understand|acknowledge))\b/i.test(userInput.toLowerCase())) {
                this.state.disclaimerAccepted = true;
                this.savePreferences({ disclaimerAccepted: true });
            } else {
                // Provide disclaimer and request acknowledgment
                return {
                    text: `Before we proceed, please note: I provide general legal information, not legal advice. I cannot replace consultation with a qualified attorney who can review your specific circumstances. Laws vary by jurisdiction and change over time.\n\nTo continue, please explicitly acknowledge that you understand I'm providing general information, not legal advice, by saying "I understand" or "I accept".`,
                    type: "text",
                    source: this.name,
                    requiresAcknowledgment: true
                };
            }
        }
        
        // Add user message to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "user",
                content: userInput,
                timestamp: this.state.lastInteractionTime
            });
        }
        
        // Detect type of legal request
        const requestType = this.detectRequestType(userInput);
        
        // Identify legal topic if applicable
        const topic = this.identifyLegalTopic(userInput);
        if (topic) {
            // Add to list of topics if not already present
            if (!this.state.legalTopics.includes(topic)) {
                this.state.legalTopics.push(topic);
                this.savePreferences({ legalTopics: this.state.legalTopics });
            }
        }
        
        // Try to identify jurisdiction if mentioned
        const jurisdiction = this.identifyJurisdiction(userInput);
        if (jurisdiction) {
            this.state.currentJurisdiction = jurisdiction;
            this.savePreferences({ currentJurisdiction: jurisdiction });
        }
        
        // Generate appropriate legal response
        const response = await this.generateLegalResponse(
            userInput, 
            requestType, 
            topic,
            context
        );
        
        // Add assistant response to conversation history
        if (this.config.memoryEnabled) {
            this.state.conversationHistory.push({
                role: "assistant",
                content: response.text,
                timestamp: new Date(),
                requestType: requestType,
                topic: topic
            });
            
            // Save updated history
            try {
                localStorage.setItem(
                    'jaat-mode19-history',
                    JSON.stringify(this.state.conversationHistory)
                );
            } catch (error) {
                console.error("Error saving conversation history:", error);
            }
        }
        
        // Increment response counter
        this.state.responseCount++;
        
        return response;
    }
    
    /**
     * Detect the type of legal request
     * @param {string} input - User input
     * @returns {string} Request type
     */
    detectRequestType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for legal term definition request
        if (/\b(?:what|define|explain|mean|means|meaning of|tell me about)\s+(?:is|are|does)?\s+(?:a|an|the)?\s*(?:term|legal term|legally|in legal terms)?\b/i.test(normalizedInput) &&
            Object.keys(this.legalTerms).some(term => normalizedInput.includes(term))) {
            return "term_definition";
        }
        
        // Check for legal document information request
        if (/\b(?:how to|what is|create|draft|write|prepare|need|require|make|form|template for)\s+(?:a|an|the)?\s*(?:contract|will|lease|agreement|document|nda|testament|power of attorney)\b/i.test(normalizedInput)) {
            return "document_information";
        }
        
        // Check for legal process guidance request
        if (/\b(?:how|what|steps|process|procedure|file|start|begin|initiate)\s+(?:to|do I|can I|should I|would I|is the process|are the steps)?\s+(?:for|to|in)?\s*(?:sue|filing|lawsuit|divorce|incorporate|mediation|small claims|court)\b/i.test(normalizedInput)) {
            return "process_guidance";
        }
        
        // Check for rights and obligations request
        if (/\b(?:my rights|legal rights|legally|obligation|required|duty|responsibilities|liable|can I|can they|allowed to|entitled to)\b/i.test(normalizedInput)) {
            return "rights_and_obligations";
        }
        
        // Check for case evaluation or analysis request
        if (/\b(?:my case|my situation|circumstances|scenario|hypothetical|advice|evaluate|analyze|review|assess|chances|likely outcome)\b/i.test(normalizedInput)) {
            return "case_evaluation";
        }
        
        // Check for legal consequences request
        if (/\b(?:what happens|consequences|penalty|punishable|fine|jail|prison|criminal|punishment|sentence|legal trouble|get in trouble|prosecuted|charged|liability)\b/i.test(normalizedInput)) {
            return "legal_consequences";
        }
        
        // Check for legal resources request
        if (/\b(?:resources|where can I|how do I find|recommend|suggestion|referral|lawyer|attorney|legal aid|help|assistance)\b/i.test(normalizedInput)) {
            return "legal_resources";
        }
        
        // Default to general legal inquiry
        return "general_legal_inquiry";
    }
    
    /**
     * Identify legal topic from user input
     * @param {string} input - User input
     * @returns {string|null} Legal topic or null
     */
    identifyLegalTopic(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of legal areas
        for (const area in this.legalAreas) {
            if (normalizedInput.includes(area.replace('_', ' ')) || 
                normalizedInput.includes(this.legalAreas[area].name.toLowerCase())) {
                return area;
            }
            
            // Check subtopics
            for (const subtopic of this.legalAreas[area].subtopics) {
                if (normalizedInput.includes(subtopic.toLowerCase())) {
                    return area;
                }
            }
        }
        
        // Check for specific keywords associated with each area
        const topicKeywords = {
            "contract_law": ["contract", "agreement", "breach", "clause", "binding", "termination", "void", "terms", "sign", "parties"],
            "family_law": ["divorce", "custody", "marriage", "child support", "alimony", "spouse", "adoption", "prenup", "domestic", "family"],
            "employment_law": ["employee", "employer", "fired", "terminated", "workplace", "discrimination", "harassment", "wage", "overtime", "benefits", "worker", "job"],
            "real_estate_law": ["property", "landlord", "tenant", "rent", "lease", "eviction", "mortgage", "foreclosure", "deed", "land", "zoning", "housing"],
            "intellectual_property": ["copyright", "trademark", "patent", "ip", "invention", "creative work", "brand", "logo", "author", "creator", "plagiarism"],
            "business_law": ["business", "company", "corporation", "llc", "partnership", "startup", "entrepreneur", "corporate", "board", "shareholders"],
            "consumer_law": ["consumer", "purchase", "refund", "warranty", "product", "service", "false advertising", "scam", "defective", "credit"],
            "criminal_law": ["crime", "criminal", "arrested", "charges", "defense", "prosecution", "guilty", "innocent", "jail", "prison", "felony", "misdemeanor", "conviction"],
            "personal_injury": ["injury", "accident", "hurt", "damage", "negligence", "malpractice", "compensation", "pain and suffering", "lawsuit", "insurance claim"],
            "immigration_law": ["immigration", "visa", "green card", "citizenship", "deportation", "asylum", "foreign", "immigrant", "naturalization", "passport"]
        };
        
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return topic;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Identify jurisdiction from user input
     * @param {string} input - User input
     * @returns {string|null} Jurisdiction or null
     */
    identifyJurisdiction(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of jurisdictions
        for (const jurisdiction in this.jurisdictions) {
            if (jurisdiction !== "general" && 
                (normalizedInput.includes(jurisdiction) || 
                 normalizedInput.includes(this.jurisdictions[jurisdiction].name.toLowerCase()))) {
                return jurisdiction;
            }
        }
        
        // Check for country/region keywords
        const jurisdictionKeywords = {
            "us": ["united states", "usa", "u.s.", "america", "american", "state law", "federal law", "u.s. law"],
            "uk": ["united kingdom", "britain", "british", "england", "scotland", "wales", "northern ireland", "uk law", "british law"],
            "eu": ["european union", "eu law", "european law", "europe"],
            "canada": ["canada", "canadian", "province", "canadian law"],
            "australia": ["australia", "australian", "australian law"]
        };
        
        for (const [jurisdiction, keywords] of Object.entries(jurisdictionKeywords)) {
            for (const keyword of keywords) {
                if (normalizedInput.includes(keyword)) {
                    return jurisdiction;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Generate a legal response
     * @param {string} userInput - The user's input
     * @param {string} requestType - Type of legal request
     * @param {string} topic - Legal topic if available
     * @param {Object} context - Additional context
     * @returns {Promise<Object>} Response object
     */
    async generateLegalResponse(userInput, requestType, topic, context = {}) {
        // In a real implementation, this would call an AI model API specialized in legal information
        // For now, we'll use a simple rule-based approach for demonstration
        
        let responseText = "";
        let responseType = "text";
        
        // Get jurisdiction information
        const jurisdictionInfo = this.jurisdictions[this.state.currentJurisdiction];
        
        // Generate response based on request type
        switch (requestType) {
            case "term_definition":
                responseText = this.defineLegalTerm(userInput);
                break;
                
            case "document_information":
                responseText = this.provideLegalDocumentInfo(userInput, topic);
                break;
                
            case "process_guidance":
                responseText = this.provideLegalProcessGuidance(userInput, topic);
                break;
                
            case "rights_and_obligations":
                responseText = this.explainRightsAndObligations(userInput, topic);
                break;
                
            case "case_evaluation":
                responseText = this.evaluateLegalCase(userInput, topic);
                break;
                
            case "legal_consequences":
                responseText = this.explainLegalConsequences(userInput, topic);
                break;
                
            case "legal_resources":
                responseText = this.suggestLegalResources(userInput, topic);
                break;
                
            default:
                responseText = this.provideGeneralLegalInformation(userInput, topic);
        }
        
        // Add jurisdiction-specific disclaimer
        responseText += `\n\n*${jurisdictionInfo.disclaimer}*`;
        
        // Add general disclaimer
        responseText += `\n\n*${this.constants.DISCLAIMER}*`;
        
        // Get appropriate legal suggestions
        const legalSuggestions = this.getLegalSuggestions(requestType, topic);
        
        return {
            text: responseText,
            type: responseType,
            source: this.name,
            timestamp: new Date(),
            requestType: requestType,
            topic: topic,
            jurisdiction: this.state.currentJurisdiction,
            suggestions: legalSuggestions
        };
    }
    
    /**
     * Define a legal term based on user input
     * @param {string} userInput - User's input
     * @returns {string} Legal term definition
     */
    defineLegalTerm(userInput) {
        // Extract legal term from user input
        const term = this.extractLegalTerm(userInput);
        
        if (!term || !this.legalTerms[term]) {
            return `# Legal Terminology

In a complete implementation with an AI model and legal expertise, I would provide precise definitions of legal terms, their usage in different contexts, and relevant examples.

To define a legal term, I need to know which specific term you're interested in learning about. Some common legal terms include:

- Contract: A legally binding agreement between parties
- Negligence: Failure to exercise reasonable care
- Liability: Legal responsibility for actions or omissions
- Plaintiff: Person who initiates a lawsuit
- Defendant: Person against whom a lawsuit is filed

Please let me know which legal term you'd like me to define, and I'll provide a comprehensive explanation.`;
        }
        
        const definition = this.legalTerms[term];
        
        return `# ${this.capitalizeFirstLetter(term)}

In a complete implementation with an AI model and legal expertise, I would provide a comprehensive definition of "${term}" along with its usage in legal contexts, examples, and related concepts.

## Definition

${definition}

## Legal Context

[Would explain how this term is used in legal proceedings or documents]

## Examples

[Would provide clear examples of how this term applies in practice]

## Jurisdictional Variations

[Would note any significant differences in how this term is understood across jurisdictions]

## Related Legal Terms

[Would list and briefly explain terms connected to ${term}]

## Historical Context

[Would provide brief historical development of the concept if relevant]

Would you like to:
- Learn about how ${term} applies in a specific situation?
- Understand related legal concepts?
- Explore the practical implications of ${term}?
- Learn about another legal term?`;
    }
    
    /**
     * Extract legal term from user input
     * @param {string} input - User input
     * @returns {string|null} Legal term or null
     */
    extractLegalTerm(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check if any legal terms are directly mentioned
        for (const term in this.legalTerms) {
            if (normalizedInput.includes(term)) {
                return term;
            }
        }
        
        // Pattern: what is/does X mean
        const whatIsPattern = /\b(?:what is|what's|what does|what are)\s+(?:a|an|the)?\s*(.+?)(?:\s+mean|\s+refer to|\s+in legal terms|\?|$)/i;
        const whatIsMatch = input.match(whatIsPattern);
        if (whatIsMatch && whatIsMatch[1]) {
            const potentialTerm = whatIsMatch[1].trim().toLowerCase();
            
            // Check if it closely matches any legal term
            for (const term in this.legalTerms) {
                if (potentialTerm.includes(term) || term.includes(potentialTerm)) {
                    return term;
                }
            }
        }
        
        // Pattern: define/explain X
        const definePattern = /\b(?:define|explain|tell me about)\s+(?:a|an|the)?\s*(.+?)(?:\?|$)/i;
        const defineMatch = input.match(definePattern);
        if (defineMatch && defineMatch[1]) {
            const potentialTerm = defineMatch[1].trim().toLowerCase();
            
            // Check if it closely matches any legal term
            for (const term in this.legalTerms) {
                if (potentialTerm.includes(term) || term.includes(potentialTerm)) {
                    return term;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide information about legal documents
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} Legal document information
     */
    provideLegalDocumentInfo(userInput, topic) {
        // Extract document type from user input
        const documentType = this.extractDocumentType(userInput);
        
        if (!documentType || !this.legalDocuments[documentType]) {
            return `# Legal Documents

In a complete implementation with an AI model and legal expertise, I would provide comprehensive information about various legal documents, their purpose, key components, and important considerations.

To provide information about a specific legal document, I need to know which document you're interested in. Common legal documents include:

- Contracts
- Wills and Testaments
- Power of Attorney
- Lease Agreements
- Non-Disclosure Agreements (NDAs)

Please let me know which legal document you'd like information about, and I'll provide a detailed explanation.`;
        }
        
        const documentInfo = this.legalDocuments[documentType];
        
        return `# ${documentInfo.name}

In a complete implementation with an AI model and legal expertise, I would provide comprehensive information about ${documentInfo.name.toLowerCase()} documents, including their purpose, key components, and important considerations.

## Purpose and Function

${documentInfo.description}

## Key Elements

A properly prepared ${documentInfo.name.toLowerCase()} typically includes:

${documentInfo.key_elements.map(element => `- ${element}`).join('\n')}

## Important Considerations

[Would explain critical factors to consider when creating or signing this document]

## Common Mistakes to Avoid

[Would outline frequent errors people make with this document type]

## Jurisdictional Variations

[Would note how requirements for this document may vary across jurisdictions]

## When to Seek Professional Help

[Would identify situations where professional legal assistance is particularly important]

## Additional Resources

[Would provide suggestions for reputable sources of document templates or further information]

Would you like to:
- Learn more about a specific aspect of ${documentInfo.name.toLowerCase()} documents?
- Understand the process for creating this document?
- Know about potential alternatives to this document?
- Explore related legal concepts?`;
    }
    
    /**
     * Extract document type from user input
     * @param {string} input - User input
     * @returns {string|null} Document type or null
     */
    extractDocumentType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of document types
        for (const docType in this.legalDocuments) {
            if (normalizedInput.includes(docType) || 
                normalizedInput.includes(this.legalDocuments[docType].name.toLowerCase())) {
                return docType;
            }
        }
        
        // Check for common document terms
        const documentTerms = {
            "contract": ["contract", "agreement", "legally binding agreement"],
            "will": ["will", "testament", "last will and testament", "will and testament"],
            "power_of_attorney": ["power of attorney", "poa", "legal authority", "legal power"],
            "lease": ["lease", "rental agreement", "tenancy agreement", "rental contract"],
            "nda": ["nda", "non-disclosure", "confidentiality agreement", "confidentiality"]
        };
        
        for (const [docType, terms] of Object.entries(documentTerms)) {
            for (const term of terms) {
                if (normalizedInput.includes(term)) {
                    return docType;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Provide guidance about legal processes
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} Legal process guidance
     */
    provideLegalProcessGuidance(userInput, topic) {
        // Extract process type from user input
        const processType = this.extractProcessType(userInput);
        
        if (!processType || !this.legalProcesses[processType]) {
            return `# Legal Processes

In a complete implementation with an AI model and legal expertise, I would provide step-by-step guidance on various legal processes, their requirements, timelines, and important considerations.

To provide information about a specific legal process, I need to know which process you're interested in. Common legal processes include:

- Filing a lawsuit
- Using small claims court
- Going through mediation
- Incorporating a business
- Getting divorced

Please let me know which legal process you'd like information about, and I'll provide a detailed explanation of the steps involved.`;
        }
        
        const processInfo = this.legalProcesses[processType];
        
        return `# ${processInfo.name}

In a complete implementation with an AI model and legal expertise, I would provide comprehensive guidance on the ${processInfo.name.toLowerCase()} process, including the steps involved, requirements, and important considerations.

## Overview

${processInfo.description}

## General Process

These steps may vary by jurisdiction, but generally include:

${processInfo.general_steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

## Timeframes

[Would provide typical timeframes for each stage of the process]

## Costs Involved

[Would outline typical costs associated with this process]

## Required Documentation

[Would list documents typically needed for this process]

## Potential Challenges

[Would identify common obstacles and how to address them]

## Jurisdictional Variations

[Would note significant differences in this process across jurisdictions]

## When to Seek Professional Help

[Would identify situations where professional legal assistance is particularly important]

## Additional Resources

[Would provide suggestions for helpful official websites or resources]

Would you like to:
- Learn more about a specific step in this process?
- Understand the documentation required?
- Know about alternatives to this process?
- Explore related legal concepts?`;
    }
    
    /**
     * Extract process type from user input
     * @param {string} input - User input
     * @returns {string|null} Process type or null
     */
    extractProcessType(input) {
        const normalizedInput = input.toLowerCase();
        
        // Check for direct mentions of process types
        for (const processType in this.legalProcesses) {
            if (normalizedInput.includes(processType) || 
                normalizedInput.includes(this.legalProcesses[processType].name.toLowerCase())) {
                return processType;
            }
        }
        
        // Check for common process terms
        const processTerms = {
            "lawsuit": ["lawsuit", "sue", "suing", "file a suit", "court case", "legal action", "litigation"],
            "small_claims": ["small claims", "small claim court"],
            "mediation": ["mediation", "mediator", "alternative dispute resolution", "adr"],
            "incorporation": ["incorporation", "incorporate", "form a corporation", "forming a company", "starting a business", "llc formation"],
            "divorce": ["divorce", "dissolution of marriage", "end marriage", "divorce procedure", "divorce process"]
        };
        
        for (const [processType, terms] of Object.entries(processTerms)) {
            for (const term of terms) {
                if (normalizedInput.includes(term)) {
                    return processType;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Explain rights and obligations based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} Rights and obligations explanation
     */
    explainRightsAndObligations(userInput, topic) {
        // Use topic if available, otherwise try to extract relevant legal area
        const legalArea = topic || this.identifyLegalTopic(userInput);
        
        if (!legalArea || !this.legalAreas[legalArea]) {
            return `# Legal Rights and Obligations

In a complete implementation with an AI model and legal expertise, I would provide detailed information about legal rights and obligations in various areas of law.

To explain specific rights and obligations, I need to know which area of law you're interested in. Common areas include:

- Employment Law
- Consumer Law
- Landlord-Tenant Law
- Family Law
- Contract Law

Please let me know which legal area you'd like information about, and I'll provide details about the relevant rights and obligations.`;
        }
        
        const areaInfo = this.legalAreas[legalArea];
        
        return `# Rights and Obligations in ${areaInfo.name}

In a complete implementation with an AI model and legal expertise, I would provide comprehensive information about legal rights and obligations related to ${areaInfo.name.toLowerCase()}, including their scope, limitations, and enforcement mechanisms.

## Overview of ${areaInfo.name}

${areaInfo.description}

## Key Rights

[Would outline principal legal rights in this area]
- [Right 1]
- [Right 2]
- [Right 3]
- [Right 4]
- [Right 5]

## Key Obligations

[Would outline principal legal obligations in this area]
- [Obligation 1]
- [Obligation 2]
- [Obligation 3]
- [Obligation 4]
- [Obligation 5]

## Enforcement Mechanisms

[Would explain how these rights are protected and obligations enforced]

## Limitations and Exceptions

[Would describe important limitations or exceptions to these rights and obligations]

## Jurisdictional Variations

[Would note significant differences across jurisdictions]

## Recent Developments

[Would highlight recent legal changes or precedents in this area]

## Common Misconceptions

[Would address frequent misunderstandings about rights and obligations in this area]

Would you like to:
- Learn more about a specific right or obligation?
- Understand how to address violations of these rights?
- Know about related legal processes?
- Explore exceptions or special circumstances?`;
    }
    
    /**
     * Evaluate a legal case based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} Legal case evaluation
     */
    evaluateLegalCase(userInput, topic) {
        // For case evaluation, we need to be extra cautious about not providing specific legal advice
        return `# Legal Situation Analysis

In a complete implementation with an AI model and legal expertise, I would provide a general analysis of situations similar to what you've described, including relevant legal principles, factors that might affect outcomes, and considerations to keep in mind.

## Important Note

I cannot provide specific legal advice about your particular situation. Every case has unique details that can significantly impact legal outcomes. This information is general in nature.

## Relevant Legal Principles

[Would outline general legal concepts that might apply to situations like this]

## Key Factors That May Be Relevant

[Would identify factors that commonly influence outcomes in similar situations]

## Potential Approaches

[Would describe general approaches that people in similar situations might consider]

## Important Considerations

[Would highlight issues that should be carefully considered]

## Questions You Might Ask an Attorney

[Would suggest important questions to discuss with a legal professional]

## Finding Legal Help

For specific advice tailored to your situation, consider:

- Consulting with a licensed attorney in your jurisdiction
- Contacting a legal aid organization if you have limited financial resources
- Reaching out to a bar association for referrals to lawyers specializing in this area

## Next Steps

[Would suggest general next steps for learning more or addressing the situation]

Would you like information about:
- Legal concepts related to this situation?
- The process for addressing this type of issue?
- How to find appropriate legal help?
- Documentation that might be relevant?`;
    }
    
    /**
     * Explain legal consequences based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} Legal consequences explanation
     */
    explainLegalConsequences(userInput, topic) {
        // Use topic if available, otherwise try to extract relevant legal area
        const legalArea = topic || this.identifyLegalTopic(userInput);
        
        return `# Legal Consequences Analysis

In a complete implementation with an AI model and legal expertise, I would provide general information about potential legal consequences for certain actions or situations, including possible penalties, mitigating factors, and relevant legal processes.

## General Information

[Would provide an overview of how the legal system typically addresses the scenario described]

## Potential Consequences

[Would outline typical consequences that might apply in similar situations]
- [Consequence 1]
- [Consequence 2]
- [Consequence 3]

## Determining Factors

[Would explain factors that typically influence the severity of consequences]
- [Factor 1]
- [Factor 2]
- [Factor 3]

## Jurisdictional Variations

[Would note how consequences may vary significantly between jurisdictions]

## Legal Process Overview

[Would provide a brief explanation of the processes through which consequences are determined]

## Mitigation Considerations

[Would describe factors that might reduce potential consequences]

## Important Disclaimer

It's important to understand that actual consequences for specific actions are determined by many factors, including the exact circumstances, jurisdiction, applicable laws, prosecutorial discretion, judicial decisions, and more. This information provides general guidance only.

## Seeking Legal Counsel

If you're concerned about potential legal consequences for a specific situation, consulting with a qualified attorney who can assess your particular circumstances is strongly recommended.

Would you like information about:
- How these issues are typically handled in specific jurisdictions?
- The legal processes involved?
- Finding appropriate legal representation?
- Related legal concepts?`;
    }
    
    /**
     * Suggest legal resources based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} Legal resources suggestions
     */
    suggestLegalResources(userInput, topic) {
        return `# Legal Resources Guide

In a complete implementation with an AI model and legal expertise, I would provide a comprehensive overview of legal resources available for your situation, including organizations, services, and self-help options.

## Finding Legal Representation

### Attorney Referral Services
- Bar Association Referral Programs: Most state and local bar associations offer referral services to help connect people with appropriate attorneys
- Legal Directories: Online directories that allow searching for attorneys by specialty and location
- Lawyer Referral Services: Services that match individuals with attorneys based on legal needs

### Legal Aid and Pro Bono Services
- Legal Aid Organizations: Non-profit organizations providing free legal services to low-income individuals
- Pro Bono Programs: Programs through which attorneys provide free legal services to those who cannot afford representation
- Law School Clinics: Programs where law students, supervised by attorneys, provide legal services

## Self-Help Resources

### Government Resources
- Court Websites: Many courts offer forms, instructions, and information for self-represented litigants
- Legal Information Websites: Government-sponsored websites providing legal information and resources
- Public Law Libraries: Libraries with legal research materials and sometimes staff to assist with finding resources

### Online Resources
- Self-Help Legal Websites: Websites providing information, forms, and guidance for handling legal matters
- Legal Document Services: Services that help with preparing legal documents
- Educational Resources: Articles, guides, and tutorials on legal topics

## Alternative Dispute Resolution

- Mediation Services: Programs that help parties resolve disputes outside of court
- Arbitration Services: Services that provide arbitrators to resolve disputes
- Community Dispute Resolution Centers: Local organizations that help resolve conflicts

## Specialized Resources

[Would provide resources specific to the legal area identified in your question]

## Evaluating Legal Resources

[Would provide guidance on assessing the quality and reliability of legal resources]

Would you like more specific information about:
- Resources for a particular type of legal issue?
- How to qualify for legal aid services?
- Steps to take when searching for an attorney?
- Self-help resources for specific legal processes?`;
    }
    
    /**
     * Provide general legal information based on user input
     * @param {string} userInput - User's input
     * @param {string} topic - Legal topic if available
     * @returns {string} General legal information
     */
    provideGeneralLegalInformation(userInput, topic) {
        // If topic is available, provide information about that legal area
        if (topic && this.legalAreas[topic]) {
            const areaInfo = this.legalAreas[topic];
            
            return `# ${areaInfo.name} Overview

In a complete implementation with an AI model and legal expertise, I would provide comprehensive information about ${areaInfo.name.toLowerCase()}, including its key principles, common issues, and important considerations.

## What is ${areaInfo.name}?

${areaInfo.description}

## Key Areas of ${areaInfo.name}

${areaInfo.subtopics.map(subtopic => `### ${subtopic}\n[Would provide information about ${subtopic.toLowerCase()}]`).join('\n\n')}

## Common Legal Issues

[Would describe frequent legal challenges in this area]

## Important Legal Principles

[Would explain foundational legal concepts in this area]

## Jurisdictional Considerations

[Would note significant variations across jurisdictions]

## When to Seek Legal Help

[Would identify situations where professional legal assistance is particularly important]

## Preventative Measures

[Would suggest steps to avoid common legal problems in this area]

## Additional Resources

[Would recommend reputable sources for further information]

Would you like to:
- Learn more about a specific aspect of ${areaInfo.name.toLowerCase()}?
- Understand how to address a particular issue in this area?
- Know about legal processes related to ${areaInfo.name.toLowerCase()}?
- Explore rights and obligations in this field?`;
        }
        
        // Default general legal information response
        return `# Legal Information Overview

In a complete implementation with an AI model and legal expertise, I would provide general legal information responsive to your query, including relevant legal concepts, common considerations, and helpful context.

## Legal System Basics

[Would provide context about how the legal system works relevant to your query]

## Key Legal Principles

[Would explain fundamental legal concepts related to your question]

## Common Considerations

[Would outline important factors to consider regarding this topic]

## Legal Processes

[Would describe relevant legal procedures or mechanisms]

## Rights and Responsibilities

[Would explain applicable legal rights and responsibilities]

## Finding More Information

[Would suggest resources for learning more about this topic]

To provide more specific information, I would need to know:
- Which area of law you're interested in
- What particular aspect of the law you'd like to understand
- Whether you're looking for information about a specific process or document
- If you have a particular jurisdiction in mind

Would you like information about a specific legal topic or question?`;
    }
    
    /**
     * Get legal suggestions based on user interaction
     * @param {string} requestType - Type of legal request
     * @param {string} topic - Legal topic if available
     * @returns {Array<string>} Legal suggestions
     */
    getLegalSuggestions(requestType, topic) {
        const suggestions = [];
        
        // Add topic-specific suggestions if available
        if (topic && this.legalAreas[topic]) {
            const topicName = this.legalAreas[topic].name;
            
            // Add suggestions based on request type and topic
            if (requestType === "term_definition") {
                suggestions.push(`What are key terms in ${topicName}?`);
            } else if (requestType === "document_information") {
                suggestions.push(`What documents are important in ${topicName}?`);
            } else if (requestType === "process_guidance") {
                suggestions.push(`What legal processes are common in ${topicName}?`);
            } else if (requestType === "rights_and_obligations") {
                suggestions.push(`What are my rights regarding ${topicName}?`);
            } else if (requestType === "case_evaluation") {
                suggestions.push(`What factors affect ${topicName} cases?`);
            } else if (requestType === "legal_consequences") {
                suggestions.push(`What are potential consequences in ${topicName} cases?`);
            } else if (requestType === "legal_resources") {
                suggestions.push(`Where can I find help with ${topicName}?`);
            }
        }
        
        // Add general suggestions if we need more
        while (suggestions.length < 3) {
            const generalSuggestions = [
                "What's the difference between a felony and a misdemeanor?",
                "How do I know if I need a lawyer?",
                "What should I do if I get sued?",
                "What's the process for creating a will?",
                "How does small claims court work?",
                "What are my rights as a tenant?",
                "What should I know before signing a contract?",
                "How do I protect my intellectual property?",
                "What are the steps to incorporate a business?",
                "What should I do after a car accident?"
            ];
            
            const suggestion = generalSuggestions[Math.floor(Math.random() * generalSuggestions.length)];
            if (!suggestions.includes(suggestion)) {
                suggestions.push(suggestion);
            }
        }
        
        // Return top 3 suggestions
        return suggestions.slice(0, 3);
    }
    
    /**
     * Utility function to capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirstLetter(str) {
        if (!str) return '';
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    /**
     * Save user preferences
     * @param {Object} preferences - User preferences to save
     * @returns {boolean} Success status
     */
    savePreferences(preferences) {
        try {
            this.state.userPreferences = { ...this.state.userPreferences, ...preferences };
            localStorage.setItem(
                'jaat-mode19-preferences',
                JSON.stringify(this.state.userPreferences)
            );
            return true;
        } catch (error) {
            console.error("Error saving user preferences:", error);
            return false;
        }
    }
    
    /**
     * Clear conversation history
     * @returns {boolean} Success status
     */
    clearHistory() {
        try {
            this.state.conversationHistory = [];
            localStorage.removeItem('jaat-mode19-history');
            return true;
        } catch (error) {
            console.error("Error clearing conversation history:", error);
            return false;
        }
    }
    
    /**
     * Set jurisdiction
     * @param {string} jurisdiction - Jurisdiction
     * @returns {boolean} Success status
     */
    setJurisdiction(jurisdiction) {
        if (!jurisdiction || !this.jurisdictions[jurisdiction]) return false;
        
        // Set jurisdiction
        this.state.currentJurisdiction = jurisdiction;
        
        // Save updated jurisdiction
        this.savePreferences({ currentJurisdiction: jurisdiction });
        return true;
    }
    
    /**
     * Set user situation
     * @param {string} situation - User's legal situation
     * @returns {boolean} Success status
     */
    setUserSituation(situation) {
        if (!situation) return false;
        
        // Set user situation
        this.state.userSituation = situation;
        
        // Save updated user situation
        this.savePreferences({ userSituation: situation });
        return true;
    }
    
    /**
     * Set disclaimer acceptance
     * @param {boolean} accepted - Whether disclaimer is accepted
     * @returns {boolean} Success status
     */
    setDisclaimerAccepted(accepted) {
        this.state.disclaimerAccepted = accepted;
        
        // Save updated disclaimer acceptance
        this.savePreferences({ disclaimerAccepted: accepted });
        return true;
    }
    
    /**
     * Update mode configuration
     * @param {Object} newConfig - New configuration settings
     * @returns {Object} Updated configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        return this.config;
    }
    
    /**
     * Get information about this mode
     * @returns {Object} Mode information
     */
    getModeInfo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            icon: this.icon,
            color: this.color,
            category: this.category,
            version: this.version,
            currentJurisdiction: this.state.currentJurisdiction,
            disclaimerAccepted: this.state.disclaimerAccepted,
            legalTopics: this.state.legalTopics,
            suggestions: this.suggestions.slice(0, 5), // Return first 5 suggestions
            features: this.features
        };
    }
    
    /**
     * Check if the mode is ready to use
     * @returns {boolean} Ready status
     */
    isReady() {
        return this.state.disclaimerAccepted;
    }
}

// Create instance if in browser environment
if (typeof window !== 'undefined') {
    if (!window.jaatAIModes) {
        window.jaatAIModes = {};
    }
    window.jaatAIModes.legalAdvisor = new LegalAdvisorMode();
}

// Export if in module environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LegalAdvisorMode;
}