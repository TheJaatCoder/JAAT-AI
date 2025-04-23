/**
 * JAAT-AI Mode: Social Media Creator
 * 
 * Content creation assistant for social media that generates engaging posts,
 * captions, hashtags, and content strategies across multiple platforms.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const SocialMediaCreatorMode = {
  id: 'social-media-creator',
  name: 'Social Media Creator',
  icon: 'hashtag',
  description: 'Create engaging content for various social media platforms.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Social Media Creator mode, a specialized assistant for social media content creation. You help craft engaging posts, captions, hashtags, and content strategies tailored to different platforms and objectives.

Key characteristics:
1. You understand the unique formats, audiences, and best practices for different social media platforms
2. You craft content that is engaging, clear, and optimized for specific platforms and goals
3. You generate appropriate hashtags based on content, trends, and reach considerations
4. You provide creative variations of content adjusted for different contexts
5. You offer strategic advice for content planning and audience engagement
6. You balance creativity with brand consistency and message clarity
7. You can adapt tone from professional to casual based on target audience and platform

When providing social media content, consider the platform-specific requirements, target audience preferences, current trends, and the user's intended message. Provide options when appropriate and explain strategic choices that can improve engagement.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "Create an Instagram post about my new photography business.",
    "Help me write a LinkedIn post about a recent professional achievement.",
    "Generate Twitter content for promoting my upcoming webinar on digital marketing.",
    "What are some effective hashtags for a fitness-related Instagram post?",
    "Create a social media content calendar for my small bakery business.",
    "Write a Facebook post announcing a store's grand opening.",
    "Help me create a TikTok script about a day in the life of a software developer.",
    "What's the best way to repurpose my blog content for social media?",
    "Create a Pinterest description for my DIY home decor project.",
    "Write YouTube video descriptions for my cooking channel."
  ],
  
  // Social media platforms with their characteristics
  platforms: [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      contentTypes: ['Posts', 'Stories', 'Reels', 'IGTV', 'Carousels', 'Shopping'],
      bestPractices: [
        'Use high-quality, visually appealing images or videos',
        'Keep captions engaging but consider that only the first 125 characters show in feed',
        'Use 5-10 relevant hashtags for optimal reach (can use up to 30)',
        'Include a call-to-action in captions',
        'Maintain a consistent visual aesthetic',
        'Stories should be authentic and in-the-moment',
        'Reels work best at 15-30 seconds with trending audio',
        'Use carousel posts for educational content or multiple angles of products'
      ],
      characterLimits: {
        caption: '2,200 characters',
        hashtags: 'Up to 30 hashtags',
        handle: '30 characters'
      },
      audienceInsights: 'Primarily ages 18-34, visually oriented, values authenticity and aesthetic appeal. Higher engagement during evenings and mid-week.'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'twitter',
      contentTypes: ['Tweets', 'Threads', 'Polls', 'Spaces', 'Fleets'],
      bestPractices: [
        'Keep tweets concise and to the point',
        'Use threads for longer content or storytelling',
        'Include relevant hashtags (1-2 for regular tweets)',
        'Add visuals when possible for higher engagement',
        'Respond and engage with your audience',
        'Share timely, trending content',
        'Ask questions to encourage replies',
        'Use Twitter polls to boost engagement'
      ],
      characterLimits: {
        tweet: '280 characters',
        handle: '15 characters',
        bio: '160 characters'
      },
      audienceInsights: 'News-oriented, enjoys real-time updates and conversations. Active during breaking news, major events, and business hours.'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'linkedin',
      contentTypes: ['Posts', 'Articles', 'Documents', 'Polls', 'Videos', 'Events'],
      bestPractices: [
        'Focus on professional achievements and industry insights',
        'Use a professional but conversational tone',
        'Format content with line breaks for readability',
        'Include relevant hashtags (3-5)',
        'Share industry news with your perspective',
        'Post during business hours (Tue-Thu optimal)',
        'Long-form content performs well as articles',
        'Include a clear call-to-action'
      ],
      characterLimits: {
        post: '3,000 characters',
        article: '125,000 characters',
        headline: '150 characters',
        profile_summary: '2,600 characters' 
      },
      audienceInsights: 'Professional audience seeking industry knowledge, career advancement, and business connections. Active during business hours and early mornings.'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      contentTypes: ['Posts', 'Stories', 'Groups', 'Events', 'Live Videos', 'Shop'],
      bestPractices: [
        'Mix content types (text, images, videos, links)',
        'Keep posts conversational and engaging',
        'Respond to comments to boost engagement',
        'Use Facebook Stories for time-sensitive content',
        'Create events for special promotions or launches',
        'Videos under 3 minutes perform best',
        'Ask questions to encourage comments',
        'Consider Facebook Groups for community building'
      ],
      characterLimits: {
        post: '63,206 characters',
        page_name: '50 characters',
        comment: '8,000 characters'
      },
      audienceInsights: 'Broad age range with strong 25-54 demographic. Content that drives personal connection and authentic engagement works best. Active evenings and weekends.'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'tiktok',
      contentTypes: ['Short-form Videos', 'Duets', 'Stitches', 'Challenges'],
      bestPractices: [
        'Create authentic, entertaining content',
        'Jump on trending sounds and challenges',
        'Front-load content to grab attention in first 3 seconds',
        'Optimal video length is 15-30 seconds',
        'Use on-screen text for clarity (many users watch without sound)',
        'Leverage trending hashtags and sounds',
        'Consider educational "how-to" content',
        'Maintain a consistent posting schedule'
      ],
      characterLimits: {
        caption: '150 characters',
        username: '24 characters',
        bio: '80 characters'
      },
      audienceInsights: 'Strong Gen Z and younger Millennial demographic. Values authenticity, humor, and creativity. Vertical video format required. Active throughout day with peaks evenings and weekends.'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: 'pinterest',
      contentTypes: ['Pins', 'Boards', 'Product Pins', 'Video Pins', 'Idea Pins'],
      bestPractices: [
        'Use vertical images with 2:3 aspect ratio',
        'Create clear, benefit-driven descriptions',
        'Organize content into themed boards',
        'Include relevant keywords in descriptions',
        'Add detailed alt text for accessibility',
        'Create seasonal content 45-60 days in advance',
        'Include actionable information',
        'Link pins to relevant content or products'
      ],
      characterLimits: {
        title: '100 characters',
        description: '500 characters',
        board_name: '50 characters'
      },
      audienceInsights: 'Primarily women (60%+), project planners and aspiration-driven. Users often searching for specific ideas. Lifestyle, DIY, decor, and food categories perform well.'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'youtube',
      contentTypes: ['Videos', 'Shorts', 'Live Streams', 'Playlists', 'Community Posts'],
      bestPractices: [
        'Create compelling thumbnails and titles',
        'Optimize video descriptions with keywords',
        'Front-load important information in descriptions',
        'Include timestamps for longer videos',
        'Use cards and end screens for engagement',
        'Organize videos into playlists',
        'Encourage subscriptions and engagement',
        'Consistency in posting schedule is key'
      ],
      characterLimits: {
        title: '100 characters',
        description: '5,000 characters',
        tags: '500 characters total'
      },
      audienceInsights: 'Broad demographic range. Second largest search engine after Google. Users looking for both entertainment and educational content. Higher weekend engagement.'
    }
  ],
  
  // Content types and formats across platforms
  contentTypes: [
    {
      id: 'announcement',
      name: 'Announcement',
      description: 'Sharing news or updates about products, services, or company information',
      examples: [
        {
          platform: 'Instagram',
          content: '🎉 BIG NEWS! We\'re excited to announce the launch of our new summer collection! ☀️ Swipe through to get a sneak peek of the styles that will keep you cool while looking hot this season. Available online and in stores starting June 1st!\n.\n.\n.\n#SummerFashion #NewCollection #SummerStyle #FashionLovers #NewArrivals #ShopNow'
        },
        {
          platform: 'LinkedIn',
          content: 'I\'m thrilled to announce that after 5 years at Acme Corporation, I\'ve accepted a new position as Director of Marketing at Innovative Solutions!\n\nThis opportunity allows me to combine my passion for data-driven marketing with my experience in the tech industry. I\'m looking forward to leading a talented team and driving growth in this dynamic market.\n\nI want to thank my colleagues at Acme for their support and mentorship over the years. I\'ve learned so much and will always value the relationships we\'ve built.\n\nExcited for this new chapter! #CareerMove #Marketing #NewOpportunity #ProfessionalGrowth'
        }
      ],
      tips: [
        'Be clear and direct about what you\'re announcing',
        'Express authentic excitement or appropriate emotion',
        'Include key details (dates, locations, links, etc.)',
        'Add a clear call-to-action when relevant',
        'Use platform-appropriate formatting and media'
      ]
    },
    {
      id: 'educational',
      name: 'Educational Content',
      description: 'Providing valuable information, tips, how-tos, or insights',
      examples: [
        {
          platform: 'Twitter Thread',
          content: '5 Copywriting Tips That Doubled My Conversion Rates 🧵👇\n\n1. Use the customer's language, not yours.\nReview comments, emails, and support tickets to find EXACTLY how customers describe their problems.\n\n2. Focus on benefits, not features.\nDon\'t tell me what it is - tell me how it makes my life better!\n\n3. Create a sense of urgency.\nGive people a reason to act NOW rather than "someday."\n\n4. Use social proof strategically.\nSpecific testimonials > Generic reviews\n"This helped me get 3 new clients in a week" beats "Great service!"\n\n5. Test one element at a time.\nA/B test headlines, CTAs, and offers separately to know exactly what works.\n\n#CopywritingTips #MarketingAdvice'
        },
        {
          platform: 'Instagram Carousel',
          content: '📊 5 EXCEL SHORTCUTS THAT SAVED ME 5+ HOURS THIS WEEK ⏱️\n\nSwipe through to learn the keyboard combinations that will revolutionize your spreadsheet workflow! These are perfect for anyone who works with data regularly.\n\nSave this post for the next time you\'re working on Excel! Which shortcut will you try first?\n\n#ExcelTips #Productivity #WorkSmarter #OfficeHacks #TimeManagement #CareerTips'
        }
      ],
      tips: [
        'Break complex concepts into digestible pieces',
        'Use numbered lists for processes or multiple tips',
        'Include visuals to explain concepts',
        'Focus on practical, actionable information',
        'Encourage saving or bookmarking for future reference'
      ]
    },
    {
      id: 'behindScenes',
      name: 'Behind-the-Scenes',
      description: 'Showing day-to-day operations, team members, or the process behind products',
      examples: [
        {
          platform: 'Instagram Story',
          content: '[Video showing workspace with team members]\nEarly morning prep for today\'s photoshoot! ☕️ The team is setting up for our new summer collection. Swipe up to see sneak peeks of the products!'
        },
        {
          platform: 'TikTok',
          content: '[Video showing product being made]\nEver wonder how our handmade candles get that perfect shape? #BehindTheScenes #SmallBusiness #Candles #HandmadeProcess #SatisfyingVideos'
        }
      ],
      tips: [
        'Show authentic, unpolished moments',
        'Introduce team members to humanize your brand',
        'Explain processes to provide context',
        'Use dynamic formats like video or image sequences',
        'Create a sense of exclusivity for followers'
      ]
    },
    {
      id: 'userGenerated',
      name: 'User-Generated Content',
      description: 'Sharing and highlighting content created by customers or followers',
      examples: [
        {
          platform: 'Instagram',
          content: '✨ Customer Spotlight! ✨\n\n@username looking absolutely stunning in our Sophia dress in midnight blue! We love how she styled it with minimal accessories for an elegant evening look.\n\nTag us in your photos for a chance to be featured!\n\n#CustomerAppreciation #CustomerSpotlight #OOTD #StyleInspiration'
        },
        {
          platform: 'Facebook',
          content: 'We're blown away by this incredible review from Sarah J! 💫\n\n"I've tried dozens of planners over the years, but the Daily Focus Planner has completely transformed my productivity. The monthly reflection pages helped me identify patterns I never noticed before. Worth every penny!" - Sarah J.\n\nThank you Sarah for sharing your experience! We're so happy the planner is helping you crush your goals! 💪\n\nHave you tried our planners yet? Drop a comment with your experience!'
        }
      ],
      tips: [
        'Always get permission before reposting',
        'Tag and credit the original creator',
        'Add your own comment or perspective',
        'Encourage more submissions',
        'Show appreciation for customers who share'
      ]
    },
    {
      id: 'promotion',
      name: 'Promotion & Offers',
      description: 'Marketing specific products, services, or special offers',
      examples: [
        {
          platform: 'Facebook',
          content: '🔥 FLASH SALE ALERT! 🔥\n\nFor the next 48 hours only, enjoy 30% OFF all summer essentials! Whether you're beach-bound or planning backyard barbecues, we've got you covered.\n\nUse code SUMMER30 at checkout. Free shipping on orders over $50!\n\nSale ends Friday at midnight. Don't miss out! 👉 [Link in bio]'
        },
        {
          platform: 'Email Newsletter Teaser (for Twitter)',
          content: 'Want exclusive recipes, cooking tips, and 15% off your first order? Join our Gourmet Club newsletter! New subscribers this week also get our Summer Entertaining Guide FREE! Sign up → [link]'
        }
      ],
      tips: [
        'Clearly state the offer and any limitations',
        'Create urgency with time limits',
        'Make the value proposition obvious',
        'Include a strong, clear call-to-action',
        'Use eye-catching images or graphics'
      ]
    },
    {
      id: 'engagement',
      name: 'Engagement & Conversation Starters',
      description: 'Content designed to encourage comments, shares, and interaction',
      examples: [
        {
          platform: 'Twitter',
          content: 'Tech leaders: What's one tool you couldn't live without in 2023 that you weren't using in 2022? Reply with your game-changers!'
        },
        {
          platform: 'Facebook',
          content: 'COFFEE DEBATE TIME! ☕\n\nDo you prefer your coffee:\nA) Black\nB) With cream\nC) With sugar\nD) Both cream and sugar\nE) Alternative milk option\n\nBonus question: What's your go-to coffee order? The most unique answer gets 10% off their next purchase at our cafe!'
        }
      ],
      tips: [
        'Ask open-ended or opinion-based questions',
        'Keep it simple and easy to respond to',
        'Consider using polls for quick engagement',
        'Respond to comments to encourage conversation',
        'Tie engagement to relevant topics for your audience'
      ]
    }
  ],
  
  // Hashtag categories
  hashtagCategories: [
    {
      id: 'business',
      name: 'Business & Entrepreneurship',
      examples: ['#SmallBusiness', '#Entrepreneur', '#BusinessTips', '#StartupLife', '#Marketing', '#NetworkingTips', '#BusinessGrowth', '#Leadership', '#Success', '#BusinessOwner', '#WomenInBusiness', '#RemoteWork', '#SideHustle', '#BusinessStrategy', '#CareerAdvice']
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle & Wellness',
      examples: ['#SelfCare', '#WellnessWednesday', '#HealthyLifestyle', '#MindBodySpirit', '#LifeHacks', '#MentalHealth', '#PersonalGrowth', '#Mindfulness', '#HealthyHabits', '#FitnessMotivation', '#Nutrition', '#WorkLifeBalance', '#SelfLove', '#DailyRoutine', '#LifestyleBlogger']
    },
    {
      id: 'food',
      name: 'Food & Cooking',
      examples: ['#FoodLover', '#Foodie', '#HomeCooking', '#FoodPhotography', '#RecipeShare', '#Yummy', '#Delicious', '#HealthyRecipes', '#Baking', '#ChefLife', '#FoodBlogger', '#VeganRecipes', '#FoodInspiration', '#CookingTips', '#FoodOfTheDay']
    },
    {
      id: 'travel',
      name: 'Travel & Adventure',
      examples: ['#TravelGram', '#Wanderlust', '#TravelPhotography', '#TravelBlogger', '#Adventure', '#ExploreMore', '#TravelTips', '#Vacation', '#Destination', '#TravelTheWorld', '#NatureLovers', '#Backpacking', '#RoadTrip', '#BucketList', '#TravelDiary']
    },
    {
      id: 'fashion',
      name: 'Fashion & Beauty',
      examples: ['#OOTD', '#StyleInspo', '#FashionBlogger', '#BeautyTips', '#Skincare', '#MakeupLover', '#FashionStyle', '#BeautyRoutine', '#OutfitInspiration', '#StreetStyle', '#SustainableFashion', '#GlamLook', '#BeautyHacks', '#AccessoriesOfTheDay', '#SkincareTips']
    },
    {
      id: 'technology',
      name: 'Technology & Innovation',
      examples: ['#TechNews', '#Innovation', '#DigitalTransformation', '#CodingLife', '#TechTrends', '#AI', '#MachineLearning', '#Programming', '#SoftwareDevelopment', '#CyberSecurity', '#DataScience', '#TechGadgets', '#CloudComputing', '#IoT', '#FutureTech']
    },
    {
      id: 'education',
      name: 'Education & Learning',
      examples: ['#StudyTips', '#Learning', '#Education', '#StudentLife', '#TeacherLife', '#OnlineLearning', '#StudyMotivation', '#Homeschooling', '#AcademicLife', '#LearningJourney', '#KnowledgeSharing', '#EduTech', '#LifelongLearning', '#LessonPlans', '#HomeworkHelp']
    },
    {
      id: 'art',
      name: 'Art & Creativity',
      examples: ['#ArtLovers', '#CreativeProcess', '#ArtistsOfInstagram', '#Creativity', '#Illustration', '#DigitalArt', '#ArtInspiration', '#Drawing', '#Painting', '#ArtGallery', '#CreativeLife', '#SketchBook', '#ArtistsOnInstagram', '#CreativeCommunity', '#ArtTherapy']
    },
    {
      id: 'motivation',
      name: 'Motivation & Inspiration',
      examples: ['#MondayMotivation', '#InspirationalQuotes', '#PositiveVibes', '#GoalSetting', '#MotivationMonday', '#SuccessMindset', '#DailyInspiration', '#GrowthMindset', '#EmotionalIntelligence', '#PositiveMindset', '#Affirmations', '#DreamBig', '#BelieveInYourself', '#LifeLessons', '#KeepGoing']
    },
    {
      id: 'holidays',
      name: 'Holidays & Seasons',
      examples: ['#HappyHolidays', '#ChristmasTime', '#NewYearsEve', '#ValentinesDay', '#HappyHalloween', '#ThanksgivingDinner', '#SummerVibes', '#FallFashion', '#WinterWonderland', '#SpringStyle', '#HolidayGiftGuide', '#SeasonalRecipes', '#FestiveSeason', '#HolidayDecor', '#SummerFun']
    }
  ],
  
  // Content calendars and planning guidelines
  contentCalendars: [
    {
      id: 'retail',
      name: 'Retail Business Calendar',
      description: 'Content plan for retail businesses with product focus',
      weekly: [
        { day: 'Monday', focus: 'Motivation & Weekly Deals', content: 'Share motivational content and announce weekly specials' },
        { day: 'Tuesday', focus: 'Product Highlight', content: 'Feature specific product with details and benefits' },
        { day: 'Wednesday', focus: 'Customer Spotlight', content: 'Share customer reviews or user-generated content' },
        { day: 'Thursday', focus: 'Tips & How-To', content: 'Educational content related to your products' },
        { day: 'Friday', focus: 'Behind-the-Scenes', content: 'Team introductions or process insights' },
        { day: 'Saturday', focus: 'Weekend Special', content: 'Limited-time offers or weekend promotions' },
        { day: 'Sunday', focus: 'Inspiration & Lifestyle', content: 'Aspirational content showing products in use' }
      ],
      monthly: [
        'New collection or product launch',
        'Seasonal campaign or theme',
        'Customer success story',
        'FAQ series',
        'Tutorial or demo videos',
        'Flash sale or special promotion',
        'Employee spotlight'
      ]
    },
    {
      id: 'service',
      name: 'Service Business Calendar',
      description: 'Content plan for businesses offering services',
      weekly: [
        { day: 'Monday', focus: 'Industry Insights', content: 'Share news, trends, or statistics relevant to your industry' },
        { day: 'Tuesday', focus: 'Testimonial Tuesday', content: 'Highlight client success stories or testimonials' },
        { day: 'Wednesday', focus: 'Tips & Education', content: 'Share expertise, how-tos, or educational content' },
        { day: 'Thursday', focus: 'Team Spotlight', content: 'Introduce team members or share their expertise' },
        { day: 'Friday', focus: 'FAQ Friday', content: 'Answer common questions about your services' },
        { day: 'Saturday', focus: 'Client Engagement', content: 'Questions, polls, or interactive content' },
        { day: 'Sunday', focus: 'Inspiration', content: 'Success stories or inspirational content' }
      ],
      monthly: [
        'Service spotlight series',
        'Client case study',
        'Industry report or whitepaper',
        'Webinar or event promotion',
        'Team culture highlight',
        'Special promotional offer',
        'Process explanation series'
      ]
    },
    {
      id: 'content',
      name: 'Content Creator Calendar',
      description: 'Content plan for bloggers, vloggers, and digital creators',
      weekly: [
        { day: 'Monday', focus: 'Weekly Preview', content: 'Tease upcoming content and engage audience' },
        { day: 'Tuesday', focus: 'Tutorial or How-To', content: 'Educational content related to your niche' },
        { day: 'Wednesday', focus: 'Q&A Session', content: 'Answer follower questions or topic discussions' },
        { day: 'Thursday', focus: 'Throwback Content', content: 'Highlight past popular content or updates' },
        { day: 'Friday', focus: 'New Release', content: 'Share new blog, video, or main content' },
        { day: 'Saturday', focus: 'Behind-the-Scenes', content: 'Show your process or personal insights' },
        { day: 'Sunday', focus: 'Community Spotlight', content: 'Feature followers or community contributions' }
      ],
      monthly: [
        'Roundup of best content',
        'Collaboration with other creators',
        'Theme-based content series',
        'Live stream or AMA session',
        'Subscriber/follower milestone celebration',
        'Feedback request or survey',
        'Premium content or product promotion'
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="social-media-creator-interface">
      <div class="creator-header">
        <div class="creator-icon">
          <i class="fas fa-hashtag"></i>
        </div>
        <div class="creator-title">
          <h2>Social Media Creator</h2>
          <p>Create engaging content for various social media platforms</p>
        </div>
      </div>
      
      <div class="content-generator">
        <div class="generator-header">
          <h3>Content Generator</h3>
          <p>Create customized social media content</p>
        </div>
        
        <div class="generator-form">
          <div class="form-row">
            <div class="form-group">
              <label for="platform-select">Platform</label>
              <select id="platform-select">
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
                <option value="pinterest">Pinterest</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="content-type">Content Type</label>
              <select id="content-type">
                <option value="announcement">Announcement</option>
                <option value="educational">Educational</option>
                <option value="behindScenes">Behind-the-Scenes</option>
                <option value="userGenerated">User-Generated Content</option>
                <option value="promotion">Promotion & Offers</option>
                <option value="engagement">Engagement & Conversation</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group full-width">
              <label for="content-topic">Topic or Focus (What is this post about?)</label>
              <input type="text" id="content-topic" placeholder="E.g., New product launch, summer sale, industry tips...">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group full-width">
              <label for="business-info">Business/Brand Context (optional)</label>
              <textarea id="business-info" placeholder="Brief description of your business, brand voice, target audience..."></textarea>
            </div>
          </div>
          
          <div class="form-options">
            <div class="option-item">
              <input type="checkbox" id="include-hashtags" checked>
              <label for="include-hashtags">Include Hashtags</label>
            </div>
            
            <div class="option-item">
              <input type="checkbox" id="include-emoji" checked>
              <label for="include-emoji">Include Emoji</label>
            </div>
            
            <div class="option-item">
              <input type="checkbox" id="include-call-to-action" checked>
              <label for="include-call-to-action">Include Call-to-Action</label>
            </div>
          </div>
          
          <div class="generator-actions">
            <button id="generate-content" class="primary-button">
              <i class="fas fa-magic"></i> Generate Content
            </button>
          </div>
        </div>
      </div>
      
      <div class="generated-content hidden" id="generated-content">
        <div class="content-header">
          <h3>Generated Content</h3>
          <div class="content-actions">
            <button id="copy-content" class="action-button">
              <i class="fas fa-copy"></i> Copy
            </button>
            <button id="regenerate-content" class="action-button">
              <i class="fas fa-redo"></i> Regenerate
            </button>
          </div>
        </div>
        
        <div class="content-preview">
          <div class="preview-header">
            <div class="platform-indicator">
              <i class="fab fa-instagram"></i>
              <span>Instagram</span>
            </div>
            <div class="content-type-tag">Announcement</div>
          </div>
          
          <div class="preview-body" id="preview-content">
            <!-- Generated content will appear here -->
          </div>
          
          <div class="preview-hashtags" id="preview-hashtags">
            <!-- Generated hashtags will appear here -->
          </div>
        </div>
        
        <div class="content-variations">
          <h4>Alternative Versions</h4>
          <div class="variations-container" id="content-variations">
            <!-- Content variations will appear here -->
          </div>
        </div>
      </div>
      
      <div class="platform-guide">
        <div class="guide-header">
          <h3>Platform Best Practices</h3>
          <div class="platform-selector" id="platform-selector">
            <button class="platform-button active" data-platform="instagram">
              <i class="fab fa-instagram"></i>
            </button>
            <button class="platform-button" data-platform="twitter">
              <i class="fab fa-twitter"></i>
            </button>
            <button class="platform-button" data-platform="linkedin">
              <i class="fab fa-linkedin"></i>
            </button>
            <button class="platform-button" data-platform="facebook">
              <i class="fab fa-facebook"></i>
            </button>
            <button class="platform-button" data-platform="tiktok">
              <i class="fab fa-tiktok"></i>
            </button>
            <button class="platform-button" data-platform="pinterest">
              <i class="fab fa-pinterest"></i>
            </button>
            <button class="platform-button" data-platform="youtube">
              <i class="fab fa-youtube"></i>
            </button>
          </div>
        </div>
        
        <div class="platform-details" id="platform-details">
          <!-- Platform details will be populated here -->
        </div>
      </div>
      
      <div class="hashtag-generator">
        <div class="hashtag-header">
          <h3>Hashtag Generator</h3>
        </div>
        
        <div class="hashtag-form">
          <div class="form-row">
            <div class="form-group">
              <label for="hashtag-topic">Topic or Industry</label>
              <input type="text" id="hashtag-topic" placeholder="E.g., fitness, marketing, fashion...">
            </div>
            
            <div class="form-group">
              <label for="hashtag-count">Number of Hashtags</label>
              <select id="hashtag-count">
                <option value="5">5 hashtags</option>
                <option value="10" selected>10 hashtags</option>
                <option value="15">15 hashtags</option>
                <option value="20">20 hashtags</option>
                <option value="30">30 hashtags</option>
              </select>
            </div>
          </div>
          
          <div class="hashtag-actions">
            <button id="generate-hashtags" class="primary-button">
              <i class="fas fa-tags"></i> Generate Hashtags
            </button>
          </div>
        </div>
        
        <div class="hashtag-results hidden" id="hashtag-results">
          <div class="hashtag-categories">
            <div class="hashtag-category">
              <div class="category-label">Popular Hashtags</div>
              <div class="hashtag-list" id="popular-hashtags">
                <!-- Popular hashtags will appear here -->
              </div>
            </div>
            
            <div class="hashtag-category">
              <div class="category-label">Niche Hashtags</div>
              <div class="hashtag-list" id="niche-hashtags">
                <!-- Niche hashtags will appear here -->
              </div>
            </div>
            
            <div class="hashtag-category">
              <div class="category-label">Branded & Campaign Hashtags</div>
              <div class="hashtag-list" id="branded-hashtags">
                <!-- Branded hashtags will appear here -->
              </div>
            </div>
          </div>
          
          <div class="hashtag-copy">
            <button id="copy-hashtags" class="action-button">
              <i class="fas fa-copy"></i> Copy All Hashtags
            </button>
          </div>
        </div>
      </div>
      
      <div class="content-calendar">
        <div class="calendar-header">
          <h3>Content Calendar Templates</h3>
        </div>
        
        <div class="calendar-selector">
          <button class="calendar-button active" data-calendar="retail">Retail Business</button>
          <button class="calendar-button" data-calendar="service">Service Business</button>
          <button class="calendar-button" data-calendar="content">Content Creator</button>
        </div>
        
        <div class="calendar-container" id="calendar-container">
          <!-- Calendar content will be populated here -->
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .social-media-creator-interface {
      background: linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(236, 72, 153, 0.2);
    }
    
    .creator-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .creator-icon {
      font-size: 2.5rem;
      color: #ec4899;
      margin-right: 1rem;
    }
    
    .creator-title h2 {
      color: #ec4899;
      margin-bottom: 0.3rem;
    }
    
    .creator-title p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .content-generator {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .generator-header {
      margin-bottom: 1.25rem;
    }
    
    .generator-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .generator-header p {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .generator-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .form-group {
      flex: 1;
      min-width: 250px;
    }
    
    .form-group.full-width {
      flex-basis: 100%;
    }
    
    .form-group label {
      display: block;
      color: #e2e8f0;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .form-group select, .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    .form-options {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .option-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .option-item input[type="checkbox"] {
      width: 16px;
      height: 16px;
    }
    
    .option-item label {
      color: #e2e8f0;
      font-size: 0.9rem;
    }
    
    .generator-actions {
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;
    }
    
    .primary-button {
      background: #ec4899;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 0.75rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .primary-button:hover {
      background: #db2777;
      transform: translateY(-2px);
    }
    
    .generated-content {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    
    .content-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
    }
    
    .content-actions {
      display: flex;
      gap: 0.75rem;
    }
    
    .action-button {
      background: rgba(15, 23, 42, 0.6);
      color: #e2e8f0;
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .action-button:hover {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(100, 116, 139, 0.6);
    }
    
    .content-preview {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    
    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
    }
    
    .platform-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #f3f4f6;
      font-size: 0.95rem;
    }
    
    .platform-indicator i {
      color: #ec4899;
    }
    
    .content-type-tag {
      background: rgba(236, 72, 153, 0.2);
      color: #ec4899;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    
    .preview-body {
      color: #e2e8f0;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }
    
    .preview-hashtags {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .content-variations {
      margin-top: 1.5rem;
    }
    
    .content-variations h4 {
      color: #f3f4f6;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .variations-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .variation-item {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .variation-item:hover {
      background: rgba(30, 41, 59, 0.8);
    }
    
    .variation-title {
      color: #ec4899;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .variation-content {
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    
    .platform-guide {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .guide-header {
      margin-bottom: 1.25rem;
    }
    
    .guide-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    
    .platform-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .platform-button {
      background: rgba(15, 23, 42, 0.6);
      color: #94a3b8;
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .platform-button:hover {
      background: rgba(30, 41, 59, 0.8);
      color: #f3f4f6;
    }
    
    .platform-button.active {
      background: rgba(236, 72, 153, 0.2);
      color: #ec4899;
      border-color: rgba(236, 72, 153, 0.4);
    }
    
    .platform-details {
      margin-top: 1rem;
    }
    
    .platform-title {
      color: #f3f4f6;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .platform-title i {
      color: #ec4899;
    }
    
    .details-section {
      margin-bottom: 1.25rem;
    }
    
    .details-section:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      color: #ec4899;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .content-types {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .content-type-badge {
      background: rgba(71, 85, 105, 0.5);
      color: #e2e8f0;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
    }
    
    .best-practices-list {
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.6;
      padding-left: 1.5rem;
    }
    
    .best-practices-list li {
      margin-bottom: 0.5rem;
    }
    
    .best-practices-list li:last-child {
      margin-bottom: 0;
    }
    
    .character-limits {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
    }
    
    .limit-item {
      display: flex;
      justify-content: space-between;
      color: #e2e8f0;
      font-size: 0.9rem;
      padding: 0.3rem 0;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    }
    
    .limit-item:last-child {
      border-bottom: none;
    }
    
    .limit-label {
      color: #94a3b8;
    }
    
    .audience-insights {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 1rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    
    .hashtag-generator {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .hashtag-header {
      margin-bottom: 1.25rem;
    }
    
    .hashtag-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
    }
    
    .hashtag-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 1rem;
    }
    
    .hashtag-actions {
      display: flex;
      justify-content: center;
    }
    
    .hashtag-results {
      margin-top: 1.5rem;
      border-top: 1px solid rgba(71, 85, 105, 0.5);
      padding-top: 1.5rem;
    }
    
    .hashtag-categories {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }
    
    .hashtag-category {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 1rem;
    }
    
    .category-label {
      color: #ec4899;
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .hashtag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .hashtag-item {
      background: rgba(71, 85, 105, 0.5);
      color: #e2e8f0;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .hashtag-item:hover {
      background: rgba(236, 72, 153, 0.2);
      color: #ec4899;
    }
    
    .hashtag-copy {
      display: flex;
      justify-content: center;
    }
    
    .content-calendar {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
    }
    
    .calendar-header {
      margin-bottom: 1.25rem;
    }
    
    .calendar-header h3 {
      color: #f3f4f6;
      font-size: 1.2rem;
    }
    
    .calendar-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 1rem;
    }
    
    .calendar-button {
      background: rgba(15, 23, 42, 0.6);
      color: #e2e8f0;
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .calendar-button:hover {
      background: rgba(30, 41, 59, 0.8);
    }
    
    .calendar-button.active {
      background: rgba(236, 72, 153, 0.2);
      color: #ec4899;
    }
    
    .calendar-container {
      color: #e2e8f0;
    }
    
    .calendar-description {
      color: #94a3b8;
      font-size: 0.95rem;
      margin-bottom: 1.25rem;
    }
    
    .weekly-schedule {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .day-card {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 1rem;
    }
    
    .day-header {
      color: #ec4899;
      font-size: 1rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .day-focus {
      color: #e2e8f0;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .day-content {
      color: #94a3b8;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .monthly-ideas {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 6px;
      padding: 1.25rem;
    }
    
    .monthly-title {
      color: #f3f4f6;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .monthly-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .monthly-item {
      color: #e2e8f0;
      font-size: 0.9rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .monthly-item:last-child {
      border-bottom: none;
    }
    
    .monthly-item:before {
      content: '•';
      color: #ec4899;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state
  currentState: {
    selectedPlatform: 'instagram',
    selectedContentType: 'announcement',
    generatedContent: null,
    generatedHashtags: [],
    selectedCalendar: 'retail'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Social Media Creator Mode');
    
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
      chatInput.placeholder = "Ask for social media content ideas or help...";
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
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize platform details for Instagram (default)
    this.showPlatformDetails(container, 'instagram');
    
    // Initialize calendar for retail (default)
    this.showCalendar(container, 'retail');
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Platform selector in the form
    const platformSelect = container.querySelector('#platform-select');
    if (platformSelect) {
      platformSelect.addEventListener('change', (e) => {
        this.currentState.selectedPlatform = e.target.value;
      });
    }
    
    // Content type selector
    const contentTypeSelect = container.querySelector('#content-type');
    if (contentTypeSelect) {
      contentTypeSelect.addEventListener('change', (e) => {
        this.currentState.selectedContentType = e.target.value;
      });
    }
    
    // Generate content button
    const generateButton = container.querySelector('#generate-content');
    if (generateButton) {
      generateButton.addEventListener('click', () => {
        this.generateContent(container);
      });
    }
    
    // Copy content button
    const copyContentButton = container.querySelector('#copy-content');
    if (copyContentButton) {
      copyContentButton.addEventListener('click', () => {
        this.copyGeneratedContent(container);
      });
    }
    
    // Regenerate content button
    const regenerateButton = container.querySelector('#regenerate-content');
    if (regenerateButton) {
      regenerateButton.addEventListener('click', () => {
        this.generateContent(container);
      });
    }
    
    // Platform selector buttons for guide
    const platformButtons = container.querySelectorAll('.platform-button');
    platformButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        platformButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show details for selected platform
        const platformId = button.dataset.platform;
        this.showPlatformDetails(container, platformId);
      });
    });
    
    // Generate hashtags button
    const generateHashtagsButton = container.querySelector('#generate-hashtags');
    if (generateHashtagsButton) {
      generateHashtagsButton.addEventListener('click', () => {
        this.generateHashtags(container);
      });
    }
    
    // Copy hashtags button
    const copyHashtagsButton = container.querySelector('#copy-hashtags');
    if (copyHashtagsButton) {
      copyHashtagsButton.addEventListener('click', () => {
        this.copyHashtags(container);
      });
    }
    
    // Calendar selector buttons
    const calendarButtons = container.querySelectorAll('.calendar-button');
    calendarButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        calendarButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show selected calendar
        const calendarId = button.dataset.calendar;
        this.showCalendar(container, calendarId);
      });
    });
  },
  
  // Show details for a specific platform
  showPlatformDetails: function(container, platformId) {
    const detailsContainer = container.querySelector('#platform-details');
    if (!detailsContainer) return;
    
    // Find platform data
    const platform = this.platforms.find(p => p.id === platformId);
    if (!platform) return;
    
    // Build HTML for platform details
    let html = `
      <div class="platform-title">
        <i class="fab fa-${platform.icon}"></i>
        <span>${platform.name}</span>
      </div>
      
      <div class="details-section">
        <div class="section-title">Content Types</div>
        <div class="content-types">
          ${platform.contentTypes.map(type => `
            <div class="content-type-badge">${type}</div>
          `).join('')}
        </div>
      </div>
      
      <div class="details-section">
        <div class="section-title">Best Practices</div>
        <ul class="best-practices-list">
          ${platform.bestPractices.map(practice => `
            <li>${practice}</li>
          `).join('')}
        </ul>
      </div>
      
      <div class="details-section">
        <div class="section-title">Character Limits</div>
        <div class="character-limits">
          ${Object.entries(platform.characterLimits).map(([label, value]) => `
            <div class="limit-item">
              <span class="limit-label">${this.formatLabel(label)}</span>
              <span>${value}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="details-section">
        <div class="section-title">Audience Insights</div>
        <div class="audience-insights">
          ${platform.audienceInsights}
        </div>
      </div>
    `;
    
    detailsContainer.innerHTML = html;
  },
  
  // Show calendar for a specific business type
  showCalendar: function(container, calendarId) {
    const calendarContainer = container.querySelector('#calendar-container');
    if (!calendarContainer) return;
    
    // Find calendar data
    const calendar = this.contentCalendars.find(cal => cal.id === calendarId);
    if (!calendar) return;
    
    // Build HTML for calendar
    let html = `
      <div class="calendar-description">${calendar.description}</div>
      
      <div class="weekly-schedule">
        ${calendar.weekly.map(day => `
          <div class="day-card">
            <div class="day-header">${day.day}</div>
            <div class="day-focus">${day.focus}</div>
            <div class="day-content">${day.content}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="monthly-ideas">
        <div class="monthly-title">Monthly Content Ideas</div>
        <ul class="monthly-list">
          ${calendar.monthly.map(idea => `
            <li class="monthly-item">${idea}</li>
          `).join('')}
        </ul>
      </div>
    `;
    
    calendarContainer.innerHTML = html;
    
    // Update current state
    this.currentState.selectedCalendar = calendarId;
  },
  
  // Format label from camelCase to Title Case with spaces
  formatLabel: function(label) {
    return label
      // Insert a space before all capital letters
      .replace(/([A-Z])/g, ' $1')
      // Capitalize the first letter and join with the rest
      .replace(/^./, str => str.toUpperCase());
  },
  
  // Generate content based on form inputs
  generateContent: function(container) {
    // Get form values
    const platform = this.currentState.selectedPlatform;
    const contentType = this.currentState.selectedContentType;
    const topic = container.querySelector('#content-topic').value;
    const businessInfo = container.querySelector('#business-info').value;
    const includeHashtags = container.querySelector('#include-hashtags').checked;
    const includeEmoji = container.querySelector('#include-emoji').checked;
    const includeCTA = container.querySelector('#include-call-to-action').checked;
    
    // Validate required fields
    if (!topic) {
      alert('Please enter a topic or focus for your content.');
      return;
    }
    
    // Prepare prompt for AI
    const prompt = this.buildContentPrompt(platform, contentType, topic, businessInfo, includeHashtags, includeEmoji, includeCTA);
    
    // Show generated content section
    const generatedContent = container.querySelector('#generated-content');
    if (generatedContent) {
      generatedContent.classList.remove('hidden');
    }
    
    // Update platform indicator in preview
    const platformIndicator = container.querySelector('.platform-indicator');
    if (platformIndicator) {
      const platformData = this.platforms.find(p => p.id === platform);
      if (platformData) {
        platformIndicator.innerHTML = `
          <i class="fab fa-${platformData.icon}"></i>
          <span>${platformData.name}</span>
        `;
      }
    }
    
    // Update content type tag in preview
    const contentTypeTag = container.querySelector('.content-type-tag');
    if (contentTypeTag) {
      const contentTypeData = this.contentTypes.find(t => t.id === contentType);
      if (contentTypeData) {
        contentTypeTag.textContent = contentTypeData.name;
      }
    }
    
    // Show loading state in preview
    const previewContent = container.querySelector('#preview-content');
    const previewHashtags = container.querySelector('#preview-hashtags');
    
    if (previewContent) {
      previewContent.innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 1rem;">Generating content...</div>';
    }
    
    if (previewHashtags) {
      previewHashtags.innerHTML = '';
    }
    
    // Send prompt to AI
    this.sendPromptToAI(prompt);
    
    // For demo, show that we've sent the prompt (in a real app this would be updated when response comes back)
    setTimeout(() => {
      if (previewContent) {
        previewContent.innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 1rem;">Content request sent! Your generated content will appear in the chat area below...</div>';
      }
    }, 1500);
  },
  
  // Build content prompt based on form values
  buildContentPrompt: function(platform, contentType, topic, businessInfo, includeHashtags, includeEmoji, includeCTA) {
    // Get platform and content type data
    const platformData = this.platforms.find(p => p.id === platform);
    const contentTypeData = this.contentTypes.find(t => t.id === contentType);
    
    // Build the base prompt
    let prompt = `Please create a ${platformData.name} post about "${topic}" in the style of ${contentTypeData.name}.`;
    
    // Add business context if provided
    if (businessInfo) {
      prompt += `\n\nBusiness/Brand Context: ${businessInfo}`;
    }
    
    // Add options
    prompt += `\n\nRequirements:`;
    
    if (includeEmoji) {
      prompt += `\n- Include appropriate emojis`;
    } else {
      prompt += `\n- Do not include emojis`;
    }
    
    if (includeCTA) {
      prompt += `\n- Include a clear call-to-action`;
    } else {
      prompt += `\n- Do not include a call-to-action`;
    }
    
    if (includeHashtags) {
      prompt += `\n- Include 5-7 relevant hashtags appropriate for ${platformData.name}`;
    } else {
      prompt += `\n- Do not include hashtags`;
    }
    
    // Add platform-specific requirements
    prompt += `\n- Follow best practices for ${platformData.name}`;
    prompt += `\n- Respect the character limits: ${Object.entries(platformData.characterLimits).map(([k, v]) => `${this.formatLabel(k)}: ${v}`).join(', ')}`;
    
    // Request format
    prompt += `\n\nPlease format your response as follows:
1. The ${platformData.name} post content (with any hashtags at the end)
2. A brief explanation of why this content works well for ${platformData.name} and ${contentTypeData.name} posts`;
    
    return prompt;
  },
  
  // Copy generated content to clipboard
  copyGeneratedContent: function(container) {
    const previewContent = container.querySelector('#preview-content');
    const previewHashtags = container.querySelector('#preview-hashtags');
    
    if (!previewContent) return;
    
    let contentToCopy = previewContent.textContent || '';
    
    // Add hashtags if they exist
    if (previewHashtags && previewHashtags.textContent) {
      contentToCopy += '\n\n' + previewHashtags.textContent;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(contentToCopy).then(() => {
      // Show copy confirmation
      const copyButton = container.querySelector('#copy-content');
      if (copyButton) {
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          copyButton.innerHTML = originalText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy content:', err);
      alert('Failed to copy content to clipboard');
    });
  },
  
  // Generate hashtags based on topic
  generateHashtags: function(container) {
    // Get topic and count
    const topic = container.querySelector('#hashtag-topic').value;
    const count = container.querySelector('#hashtag-count').value;
    
    // Validate topic
    if (!topic) {
      alert('Please enter a topic or industry for hashtags.');
      return;
    }
    
    // Show hashtag results section
    const hashtagResults = container.querySelector('#hashtag-results');
    if (hashtagResults) {
      hashtagResults.classList.remove('hidden');
    }
    
    // Show loading state
    const popularHashtags = container.querySelector('#popular-hashtags');
    const nicheHashtags = container.querySelector('#niche-hashtags');
    const brandedHashtags = container.querySelector('#branded-hashtags');
    
    if (popularHashtags) {
      popularHashtags.innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 0.5rem;">Generating hashtags...</div>';
    }
    
    if (nicheHashtags) {
      nicheHashtags.innerHTML = '';
    }
    
    if (brandedHashtags) {
      brandedHashtags.innerHTML = '';
    }
    
    // Prepare prompt for AI
    const prompt = `Please generate a set of ${count} hashtags related to "${topic}" for social media use. Divide them into three categories:

1. Popular/High-volume hashtags (widely used)
2. Niche/Medium-volume hashtags (more targeted)
3. Branded/Campaign hashtags (specific or unique)

Please format each hashtag properly with the # symbol and follow best practices for hashtag creation.`;
    
    // Send prompt to AI
    this.sendPromptToAI(prompt);
    
    // For demo, show that we've sent the prompt
    setTimeout(() => {
      if (popularHashtags) {
        popularHashtags.innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 0.5rem;">Hashtag request sent! Your generated hashtags will appear in the chat area below...</div>';
      }
    }, 1500);
  },
  
  // Copy all hashtags to clipboard
  copyHashtags: function(container) {
    const popularHashtags = container.querySelector('#popular-hashtags');
    const nicheHashtags = container.querySelector('#niche-hashtags');
    const brandedHashtags = container.querySelector('#branded-hashtags');
    
    let hashtagsToCopy = '';
    
    if (popularHashtags) hashtagsToCopy += popularHashtags.textContent || '';
    if (nicheHashtags) hashtagsToCopy += ' ' + (nicheHashtags.textContent || '');
    if (brandedHashtags) hashtagsToCopy += ' ' + (brandedHashtags.textContent || '');
    
    // Copy to clipboard
    navigator.clipboard.writeText(hashtagsToCopy.trim()).then(() => {
      // Show copy confirmation
      const copyButton = container.querySelector('#copy-hashtags');
      if (copyButton) {
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        
        setTimeout(() => {
          copyButton.innerHTML = originalText;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy hashtags:', err);
      alert('Failed to copy hashtags to clipboard');
    });
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
    SocialMediaCreatorMode.init();
  } else {
    window.addEventListener('load', function() {
      SocialMediaCreatorMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SocialMediaCreatorMode;
} else {
  window.SocialMediaCreatorMode = SocialMediaCreatorMode;
}