/**
 * JAAT-AI Mode: Financial Advisor
 * 
 * Specialized mode for providing financial education, planning assistance,
 * and general financial guidance.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const FinancialAdvisorMode = {
  id: 'financial-advisor',
  name: 'Financial Advisor',
  icon: 'chart-line',
  description: 'Financial planning and investment guidance.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Financial Advisor mode, a knowledgeable financial education assistant who helps users understand financial concepts and develop financial plans.

Key characteristics:
1. You provide general financial education and explanations of financial concepts
2. You assist with basic budgeting, saving strategies, and financial goal-setting
3. You explain different investment vehicles and financial products
4. You discuss general financial planning considerations for different life stages
5. You help users understand financial terminology and jargon
6. You provide information about common financial strategies and approaches
7. You explain basic tax concepts and considerations

Important limitations to clearly convey:
1. You are not a licensed financial advisor and cannot provide personalized financial advice
2. Your information is for educational purposes only and not a substitute for professional financial counsel
3. You cannot make specific investment recommendations or predict market performance
4. You cannot provide tax advice or prepare tax documents

When discussing financial topics, always emphasize the importance of doing one's own research and consulting with qualified financial professionals for personalized advice. Acknowledge that financial decisions should be based on an individual's specific circumstances, goals, risk tolerance, and time horizon.`,

  // Initialize the mode
  init: function() {
    console.log('Initializing Financial Advisor Mode');
    return this;
  },
  
  // Custom methods for Financial Advisor mode
  methods: {
    /**
     * Create a basic budget template
     * @param {number} income - Monthly income
     * @param {Object} expenses - Major expense categories
     * @returns {Object} A budget plan
     */
    createBudgetPlan: function(income, expenses) {
      // This would integrate with the AI model in a real implementation
      return {
        income: income,
        expenses: expenses,
        recommendations: ["Budget recommendations would be provided by the AI model"],
        savingsGoals: ["Savings goals would be suggested by the AI model"]
      };
    },
    
    /**
     * Provide information about a financial concept
     * @param {string} concept - The financial concept to explain
     * @returns {Object} Information about the concept
     */
    explainFinancialConcept: function(concept) {
      // This would integrate with the AI model in a real implementation
      return {
        concept: concept,
        explanation: "Explanation would be provided by the AI model",
        examples: ["Examples would be provided by the AI model"],
        resources: ["Additional resources would be suggested by the AI model"]
      };
    },
    
    /**
     * Create a debt repayment strategy
     * @param {Object} debts - Information about outstanding debts
     * @param {number} disposableIncome - Available income for debt repayment
     * @returns {Object} A debt repayment strategy
     */
    createDebtRepaymentStrategy: function(debts, disposableIncome) {
      // This would integrate with the AI model in a real implementation
      return {
        debts: debts,
        disposableIncome: disposableIncome,
        strategy: "Debt repayment strategy would be provided by the AI model",
        timeline: "Estimated timeline would be calculated by the AI model",
        recommendations: ["Recommendations would be provided by the AI model"]
      };
    },
    
    /**
     * Provide information about retirement planning
     * @param {number} age - Current age
     * @param {number} retirementAge - Target retirement age
     * @param {number} currentSavings - Current retirement savings
     * @returns {Object} Retirement planning information
     */
    provideRetirementInfo: function(age, retirementAge, currentSavings) {
      // This would integrate with the AI model in a real implementation
      return {
        age: age,
        retirementAge: retirementAge,
        currentSavings: currentSavings,
        generalGuidelines: ["General retirement guidelines would be provided by the AI model"],
        considerations: ["Important considerations would be highlighted by the AI model"],
        resourceLinks: ["Resource links would be provided by the AI model"]
      };
    }
  }
};

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FinancialAdvisorMode;
} else {
  window.FinancialAdvisorMode = FinancialAdvisorMode;
}