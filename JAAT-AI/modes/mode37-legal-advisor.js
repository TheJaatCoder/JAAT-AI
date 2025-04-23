/**
 * JAAT-AI Mode: Legal Advisor
 * 
 * General legal information and guidance across various areas of law,
 * helping users understand basic legal concepts and procedures.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const LegalAdvisorMode = {
  id: 'legal-advisor',
  name: 'Legal Advisor',
  icon: 'balance-scale',
  description: 'General legal information and guidance on various legal topics.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Legal Advisor mode, providing general legal information and helping users understand basic legal concepts, procedures, and considerations across various areas of law.

Key characteristics:
1. You provide general legal information, not personalized legal advice
2. You explain legal concepts in clear, accessible language
3. You help users understand the structure of legal systems and general procedures
4. You can outline potential approaches to common legal situations
5. You maintain a balanced perspective on legal issues
6. You acknowledge the limitations of automated legal information
7. You emphasize the importance of consulting qualified legal professionals for specific situations

Always clarify that you are providing general legal information, not legal advice, and that users should consult with a qualified attorney for advice specific to their situation. Avoid making definitive predictions about case outcomes or claiming expertise in the laws of specific jurisdictions.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "What's the difference between a felony and a misdemeanor?",
    "Can you explain what intellectual property rights are?",
    "How does the small claims court process work?",
    "What should I know about signing a residential lease agreement?",
    "What are the basic elements of a valid contract?",
    "How does divorce typically work in the United States?",
    "What's the process for creating a simple will?",
    "What should I do if I receive a traffic ticket?",
    "How do I register a trademark for my business?",
    "What are my rights if I'm pulled over by police?"
  ],
  
  // Legal areas with descriptions
  legalAreas: [
    {
      name: "Contract Law",
      icon: "file-signature",
      description: "Legal principles governing agreements between parties",
      keyTopics: [
        {
          name: "Contract Formation",
          description: "How legally binding agreements are created",
          elements: [
            "Offer: A clear proposal to do something or refrain from doing something",
            "Acceptance: Unequivocal agreement to the terms of the offer",
            "Consideration: Something of value exchanged between parties",
            "Intention: Mutual intent to create legal relations",
            "Capacity: Legal ability of parties to enter into contracts",
            "Legality: Contract purpose must be legal"
          ]
        },
        {
          name: "Contract Terms",
          description: "The specific provisions and clauses in a contract",
          elements: [
            "Express Terms: Explicitly stated in the contract",
            "Implied Terms: Inferred from the nature of the agreement or law",
            "Conditions: Fundamental terms where breach allows contract termination",
            "Warranties: Less essential terms where breach typically leads to damages",
            "Exclusion Clauses: Provisions that limit or exclude liability"
          ]
        },
        {
          name: "Contract Breach",
          description: "When a party fails to fulfill contractual obligations",
          elements: [
            "Material Breach: Significant failure that substantially affects the agreement",
            "Minor Breach: Less significant failure that doesn't undermine the contract",
            "Anticipatory Breach: Indication that a party will not fulfill future obligations",
            "Actual Breach: Failure to perform when performance is due"
          ]
        },
        {
          name: "Remedies",
          description: "Legal solutions available when contracts are breached",
          elements: [
            "Damages: Monetary compensation for losses",
            "Specific Performance: Court order to fulfill contractual obligations",
            "Rescission: Cancellation of the contract, returning parties to pre-contract positions",
            "Reformation: Rewriting the contract to reflect original intentions"
          ]
        },
        {
          name: "Contract Defenses",
          description: "Legal grounds to avoid contract enforcement",
          elements: [
            "Mistake: Fundamental error about facts or law",
            "Misrepresentation: False statement that induced contract formation",
            "Duress: Improper threat that leaves no reasonable alternative",
            "Undue Influence: Excessive pressure that overcomes free will",
            "Unconscionability: Contract terms so unfair they shock the conscience",
            "Illegality: Contract with illegal purpose or consideration"
          ]
        }
      ],
      commonDocuments: [
        "Service Agreements",
        "Employment Contracts",
        "Non-Disclosure Agreements (NDAs)",
        "Purchase and Sale Agreements",
        "Rental/Lease Agreements",
        "Licensing Agreements"
      ]
    },
    {
      name: "Property Law",
      icon: "home",
      description: "Law governing ownership and use of land and personal property",
      keyTopics: [
        {
          name: "Real Property",
          description: "Law related to land and permanent structures",
          elements: [
            "Land Ownership: Fee simple, life estate, leasehold estate",
            "Easements: Right to use another's property for limited purposes",
            "Covenants: Restrictions on land use",
            "Boundaries: Legal limits of property",
            "Adverse Possession: Acquiring ownership through open, notorious possession",
            "Eminent Domain: Government power to take private property for public use"
          ]
        },
        {
          name: "Personal Property",
          description: "Law related to movable possessions",
          elements: [
            "Chattel: Tangible personal property",
            "Intellectual Property: Intangible personal property like patents and copyrights",
            "Bailment: Temporary transfer of possession without ownership",
            "Gift: Transfer of ownership without consideration",
            "Abandoned Property: Property intentionally discarded by owner"
          ]
        },
        {
          name: "Property Transfers",
          description: "Methods of transferring property ownership",
          elements: [
            "Deed: Document transferring real property ownership",
            "Bill of Sale: Document transferring personal property ownership",
            "Will: Document directing property distribution after death",
            "Intestate Succession: Property distribution according to statute when no will exists",
            "Escheat: Property reverting to the state when no heirs exist"
          ]
        },
        {
          name: "Land Use",
          description: "Regulations governing property usage",
          elements: [
            "Zoning: Government regulation of land use types in specific areas",
            "Building Codes: Standards for construction and safety",
            "Environmental Regulations: Rules protecting natural resources",
            "Historic Preservation: Restrictions protecting historically significant property",
            "Nuisance: Unreasonable interference with property enjoyment"
          ]
        },
        {
          name: "Landlord-Tenant",
          description: "Rights and duties in rental relationships",
          elements: [
            "Lease: Contract governing rental property",
            "Security Deposit: Funds held to cover potential damages",
            "Habitability: Landlord duty to maintain safe, livable premises",
            "Eviction: Legal process for removing tenants",
            "Rent Control: Government regulation of rental rates"
          ]
        }
      ],
      commonDocuments: [
        "Deeds",
        "Mortgage Agreements",
        "Lease Agreements",
        "Easement Agreements",
        "Property Tax Records",
        "Title Insurance Policies"
      ]
    },
    {
      name: "Family Law",
      icon: "users",
      description: "Law governing family relationships, marriage, divorce, and child custody",
      keyTopics: [
        {
          name: "Marriage",
          description: "Legal union between spouses creating mutual rights and obligations",
          elements: [
            "Marriage License: Legal document permitting marriage",
            "Marriage Requirements: Age, capacity, consent, and other legal prerequisites",
            "Common Law Marriage: Marriage recognized without formal ceremony in some jurisdictions",
            "Prenuptial Agreements: Contracts establishing property rights before marriage",
            "Community Property: System treating certain property as jointly owned by spouses",
            "Equitable Distribution: Fair, though not necessarily equal, property division"
          ]
        },
        {
          name: "Divorce",
          description: "Legal dissolution of marriage",
          elements: [
            "No-Fault Divorce: Dissolution without proving marital misconduct",
            "Fault-Based Divorce: Dissolution based on specific grounds like adultery",
            "Property Division: Distribution of marital assets and debts",
            "Alimony/Spousal Support: Payments to financially dependent former spouse",
            "Divorce Mediation: Non-adversarial process to resolve divorce issues",
            "Divorce Litigation: Court process to resolve contested divorce issues"
          ]
        },
        {
          name: "Child Custody",
          description: "Legal rights and responsibilities regarding children",
          elements: [
            "Legal Custody: Right to make decisions about child's welfare",
            "Physical Custody: Right to have child live with parent",
            "Joint Custody: Shared parental rights and responsibilities",
            "Sole Custody: Exclusive parental rights and responsibilities",
            "Visitation/Parenting Time: Non-custodial parent's time with child",
            "Best Interests Standard: Primary consideration in custody decisions"
          ]
        },
        {
          name: "Child Support",
          description: "Financial support for children's basic needs",
          elements: [
            "Support Guidelines: Formulas determining support amounts",
            "Income Calculation: Method for determining parent's income",
            "Extraordinary Expenses: Additional costs beyond basic support",
            "Modification: Change in support due to changed circumstances",
            "Enforcement: Methods to collect unpaid support",
            "Termination: When support obligation legally ends"
          ]
        },
        {
          name: "Adoption",
          description: "Legal process creating parent-child relationship",
          elements: [
            "Agency Adoption: Adoption through licensed agency",
            "Private Adoption: Direct arrangement between birth and adoptive parents",
            "Stepparent Adoption: Adoption of spouse's child",
            "International Adoption: Adoption of child from another country",
            "Open Adoption: Continuing contact between birth and adoptive families",
            "Closed Adoption: No contact between birth and adoptive families"
          ]
        }
      ],
      commonDocuments: [
        "Marriage Certificates",
        "Divorce Decrees",
        "Prenuptial Agreements",
        "Child Custody Orders",
        "Child Support Orders",
        "Adoption Papers"
      ]
    },
    {
      name: "Criminal Law",
      icon: "gavel",
      description: "Law dealing with crimes and their punishment",
      keyTopics: [
        {
          name: "Criminal Offenses",
          description: "Classifications and types of crimes",
          elements: [
            "Felony: Serious crime typically punishable by imprisonment over one year",
            "Misdemeanor: Less serious crime typically punishable by less than a year",
            "Infraction: Minor violation typically punishable by fine",
            "Inchoate Offenses: Attempted crimes, conspiracy, and solicitation",
            "Crimes Against Person: Murder, assault, rape, etc.",
            "Property Crimes: Theft, burglary, arson, etc."
          ]
        },
        {
          name: "Criminal Procedure",
          description: "Process for investigating and prosecuting crimes",
          elements: [
            "Arrest: Taking suspect into custody",
            "Miranda Rights: Required warnings about right to remain silent",
            "Booking: Administrative recording of arrest",
            "Arraignment: Court appearance to hear charges and enter plea",
            "Preliminary Hearing/Grand Jury: Determination of probable cause",
            "Discovery: Exchange of evidence between prosecution and defense"
          ]
        },
        {
          name: "Trial Process",
          description: "Court proceedings to determine guilt",
          elements: [
            "Jury Selection: Process of choosing trial jurors",
            "Opening Statements: Initial summaries by prosecution and defense",
            "Prosecution Case: Presentation of evidence against defendant",
            "Defense Case: Presentation of evidence supporting defendant",
            "Closing Arguments: Final summaries by prosecution and defense",
            "Verdict: Decision regarding guilt or innocence"
          ]
        },
        {
          name: "Sentencing",
          description: "Determination and imposition of punishment",
          elements: [
            "Determinate Sentencing: Fixed term of punishment",
            "Indeterminate Sentencing: Range of punishment with actual time determined later",
            "Mandatory Minimum: Required minimum punishment for certain offenses",
            "Sentencing Guidelines: Recommended punishment ranges",
            "Aggravating Factors: Circumstances increasing punishment severity",
            "Mitigating Factors: Circumstances decreasing punishment severity"
          ]
        },
        {
          name: "Defenses",
          description: "Legal grounds to avoid or reduce criminal liability",
          elements: [
            "Alibi: Evidence defendant was elsewhere when crime occurred",
            "Self-Defense: Justified use of force to protect oneself",
            "Insanity: Mental condition preventing understanding of actions",
            "Duress: Forced to commit crime due to threat",
            "Entrapment: Induced to commit crime by law enforcement",
            "Statute of Limitations: Time limit for bringing charges"
          ]
        }
      ],
      commonDocuments: [
        "Arrest Warrants",
        "Criminal Complaints",
        "Indictments",
        "Plea Agreements",
        "Sentencing Orders",
        "Criminal Records"
      ]
    },
    {
      name: "Employment Law",
      icon: "briefcase",
      description: "Laws governing the relationship between employers and employees",
      keyTopics: [
        {
          name: "Hiring Practices",
          description: "Legal rules for recruiting and hiring employees",
          elements: [
            "Anti-Discrimination Laws: Prohibitions against discriminatory hiring",
            "Background Checks: Legal limits on investigating applicants",
            "Immigration Verification: Requirements to verify work eligibility",
            "Employment Contracts: Agreements establishing employment terms",
            "Independent Contractors: Classification distinct from employees",
            "At-Will Employment: Employment terminable by either party without cause"
          ]
        },
        {
          name: "Workplace Rights",
          description: "Legal protections for employees in the workplace",
          elements: [
            "Minimum Wage: Lowest compensation legally permissible",
            "Overtime: Additional compensation for excess hours worked",
            "Breaks and Rest Periods: Required time off during work",
            "Workplace Safety: Standards for maintaining safe work environment",
            "Privacy Rights: Limits on employer monitoring and intrusion",
            "Whistleblower Protection: Safeguards for reporting illegal activity"
          ]
        },
        {
          name: "Discrimination & Harassment",
          description: "Prohibited unfair treatment in the workplace",
          elements: [
            "Protected Characteristics: Categories protected from discrimination",
            "Hostile Work Environment: Harassment creating intolerable conditions",
            "Sexual Harassment: Unwelcome sexual conduct at work",
            "Retaliation: Adverse action for exercising legal rights",
            "Reasonable Accommodation: Changes to accommodate disability or religion",
            "Equal Pay: Requirement for equal compensation for equal work"
          ]
        },
        {
          name: "Leave & Benefits",
          description: "Time off and additional compensation beyond wages",
          elements: [
            "Family and Medical Leave: Time off for family or health reasons",
            "Sick Leave: Time off for illness or medical care",
            "Vacation Time: Paid time off for rest and relaxation",
            "Health Insurance: Medical coverage provided by employers",
            "Retirement Plans: Programs for post-employment financial security",
            "Workers' Compensation: Benefits for work-related injuries"
          ]
        },
        {
          name: "Termination",
          description: "Legal rules for ending employment",
          elements: [
            "Wrongful Termination: Illegal dismissal violating law or contract",
            "Constructive Discharge: Forced resignation due to intolerable conditions",
            "Severance: Compensation provided upon termination",
            "Final Paycheck: Requirements for paying departing employees",
            "Continuation of Benefits: Extended benefits after employment ends",
            "Non-Compete Agreements: Restrictions on post-employment competition"
          ]
        }
      ],
      commonDocuments: [
        "Employment Contracts",
        "Employee Handbooks",
        "Non-Disclosure Agreements",
        "Non-Compete Agreements",
        "Severance Agreements",
        "Workers' Compensation Claims"
      ]
    },
    {
      name: "Intellectual Property",
      icon: "lightbulb",
      description: "Laws protecting creations of the mind and intangible assets",
      keyTopics: [
        {
          name: "Copyright",
          description: "Protection for original creative works",
          elements: [
            "Protected Works: Original works of authorship fixed in tangible medium",
            "Rights Granted: Reproduction, distribution, display, performance, adaptation",
            "Duration: Author's life plus 70 years (typically)",
            "Fair Use: Limited use without permission for criticism, education, etc.",
            "Registration: Optional but provides additional legal benefits",
            "Infringement: Unauthorized use of copyrighted material"
          ]
        },
        {
          name: "Trademark",
          description: "Protection for brands and distinctive symbols",
          elements: [
            "Protected Marks: Words, phrases, symbols, designs identifying source",
            "Rights Granted: Exclusive use in connection with specific goods/services",
            "Duration: Potentially indefinite with continued use and renewal",
            "Registration: Optional but provides nationwide priority",
            "Distinctiveness: Requirement for trademark protection",
            "Dilution: Harm to famous mark's distinctiveness or reputation"
          ]
        },
        {
          name: "Patent",
          description: "Protection for inventions and discoveries",
          elements: [
            "Protected Inventions: New, useful, non-obvious processes, machines, etc.",
            "Rights Granted: Exclude others from making, using, selling invention",
            "Duration: 20 years from filing (utility patents)",
            "Requirements: Novelty, non-obviousness, utility, enablement",
            "Application Process: Detailed disclosure of invention",
            "Infringement: Unauthorized making, using, selling of patented invention"
          ]
        },
        {
          name: "Trade Secret",
          description: "Protection for confidential business information",
          elements: [
            "Protected Information: Valuable business information kept secret",
            "Rights Granted: Protection against misappropriation",
            "Duration: Potentially indefinite while kept secret",
            "Requirements: Commercial value, not generally known, reasonable secrecy measures",
            "Misappropriation: Improper acquisition, disclosure, or use",
            "Remedies: Injunction, damages, sometimes criminal penalties"
          ]
        },
        {
          name: "IP Licensing",
          description: "Permission to use intellectual property",
          elements: [
            "License Terms: Rights granted, limitations, duration, territory",
            "Exclusive License: Rights granted to single licensee",
            "Non-Exclusive License: Rights granted to multiple licensees",
            "Royalties: Payment for IP use, often percentage-based",
            "Quality Control: Requirements to maintain IP integrity",
            "Termination: Conditions for ending license relationship"
          ]
        }
      ],
      commonDocuments: [
        "Copyright Registrations",
        "Trademark Registrations",
        "Patent Applications",
        "IP Licensing Agreements",
        "Confidentiality Agreements",
        "Cease and Desist Letters"
      ]
    },
    {
      name: "Business Law",
      icon: "building",
      description: "Laws governing business operations and organizations",
      keyTopics: [
        {
          name: "Business Entities",
          description: "Legal structures for organizing businesses",
          elements: [
            "Sole Proprietorship: Business owned by single individual",
            "Partnership: Business owned by two or more individuals",
            "Limited Liability Company (LLC): Hybrid entity with liability protection",
            "Corporation: Legal entity separate from owners with liability protection",
            "S Corporation: Special tax status for qualifying corporations",
            "Nonprofit Organization: Entity organized for purposes other than profit"
          ]
        },
        {
          name: "Business Formation",
          description: "Legal process for creating business entities",
          elements: [
            "Articles of Incorporation: Document creating corporation",
            "Articles of Organization: Document creating LLC",
            "Partnership Agreement: Contract establishing partnership terms",
            "Operating Agreement: Document governing LLC operations",
            "Bylaws: Rules governing corporation internal affairs",
            "EIN Application: Process for obtaining tax identification number"
          ]
        },
        {
          name: "Business Regulation",
          description: "Government oversight of business activities",
          elements: [
            "Licensing: Requirements to obtain permission to operate",
            "Permits: Authorization for specific activities",
            "Zoning: Restrictions on business location and operations",
            "Antitrust: Prohibitions against anti-competitive practices",
            "Environmental Compliance: Requirements to protect natural resources",
            "Securities Regulation: Rules governing investment offerings"
          ]
        },
        {
          name: "Commercial Transactions",
          description: "Business dealings and exchanges",
          elements: [
            "Sales Contracts: Agreements for goods or services",
            "Uniform Commercial Code: Laws governing commercial transactions",
            "Negotiable Instruments: Documents promising payment",
            "Secured Transactions: Debts secured by collateral",
            "Warranties: Guarantees regarding products or services",
            "Product Liability: Responsibility for harmful products"
          ]
        },
        {
          name: "Business Dissolution",
          description: "Legal process for ending business entities",
          elements: [
            "Voluntary Dissolution: Intentional termination of business",
            "Involuntary Dissolution: Forced termination by court",
            "Asset Distribution: Division of business property",
            "Debt Settlement: Resolution of business obligations",
            "Tax Consequences: Financial implications of dissolution",
            "Winding Up: Process of concluding business affairs"
          ]
        }
      ],
      commonDocuments: [
        "Articles of Incorporation",
        "Partnership Agreements",
        "Operating Agreements",
        "Business Licenses",
        "Commercial Lease Agreements",
        "Business Purchase Agreements"
      ]
    },
    {
      name: "Estate Planning",
      icon: "scroll",
      description: "Laws governing the transfer of assets upon death or incapacity",
      keyTopics: [
        {
          name: "Wills",
          description: "Legal documents directing asset distribution after death",
          elements: [
            "Requirements: Legal formalities for valid will",
            "Testator: Person making the will",
            "Beneficiaries: Persons receiving property under will",
            "Executor: Person appointed to administer estate",
            "Revocation: Cancellation of previous will",
            "Contests: Challenges to will validity"
          ]
        },
        {
          name: "Trusts",
          description: "Legal arrangements for holding property for beneficiaries",
          elements: [
            "Settlor/Grantor: Person creating the trust",
            "Trustee: Person managing trust property",
            "Beneficiary: Person receiving trust benefits",
            "Revocable Trust: Can be changed or ended by settlor",
            "Irrevocable Trust: Cannot be easily modified after creation",
            "Trust Assets: Property placed in trust"
          ]
        },
        {
          name: "Probate",
          description: "Legal process for administering deceased's estate",
          elements: [
            "Probate Court: Court overseeing estate administration",
            "Personal Representative: Person administering estate",
            "Inventory: Listing of estate assets",
            "Creditor Claims: Process for resolving debts",
            "Distribution: Transfer of assets to beneficiaries",
            "Intestacy: Distribution when no valid will exists"
          ]
        },
        {
          name: "Advanced Directives",
          description: "Instructions for care during incapacity",
          elements: [
            "Living Will: Instructions regarding medical treatment",
            "Healthcare Proxy: Person appointed to make medical decisions",
            "HIPAA Authorization: Permission to access medical information",
            "Do Not Resuscitate Order: Instruction against resuscitation",
            "Organ Donation Directive: Instructions regarding organ donation",
            "Mental Health Directive: Instructions regarding psychiatric treatment"
          ]
        },
        {
          name: "Powers of Attorney",
          description: "Authorization for someone to act on another's behalf",
          elements: [
            "Financial Power of Attorney: Authority regarding financial matters",
            "Medical Power of Attorney: Authority regarding healthcare decisions",
            "Durable Power of Attorney: Continues during incapacity",
            "Springing Power of Attorney: Activated upon specific event",
            "General Power of Attorney: Broad decision-making authority",
            "Limited Power of Attorney: Restricted decision-making authority"
          ]
        }
      ],
      commonDocuments: [
        "Last Will and Testament",
        "Living Trust Agreements",
        "Powers of Attorney",
        "Living Wills",
        "Health Care Directives",
        "Beneficiary Designations"
      ]
    }
  ],
  
  // Legal document templates
  legalDocumentTemplates: [
    {
      name: "Simple Will",
      description: "Basic last will and testament for straightforward estates",
      keyComponents: [
        {
          name: "Introduction",
          purpose: "Identifies the document as a will and the person making it",
          example: "This Last Will and Testament of [Full Legal Name], residing at [Address], hereby revokes all previous wills and codicils made by me."
        },
        {
          name: "Executor Appointment",
          purpose: "Names the person responsible for carrying out the will's instructions",
          example: "I appoint [Executor Name] of [Address] as Executor of this will. If [Executor Name] is unable or unwilling to serve, I appoint [Alternate Executor Name] of [Address] as alternate Executor."
        },
        {
          name: "Guardian Designation",
          purpose: "Names guardians for minor children (if applicable)",
          example: "I appoint [Guardian Name] of [Address] as guardian of the person and property of my minor children. If [Guardian Name] is unable or unwilling to serve, I appoint [Alternate Guardian Name] of [Address] as alternate guardian."
        },
        {
          name: "Specific Bequests",
          purpose: "Lists specific items or amounts going to specific beneficiaries",
          example: "I give my [Specific Item] to [Beneficiary Name]. I give the sum of [Dollar Amount] to [Beneficiary Name]."
        },
        {
          name: "Residuary Clause",
          purpose: "Directs where the remainder of the estate should go",
          example: "I give all the rest, residue, and remainder of my estate, both real and personal, of whatever kind and wherever situated, to [Beneficiary Name]."
        },
        {
          name: "Execution",
          purpose: "Formal signing and witnessing to make the will legally valid",
          example: "IN WITNESS WHEREOF, I sign this will consisting of [Number] pages, including this page, on [Date]."
        }
      ],
      importantConsiderations: [
        "Witnesses typically cannot be beneficiaries under the will",
        "Requirements for valid wills vary by jurisdiction (number of witnesses, notarization, etc.)",
        "Consider including alternate beneficiaries in case primary beneficiaries predecease you",
        "Review and update your will after major life events (marriage, divorce, birth of children)",
        "Consider consulting an attorney for complex estates or situations"
      ]
    },
    {
      name: "Residential Lease Agreement",
      description: "Contract between landlord and tenant for residential property rental",
      keyComponents: [
        {
          name: "Parties and Premises",
          purpose: "Identifies landlord, tenant, and rental property",
          example: "This Lease Agreement is entered into on [Date] between [Landlord Name] ('Landlord') and [Tenant Name] ('Tenant') for the premises located at [Property Address] ('Premises')."
        },
        {
          name: "Term",
          purpose: "Specifies duration of lease and renewal options",
          example: "The term of this lease is [Number] months, beginning on [Start Date] and ending on [End Date]. This lease will automatically renew on a month-to-month basis unless either party provides written notice of termination at least [Number] days before the end of the term."
        },
        {
          name: "Rent and Deposits",
          purpose: "Specifies amount, due date, payment method, and security deposit",
          example: "Tenant shall pay monthly rent of $[Amount] due on the [Day] of each month. A security deposit of $[Amount] is required upon signing this agreement, to be returned within [Number] days after Tenant vacates the Premises, less any deductions for damages beyond normal wear and tear."
        },
        {
          name: "Utilities and Services",
          purpose: "Clarifies responsibility for utilities and services",
          example: "Tenant is responsible for paying all utilities and services, including [List of Utilities]. Landlord will provide and pay for [List of Landlord-Provided Services]."
        },
        {
          name: "Use and Occupancy",
          purpose: "Defines permitted use and occupants",
          example: "Premises shall be used as a private residence only for the following occupants: [List of Occupants]. Tenant shall not sublet or assign the Premises without Landlord's prior written consent."
        },
        {
          name: "Maintenance and Repairs",
          purpose: "Establishes responsibilities for upkeep",
          example: "Tenant shall maintain the Premises in a clean and sanitary condition and promptly notify Landlord of any needed repairs. Landlord shall maintain the structural elements, plumbing, heating, and electrical systems in good working order."
        },
        {
          name: "Entry and Inspection",
          purpose: "Establishes landlord's right to enter property",
          example: "Landlord may enter the Premises for inspection, repairs, or showing to prospective tenants with [Number] hours' notice, except in emergencies."
        },
        {
          name: "Termination and Default",
          purpose: "Outlines conditions for ending the lease or eviction",
          example: "Either party may terminate this lease with [Number] days' written notice. Tenant's failure to pay rent within [Number] days of the due date or violation of any lease term constitutes default, entitling Landlord to terminate the lease with [Number] days' notice."
        }
      ],
      importantConsiderations: [
        "Landlord-tenant laws vary significantly by jurisdiction",
        "Some jurisdictions impose specific requirements for security deposits",
        "Local laws may provide tenants with rights that cannot be waived by lease terms",
        "Consider including specific policies on pets, smoking, guests, parking, etc.",
        "Both parties should keep a signed copy of the lease agreement"
      ]
    },
    {
      name: "General Power of Attorney",
      description: "Legal document authorizing someone to act on your behalf",
      keyComponents: [
        {
          name: "Designation",
          purpose: "Identifies principal and agent",
          example: "I, [Principal Name], of [Address], hereby appoint [Agent Name], of [Address], as my true and lawful attorney-in-fact ('Agent')."
        },
        {
          name: "Powers Granted",
          purpose: "Specifies authority given to agent",
          example: "I grant my Agent full power and authority to act on my behalf in all matters, including but not limited to: real estate transactions, banking transactions, business operations, legal claims, personal and family maintenance, government benefits, retirement plans, and tax matters."
        },
        {
          name: "Durability Provision",
          purpose: "Determines if power continues during incapacity",
          example: "This Power of Attorney shall not be affected by my disability or incapacity and shall remain in effect until my death or until I revoke it in writing."
        },
        {
          name: "Effective Date",
          purpose: "Specifies when the power becomes effective",
          example: "This Power of Attorney is effective immediately upon execution and shall continue until revoked or terminated as specified herein."
        },
        {
          name: "Successor Agent",
          purpose: "Names backup agent if first cannot serve",
          example: "If [Agent Name] is unable or unwilling to serve or continue to serve as my Agent, I appoint [Successor Agent Name], of [Address], as successor Agent."
        },
        {
          name: "Revocation Clause",
          purpose: "States how the power can be terminated",
          example: "This Power of Attorney may be revoked by me at any time by written notice to my Agent."
        },
        {
          name: "Execution",
          purpose: "Formal signing to make document legally valid",
          example: "IN WITNESS WHEREOF, I have executed this Power of Attorney on [Date]."
        }
      ],
      importantConsiderations: [
        "A general power of attorney grants broad authority and should only be given to someone completely trustworthy",
        "Requirements for valid powers of attorney vary by state (notarization, witnesses, etc.)",
        "Consider a limited power of attorney for specific transactions rather than general authority",
        "Financial institutions sometimes require their own power of attorney forms",
        "Review and update your power of attorney regularly, especially after major life changes"
      ]
    },
    {
      name: "Non-Disclosure Agreement",
      description: "Contract to protect confidential information",
      keyComponents: [
        {
          name: "Parties",
          purpose: "Identifies who is sharing and receiving information",
          example: "This Non-Disclosure Agreement ('Agreement') is entered into on [Date] between [Disclosing Party Name] ('Disclosing Party') and [Receiving Party Name] ('Receiving Party')."
        },
        {
          name: "Definition of Confidential Information",
          purpose: "Specifies what information is protected",
          example: "For purposes of this Agreement, 'Confidential Information' means any information disclosed by Disclosing Party to Receiving Party, either directly or indirectly, in writing, orally or otherwise, that is designated as confidential or would reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure, including but not limited to [Specific Types of Information]."
        },
        {
          name: "Exclusions",
          purpose: "Identifies information not considered confidential",
          example: "Confidential Information does not include information that: (a) was in Receiving Party's possession prior to disclosure; (b) is or becomes publicly available through no fault of Receiving Party; (c) is rightfully received from a third party without restriction; (d) is independently developed by Receiving Party without use of Confidential Information; or (e) is disclosed pursuant to a legal requirement."
        },
        {
          name: "Obligations",
          purpose: "Specifies duties regarding confidential information",
          example: "Receiving Party shall: (a) use Confidential Information solely for the purpose of [Permitted Purpose]; (b) protect Confidential Information with at least the same degree of care used to protect its own confidential information; (c) limit access to those employees, agents, or representatives with a need to know; and (d) not disclose Confidential Information to any third party without prior written consent."
        },
        {
          name: "Term",
          purpose: "Specifies duration of confidentiality obligations",
          example: "This Agreement shall remain in effect for [Number] years from the Effective Date, although the obligations of confidentiality shall survive termination of this Agreement for a period of [Number] years thereafter."
        },
        {
          name: "Remedies",
          purpose: "Establishes consequences for breaches",
          example: "Receiving Party acknowledges that unauthorized disclosure may cause irreparable harm for which monetary damages would be inadequate. Accordingly, Disclosing Party may seek injunctive relief in addition to any other remedies available at law or in equity."
        },
        {
          name: "Return of Materials",
          purpose: "Requires return or destruction of confidential information",
          example: "Upon Disclosing Party's request or termination of this Agreement, Receiving Party shall promptly return or destroy all Confidential Information and provide written certification of such return or destruction."
        }
      ],
      importantConsiderations: [
        "Define 'Confidential Information' with enough specificity to be enforceable but enough breadth to cover important information",
        "Consider the appropriate duration for confidentiality obligations based on how quickly the information becomes obsolete",
        "Ensure the agreement specifies the permitted purpose for which information can be used",
        "NDAs can be mutual (both parties share confidential information) or one-way (only one party shares)",
        "Some information (trade secrets) may warrant protection beyond the term of the NDA"
      ]
    },
    {
      name: "Independent Contractor Agreement",
      description: "Contract establishing non-employee working relationship",
      keyComponents: [
        {
          name: "Parties and Services",
          purpose: "Identifies parties and work to be performed",
          example: "This Independent Contractor Agreement ('Agreement') is entered into on [Date] between [Client Name] ('Client') and [Contractor Name] ('Contractor') for the following services: [Detailed Description of Services]."
        },
        {
          name: "Independent Contractor Status",
          purpose: "Clarifies non-employee relationship",
          example: "Contractor is an independent contractor, not an employee of Client. Contractor is not entitled to employee benefits and is responsible for all taxes, insurance, and business expenses. Nothing in this Agreement shall be construed as creating an employer-employee, partnership, or joint venture relationship."
        },
        {
          name: "Compensation",
          purpose: "Specifies payment terms and amounts",
          example: "Client shall pay Contractor $[Amount] [per hour/project/etc.]. Contractor shall submit invoices [frequency] and Client shall pay approved invoices within [Number] days of receipt. [Include any details about expenses, advances, etc.]"
        },
        {
          name: "Term and Termination",
          purpose: "Establishes duration and ending conditions",
          example: "This Agreement begins on [Start Date] and continues until [End Date or Completion of Services], unless terminated earlier. Either party may terminate this Agreement with [Number] days' written notice. Client may terminate immediately for Contractor's material breach."
        },
        {
          name: "Intellectual Property",
          purpose: "Addresses ownership of work product",
          example: "All work product, inventions, and intellectual property created by Contractor in performing the Services ('Work Product') shall be the sole property of Client. Contractor hereby assigns all rights in Work Product to Client and shall assist Client in securing intellectual property protection."
        },
        {
          name: "Confidentiality",
          purpose: "Protects sensitive information",
          example: "Contractor shall maintain the confidentiality of all proprietary or confidential information of Client and shall not use or disclose such information except as necessary to perform the Services."
        },
        {
          name: "Performance Standards",
          purpose: "Sets quality expectations and deadlines",
          example: "Contractor shall perform the Services in a professional manner, consistent with industry standards. Contractor shall complete the Services according to the following schedule: [Timeline/Milestones]."
        },
        {
          name: "Indemnification",
          purpose: "Allocates responsibility for third-party claims",
          example: "Contractor shall indemnify and hold harmless Client from any claims, losses, or damages arising from Contractor's negligence, willful misconduct, or breach of this Agreement."
        }
      ],
      importantConsiderations: [
        "The distinction between independent contractors and employees is determined by law, not just by agreement",
        "Misclassifying employees as independent contractors can result in significant penalties",
        "Be specific about payment terms, deliverables, and timelines to avoid disputes",
        "Consider including provisions for revisions, approval processes, and acceptance criteria",
        "Intellectual property provisions are especially important for creative or technical services"
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="legal-advisor-interface">
      <div class="legal-header">
        <div class="legal-icon">
          <i class="fas fa-balance-scale"></i>
        </div>
        <div class="legal-title">
          <h2>Legal Advisor</h2>
          <p>General legal information and guidance on various legal topics</p>
        </div>
      </div>
      
      <div class="legal-disclaimer">
        <i class="fas fa-exclamation-circle"></i>
        <p>Information provided is general in nature and should not be construed as legal advice. Consult with a qualified attorney for advice specific to your situation.</p>
      </div>
      
      <div class="legal-areas-section">
        <div class="section-header">
          <h3>Legal Areas</h3>
          <p>Explore information on different areas of law</p>
        </div>
        
        <div class="legal-areas-grid">
          <!-- Legal areas will be dynamically generated -->
        </div>
      </div>
      
      <div class="legal-documents-section">
        <div class="section-header">
          <h3>Legal Document Templates</h3>
          <p>General guidance on common legal documents</p>
        </div>
        
        <div class="document-accordion" id="document-accordion">
          <!-- Document templates will be dynamically generated -->
        </div>
      </div>
      
      <div class="legal-consultation">
        <div class="section-header">
          <h3>Legal Information Requests</h3>
          <p>Get general information on specific legal topics</p>
        </div>
        
        <div class="consultation-options">
          <button class="consultation-option" data-type="explanation">
            <i class="fas fa-info-circle"></i>
            <span>Explain Legal Concept</span>
          </button>
          
          <button class="consultation-option" data-type="document">
            <i class="fas fa-file-alt"></i>
            <span>Document Information</span>
          </button>
          
          <button class="consultation-option" data-type="process">
            <i class="fas fa-tasks"></i>
            <span>Legal Process Guide</span>
          </button>
          
          <button class="consultation-option" data-type="rights">
            <i class="fas fa-hand-paper"></i>
            <span>Rights Information</span>
          </button>
          
          <button class="consultation-option" data-type="research">
            <i class="fas fa-search"></i>
            <span>Legal Research Help</span>
          </button>
        </div>
      </div>
      
      <div class="finding-attorney">
        <div class="section-header">
          <h3>Finding Legal Help</h3>
          <p>Guidance on locating appropriate legal assistance</p>
        </div>
        
        <div class="attorney-resources">
          <div class="resource-card">
            <div class="resource-title">Bar Association Referrals</div>
            <div class="resource-description">Local bar associations often provide referral services to help you find attorneys who specialize in your specific legal needs.</div>
          </div>
          
          <div class="resource-card">
            <div class="resource-title">Legal Aid Organizations</div>
            <div class="resource-description">These non-profit organizations provide free or low-cost legal services to individuals who meet certain income requirements.</div>
          </div>
          
          <div class="resource-card">
            <div class="resource-title">Law School Clinics</div>
            <div class="resource-description">Many law schools operate legal clinics where law students, supervised by faculty, provide legal services to the community.</div>
          </div>
          
          <div class="resource-card">
            <div class="resource-title">Pro Bono Services</div>
            <div class="resource-description">Many attorneys and law firms provide free services to clients who cannot afford legal representation.</div>
          </div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .legal-advisor-interface {
      background: linear-gradient(to bottom right, rgba(52, 211, 153, 0.1), rgba(16, 185, 129, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(52, 211, 153, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .legal-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .legal-icon {
      font-size: 2.5rem;
      color: #10b981;
      margin-right: 1rem;
    }
    
    .legal-title h2 {
      color: #10b981;
      margin-bottom: 0.3rem;
    }
    
    .legal-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .legal-disclaimer {
      background: rgba(254, 226, 226, 0.2);
      border: 1px solid rgba(248, 113, 113, 0.3);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .legal-disclaimer i {
      color: #ef4444;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    
    .legal-disclaimer p {
      color: #ef4444;
      font-size: 0.9rem;
      margin: 0;
    }
    
    .section-header {
      margin-bottom: 1.25rem;
    }
    
    .section-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .section-header p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .legal-areas-section, .legal-documents-section, .legal-consultation, .finding-attorney {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Legal Areas Grid */
    .legal-areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .legal-area-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .legal-area-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(52, 211, 153, 0.3);
    }
    
    .legal-area-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    
    .legal-area-icon {
      font-size: 1.25rem;
      color: #10b981;
    }
    
    .legal-area-title {
      color: #e2e8f0;
      font-size: 1.05rem;
      font-weight: 500;
    }
    
    .legal-area-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .legal-area-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .topic-tag {
      background: rgba(52, 211, 153, 0.15);
      color: #34d399;
      padding: 0.4rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    
    /* Document Accordion */
    .document-accordion {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .accordion-item {
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .accordion-header {
      background: rgba(15, 23, 42, 0.6);
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    
    .accordion-title {
      color: #f3f4f6;
      font-size: 1rem;
      font-weight: 500;
    }
    
    .accordion-icon i {
      color: #10b981;
      transition: transform 0.3s ease;
    }
    
    .accordion-content {
      background: rgba(15, 23, 42, 0.4);
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .accordion-content.active {
      padding: 1.25rem;
      max-height: 1000px;
    }
    
    .accordion-header.active .accordion-icon i {
      transform: rotate(180deg);
    }
    
    .document-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .components-section {
      margin-bottom: 1rem;
    }
    
    .components-title {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .component-item {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 6px;
      padding: 0.75rem 1rem;
      margin-bottom: 0.75rem;
    }
    
    .component-name {
      color: #10b981;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .component-purpose {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .component-example {
      color: #cbd5e1;
      font-size: 0.85rem;
      background: rgba(15, 23, 42, 0.6);
      padding: 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    
    .considerations-section {
      margin-top: 1.5rem;
    }
    
    .considerations-title {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .considerations-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .consideration-item {
      padding-left: 1.5rem;
      position: relative;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .consideration-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
    }
    
    /* Consultation Options */
    .consultation-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    
    .consultation-option {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .consultation-option:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(52, 211, 153, 0.3);
    }
    
    .consultation-option i {
      font-size: 1.75rem;
      color: #10b981;
    }
    
    .consultation-option span {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
    
    /* Finding Attorney */
    .attorney-resources {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .resource-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .resource-title {
      color: #10b981;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .resource-description {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Legal Advisor Mode');
    
    // Add the mode's CSS to the document
    this.addStyles();
    
    // If the mode's special interface container exists, render the interface
    const modeContainer = document.getElementById('modeSpecificUI');
    if (modeContainer) {
      this.renderUI(modeContainer);
    }
    
    // If the chat input exists, set a default message placeholder
    const chatInput = document.getElementById('messageInput');
    if (chatInput) {
      chatInput.placeholder = "Ask about legal concepts, documents, or general legal information...";
    }
    
    return this;
  },
  
  // Add the mode's CSS to the document
  addStyles: function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = this.styles;
    document.head.appendChild(styleElement);
  },
  
  // Render the mode's UI
  renderUI: function(container) {
    // Insert the HTML template
    container.innerHTML = this.template;
    
    // Populate legal areas
    this.populateLegalAreas(container);
    
    // Populate document templates
    this.populateDocumentTemplates(container);
    
    // Add event listeners
    this.addEventListeners(container);
  },
  
  // Populate legal areas
  populateLegalAreas: function(container) {
    const legalAreasGrid = container.querySelector('.legal-areas-grid');
    if (!legalAreasGrid) return;
    
    // Clear existing content
    legalAreasGrid.innerHTML = '';
    
    // Add legal area cards
    this.legalAreas.forEach(area => {
      const card = document.createElement('div');
      card.className = 'legal-area-card';
      card.dataset.area = area.name.toLowerCase().replace(/\s+/g, '-');
      
      // Get first 3 topics to display as tags
      const topicTags = area.keyTopics.slice(0, 3).map(topic => (
        `<div class="topic-tag">${topic.name}</div>`
      )).join('');
      
      card.innerHTML = `
        <div class="legal-area-header">
          <div class="legal-area-icon">
            <i class="fas fa-${area.icon}"></i>
          </div>
          <div class="legal-area-title">${area.name}</div>
        </div>
        <div class="legal-area-description">${area.description}</div>
        <div class="legal-area-topics">
          ${topicTags}
        </div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showLegalAreaDetails(area);
      });
      
      legalAreasGrid.appendChild(card);
    });
  },
  
  // Populate document templates
  populateDocumentTemplates: function(container) {
    const documentAccordion = container.querySelector('#document-accordion');
    if (!documentAccordion) return;
    
    // Clear existing content
    documentAccordion.innerHTML = '';
    
    // Add document templates accordions
    this.legalDocumentTemplates.forEach(template => {
      const accordionItem = document.createElement('div');
      accordionItem.className = 'accordion-item';
      
      // Create accordion header
      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.innerHTML = `
        <div class="accordion-title">${template.name}</div>
        <div class="accordion-icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      `;
      
      // Create accordion content
      const content = document.createElement('div');
      content.className = 'accordion-content';
      
      // Add description and components
      let contentHtml = `
        <div class="document-description">${template.description}</div>
        
        <div class="components-section">
          <div class="components-title">Key Components</div>
      `;
      
      template.keyComponents.forEach(component => {
        contentHtml += `
          <div class="component-item">
            <div class="component-name">${component.name}</div>
            <div class="component-purpose">${component.purpose}</div>
            <div class="component-example">${component.example}</div>
          </div>
        `;
      });
      
      contentHtml += `
        </div>
        
        <div class="considerations-section">
          <div class="considerations-title">Important Considerations</div>
          <ul class="considerations-list">
      `;
      
      template.importantConsiderations.forEach(consideration => {
        contentHtml += `<li class="consideration-item">${consideration}</li>`;
      });
      
      contentHtml += `
          </ul>
        </div>
      `;
      
      content.innerHTML = contentHtml;
      
      // Add event listener to toggle
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        content.classList.toggle('active');
      });
      
      // Add to accordion
      accordionItem.appendChild(header);
      accordionItem.appendChild(content);
      documentAccordion.appendChild(accordionItem);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Consultation option buttons
    const consultationOptions = container.querySelectorAll('.consultation-option');
    consultationOptions.forEach(option => {
      option.addEventListener('click', () => {
        const consultationType = option.dataset.type;
        this.showConsultationPrompt(consultationType);
      });
    });
  },
  
  // Show legal area details
  showLegalAreaDetails: function(area) {
    // Create a detailed prompt about the legal area
    let prompt = `Please provide a comprehensive overview of ${area.name}. Include:

1. A clear explanation of what ${area.name} encompasses and its importance
2. Key legal principles and concepts in this area
3. Common legal issues or situations people encounter
4. General processes or procedures relevant to this area
5. Important considerations for someone dealing with ${area.name} matters

Please focus on the following key topics within ${area.name}:
`;

    // Add key topics
    area.keyTopics.forEach(topic => {
      prompt += `- ${topic.name}: ${topic.description}\n`;
    });

    prompt += `\nPlease remember that your information should be general in nature and not constitute legal advice for specific situations. Emphasize when appropriate that consulting with a qualified attorney is recommended for specific legal matters.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show consultation prompt
  showConsultationPrompt: function(consultationType) {
    let prompt;
    
    switch (consultationType) {
      case 'explanation':
        prompt = `I can provide general information about legal concepts. To help me give you the most relevant information, please:

1. Specify the legal concept or term you'd like explained
2. Mention any particular aspects of the concept you're interested in
3. Indicate your level of familiarity with legal terminology
4. Share the context in which you're seeking this information (if applicable)

Please note that I can provide general legal information, but this does not constitute legal advice for your specific situation. For personalized legal advice, please consult with a qualified attorney.`;
        break;
        
      case 'document':
        prompt = `I can provide general information about legal documents. To help me give you the most relevant information, please:

1. Specify which legal document you're interested in learning about
2. Mention any particular aspects of the document you'd like explained (purpose, key components, common terms, etc.)
3. Indicate whether you're considering creating this document or reviewing one you've received
4. Share any concerns or questions you have about this type of document

Please note that I can provide general legal information about documents, but this does not constitute legal advice for your specific situation. For personalized legal advice or document review, please consult with a qualified attorney.`;
        break;
        
      case 'process':
        prompt = `I can provide general information about legal processes and procedures. To help me give you the most relevant information, please:

1. Specify which legal process you'd like to understand (court proceedings, filing requirements, administrative procedures, etc.)
2. Mention the jurisdiction you're interested in, if applicable (as processes vary by location)
3. Indicate your level of familiarity with the legal system
4. Share why you're interested in understanding this process

Please note that I can provide general information about legal processes, but this does not constitute legal advice for your specific situation. Processes may vary by jurisdiction and over time. For personalized legal advice, please consult with a qualified attorney.`;
        break;
        
      case 'rights':
        prompt = `I can provide general information about legal rights in various contexts. To help me give you the most relevant information, please:

1. Specify which rights you're interested in learning about (consumer rights, tenant rights, employee rights, constitutional rights, etc.)
2. Mention the context or situation in which these rights apply
3. Indicate the jurisdiction you're interested in, if applicable (as rights vary by location)
4. Share any specific questions you have about these rights

Please note that I can provide general information about legal rights, but this does not constitute legal advice for your specific situation. Rights may vary by jurisdiction and over time. For personalized legal advice, please consult with a qualified attorney.`;
        break;
        
      case 'research':
        prompt = `I can help guide your legal research efforts. To help me provide the most useful guidance, please:

1. Describe the legal topic or question you're researching
2. Mention whether this is for academic, personal, or professional purposes
3. Indicate what resources you've already consulted, if any
4. Share any specific challenges you've encountered in your research

I can suggest research approaches, potential resources, and key terms to explore. Please note that while I can help guide your research, I cannot conduct exhaustive legal research on specific questions, and my guidance does not constitute legal advice. For personalized legal research or advice, please consult with a qualified attorney.`;
        break;
        
      default:
        prompt = `I can provide general legal information on various topics. To help me give you the most relevant information, please:

1. Specify the legal topic or question you're interested in
2. Provide relevant context for your inquiry
3. Indicate your level of familiarity with this area of law
4. Share any specific aspects you'd like me to address

Please note that I provide general legal information, not personalized legal advice. For advice specific to your situation, please consult with a qualified attorney.`;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Send prompt to AI
  sendPromptToAI: function(prompt) {
    const chatInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (chatInput && sendButton) {
      chatInput.value = prompt;
      sendButton.click();
    }
  }
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    LegalAdvisorMode.init();
  } else {
    window.addEventListener('load', function() {
      LegalAdvisorMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LegalAdvisorMode;
} else {
  window.LegalAdvisorMode = LegalAdvisorMode;
}