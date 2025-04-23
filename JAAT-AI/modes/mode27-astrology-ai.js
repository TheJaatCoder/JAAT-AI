/**
 * JAAT-AI Professional Mode: Astrology AI
 * Version: 1.0.0
 * Author: JAAT-AI Professional Development Team
 * 
 * A comprehensive astrological analysis and prediction system
 * that provides detailed horoscopes, compatibility analysis,
 * and personalized astrological insights.
 */

class AstrologyAI {
  constructor() {
    // Core system properties
    this.version = "1.0.0";
    this.initialized = false;
    
    // Astrological data
    this.zodiacSigns = this.initializeZodiacSigns();
    this.planets = this.initializePlanets();
    this.houses = this.initializeHouses();
    this.aspects = this.initializeAspects();
    
    // User data
    this.userProfiles = [];
    this.currentUserProfile = null;
    
    // Chart calculations
    this.ephemerisData = {};
    this.currentChart = null;
    
    // Interpretation systems
    this.signInterpretations = {};
    this.houseInterpretations = {};
    this.planetaryInterpretations = {};
    this.aspectInterpretations = {};
    this.transitInterpretations = {};
    
    // Compatibility matrices
    this.elementCompatibility = {};
    this.signCompatibility = {};
    this.aspectCompatibility = {};
    
    // Prediction systems
    this.transitPredictions = {};
    this.progressionMethods = {};
    
    // Specialized modules
    this.karmicAstrology = {};
    this.financialAstrology = {};
    this.medicalAstrology = {};
    this.electionalAstrology = {};
    
    // System settings
    this.precisionLevel = "high"; // low, medium, high
    this.interpretationStyle = "modern"; // traditional, modern, psychological
    this.calculationMethod = "swiss_ephemeris"; // swiss_ephemeris, nasa_jpl, simplified
    this.houseSystem = "placidus"; // placidus, koch, whole_sign, equal_house, etc.
    this.coordinateSystem = "geocentric"; // geocentric, heliocentric
    this.zodiacSystem = "tropical"; // tropical, sidereal
    
    // Advanced settings
    this.includeAsteroids = false;
    this.includeLunarNodes = true;
    this.includeArabicParts = false;
    this.includeFixedStars = false;
    this.correctForPrecession = true;
    this.applyParallaxCorrection = false;
    this.useExactAspects = true;
    this.aspectOrbLimits = {
      conjunction: 8,
      opposition: 8,
      trine: 6,
      square: 6,
      sextile: 4,
      quincunx: 3,
      semisextile: 2,
      semisquare: 2,
      sesquiquadrate: 2
    };
  }
  /**
   * Initialize the system with default configurations
   * @param {Object} options - Custom initialization options
   * @returns {Boolean} - Success status
   */
  async initialize(options = {}) {
    try {
      console.log("Initializing Astrology AI Professional Mode...");
      
      // Apply custom options
      if (options.precisionLevel) this.precisionLevel = options.precisionLevel;
      if (options.interpretationStyle) this.interpretationStyle = options.interpretationStyle;
      if (options.calculationMethod) this.calculationMethod = options.calculationMethod;
      if (options.houseSystem) this.houseSystem = options.houseSystem;
      if (options.coordinateSystem) this.coordinateSystem = options.coordinateSystem;
      if (options.zodiacSystem) this.zodiacSystem = options.zodiacSystem;
      
      // Advanced settings
      if (options.includeAsteroids !== undefined) this.includeAsteroids = options.includeAsteroids;
      if (options.includeLunarNodes !== undefined) this.includeLunarNodes = options.includeLunarNodes;
      if (options.includeArabicParts !== undefined) this.includeArabicParts = options.includeArabicParts;
      if (options.includeFixedStars !== undefined) this.includeFixedStars = options.includeFixedStars;
      if (options.correctForPrecession !== undefined) this.correctForPrecession = options.correctForPrecession;
      if (options.applyParallaxCorrection !== undefined) this.applyParallaxCorrection = options.applyParallaxCorrection;
      if (options.useExactAspects !== undefined) this.useExactAspects = options.useExactAspects;
      if (options.aspectOrbLimits) this.aspectOrbLimits = {...this.aspectOrbLimits, ...options.aspectOrbLimits};
      
      // Load data sources
      await this.loadEphemerisData();
      await this.loadInterpretations();
      await this.loadCompatibilityMatrices();
      await this.loadPredictionSystems();
      await this.loadSpecializedModules();
      
      // Initialize UI components
      this.initializeUI();
      
      // Set up event listeners
      this.setupEventListeners();
      
      this.initialized = true;
      console.log("Astrology AI Professional Mode initialized successfully.");
      return true;
    } catch (error) {
      console.error("Failed to initialize Astrology AI:", error);
      return false;
    }
  }
  
