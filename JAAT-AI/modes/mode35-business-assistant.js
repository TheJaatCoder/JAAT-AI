/**
 * JAAT-AI Mode: Business Assistant
 * 
 * Professional guidance for business operations, strategy development,
 * market analysis, and organizational growth.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const BusinessAssistantMode = {
  id: 'business-assistant',
  name: 'Business Assistant',
  icon: 'briefcase',
  description: 'Professional guidance for business strategy and operations.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Business Assistant mode, a professional advisor for business operations, strategy, and organizational development. You provide thoughtful guidance for entrepreneurs, managers, executives, and business professionals.

Key characteristics:
1. You offer practical, actionable advice on business strategy, operations, marketing, finance, and management
2. You adapt your guidance based on company size, industry, and business stage
3. You provide balanced perspectives on business challenges, considering various stakeholders
4. You can help develop strategic frameworks for decision-making and planning
5. You're familiar with modern business methodologies and best practices
6. You help analyze markets, competitive landscapes, and growth opportunities
7. You recognize that business decisions involve tradeoffs and there are rarely perfect solutions

When advising on business matters, provide well-structured, thoughtful responses that balance theoretical knowledge with practical implementation. Consider different contexts (startup vs. enterprise, B2B vs. B2C, local vs. global) and provide advice that's appropriate to the specific scenario.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "How can I create an effective business plan for my startup?",
    "What are the key elements of a competitive market analysis?",
    "How can I improve my company's operational efficiency?",
    "What pricing strategies should I consider for my new product?",
    "How do I develop a digital marketing strategy for my business?",
    "What's the best approach to secure funding for my business idea?",
    "How can I improve employee engagement and retention?",
    "What metrics should I focus on to evaluate business performance?",
    "How can I scale my small business while maintaining quality?",
    "What are effective strategies for managing organizational change?"
  ],
  
  // Business frameworks
  businessFrameworks: [
    {
      name: "SWOT Analysis",
      description: "A structured framework for evaluating Strengths, Weaknesses, Opportunities, and Threats",
      components: [
        {
          name: "Strengths",
          description: "Internal positive attributes and resources that support achieving objectives",
          questions: [
            "What does your company do well?",
            "What internal resources do you have?",
            "What do you do better than competitors?",
            "What unique or lowest-cost resources can you draw upon?",
            "What do others see as your strengths?"
          ]
        },
        {
          name: "Weaknesses",
          description: "Internal factors that work against achieving objectives",
          questions: [
            "What could you improve?",
            "Where do you have fewer resources than others?",
            "What are others likely to see as weaknesses?",
            "What processes or areas need enhancement?",
            "What are your resource limitations?"
          ]
        },
        {
          name: "Opportunities",
          description: "External factors that could positively impact growth or profitability",
          questions: [
            "What market trends could you benefit from?",
            "What technology changes create possibilities?",
            "What changes in policy or regulation would help?",
            "What local or global events could provide opportunities?",
            "Where are competitors failing to satisfy customers?"
          ]
        },
        {
          name: "Threats",
          description: "External factors that could negatively impact the business or project",
          questions: [
            "What obstacles do you face?",
            "What are competitors doing that could impact you?",
            "Are quality standards or specifications changing?",
            "Is changing technology threatening your position?",
            "What resource limitations might threaten your plans?"
          ]
        }
      ],
      usage: "Use SWOT analysis during strategic planning, before starting new initiatives, or when seeking to identify areas for improvement. The framework works best when approached honestly and with input from diverse stakeholders. After completing the analysis, look for ways to leverage strengths to capture opportunities and address weaknesses to minimize threats."
    },
    {
      name: "Porter's Five Forces",
      description: "Framework for analyzing competitive intensity and business strategy development",
      components: [
        {
          name: "Competitive Rivalry",
          description: "The intensity of competition among existing firms in the market",
          questions: [
            "How many competitors exist and how strong are they?",
            "How does your offering differ from competitors?",
            "What is the rate of industry growth affecting competition?",
            "How high are the barriers to exit the market?",
            "Are competitors pursuing aggressive growth strategies?"
          ]
        },
        {
          name: "Supplier Power",
          description: "The ability of suppliers to influence the terms and conditions of supply",
          questions: [
            "How many potential suppliers do you have?",
            "How unique or specialized are the suppliers' products?",
            "How costly would it be to switch suppliers?",
            "Could suppliers integrate forward into your business?",
            "How important is your business to your suppliers?"
          ]
        },
        {
          name: "Buyer Power",
          description: "The ability of customers to influence the terms and conditions of purchase",
          questions: [
            "How many customers do you have relative to suppliers?",
            "How easy is it for customers to switch to a competitor?",
            "How price-sensitive are your customers?",
            "How well-informed are customers about your competitors?",
            "Could your customers backward integrate and provide the product themselves?"
          ]
        },
        {
          name: "Threat of Substitution",
          description: "The availability of alternative products that customers might purchase instead",
          questions: [
            "What substitute products or services exist?",
            "How do the price and performance of substitutes compare?",
            "How easy is it for customers to switch to substitutes?",
            "Are substitutes becoming more attractive in price or performance?",
            "What trends might increase the threat of substitutes?"
          ]
        },
        {
          name: "Threat of New Entry",
          description: "The ease with which new competitors can enter the market",
          questions: [
            "How much capital is required to enter the market?",
            "What regulatory barriers protect existing companies?",
            "How important are economies of scale and learning curves?",
            "How strong are existing brand identities?",
            "How would existing firms respond to a new competitor?"
          ]
        }
      ],
      usage: "Porter's Five Forces is most valuable when evaluating the attractiveness of an industry, developing competitive strategy, or considering market entry/exit decisions. The framework helps identify where power lies in a business situation and assess the strength of a current or future competitive position. Use it to understand the balance of power in a business situation and identify areas where strategic changes could yield the greatest improvements."
    },
    {
      name: "Business Model Canvas",
      description: "A strategic management template for documenting business models",
      components: [
        {
          name: "Value Propositions",
          description: "The products and services that create value for specific customer segments",
          questions: [
            "What value do you deliver to customers?",
            "Which customer problems are you helping to solve?",
            "What bundles of products/services are you offering to each segment?",
            "Which customer needs are you satisfying?",
            "What is distinctive about your offering compared to competitors?"
          ]
        },
        {
          name: "Customer Segments",
          description: "The different groups of people or organizations the business aims to reach and serve",
          questions: [
            "For whom are you creating value?",
            "Who are your most important customers?",
            "How do customer segments differ in needs and behaviors?",
            "Are you focused on mass market, niche market, or segmented approaches?",
            "How are the segments prioritized?"
          ]
        },
        {
          name: "Channels",
          description: "How the company communicates with and reaches customer segments",
          questions: [
            "Through which channels do customers prefer to be reached?",
            "How do your channels integrate with customer routines?",
            "Which channels work best for awareness, evaluation, purchase, delivery, and after-sales?",
            "How are you integrating channels?",
            "Which channels are most cost-efficient?"
          ]
        },
        {
          name: "Customer Relationships",
          description: "The types of relationships established with specific customer segments",
          questions: [
            "What type of relationship does each customer segment expect?",
            "Which relationships have you established?",
            "How costly are they?",
            "How are they integrated with the rest of your business model?",
            "How do you balance automation with personal touch?"
          ]
        },
        {
          name: "Revenue Streams",
          description: "The cash generated from each customer segment",
          questions: [
            "For what value are customers truly willing to pay?",
            "What do they currently pay for and how?",
            "How would they prefer to pay?",
            "What is your pricing strategy and mechanism?",
            "How much does each revenue stream contribute to overall revenues?"
          ]
        },
        {
          name: "Key Resources",
          description: "The most important assets required to make the business model work",
          questions: [
            "What key resources do your value propositions require?",
            "What resources are needed for distribution channels?",
            "What resources are needed for customer relationships?",
            "What resources are needed for revenue streams?",
            "Are these physical, intellectual, human, or financial resources?"
          ]
        },
        {
          name: "Key Activities",
          description: "The most important things the company must do to make its business model work",
          questions: [
            "What key activities do your value propositions require?",
            "What activities are needed for distribution channels?",
            "What activities are needed for customer relationships?",
            "What activities are needed for revenue streams?",
            "Are these production, problem-solving, or platform/network activities?"
          ]
        },
        {
          name: "Key Partnerships",
          description: "The network of suppliers and partners that make the business model work",
          questions: [
            "Who are your key partners and suppliers?",
            "Which key resources are you acquiring from partners?",
            "Which key activities do partners perform?",
            "What strategic alliances have you formed?",
            "Are you optimizing operations, reducing risk, or acquiring resources through partnerships?"
          ]
        },
        {
          name: "Cost Structure",
          description: "All costs incurred to operate the business model",
          questions: [
            "What are the most important costs in your business model?",
            "Which key resources are most expensive?",
            "Which key activities are most expensive?",
            "Is your business more value-driven or cost-driven?",
            "How do you benefit from economies of scale or scope?"
          ]
        }
      ],
      usage: "The Business Model Canvas is most effective when developing a new business model, evaluating an existing one, or exploring strategic alternatives. Use it in workshop settings with diverse stakeholders, each contributing their perspective. The canvas provides a holistic view of the business, highlighting interdependencies and enabling the identification of inconsistencies or opportunities for innovation. Review and revise your canvas regularly as market conditions and company priorities change."
    },
    {
      name: "Balanced Scorecard",
      description: "Strategic planning and management system that aligns business activities with vision and strategy",
      components: [
        {
          name: "Financial Perspective",
          description: "How does the business look to shareholders?",
          questions: [
            "What financial goals are essential to our shareholders?",
            "How can we increase revenue and improve profitability?",
            "How can we best utilize our assets?",
            "How should we balance short-term results with long-term capabilities?",
            "What are the appropriate financial metrics and targets?"
          ],
          examples: [
            "Return on Investment (ROI)",
            "Operating Income",
            "Revenue Growth",
            "Cost Reduction",
            "Cash Flow"
          ]
        },
        {
          name: "Customer Perspective",
          description: "How does the business look to customers?",
          questions: [
            "Who are our target customers?",
            "What value proposition will satisfy our customers?",
            "How do we want customers to view us?",
            "What customer needs are we addressing?",
            "What customer-centered metrics should we track?"
          ],
          examples: [
            "Customer Satisfaction",
            "Customer Retention",
            "Market Share",
            "New Customer Acquisition",
            "Customer Profitability"
          ]
        },
        {
          name: "Internal Business Processes",
          description: "What business processes must we excel at?",
          questions: [
            "Which processes are most critical for delivering customer value?",
            "Which processes need improvement to reach financial goals?",
            "Where do we need operational excellence?",
            "How can we innovate our internal processes?",
            "What are the appropriate operational metrics?"
          ],
          examples: [
            "Process Efficiency",
            "Quality Metrics",
            "Cycle Time",
            "Productivity",
            "Innovation Pipeline"
          ]
        },
        {
          name: "Learning and Growth",
          description: "How will the organization improve and create value in the future?",
          questions: [
            "What skills and capabilities do our employees need?",
            "What technology infrastructure is required?",
            "What organizational culture do we need to cultivate?",
            "How can we foster innovation and continuous improvement?",
            "What measures indicate our ability to change and improve?"
          ],
          examples: [
            "Employee Engagement",
            "Skills Development",
            "Information System Capabilities",
            "Organizational Culture Metrics",
            "Employee Retention"
          ]
        }
      ],
      usage: "The Balanced Scorecard is most valuable when translating strategy into action and when need a comprehensive performance measurement system. Develop a strategy map showing cause-and-effect relationships between different objectives across the four perspectives. Limit the number of metrics to focus on what's truly important (3-5 per perspective). Ensure metrics are both leading (predictive) and lagging (outcome) indicators. Review the scorecard regularly and adjust as you learn what drives success in your specific context."
    },
    {
      name: "4Ps Marketing Mix",
      description: "Framework for defining marketing strategies around Product, Price, Place, and Promotion",
      components: [
        {
          name: "Product",
          description: "The goods and services offered to meet customer needs",
          questions: [
            "What features and benefits does your product or service offer?",
            "How does your product meet customer needs?",
            "What is the product lifecycle stage?",
            "How is your product branded and packaged?",
            "What differentiates your product from competitors?"
          ],
          strategies: [
            "Product line expansion",
            "Feature enhancement",
            "Quality improvement",
            "Branding and positioning",
            "Product lifecycle management"
          ]
        },
        {
          name: "Price",
          description: "The cost that customers pay for the product",
          questions: [
            "What is the perceived value of your product?",
            "How price-sensitive is your target market?",
            "How do your prices compare to competitors?",
            "What pricing strategy aligns with your positioning?",
            "What discounting approaches will you use?"
          ],
          strategies: [
            "Premium pricing",
            "Penetration pricing",
            "Economy pricing",
            "Price skimming",
            "Value-based pricing"
          ]
        },
        {
          name: "Place",
          description: "Where and how the product is sold to customers",
          questions: [
            "Where do target customers prefer to buy?",
            "What distribution channels should you use?",
            "Do you need partners, intermediaries, or direct sales?",
            "What inventory management approach will you use?",
            "How will logistics and supply chain support your distribution?"
          ],
          strategies: [
            "Intensive distribution",
            "Selective distribution",
            "Exclusive distribution",
            "Omnichannel approach",
            "Direct-to-consumer channels"
          ]
        },
        {
          name: "Promotion",
          description: "The methods used to communicate the product's value to customers",
          questions: [
            "What message do you want to communicate?",
            "Which communication channels reach your audience?",
            "What is your marketing communication budget?",
            "What promotional mix will be most effective?",
            "How will you measure promotion effectiveness?"
          ],
          strategies: [
            "Advertising",
            "Public relations",
            "Sales promotion",
            "Direct marketing",
            "Digital and social media marketing"
          ]
        }
      ],
      usage: "The 4Ps Marketing Mix is best used when developing a comprehensive marketing strategy or when launching a new product or service. Begin with a clear understanding of your target customer and positioning before defining each of the 4Ps. Ensure all four elements work together coherently to deliver a consistent message and customer experience. Review and adjust your marketing mix regularly based on market feedback, competitive activity, and changing customer preferences."
    }
  ],
  
  // Strategic planning templates
  strategicPlanning: [
    {
      name: "Vision Statement Template",
      description: "A concise declaration of what the organization aspires to become in the future",
      template: "In the next [timeframe], [Organization Name] will [aspirational goal that defines success] by [key differentiation/value]. We will be recognized as [desired reputation or leadership position] serving [target market/audience] with [key value proposition].",
      examples: [
        "Amazon (early): 'To be Earth's most customer-centric company, where customers can find and discover anything they might want to buy online.'",
        "Microsoft: 'To help people and businesses throughout the world realize their full potential.'",
        "Tesla: 'To accelerate the world's transition to sustainable energy.'"
      ],
      tips: [
        "Keep it concise (1-2 sentences) and easy to remember",
        "Make it aspirational but still achievable",
        "Focus on the future (typically 5-10 years ahead)",
        "Ensure it provides direction for decision-making",
        "Use language that inspires and motivates stakeholders"
      ]
    },
    {
      name: "Mission Statement Template",
      description: "A statement of the organization's purpose, defining why it exists and what it does",
      template: "[Organization Name] [exists to/provides/delivers] [primary products or services] for [target customers/market] by [how you do it] to [ultimate value or benefit provided].",
      examples: [
        "Patagonia: 'We're in business to save our home planet.'",
        "Southwest Airlines: 'Connect people to what's important in their lives through friendly, reliable, and low-cost air travel.'",
        "LinkedIn: 'Connect the world's professionals to make them more productive and successful.'"
      ],
      tips: [
        "Focus on the present – what you do now, not future aspirations",
        "Clearly articulate what you do and who you serve",
        "Express your unique approach or method",
        "Highlight the value or impact you create",
        "Keep it concise and actionable (typically 1-3 sentences)"
      ]
    },
    {
      name: "SMART Goals Framework",
      description: "A criteria system for setting effective goals that are Specific, Measurable, Achievable, Relevant, and Time-bound",
      template: "By [specific timeframe], [organization/team/individual] will [achievement/outcome] from [current state/baseline] to [target state] as measured by [specific metrics], supporting [strategic objective], which will be accomplished by [key actions/milestones].",
      examples: [
        "Increase customer retention rate from 75% to 85% by Q4 2023 as measured by monthly subscription renewals, supporting our strategic objective of sustainable growth, which will be accomplished by implementing a new customer success program and improving product onboarding.",
        "Reduce production costs by 12% within the next 18 months, from $2.50 to $2.20 per unit, as measured by quarterly cost analysis reports, supporting our strategic objective of operational efficiency, which will be accomplished by automating two key production steps and renegotiating supplier contracts.",
        "Launch 3 new product features by the end of Q2 2023, increasing user engagement by 25% as measured by daily active users and time spent in app, supporting our strategic objective of product differentiation, which will be accomplished by forming cross-functional feature teams and implementing bi-weekly development sprints."
      ],
      components: [
        {
          name: "Specific",
          description: "Clearly defines what is to be accomplished",
          questions: [
            "What exactly do we want to achieve?",
            "Who is involved or responsible?",
            "Why is this goal important?",
            "Which resources or constraints are involved?",
            "Where will this take place?"
          ]
        },
        {
          name: "Measurable",
          description: "Includes concrete criteria for measuring progress and success",
          questions: [
            "How much or how many?",
            "How will we know when the goal is accomplished?",
            "What are the key performance indicators?",
            "What is the current baseline?",
            "What tools or methods will track progress?"
          ]
        },
        {
          name: "Achievable",
          description: "Realistic and attainable given available resources and constraints",
          questions: [
            "Is this goal realistic given our resources?",
            "Do we have the necessary skills and capabilities?",
            "Have similar goals been achieved in similar contexts?",
            "What obstacles might we face and how will we address them?",
            "Is the goal challenging yet still possible?"
          ]
        },
        {
          name: "Relevant",
          description: "Aligned with broader objectives and worthwhile to pursue",
          questions: [
            "Does this goal align with our vision, mission, and values?",
            "Is this the right time to pursue this goal?",
            "Does this goal contribute to our strategic priorities?",
            "Is this goal worthwhile given other priorities?",
            "Is the right person/team responsible for this goal?"
          ]
        },
        {
          name: "Time-bound",
          description: "Has a defined start and end date or deadline",
          questions: [
            "When will this be accomplished?",
            "What is the deadline?",
            "What are the important milestones along the way?",
            "Is the timeframe realistic yet ambitious?",
            "What happens after the deadline?"
          ]
        }
      ],
      tips: [
        "Start with your strategic priorities and work backward to specific goals",
        "Involve those responsible for achieving the goals in the goal-setting process",
        "Limit the number of goals to maintain focus (3-5 major goals per period)",
        "Document both the goal and the plan to achieve it",
        "Review and adjust goals periodically as circumstances change"
      ]
    },
    {
      name: "Strategic Objectives Framework",
      description: "A structure for defining key strategic focus areas and objectives",
      template: [
        {
          section: "Executive Summary",
          content: "Brief overview of the strategic plan, key objectives, and expected outcomes."
        },
        {
          section: "Vision & Mission",
          content: "Organization's vision and mission statements that guide the strategic direction."
        },
        {
          section: "Core Values",
          content: "The fundamental beliefs and principles that guide behavior and decision-making."
        },
        {
          section: "Situation Analysis",
          content: "Assessment of the current state, including market analysis, competitive landscape, and SWOT analysis."
        },
        {
          section: "Strategic Priorities",
          content: "3-5 major focus areas or themes that will drive the organization forward."
        },
        {
          section: "Objectives",
          content: "SMART goals for each strategic priority, typically covering a 1-3 year horizon."
        },
        {
          section: "Key Performance Indicators (KPIs)",
          content: "Metrics that will be used to measure progress toward objectives."
        },
        {
          section: "Action Plans",
          content: "Specific initiatives, projects, or actions to achieve each objective, including timelines and responsibilities."
        },
        {
          section: "Resource Allocation",
          content: "Budget, staffing, and other resources required to execute the plan."
        },
        {
          section: "Risk Assessment",
          content: "Identification of potential risks and mitigation strategies."
        },
        {
          section: "Review Process",
          content: "Schedule and method for reviewing progress and updating the plan."
        }
      ],
      examples: [
        {
          priority: "Market Expansion",
          objectives: [
            "Enter two new geographical markets by Q4 2023",
            "Increase market share in existing markets from 15% to 20% by end of fiscal year",
            "Establish 3 new strategic partnerships to reach untapped customer segments by mid-2024"
          ]
        },
        {
          priority: "Operational Excellence",
          objectives: [
            "Reduce production costs by 10% within 12 months",
            "Decrease customer service response time from 24 hours to 6 hours by Q2 2023",
            "Implement new ERP system by end of fiscal year to improve data integration and reporting"
          ]
        },
        {
          priority: "Innovation & Product Development",
          objectives: [
            "Launch 2 new products addressing unmet customer needs by Q3 2023",
            "Increase R&D investment from 5% to 8% of revenue over the next 18 months",
            "Establish innovation lab and formalize ideation process by end of Q1 2023"
          ]
        }
      ],
      tips: [
        "Limit strategic priorities to 3-5 to maintain focus",
        "Ensure each objective has a clear owner accountable for its achievement",
        "Align departmental and individual goals with strategic objectives",
        "Communicate the plan broadly throughout the organization",
        "Schedule regular reviews to assess progress and make adjustments"
      ]
    },
    {
      name: "Go-to-Market Strategy Template",
      description: "A comprehensive plan for launching a product or service to target customers",
      template: [
        {
          section: "Market Analysis",
          elements: [
            "Target market size and growth rate",
            "Customer segments and personas",
            "Competitor analysis",
            "Market trends and opportunities",
            "Regulatory considerations"
          ]
        },
        {
          section: "Product Strategy",
          elements: [
            "Value proposition",
            "Product positioning",
            "Pricing strategy",
            "Product roadmap",
            "Competitive differentiation"
          ]
        },
        {
          section: "Marketing Strategy",
          elements: [
            "Brand positioning",
            "Key messaging and communication strategy",
            "Marketing channels and tactics",
            "Content strategy",
            "Budget allocation"
          ]
        },
        {
          section: "Sales Strategy",
          elements: [
            "Sales model (direct, indirect, hybrid)",
            "Sales process and methodology",
            "Channel strategy",
            "Sales enablement plan",
            "Sales targets and forecasts"
          ]
        },
        {
          section: "Customer Success Strategy",
          elements: [
            "Onboarding process",
            "Customer support model",
            "Retention and expansion strategies",
            "Customer feedback loops",
            "Success metrics"
          ]
        },
        {
          section: "Timeline and Milestones",
          elements: [
            "Pre-launch activities",
            "Launch phases",
            "Post-launch evaluations",
            "Scale-up timeline",
            "Key milestones and decision points"
          ]
        },
        {
          section: "Budget and Resources",
          elements: [
            "Marketing budget",
            "Sales resources",
            "Technology requirements",
            "External partnerships",
            "ROI projections"
          ]
        },
        {
          section: "Success Metrics",
          elements: [
            "Key performance indicators (KPIs)",
            "Revenue targets",
            "Market share goals",
            "Customer acquisition cost (CAC)",
            "Customer lifetime value (CLV)"
          ]
        }
      ],
      tips: [
        "Start with clear understanding of target customers and their needs",
        "Align go-to-market strategy with overall business objectives",
        "Ensure cross-functional alignment (product, marketing, sales, customer success)",
        "Build in feedback loops to quickly adapt based on market response",
        "Focus on measurement and adjust strategy based on results"
      ]
    }
  ],
  
  // Business plan sections
  businessPlanSections: [
    {
      name: "Executive Summary",
      description: "A concise overview of the entire business plan, highlighting key points",
      content: "Although this section appears first, it should be written last. It provides a snapshot of your business, including your mission statement, product/service overview, target market, competitive advantage, team highlights, financial projections, and funding requirements. Keep it clear, compelling, and under 2 pages.",
      tips: [
        "Include your unique value proposition and what sets you apart",
        "Highlight your growth potential and market opportunity",
        "Summarize key financial projections and milestones",
        "Make it enticing – this may be the only section some readers fully review",
        "Keep technical jargon to a minimum"
      ]
    },
    {
      name: "Company Description",
      description: "An overview of what your company does and what makes it unique",
      content: "This section provides background information about your company's founding, legal structure, history, and vision for the future. Describe your industry, the problem you're solving, and how your business addresses this need. Include your company's mission statement, goals, and core competencies.",
      tips: [
        "Clearly articulate your company's 'why' – the purpose behind your business",
        "Include information about your legal structure (LLC, corporation, etc.)",
        "Describe any significant milestones achieved to date",
        "Explain your business model and revenue streams",
        "Keep the tone professional but showcase your company's personality"
      ]
    },
    {
      name: "Market Analysis",
      description: "Research demonstrating an understanding of your industry, market, and competitors",
      content: "Provide a comprehensive overview of your industry, target market, and competitive landscape. Include market size, trends, growth rate, and customer demographics. Analyze major competitors, their strengths and weaknesses, and your competitive advantage. Use data and research to support your claims.",
      tips: [
        "Use credible industry reports and market research to support your analysis",
        "Segment your target market and provide detailed customer personas",
        "Analyze both direct and indirect competitors",
        "Identify market barriers to entry and how you'll overcome them",
        "Highlight market trends that create opportunities for your business"
      ]
    },
    {
      name: "Organization & Management",
      description: "Details about your company's structure and the people running it",
      content: "Outline your organizational structure and management team. Include bios highlighting relevant experience and qualifications of key team members. Describe your board of directors or advisors if applicable. Explain how ownership is distributed and detail any gaps in your team that need to be filled.",
      tips: [
        "Include an organizational chart showing reporting relationships",
        "Highlight relevant industry experience and achievements of team members",
        "Mention key advisors or board members who add credibility",
        "Address how you'll fill any critical skill gaps",
        "Include information about ownership structure and equity distribution"
      ]
    },
    {
      name: "Product or Service Line",
      description: "Detailed information about what you sell or provide to customers",
      content: "Describe your products or services in detail, highlighting features, benefits, and unique selling propositions. Explain your product lifecycle, intellectual property status, and research and development activities. Emphasize how your offerings solve customer problems or fulfill needs better than alternatives.",
      tips: [
        "Focus on benefits to customers, not just features",
        "Include pricing strategy and how it compares to competitors",
        "Explain your product development process and roadmap",
        "Detail any intellectual property (patents, trademarks, copyrights)",
        "Include visuals, diagrams, or prototypes if applicable"
      ]
    },
    {
      name: "Marketing & Sales Strategy",
      description: "Your plan for attracting and converting customers",
      content: "Outline how you'll position, promote, price, and sell your products or services. Describe your marketing channels, sales process, and customer acquisition strategy. Include details on branding, advertising, PR, digital marketing, and sales team structure. Set clear, measurable goals for your marketing and sales efforts.",
      tips: [
        "Align your marketing strategy with specific customer personas",
        "Explain how you'll generate leads and convert them to customers",
        "Include specific marketing channels and tactics with estimated costs",
        "Detail your sales process, cycle, and team structure",
        "Describe partnerships or distribution channels if relevant"
      ]
    },
    {
      name: "Financial Projections",
      description: "Forecasts of your business's financial performance",
      content: "Provide detailed financial forecasts including income statements, balance sheets, cash flow statements, and break-even analysis for at least 3-5 years. Include assumptions behind your projections, key metrics (CAC, LTV, etc.), and funding requirements. Be realistic while demonstrating growth potential and path to profitability.",
      tips: [
        "Include monthly projections for year 1, quarterly for year 2, and annual thereafter",
        "Clearly state all assumptions underlying your projections",
        "Include different scenarios (best case, expected case, worst case)",
        "Make sure numbers align with your marketing and operational plans",
        "Add visual charts to highlight key financial trends and metrics"
      ]
    },
    {
      name: "Funding Request",
      description: "Details about how much funding you need and how you'll use it",
      content: "If seeking funding, clearly state how much capital you need, what it will be used for, and over what time period. Explain your preferred funding type (debt, equity, convertible note, etc.) and terms. Outline your future financial plans, exit strategy for investors, and how additional funding will help achieve milestones.",
      tips: [
        "Be specific about funding amount and timing of capital needs",
        "Break down how funds will be allocated across departments/initiatives",
        "Link funding to specific milestones and outcomes",
        "Include information about previous funding rounds if applicable",
        "Explain your strategy for providing investor returns (ROI)"
      ]
    },
    {
      name: "Appendix",
      description: "Supporting documents and additional information",
      content: "Include any additional documents that support your business plan, such as detailed market research, product specifications, team resumes, legal documents, permits, patents, letters of reference, facility details, and any other relevant information that strengthens your plan but would disrupt the flow if included in the main document.",
      tips: [
        "Only include genuinely useful supplementary information",
        "Organize with clear headings and references from the main document",
        "Include detailed resumes of key team members",
        "Add product images, diagrams, or prototypes",
        "Include letters of intent from customers or strategic partners if available"
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="business-assistant-interface">
      <div class="business-header">
        <div class="business-icon">
          <i class="fas fa-briefcase"></i>
        </div>
        <div class="business-title">
          <h2>Business Assistant</h2>
          <p>Professional guidance for business strategy and operations</p>
        </div>
      </div>
      
      <div class="frameworks-section">
        <div class="section-header">
          <h3>Business Frameworks</h3>
          <p>Essential frameworks for business analysis and strategy development</p>
        </div>
        
        <div class="framework-list">
          <!-- Frameworks will be dynamically generated -->
        </div>
      </div>
      
      <div class="templates-section">
        <div class="section-header">
          <h3>Strategic Planning Templates</h3>
          <p>Templates and frameworks for developing key strategic documents</p>
        </div>
        
        <div class="template-accordion" id="template-accordion">
          <!-- Templates will be dynamically generated -->
        </div>
      </div>
      
      <div class="business-plan-section">
        <div class="section-header">
          <h3>Business Plan Framework</h3>
          <p>Comprehensive guide to creating an effective business plan</p>
        </div>
        
        <div class="plan-sections">
          <!-- Business plan sections will be dynamically generated -->
        </div>
      </div>
      
      <div class="business-assist">
        <div class="section-header">
          <h3>Business Assistance</h3>
          <p>Get specialized guidance for your business challenges</p>
        </div>
        
        <div class="assistance-options">
          <button class="assist-option" data-type="marketing">
            <i class="fas fa-bullhorn"></i>
            <span>Marketing Strategy</span>
          </button>
          
          <button class="assist-option" data-type="finance">
            <i class="fas fa-chart-line"></i>
            <span>Financial Planning</span>
          </button>
          
          <button class="assist-option" data-type="operations">
            <i class="fas fa-cogs"></i>
            <span>Operations Management</span>
          </button>
          
          <button class="assist-option" data-type="startup">
            <i class="fas fa-rocket"></i>
            <span>Startup Growth</span>
          </button>
          
          <button class="assist-option" data-type="leadership">
            <i class="fas fa-users"></i>
            <span>Leadership & Management</span>
          </button>
          
          <button class="assist-option" data-type="market">
            <i class="fas fa-search"></i>
            <span>Market Analysis</span>
          </button>
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .business-assistant-interface {
      background: linear-gradient(to bottom right, rgba(30, 64, 175, 0.1), rgba(17, 24, 39, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(30, 64, 175, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .business-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .business-icon {
      font-size: 2.5rem;
      color: #1e40af;
      margin-right: 1rem;
    }
    
    .business-title h2 {
      color: #1e40af;
      margin-bottom: 0.3rem;
    }
    
    .business-title p {
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
    
    .frameworks-section, .templates-section, .business-plan-section, .business-assist {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Frameworks */
    .framework-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .framework-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .framework-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(30, 64, 175, 0.3);
    }
    
    .framework-title {
      color: #1e40af;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .framework-description {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    /* Template Accordion */
    .template-accordion {
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
      color: #1e40af;
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
    
    .template-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .template-section {
      margin-bottom: 1rem;
    }
    
    .template-section-title {
      color: #1e40af;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .template-section-content {
      color: #e2e8f0;
      font-size: 0.9rem;
      background: rgba(30, 41, 59, 0.5);
      padding: 0.75rem;
      border-radius: 6px;
    }
    
    .template-tips {
      margin-top: 1rem;
    }
    
    .tips-title {
      color: #f3f4f6;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
    }
    
    .tips-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .tip-item {
      padding-left: 1.5rem;
      position: relative;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .tip-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #1e40af;
    }
    
    /* Business Plan Sections */
    .plan-sections {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .plan-section {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .plan-section:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .plan-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .plan-section-title {
      color: #1e40af;
      font-size: 1.05rem;
      font-weight: 500;
    }
    
    .plan-section-description {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    .plan-section-content {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-top: 0.75rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(71, 85, 105, 0.3);
      display: none;
    }
    
    .plan-section.active .plan-section-content {
      display: block;
    }
    
    /* Assistance Options */
    .assistance-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    
    .assist-option {
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
    
    .assist-option:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(30, 64, 175, 0.3);
    }
    
    .assist-option i {
      font-size: 1.75rem;
      color: #1e40af;
    }
    
    .assist-option span {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
  `,
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Business Assistant Mode');
    
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
      chatInput.placeholder = "Ask about business strategy, operations, marketing, finance...";
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
    
    // Populate business frameworks
    this.populateFrameworks(container);
    
    // Populate strategic planning templates
    this.populateTemplates(container);
    
    // Populate business plan sections
    this.populateBusinessPlanSections(container);
    
    // Add event listeners
    this.addEventListeners(container);
  },
  
  // Populate business frameworks
  populateFrameworks: function(container) {
    const frameworkList = container.querySelector('.framework-list');
    if (!frameworkList) return;
    
    // Clear existing content
    frameworkList.innerHTML = '';
    
    // Add framework cards
    this.businessFrameworks.forEach(framework => {
      const card = document.createElement('div');
      card.className = 'framework-card';
      card.dataset.framework = framework.name.toLowerCase().replace(/\s+/g, '-');
      
      card.innerHTML = `
        <div class="framework-title">${framework.name}</div>
        <div class="framework-description">${framework.description}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showFrameworkDetails(framework);
      });
      
      frameworkList.appendChild(card);
    });
  },
  
  // Populate strategic planning templates
  populateTemplates: function(container) {
    const templateAccordion = container.querySelector('#template-accordion');
    if (!templateAccordion) return;
    
    // Clear existing content
    templateAccordion.innerHTML = '';
    
    // Add template accordions
    this.strategicPlanning.forEach(template => {
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
      
      // Add description
      let contentHtml = `<div class="template-description">${template.description}</div>`;
      
      // Handle different template types
      if (template.template && typeof template.template === 'string') {
        // Templates with single string template
        contentHtml += `
          <div class="template-section">
            <div class="template-section-title">Template Format</div>
            <div class="template-section-content">${template.template}</div>
          </div>
        `;
      } else if (template.template && Array.isArray(template.template)) {
        // Templates with section arrays
        contentHtml += `
          <div class="template-section">
            <div class="template-section-title">Template Sections</div>
        `;
        
        template.template.forEach(section => {
          contentHtml += `
            <div class="template-section-item">
              <div class="section-item-title"><strong>${section.section}:</strong></div>
              <div class="section-item-content">${section.content}</div>
            </div>
          `;
        });
        
        contentHtml += `</div>`;
      }
      
      // Add examples
      if (template.examples) {
        contentHtml += `
          <div class="template-section">
            <div class="template-section-title">Examples</div>
            <div class="template-section-content">
        `;
        
        if (Array.isArray(template.examples)) {
          if (typeof template.examples[0] === 'string') {
            // Simple string examples
            contentHtml += template.examples.join('<br><br>');
          } else {
            // Complex examples
            template.examples.forEach(example => {
              if (example.priority) {
                contentHtml += `<strong>${example.priority}:</strong><br>`;
                contentHtml += `<ul>`;
                example.objectives.forEach(objective => {
                  contentHtml += `<li>${objective}</li>`;
                });
                contentHtml += `</ul><br>`;
              }
            });
          }
        }
        
        contentHtml += `</div></div>`;
      }
      
      // Add components if they exist
      if (template.components) {
        contentHtml += `
          <div class="template-section">
            <div class="template-section-title">Components</div>
        `;
        
        template.components.forEach(component => {
          contentHtml += `
            <div class="component-item">
              <div class="component-title"><strong>${component.name}:</strong> ${component.description}</div>
          `;
          
          if (component.questions) {
            contentHtml += `<ul class="component-questions">`;
            component.questions.forEach(question => {
              contentHtml += `<li>${question}</li>`;
            });
            contentHtml += `</ul>`;
          }
          
          contentHtml += `</div><br>`;
        });
        
        contentHtml += `</div>`;
      }
      
      // Add tips
      if (template.tips) {
        contentHtml += `
          <div class="template-tips">
            <div class="tips-title">Tips for Success</div>
            <ul class="tips-list">
        `;
        
        template.tips.forEach(tip => {
          contentHtml += `<li class="tip-item">${tip}</li>`;
        });
        
        contentHtml += `</ul></div>`;
      }
      
      content.innerHTML = contentHtml;
      
      // Add event listener to toggle
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        content.classList.toggle('active');
      });
      
      // Add to accordion
      accordionItem.appendChild(header);
      accordionItem.appendChild(content);
      templateAccordion.appendChild(accordionItem);
    });
  },
  
  // Populate business plan sections
  populateBusinessPlanSections: function(container) {
    const planSections = container.querySelector('.plan-sections');
    if (!planSections) return;
    
    // Clear existing content
    planSections.innerHTML = '';
    
    // Add plan sections
    this.businessPlanSections.forEach(section => {
      const sectionElement = document.createElement('div');
      sectionElement.className = 'plan-section';
      
      sectionElement.innerHTML = `
        <div class="plan-section-header">
          <div class="plan-section-title">${section.name}</div>
          <div class="plan-section-description">${section.description}</div>
        </div>
        <div class="plan-section-content">
          <div class="section-content">${section.content}</div>
          <div class="template-tips">
            <div class="tips-title">Tips</div>
            <ul class="tips-list">
              ${section.tips.map(tip => `<li class="tip-item">${tip}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
      
      // Add event listener to toggle content
      sectionElement.addEventListener('click', function() {
        this.classList.toggle('active');
      });
      
      planSections.appendChild(sectionElement);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Assistance option buttons
    const assistanceOptions = container.querySelectorAll('.assist-option');
    assistanceOptions.forEach(option => {
      option.addEventListener('click', () => {
        const assistType = option.dataset.type;
        this.showAssistancePrompt(assistType);
      });
    });
  },
  
  // Show framework details
  showFrameworkDetails: function(framework) {
    // Create a detailed prompt about the framework
    let prompt = `Please provide a detailed guide for applying the ${framework.name} framework in a business context.

Include:
1. Comprehensive explanation of the ${framework.name} framework
2. Step-by-step process for applying the framework
3. Example of the framework applied to a real business case
4. Templates or worksheets that can be used for implementation
5. Common pitfalls and how to avoid them

`;

    // Add specific components based on the framework
    framework.components.forEach(component => {
      prompt += `For the "${component.name}" component, include specific guidance on:
- ${component.description}
- Key questions to address: ${component.questions.join(', ')}

`;
    });

    prompt += `Also explain when and how to best use this framework: ${framework.usage}`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show assistance prompt
  showAssistancePrompt: function(assistType) {
    let prompt;
    
    switch (assistType) {
      case 'marketing':
        prompt = `I need help developing a comprehensive marketing strategy for my business. Please provide guidance on:

1. How to conduct effective market research and segmentation
2. Developing a compelling value proposition and brand positioning
3. Choosing the most effective marketing channels and tactics
4. Creating a content marketing plan that resonates with my target audience
5. Setting appropriate marketing KPIs and measuring ROI
6. Allocating a marketing budget efficiently

Please include specific frameworks, templates, or methodologies I can use, and provide examples where possible.`;
        break;
        
      case 'finance':
        prompt = `I need help with financial planning and management for my business. Please provide guidance on:

1. Creating accurate financial forecasts and projections
2. Managing cash flow effectively
3. Understanding key financial statements and metrics
4. Establishing proper financial controls and procedures
5. Optimizing pricing strategy to maximize profitability
6. Identifying and securing appropriate funding options

Please include specific financial planning tools, templates, or methodologies I can use, and explain financial concepts in clear terms.`;
        break;
        
      case 'operations':
        prompt = `I need help improving my business operations and processes. Please provide guidance on:

1. Identifying operational inefficiencies and bottlenecks
2. Implementing process improvement methodologies (Lean, Six Sigma, etc.)
3. Optimizing supply chain and inventory management
4. Developing standard operating procedures (SOPs)
5. Selecting and implementing appropriate technology and tools
6. Building quality control systems and metrics

Please include specific frameworks, templates, or methodologies I can use for operational excellence, and provide examples of successful implementations.`;
        break;
        
      case 'startup':
        prompt = `I'm working on a startup and need guidance on growth strategies. Please provide advice on:

1. Validating my business idea and product-market fit
2. Developing a minimum viable product (MVP) and iterating based on feedback
3. Implementing growth hacking techniques to acquire customers cost-effectively
4. Scaling operations while maintaining quality and culture
5. Securing funding and managing investor relationships
6. Building the right team and organizational structure for different growth stages

Please include specific startup methodologies, frameworks, or resources I can use, and provide examples of successful startup growth stories.`;
        break;
        
      case 'leadership':
        prompt = `I need help improving my leadership and management skills. Please provide guidance on:

1. Developing an effective leadership style and philosophy
2. Building and leading high-performing teams
3. Creating and communicating a compelling vision and strategy
4. Managing change and overcoming resistance
5. Developing emotional intelligence and interpersonal skills
6. Implementing effective performance management and feedback systems

Please include specific leadership frameworks, methodologies, or techniques I can apply, and provide examples of successful leadership approaches in different contexts.`;
        break;
        
      case 'market':
        prompt = `I need help conducting a comprehensive market analysis for my business. Please provide guidance on:

1. Analyzing industry trends, size, and growth potential
2. Identifying and segmenting target customers effectively
3. Conducting competitive analysis and positioning
4. Identifying market opportunities and threats
5. Evaluating market entry strategies
6. Using market research methods and tools (qualitative and quantitative)

Please include specific frameworks, templates, or methodologies for market analysis, and provide examples of how to present findings effectively.`;
        break;
        
      default:
        prompt = `I need business assistance with general strategy and planning. Please provide guidance on:

1. Developing a clear vision, mission, and strategic objectives
2. Conducting a comprehensive business analysis (internal and external)
3. Creating actionable strategic plans with measurable goals
4. Aligning resources and capabilities with strategic priorities
5. Implementing and executing strategy effectively
6. Monitoring progress and adjusting plans as needed

Please include specific strategic frameworks, templates, or methodologies I can use, and provide examples where possible.`;
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
    BusinessAssistantMode.init();
  } else {
    window.addEventListener('load', function() {
      BusinessAssistantMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BusinessAssistantMode;
} else {
  window.BusinessAssistantMode = BusinessAssistantMode;
}