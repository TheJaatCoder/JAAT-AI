/**
 * JAAT-AI Mode: Language Learning Assistant
 * 
 * Specialized mode for assisting with language learning,
 * including vocabulary building, grammar instruction, 
 * pronunciation guidance, and cultural context.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const LanguageLearningAssistantMode = {
  id: 'language-learning-assistant',
  name: 'Language Learning Assistant',
  icon: 'language',
  description: 'Interactive assistance for learning new languages.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Language Learning Assistant mode, a specialized tutor for language learners. You help people learn new languages by providing personalized instruction, feedback, and resources.

Key characteristics:
1. You provide clear explanations of grammar rules with practical examples
2. You help build vocabulary through contextual learning and mnemonics
3. You can guide pronunciation with phonetic descriptions and examples
4. You create practice exercises tailored to the learner's level and goals
5. You explain cultural context and usage nuances 
6. You give constructive feedback that encourages learning
7. You adapt your teaching style based on the learner's progress and preferences

When supporting language learners, focus on providing accessible explanations with relevant examples. Balance correcting errors with maintaining motivation. Tailor your approach to the learner's proficiency level, from beginner to advanced, and consider their specific learning goals.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "I'd like to learn basic Spanish greetings and introductions.",
    "Can you explain when to use French passé composé vs. imparfait?",
    "Help me practice Japanese particles like は, が, and を.",
    "What's the best way to memorize German articles (der, die, das)?",
    "Can you create a practice dialogue for ordering food in Italian?",
    "How do Mandarin tones work? Can you give examples?",
    "What are some common idioms in Russian?",
    "Can you help me with Arabic verb conjugation?",
    "What's the difference between formal and informal speech in Korean?",
    "I want to practice English prepositions of time (in, on, at)."
  ],
  
  // Supported languages with details
  supportedLanguages: [
    {
      name: "Spanish",
      code: "es",
      difficulty: "Easy-Moderate for English speakers",
      keyFeatures: [
        "Gendered nouns",
        "Verb conjugations for different tenses and subjects",
        "Similar alphabet to English with a few additional characters (ñ, á, é, í, ó, ú, ü)",
        "Subject pronouns often omitted"
      ],
      usefulPhrases: [
        {phrase: "Hola", translation: "Hello", pronounciation: "OH-lah"},
        {phrase: "Buenos días", translation: "Good morning", pronounciation: "BWAY-nohs DEE-ahs"},
        {phrase: "Por favor", translation: "Please", pronounciation: "pohr fah-VOHR"},
        {phrase: "Gracias", translation: "Thank you", pronounciation: "GRAH-syahs"},
        {phrase: "¿Cómo estás?", translation: "How are you?", pronounciation: "KOH-moh eh-STAHS"},
        {phrase: "¿Habla inglés?", translation: "Do you speak English?", pronounciation: "AH-blah een-GLEHS"}
      ],
      resources: [
        "SpanishDict - Online dictionary and conjugation tool",
        "Duolingo - Popular language learning app with gamified learning",
        "Notes in Spanish - Podcast for Spanish learners",
        "Cervantes Institute - Official Spanish language and cultural center"
      ]
    },
    {
      name: "French",
      code: "fr",
      difficulty: "Moderate for English speakers",
      keyFeatures: [
        "Gendered nouns",
        "Complex verb conjugations",
        "Liaison (connecting words in pronunciation)",
        "Silent letters and specific accent marks",
        "Formal and informal address (tu/vous)"
      ],
      usefulPhrases: [
        {phrase: "Bonjour", translation: "Hello", pronounciation: "bohn-ZHOOR"},
        {phrase: "S'il vous plaît", translation: "Please", pronounciation: "seel voo PLEH"},
        {phrase: "Merci", translation: "Thank you", pronounciation: "mehr-SEE"},
        {phrase: "Comment allez-vous?", translation: "How are you? (formal)", pronounciation: "koh-mahn tah-lay-VOO"},
        {phrase: "Je ne comprends pas", translation: "I don't understand", pronounciation: "zhuh nuh kohm-PRAHN pah"},
        {phrase: "Parlez-vous anglais?", translation: "Do you speak English?", pronounciation: "par-lay VOO ahn-GLEH"}
      ],
      resources: [
        "TV5Monde - French language learning resources",
        "Lawless French - Comprehensive grammar guides",
        "Coffee Break French - Popular podcast for French learners",
        "Français Authentique - YouTube channel focusing on natural French"
      ]
    },
    {
      name: "German",
      code: "de",
      difficulty: "Moderate for English speakers",
      keyFeatures: [
        "Three grammatical genders (masculine, feminine, neuter)",
        "Four cases (nominative, accusative, dative, genitive)",
        "Compound words",
        "Sentence structure differs from English",
        "Capitalization of all nouns"
      ],
      usefulPhrases: [
        {phrase: "Hallo", translation: "Hello", pronounciation: "HAH-loh"},
        {phrase: "Bitte", translation: "Please/You're welcome", pronounciation: "BIT-tuh"},
        {phrase: "Danke", translation: "Thank you", pronounciation: "DAHN-kuh"},
        {phrase: "Wie geht es Ihnen?", translation: "How are you? (formal)", pronounciation: "vee gayt ess EE-nen"},
        {phrase: "Ich verstehe nicht", translation: "I don't understand", pronounciation: "ikh fer-SHTEY-uh nikht"},
        {phrase: "Sprechen Sie Englisch?", translation: "Do you speak English? (formal)", pronounciation: "SHPREH-khen zee ENG-lish"}
      ],
      resources: [
        "Deutsche Welle - German broadcaster with learning materials",
        "Goethe-Institut - Official German cultural institution",
        "Easy German - YouTube channel with street interviews",
        "Deutsch Akademie - Free online grammar exercises"
      ]
    },
    {
      name: "Japanese",
      code: "ja",
      difficulty: "Hard for English speakers",
      keyFeatures: [
        "Three writing systems (hiragana, katakana, kanji)",
        "Subject-Object-Verb word order",
        "Particles to mark grammatical functions",
        "Honorific language system",
        "Contextual omission of subjects and objects"
      ],
      usefulPhrases: [
        {phrase: "こんにちは (Konnichiwa)", translation: "Hello", pronounciation: "kohn-nee-chee-wah"},
        {phrase: "お願いします (Onegaishimasu)", translation: "Please", pronounciation: "oh-neh-gigh-shee-mahs"},
        {phrase: "ありがとう (Arigatou)", translation: "Thank you", pronounciation: "ah-ree-gah-toh"},
        {phrase: "お元気ですか？ (O-genki desu ka?)", translation: "How are you?", pronounciation: "oh-gen-kee dess-kah"},
        {phrase: "分かりません (Wakarimasen)", translation: "I don't understand", pronounciation: "wah-kah-ree-mah-sen"},
        {phrase: "英語を話せますか？ (Eigo o hanasemasu ka?)", translation: "Do you speak English?", pronounciation: "ay-go oh hah-nah-seh-mahs kah"}
      ],
      resources: [
        "Tae Kim's Guide to Japanese Grammar - Comprehensive free resource",
        "WaniKani - SRS system for learning kanji",
        "Genki textbooks - Popular Japanese learning series",
        "NHK Easy News - Simplified Japanese news articles"
      ]
    },
    {
      name: "Mandarin Chinese",
      code: "zh",
      difficulty: "Very hard for English speakers",
      keyFeatures: [
        "Tonal language (four main tones)",
        "Character-based writing system",
        "No verb conjugations or plural forms",
        "Measure words for counting objects",
        "Context-heavy communication"
      ],
      usefulPhrases: [
        {phrase: "你好 (Nǐ hǎo)", translation: "Hello", pronounciation: "nee how (2nd tone, 3rd tone)"},
        {phrase: "请 (Qǐng)", translation: "Please", pronounciation: "ching (3rd tone)"},
        {phrase: "谢谢 (Xièxie)", translation: "Thank you", pronounciation: "syeh-syeh (4th tone, neutral)"},
        {phrase: "你好吗？ (Nǐ hǎo ma?)", translation: "How are you?", pronounciation: "nee how mah (2nd, 3rd, neutral tones)"},
        {phrase: "我不明白 (Wǒ bù míngbai)", translation: "I don't understand", pronounciation: "woh boo ming-bye (3rd, 4th, 2nd, neutral tones)"},
        {phrase: "你会说英语吗? (Nǐ huì shuō Yīngyǔ ma?)", translation: "Do you speak English?", pronounciation: "nee hway shwo ying-yuu ma (2nd, 4th, 1st, 3rd, 1st, neutral tones)"}
      ],
      resources: [
        "Pleco - Essential Chinese dictionary app",
        "HelloChinese - Beginner-friendly learning app",
        "Chinese Grammar Wiki - Comprehensive grammar reference",
        "ChinesePod - Audio lessons for various levels"
      ]
    },
    {
      name: "Italian",
      code: "it",
      difficulty: "Easy for English speakers",
      keyFeatures: [
        "Gendered nouns",
        "Verb conjugations for different tenses and subjects",
        "Similar alphabet to English with different pronunciation",
        "Subject pronouns often omitted",
        "Double consonants change pronunciation"
      ],
      usefulPhrases: [
        {phrase: "Ciao", translation: "Hello/Goodbye", pronounciation: "chow"},
        {phrase: "Per favore", translation: "Please", pronounciation: "pair fah-VOH-ray"},
        {phrase: "Grazie", translation: "Thank you", pronounciation: "GRAH-tsyeh"},
        {phrase: "Come stai?", translation: "How are you?", pronounciation: "KOH-meh stai"},
        {phrase: "Non capisco", translation: "I don't understand", pronounciation: "non kah-PEE-sko"},
        {phrase: "Parli inglese?", translation: "Do you speak English?", pronounciation: "PAR-lee een-GLAY-zay"}
      ],
      resources: [
        "Duolingo - Popular language learning app",
        "One World Italiano - Free online course",
        "News in Slow Italian - Graded news podcast",
        "Dire, Fare, Partire - Video course by Italian public TV"
      ]
    },
    {
      name: "Russian",
      code: "ru",
      difficulty: "Hard for English speakers",
      keyFeatures: [
        "Cyrillic alphabet",
        "Six grammatical cases",
        "Three grammatical genders",
        "Aspect-based verb system",
        "No articles",
        "Flexible word order"
      ],
      usefulPhrases: [
        {phrase: "Здравствуйте (Zdravstvuyte)", translation: "Hello (formal)", pronounciation: "zdrah-stvooy-tye"},
        {phrase: "Пожалуйста (Pozhaluysta)", translation: "Please/You're welcome", pronounciation: "pa-ZHAL-sta"},
        {phrase: "Спасибо (Spasibo)", translation: "Thank you", pronounciation: "spah-SEE-bah"},
        {phrase: "Как дела? (Kak dela?)", translation: "How are you?", pronounciation: "kahk dee-LAH"},
        {phrase: "Я не понимаю (Ya ne ponimayu)", translation: "I don't understand", pronounciation: "ya nee pa-nee-MY-you"},
        {phrase: "Вы говорите по-английски? (Vy govorite po-angliyski?)", translation: "Do you speak English? (formal)", pronounciation: "vye ga-va-REE-tye pa an-GLEE-skee"}
      ],
      resources: [
        "Russian for Everyone - Comprehensive online resource",
        "RT Learn Russian - Free online course",
        "Master Russian - Grammar and vocabulary",
        "Russian Pod 101 - Audio lessons for various levels"
      ]
    },
    {
      name: "Arabic",
      code: "ar",
      difficulty: "Very hard for English speakers",
      keyFeatures: [
        "Right-to-left script",
        "Consonant-based alphabet with optional vowel markings",
        "Root-and-pattern morphology",
        "Many sounds not found in English",
        "Formal (Classical/Modern Standard) vs. dialectal variants",
        "Gendered forms for verbs and pronouns"
      ],
      usefulPhrases: [
        {phrase: "مرحبا (Marhaban)", translation: "Hello", pronounciation: "mar-ha-ban"},
        {phrase: "من فضلك (Min fadlak/fadliki)", translation: "Please (m/f)", pronounciation: "min fad-lak/fad-li-ki"},
        {phrase: "شكرا (Shukran)", translation: "Thank you", pronounciation: "shook-ran"},
        {phrase: "كيف حالك؟ (Kayfa haluk/haluki?)", translation: "How are you? (m/f)", pronounciation: "kay-fa ha-look/ha-loo-ki"},
        {phrase: "لا أفهم (La afham)", translation: "I don't understand", pronounciation: "la af-ham"},
        {phrase: "هل تتكلم الإنجليزية؟ (Hal tatakallamu al-injliziyya?)", translation: "Do you speak English?", pronounciation: "hal ta-ta-kal-la-mu al-in-gli-zee-ya"}
      ],
      resources: [
        "Madinah Arabic - Free comprehensive course",
        "Al-Jazeera Learning - Arabic language resources",
        "Arabiyyah Bayna Yadayk - Popular textbook series",
        "Arabic Pod 101 - Audio lessons for various levels"
      ]
    },
    {
      name: "Korean",
      code: "ko",
      difficulty: "Hard for English speakers",
      keyFeatures: [
        "Hangul phonetic alphabet",
        "Subject-Object-Verb word order",
        "Complex honorific system",
        "Particle-based grammar",
        "Contextual omission of subjects and objects",
        "Agglutinative language (adding suffixes to change meaning)"
      ],
      usefulPhrases: [
        {phrase: "안녕하세요 (Annyeonghaseyo)", translation: "Hello", pronounciation: "ahn-nyong-ha-say-yo"},
        {phrase: "주세요 (Juseyo)", translation: "Please give me", pronounciation: "joo-say-yo"},
        {phrase: "감사합니다 (Gamsahamnida)", translation: "Thank you", pronounciation: "gam-sa-ham-ni-da"},
        {phrase: "어떻게 지내세요? (Eotteoke jinaeseyo?)", translation: "How are you?", pronounciation: "uh-tto-keh ji-nae-say-yo"},
        {phrase: "이해가 안 돼요 (Ihaega an dwaeyo)", translation: "I don't understand", pronounciation: "ee-hae-ga an dwae-yo"},
        {phrase: "영어 할 줄 아세요? (Yeong-eo hal jul aseyo?)", translation: "Do you speak English?", pronounciation: "young-uh hal jool ah-say-yo"}
      ],
      resources: [
        "Talk To Me In Korean - Popular online Korean course",
        "How to Study Korean - Comprehensive free resource",
        "TOPIK Guide - Korean language test preparation",
        "Korean from Zero - Free online textbook"
      ]
    },
    {
      name: "Portuguese",
      code: "pt",
      difficulty: "Easy-Moderate for English speakers",
      keyFeatures: [
        "Nasal vowel sounds",
        "Gendered nouns",
        "Complex verb conjugations",
        "Different variants (European vs. Brazilian)",
        "Subject pronouns often omitted"
      ],
      usefulPhrases: [
        {phrase: "Olá", translation: "Hello", pronounciation: "oh-LA"},
        {phrase: "Por favor", translation: "Please", pronounciation: "por fah-VOR"},
        {phrase: "Obrigado/Obrigada (m/f)", translation: "Thank you", pronounciation: "oh-bree-GAH-doo/oh-bree-GAH-dah"},
        {phrase: "Como vai?", translation: "How are you?", pronounciation: "KOH-moh vigh"},
        {phrase: "Não entendo", translation: "I don't understand", pronounciation: "now en-TEN-doo"},
        {phrase: "Fala inglês?", translation: "Do you speak English?", pronounciation: "FAH-lah een-GLESH"}
      ],
      resources: [
        "Practice Portuguese - Focuses on European Portuguese",
        "Portuguese Pod 101 - Audio lessons",
        "Tá Falado - Brazilian Portuguese podcast",
        "Semantica - Video-based Portuguese lessons"
      ]
    }
  ],
  
  // Language learning methods
  learningMethods: [
    {
      name: "Grammar-Translation",
      description: "Traditional method focusing on grammar rules and translation exercises",
      strengths: [
        "Develops strong reading comprehension",
        "Builds analytical understanding of language structure",
        "Helpful for academic/literary purposes",
        "Supports precision in writing"
      ],
      limitations: [
        "Limited speaking/listening practice",
        "Can feel disconnected from practical usage",
        "May lead to overly formal language use",
        "Can be demotivating for some learners"
      ],
      bestFor: "Academic settings, literature study, learners who prefer analytical approaches",
      activities: [
        "Translating texts between languages",
        "Memorizing grammar rules and exceptions",
        "Reading and analyzing literary texts",
        "Completing gap-fill grammar exercises"
      ]
    },
    {
      name: "Communicative Language Teaching",
      description: "Focuses on interactive, authentic communication rather than perfect grammar",
      strengths: [
        "Develops practical communication skills",
        "Emphasizes fluency alongside accuracy",
        "Incorporates cultural context naturally",
        "Usually more engaging and motivating"
      ],
      limitations: [
        "May lead to fossilized errors without correction",
        "Less systematic grammar coverage",
        "Can be challenging for shy learners",
        "Requires more teacher skill/resources"
      ],
      bestFor: "Conversational goals, travel preparation, social language use",
      activities: [
        "Role-plays and simulations",
        "Information gap exercises",
        "Discussion of authentic materials",
        "Task-based communication activities",
        "Problem-solving in the target language"
      ]
    },
    {
      name: "Audio-Lingual Method",
      description: "Focuses on pattern drills and habit formation through oral practice",
      strengths: [
        "Develops accurate pronunciation",
        "Creates automatic responses for common situations",
        "Builds confidence through repetition",
        "Works well for memorizing useful phrases"
      ],
      limitations: [
        "Limited creative language use",
        "Can become monotonous",
        "Doesn't develop deeper understanding",
        "May not transfer well to real-world situations"
      ],
      bestFor: "Pronunciation practice, beginners, memorizing essential phrases",
      activities: [
        "Listen and repeat exercises",
        "Pattern drills",
        "Dialogue memorization",
        "Minimal pair pronunciation practice"
      ]
    },
    {
      name: "Total Physical Response (TPR)",
      description: "Associates language with physical movements and actions",
      strengths: [
        "Low stress approach",
        "Good for kinesthetic learners",
        "Engages multiple senses",
        "Creates strong memory associations"
      ],
      limitations: [
        "Limited for abstract concepts",
        "Less effective for advanced learners",
        "Primarily develops receptive skills initially",
        "May seem childish to some adult learners"
      ],
      bestFor: "Young learners, beginners, learning action verbs and commands",
      activities: [
        "Responding physically to commands",
        "Acting out stories and scenarios",
        "Using gestures to reinforce vocabulary",
        "Following and giving instructions in the target language"
      ]
    },
    {
      name: "Natural Approach",
      description: "Emphasizes exposure to comprehensible input before production",
      strengths: [
        "Reduces anxiety by not forcing early production",
        "Mimics natural language acquisition",
        "Focuses on meaningful communication",
        "Builds strong listening comprehension"
      ],
      limitations: [
        "Progress can seem slow initially",
        "May not address specific grammar needs",
        "Requires significant comprehensible input",
        "Relies heavily on teacher skill"
      ],
      bestFor: "Building a natural feel for the language, reducing anxiety",
      activities: [
        "Listening to comprehensible input",
        "Responding non-verbally at first",
        "Gradually building to simple responses",
        "Using visuals and context for comprehension"
      ]
    },
    {
      name: "Task-Based Language Teaching",
      description: "Organizes learning around practical tasks rather than linguistic structures",
      strengths: [
        "Highly practical and motivating",
        "Integrates multiple skills naturally",
        "Clear purpose for language use",
        "Prepares for real-world language needs"
      ],
      limitations: [
        "May neglect systematic grammar coverage",
        "Can be challenging to design appropriate tasks",
        "Advanced preparation often required",
        "Assessment can be complicated"
      ],
      bestFor: "Practical language needs, specific purpose language learning",
      activities: [
        "Planning a trip using target language",
        "Creating a presentation or product",
        "Solving problems collaboratively",
        "Completing real-world projects"
      ]
    },
    {
      name: "Spaced Repetition",
      description: "Schedules review of material at increasing intervals for optimal memory retention",
      strengths: [
        "Scientifically proven effectiveness",
        "Efficient use of study time",
        "Particularly effective for vocabulary",
        "Can be automated with apps/software"
      ],
      limitations: [
        "Requires consistent commitment",
        "Best for discrete facts rather than skills",
        "Needs to be combined with other methods",
        "Can become mechanical without context"
      ],
      bestFor: "Vocabulary acquisition, memorizing conjugations or characters",
      activities: [
        "Using SRS flashcard apps (Anki, Memrise, etc.)",
        "Creating custom flashcard decks",
        "Reviewing vocabulary at optimal intervals",
        "Systematically testing recall of learned material"
      ]
    },
    {
      name: "Immersion",
      description: "Surrounding yourself with the target language as much as possible",
      strengths: [
        "Provides massive amounts of authentic input",
        "Forces active use of the language",
        "Teaches cultural context alongside language",
        "Accelerates fluency development"
      ],
      limitations: [
        "Not always practically possible",
        "Can be overwhelming for beginners",
        "May lead to anxiety or frustration",
        "Requires significant commitment"
      ],
      bestFor: "Intermediate to advanced learners, serious language goals",
      activities: [
        "Living in a country where the language is spoken",
        "Creating mini-immersion environments (media, labels, etc.)",
        "Setting designated 'target language only' times",
        "Joining language exchange groups or meetups"
      ]
    }
  ],
  
  // Vocabulary learning strategies
  vocabularyStrategies: [
    {
      name: "Spaced Repetition Systems (SRS)",
      description: "Using software or flashcards that schedule reviews at optimal intervals for memory",
      implementation: [
        "Use apps like Anki, Memrise, Quizlet, or similar SRS systems",
        "Create flashcards with target language word/phrase on one side, native language on the other",
        "Review cards according to the algorithm's schedule",
        "Mark difficult cards for more frequent review"
      ],
      tips: [
        "Include example sentences for context",
        "Add audio for pronunciation when possible",
        "Use images instead of translations for concrete nouns",
        "Keep regular daily review sessions (15-20 minutes)",
        "Create separate decks for different themes or difficulty levels"
      ]
    },
    {
      name: "Word Association and Mnemonics",
      description: "Creating mental connections between new vocabulary and existing knowledge",
      implementation: [
        "Link new words to similar-sounding words in your native language",
        "Create vivid mental images connecting the word to its meaning",
        "Make up stories incorporating the word's meaning",
        "Group words into categories or themes",
        "Use keyword method (associate with similar-sounding word in native language)"
      ],
      tips: [
        "The more personal or bizarre the association, the more memorable",
        "Focus on creating associations for difficult words",
        "Incorporate physical gestures to reinforce memory",
        "Review and strengthen associations periodically",
        "Share mnemonic techniques with other learners"
      ]
    },
    {
      name: "Contextual Learning",
      description: "Learning vocabulary through meaningful context rather than isolated word lists",
      implementation: [
        "Read texts at appropriate level for your proficiency",
        "Watch videos with subtitles in the target language",
        "Learn words in phrases or complete sentences",
        "Keep a vocabulary notebook with context examples",
        "Create thematic word clusters (e.g., 'at the restaurant')"
      ],
      tips: [
        "Limit new vocabulary to 5-10 words per text initially",
        "Re-read texts multiple times to reinforce vocabulary",
        "Use graded readers designed for language learners",
        "Focus on high-frequency vocabulary first",
        "Create your own sentences using new vocabulary"
      ]
    },
    {
      name: "Word Maps and Mind Mapping",
      description: "Visually organizing vocabulary to show relationships between words",
      implementation: [
        "Create a diagram with the main concept in the center",
        "Branch out to related words, synonyms, antonyms, etc.",
        "Add images, colors, and examples to enhance memory",
        "Group words by theme, function, or grammatical category",
        "Continuously expand maps with new vocabulary"
      ],
      tips: [
        "Use digital tools like MindMeister or pen and paper",
        "Review and redraw maps periodically",
        "Add new connections as you learn more vocabulary",
        "Include example sentences along branches",
        "Color-code different types of words or relationships"
      ]
    },
    {
      name: "The Goldlist Method",
      description: "A systematic approach for transferring vocabulary to long-term memory without intense study",
      implementation: [
        "Write 25 words/phrases in a notebook with translations",
        "Wait at least 2 weeks, then review the list",
        "Rewrite only the items you didn't remember (about 30%)",
        "Repeat the process with diminishing lists",
        "Continue until most words are memorized naturally"
      ],
      tips: [
        "Don't actively try to memorize - just write and read naturally",
        "Each session should be relaxed, not intense study",
        "Include context or short phrases, not just isolated words",
        "Maintain the 2+ week waiting period between reviews",
        "Trust the process even if it seems too passive"
      ]
    },
    {
      name: "Language Apps and Gamification",
      description: "Using game-like elements to make vocabulary acquisition engaging and habit-forming",
      implementation: [
        "Use apps like Duolingo, Memrise, or Drops for daily practice",
        "Set up streak counters and daily goals",
        "Compete with friends or community members",
        "Earn virtual rewards for consistent practice",
        "Use features like timed challenges to add excitement"
      ],
      tips: [
        "Combine app usage with other learning methods",
        "Use apps consistently but don't rely on them exclusively",
        "Review vocabulary outside the app context",
        "Use apps for initial exposure, then reinforcement",
        "Set reasonable goals to maintain motivation"
      ]
    },
    {
      name: "Total Physical Response (TPR)",
      description: "Associating vocabulary with physical movements to strengthen memory connections",
      implementation: [
        "Assign specific gestures to words or phrases",
        "Physically act out verbs when learning them",
        "Label objects in your environment",
        "Use body language while practicing vocabulary",
        "Create stories that involve movement and new vocabulary"
      ],
      tips: [
        "Especially effective for verbs and spatial concepts",
        "Combine with verbal practice for stronger associations",
        "Exaggerate movements to make them more memorable",
        "Practice in a space where you can move freely",
        "Record videos of your TPR sessions for review"
      ]
    },
    {
      name: "Frequency-Based Learning",
      description: "Focusing on high-frequency words first to maximize communication ability",
      implementation: [
        "Start with the most common 500-1000 words in the language",
        "Use frequency dictionaries or word lists",
        "Learn words in frequency order with core vocabulary first",
        "Focus on words that appear often in your areas of interest",
        "Track progress through frequency tiers (e.g., first 500, next 500)"
      ],
      tips: [
        "1000 most frequent words often cover 80-85% of everyday language",
        "Combine with contextual learning for better retention",
        "Adjust frequency lists based on your specific needs",
        "Learn common word families together",
        "Check comprehension by reading level-appropriate texts"
      ]
    }
  ],
  
  // Common language learning challenges and solutions
  commonChallenges: [
    {
      challenge: "Pronunciation difficulties",
      description: "Struggling with sounds that don't exist in your native language",
      solutions: [
        {
          name: "Minimal Pairs Practice",
          description: "Focus on pairs of words that differ by only one sound",
          implementation: "Practice words like 'ship/sheep' in English or 'tu/tout' in French. Listen to native speakers pronouncing them and try to identify and reproduce the difference."
        },
        {
          name: "Phonetic Awareness Training",
          description: "Learn about mouth and tongue positioning for different sounds",
          implementation: "Study diagrams showing tongue position, watch slow-motion videos of pronunciation, and practice in front of a mirror."
        },
        {
          name: "Shadow Reading",
          description: "Reading aloud simultaneously with a native speaker recording",
          implementation: "Listen to audio at slightly slower speed initially, then match the speaker's rhythm, intonation, and sound production."
        },
        {
          name: "Recording and Comparison",
          description: "Record yourself and compare with native speakers",
          implementation: "Read the same passage as a native speaker, record yourself, then listen to both to identify differences. Make specific adjustments based on what you hear."
        }
      ]
    },
    {
      challenge: "Grammar overwhelm",
      description: "Feeling confused or frustrated by complex grammar rules and exceptions",
      solutions: [
        {
          name: "Chunking",
          description: "Learn common phrases as whole units rather than constructing them from grammar rules",
          implementation: "Memorize useful expressions like 'I would like to...' instead of focusing on conditional tense formation rules initially."
        },
        {
          name: "Spiral Learning",
          description: "Revisit grammar concepts multiple times with increasing complexity",
          implementation: "Learn basic verb forms first, use them in simple contexts, then gradually add tenses and moods as you progress."
        },
        {
          name: "Grammar in Context",
          description: "Study grammar as it appears in authentic materials",
          implementation: "Notice patterns in texts, create your own examples based on authentic models, and focus on how grammar creates meaning."
        },
        {
          name: "Visualization and Charts",
          description: "Create visual representations of grammar patterns",
          implementation: "Make color-coded charts for verb conjugations, create diagrams for sentence structures, or use mind maps for grammar relationships."
        }
      ]
    },
    {
      challenge: "Vocabulary retention",
      description: "Forgetting words shortly after learning them",
      solutions: [
        {
          name: "Spaced Repetition",
          description: "Review words at gradually increasing intervals",
          implementation: "Use SRS apps like Anki or create a review schedule with increasingly longer gaps between sessions."
        },
        {
          name: "Contextual Association",
          description: "Learn and practice words in meaningful contexts and sentences",
          implementation: "Instead of isolated vocabulary lists, learn words in phrases or sentences. Create personal example sentences with new words."
        },
        {
          name: "Multiple Sensory Channels",
          description: "Engage multiple senses when learning vocabulary",
          implementation: "Say words aloud, write them down, create gestures, draw images, and listen to recordings to engage visual, auditory, and kinesthetic memory."
        },
        {
          name: "Semantic Mapping",
          description: "Create networks of related words",
          implementation: "Group vocabulary by themes, create mind maps with related words, and learn synonyms, antonyms, and word families together."
        }
      ]
    },
    {
      challenge: "Listening comprehension",
      description: "Difficulty understanding native speakers, especially at natural speed",
      solutions: [
        {
          name: "Graded Listening",
          description: "Progressively increase difficulty level of listening materials",
          implementation: "Start with slow, clear recordings designed for learners, then gradually introduce more natural speech patterns and speed."
        },
        {
          name: "Focused Listening Tasks",
          description: "Listen with specific goals rather than trying to understand everything",
          implementation: "First listen for gist, then for specific information, key words, or particular grammar structures in subsequent listenings."
        },
        {
          name: "Dictation Practice",
          description: "Write down what you hear to improve sound-to-meaning processing",
          implementation: "Listen to short segments and transcribe them, checking against the script. Focus on troublesome sounds or words."
        },
        {
          name: "Diverse Accent Exposure",
          description: "Listen to various accents and speaking styles",
          implementation: "Expose yourself to different speakers, regional accents, and speaking contexts to develop flexible listening skills."
        }
      ]
    },
    {
      challenge: "Speaking anxiety",
      description: "Feeling nervous or hesitant to speak the language with others",
      solutions: [
        {
          name: "Preparation and Practice",
          description: "Rehearse common conversations in advance",
          implementation: "Script and practice everyday interactions like ordering food or asking directions before you need to use them in real situations."
        },
        {
          name: "Language Exchange Partnerships",
          description: "Practice with patient partners in a low-pressure environment",
          implementation: "Find language exchange partners online or locally who are learning your language, creating a mutually supportive learning environment."
        },
        {
          name: "Progressive Exposure",
          description: "Gradually increase speaking challenges",
          implementation: "Start with simple exchanges with patient listeners, then progressively challenge yourself with longer conversations or less familiar topics."
        },
        {
          name: "Focus on Communication, Not Perfection",
          description: "Shift goal from error-free speech to successful communication",
          implementation: "Remind yourself that successful communication, not perfect grammar or accent, is the goal. Celebrate successful exchanges regardless of mistakes."
        }
      ]
    },
    {
      challenge: "Plateau in progress",
      description: "Feeling stuck at an intermediate level without noticeable improvement",
      solutions: [
        {
          name: "Content-Based Learning",
          description: "Shift from language-focused to content-focused learning",
          implementation: "Study topics that interest you in the target language rather than studying the language itself. Take courses, pursue hobbies, or explore interests using the language as a tool."
        },
        {
          name: "Deliberate Practice",
          description: "Identify and target specific weaknesses",
          implementation: "Analyze your specific weaknesses, create focused exercises to address them, get expert feedback, and measure progress systematically."
        },
        {
          name: "Expand Register and Complexity",
          description: "Learn language for different contexts and purposes",
          implementation: "Study formal/informal variations, slang, professional terminology, and advanced grammatical structures that native speakers use in different contexts."
        },
        {
          name: "Set New Challenging Goals",
          description: "Create concrete objectives beyond general fluency",
          implementation: "Prepare for advanced proficiency exams, commit to giving a presentation, write a blog in the language, or set other specific, measurable goals."
        }
      ]
    },
    {
      challenge: "Finding time to practice",
      description: "Struggling to maintain consistent language practice with a busy schedule",
      solutions: [
        {
          name: "Habit Stacking",
          description: "Attach language learning to existing daily habits",
          implementation: "Study while commuting, listen to podcasts while exercising, review flashcards during coffee breaks, or label household items for passive exposure."
        },
        {
          name: "Microlearning",
          description: "Break learning into very short, focused sessions",
          implementation: "Use 5-10 minute breaks throughout the day for targeted practice: 3 new vocabulary words, 1 grammar concept, or a short listening exercise."
        },
        {
          name: "Digital Tools Integration",
          description: "Use technology to create immersion opportunities",
          implementation: "Change phone/social media language settings, use language learning browser extensions, or set up news feeds in the target language."
        },
        {
          name: "Weekly Planning and Tracking",
          description: "Schedule language sessions and monitor consistency",
          implementation: "Set specific times for language practice in your calendar, track your learning activities, and adjust based on what's working with your schedule."
        }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="language-learning-interface">
      <div class="language-header">
        <div class="language-icon">
          <i class="fas fa-language"></i>
        </div>
        <div class="language-title">
          <h2>Language Learning Assistant</h2>
          <p>Interactive assistance for learning new languages</p>
        </div>
      </div>
      
      <div class="language-selector">
        <div class="section-header">
          <h3>Choose a Language</h3>
          <p>Select a language to explore resources and tips</p>
        </div>
        
        <div class="language-grid">
          <!-- Language cards will be dynamically generated -->
        </div>
        
        <div class="selected-language hidden" id="selected-language">
          <div class="selected-header">
            <h4 id="language-name">Spanish</h4>
            <button id="back-to-languages" class="back-button">
              <i class="fas fa-arrow-left"></i> Back to Languages
            </button>
          </div>
          
          <div class="language-info" id="language-info">
            <!-- Selected language information will be loaded here -->
          </div>
          
          <div class="language-phrases" id="language-phrases">
            <!-- Language phrases will be loaded here -->
          </div>
          
          <div class="language-resources" id="language-resources">
            <!-- Language resources will be loaded here -->
          </div>
        </div>
      </div>
      
      <div class="learning-methods">
        <div class="section-header">
          <h3>Learning Methods</h3>
          <p>Effective approaches to language acquisition</p>
        </div>
        
        <div class="methods-tabs">
          <button class="method-tab active" data-method="grammar">Grammar Translation</button>
          <button class="method-tab" data-method="communicative">Communicative</button>
          <button class="method-tab" data-method="audio">Audio-Lingual</button>
          <button class="method-tab" data-method="tpr">TPR</button>
          <button class="method-tab" data-method="natural">Natural Approach</button>
          <button class="method-tab" data-method="task">Task-Based</button>
          <button class="method-tab" data-method="srs">Spaced Repetition</button>
          <button class="method-tab" data-method="immersion">Immersion</button>
        </div>
        
        <div class="method-content" id="method-content">
          <!-- Method content will be loaded here -->
        </div>
      </div>
      
      <div class="vocabulary-strategies">
        <div class="section-header">
          <h3>Vocabulary Building Strategies</h3>
          <p>Effective techniques for learning and remembering words</p>
        </div>
        
        <div class="strategies-container">
          <!-- Strategy cards will be dynamically generated -->
        </div>
      </div>
      
      <div class="common-challenges">
        <div class="section-header">
          <h3>Common Challenges</h3>
          <p>Solutions for typical language learning difficulties</p>
        </div>
        
        <div class="challenges-accordion" id="challenges-accordion">
          <!-- Challenges will be loaded here -->
        </div>
      </div>
      
      <div class="practice-tools">
        <div class="section-header">
          <h3>Practice Tools</h3>
          <p>Interactive exercises to practice language skills</p>
        </div>
        
        <div class="tools-container">
          <div class="tool-card" id="phrase-practice-tool">
            <div class="tool-icon">
              <i class="fas fa-comments"></i>
            </div>
            <div class="tool-info">
              <h4>Common Phrases Practice</h4>
              <p>Learn essential expressions for everyday situations</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="pronunciation-tool">
            <div class="tool-icon">
              <i class="fas fa-microphone"></i>
            </div>
            <div class="tool-info">
              <h4>Pronunciation Guide</h4>
              <p>Detailed guidance for difficult sounds</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="grammar-checker-tool">
            <div class="tool-icon">
              <i class="fas fa-check-square"></i>
            </div>
            <div class="tool-info">
              <h4>Grammar Checker</h4>
              <p>Get feedback on your writing</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="vocabulary-quiz-tool">
            <div class="tool-icon">
              <i class="fas fa-puzzle-piece"></i>
            </div>
            <div class="tool-info">
              <h4>Vocabulary Quiz Generator</h4>
              <p>Create custom quizzes for vocabulary practice</p>
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
    .language-learning-interface {
      background: linear-gradient(to bottom right, rgba(134, 239, 172, 0.1), rgba(59, 130, 246, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(134, 239, 172, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .language-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .language-icon {
      font-size: 2.5rem;
      color: #4ade80;
      margin-right: 1rem;
    }
    
    .language-title h2 {
      color: #4ade80;
      margin-bottom: 0.3rem;
    }
    
    .language-title p {
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
    
    .language-selector, .learning-methods, .vocabulary-strategies, .common-challenges, .practice-tools {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Language Grid */
    .language-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .language-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .language-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(74, 222, 128, 0.3);
    }
    
    .language-flag {
      font-size: 2rem;
    }
    
    .language-label {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
    
    /* Selected Language View */
    .selected-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    
    .selected-header h4 {
      color: #f3f4f6;
      font-size: 1.1rem;
    }
    
    .back-button {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 6px;
      padding: 0.5rem 0.75rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .back-button:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .language-info {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.25rem;
    }
    
    .info-header {
      color: #f3f4f6;
      font-size: 1rem;
      margin-bottom: 0.75rem;
    }
    
    .features-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .features-list li {
      margin-bottom: 0.3rem;
    }
    
    .difficulty-indicator {
      display: inline-block;
      background: rgba(74, 222, 128, 0.15);
      color: #4ade80;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    
    /* Language Phrases */
    .language-phrases {
      margin-bottom: 1.25rem;
    }
    
    .phrases-title {
      color: #f3f4f6;
      font-size: 1rem;
      margin-bottom: 0.75rem;
    }
    
    .phrases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .phrase-card {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      border-left: 3px solid #4ade80;
    }
    
    .phrase-text {
      color: #4ade80;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .phrase-translation {
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }
    
    .phrase-pronunciation {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    /* Language Resources */
    .resources-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .resource-item {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      border-left: 3px solid #60a5fa;
    }
    
    /* Methods Tabs */
    .methods-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 0.75rem;
    }
    
    .method-tab {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .method-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .method-tab.active {
      background: rgba(74, 222, 128, 0.2);
      color: #4ade80;
    }
    
    /* Method Content */
    .method-content {
      color: #e2e8f0;
    }
    
    .method-name {
      color: #4ade80;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .method-description {
      color: #cbd5e1;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    
    .method-evaluation {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .strengths, .limitations {
      flex: 1;
      min-width: 250px;
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .eval-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .strengths .eval-header {
      color: #4ade80;
    }
    
    .limitations .eval-header {
      color: #f87171;
    }
    
    .eval-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .eval-list li {
      margin-bottom: 0.3rem;
    }
    
    .method-suitability {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    .suitability-header {
      color: #60a5fa;
      margin-bottom: 0.5rem;
    }
    
    .suitability-text {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .method-activities {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .activities-header {
      color: #c084fc;
      margin-bottom: 0.5rem;
    }
    
    .activities-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .activities-list li {
      margin-bottom: 0.3rem;
    }
    
    /* Vocabulary Strategies */
    .strategies-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .strategy-card {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      height: 100%;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
    }
    
    .strategy-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
    }
    
    .strategy-name {
      color: #4ade80;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .strategy-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
      flex-grow: 1;
    }
    
    .strategy-button {
      align-self: flex-end;
      background: rgba(74, 222, 128, 0.15);
      color: #4ade80;
      border: none;
      border-radius: 4px;
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .strategy-button:hover {
      background: rgba(74, 222, 128, 0.25);
    }
    
    /* Challenges Accordion */
    .challenges-accordion {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .challenge-item {
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .challenge-header {
      background: rgba(15, 23, 42, 0.6);
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    
    .challenge-title {
      color: #f3f4f6;
      font-size: 1rem;
      font-weight: 500;
    }
    
    .challenge-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-top: 0.3rem;
    }
    
    .challenge-icon i {
      color: #4ade80;
      transition: transform 0.3s ease;
    }
    
    .challenge-content {
      background: rgba(15, 23, 42, 0.4);
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .challenge-content.active {
      padding: 1.25rem;
      max-height: 1000px;
    }
    
    .challenge-header.active .challenge-icon i {
      transform: rotate(180deg);
    }
    
    .solutions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .solution-item {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 6px;
      padding: 1rem;
    }
    
    .solution-name {
      color: #4ade80;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .solution-description {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .solution-implementation {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    /* Practice Tools */
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
      background: rgba(74, 222, 128, 0.15);
      color: #4ade80;
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
      color: #4ade80;
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
      background: rgba(74, 222, 128, 0.15);
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state
  currentState: {
    selectedLanguage: null,
    selectedMethod: 'grammar'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Language Learning Assistant Mode');
    
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
      chatInput.placeholder = "Ask questions about language learning, grammar, vocabulary, or practice...";
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
    
    // Populate language cards
    this.populateLanguageCards(container);
    
    // Populate vocabulary strategies
    this.populateVocabularyStrategies(container);
    
    // Populate challenges accordion
    this.populateChallengesAccordion(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize with default selected method
    this.showMethodContent(container, this.currentState.selectedMethod);
  },
  
  // Populate language cards
  populateLanguageCards: function(container) {
    const languageGrid = container.querySelector('.language-grid');
    if (!languageGrid) return;
    
    // Clear existing content
    languageGrid.innerHTML = '';
    
    // Add language cards
    this.supportedLanguages.forEach(lang => {
      const card = document.createElement('div');
      card.className = 'language-card';
      card.dataset.lang = lang.code;
      
      // Get flag emoji for the language
      const flagEmoji = this.getFlagEmoji(lang.code);
      
      card.innerHTML = `
        <div class="language-flag">${flagEmoji}</div>
        <div class="language-label">${lang.name}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showLanguageDetails(container, lang.code);
      });
      
      languageGrid.appendChild(card);
    });
  },
  
  // Populate vocabulary strategies
  populateVocabularyStrategies: function(container) {
    const strategiesContainer = container.querySelector('.strategies-container');
    if (!strategiesContainer) return;
    
    // Clear existing content
    strategiesContainer.innerHTML = '';
    
    // Add strategy cards
    this.vocabularyStrategies.forEach(strategy => {
      const card = document.createElement('div');
      card.className = 'strategy-card';
      card.dataset.strategy = strategy.name.toLowerCase().replace(/\s+/g, '-');
      
      card.innerHTML = `
        <div class="strategy-name">${strategy.name}</div>
        <div class="strategy-description">${strategy.description}</div>
        <button class="strategy-button">Learn More</button>
      `;
      
      // Add event listener to the button
      const button = card.querySelector('.strategy-button');
      if (button) {
        button.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent the card click event
          this.showVocabularyStrategyDetails(strategy);
        });
      }
      
      // Add event listener to the whole card
      card.addEventListener('click', () => {
        this.showVocabularyStrategyDetails(strategy);
      });
      
      strategiesContainer.appendChild(card);
    });
  },
  
  // Populate challenges accordion
  populateChallengesAccordion: function(container) {
    const accordion = container.querySelector('#challenges-accordion');
    if (!accordion) return;
    
    // Clear existing content
    accordion.innerHTML = '';
    
    // Add challenge items
    this.commonChallenges.forEach(challenge => {
      const item = document.createElement('div');
      item.className = 'challenge-item';
      
      // Create header
      const header = document.createElement('div');
      header.className = 'challenge-header';
      header.innerHTML = `
        <div>
          <div class="challenge-title">${challenge.challenge}</div>
          <div class="challenge-description">${challenge.description}</div>
        </div>
        <div class="challenge-icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      `;
      
      // Create content
      const content = document.createElement('div');
      content.className = 'challenge-content';
      
      // Add solutions to content
      let solutionsHtml = '<div class="solutions-list">';
      challenge.solutions.forEach(solution => {
        solutionsHtml += `
          <div class="solution-item">
            <div class="solution-name">${solution.name}</div>
            <div class="solution-description">${solution.description}</div>
            <div class="solution-implementation">${solution.implementation}</div>
          </div>
        `;
      });
      solutionsHtml += '</div>';
      content.innerHTML = solutionsHtml;
      
      // Add event listener to toggle
      header.addEventListener('click', function() {
        this.classList.toggle('active');
        content.classList.toggle('active');
      });
      
      // Add to accordion
      item.appendChild(header);
      item.appendChild(content);
      accordion.appendChild(item);
    });
  },
  
  // Add event listeners
  addEventListeners: function(container) {
    // Back to languages button
    const backButton = container.querySelector('#back-to-languages');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.hideLanguageDetails(container);
      });
    }
    
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
    
    // Practice tools
    const phrasePracticeTool = container.querySelector('#phrase-practice-tool');
    if (phrasePracticeTool) {
      phrasePracticeTool.addEventListener('click', () => {
        this.openPhrasePracticeTool();
      });
    }
    
    const pronunciationTool = container.querySelector('#pronunciation-tool');
    if (pronunciationTool) {
      pronunciationTool.addEventListener('click', () => {
        this.openPronunciationTool();
      });
    }
    
    const grammarCheckerTool = container.querySelector('#grammar-checker-tool');
    if (grammarCheckerTool) {
      grammarCheckerTool.addEventListener('click', () => {
        this.openGrammarCheckerTool();
      });
    }
    
    const vocabularyQuizTool = container.querySelector('#vocabulary-quiz-tool');
    if (vocabularyQuizTool) {
      vocabularyQuizTool.addEventListener('click', () => {
        this.openVocabularyQuizTool();
      });
    }
  },
  
  // Get flag emoji for a language
  getFlagEmoji: function(langCode) {
    // Map language codes to country codes for flag emojis
    const countryMap = {
      'es': 'ES', // Spain
      'fr': 'FR', // France
      'de': 'DE', // Germany
      'ja': 'JP', // Japan
      'zh': 'CN', // China
      'it': 'IT', // Italy
      'ru': 'RU', // Russia
      'ar': 'SA', // Saudi Arabia
      'ko': 'KR', // South Korea
      'pt': 'PT'  // Portugal
    };
    
    const countryCode = countryMap[langCode] || 'US';
    
    // Convert country code to regional indicator symbols
    // (Unicode flag emoji is formed by regional indicator symbols)
    return String.fromCodePoint(...[...countryCode].map(c => c.charCodeAt(0) + 127397));
  },
  
  // Show language details
  showLanguageDetails: function(container, langCode) {
    // Update current state
    this.currentState.selectedLanguage = langCode;
    
    // Hide language grid
    const languageGrid = container.querySelector('.language-grid');
    if (languageGrid) {
      languageGrid.style.display = 'none';
    }
    
    // Show selected language details
    const selectedLanguage = container.querySelector('#selected-language');
    if (selectedLanguage) {
      selectedLanguage.classList.remove('hidden');
    }
    
    // Find language data
    const languageData = this.supportedLanguages.find(lang => lang.code === langCode);
    if (!languageData) return;
    
    // Update language name
    const languageName = container.querySelector('#language-name');
    if (languageName) {
      languageName.textContent = languageData.name;
    }
    
    // Update language info
    const languageInfo = container.querySelector('#language-info');
    if (languageInfo) {
      languageInfo.innerHTML = `
        <div class="info-header">Key Features</div>
        <ul class="features-list">
          ${languageData.keyFeatures.map(feature => `
            <li>${feature}</li>
          `).join('')}
        </ul>
        <div class="difficulty-indicator">${languageData.difficulty}</div>
      `;
    }
    
    // Update language phrases
    const languagePhrases = container.querySelector('#language-phrases');
    if (languagePhrases) {
      languagePhrases.innerHTML = `
        <div class="phrases-title">Useful Phrases</div>
        <div class="phrases-grid">
          ${languageData.usefulPhrases.map(phrase => `
            <div class="phrase-card">
              <div class="phrase-text">${phrase.phrase}</div>
              <div class="phrase-translation">${phrase.translation}</div>
              <div class="phrase-pronunciation">Pronunciation: ${phrase.pronounciation}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
    
    // Update language resources
    const languageResources = container.querySelector('#language-resources');
    if (languageResources) {
      languageResources.innerHTML = `
        <div class="phrases-title">Recommended Resources</div>
        <ul class="resources-list">
          ${languageData.resources.map(resource => `
            <li class="resource-item">${resource}</li>
          `).join('')}
        </ul>
      `;
    }
  },
  
  // Hide language details
  hideLanguageDetails: function(container) {
    // Reset current state
    this.currentState.selectedLanguage = null;
    
    // Show language grid
    const languageGrid = container.querySelector('.language-grid');
    if (languageGrid) {
      languageGrid.style.display = 'grid';
    }
    
    // Hide selected language details
    const selectedLanguage = container.querySelector('#selected-language');
    if (selectedLanguage) {
      selectedLanguage.classList.add('hidden');
    }
  },
  
  // Show method content
  showMethodContent: function(container, method) {
    // Update current state
    this.currentState.selectedMethod = method;
    
    const methodContent = container.querySelector('#method-content');
    if (!methodContent) return;
    
    // Map method identifiers to method names
    const methodMap = {
      'grammar': 'Grammar-Translation',
      'communicative': 'Communicative Language Teaching',
      'audio': 'Audio-Lingual Method',
      'tpr': 'Total Physical Response (TPR)',
      'natural': 'Natural Approach',
      'task': 'Task-Based Language Teaching',
      'srs': 'Spaced Repetition',
      'immersion': 'Immersion'
    };
    
    // Find the method data
    const methodData = this.learningMethods.find(m => m.name === methodMap[method]);
    if (!methodData) return;
    
    // Build HTML for method content
    let html = `
      <div class="method-name">${methodData.name}</div>
      <div class="method-description">${methodData.description}</div>
      
      <div class="method-evaluation">
        <div class="strengths">
          <div class="eval-header">
            <i class="fas fa-plus-circle"></i> Strengths
          </div>
          <ul class="eval-list">
            ${methodData.strengths.map(strength => `
              <li>${strength}</li>
            `).join('')}
          </ul>
        </div>
        
        <div class="limitations">
          <div class="eval-header">
            <i class="fas fa-minus-circle"></i> Limitations
          </div>
          <ul class="eval-list">
            ${methodData.limitations.map(limitation => `
              <li>${limitation}</li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <div class="method-suitability">
        <div class="suitability-header">
          <i class="fas fa-user-check"></i> Best For
        </div>
        <div class="suitability-text">${methodData.bestFor}</div>
      </div>
      
      <div class="method-activities">
        <div class="activities-header">
          <i class="fas fa-tasks"></i> Typical Activities
        </div>
        <ul class="activities-list">
          ${methodData.activities.map(activity => `
            <li>${activity}</li>
          `).join('')}
        </ul>
      </div>
    `;
    
    methodContent.innerHTML = html;
  },
  
  // Show vocabulary strategy details
  showVocabularyStrategyDetails: function(strategy) {
    // Generate a prompt for the AI about this strategy
    const prompt = `Please provide a detailed guide about the "${strategy.name}" vocabulary learning strategy, including:

1. Full explanation of how the strategy works
2. Step-by-step implementation guide
3. Examples showing the strategy in action
4. Digital and physical tools that support this approach
5. How to adapt the strategy for different learning styles and language families
6. Common pitfalls and how to avoid them

The strategy description is: ${strategy.description}

Some implementation tips include:
${strategy.implementation.map(tip => `- ${tip}`).join('\n')}

Additional tips:
${strategy.tips.map(tip => `- ${tip}`).join('\n')}

Please provide a comprehensive guide that a language learner can follow to effectively use this strategy.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Common Phrases Practice tool
  openPhrasePracticeTool: function() {
    let prompt = `I'd like to use the Common Phrases Practice tool. Please help me learn essential phrases for everyday situations by providing:

1. A set of 10-15 useful everyday phrases organized by common situation (greetings, shopping, dining, emergencies, etc.)
2. For each phrase include:
   - The phrase in the target language
   - English translation
   - Pronunciation guide
   - Cultural notes or usage tips
3. Follow-up practice questions to test my understanding

`;

    // If a language is selected, customize for that language
    if (this.currentState.selectedLanguage) {
      const language = this.supportedLanguages.find(lang => lang.code === this.currentState.selectedLanguage);
      if (language) {
        prompt += `Please focus on ${language.name} phrases specifically.`;
      }
    } else {
      prompt += `Please ask me which language I'm interested in learning.`;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Pronunciation Guide tool
  openPronunciationTool: function() {
    let prompt = `I'd like to use the Pronunciation Guide tool. Please help me with pronunciation by providing:

1. Explanation of the most challenging sounds in my target language
2. Detailed descriptions of mouth, tongue, and lip positions for producing these sounds
3. Comparison with similar sounds in English (or contrasts if the sound doesn't exist in English)
4. Practice words and tongue twisters focusing on difficult sounds
5. Tips for listening to and recognizing these sounds
6. Common pronunciation mistakes and how to avoid them

`;

    // If a language is selected, customize for that language
    if (this.currentState.selectedLanguage) {
      const language = this.supportedLanguages.find(lang => lang.code === this.currentState.selectedLanguage);
      if (language) {
        prompt += `Please focus on ${language.name} pronunciation specifically.`;
      }
    } else {
      prompt += `Please ask me which language I'm interested in learning.`;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Grammar Checker tool
  openGrammarCheckerTool: function() {
    let prompt = `I'd like to use the Grammar Checker tool. Please help me improve my writing by:

1. Explaining how to use this tool to check my grammar
2. Providing examples of common grammar mistakes in my target language
3. Offering tips for avoiding these common errors
4. Showing me how to submit text for grammar feedback

Please ask me to provide a sample of text in my target language that I'd like checked, along with my own translation or intended meaning.

`;

    // If a language is selected, customize for that language
    if (this.currentState.selectedLanguage) {
      const language = this.supportedLanguages.find(lang => lang.code === this.currentState.selectedLanguage);
      if (language) {
        prompt += `Please focus on ${language.name} grammar specifically.`;
      }
    } else {
      prompt += `Please ask me which language I'm interested in learning.`;
    }
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Vocabulary Quiz tool
  openVocabularyQuizTool: function() {
    let prompt = `I'd like to use the Vocabulary Quiz Generator tool. Please help me practice vocabulary by:

1. Asking me which specific vocabulary topic or theme I want to practice
2. Generating a customized vocabulary quiz based on my response
3. Including various question types (multiple choice, fill in the blank, matching, etc.)
4. Providing immediate feedback and explanations for each answer
5. Including a scoring system and final result at the end

`;

    // If a language is selected, customize for that language
    if (this.currentState.selectedLanguage) {
      const language = this.supportedLanguages.find(lang => lang.code === this.currentState.selectedLanguage);
      if (language) {
        prompt += `Please focus on ${language.name} vocabulary specifically.`;
      }
    } else {
      prompt += `Please ask me which language I'm interested in learning.`;
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
    LanguageLearningAssistantMode.init();
  } else {
    window.addEventListener('load', function() {
      LanguageLearningAssistantMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageLearningAssistantMode;
} else {
  window.LanguageLearningAssistantMode = LanguageLearningAssistantMode;
}