  /**
   * Initialize zodiac signs data
   * @returns {Object} - Zodiac signs data
   */
  initializeZodiacSigns() {
    return {
      aries: {
        name: "Aries",
        symbol: "♈",
        element: "fire",
        quality: "cardinal",
        ruler: "Mars",
        dateRange: {start: {month: 3, day: 21}, end: {month: 4, day: 19}},
        traits: ["courageous", "determined", "confident", "enthusiastic", "optimistic", "impulsive", "impatient"],
        strengths: ["leadership", "courage", "enthusiasm", "energy", "pioneering", "directness"],
        weaknesses: ["impatience", "moodiness", "short-tempered", "impulsiveness", "aggression"],
        compatibility: {
          high: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
          medium: ["Libra", "Cancer", "Scorpio", "Pisces"],
          low: ["Taurus", "Virgo", "Capricorn"]
        },
        careers: ["management", "entrepreneurship", "military", "sports", "police", "firefighting"],
        colors: ["red", "carmine", "orange"],
        luckyNumbers: [1, 9, 17, 23, 45],
        luckyDays: ["Tuesday", "Saturday"],
        bodyParts: ["head", "face", "brain"],
        health: {
          strengths: ["quick recovery", "resilience", "endurance"],
          weaknesses: ["headaches", "migraines", "facial injuries", "hypertension", "stress-related disorders"]
        }
      },
      taurus: {
        name: "Taurus",
        symbol: "♉",
        element: "earth",
        quality: "fixed",
        ruler: "Venus",
        dateRange: {start: {month: 4, day: 20}, end: {month: 5, day: 20}},
        traits: ["reliable", "patient", "practical", "devoted", "responsible", "stubborn", "possessive"],
        strengths: ["dependability", "persistence", "patience", "practicality", "determination", "sensuality"],
        weaknesses: ["stubbornness", "possessiveness", "inflexibility", "self-indulgence", "materialism"],
        compatibility: {
          high: ["Virgo", "Capricorn", "Cancer", "Pisces"],
          medium: ["Scorpio", "Leo", "Libra", "Aries"],
          low: ["Gemini", "Sagittarius", "Aquarius"]
        },
        careers: ["finance", "banking", "agriculture", "culinary arts", "architecture", "real estate"],
        colors: ["green", "pink", "turquoise"],
        luckyNumbers: [2, 6, 15, 24, 42],
        luckyDays: ["Friday", "Monday"],
        bodyParts: ["neck", "throat", "thyroid gland"],
        health: {
          strengths: ["strong constitution", "endurance", "resistance to illness"],
          weaknesses: ["throat issues", "thyroid problems", "stiff neck", "obesity", "diabetes"]
        }
      },
      // Additional signs will be implemented in the same format
      gemini: {
        name: "Gemini",
        symbol: "♊",
        element: "air",
        quality: "mutable",
        ruler: "Mercury",
        dateRange: {start: {month: 5, day: 21}, end: {month: 6, day: 20}},
        traits: ["adaptable", "versatile", "curious", "communicative", "witty", "nervous", "inconsistent"],
        strengths: ["communication", "adaptability", "versatility", "intelligence", "curiosity", "sociability"],
        weaknesses: ["nervousness", "inconsistency", "indecisiveness", "superficiality", "restlessness"],
        compatibility: {
          high: ["Libra", "Aquarius", "Aries", "Leo"],
          medium: ["Sagittarius", "Taurus", "Cancer", "Virgo"],
          low: ["Scorpio", "Capricorn", "Pisces"]
        },
        careers: ["journalism", "teaching", "writing", "media", "sales", "public relations"],
        colors: ["yellow", "light blue", "silver"],
        luckyNumbers: [3, 5, 12, 23, 36],
        luckyDays: ["Wednesday", "Sunday"],
        bodyParts: ["arms", "shoulders", "lungs", "nervous system"],
        health: {
          strengths: ["agility", "quick reflexes", "respiratory capacity"],
          weaknesses: ["respiratory issues", "nervous disorders", "stress-related conditions"]
        }
      },
      cancer: {
        name: "Cancer",
        symbol: "♋",
        element: "water",
        quality: "cardinal",
        ruler: "Moon",
        dateRange: {start: {month: 6, day: 21}, end: {month: 7, day: 22}},
        traits: ["emotional", "intuitive", "nurturing", "protective", "sensitive", "moody", "clingy"],
        strengths: ["emotional intelligence", "intuition", "nurturing", "tenacity", "creativity", "loyalty"],
        weaknesses: ["moodiness", "emotional dependency", "hypersensitivity", "manipulation", "insecurity"],
        compatibility: {
          high: ["Scorpio", "Pisces", "Taurus", "Virgo"],
          medium: ["Capricorn", "Gemini", "Libra", "Aries"],
          low: ["Leo", "Sagittarius", "Aquarius"]
        },
        careers: ["healthcare", "social work", "childcare", "counseling", "hospitality", "real estate"],
        colors: ["silver", "white", "pale blue"],
        luckyNumbers: [2, 7, 11, 16, 20],
        luckyDays: ["Monday", "Thursday"],
        bodyParts: ["chest", "breasts", "stomach", "digestive system"],
        health: {
          strengths: ["strong immune system", "good digestion", "emotional healing"],
          weaknesses: ["digestive issues", "stomach problems", "fluid retention", "emotional health issues"]
        }
      },
      leo: {
        name: "Leo",
        symbol: "♌",
        element: "fire",
        quality: "fixed",
        ruler: "Sun",
        dateRange: {start: {month: 7, day: 23}, end: {month: 8, day: 22}},
        traits: ["confident", "ambitious", "generous", "loyal", "creative", "dominating", "arrogant"],
        strengths: ["leadership", "charisma", "confidence", "generosity", "creativity", "warmth"],
        weaknesses: ["arrogance", "stubbornness", "dominance", "self-centeredness", "melodrama"],
        compatibility: {
          high: ["Aries", "Sagittarius", "Gemini", "Libra"],
          medium: ["Aquarius", "Cancer", "Virgo", "Scorpio"],
          low: ["Taurus", "Capricorn", "Pisces"]
        },
        careers: ["entertainment", "politics", "management", "teaching", "performance", "design"],
        colors: ["gold", "orange", "red"],
        luckyNumbers: [1, 4, 13, 22, 31],
        luckyDays: ["Sunday", "Tuesday"],
        bodyParts: ["heart", "spine", "back"],
        health: {
          strengths: ["strong cardiovascular system", "vitality", "strong back"],
          weaknesses: ["heart problems", "back issues", "spinal problems", "hypertension"]
        }
      },
      virgo: {
        name: "Virgo",
        symbol: "♍",
        element: "earth",
        quality: "mutable",
        ruler: "Mercury",
        dateRange: {start: {month: 8, day: 23}, end: {month: 9, day: 22}},
        traits: ["analytical", "practical", "diligent", "precise", "modest", "critical", "perfectionist"],
        strengths: ["analytical skills", "attention to detail", "practicality", "reliability", "intelligence", "service"],
        weaknesses: ["criticism", "overthinking", "perfectionism", "worry", "rigidity"],
        compatibility: {
          high: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
          medium: ["Pisces", "Leo", "Libra", "Gemini"],
          low: ["Aries", "Sagittarius", "Aquarius"]
        },
        careers: ["healthcare", "research", "editing", "accounting", "analytics", "science"],
        colors: ["navy blue", "beige", "grey"],
        luckyNumbers: [5, 14, 23, 32, 41],
        luckyDays: ["Wednesday", "Friday"],
        bodyParts: ["digestive system", "intestines", "spleen"],
        health: {
          strengths: ["digestive efficiency", "detoxification", "attention to health"],
          weaknesses: ["digestive disorders", "nervous stomach", "food sensitivities", "anxiety"]
        }
      }
    };
  }
  
