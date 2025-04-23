/**
 * JAAT-AI Mode: Academic Research Assistant
 * 
 * Specialized mode for assisting with academic research,
 * literature reviews, paper structuring, and citation management.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const AcademicResearchAssistantMode = {
  id: 'academic-research-assistant',
  name: 'Academic Research Assistant',
  icon: 'graduation-cap',
  description: 'Tools and guidance for academic research and paper writing.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Academic Research Assistant mode, a specialized assistant for researchers, students, and academics. You help with various aspects of the academic research process, from initial literature reviews to final paper polishing.

Key characteristics:
1. You provide informed guidance on research methodologies, approaches, and best practices
2. You can structure and organize research papers and literature reviews
3. You offer assistance with citation formats (APA, MLA, Chicago, etc.) and academic writing conventions
4. You help clarify and refine research questions and hypotheses
5. You can summarize academic papers and concepts in accessible language
6. You maintain academic rigor while making complex concepts understandable
7. You suggest resources and directions for further research

When addressing academic questions, acknowledge both dominant theories and important critiques or alternate perspectives. Avoid making definitive claims in areas with ongoing scholarly debate. For technical fields, clarify when information might be outdated, and recommend consulting recent literature for the latest developments.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Help me develop a research question on climate change adaptation.",
    "I need to structure my literature review on machine learning ethics.",
    "How should I format citations in APA style?",
    "Can you explain the difference between qualitative and quantitative methods?",
    "What are some potential limitations for my study on online learning?",
    "Help me brainstorm keywords for my research on sustainable agriculture.",
    "What's the difference between a systematic and narrative literature review?",
    "I need help organizing the discussion section of my paper.",
    "Can you explain the concept of statistical significance in simple terms?",
    "What are the key components of a strong academic abstract?"
  ],
  
  // Research methodologies
  researchMethodologies: [
    {
      name: "Quantitative Research",
      description: "Research that deals with numbers and measurable data, often using statistical analysis",
      types: [
        {
          name: "Experimental Research",
          description: "Establishes cause and effect relationships by manipulating variables and observing outcomes",
          examples: [
            "Randomized Control Trials (RCTs)",
            "Quasi-experimental studies",
            "Laboratory experiments"
          ],
          strengths: [
            "Strong internal validity",
            "Ability to establish causation",
            "Replicability",
            "Precise measurement"
          ],
          limitations: [
            "Artificial settings may lack ecological validity",
            "Cannot always account for all variables",
            "Ethical concerns with certain manipulations",
            "May simplify complex phenomena"
          ]
        },
        {
          name: "Survey Research",
          description: "Collection of data through questionnaires or interviews from a sample to understand a larger population",
          examples: [
            "Cross-sectional surveys",
            "Longitudinal surveys",
            "Online questionnaires"
          ],
          strengths: [
            "Ability to collect data from large samples",
            "Cost-effective for large populations",
            "Standardized data collection",
            "Good for descriptive research questions"
          ],
          limitations: [
            "Self-reporting biases",
            "Response and selection biases",
            "Difficulty ensuring representative samples",
            "Limited depth of responses"
          ]
        },
        {
          name: "Observational Studies",
          description: "Studies where variables are observed rather than manipulated",
          examples: [
            "Cohort studies",
            "Case-control studies",
            "Cross-sectional studies"
          ],
          strengths: [
            "Can study phenomena that cannot be manipulated",
            "Often more representative of real-world conditions",
            "Can establish correlations and associations",
            "Useful for hypothesis generation"
          ],
          limitations: [
            "Cannot establish causation definitively",
            "Potential for confounding variables",
            "Selection bias",
            "Observer bias"
          ]
        },
        {
          name: "Correlational Research",
          description: "Examines relationships between variables without manipulating them",
          examples: [
            "Relationship between study hours and test scores",
            "Correlation between exercise and mental health",
            "Association between income and life satisfaction"
          ],
          strengths: [
            "Allows study of variables that cannot be manipulated",
            "Can identify patterns and relationships",
            "Provides direction for experimental research",
            "Often uses naturally occurring variables"
          ],
          limitations: [
            "Cannot establish causation",
            "Correlation does not imply causation",
            "May miss confounding variables",
            "Strength of relationship can be affected by outliers"
          ]
        }
      ]
    },
    {
      name: "Qualitative Research",
      description: "Research focused on understanding meanings, experiences, and perspectives through non-numerical data",
      types: [
        {
          name: "Ethnography",
          description: "Immersive study of cultures, communities, or social groups in their natural setting",
          examples: [
            "Participant observation of classroom dynamics",
            "Cultural immersion studies",
            "Workplace ethnographies"
          ],
          strengths: [
            "Rich, detailed description of cultural contexts",
            "Understands behaviors in natural settings",
            "Captures complexity of social phenomena",
            "Reveals insiders' perspectives"
          ],
          limitations: [
            "Time-intensive",
            "Potential researcher bias",
            "Limited generalizability",
            "Observer effect on participants"
          ]
        },
        {
          name: "Case Study",
          description: "In-depth analysis of specific instances, events, individuals, or organizations",
          examples: [
            "Analysis of organizational change in a company",
            "Detailed study of a unique medical case",
            "Educational intervention in a specific school"
          ],
          strengths: [
            "Provides rich, detailed understanding",
            "Captures complexity of real-world contexts",
            "Useful for unique or rare phenomena",
            "Generates hypotheses for further research"
          ],
          limitations: [
            "Limited generalizability",
            "Potential selection bias",
            "Researcher subjectivity",
            "Intensive time and resource requirements"
          ]
        },
        {
          name: "Phenomenology",
          description: "Study of individuals' lived experiences and perceptions of phenomena",
          examples: [
            "Experience of chronic illness",
            "Perceptions of workplace stress",
            "Understanding the experience of migration"
          ],
          strengths: [
            "Deep understanding of subjective experiences",
            "Captures meaning and essence of phenomena",
            "Gives voice to participants' perspectives",
            "Reveals nuances missed by quantitative approaches"
          ],
          limitations: [
            "Heavily dependent on participants' ability to articulate experiences",
            "Researcher interpretation biases",
            "Small sample sizes",
            "Difficult to generalize findings"
          ]
        },
        {
          name: "Grounded Theory",
          description: "Development of theory through systematic collection and analysis of data",
          examples: [
            "Developing models of patient adaptation to diagnosis",
            "Understanding processes of career change",
            "Theorizing social media behavior patterns"
          ],
          strengths: [
            "Develops theory directly from data",
            "Systematic analytical procedures",
            "Flexible yet rigorous approach",
            "Useful where existing theory is limited"
          ],
          limitations: [
            "Time-intensive coding and analysis",
            "Requires researcher theoretical sensitivity",
            "Potential premature theory closure",
            "Tension between emergence and forced conceptualization"
          ]
        },
        {
          name: "Narrative Research",
          description: "Study of stories and experiences as recounted by individuals",
          examples: [
            "Life histories of community leaders",
            "Patient illness narratives",
            "Teacher career development stories"
          ],
          strengths: [
            "Captures temporal and sequential aspects of experience",
            "Preserves context and complexity",
            "Reveals meaning-making processes",
            "Accessible and engaging presentation of findings"
          ],
          limitations: [
            "Heavily reliant on participants' recall and storytelling",
            "Researcher interpretation biases",
            "Challenging to analyze and synthesize",
            "Questions about representativeness of narratives"
          ]
        }
      ]
    },
    {
      name: "Mixed Methods Research",
      description: "Integration of both quantitative and qualitative approaches within a single study",
      types: [
        {
          name: "Convergent Parallel Design",
          description: "Concurrent collection and separate analysis of quantitative and qualitative data, followed by comparison or integration",
          examples: [
            "Survey with open-ended questions",
            "Collecting statistical and interview data simultaneously",
            "Combining test scores with focus groups"
          ],
          strengths: [
            "Comprehensive understanding of research problem",
            "Efficient data collection",
            "Validates findings through triangulation",
            "Compensates for weaknesses in either approach"
          ],
          limitations: [
            "Requires expertise in both methodologies",
            "Challenging to resolve discrepancies in results",
            "Resource-intensive",
            "Integration complexities"
          ]
        },
        {
          name: "Explanatory Sequential Design",
          description: "Quantitative data collection and analysis followed by qualitative research to explain findings",
          examples: [
            "Survey followed by interviews with selected respondents",
            "Statistical analysis with subsequent focus groups",
            "Test results explained through case studies"
          ],
          strengths: [
            "Qualitative data helps explain quantitative results",
            "Clear, distinct stages",
            "Useful for unexpected quantitative findings",
            "Appeals to quantitatively-oriented researchers"
          ],
          limitations: [
            "Time-consuming sequential process",
            "Participant availability for second phase",
            "Sample selection for qualitative follow-up",
            "Integration challenges"
          ]
        },
        {
          name: "Exploratory Sequential Design",
          description: "Qualitative data collection and analysis followed by quantitative research to test or generalize findings",
          examples: [
            "Interviews leading to survey development",
            "Focus groups informing experimental design",
            "Case studies generating hypotheses for statistical testing"
          ],
          strengths: [
            "Builds quantitative measures grounded in participants' views",
            "Useful when instruments unavailable",
            "Exploratory for understudied phenomena",
            "Clear, distinct phases"
          ],
          limitations: [
            "Time-consuming sequential process",
            "Sample selection across phases",
            "Determining which qualitative findings to quantify",
            "Resource requirements"
          ]
        },
        {
          name: "Embedded Design",
          description: "One data type plays a supportive role within a study predominantly based on the other data type",
          examples: [
            "Qualitative interviews within an experimental trial",
            "Quantitative measures within a case study",
            "Statistical analysis supporting ethnographic research"
          ],
          strengths: [
            "Addresses different questions requiring different data",
            "Adds insights when single method insufficient",
            "Can be implemented with limited resources",
            "Flexible timing of supplemental strand"
          ],
          limitations: [
            "Purpose of secondary data must be clear",
            "Integration challenges",
            "Unequal emphasis may shortchange secondary method",
            "Resolving discrepancies between data types"
          ]
        }
      ]
    },
    {
      name: "Action Research",
      description: "Research conducted with active participation of subjects to solve practical problems",
      types: [
        {
          name: "Participatory Action Research",
          description: "Collaborative approach where communities or organizations actively engage in the research process",
          examples: [
            "Community-based health interventions",
            "Collaborative school improvement initiatives",
            "Workplace policy development"
          ],
          strengths: [
            "Directly addresses stakeholder concerns",
            "Empowers participants as co-researchers",
            "Creates practical, applicable solutions",
            "Promotes social change"
          ],
          limitations: [
            "Complex power dynamics",
            "Time and resource intensive",
            "Balancing scientific rigor with participation",
            "Generalizability questions"
          ]
        },
        {
          name: "Practitioner Research",
          description: "Research conducted by practitioners in their own professional settings",
          examples: [
            "Teacher inquiry in classrooms",
            "Nurses investigating clinical practices",
            "Social workers evaluating intervention approaches"
          ],
          strengths: [
            "Directly relevant to practice",
            "Bridges theory-practice gap",
            "Insider knowledge and access",
            "Professional development for practitioners"
          ],
          limitations: [
            "Dual roles may create conflicts",
            "Potential bias from insider perspective",
            "Methodological rigor challenges",
            "Time constraints given professional duties"
          ]
        }
      ]
    },
    {
      name: "Literature-Based Methodologies",
      description: "Research that systematically analyzes existing published materials",
      types: [
        {
          name: "Systematic Review",
          description: "Comprehensive, transparent approach to identifying, selecting, and synthesizing all relevant research on a specific question",
          examples: [
            "Effectiveness of treatments for a medical condition",
            "Impact of educational interventions on student outcomes",
            "Environmental effects of industrial practices"
          ],
          strengths: [
            "Comprehensive assessment of existing evidence",
            "Minimizes bias through systematic search",
            "Transparent, reproducible methodology",
            "Identifies research gaps"
          ],
          limitations: [
            "Time and resource intensive",
            "Publication bias in available literature",
            "Quality assessment challenges",
            "Rapid obsolescence in fast-changing fields"
          ]
        },
        {
          name: "Meta-Analysis",
          description: "Statistical combination of results from multiple studies to increase power and precision",
          examples: [
            "Analyzing effect sizes across multiple clinical trials",
            "Combining correlation studies on personality traits",
            "Statistical synthesis of experimental educational research"
          ],
          strengths: [
            "Increased statistical power",
            "Quantitative synthesis of findings",
            "Identifies patterns across studies",
            "Provides overall effect size estimates"
          ],
          limitations: [
            "Comparing studies with methodological differences",
            "Publication bias skewing available data",
            "'Garbage in, garbage out' risk",
            "Often limited to similar study designs"
          ]
        },
        {
          name: "Scoping Review",
          description: "Preliminary assessment of potential size and scope of available research literature",
          examples: [
            "Mapping research on emerging technologies",
            "Examining range of interventions in a field",
            "Identifying research gaps across disciplines"
          ],
          strengths: [
            "Maps breadth of literature across fields",
            "Identifies research gaps quickly",
            "Clarifies key concepts and definitions",
            "Informs future systematic reviews"
          ],
          limitations: [
            "Less methodologically rigorous than systematic reviews",
            "Usually doesn't assess study quality",
            "Findings more difficult to synthesize",
            "Less definitive conclusions"
          ]
        },
        {
          name: "Integrative Review",
          description: "Synthesizes findings from diverse methodologies (both quantitative and qualitative)",
          examples: [
            "Reviewing mixed-methods research on patient experiences",
            "Synthesizing diverse studies on organizational change",
            "Integrating multiple perspectives on educational policy"
          ],
          strengths: [
            "Incorporates diverse methodologies",
            "Provides comprehensive understanding",
            "Bridges qualitative and quantitative findings",
            "Applicable to complex topics"
          ],
          limitations: [
            "Methodological complexity",
            "Quality assessment challenges across methods",
            "Integration difficulties",
            "Potential for subjective interpretation"
          ]
        }
      ]
    }
  ],
  
  // Paper structure templates
  paperStructures: [
    {
      type: "Empirical Research Paper",
      description: "Reports original research based on data collection and analysis",
      sections: [
        {
          name: "Title",
          description: "Clear, concise description of the paper's content, often including key variables or theoretical framework",
          guidelines: [
            "Keep under 12-15 words when possible",
            "Avoid abbreviations and jargon",
            "Include key variables or relationships studied",
            "Consider SEO and searchability for digital publication"
          ],
          examples: [
            "The Effect of Sleep Deprivation on Cognitive Performance Among College Students",
            "Social Media Use and Depression in Adolescents: A Longitudinal Analysis"
          ]
        },
        {
          name: "Abstract",
          description: "Brief summary of the paper, typically 150-250 words covering purpose, methods, results, and conclusions",
          guidelines: [
            "Include research question or objective",
            "Briefly describe methodology and sample",
            "Summarize key findings",
            "State major conclusions and implications",
            "Follow journal-specific word limits and structure"
          ],
          examples: [
            "This study examined the relationship between exercise frequency and stress levels among working adults. Participants (N=312) completed measures of physical activity and perceived stress over a six-month period. Results indicated that individuals who engaged in moderate exercise at least three times weekly reported significantly lower stress levels (p<.01) compared to sedentary counterparts. These findings suggest that regular physical activity may serve as an effective stress management intervention for working adults."
          ]
        },
        {
          name: "Introduction",
          description: "Sets context, establishes importance, reviews relevant literature, and states research questions/hypotheses",
          guidelines: [
            "Start broadly then narrow to specific research question",
            "Establish significance of the problem/topic",
            "Briefly summarize relevant literature",
            "Identify gaps or problems in existing research",
            "Clearly state purpose, research questions, and hypotheses",
            "Outline theoretical framework if applicable",
            "Preview paper structure (optional)"
          ],
          examples: [
            "Opening with statistics on prevalence of anxiety disorders, narrowing to focus on treatment accessibility issues, reviewing literature on telehealth interventions, identifying gap in understanding effectiveness for specific populations, stating research questions about comparative effectiveness of in-person versus telehealth cognitive behavioral therapy for rural adults with generalized anxiety disorder"
          ]
        },
        {
          name: "Literature Review",
          description: "Comprehensive review of relevant previous work, establishing theoretical context and research gaps",
          guidelines: [
            "Organize by themes, chronology, or methodological approaches",
            "Synthesize rather than summarize individual studies",
            "Highlight consistencies and contradictions in literature",
            "Identify theoretical frameworks relevant to research",
            "Establish clear gap your research addresses",
            "Maintain critical perspective while remaining objective",
            "Ensure comprehensive coverage of seminal and recent works"
          ],
          examples: [
            "Beginning with overview of theoretical models of second language acquisition, then examining research on immersion programs, followed by studies on technology-assisted language learning, culminating in identification of limited research on combining immersion with technological interventions"
          ]
        },
        {
          name: "Methods",
          description: "Detailed description of research design, participants, materials, procedures, and analysis techniques",
          guidelines: [
            "Describe research design with rationale",
            "Detail participant characteristics and sampling procedures",
            "Explain materials, measures, and instruments with reliability/validity information",
            "Outline procedures chronologically",
            "Explain data analysis techniques with justification",
            "Address ethical considerations and approvals",
            "Provide enough detail for replication"
          ],
          examples: [
            "Describing mixed-methods sequential explanatory design, outlining participant recruitment from three universities (N=157), detailing demographic characteristics, explaining survey instruments with Cronbach's alpha values, describing follow-up interview protocol, and explaining statistical analyses followed by thematic analysis approach for qualitative data"
          ]
        },
        {
          name: "Results",
          description: "Presentation of findings without interpretation, using tables, figures, and text",
          guidelines: [
            "Organize by research questions or hypotheses",
            "Present descriptive statistics before inferential statistics",
            "Report statistical test results in proper format (with test statistic, degrees of freedom, p-value, effect size)",
            "Use tables and figures effectively for complex data",
            "Report qualitative findings with appropriate quotations or thematic structures",
            "Avoid interpretation or discussion of implications",
            "Report all relevant findings, including non-significant results"
          ],
          examples: [
            "Presenting demographic data in a table, showing correlation matrix of key variables, reporting regression analysis results with standardized coefficients, then presenting key themes from qualitative analysis with representative participant quotes"
          ]
        },
        {
          name: "Discussion",
          description: "Interpretation of results, comparison with existing literature, limitations, and implications",
          guidelines: [
            "Begin with summary of key findings",
            "Interpret results in context of research questions/hypotheses",
            "Compare findings with previous research",
            "Explain unexpected results",
            "Acknowledge limitations and methodological constraints",
            "Discuss theoretical and practical implications",
            "Suggest directions for future research",
            "Avoid introducing new results"
          ],
          examples: [
            "Opening with summary of findings on effectiveness of intervention, explaining how results support or contradict existing theories, discussing unexpected findings regarding gender differences, acknowledging sample limitations, exploring implications for clinical practice, and suggesting longitudinal research for future studies"
          ]
        },
        {
          name: "Conclusion",
          description: "Brief summary of key findings and importance, often integrated into discussion in shorter papers",
          guidelines: [
            "Restate the research problem and major findings",
            "Emphasize the significance and implications of the study",
            "End with strong statement about contribution to the field",
            "Avoid introducing new information or arguments",
            "Be concise - typically 1-2 paragraphs",
            "Consider broader impact or applications"
          ],
          examples: [
            "This study demonstrated that brief mindfulness interventions can significantly reduce test anxiety in undergraduate students, with effects persisting for at least three weeks. These findings suggest that universities could implement cost-effective, brief interventions to improve student wellbeing during examination periods. As mental health concerns among college students continue to rise, such accessible interventions offer promising approaches to support student success."
          ]
        },
        {
          name: "References",
          description: "Complete list of all sources cited in the paper, formatted according to the required style guide",
          guidelines: [
            "Follow specified citation style consistently (APA, MLA, Chicago, etc.)",
            "Include all and only the works cited in the text",
            "Ensure accuracy of all reference details",
            "Check for proper formatting of different source types",
            "Arrange according to style requirements (typically alphabetical)",
            "Use reference management software to maintain consistency"
          ],
          examples: [
            "APA style reference list with journal articles, books, and electronic sources properly formatted with hanging indentation and alphabetical organization"
          ]
        },
        {
          name: "Appendices",
          description: "Supplementary materials that would disrupt the flow of the main text but provide valuable detail",
          guidelines: [
            "Include materials relevant but not essential to understanding the paper",
            "Label each appendix clearly (Appendix A, B, C, etc.)",
            "Reference appendices in the main text when relevant",
            "May include: lengthy tables, detailed methodological procedures, sample materials, additional analyses, survey instruments, interview protocols",
            "Consider file size and format for digital submissions"
          ],
          examples: [
            "Complete survey instrument, interview protocol, additional statistical analyses not central to main hypotheses, detailed coding scheme for qualitative analysis, large data tables"
          ]
        }
      ]
    },
    {
      type: "Literature Review Paper",
      description: "Synthesizes and critically analyzes existing literature on a topic",
      sections: [
        {
          name: "Title",
          description: "Indicates both the topic and that the paper is a review of literature",
          guidelines: [
            "Include key concepts being reviewed",
            "Consider phrases like 'A Review of,' 'Advances in,' or 'Trends in'",
            "Be specific about the scope or focus",
            "Keep relatively concise (under 15 words when possible)"
          ],
          examples: [
            "Machine Learning in Healthcare: A Systematic Review of Applications and Ethical Considerations",
            "Trends in Sustainable Urban Planning: A Review of Evidence-Based Approaches (2000-2020)"
          ]
        },
        {
          name: "Abstract",
          description: "Summary of the review's purpose, scope, methodology, key findings, and conclusions",
          guidelines: [
            "State the review's purpose and scope",
            "Briefly describe literature search methodology",
            "Summarize key themes or findings",
            "Highlight gaps and future research directions",
            "Keep within journal word limits (typically 150-250 words)"
          ],
          examples: [
            "This review examines research on mindfulness-based interventions for chronic pain management published between 2010-2022. Following PRISMA guidelines, 47 studies meeting inclusion criteria were analyzed for intervention characteristics, outcome measures, and effectiveness. Research consistently demonstrates moderate effects for pain reduction and improved quality of life, with stronger evidence for programs exceeding 8 weeks. Significant gaps remain in understanding mechanisms of action and effectiveness for specific pain conditions. Future research should prioritize comparative effectiveness studies and exploration of digital delivery methods."
          ]
        },
        {
          name: "Introduction",
          description: "Establishes topic importance, scope of review, and guiding questions or objectives",
          guidelines: [
            "Establish topic significance and relevance",
            "Define key terms and concepts",
            "Explicitly state review purpose and objectives",
            "Describe scope and boundaries (what is included/excluded)",
            "Explain the review's organization",
            "Provide rationale for conducting the review",
            "Present guiding questions or framework"
          ],
          examples: [
            "Opening with statistics on global microplastic pollution, defining key terms and classification systems, stating the review's purpose to synthesize detection methods and environmental impact findings, establishing timeframe of 2015-2022 and inclusion of marine environments only, explaining organization by methodological approaches and ecological consequences"
          ]
        },
        {
          name: "Methods",
          description: "Describes the approach to literature search, selection, and analysis (especially important for systematic reviews)",
          guidelines: [
            "Detail search strategy with databases and keywords",
            "Explain inclusion/exclusion criteria",
            "Describe screening and selection process",
            "Report number of studies reviewed at each stage",
            "Explain approach to quality assessment if applicable",
            "Outline data extraction and synthesis methods",
            "Consider using PRISMA or similar reporting guidelines"
          ],
          examples: [
            "Describing systematic search of PubMed, PsycINFO, and CINAHL using specified keywords, inclusion criteria limiting to empirical studies with adults published in English since 2010, screening process with initial yield of 1,247 articles narrowed to 83 for full review, quality assessment using the Mixed Methods Appraisal Tool, and thematic synthesis approach"
          ]
        },
        {
          name: "Literature Review/Results",
          description: "Organized presentation and analysis of the literature, typically in thematic sections",
          guidelines: [
            "Organize by themes, methodological approaches, chronology, or theoretical frameworks",
            "Synthesize rather than summarize individual studies",
            "Compare and contrast findings and approaches",
            "Identify patterns, trends, and contradictions",
            "Evaluate methodological strengths and limitations",
            "Use appropriate subheadings for clarity",
            "Consider tables or figures to summarize key studies"
          ],
          examples: [
            "Organizing review of artificial intelligence in education by applications (assessment, personalized learning, administrative systems), then by methodological approaches within each section, with tables summarizing key findings and sample characteristics across studies"
          ]
        },
        {
          name: "Discussion",
          description: "Interpretation of findings, identification of gaps, and implications for theory and practice",
          guidelines: [
            "Summarize key themes and patterns",
            "Identify conflicts or inconsistencies in the literature",
            "Discuss methodological strengths and weaknesses across studies",
            "Highlight significant gaps in knowledge",
            "Analyze implications for theory development",
            "Discuss practical or policy implications",
            "Suggest specific directions for future research"
          ],
          examples: [
            "Discussing converging evidence for effectiveness of cognitive-behavioral approaches while highlighting inconsistent findings regarding online delivery, analyzing methodological limitations including small sample sizes and diverse outcome measures, identifying gap in research with diverse populations, suggesting theoretical refinements, and proposing specific research questions for future studies"
          ]
        },
        {
          name: "Conclusion",
          description: "Summary of review findings and significance",
          guidelines: [
            "Briefly restate the review's purpose and scope",
            "Summarize the most significant findings",
            "Emphasize the review's contribution to the field",
            "Note broader implications",
            "Avoid introducing new material",
            "End with compelling statement about importance"
          ],
          examples: [
            "This review has synthesized two decades of research on urban heat island mitigation strategies, revealing strong evidence for the effectiveness of increased urban vegetation and high-albedo surfaces, while highlighting the need for context-specific approaches. As climate change intensifies urban heat challenges, this consolidated knowledge provides crucial guidance for urban planners and policymakers seeking evidence-based solutions. Future research must address implementation barriers and equity considerations to ensure that cooling benefits reach vulnerable populations."
          ]
        },
        {
          name: "References",
          description: "Complete list of all sources cited, following appropriate style guidelines",
          guidelines: [
            "Follow required citation style consistently",
            "Include all reviewed sources",
            "Ensure accurate and complete reference information",
            "Verify digital object identifiers (DOIs) when available",
            "Consider using reference management software"
          ],
          examples: [
            "Comprehensive reference list following APA style, including journal articles, books, conference proceedings, and other sources relevant to the review"
          ]
        }
      ]
    },
    {
      type: "Theoretical Paper",
      description: "Develops, analyzes, or critiques theoretical constructs without primary empirical research",
      sections: [
        {
          name: "Title",
          description: "Indicates the theoretical focus and contribution of the paper",
          guidelines: [
            "Clearly indicate theoretical nature of the paper",
            "Name key theoretical constructs or frameworks",
            "Consider phrases like 'Toward a Theory of,' 'Reconceptualizing,' or 'A Theoretical Framework for'",
            "Balance specificity and conciseness"
          ],
          examples: [
            "Reconceptualizing Digital Literacy: A Sociocultural Framework for Educational Practice",
            "Toward an Integrated Theory of Organizational Justice and Ethical Leadership"
          ]
        },
        {
          name: "Abstract",
          description: "Summary of the theoretical problem, approach, arguments, and contributions",
          guidelines: [
            "Identify theoretical problem or gap addressed",
            "Briefly describe approach or methodology",
            "Outline key theoretical arguments or components",
            "State major theoretical contributions",
            "Indicate implications for research or practice",
            "Follow journal-specific word limits"
          ],
          examples: [
            "This paper addresses limitations in current conceptualizations of workplace resilience by integrating psychological, sociological, and organizational perspectives. Through critical analysis of existing theories and interdisciplinary synthesis, we develop a multilevel framework that reconceptualizes resilience as a dynamic process rather than a static trait. The proposed theoretical model identifies mechanisms operating at individual, team, and organizational levels that promote adaptive responses to adversity. This framework advances theory by accounting for contextual factors and power dynamics typically overlooked, while offering practical implications for developing resilience-enhancing interventions beyond individual-focused approaches."
          ]
        },
        {
          name: "Introduction",
          description: "Establishes the theoretical problem, purpose, and significance of the paper",
          guidelines: [
            "Identify theoretical problem, contradiction, or gap",
            "Establish significance of the theoretical issue",
            "Briefly position within relevant theoretical traditions",
            "Clearly state purpose and contribution of the paper",
            "Preview theoretical approach and structure",
            "Define key terms and constructs",
            "Indicate theoretical and practical significance"
          ],
          examples: [
            "Opening with the theoretical tension between agency and structure in social theory, explaining limitations of current frameworks for understanding digital participation, establishing purpose to develop an integrated theoretical approach, previewing key theoretical components and structure of argument, and indicating significance for understanding digital inequality"
          ]
        },
        {
          name: "Literature Review/Theoretical Background",
          description: "Reviews and analyzes relevant theories and theoretical perspectives",
          guidelines: [
            "Trace historical development of relevant theoretical perspectives",
            "Analyze strengths and limitations of existing theories",
            "Identify areas of theoretical convergence and divergence",
            "Critically evaluate empirical support for theories when relevant",
            "Establish clear theoretical foundation for your contribution",
            "Identify specific theoretical gaps or problems to address"
          ],
          examples: [
            "Reviewing historical development of cognitive load theory, analyzing limitations in accounting for socio-emotional factors, examining competing theoretical frameworks from educational psychology, identifying convergence around the role of prior knowledge, and establishing specific theoretical limitations regarding collaborative learning contexts"
          ]
        },
        {
          name: "Theoretical Development/Argument",
          description: "Presents new theoretical model, framework, or analysis",
          guidelines: [
            "Clearly articulate theoretical propositions or components",
            "Develop logical arguments with clear reasoning",
            "Use examples to illustrate theoretical concepts",
            "Address potential counterarguments",
            "Use figures or models to visualize theoretical relationships",
            "Connect to existing theoretical foundations",
            "Explain novel contribution to theoretical understanding"
          ],
          examples: [
            "Presenting integrated theoretical model with key constructs and relationships defined, developing propositions about how variables interact, illustrating with hypothetical scenarios, addressing alternative explanations, including conceptual diagram of theoretical framework, and explaining advances beyond existing theories"
          ]
        },
        {
          name: "Discussion/Implications",
          description: "Explores significance, applications, and extensions of the theoretical contribution",
          guidelines: [
            "Discuss theoretical implications and contributions",
            "Explore practical applications of the theory",
            "Suggest approaches for empirical testing",
            "Acknowledge limitations or boundary conditions",
            "Consider interdisciplinary connections",
            "Outline agenda for future theoretical development",
            "Discuss ethical implications if relevant"
          ],
          examples: [
            "Discussing how the theoretical framework extends understanding of technological adoption, suggesting practical applications for system design, proposing specific research questions and methodologies for empirical validation, acknowledging contextual limitations, exploring connections to related fields, and outlining future theoretical refinements"
          ]
        },
        {
          name: "Conclusion",
          description: "Summarizes theoretical contribution and broader significance",
          guidelines: [
            "Restate key theoretical contribution",
            "Emphasize significance for theoretical advancement",
            "Highlight potential for empirical and practical applications",
            "Consider broader intellectual or societal implications",
            "End with compelling statement about theoretical importance"
          ],
          examples: [
            "This paper has developed an integrated theoretical framework that reconceptualizes innovation diffusion by incorporating cultural and contextual dimensions previously overlooked. By bridging technological determinism and social constructivism, this theory provides a more comprehensive explanation for the varied adoption patterns observed across different societies. As emerging technologies continue to transform social institutions, this theoretical perspective offers researchers and policymakers a more nuanced foundation for understanding and shaping technology implementation."
          ]
        },
        {
          name: "References",
          description: "List of all theoretical and supporting sources cited",
          guidelines: [
            "Include seminal theoretical works",
            "Incorporate diverse theoretical perspectives",
            "Ensure interdisciplinary coverage when relevant",
            "Follow appropriate citation style",
            "Verify accurate representation of theoretical sources"
          ],
          examples: [
            "Comprehensive reference list with emphasis on foundational theoretical works, recent theoretical developments, and supporting empirical research where relevant"
          ]
        }
      ]
    },
    {
      type: "Case Study",
      description: "In-depth examination of a specific instance, case, or bounded system",
      sections: [
        {
          name: "Title",
          description: "Indicates both the specific case and analytical focus",
          guidelines: [
            "Identify the specific case or organization",
            "Indicate the phenomenon or issue being studied",
            "Consider format: 'Case Name: Focus' or 'Phenomenon in Context: A Case Study'",
            "Balance specificity and readability"
          ],
          examples: [
            "Digital Transformation at Maersk: Navigating Disruption in the Shipping Industry",
            "Teacher Implementation of Project-Based Learning: A Case Study in Rural Secondary Schools"
          ]
        },
        {
          name: "Abstract",
          description: "Summary of the case context, focus, methodology, key findings, and implications",
          guidelines: [
            "Briefly describe the case and its significance",
            "Identify research questions or analytical focus",
            "Note methodological approach",
            "Summarize key findings or insights",
            "State major implications or lessons",
            "Follow journal-specific word limits (typically 150-250 words)"
          ],
          examples: [
            "This case study examines the implementation of telemedicine services at River Valley Hospital during the COVID-19 pandemic. Through interviews with 15 healthcare providers and analysis of operational data, we investigated the organizational and technological factors influencing rapid adoption. Findings reveal how leadership approaches, existing technological infrastructure, and regulatory changes interacted to enable successful implementation within six weeks. The case provides insights into organizational change during crisis situations and offers practical lessons for healthcare systems implementing telehealth services under time constraints."
          ]
        },
        {
          name: "Introduction",
          description: "Establishes case significance, context, and research focus",
          guidelines: [
            "Introduce the case and its significance",
            "Establish broader context or problem",
            "Present specific research questions or analytical focus",
            "Justify case selection and importance",
            "Preview case study approach and structure",
            "Indicate theoretical framing if applicable",
            "Note contribution to knowledge or practice"
          ],
          examples: [
            "Opening with overview of community banking challenges in digital era, introducing Pacific Community Bank as representative case of successful digital transformation, establishing research questions about leadership approaches and implementation strategies, justifying single case selection based on exemplary outcomes, and noting contribution to understanding technology adoption in traditional banking"
          ]
        },
        {
          name: "Literature Review/Theoretical Framework",
          description: "Reviews relevant literature and establishes conceptual framework for analyzing the case",
          guidelines: [
            "Review literature relevant to the case's central phenomena",
            "Establish theoretical or conceptual framework for analysis",
            "Connect case to broader research conversations",
            "Identify what is known and unknown about similar cases",
            "Develop analytical lens for case interpretation",
            "Consider multiple theoretical perspectives when appropriate"
          ],
          examples: [
            "Reviewing literature on organizational change management, digital transformation processes, and leadership approaches during crisis, then developing an integrated analytical framework incorporating adaptive leadership, socio-technical systems, and organizational learning theories to guide case analysis"
          ]
        },
        {
          name: "Methodology",
          description: "Explains case selection, data collection, and analytical approaches",
          guidelines: [
            "Justify case selection strategy (typical, extreme, revelatory, etc.)",
            "Define case boundaries clearly",
            "Detail data collection methods and sources",
            "Explain participant selection if applicable",
            "Describe analytical approach to case data",
            "Address trustworthiness and validity strategies",
            "Note researcher positionality if relevant",
            "Consider ethical considerations"
          ],
          examples: [
            "Explaining selection of multinational corporation as revelatory case of sustainability implementation, defining case boundaries as headquarters operations between 2018-2022, detailing multiple data sources including 23 interviews, document analysis, and observation, describing thematic analysis process, and explaining triangulation and member checking procedures"
          ]
        },
        {
          name: "Case Description",
          description: "Detailed narrative of the case and its context",
          guidelines: [
            "Provide rich, contextual description of the case",
            "Present chronology or key phases when relevant",
            "Include sufficient detail for reader understanding",
            "Balance comprehensive description with analytical focus",
            "Consider using headings for different aspects of the case",
            "Include relevant background and contextual factors",
            "Incorporate participant perspectives where appropriate"
          ],
          examples: [
            "Providing organizational history and context, describing decision to implement new technology, detailing implementation process chronologically over 18 months, explaining key stakeholders and their roles, and describing outcomes and current status"
          ]
        },
        {
          name: "Analysis/Findings",
          description: "Analysis of key themes, patterns, or insights from the case",
          guidelines: [
            "Organize by key themes or analytical categories",
            "Support analysis with specific evidence from case data",
            "Apply theoretical framework to interpret findings",
            "Identify patterns, relationships, or mechanisms",
            "Use participant quotes or specific examples",
            "Consider alternative interpretations",
            "Relate findings to research questions"
          ],
          examples: [
            "Analyzing leadership approaches during transition, examining interaction between organizational culture and change processes, exploring technology implementation challenges and solutions, and identifying factors that facilitated successful outcomes, with each theme supported by specific evidence from interviews and documents"
          ]
        },
        {
          name: "Discussion",
          description: "Interprets case findings, connects to literature, and draws broader implications",
          guidelines: [
            "Compare findings with existing literature and theory",
            "Discuss unique or unexpected insights from the case",
            "Analyze implications for theory development",
            "Consider practical implications or lessons",
            "Discuss transferability to other contexts",
            "Acknowledge limitations of single case approach",
            "Suggest directions for future research"
          ],
          examples: [
            "Comparing change management approach to established models, discussing unique aspects of crisis-driven implementation, analyzing theoretical implications for understanding technology adoption, extracting practical lessons for similar organizations, discussing contextual factors affecting transferability, and suggesting comparative case studies for future research"
          ]
        },
        {
          name: "Conclusion",
          description: "Summarizes key insights and significance of the case",
          guidelines: [
            "Recap key insights from the case",
            "Emphasize most significant contributions to knowledge",
            "Highlight practical implications or lessons",
            "Note broader significance beyond the specific case",
            "End with compelling statement about case importance"
          ],
          examples: [
            "This case study of North Memorial Hospital's implementation of an integrated electronic health record system illuminates the crucial interplay between technical systems, organizational culture, and leadership approaches during complex digital transformations. By documenting both challenges and successful strategies, this case provides valuable insights for healthcare administrators navigating similar transitions. As healthcare digitization accelerates globally, lessons from this case highlight the importance of adaptive leadership and stakeholder engagement in realizing the potential of technological innovation to improve patient care."
          ]
        },
        {
          name: "References",
          description: "List of all literature and sources cited",
          guidelines: [
            "Include theoretical and methodological literature",
            "Cite contextual sources about case setting",
            "Reference similar case studies when available",
            "Follow appropriate citation style",
            "Consider including case data sources if not confidential"
          ],
          examples: [
            "Comprehensive reference list including theoretical literature, methodological sources, contextual materials about the organization or setting, and similar case studies"
          ]
        },
        {
          name: "Appendices",
          description: "Supplementary materials that provide additional case details",
          guidelines: [
            "Include materials that support case understanding",
            "Consider sample interview protocols or questions",
            "Provide timeline of key events if relevant",
            "Include organizational charts or structures if helpful",
            "Add supporting documentation (with permission)",
            "Clearly label and reference in main text"
          ],
          examples: [
            "Interview protocol, coding framework, organizational timeline, sample materials from the organization (with permission), or additional contextual information"
          ]
        }
      ]
    }
  ],
  
  // Citation styles
  citationStyles: [
    {
      name: "APA (American Psychological Association)",
      currentVersion: "7th Edition",
      commonUse: "Social sciences, education, business",
      inTextCitation: {
        basic: "According to recent research (Smith, 2020), climate patterns are changing rapidly.",
        multipleAuthors: "Previous studies (Johnson & Brown, 2019) established a framework for analysis.",
        threeOrMoreAuthors: "The experiment yielded significant results (Zhang et al., 2021).",
        directQuote: "Jones (2018) argued that \"intervention programs must be culturally responsive\" (p. 45).",
        noAuthor: "The report indicated concerning trends (\"Climate Patterns,\" 2021).",
        multipleWorks: "Several studies (Adams, 2019; Brown, 2020; Chen, 2021) have examined this phenomenon."
      },
      referenceExamples: [
        {
          type: "Journal Article",
          format: "Author, A. A., Author, B. B., & Author, C. C. (Year). Title of article. Title of Journal, Volume(Issue), page range. DOI or URL",
          example: "Grady, J. S., Her, M., Moreno, G., Perez, C., & Yelinek, J. (2019). Emotions in storybooks: A comparison of storybooks that represent ethnic and racial groups in the United States. Psychology of Popular Media Culture, 8(3), 207–217. https://doi.org/10.1037/ppm0000185"
        },
        {
          type: "Book",
          format: "Author, A. A., & Author, B. B. (Year). Title of book. Publisher. DOI or URL",
          example: "Brown, L. S. (2018). Feminist therapy (2nd ed.). American Psychological Association. https://doi.org/10.1037/0000092-000"
        },
        {
          type: "Book Chapter",
          format: "Author, A. A., & Author, B. B. (Year). Title of chapter. In E. E. Editor & F. F. Editor (Eds.), Title of book (pp. page range). Publisher. DOI or URL",
          example: "Balsam, K. F., Martell, C. R., Jones, K. P., & Safren, S. A. (2019). Affirmative cognitive behavior therapy with sexual and gender minority people. In G. Y. Iwamasa & P. A. Hays (Eds.), Culturally responsive cognitive behavior therapy: Practice and supervision (2nd ed., pp. 287–314). American Psychological Association. https://doi.org/10.1037/0000119-012"
        },
        {
          type: "Website",
          format: "Author, A. A. or Group Name. (Year, Month Day). Title of work. Site Name. URL",
          example: "Centers for Disease Control and Prevention. (2020, June 15). COVID-19 in racial and ethnic minority groups. https://www.cdc.gov/coronavirus/2019-ncov/need-extra-precautions/racial-ethnic-minorities.html"
        },
        {
          type: "Newspaper Article",
          format: "Author, A. A. (Year, Month Day). Title of article. Title of Newspaper. URL",
          example: "Roberts, S. (2020, April 9). Early string ties us to Neanderthals. The New York Times. https://www.nytimes.com/2020/04/09/science/neanderthals-fiber-string-math.html"
        }
      ]
    },
    {
      name: "MLA (Modern Language Association)",
      currentVersion: "9th Edition",
      commonUse: "Humanities, especially literature, arts, and language",
      inTextCitation: {
        basic: "Recent scholarship suggests a shift in interpretive approaches (Smith 42).",
        multipleAuthors: "The narrative structure reveals cultural influences (Johnson and Brown 156).",
        threeOrMoreAuthors: "Digital humanities techniques have transformed textual analysis (Zhang et al. 29).",
        directQuote: "According to Jones, \"the intersection of form and content reveals deeper cultural anxieties\" (45).",
        noAuthor: "The article suggests new interpretive methods (\"Reading Practices\" 7).",
        multipleWorks: "Several critics have noted this pattern (Adams 19; Brown 42; Chen 103)."
      },
      referenceExamples: [
        {
          type: "Book",
          format: "Author's Last Name, First Name. Title of Book. Publisher, Year of Publication.",
          example: "García Márquez, Gabriel. One Hundred Years of Solitude. Translated by Gregory Rabassa, Harper & Row, 1970."
        },
        {
          type: "Journal Article",
          format: "Author's Last Name, First Name. \"Title of Article.\" Title of Journal, Volume, Issue, Year, Pages.",
          example: "Goldman, Anne. \"Questions of Transport: Reading Primo Levi Reading Dante.\" The Georgia Review, vol. 64, no. 1, 2010, pp. 69-88."
        },
        {
          type: "Website",
          format: "Author's Last Name, First Name. \"Title of Work.\" Title of Website, Name of Publisher, Date of Publication, URL. Date of Access.",
          example: "Hollmichel, Stefanie. \"The Reading Brain: Differences between Digital and Print.\" So Many Books, 25 Apr. 2013, somanybooksblog.com/2013/04/25/the-reading-brain-differences-between-digital-and-print/. Accessed 12 May 2020."
        },
        {
          type: "Book Chapter or Anthology",
          format: "Author's Last Name, First Name. \"Title of Chapter.\" Title of Book, edited by Editor's Name, Publisher, Year, Pages.",
          example: "Dewar, James A., and Peng Hwa Ang. \"The Cultural Consequences of Printing and the Internet.\" Agent of Change: Print Culture Studies after Elizabeth L. Eisenstein, edited by Sabrina Alcorn Baron et al., University of Massachusetts Press, 2007, pp. 365-77."
        },
        {
          type: "Film",
          format: "Title of Film. Directed by Director's Name, Performances by Performers' Names, Production Company, Year.",
          example: "Citizen Kane. Directed by Orson Welles, performances by Orson Welles, Joseph Cotten, and Dorothy Comingore, RKO Radio Pictures, 1941."
        }
      ]
    },
    {
      name: "Chicago Style (Chicago Manual of Style)",
      currentVersion: "17th Edition",
      commonUse: "History, arts, and varied disciplines using both notes and bibliography",
      notes: "Chicago style offers two documentation systems: (1) Notes-Bibliography and (2) Author-Date. Notes-Bibliography is more common in humanities, while Author-Date is used in sciences and social sciences.",
      inTextCitation: {
        notesAndBibliography: {
          firstFootnote: "1. Michael Pollan, The Omnivore's Dilemma: A Natural History of Four Meals (New York: Penguin, 2006), 99–100.",
          subsequentFootnote: "2. Pollan, Omnivore's Dilemma, 3.",
          bibliography: "Pollan, Michael. The Omnivore's Dilemma: A Natural History of Four Meals. New York: Penguin, 2006."
        },
        authorDate: {
          basic: "(Pollan 2006, 99–100)",
          referenceList: "Pollan, Michael. 2006. The Omnivore's Dilemma: A Natural History of Four Meals. New York: Penguin."
        }
      },
      referenceExamples: [
        {
          type: "Book",
          format: {
            footnote: "Author First Name Last Name, Title of Book (Place of Publication: Publisher, Year), Page number.",
            bibliography: "Last Name, First Name. Title of Book. Place of Publication: Publisher, Year."
          },
          example: {
            footnote: "1. Zadie Smith, Swing Time (New York: Penguin Press, 2016), 315–16.",
            bibliography: "Smith, Zadie. Swing Time. New York: Penguin Press, 2016."
          }
        },
        {
          type: "Journal Article",
          format: {
            footnote: "Author First Name Last Name, \"Title of Article,\" Title of Journal Volume, Issue (Year): Page number.",
            bibliography: "Last Name, First Name. \"Title of Article.\" Title of Journal Volume, Issue (Year): Page range."
          },
          example: {
            footnote: "1. Susan Satterfield, \"Livy and the Pax Deum,\" Classical Philology 111, no. 2 (2016): 170.",
            bibliography: "Satterfield, Susan. \"Livy and the Pax Deum.\" Classical Philology 111, no. 2 (2016): 165–76."
          }
        },
        {
          type: "Website Content",
          format: {
            footnote: "Author First Name Last Name, \"Title of Page,\" Name of Website, publication or revision date, URL.",
            bibliography: "Last Name, First Name. \"Title of Page.\" Name of Website. Publication or revision date. URL."
          },
          example: {
            footnote: "1. \"Privacy Policy,\" Privacy & Terms, Google, last modified April 17, 2017, https://www.google.com/policies/privacy/.",
            bibliography: "Google. \"Privacy Policy.\" Privacy & Terms. Last modified April 17, 2017. https://www.google.com/policies/privacy/."
          }
        },
        {
          type: "Newspaper or Magazine Article",
          format: {
            footnote: "Author First Name Last Name, \"Title of Article,\" Title of Newspaper, Date, Page number.",
            bibliography: "Last Name, First Name. \"Title of Article.\" Title of Newspaper, Date."
          },
          example: {
            footnote: "1. Rebecca Mead, \"The Prophet of Dystopia,\" New Yorker, April 17, 2017, 43.",
            bibliography: "Mead, Rebecca. \"The Prophet of Dystopia.\" New Yorker, April 17, 2017."
          }
        }
      ]
    },
    {
      name: "IEEE (Institute of Electrical and Electronics Engineers)",
      currentVersion: "Based on Chicago Manual of Style",
      commonUse: "Engineering, electronics, computer science, information technology, technical fields",
      inTextCitation: {
        basic: "As demonstrated by Smith [1], the algorithm performs efficiently.",
        subsequentReference: "This approach improves on previous methods [2]–[4].",
        directQuote: "Kumar stated, \"quantum computing represents a paradigm shift\" [5, p. 14]."
      },
      referenceExamples: [
        {
          type: "Journal Article",
          format: "[#] A. A. Author, B. B. Author, and C. C. Author, \"Title of article,\" Title of Journal, vol. #, no. #, pp. #-#, Abbrev. Month, year, DOI.",
          example: "[1] J. U. Duncombe, \"Infrared navigation—Part I: An assessment of feasibility,\" IEEE Trans. Electron Devices, vol. ED-11, no. 1, pp. 34–39, Jan. 1959, doi: 10.1109/TED.2016.2628402."
        },
        {
          type: "Book",
          format: "[#] A. A. Author, Title of Book. City of Publisher, State (if U.S.): Publisher, year.",
          example: "[2] S. M. Metev and V. P. Veiko, Laser Assisted Microtechnology, 2nd ed. Berlin, Germany: Springer-Verlag, 1998."
        },
        {
          type: "Conference Paper",
          format: "[#] A. A. Author, B. B. Author, and C. C. Author, \"Title of paper,\" in Title of Published Proceedings, Proc. Abbrev., City, State/Country, year, pp. #-#, DOI.",
          example: "[3] P. Liu, S. Chen, H. Yang, and X. Fu, \"A comparative evaluation of stacked and isolated EMI filters of power converters,\" in Proc. IEEE Applied Power Electronics Conf. Expo. (APEC), San Antonio, TX, USA, 2018, pp. 2769–2776, doi: 10.1109/APEC.2018.8341405."
        },
        {
          type: "Website",
          format: "[#] A. A. Author, \"Title of webpage,\" Name of Website, Publisher (if applicable), Date of publication or last revision, URL (access date).",
          example: "[4] IEEE Board of Directors, \"IEEE code of ethics,\" IEEE, 2020. [Online]. Available: https://www.ieee.org/about/corporate/governance/p7-8.html. [Accessed: Apr. 10, 2020]."
        },
        {
          type: "Patent",
          format: "[#] A. A. Author, \"Title of patent,\" U.S. Patent #, Month day, year.",
          example: "[5] J. P. Wilkinson, \"Nonlinear resonant circuit devices,\" U.S. Patent 3 624 125, July 16, 1990."
        }
      ]
    }
  ],
  
  // Literature review types
  literatureReviewTypes: [
    {
      name: "Narrative Review",
      description: "A traditional literature review that provides a qualitative summary of existing research on a topic, often without explicit methodological approach to selection and analysis of literature",
      purpose: "To provide an overview of knowledge on a topic, identify gaps, and suggest future research directions",
      methodology: "Less systematic approach to literature selection; review process typically not explicitly described",
      strengths: [
        "Provides broad, comprehensive overview of a topic",
        "Flexible and can incorporate diverse literature types",
        "Often more accessible to non-specialist audiences",
        "Useful for emerging topics with limited research",
        "Allows for theoretical integration and development"
      ],
      limitations: [
        "Potential for selection bias in included literature",
        "Search methodology often not explicit or reproducible",
        "May lack critical assessment of literature quality",
        "Conclusions may be more subjective",
        "Less transparent than systematic approaches"
      ],
      exampleTopics: [
        "Historical development of cognitive psychology theories",
        "Overview of leadership approaches in healthcare settings",
        "Current understanding of neuroplasticity in learning",
        "Theoretical perspectives on organizational culture"
      ]
    },
    {
      name: "Systematic Review",
      description: "A comprehensive, structured review that uses explicit, reproducible methods to identify, select, and critically appraise relevant research on a clearly formulated question",
      purpose: "To provide complete synthesis of all available evidence on a specific research question, with minimal bias",
      methodology: "Rigorous methodology with predefined protocol; comprehensive search strategy; explicit inclusion/exclusion criteria; formal quality assessment; structured synthesis",
      strengths: [
        "Transparent and reproducible methodology",
        "Comprehensive in capturing all relevant literature",
        "Minimizes selection and publication bias",
        "Systematic quality assessment of included studies",
        "Strong evidence base for practice and policy decisions"
      ],
      limitations: [
        "Time and resource intensive",
        "Often limited to specific study designs (typically quantitative)",
        "May become quickly outdated in rapidly evolving fields",
        "Research question must be narrow and focused",
        "Less suitable for conceptual or theoretical exploration"
      ],
      exampleTopics: [
        "Effectiveness of cognitive behavioral therapy for depression",
        "Impact of nurse-to-patient ratios on patient outcomes",
        "Effectiveness of online learning compared to traditional instruction",
        "Security interventions for preventing data breaches"
      ],
      protocols: [
        "PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses)",
        "Cochrane Handbook for Systematic Reviews of Interventions",
        "JBI (Joanna Briggs Institute) Methodology for Systematic Reviews",
        "RAMESES for realist reviews"
      ]
    },
    {
      name: "Meta-Analysis",
      description: "A statistical technique that combines the results of multiple scientific studies addressing the same research question",
      purpose: "To increase statistical power and precision in estimating effects by pooling data from multiple studies",
      methodology: "Systematic review methodology plus statistical techniques to combine quantitative results; effect size calculation; assessment of heterogeneity; sensitivity analysis",
      strengths: [
        "Provides quantitative synthesis with increased statistical power",
        "Allows estimation of overall effect size across studies",
        "Can identify sources of variation in effects",
        "Provides precise confidence intervals for effect estimates",
        "Highest level of evidence in evidence hierarchies"
      ],
      limitations: [
        "Limited to quantitative studies with comparable outcomes",
        "'Garbage in, garbage out' - limited by quality of included studies",
        "Statistical complexity requiring specialized expertise",
        "Publication bias may skew results",
        "Heterogeneity between studies may limit validity of pooling"
      ],
      exampleTopics: [
        "Effectiveness of mindfulness interventions for anxiety reduction",
        "Correlation between leadership style and employee performance",
        "Effect of reduced class size on academic achievement",
        "Efficacy of specific drugs for treating conditions"
      ],
      statisticalConcepts: [
        "Effect size (Cohen's d, odds ratio, risk ratio, correlation coefficient)",
        "Fixed effects vs. random effects models",
        "Forest plots for visualizing results",
        "Heterogeneity (I² statistic, Q-test)",
        "Funnel plots for publication bias"
      ]
    },
    {
      name: "Scoping Review",
      description: "A preliminary assessment of the potential size and scope of available research literature, often undertaken to determine the value of a full systematic review",
      purpose: "To map key concepts, identify research gaps, clarify conceptual boundaries, and inform future research",
      methodology: "Similar to systematic review but broader scope; may lack quality assessment; often includes diverse study designs; focuses on mapping rather than synthesizing evidence",
      strengths: [
        "Maps breadth of literature across fields or disciplines",
        "Identifies research gaps and types of available evidence",
        "Clarifies key concepts and definitions",
        "More flexible inclusion criteria than systematic reviews",
        "Can be completed more rapidly than systematic reviews"
      ],
      limitations: [
        "Usually does not include quality assessment of studies",
        "Findings more difficult to synthesize",
        "May not answer specific questions about effectiveness",
        "Less definitive conclusions than systematic reviews",
        "May lack depth in analysis of individual studies"
      ],
      exampleTopics: [
        "Scope of research on artificial intelligence in healthcare",
        "Range of interventions for promoting workplace wellbeing",
        "Mapping educational approaches for teaching sustainability",
        "Identifying how 'resilience' is conceptualized across disciplines"
      ],
      frameworks: [
        "Arksey and O'Malley framework",
        "PRISMA-ScR (PRISMA Extension for Scoping Reviews)",
        "JBI Methodology for Scoping Reviews"
      ]
    },
    {
      name: "Integrative Review",
      description: "A review method that synthesizes findings from diverse methodologies (quantitative, qualitative, mixed methods) to provide a comprehensive understanding of a topic",
      purpose: "To synthesize findings across methodological approaches to provide holistic understanding of complex phenomena",
      methodology: "Problem identification; literature search; data evaluation; data analysis with coding and categorization across methodologies; presentation of integrated findings",
      strengths: [
        "Incorporates diverse methodologies and theoretical literature",
        "Provides comprehensive understanding of complex phenomena",
        "Bridges qualitative and quantitative evidence",
        "Allows for theory development",
        "Applicable to emerging topics with diverse research approaches"
      ],
      limitations: [
        "Methodological complexity in integrating diverse study types",
        "Quality assessment challenges across different methodologies",
        "Risk of oversimplification when combining different approaches",
        "Less standardized than systematic reviews",
        "Potential for subjective interpretation in synthesis"
      ],
      exampleTopics: [
        "Patient experiences and outcomes of telehealth interventions",
        "Factors affecting technology adoption in education",
        "Understanding effectiveness and lived experience of chronic pain management",
        "Organizational change processes and outcomes"
      ]
    },
    {
      name: "Critical Review",
      description: "A review that goes beyond description to include analysis and conceptual innovation, typically resulting in a hypothesis or model",
      purpose: "To critically evaluate and synthesize literature to develop new frameworks, perspectives, or conceptual models",
      methodology: "Comprehensive search; detailed critical analysis of quality, coherence, and contribution; synthesis that extends beyond aggregation to conceptual development",
      strengths: [
        "Provides critical evaluation of literature quality and contribution",
        "Develops new models or theoretical perspectives",
        "Identifies contradictions and weaknesses in the literature",
        "Can transform or reconceptualize a topic",
        "Emphasizes conceptual contribution over exhaustive coverage"
      ],
      limitations: [
        "High subjectivity in critical assessment",
        "Less standardized methodology",
        "Requires substantial expertise in the subject area",
        "May reflect author's theoretical orientation",
        "Not focused on comprehensive synthesis of all evidence"
      ],
      exampleTopics: [
        "Critical analysis of theoretical approaches to organizational learning",
        "Reconceptualizing digital literacy for contemporary contexts",
        "Critique of methodological approaches in climate change research",
        "Development of integrated theoretical model of behavior change"
      ]
    },
    {
      name: "Rapid Review",
      description: "A form of knowledge synthesis that accelerates the process of conducting a traditional systematic review through streamlining or omitting specific methods",
      purpose: "To produce evidence synthesis more quickly for pressing decision-making needs",
      methodology: "Abbreviated systematic review process; limited databases; focused search terms; expedited screening and extraction; streamlined quality assessment; simplified synthesis",
      strengths: [
        "Provides evidence in time-sensitive contexts",
        "More systematic than narrative reviews",
        "Resource-efficient approach to evidence synthesis",
        "Maintains core elements of systematic methodology",
        "Useful for emerging issues requiring timely evidence"
      ],
      limitations: [
        "Potential for missing relevant literature",
        "Abbreviated quality assessment",
        "Less comprehensive than full systematic reviews",
        "Trade-off between speed and comprehensiveness",
        "Methods for abbreviation often not standardized"
      ],
      exampleTopics: [
        "Effectiveness of emerging treatments during disease outbreaks",
        "Evidence for urgent policy decisions",
        "Safety of newly approved medications",
        "Interventions for immediate public health concerns"
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="research-assistant-interface">
      <div class="research-header">
        <div class="research-icon">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <div class="research-title">
          <h2>Academic Research Assistant</h2>
          <p>Tools and guidance for academic research and paper writing</p>
        </div>
      </div>
      
      <div class="research-methods">
        <div class="section-header">
          <h3>Research Methodologies</h3>
          <p>Explore different approaches to academic research</p>
        </div>
        
        <div class="methods-tabs">
          <button class="method-tab active" data-method="quantitative">Quantitative</button>
          <button class="method-tab" data-method="qualitative">Qualitative</button>
          <button class="method-tab" data-method="mixed">Mixed Methods</button>
          <button class="method-tab" data-method="action">Action Research</button>
          <button class="method-tab" data-method="literature">Literature-Based</button>
        </div>
        
        <div class="method-content" id="method-content">
          <!-- Method content will be loaded here -->
        </div>
      </div>
      
      <div class="paper-structures">
        <div class="section-header">
          <h3>Paper Structure Templates</h3>
          <p>Frameworks for organizing different types of academic papers</p>
        </div>
        
        <div class="structure-tabs">
          <button class="structure-tab active" data-structure="empirical">Empirical Research</button>
          <button class="structure-tab" data-structure="literature">Literature Review</button>
          <button class="structure-tab" data-structure="theoretical">Theoretical Paper</button>
          <button class="structure-tab" data-structure="case">Case Study</button>
        </div>
        
        <div class="structure-content" id="structure-content">
          <!-- Structure content will be loaded here -->
        </div>
      </div>
      
      <div class="citation-guide">
        <div class="section-header">
          <h3>Citation Style Guide</h3>
          <p>Reference formatting for academic writing</p>
        </div>
        
        <div class="citation-tabs">
          <button class="citation-tab active" data-citation="apa">APA</button>
          <button class="citation-tab" data-citation="mla">MLA</button>
          <button class="citation-tab" data-citation="chicago">Chicago</button>
          <button class="citation-tab" data-citation="ieee">IEEE</button>
        </div>
        
        <div class="citation-content" id="citation-content">
          <!-- Citation content will be loaded here -->
        </div>
      </div>
      
      <div class="literature-review">
        <div class="section-header">
          <h3>Literature Review Types</h3>
          <p>Approaches to reviewing and synthesizing existing research</p>
        </div>
        
        <div class="review-types">
          <!-- Review types will be dynamically generated -->
        </div>
      </div>
      
      <div class="research-tools">
        <div class="section-header">
          <h3>Research Tools</h3>
          <p>Helpful tools for your academic research</p>
        </div>
        
        <div class="tools-container">
          <div class="tool-card" id="research-question-generator">
            <div class="tool-icon">
              <i class="fas fa-question-circle"></i>
            </div>
            <div class="tool-info">
              <h4>Research Question Generator</h4>
              <p>Develop clear, focused research questions</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="thesis-statement-helper">
            <div class="tool-icon">
              <i class="fas fa-pencil-alt"></i>
            </div>
            <div class="tool-info">
              <h4>Thesis Statement Helper</h4>
              <p>Craft strong, arguable thesis statements</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="literature-search-planner">
            <div class="tool-icon">
              <i class="fas fa-search"></i>
            </div>
            <div class="tool-info">
              <h4>Literature Search Planner</h4>
              <p>Plan systematic literature searches</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="academic-paraphraser">
            <div class="tool-icon">
              <i class="fas fa-sync-alt"></i>
            </div>
            <div class="tool-info">
              <h4>Academic Paraphraser</h4>
              <p>Paraphrase content while maintaining meaning</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .research-assistant-interface {
      background: linear-gradient(to bottom right, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(14, 165, 233, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .research-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .research-icon {
      font-size: 2.5rem;
      color: #0ea5e9;
      margin-right: 1rem;
    }
    
    .research-title h2 {
      color: #0ea5e9;
      margin-bottom: 0.3rem;
    }
    
    .research-title p {
      color: #94a3b8;
      font-size: 0.9rem;
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
    
    .research-methods, .paper-structures, .citation-guide, .literature-review, .research-tools {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Tabs Styling */
    .methods-tabs, .structure-tabs, .citation-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 0.75rem;
    }
    
    .method-tab, .structure-tab, .citation-tab {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .method-tab:hover, .structure-tab:hover, .citation-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .method-tab.active, .structure-tab.active, .citation-tab.active {
      background: rgba(14, 165, 233, 0.2);
      color: #0ea5e9;
    }
    
    /* Method Content */
    .method-content, .structure-content, .citation-content {
      color: #e2e8f0;
    }
    
    .method-description {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .method-types {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .method-type {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .method-name {
      color: #0ea5e9;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }
    
    .method-definition {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .method-examples {
      margin-bottom: 0.75rem;
    }
    
    .examples-title {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .examples-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .examples-list li {
      margin-bottom: 0.3rem;
    }
    
    .method-evaluation {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .strengths, .limitations {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 6px;
      padding: 0.75rem;
    }
    
    .eval-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }
    
    .strengths .eval-title {
      color: #4ade80;
    }
    
    .limitations .eval-title {
      color: #f87171;
    }
    
    .eval-list {
      list-style-type: disc;
      padding-left: the-list;
      color: #cbd5e1;
      font-size: 0.85rem;
    }
    
    .eval-list li {
      margin-bottom: 0.2rem;
    }
    
    /* Paper Structure Sections */
    .paper-section {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .section-title {
      color: #0ea5e9;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .section-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .guidelines-title {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .guidelines-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .guidelines-list li {
      margin-bottom: 0.3rem;
    }
    
    .examples-title {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .example-block {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 6px;
      padding: 0.75rem;
      color: #cbd5e1;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    /* Citation Guide */
    .citation-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    
    .citation-info {
      flex: 1;
    }
    
    .citation-name {
      color: #0ea5e9;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .citation-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      color: #94a3b8;
      font-size: 0.85rem;
    }
    
    .citation-examples {
      margin-top: 1rem;
    }
    
    .citation-intext, .citation-references {
      margin-bottom: 1.5rem;
    }
    
    .example-title {
      color: #0ea5e9;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
      padding-bottom: 0.5rem;
    }
    
    .intext-examples {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .intext-example {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 0.75rem;
    }
    
    .example-type {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }
    
    .example-content {
      color: #cbd5e1;
      font-size: 0.9rem;
      font-style: italic;
    }
    
    .reference-examples {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .reference-example {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 0.75rem;
    }
    
    .ref-type {
      color: #94a3b8;
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }
    
    .ref-format {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-style: italic;
    }
    
    .ref-example {
      color: #e2e8f0;
      font-size: 0.9rem;
      padding-left: 1rem;
      border-left: 2px solid #0ea5e9;
    }
    
    /* Literature Review Types */
    .review-types {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .review-type {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      height: 100%;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .review-type:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
    }
    
    .review-name {
      color: #0ea5e9;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .review-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .review-purpose {
      font-size: 0.9rem;
      color: #e2e8f0;
      margin-bottom: 0.75rem;
    }
    
    .review-purpose span {
      color: #94a3b8;
      font-size: 0.85rem;
    }
    
    /* Research Tools */
    .tools-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .tool-card {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .tool-card:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .tool-icon {
      background: rgba(14, 165, 233, 0.15);
      color: #0ea5e9;
      width: 3rem;
      height: 3rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }
    
    .tool-info {
      flex: 1;
    }
    
    .tool-info h4 {
      color: #e2e8f0;
      font-size: 0.95rem;
      margin-bottom: 0.3rem;
    }
    
    .tool-info p {
      color: #94a3b8;
      font-size: 0.85rem;
    }
    
    .tool-button {
      background: transparent;
      border: none;
      color: #0ea5e9;
      cursor: pointer;
      font-size: 1rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
    
    .tool-button:hover {
      background: rgba(14, 165, 233, 0.15);
    }
  `,
  
  // Current state
  currentState: {
    selectedMethod: 'quantitative',
    selectedStructure: 'empirical',
    selectedCitation: 'apa'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Academic Research Assistant Mode');
    
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
      chatInput.placeholder = "Ask for research guidance, citation help, or paper structuring...";
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
    
    // Populate the literature review types
    this.populateLiteratureReviewTypes(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize with default selections
    this.showMethodContent(container, this.currentState.selectedMethod);
    this.showStructureContent(container, this.currentState.selectedStructure);
    this.showCitationContent(container, this.currentState.selectedCitation);
  },
  
  // Populate the literature review types
  populateLiteratureReviewTypes: function(container) {
    const reviewTypesContainer = container.querySelector('.review-types');
    if (!reviewTypesContainer) return;
    
    // Clear existing content
    reviewTypesContainer.innerHTML = '';
    
    // Add review type cards
    this.literatureReviewTypes.forEach(reviewType => {
      const card = document.createElement('div');
      card.className = 'review-type';
      card.dataset.review = reviewType.name.toLowerCase().replace(/\s+/g, '-');
      
      card.innerHTML = `
        <div class="review-name">${reviewType.name}</div>
        <div class="review-description">${reviewType.description}</div>
        <div class="review-purpose"><span>Purpose:</span> ${reviewType.purpose}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showReviewTypeDetails(reviewType);
      });
      
      reviewTypesContainer.appendChild(card);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Method tabs
    const methodTabs = container.querySelectorAll('.method-tab');
    methodTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        methodTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected method
        const method = tab.dataset.method;
        this.showMethodContent(container, method);
      });
    });
    
    // Structure tabs
    const structureTabs = container.querySelectorAll('.structure-tab');
    structureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        structureTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected structure
        const structure = tab.dataset.structure;
        this.showStructureContent(container, structure);
      });
    });
    
    // Citation tabs
    const citationTabs = container.querySelectorAll('.citation-tab');
    citationTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        citationTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected citation
        const citation = tab.dataset.citation;
        this.showCitationContent(container, citation);
      });
    });
    
    // Research tools
    const researchQuestionGenerator = container.querySelector('#research-question-generator');
    if (researchQuestionGenerator) {
      researchQuestionGenerator.addEventListener('click', () => {
        this.openResearchQuestionGenerator();
      });
    }
    
    const thesisStatementHelper = container.querySelector('#thesis-statement-helper');
    if (thesisStatementHelper) {
      thesisStatementHelper.addEventListener('click', () => {
        this.openThesisStatementHelper();
      });
    }
    
    const literatureSearchPlanner = container.querySelector('#literature-search-planner');
    if (literatureSearchPlanner) {
      literatureSearchPlanner.addEventListener('click', () => {
        this.openLiteratureSearchPlanner();
      });
    }
    
    const academicParaphraser = container.querySelector('#academic-paraphraser');
    if (academicParaphraser) {
      academicParaphraser.addEventListener('click', () => {
        this.openAcademicParaphraser();
      });
    }
  },
  
  // Show method content
  showMethodContent: function(container, method) {
    // Update current state
    this.currentState.selectedMethod = method;
    
    const methodContent = container.querySelector('#method-content');
    if (!methodContent) return;
    
    // Find the methodology data
    const methodologyData = this.researchMethodologies.find(m => m.name.toLowerCase().includes(method));
    if (!methodologyData) return;
    
    // Build HTML for method content
    let html = `
      <div class="method-description">${methodologyData.description}</div>
      <div class="method-types">
    `;
    
    // Add each method type
    methodologyData.types.forEach(type => {
      html += `
        <div class="method-type">
          <div class="method-name">${type.name}</div>
          <div class="method-definition">${type.description}</div>
          
          <div class="method-examples">
            <div class="examples-title">Examples:</div>
            <ul class="examples-list">
              ${type.examples.map(example => `
                <li>${example}</li>
              `).join('')}
            </ul>
          </div>
          
          <div class="method-evaluation">
            <div class="strengths">
              <div class="eval-title">
                <i class="fas fa-plus-circle"></i> Strengths
              </div>
              <ul class="eval-list">
                ${type.strengths.map(strength => `
                  <li>${strength}</li>
                `).join('')}
              </ul>
            </div>
            
            <div class="limitations">
              <div class="eval-title">
                <i class="fas fa-minus-circle"></i> Limitations
              </div>
              <ul class="eval-list">
                ${type.limitations.map(limitation => `
                  <li>${limitation}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    methodContent.innerHTML = html;
  },
  
  // Show structure content
  showStructureContent: function(container, structure) {
    // Update current state
    this.currentState.selectedStructure = structure;
    
    const structureContent = container.querySelector('#structure-content');
    if (!structureContent) return;
    
    // Map structure identifiers to paper structure types
    const structureMap = {
      'empirical': 'Empirical Research Paper',
      'literature': 'Literature Review Paper',
      'theoretical': 'Theoretical Paper',
      'case': 'Case Study'
    };
    
    // Find the paper structure data
    const paperStructureData = this.paperStructures.find(s => s.type === structureMap[structure]);
    if (!paperStructureData) return;
    
    // Build HTML for structure content
    let html = `
      <div class="paper-description">${paperStructureData.description}</div>
    `;
    
    // Add sections
    paperStructureData.sections.forEach(section => {
      html += `
        <div class="paper-section">
          <div class="section-title">${section.name}</div>
          <div class="section-description">${section.description}</div>
          
          <div class="section-guidelines">
            <div class="guidelines-title">Guidelines:</div>
            <ul class="guidelines-list">
              ${section.guidelines.map(guideline => `
                <li>${guideline}</li>
              `).join('')}
            </ul>
          </div>
          
          <div class="section-examples">
            <div class="examples-title">Examples:</div>
            <div class="example-block">
              ${section.examples.map(example => `
                <p>${example}</p>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    });
    
    structureContent.innerHTML = html;
  },
  
  // Show citation content
  showCitationContent: function(container, citation) {
    // Update current state
    this.currentState.selectedCitation = citation;
    
    const citationContent = container.querySelector('#citation-content');
    if (!citationContent) return;
    
    // Find the citation style data
    const citationStyleData = this.citationStyles.find(c => c.name.toLowerCase().includes(citation));
    if (!citationStyleData) return;
    
    // Build HTML for citation content
    let html = `
      <div class="citation-header">
        <div class="citation-info">
          <div class="citation-name">${citationStyleData.name}</div>
          <div class="citation-meta">
            <div>Current Version: ${citationStyleData.currentVersion}</div>
            <div>Common Use: ${citationStyleData.commonUse}</div>
          </div>
        </div>
      </div>
    `;
    
    // Add special notes if they exist
    if (citationStyleData.notes) {
      html += `
        <div class="citation-notes">
          <p>${citationStyleData.notes}</p>
        </div>
      `;
    }
    
    // Add in-text citation examples
    html += `
      <div class="citation-examples">
        <div class="citation-intext">
          <div class="example-title">In-Text Citations</div>
          <div class="intext-examples">
    `;
    
    // Handle different citation styles differently
    if (citation === 'chicago') {
      // Chicago has two systems
      html += `
        <div class="intext-example">
          <div class="example-type">Notes and Bibliography (First Footnote)</div>
          <div class="example-content">${citationStyleData.inTextCitation.notesAndBibliography.firstFootnote}</div>
        </div>
        <div class="intext-example">
          <div class="example-type">Notes and Bibliography (Subsequent Footnote)</div>
          <div class="example-content">${citationStyleData.inTextCitation.notesAndBibliography.subsequentFootnote}</div>
        </div>
        <div class="intext-example">
          <div class="example-type">Notes and Bibliography (Bibliography)</div>
          <div class="example-content">${citationStyleData.inTextCitation.notesAndBibliography.bibliography}</div>
        </div>
        <div class="intext-example">
          <div class="example-type">Author-Date System</div>
          <div class="example-content">${citationStyleData.inTextCitation.authorDate.basic}</div>
        </div>
        <div class="intext-example">
          <div class="example-type">Author-Date (Reference List)</div>
          <div class="example-content">${citationStyleData.inTextCitation.authorDate.referenceList}</div>
        </div>
      `;
    } else {
      // Other citation styles
      Object.entries(citationStyleData.inTextCitation).forEach(([type, example]) => {
        html += `
          <div class="intext-example">
            <div class="example-type">${this.formatCitationType(type)}</div>
            <div class="example-content">${example}</div>
          </div>
        `;
      });
    }
    
    html += `
          </div>
        </div>
        
        <div class="citation-references">
          <div class="example-title">Reference Examples</div>
          <div class="reference-examples">
    `;
    
    // Add reference examples based on citation style
    if (citation === 'chicago') {
      // Chicago has different formats for each type
      citationStyleData.referenceExamples.forEach(ref => {
        html += `
          <div class="reference-example">
            <div class="ref-type">${ref.type}</div>
            <div class="ref-format">
              <strong>Footnote format:</strong> ${ref.format.footnote}
            </div>
            <div class="ref-format">
              <strong>Bibliography format:</strong> ${ref.format.bibliography}
            </div>
            <div class="ref-example">
              <p><strong>Footnote example:</strong> ${ref.example.footnote}</p>
              <p><strong>Bibliography example:</strong> ${ref.example.bibliography}</p>
            </div>
          </div>
        `;
      });
    } else {
      // Other citation styles
      citationStyleData.referenceExamples.forEach(ref => {
        html += `
          <div class="reference-example">
            <div class="ref-type">${ref.type}</div>
            <div class="ref-format">${ref.format}</div>
            <div class="ref-example">${ref.example}</div>
          </div>
        `;
      });
    }
    
    html += `
          </div>
        </div>
      </div>
    `;
    
    citationContent.innerHTML = html;
  },
  
  // Format citation type for display
  formatCitationType: function(type) {
    return type
      .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter
      .replace(/Intext/i, 'In-Text') // Fix specific terms
      .replace(/Multipleauthors/i, 'Multiple Authors')
      .replace(/Threeplusauthors/i, 'Three or More Authors')
      .replace(/Directquote/i, 'Direct Quote')
      .replace(/Noauthor/i, 'No Author')
      .replace(/Multipleworks/i, 'Multiple Works');
  },
  
  // Show review type details
  showReviewTypeDetails: function(reviewType) {
    // Generate a prompt for the AI about this review type
    const prompt = `Please provide a detailed guide about ${reviewType.name} as a literature review approach, including:

1. Detailed explanation of what a ${reviewType.name} is and its distinguishing features
2. Step-by-step methodology for conducting this type of review
3. Appropriate contexts and research questions for this approach
4. Examples of well-conducted ${reviewType.name}s in academic literature
5. Best practices and common pitfalls
6. Comparison with other review types (e.g., ${this.getOtherReviewTypes(reviewType.name)})

Please format your response with clear headings and include practical advice for researchers.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Get other review types for comparison
  getOtherReviewTypes: function(currentType) {
    // Get 2-3 other review types for comparison
    return this.literatureReviewTypes
      .filter(type => type.name !== currentType)
      .slice(0, 3)
      .map(type => type.name)
      .join(', ');
  },
  
  // Research Question Generator tool
  openResearchQuestionGenerator: function() {
    const prompt = `I'd like to use the Research Question Generator tool. Please help me develop strong, focused research questions by providing:

1. A step-by-step guide for creating effective research questions
2. Templates for different types of research questions (descriptive, comparative, relationship-based, etc.)
3. Examples of weak vs. strong research questions with explanations
4. Criteria for evaluating research question quality
5. Tips for narrowing broad topics into specific, researchable questions
6. Common pitfalls to avoid when formulating research questions

Please include examples across different disciplines (social sciences, natural sciences, humanities).`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Thesis Statement Helper tool
  openThesisStatementHelper: function() {
    const prompt = `I'd like to use the Thesis Statement Helper tool. Please provide:

1. A comprehensive guide to crafting effective thesis statements for academic papers
2. Examples of strong vs. weak thesis statements with analysis of what makes them effective or ineffective
3. Templates for different types of thesis statements (argumentative, analytical, expository)
4. Discipline-specific thesis statement approaches (humanities, sciences, social sciences)
5. Common problems in thesis statements and how to fix them
6. A step-by-step process for refining general ideas into specific, arguable thesis statements

Please include examples from various academic disciplines to illustrate your points.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Literature Search Planner tool
  openLiteratureSearchPlanner: function() {
    const prompt = `I'd like to use the Literature Search Planner tool. Please help me develop a comprehensive strategy for conducting an effective literature search by providing:

1. A step-by-step guide for planning and conducting a systematic literature search
2. Techniques for identifying key search terms, synonyms, and related concepts
3. Strategies for using Boolean operators and advanced search techniques
4. Recommendations for academic databases by discipline
5. Methods for tracking search strategies and managing search results
6. Approaches for determining inclusion/exclusion criteria
7. Tips for organizing and documenting the literature search process
8. Tools and software that can assist with literature searching and management

Please include examples that would be applicable across different academic disciplines.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Academic Paraphraser tool
  openAcademicParaphraser: function() {
    const prompt = `I'd like to use the Academic Paraphraser tool. Please provide:

1. A comprehensive guide on effective paraphrasing for academic writing
2. The distinction between paraphrasing, summarizing, and quoting
3. Step-by-step techniques for paraphrasing complex academic text
4. Examples of original texts with both poor paraphrases (potential plagiarism) and effective paraphrases
5. Common paraphrasing errors and how to avoid them
6. Discipline-specific paraphrasing considerations
7. Guidelines for maintaining academic integrity while paraphrasing
8. Tips for integrating paraphrased material into your own writing

Please include examples from different academic disciplines and complexity levels.`;
    
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
    AcademicResearchAssistantMode.init();
  } else {
    window.addEventListener('load', function() {
      AcademicResearchAssistantMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AcademicResearchAssistantMode;
} else {
  window.AcademicResearchAssistantMode = AcademicResearchAssistantMode;
}