  /**
   * Initialize planets data
   * @returns {Object} - Planets data
   */
  initializePlanets() {
    return {
      sun: {
        name: "Sun",
        symbol: "☉",
        type: "luminary",
        rules: ["Leo"],
        represents: ["identity", "ego", "self-expression", "vitality", "consciousness", "father", "authority"],
        keywords: ["individuality", "will", "purpose", "creative force", "leadership"],
        dayRuler: true,
        orbInfluence: 10,
        movementRate: "1° per day",
        cycleLength: "1 year"
      },
      moon: {
        name: "Moon",
        symbol: "☽",
        type: "luminary",
        rules: ["Cancer"],
        represents: ["emotions", "instincts", "subconsciousness", "nurturing", "mother", "home", "security"],
        keywords: ["feelings", "intuition", "receptivity", "adaptability", "comfort", "reflection"],
        nightRuler: true,
        orbInfluence: 10,
        movementRate: "13-14° per day",
        cycleLength: "28 days"
      },
      mercury: {
        name: "Mercury",
        symbol: "☿",
        type: "personal planet",
        rules: ["Gemini", "Virgo"],
        represents: ["communication", "intellect", "learning", "information", "perception", "reason", "coordination"],
        keywords: ["thought", "logic", "analysis", "expression", "adaptability", "dexterity"],
        orbInfluence: 7,
        movementRate: "0.5-2° per day",
        cycleLength: "88 days",
        retrograde: {
          frequency: "3-4 times per year",
          duration: "3 weeks",
          effects: ["miscommunication", "technology issues", "travel delays", "contract problems"]
        }
      },
      venus: {
        name: "Venus",
        symbol: "♀",
        type: "personal planet",
        rules: ["Taurus", "Libra"],
        represents: ["love", "beauty", "values", "harmony", "attraction", "finances", "pleasure", "art"],
        keywords: ["relationships", "aesthetics", "balance", "sensuality", "affection", "cooperation"],
        orbInfluence: 7,
        movementRate: "1-1.25° per day",
        cycleLength: "225 days",
        retrograde: {
          frequency: "every 18 months",
          duration: "6 weeks",
          effects: ["relationship reassessment", "financial reconsideration", "aesthetic changes", "value shifts"]
        }
      },
      mars: {
        name: "Mars",
        symbol: "♂",
        type: "personal planet",
        rules: ["Aries", "Scorpio (traditional)"],
        represents: ["action", "energy", "desire", "aggression", "courage", "passion", "competition", "sex"],
        keywords: ["drive", "ambition", "initiative", "assertiveness", "warfare", "strength", "independence"],
        orbInfluence: 7,
        movementRate: "0.5-1° per day",
        cycleLength: "687 days",
        retrograde: {
          frequency: "every 2 years",
          duration: "2.5 months",
          effects: ["frustration", "blocked energy", "aggression", "sexual tension", "technical issues"]
        }
      },
      jupiter: {
        name: "Jupiter",
        symbol: "♃",
        type: "social planet",
        rules: ["Sagittarius", "Pisces (traditional)"],
        represents: ["expansion", "growth", "abundance", "optimism", "luck", "wisdom", "philosophy", "justice"],
        keywords: ["opportunity", "faith", "higher learning", "exploration", "generosity", "joy"],
        orbInfluence: 8,
        movementRate: "0.08-0.16° per day",
        cycleLength: "12 years",
        retrograde: {
          frequency: "annually",
          duration: "4 months",
          effects: ["philosophical reassessment", "spiritual growth", "legal delays", "educational review"]
        }
      },
      saturn: {
        name: "Saturn",
        symbol: "♄",
        type: "social planet",
        rules: ["Capricorn", "Aquarius (traditional)"],
        represents: ["structure", "discipline", "responsibility", "limitations", "time", "authority", "maturity"],
        keywords: ["karma", "restriction", "perseverance", "ambition", "patience", "realism"],
        orbInfluence: 8,
        movementRate: "0.03-0.13° per day",
        cycleLength: "29.5 years",
        retrograde: {
          frequency: "annually",
          duration: "4.5 months",
          effects: ["reassessment of responsibilities", "delays", "structural issues", "karmic lessons"]
        }
      },
      uranus: {
        name: "Uranus",
        symbol: "♅",
        type: "transpersonal planet",
        rules: ["Aquarius"],
        represents: ["innovation", "rebellion", "individuality", "invention", "technology", "change", "freedom"],
        keywords: ["originality", "eccentricity", "revolution", "awakening", "disruption", "liberation"],
        orbInfluence: 5,
        movementRate: "0.03-0.04° per day",
        cycleLength: "84 years",
        retrograde: {
          frequency: "annually",
          duration: "5 months",
          effects: ["unexpected reversals", "technological issues", "revolutionary insights", "internal awakening"]
        }
      },
      neptune: {
        name: "Neptune",
        symbol: "♆",
        type: "transpersonal planet",
        rules: ["Pisces"],
        represents: ["dreams", "spirituality", "illusion", "compassion", "transcendence", "art", "mysticism"],
        keywords: ["intuition", "imagination", "idealism", "sacrifice", "divine inspiration", "escapism"],
        orbInfluence: 5,
        movementRate: "0.02° per day",
        cycleLength: "165 years",
        retrograde: {
          frequency: "annually",
          duration: "5-6 months",
          effects: ["spiritual confusion", "creative inspiration", "disillusionment", "heightened intuition"]
        }
      },
      pluto: {
        name: "Pluto",
        symbol: "♇",
        type: "transpersonal planet",
        rules: ["Scorpio"],
        represents: ["transformation", "power", "death", "rebirth", "obsession", "control", "wealth"],
        keywords: ["intensity", "destruction", "regeneration", "sexuality", "manipulation", "depth"],
        orbInfluence: 5,
        movementRate: "0.01-0.03° per day",
        cycleLength: "248 years",
        retrograde: {
          frequency: "annually",
          duration: "5-6 months",
          effects: ["internal power struggles", "deep psychological shifts", "transformative periods", "release of control"]
        }
      }
    };
  }
  
  /**
   * Initialize houses data
   * @returns {Object} - Houses data
   */
  initializeHouses() {
    return {
      first: {
        name: "First House",
        angularity: "angular",
        natural_sign: "Aries",
        keywords: ["self", "identity", "appearance", "personality", "beginnings", "first impressions"],
        life_areas: ["physical body", "personal identity", "temperament", "approach to life"],
        body_parts: ["head", "face", "brain"],
        traditional_name: "House of Life"
      },
      second: {
        name: "Second House",
        angularity: "succedent",
        natural_sign: "Taurus",
        keywords: ["possessions", "values", "resources", "income", "self-worth", "talents"],
        life_areas: ["money", "personal resources", "material security", "values and priorities"],
        body_parts: ["neck", "throat", "thyroid"],
        traditional_name: "House of Value"
      },
      third: {
        name: "Third House",
        angularity: "cadent",
        natural_sign: "Gemini",
        keywords: ["communication", "siblings", "neighbors", "local travel", "early education", "immediate environment"],
        life_areas: ["siblings and relatives", "communication style", "primary education", "short journeys"],
        body_parts: ["shoulders", "arms", "hands", "lungs", "nervous system"],
        traditional_name: "House of Communications"
      },
      fourth: {
        name: "Fourth House",
        angularity: "angular",
        natural_sign: "Cancer",
        keywords: ["home", "family", "foundations", "roots", "ancestry", "emotional security"],
        life_areas: ["home environment", "family relationships", "psychological foundations", "real estate", "heritage"],
        body_parts: ["chest", "breasts", "stomach", "digestive organs"],
        traditional_name: "House of Home and Family"
      },
      fifth: {
        name: "Fifth House",
        angularity: "succedent",
        natural_sign: "Leo",
        keywords: ["creativity", "pleasure", "children", "romance", "entertainment", "self-expression"],
        life_areas: ["creative outlets", "recreational activities", "love affairs", "children or creative projects"],
        body_parts: ["heart", "spine", "upper back"],
        traditional_name: "House of Pleasure"
      },
      sixth: {
        name: "Sixth House",
        angularity: "cadent",
        natural_sign: "Virgo",
        keywords: ["health", "work", "service", "daily routines", "skills", "duty"],
        life_areas: ["health management", "daily work", "service to others", "pets", "habits and routines"],
        body_parts: ["digestive system", "intestines", "nervous system"],
        traditional_name: "House of Health"
      },
      seventh: {
        name: "Seventh House",
        angularity: "angular",
        natural_sign: "Libra",
        keywords: ["partnerships", "marriage", "contracts", "open enemies", "cooperation", "balance"],
        life_areas: ["committed relationships", "business partnerships", "legal matters", "agreements"],
        body_parts: ["lower back", "kidneys", "skin"],
        traditional_name: "House of Partnerships"
      },
      eighth: {
        name: "Eighth House",
        angularity: "succedent",
        natural_sign: "Scorpio",
        keywords: ["transformation", "intimacy", "shared resources", "death", "rebirth", "power"],
        life_areas: ["taxes and inheritance", "partner's resources", "psychological depth", "occult matters"],
        body_parts: ["reproductive organs", "excretory system", "sexual organs"],
        traditional_name: "House of Death and Regeneration"
      },
      ninth: {
        name: "Ninth House",
        angularity: "cadent",
        natural_sign: "Sagittarius",
        keywords: ["philosophy", "higher education", "long-distance travel", "religion", "expansion", "ethics"],
        life_areas: ["belief systems", "higher learning", "cultural exploration", "publishing"],
        body_parts: ["hips", "thighs", "liver"],
        traditional_name: "House of Philosophy"
      },
      tenth: {
        name: "Tenth House",
        angularity: "angular",
        natural_sign: "Capricorn",
        keywords: ["career", "public image", "authority", "achievement", "responsibility", "status"],
        life_areas: ["professional life", "reputation", "social contribution", "ambitions"],
        body_parts: ["knees", "bones", "skeletal system"],
        traditional_name: "House of Social Status"
      },
      eleventh: {
        name: "Eleventh House",
        angularity: "succedent",
        natural_sign: "Aquarius",
        keywords: ["friendships", "groups", "hopes", "wishes", "humanitarian concerns", "networks"],
        life_areas: ["social circles", "group affiliations", "networking", "future goals"],
        body_parts: ["ankles", "circulation", "nervous system"],
        traditional_name: "House of Friendships"
      },
      twelfth: {
        name: "Twelfth House",
        angularity: "cadent",
        natural_sign: "Pisces",
        keywords: ["unconscious", "secrets", "spiritual growth", "isolation", "self-undoing", "transcendence"],
        life_areas: ["hidden matters", "spiritual practice", "unconscious patterns", "karmic debts"],
        body_parts: ["feet", "lymphatic system", "immune system"],
        traditional_name: "House of Self-Undoing"
      }
    };
  }
  
  /**
   * Initialize aspects data
   * @returns {Object} - Aspects data
   */
  initializeAspects() {
    return {
      conjunction: {
        name: "Conjunction",
        symbol: "☌",
        angle: 0,
        orb: {
          luminaries: 10,
          personal: 8,
          social: 6,
          transpersonal: 4
        },
        nature: "variable",
        quality: "combining energies",
        effect: "intensification",
        keywords: ["unity", "fusion", "intensity", "new beginnings", "focus", "concentration"],
        interpretation: "Planets in conjunction combine their energies, intensifying and sometimes blending their expression. The nature depends on the planets involved."
      },
      opposition: {
        name: "Opposition",
        symbol: "☍",
        angle: 180,
        orb: {
          luminaries: 10,
          personal: 8,
          social: 6,
          transpersonal: 4
        },
        nature: "challenging",
        quality: "tension and awareness",
        effect: "polarity",
        keywords: ["balance", "polarization", "awareness", "relationship", "projection", "compromise"],
        interpretation: "Planets in opposition create tension that seeks resolution through awareness and integration. Often manifests as external conflicts or relationships."
      },
      trine: {
        name: "Trine",
        symbol: "△",
        angle: 120,
        orb: {
          luminaries: 8,
          personal: 6,
          social: 5,
          transpersonal: 4
        },
        nature: "harmonious",
        quality: "flow and ease",
        effect: "support",
        keywords: ["harmony", "flow", "creativity", "opportunity", "expression", "natural talent"],
        interpretation: "Planets in trine support each other, creating easy flow of energy and natural talents. May sometimes be too comfortable, leading to complacency."
      },
      square: {
        name: "Square",
        symbol: "□",
        angle: 90,
        orb: {
          luminaries: 8,
          personal: 6,
          social: 5,
          transpersonal: 4
        },
        nature: "challenging",
        quality: "friction and growth",
        effect: "development",
        keywords: ["tension", "challenge", "action", "development", "frustration", "effort"],
        interpretation: "Planets in square create dynamic tension that motivates action and development. Often experienced as internal conflicts requiring resolution."
      },
      sextile: {
        name: "Sextile",
        symbol: "⚹",
        angle: 60,
        orb: {
          luminaries: 6,
          personal: 5,
          social: 4,
          transpersonal: 3
        },
        nature: "harmonious",
        quality: "opportunity and communication",
        effect: "assistance",
        keywords: ["opportunity", "assistance", "communication", "learning", "productivity", "potential"],
        interpretation: "Planets in sextile offer opportunities for growth requiring some initiative. Creates a cooperative energy that supports development."
      },
      quincunx: {
        name: "Quincunx (Inconjunct)",
        symbol: "⚻",
        angle: 150,
        orb: {
          luminaries: 3,
          personal: 3,
          social: 2,
          transpersonal: 1.5
        },
        nature: "challenging",
        quality: "adjustment and integration",
        effect: "adaptation",
        keywords: ["adjustment", "adaptation", "health", "service", "imbalance", "refinement"],
        interpretation: "Planets in quincunx require constant adjustment and adaptation. Often manifests as health issues or a need to integrate seemingly unrelated areas."
      },
      semisextile: {
        name: "Semisextile",
        symbol: "⚺",
        angle: 30,
        orb: {
          luminaries: 3,
          personal: 2,
          social: 1.5,
          transpersonal: 1
        },
        nature: "mildly challenging",
        quality: "subtle connection and growth",
        effect: "development",
        keywords: ["transition", "growth", "subtle awareness", "irritation", "adjustment", "development"],
        interpretation: "Planets in semisextile create a subtle connection that may manifest as minor irritation spurring growth. Indicates areas requiring gradual integration."
      },
      semisquare: {
        name: "Semisquare",
        symbol: "⚼",
        angle: 45,
        orb: {
          luminaries: 3,
          personal: 2,
          social: 1.5,
          transpersonal: 1
        },
        nature: "mildly challenging",
        quality: "irritation and growth",
        effect: "stress",
        keywords: ["irritation", "minor conflict", "internal tension", "growth point", "stress", "adjustment"],
        interpretation: "Planets in semisquare create internal tension and irritation that eventually leads to growth. Often manifests as ongoing minor stressors."
      },
      sesquiquadrate: {
        name: "Sesquiquadrate",
        symbol: "⚽",
        angle: 135,
        orb: {
          luminaries: 3,
          personal: 2,
          social: 1.5,
          transpersonal: 1
        },
        nature: "challenging",
        quality: "adjustment after crisis",
        effect: "correction",
        keywords: ["correction", "adjustment", "completion", "restlessness", "dissatisfaction", "change"],
        interpretation: "Planets in sesquiquadrate indicate a need for adjustment after a crisis point. Often manifests as a feeling of dissatisfaction driving change."
      },
      quintile: {
        name: "Quintile",
        symbol: "Q",
        angle: 72,
        orb: {
          luminaries: 2,
          personal: 2,
          social: 1.5,
          transpersonal: 1
        },
        nature: "harmonious",
        quality: "creative talent",
        effect: "ability",
        keywords: ["talent", "creativity", "skill", "mastery", "application", "unique ability"],
        interpretation: "Planets in quintile indicate special creative talents and abilities. Often manifests as innate skills that can be developed with application."
      },
      biquintile: {
        name: "Biquintile",
        symbol: "BQ",
        angle: 144,
        orb: {
          luminaries: 2,
          personal: 2,
          social: 1.5,
          transpersonal: 1
        },
        nature: "harmonious",
        quality: "creative application",
        effect: "resourcefulness",
        keywords: ["creative solution", "intuitive insight", "originality", "resourcefulness", "unusual talent", "innovative approach"],
        interpretation: "Planets in biquintile indicate creative solutions and unusual approaches to problems. Often manifests as intuitive insights and innovative thinking."
      }
    };
  }
