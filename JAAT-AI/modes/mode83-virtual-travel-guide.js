/**
 * JAAT-AI Mode: Virtual Travel Guide
 * 
 * Comprehensive travel assistant providing destination information,
 * cultural insights, itinerary planning, and travel recommendations
 * based on user preferences and interests.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const VirtualTravelGuideMode = {
  id: 'virtual-travel-guide',
  name: 'Virtual Travel Guide',
  icon: 'globe',
  description: 'Travel recommendations and insights for destinations worldwide.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Virtual Travel Guide mode, a knowledgeable global travel assistant. You provide comprehensive destination information, cultural insights, travel recommendations, and itinerary planning based on user preferences and interests.

Key characteristics:
1. You possess extensive knowledge about global destinations, attractions, cuisines, and cultural practices
2. You provide personalized recommendations based on user interests, budget, and travel preferences
3. You offer practical travel tips regarding transportation, accommodation, safety, and local customs
4. You can help plan detailed itineraries optimized for time, interests, and budget constraints
5. You suggest authentic experiences that match the traveler's desired level of adventure
6. You consider factors like seasonality, local events, and current travel conditions
7. You maintain cultural sensitivity and highlight ethical travel practices

When providing travel information, balance popular attractions with off-the-beaten-path experiences. Include practical details like transportation options, estimated costs, seasonal considerations, and cultural etiquette. Always aim to help travelers experience destinations authentically while respecting local customs.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "What are the must-see attractions in Tokyo for a 5-day trip?",
    "I'm planning a honeymoon to Greece. Which islands would you recommend?",
    "What's the best time of year to visit Morocco?",
    "Can you suggest a 7-day itinerary for exploring Peru?",
    "What are some family-friendly destinations in Europe for summer travel?",
    "What should I know about local customs before visiting Thailand?",
    "I'm a foodie traveling to Mexico City. What culinary experiences shouldn't I miss?",
    "What are some lesser-known destinations in Italy beyond the typical tourist spots?",
    "How can I travel responsibly and minimize my environmental impact?",
    "I have a 10-hour layover in Singapore. What can I do during that time?"
  ],
  
  // Destination categories
  destinationTypes: [
    {
      id: 'cities',
      name: 'Urban Escapes',
      description: 'Major metropolitan areas and cultural hubs',
      examples: [
        'Tokyo, Japan',
        'Paris, France',
        'New York City, USA',
        'Istanbul, Turkey',
        'Singapore',
        'Barcelona, Spain',
        'Mexico City, Mexico',
        'Cape Town, South Africa'
      ]
    },
    {
      id: 'nature',
      name: 'Natural Wonders',
      description: 'Breathtaking landscapes and outdoor experiences',
      examples: [
        'The Grand Canyon, USA',
        'Amazon Rainforest, South America',
        'Ha Long Bay, Vietnam',
        'Northern Lights in Iceland',
        'Great Barrier Reef, Australia',
        'Serengeti National Park, Tanzania',
        'Banff National Park, Canada',
        'Patagonia, Argentina & Chile'
      ]
    },
    {
      id: 'cultural',
      name: 'Cultural Immersion',
      description: 'Destinations rich in cultural heritage and historical significance',
      examples: [
        'Kyoto, Japan',
        'Rome, Italy',
        'Marrakech, Morocco',
        'Varanasi, India',
        'Cusco, Peru',
        'Cairo, Egypt',
        'Chiang Mai, Thailand',
        'Krakow, Poland'
      ]
    },
    {
      id: 'beaches',
      name: 'Beach Getaways',
      description: 'Coastal retreats and island paradises',
      examples: [
        'Maldives',
        'Bali, Indonesia',
        'Santorini, Greece',
        'Tulum, Mexico',
        'Seychelles',
        'Amalfi Coast, Italy',
        'Maui, Hawaii',
        'Zanzibar, Tanzania'
      ]
    },
    {
      id: 'adventure',
      name: 'Adventure Travel',
      description: 'Destinations ideal for thrill-seekers and active experiences',
      examples: [
        'Queenstown, New Zealand',
        'Interlaken, Switzerland',
        'Moab, Utah, USA',
        'Costa Rica',
        'Kathmandu, Nepal',
        'Victoria Falls, Zambia & Zimbabwe',
        'Galápagos Islands, Ecuador',
        'Torres del Paine, Chile'
      ]
    },
    {
      id: 'hidden',
      name: 'Off the Beaten Path',
      description: 'Lesser-known destinations away from typical tourist routes',
      examples: [
        'Faroe Islands',
        'Luang Prabang, Laos',
        'Comporta, Portugal',
        'Puglia, Italy',
        'Lake Ohrid, North Macedonia',
        'Chapada Diamantina, Brazil',
        'Gorkhi-Terelj National Park, Mongolia',
        'Kgalagadi Transfrontier Park, Botswana & South Africa'
      ]
    },
    {
      id: 'food',
      name: 'Culinary Destinations',
      description: 'Regions renowned for exceptional food and drink experiences',
      examples: [
        'Lyon, France',
        'Osaka, Japan',
        'Penang, Malaysia',
        'Bologna, Italy',
        'Oaxaca, Mexico',
        'Jeonju, South Korea',
        'New Orleans, USA',
        'Lima, Peru'
      ]
    },
    {
      id: 'budget',
      name: 'Budget-Friendly',
      description: 'Affordable destinations offering good value experiences',
      examples: [
        'Hanoi, Vietnam',
        'Lisbon, Portugal',
        'Mexico City, Mexico',
        'Budapest, Hungary',
        'Tbilisi, Georgia',
        'Hoi An, Vietnam',
        'Medellín, Colombia',
        'Bali, Indonesia'
      ]
    }
  ],
  
  // Travel styles
  travelStyles: [
    {
      id: 'luxury',
      name: 'Luxury',
      description: 'High-end accommodations, exclusive experiences, and premium services',
      recommendations: [
        'Five-star hotels and luxury resorts',
        'Private tours and exclusive access',
        'Fine dining experiences',
        'Premium transportation options',
        'Personalized service and amenities',
        'Spa and wellness treatments'
      ]
    },
    {
      id: 'budget',
      name: 'Budget',
      description: 'Cost-effective travel focused on value and essential experiences',
      recommendations: [
        'Hostels, guesthouses, and budget accommodations',
        'Public transportation and walking tours',
        'Street food and local eateries',
        'Free attractions and activities',
        'Travel during shoulder season',
        'City passes and discount cards'
      ]
    },
    {
      id: 'familyFriendly',
      name: 'Family-Friendly',
      description: 'Travel experiences suitable for all ages with activities for children',
      recommendations: [
        'Accommodations with family rooms or kitchenettes',
        'Kid-friendly attractions and activities',
        'Parks, beaches, and interactive museums',
        'Destinations with good safety records',
        'Shorter travel days and flexible schedules',
        'All-inclusive resorts or vacation rentals'
      ]
    },
    {
      id: 'soloTravel',
      name: 'Solo Travel',
      description: 'Independent travel focusing on personal experiences and connections',
      recommendations: [
        'Social hostels and community-focused accommodations',
        'Walking tours and group activities',
        'Destinations with good safety records for solo travelers',
        'Transportation hubs with good connections',
        'Digital nomad-friendly locations',
        'Bustling urban areas or nature retreats'
      ]
    },
    {
      id: 'backpacking',
      name: 'Backpacking',
      description: 'Long-term, usually budget travel with an emphasis on flexibility and authentic experiences',
      recommendations: [
        'Hostels, homestays, and camping',
        'Public transportation and hitchhiking',
        'Street food and local markets',
        'Long-term travel visas',
        'Work exchange programs',
        'Off-the-beaten-path destinations'
      ]
    },
    {
      id: 'ecotourism',
      name: 'Eco-Tourism',
      description: 'Environmentally responsible travel to natural areas that conserves the environment',
      recommendations: [
        'Eco-friendly accommodations and tour operators',
        'Conservation areas and national parks',
        'Responsible wildlife viewing',
        'Community-based tourism initiatives',
        'Low-impact transportation options',
        'Destinations with strong environmental protections'
      ]
    },
    {
      id: 'cultural',
      name: 'Cultural Immersion',
      description: 'Travel focused on deep understanding of local customs, history, and way of life',
      recommendations: [
        'Homestays and locally-owned accommodations',
        'Language classes and cultural workshops',
        'Historical sites and museums',
        'Local festivals and events',
        'Culinary experiences and cooking classes',
        'Traditional performances and arts'
      ]
    },
    {
      id: 'adventure',
      name: 'Adventure & Outdoor',
      description: 'Active experiences focused on physical activities and natural environments',
      recommendations: [
        'National parks and wilderness areas',
        'Trekking and hiking destinations',
        'Water sports and diving locations',
        'Mountain biking and climbing areas',
        'Camping and glamping options',
        'Wildlife safaris and nature expeditions'
      ]
    }
  ],
  
  // Travel planning resources
  planningResources: [
    {
      id: 'seasons',
      name: 'Best Times to Visit',
      regions: [
        {
          name: 'Southeast Asia',
          recommendations: 'November to February (dry season with cooler temperatures)',
          avoid: 'April to October (monsoon season, extremely hot and humid)'
        },
        {
          name: 'Western Europe',
          recommendations: 'April to June and September to October (pleasant weather, fewer crowds)',
          avoid: 'July and August (peak tourist season, higher prices, crowded attractions)'
        },
        {
          name: 'Caribbean',
          recommendations: 'December to April (dry season with warm temperatures)',
          avoid: 'June to November (hurricane season)'
        },
        {
          name: 'South America',
          recommendations: 'Varies by region - Peru/Bolivia: May to October; Brazil/Argentina: September to May',
          avoid: 'Andean regions: December to March (rainy season)'
        },
        {
          name: 'East Africa',
          recommendations: 'June to October and December to February (dry seasons, ideal for wildlife viewing)',
          avoid: 'March to May (long rains) and November (short rains)'
        },
        {
          name: 'Japan',
          recommendations: 'March to May (cherry blossoms) and October to November (fall colors)',
          avoid: 'June to July (rainy season) and August (hot and humid)'
        },
        {
          name: 'Australia',
          recommendations: 'September to November and March to May (spring and autumn shoulder seasons)',
          avoid: 'December to February in northern regions (wet season); June to August in alpine regions unless skiing'
        },
        {
          name: 'Middle East',
          recommendations: 'March to May and September to November (milder temperatures)',
          avoid: 'June to August (extreme heat)'
        }
      ]
    },
    {
      id: 'packingTips',
      name: 'Packing Essentials',
      categories: [
        {
          name: 'Documents',
          items: [
            'Passport (valid for at least six months beyond your trip)',
            'Visa documents (if required)',
            'Travel insurance information',
            'Driver's license and international driving permit (if needed)',
            'Hotel reservations and transportation tickets',
            'Emergency contact information',
            'Copies of important documents (stored separately)'
          ]
        },
        {
          name: 'Technology',
          items: [
            'Smartphone and charger',
            'Camera and memory cards',
            'Universal power adapter',
            'Portable battery pack',
            'Headphones',
            'E-reader or tablet (optional)',
            'Necessary apps downloaded in advance'
          ]
        },
        {
          name: 'Health & Safety',
          items: [
            'Travel first aid kit',
            'Prescription medications in original containers',
            'Over-the-counter medications (pain relievers, anti-diarrheal, etc.)',
            'Hand sanitizer and disinfecting wipes',
            'Insect repellent (destination-dependent)',
            'Sunscreen and after-sun care',
            'Travel-sized toiletries'
          ]
        },
        {
          name: 'Clothing',
          items: [
            'Versatile, layerable clothing appropriate for your destination',
            'Comfortable walking shoes',
            'Weather-appropriate outerwear',
            'Swimwear (if applicable)',
            'Sleepwear',
            'Cultural considerations (scarves, modest clothing for religious sites)',
            'One nicer outfit for upscale restaurants/events'
          ]
        },
        {
          name: 'Miscellaneous',
          items: [
            'Travel pillow and eye mask',
            'Reusable water bottle (empty for flights)',
            'Travel locks',
            'Packing cubes or organizers',
            'Laundry bag',
            'Small daypack or secure bag for daily use',
            'Phrase book or language app'
          ]
        }
      ]
    },
    {
      id: 'transportationTips',
      name: 'Transportation Guidance',
      categories: [
        {
          name: 'Air Travel',
          tips: [
            'Book flights 2-3 months in advance for best prices',
            'Consider flexible dates and use fare comparison tools',
            'Sign up for airline price alerts',
            'Check baggage policies before booking',
            'Select seats in advance when possible',
            'Use airline apps for mobile boarding passes',
            'Arrive at the airport with sufficient time (2-3 hours for international)'
          ]
        },
        {
          name: 'Train Travel',
          tips: [
            'Book high-speed trains in advance, especially in Europe and Asia',
            'Consider rail passes for multiple journeys',
            'Verify first vs. second class amenities and price differences',
            'Download offline maps of stations',
            'Check if seat reservations are needed or included',
            'Be mindful of transfer times between connections',
            'Store luggage in designated areas near your seat'
          ]
        },
        {
          name: 'Public Transportation',
          tips: [
            'Research local transit apps and payment methods in advance',
            'Consider multi-day passes for frequent use',
            'Learn basic system maps before arriving',
            'Avoid rush hours when possible',
            'Keep valuables secure in crowded vehicles',
            'Verify operating hours, especially for late-night travel',
            'Consider stored-value cards for multiple cities'
          ]
        },
        {
          name: 'Car Rentals',
          tips: [
            'Book in advance for best rates',
            'Ensure your driver's license is valid or get an International Driving Permit if needed',
            'Check insurance coverage through credit cards and rental companies',
            'Review local driving rules and road signs',
            'Consider GPS or download offline maps',
            'Inspect the vehicle and document any damage before departing',
            'Research parking options at your destinations'
          ]
        },
        {
          name: 'Ride-Sharing & Taxis',
          tips: [
            'Research which ride-sharing apps operate at your destination',
            'Download and set up accounts before traveling',
            'Learn about local taxi norms and approximate rates',
            'Use designated taxi stands at airports and major locations',
            'Confirm the fare before starting the journey when possible',
            'Track your route on your own device during the ride',
            'Keep small denominations of local currency for taxi payments'
          ]
        }
      ]
    },
    {
      id: 'safetySecurity',
      name: 'Safety & Security',
      categories: [
        {
          name: 'Before You Go',
          tips: [
            'Research destination safety information through official government travel advisories',
            'Register your trip with your country's embassy or consulate',
            'Purchase comprehensive travel insurance including medical coverage',
            'Make copies of important documents (passport, insurance, etc.)',
            'Share your itinerary with a trusted contact at home',
            'Research common scams at your destination',
            'Save emergency contacts and local embassy information'
          ]
        },
        {
          name: 'Personal Safety',
          tips: [
            'Stay alert and aware of your surroundings, especially in crowded areas',
            'Keep valuables secure and out of sight',
            'Use hotel safes for important documents and excess cash',
            'Limit displaying expensive electronics or jewelry',
            'Be cautious with alcohol consumption',
            'Trust your instincts if a situation feels unsafe',
            'Learn a few essential phrases in the local language'
          ]
        },
        {
          name: 'Digital Security',
          tips: [
            'Use secure, password-protected WiFi connections',
            'Consider a VPN for public WiFi networks',
            'Enable two-factor authentication for important accounts',
            'Backup important photos and documents to cloud storage',
            'Be cautious about sharing real-time location on social media',
            'Use credit cards with fraud protection for purchases',
            'Keep devices updated with security patches'
          ]
        },
        {
          name: 'Health Safety',
          tips: [
            'Check required vaccinations well in advance',
            'Pack sufficient prescription medications',
            'Research healthcare facilities at your destination',
            'Carry a basic first aid kit',
            'Learn if tap water is safe to drink',
            'Practice food safety awareness',
            'Carry medical alert information if you have specific conditions'
          ]
        },
        {
          name: 'Emergency Preparedness',
          tips: [
            'Know local emergency numbers (equivalent to 911)',
            'Identify nearest hospitals and police stations to your accommodation',
            'Keep a small amount of cash in reserve for emergencies',
            'Learn basic phrases related to emergencies in local language',
            'Consider registering with your country's embassy for emergency alerts',
            'Understand your travel insurance emergency procedures',
            'Have a communication plan with family/friends at home'
          ]
        }
      ]
    }
  ],
  
  // Sample itineraries
  sampleItineraries: [
    {
      id: 'japan7days',
      name: 'Japan Highlights: 7 Days',
      destination: 'Japan',
      days: [
        {
          day: 1,
          location: 'Tokyo',
          activities: [
            'Arrive at Narita or Haneda Airport',
            'Check into accommodation in central Tokyo',
            'Visit Meiji Shrine for a peaceful introduction to Japanese culture',
            'Explore the youthful fashion district of Harajuku',
            'Evening stroll and dinner in Shibuya, see the famous crossing',
            'Adjusting to jet lag - early night'
          ],
          accommodation: 'Tokyo',
          tips: 'Purchase a Suica or Pasmo card for easy use of public transportation. Consider a pocket WiFi rental at the airport for navigation.'
        },
        {
          day: 2,
          location: 'Tokyo',
          activities: [
            'Morning visit to Tsukiji Outer Market for fresh sushi breakfast',
            'Explore traditional Asakusa district and Senso-ji Temple',
            'Tokyo Skytree for panoramic city views (optional)',
            'Afternoon in Ueno Park and museums',
            'Evening in Akihabara, Japan's electronics and anime center',
            'Try conveyor belt sushi for dinner'
          ],
          accommodation: 'Tokyo',
          tips: 'Save money on breakfast by picking up snacks at a convenience store. Wear comfortable shoes as you'll be walking a lot.'
        },
        {
          day: 3,
          location: 'Tokyo → Hakone',
          activities: [
            'Take the Romancecar train to Hakone (approx. 85 min)',
            'Purchase Hakone Free Pass for transportation',
            'Scenic railway, cable car and pirate ship cruise on Lake Ashi',
            'Visit Hakone Open-Air Museum',
            'Relax in a traditional onsen (hot spring bath)',
            'Stay in a ryokan (traditional Japanese inn)'
          ],
          accommodation: 'Hakone',
          tips: 'Pack a small overnight bag for Hakone if you're leaving larger luggage at your Tokyo accommodation. Note that many onsens don't allow visible tattoos.'
        },
        {
          day: 4,
          location: 'Hakone → Kyoto',
          activities: [
            'Morning views of Mt. Fuji (weather permitting)',
            'Take the bullet train (shinkansen) to Kyoto (approx. 2.5 hours)',
            'Check into accommodation in Kyoto',
            'Afternoon visit to Fushimi Inari Shrine with its thousands of torii gates',
            'Evening exploration of Gion district with chance to spot geisha',
            'Traditional Kyoto cuisine for dinner'
          ],
          accommodation: 'Kyoto',
          tips: 'Reserve shinkansen tickets in advance. Visit Fushimi Inari early or later in the day to avoid crowds.'
        },
        {
          day: 5,
          location: 'Kyoto',
          activities: [
            'Morning at Kinkaku-ji (Golden Pavilion)',
            'Visit Ryoan-ji Temple with its famous Zen rock garden',
            'Afternoon at Arashiyama Bamboo Grove',
            'Explore Tenryu-ji Temple',
            'Relaxing riverboat cruise on the Hozugawa River (seasonal)',
            'Dinner in Pontocho Alley'
          ],
          accommodation: 'Kyoto',
          tips: 'Get to Arashiyama early to experience the bamboo grove without crowds. Consider renting a bicycle to explore Kyoto.'
        },
        {
          day: 6,
          location: 'Kyoto (Day trip to Nara)',
          activities: [
            'Day trip to Nara (45 min by train)',
            'Visit Nara Park and feed the friendly deer',
            'Todai-ji Temple housing the Great Buddha',
            'Kasuga Taisha Shrine with its lanterns',
            'Return to Kyoto',
            'Evening food tour in Nishiki Market'
          ],
          accommodation: 'Kyoto',
          tips: 'Purchase deer crackers to feed the deer in Nara Park. They bow when you bow to them!'
        },
        {
          day: 7,
          location: 'Kyoto → Osaka → Departure',
          activities: [
            'Morning visit to Nijo Castle',
            'Train to Osaka (30 min)',
            'Store luggage at train station',
            'Explore Dotonbori district for street food',
            'Last-minute shopping',
            'Train to Kansai International Airport for departure'
          ],
          accommodation: 'Departure',
          tips: 'Allow plenty of time to reach Kansai Airport as it's on an artificial island outside the city. Consider the airport limousine bus if you have large luggage.'
        }
      ],
      estimatedCost: {
        budget: '$1,500-2,000 per person',
        midRange: '$2,500-3,500 per person',
        luxury: '$5,000+ per person'
      },
      bestTimeToVisit: 'Spring (March-May) for cherry blossoms or Fall (October-November) for autumn colors'
    },
    {
      id: 'italy10days',
      name: 'Italian Classics: 10 Days',
      destination: 'Italy',
      days: [
        {
          day: 1,
          location: 'Rome',
          activities: [
            'Arrive at Rome Fiumicino Airport',
            'Check into accommodation in central Rome',
            'Afternoon walk to Spanish Steps and Trevi Fountain',
            'Evening stroll through Piazza Navona',
            'Welcome dinner with authentic Roman pasta dishes',
            'Early night to adjust to jet lag'
          ],
          accommodation: 'Rome',
          tips: 'Toss a coin into the Trevi Fountain - legend says it ensures your return to Rome. Have some gelato from a local gelateria.'
        },
        {
          day: 2,
          location: 'Rome',
          activities: [
            'Morning visit to Vatican Museums and Sistine Chapel (pre-book tickets)',
            'St. Peter's Basilica',
            'Lunch in Trastevere neighborhood',
            'Afternoon at the Colosseum and Roman Forum (pre-book tickets)',
            'Evening passeggiata (stroll) and dinner near Campo de' Fiori'
          ],
          accommodation: 'Rome',
          tips: 'Dress appropriately for Vatican visits (covered shoulders and knees). Consider a guided tour to skip the lines at major attractions.'
        },
        {
          day: 3,
          location: 'Rome',
          activities: [
            'Morning visit to Pantheon',
            'Piazza del Popolo and Villa Borghese gardens',
            'Galleria Borghese for amazing sculptures and paintings (reservation required)',
            'Shopping along Via del Corso',
            'Evening food tour in Testaccio neighborhood'
          ],
          accommodation: 'Rome',
          tips: 'Book Galleria Borghese tickets well in advance as they limit visitor numbers. Try supplì (fried rice balls) at a local street food vendor.'
        },
        {
          day: 4,
          location: 'Rome → Florence',
          activities: [
            'Morning high-speed train to Florence (1.5 hours)',
            'Check into accommodation',
            'Visit Accademia Gallery to see Michelangelo's David (pre-book)',
            'Explore the historic center, a UNESCO World Heritage site',
            'Visit Florence Cathedral (Duomo) and climb Brunelleschi's dome',
            'Evening aperitivo with view of the Arno River'
          ],
          accommodation: 'Florence',
          tips: 'Validate your train ticket before boarding. Climbing the Duomo requires a separate timed ticket and involves 463 steps.'
        },
        {
          day: 5,
          location: 'Florence',
          activities: [
            'Morning at Uffizi Gallery (pre-book)',
            'Visit Ponte Vecchio, the famous bridge lined with jewelry shops',
            'Explore Oltrarno district for artisan workshops',
            'Pitti Palace and Boboli Gardens',
            'Dinner with Florentine steak (bistecca alla fiorentina)'
          ],
          accommodation: 'Florence',
          tips: 'Save money by having lunch at local markets like Mercato Centrale. Authentic Florentine steak is priced by weight and typically shared.'
        },
        {
          day: 6,
          location: 'Florence (Day trip to Tuscany)',
          activities: [
            'Day trip to Tuscan countryside (group tour or private driver)',
            'Visit San Gimignano, medieval town known for its towers',
            'Wine tasting in Chianti region',
            'Explore Siena with its distinctive central square, Piazza del Campo',
            'Return to Florence for dinner'
          ],
          accommodation: 'Florence',
          tips: 'Book a small group tour to maximize your experience of the Tuscan countryside. Bring a camera for stunning landscape photos.'
        },
        {
          day: 7,
          location: 'Florence → Venice',
          activities: [
            'Morning high-speed train to Venice (2 hours)',
            'Water taxi or vaporetto to accommodation',
            'St. Mark's Square and Basilica',
            'Doge's Palace and Bridge of Sighs',
            'Evening gondola ride through the canals',
            'Dinner at a local bacaro (wine bar) with cicchetti (Venetian tapas)'
          ],
          accommodation: 'Venice',
          tips: 'Consider purchasing a vaporetto (water bus) pass if staying multiple days. Gondola rides are cheaper before 7pm and can be shared with other travelers to split costs.'
        },
        {
          day: 8,
          location: 'Venice',
          activities: [
            'Morning visit to Rialto Market',
            'Grand Canal cruise by vaporetto',
            'Visit the colorful islands of Murano (glass-making) and Burano (lace-making, colorful houses)',
            'Return to Venice',
            'Sunset at Accademia Bridge',
            'Traditional Venetian seafood dinner'
          ],
          accommodation: 'Venice',
          tips: 'Take vaporetto line 12 for island hopping. Avoid overpriced restaurants near major tourist areas - walk a few blocks inland for better quality and prices.'
        },
        {
          day: 9,
          location: 'Venice',
          activities: [
            'Visit the Peggy Guggenheim Collection for modern art',
            'Explore the less-touristy Cannaregio district',
            'Jewish Ghetto, the oldest in the world',
            'Shopping for Venetian masks or Murano glass souvenirs',
            'Farewell dinner at a romantic canalside restaurant'
          ],
          accommodation: 'Venice',
          tips: 'Visit authentic mask-making workshops rather than tourist shops for quality masks. Many restaurants charge a coperto (cover charge) - this is normal.'
        },
        {
          day: 10,
          location: 'Venice → Departure',
          activities: [
            'Final morning in Venice - early walk to enjoy the city without crowds',
            'Last-minute shopping or sightseeing',
            'Water taxi or Alilaguna boat to Venice Marco Polo Airport',
            'Departure'
          ],
          accommodation: 'Departure',
          tips: 'Allow extra time to reach the airport as water transportation can be unpredictable. The Alilaguna boat service is a cost-effective way to reach the airport.'
        }
      ],
      estimatedCost: {
        budget: '$1,800-2,500 per person',
        midRange: '$3,000-4,500 per person',
        luxury: '$7,000+ per person'
      },
      bestTimeToVisit: 'April-June or September-October for pleasant weather and fewer crowds'
    }
  ],
  
  // Cultural etiquette guides
  culturalEtiquette: [
    {
      region: 'Japan',
      customs: [
        {
          category: 'Greetings',
          practices: [
            'Bow when greeting people - the deeper the bow, the more respect shown',
            'Handshakes are becoming more common in business, but wait for the Japanese person to initiate',
            'Business cards (meishi) are exchanged with both hands and a slight bow',
            'Examine received cards carefully before putting them away respectfully'
          ]
        },
        {
          category: 'Dining',
          practices: [
            'Say "itadakimasu" before eating and "gochisousama deshita" after finishing',
            'Don't stick chopsticks vertically in rice (resembles funeral rituals)',
            'Never pass food from chopsticks to chopsticks',
            'Slurping noodles is acceptable and shows appreciation',
            'Pour drinks for others, not yourself, and receive with both hands',
            'Tipping is not customary and may cause confusion'
          ]
        },
        {
          category: 'Public Behavior',
          practices: [
            'Maintain quiet, respectful behavior in public places',
            'Remove shoes when entering homes, traditional restaurants, and some temples',
            'Avoid eating or drinking while walking (except at festivals)',
            'Cover tattoos when possible, especially at hot springs (onsen)',
            'Stand on the left side of escalators in Tokyo (right side in Osaka)',
            'Avoid blowing your nose in public - step away if necessary'
          ]
        },
        {
          category: 'Temples & Shrines',
          practices: [
            'Bow slightly before entering through the torii gates at Shinto shrines',
            'Wash hands and mouth at the purification fountain before entering',
            'Remove hats as a sign of respect',
            'Speak quietly and follow all posted rules',
            'Ask permission before taking photos, especially of people praying',
            'Follow the specific etiquette for prayer at each type of spiritual site'
          ]
        }
      ]
    },
    {
      region: 'Middle East (General)',
      customs: [
        {
          category: 'Greetings & Interaction',
          practices: [
            'Use the right hand for eating, greeting, and passing items (left hand considered unclean)',
            'Men may shake hands with men, but wait for women to extend hand first',
            'Maintain modest eye contact but avoid staring',
            'Address people using professional titles or Mr./Mrs. until invited to use first names',
            'Learn basic greeting phrases like "As-salaam alaikum" (Peace be upon you)',
            'Be patient with the more relaxed concept of time and punctuality'
          ]
        },
        {
          category: 'Dress Code',
          practices: [
            'Dress modestly, covering shoulders and knees for both men and women',
            'Women should carry a scarf for covering hair when visiting religious sites',
            'In more conservative areas, women may choose loose-fitting, non-revealing clothing',
            'Avoid revealing swimwear outside of private resort beaches',
            'Remove shoes before entering homes and religious buildings',
            'Dress standards vary by country - Saudi Arabia and Iran being most conservative'
          ]
        },
        {
          category: 'Dining',
          practices: [
            'Wait to be seated and for the host to begin eating',
            'Compliment the food and hospitality',
            'Eat with right hand only if dining traditionally',
            'Accept tea or coffee when offered as a sign of hospitality',
            'It's polite to try everything offered but okay to decline alcohol for religious or personal reasons',
            'Expect generous portions and offers for second helpings'
          ]
        },
        {
          category: 'Religious Respect',
          practices: [
            'Understand prayer times and that businesses may close briefly',
            'Never enter mosques during prayer times (non-Muslims often not permitted)',
            'Avoid scheduling meetings on Friday midday, the main prayer time',
            'During Ramadan, refrain from eating, drinking or smoking in public during daylight hours',
            'Speak respectfully about religious beliefs and practices',
            'Ask permission before photographing people, especially women'
          ]
        }
      ]
    },
    {
      region: 'Southeast Asia',
      customs: [
        {
          category: 'General Etiquette',
          practices: [
            'Remove shoes before entering homes, temples, and some businesses',
            'The head is considered sacred - never touch someone's head',
            'The feet are considered lowly - avoid pointing feet at people or religious objects',
            'Public displays of affection are generally frowned upon',
            'Dress modestly, especially when visiting religious sites',
            'Always ask permission before taking photos of locals'
          ]
        },
        {
          category: 'Thailand Specifics',
          practices: [
            'The wai (prayer-like gesture) is used as greeting - higher hands show more respect',
            'Never disrespect images of the royal family or Buddha',
            'Women should never touch or hand items to monks',
            'Maintain a calm demeanor - raising voice shows poor manners',
            'Smile is important in all interactions, even during disagreements',
            'In southern regions, be extra respectful during Muslim prayer times'
          ]
        },
        {
          category: 'Vietnam Specifics',
          practices: [
            'Use both hands when giving or receiving items from elders',
            'Ask permission before taking photographs of military sites',
            'Elders are deeply respected - give up seats and serve them first',
            'Respect feelings about the "American War" (Vietnam War) - avoid political discussions',
            'Point with your whole hand, not just index finger',
            'Remove shoes when entering someone's home'
          ]
        },
        {
          category: 'Indonesia/Malaysia Specifics',
          practices: [
            'In Muslim areas, dress modestly and respect prayer times',
            'Use right hand for eating and passing items',
            'Remove shoes when entering homes and places of worship',
            'During Ramadan, avoid eating, drinking or smoking in public during daylight',
            'In Indonesia, passing objects with left hand is considered rude',
            'When visiting rural areas, bring small gifts as tokens of appreciation'
          ]
        }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="travel-guide-interface">
      <div class="guide-header">
        <div class="guide-icon">
          <i class="fas fa-globe"></i>
        </div>
        <div class="guide-title">
          <h2>Virtual Travel Guide</h2>
          <p>Travel recommendations and insights for destinations worldwide</p>
        </div>
      </div>
      
      <div class="destination-explorer">
        <div class="section-header">
          <h3>Explore Destinations</h3>
          <p>Find your perfect travel destination based on interests and preferences</p>
        </div>
        
        <div class="destination-categories">
          <div class="category-row">
            <div class="destination-category" data-category="cities">
              <div class="category-icon">
                <i class="fas fa-city"></i>
              </div>
              <div class="category-label">Urban Escapes</div>
            </div>
            
            <div class="destination-category" data-category="nature">
              <div class="category-icon">
                <i class="fas fa-mountain"></i>
              </div>
              <div class="category-label">Natural Wonders</div>
            </div>
            
            <div class="destination-category" data-category="cultural">
              <div class="category-icon">
                <i class="fas fa-landmark"></i>
              </div>
              <div class="category-label">Cultural Immersion</div>
            </div>
            
            <div class="destination-category" data-category="beaches">
              <div class="category-icon">
                <i class="fas fa-umbrella-beach"></i>
              </div>
              <div class="category-label">Beach Getaways</div>
            </div>
          </div>
          
          <div class="category-row">
            <div class="destination-category" data-category="adventure">
              <div class="category-icon">
                <i class="fas fa-hiking"></i>
              </div>
              <div class="category-label">Adventure Travel</div>
            </div>
            
            <div class="destination-category" data-category="hidden">
              <div class="category-icon">
                <i class="fas fa-map-marked-alt"></i>
              </div>
              <div class="category-label">Off the Beaten Path</div>
            </div>
            
            <div class="destination-category" data-category="food">
              <div class="category-icon">
                <i class="fas fa-utensils"></i>
              </div>
              <div class="category-label">Culinary Destinations</div>
            </div>
            
            <div class="destination-category" data-category="budget">
              <div class="category-icon">
                <i class="fas fa-wallet"></i>
              </div>
              <div class="category-label">Budget-Friendly</div>
            </div>
          </div>
        </div>
        
        <div class="destination-results hidden" id="destination-results">
          <div class="results-header">
            <h4 id="results-title">Urban Escapes</h4>
            <button id="back-to-categories" class="back-button">
              <i class="fas fa-arrow-left"></i> Back to Categories
            </button>
          </div>
          
          <div class="destination-cards" id="destination-cards">
            <!-- Destination cards will be inserted here -->
          </div>
        </div>
      </div>
      
      <div class="trip-planner">
        <div class="section-header">
          <h3>Trip Planner</h3>
          <p>Get personalized travel recommendations and itineraries</p>
        </div>
        
        <div class="planner-form">
          <div class="form-row">
            <div class="form-group">
              <label for="destination-input">Destination</label>
              <input type="text" id="destination-input" placeholder="City, country, or region...">
            </div>
            
            <div class="form-group">
              <label for="trip-length">Trip Duration</label>
              <select id="trip-length">
                <option value="weekend">Weekend (2-3 days)</option>
                <option value="short" selected>Short Trip (4-7 days)</option>
                <option value="medium">Medium Trip (8-14 days)</option>
                <option value="long">Long Trip (15+ days)</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="travel-style">Travel Style</label>
              <select id="travel-style">
                <option value="any">Any Style</option>
                <option value="luxury">Luxury</option>
                <option value="budget">Budget</option>
                <option value="familyFriendly">Family-Friendly</option>
                <option value="soloTravel">Solo Travel</option>
                <option value="backpacking">Backpacking</option>
                <option value="ecotourism">Eco-Tourism</option>
                <option value="cultural">Cultural Immersion</option>
                <option value="adventure">Adventure & Outdoor</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="travel-period">When are you traveling?</label>
              <select id="travel-period">
                <option value="any">Flexible / Not Sure</option>
                <option value="winter">Winter (Dec-Feb)</option>
                <option value="spring">Spring (Mar-May)</option>
                <option value="summer">Summer (Jun-Aug)</option>
                <option value="fall">Fall (Sep-Nov)</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group full-width">
              <label for="interests">Travel Interests (Select all that apply)</label>
              <div class="interest-tags">
                <div class="interest-tag" data-interest="sightseeing">
                  <input type="checkbox" id="interest-sightseeing">
                  <label for="interest-sightseeing">Sightseeing</label>
                </div>
                <div class="interest-tag" data-interest="nature">
                  <input type="checkbox" id="interest-nature">
                  <label for="interest-nature">Nature & Outdoors</label>
                </div>
                <div class="interest-tag" data-interest="food">
                  <input type="checkbox" id="interest-food">
                  <label for="interest-food">Food & Dining</label>
                </div>
                <div class="interest-tag" data-interest="culture">
                  <input type="checkbox" id="interest-culture">
                  <label for="interest-culture">Culture & History</label>
                </div>
                <div class="interest-tag" data-interest="adventure">
                  <input type="checkbox" id="interest-adventure">
                  <label for="interest-adventure">Adventure</label>
                </div>
                <div class="interest-tag" data-interest="relaxation">
                  <input type="checkbox" id="interest-relaxation">
                  <label for="interest-relaxation">Relaxation</label>
                </div>
                <div class="interest-tag" data-interest="photography">
                  <input type="checkbox" id="interest-photography">
                  <label for="interest-photography">Photography</label>
                </div>
                <div class="interest-tag" data-interest="shopping">
                  <input type="checkbox" id="interest-shopping">
                  <label for="interest-shopping">Shopping</label>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button id="plan-trip-btn" class="primary-btn">
              <i class="fas fa-route"></i> Plan My Trip
            </button>
          </div>
        </div>
      </div>
      
      <div class="sample-itineraries">
        <div class="section-header">
          <h3>Sample Itineraries</h3>
          <p>Explore detailed travel plans for popular destinations</p>
        </div>
        
        <div class="itinerary-tabs">
          <button class="itinerary-tab active" data-itinerary="japan7days">Japan: 7 Days</button>
          <button class="itinerary-tab" data-itinerary="italy10days">Italy: 10 Days</button>
        </div>
        
        <div class="itinerary-container" id="itinerary-container">
          <!-- Itinerary content will be loaded here -->
        </div>
      </div>
      
      <div class="travel-resources">
        <div class="section-header">
          <h3>Travel Resources</h3>
          <p>Practical guides and information for better travel experiences</p>
        </div>
        
        <div class="resources-tabs">
          <button class="resource-tab active" data-resource="seasons">Best Times to Visit</button>
          <button class="resource-tab" data-resource="packingTips">Packing Guide</button>
          <button class="resource-tab" data-resource="transportationTips">Transportation</button>
          <button class="resource-tab" data-resource="safetySecurity">Safety & Security</button>
        </div>
        
        <div class="resource-container" id="resource-container">
          <!-- Resource content will be loaded here -->
        </div>
      </div>
      
      <div class="cultural-guides">
        <div class="section-header">
          <h3>Cultural Etiquette Guides</h3>
          <p>Local customs and practices to know before you go</p>
        </div>
        
        <div class="culture-tabs">
          <button class="culture-tab active" data-culture="japan">Japan</button>
          <button class="culture-tab" data-culture="middleEast">Middle East</button>
          <button class="culture-tab" data-culture="southeastAsia">Southeast Asia</button>
        </div>
        
        <div class="culture-container" id="culture-container">
          <!-- Culture content will be loaded here -->
        </div>
      </div>
    </div>
  `,
  
  // CSS styles for this mode's interface
  styles: `
    .travel-guide-interface {
      background: linear-gradient(to bottom right, rgba(56, 189, 248, 0.1), rgba(14, 165, 233, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(56, 189, 248, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .guide-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .guide-icon {
      font-size: 2.5rem;
      color: #0ea5e9;
      margin-right: 1rem;
    }
    
    .guide-title h2 {
      color: #0ea5e9;
      margin-bottom: 0.3rem;
    }
    
    .guide-title p {
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
    
    .destination-explorer, .trip-planner, .sample-itineraries, .travel-resources, .cultural-guides {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Destination Categories */
    .destination-categories {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .category-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: space-between;
    }
    
    .destination-category {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      padding: 1.25rem;
      flex: 1;
      min-width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .destination-category:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .category-icon {
      font-size: 1.75rem;
      color: #38bdf8;
    }
    
    .category-label {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
    
    /* Destination Results */
    .destination-results {
      margin-top: 1.5rem;
    }
    
    .results-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }
    
    .results-header h4 {
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
    
    .destination-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .destination-card {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.2s ease;
    }
    
    .destination-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-color: rgba(56, 189, 248, 0.4);
    }
    
    .card-image {
      height: 140px;
      background-color: rgba(30, 41, 59, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #38bdf8;
      font-size: 3rem;
    }
    
    .card-content {
      padding: 1rem;
    }
    
    .card-title {
      color: #f3f4f6;
      font-size: 1.05rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .card-description {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .card-action {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
      border: none;
      border-radius: 4px;
      padding: 0.4rem 0.75rem;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .card-action:hover {
      background: rgba(56, 189, 248, 0.3);
    }
    
    /* Trip Planner Form */
    .planner-form {
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
    
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .interest-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    
    .interest-tag {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 20px;
      padding: 0.4rem 0.75rem;
      transition: all 0.2s ease;
    }
    
    .interest-tag input[type="checkbox"] {
      width: 16px;
      height: 16px;
      margin: 0;
    }
    
    .interest-tag label {
      color: #e2e8f0;
      font-size: 0.9rem;
      margin: 0;
      cursor: pointer;
    }
    
    .interest-tag.active {
      background: rgba(56, 189, 248, 0.2);
      border-color: rgba(56, 189, 248, 0.5);
    }
    
    .interest-tag.active label {
      color: #38bdf8;
    }
    
    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;
    }
    
    .primary-btn {
      background: #0ea5e9;
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
    
    .primary-btn:hover {
      background: #0284c7;
      transform: translateY(-2px);
    }
    
    /* Itinerary Tabs */
    .itinerary-tabs, .resources-tabs, .culture-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 1rem;
    }
    
    .itinerary-tab, .resource-tab, .culture-tab {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .itinerary-tab:hover, .resource-tab:hover, .culture-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .itinerary-tab.active, .resource-tab.active, .culture-tab.active {
      background: rgba(56, 189, 248, 0.2);
      color: #38bdf8;
    }
    
    /* Itinerary Layout */
    .itinerary-container, .resource-container, .culture-container {
      color: #e2e8f0;
    }
    
    .itinerary-header {
      margin-bottom: 1.5rem;
    }
    
    .itinerary-title {
      color: #f3f4f6;
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    
    .itinerary-subtitle {
      color: #94a3b8;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }
    
    .itinerary-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .meta-item i {
      color: #38bdf8;
    }
    
    .itinerary-days {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .day-item {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .day-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    }
    
    .day-title {
      color: #38bdf8;
      font-size: 1.05rem;
      font-weight: 500;
    }
    
    .day-location {
      color: #e2e8f0;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    
    .day-location i {
      color: #38bdf8;
    }
    
    .day-activities {
      margin-bottom: 1rem;
    }
    
    .activities-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .activity-item {
      padding-left: 1.5rem;
      position: relative;
      color: #cbd5e1;
      font-size: 0.95rem;
    }
    
    .activity-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
    }
    
    .day-accommodation {
      background: rgba(30, 41, 59, 0.5);
      padding: 0.75rem;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .day-accommodation i {
      color: #38bdf8;
    }
    
    .day-accommodation-text {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .day-tips {
      background: rgba(30, 41, 59, 0.5);
      padding: 0.75rem;
      border-radius: 6px;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    .day-tips i {
      color: #38bdf8;
      margin-top: 0.2rem;
    }
    
    .day-tips-text {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    /* Resources Layout */
    .resource-section {
      margin-bottom: 1.5rem;
    }
    
    .resource-section:last-child {
      margin-bottom: 0;
    }
    
    .resource-title {
      color: #38bdf8;
      font-size: 1.05rem;
      margin-bottom: 1rem;
    }
    
    .resource-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    
    .resource-card {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
    }
    
    .resource-card-title {
      color: #e2e8f0;
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .resource-card-title i {
      color: #38bdf8;
    }
    
    .recommendations, .avoid {
      margin-bottom: 0.75rem;
    }
    
    .recommendations-label, .avoid-label {
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }
    
    .recommendations-label {
      color: #4ade80;
    }
    
    .avoid-label {
      color: #f87171;
    }
    
    .recommendations-text, .avoid-text {
      color: #cbd5e1;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .resource-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .resource-item {
      padding-left: 1.5rem;
      position: relative;
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .resource-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
    }
    
    /* Cultural Etiquette Sections */
    .custom-categories {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .custom-category {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1.25rem;
      flex: 1;
      min-width: 280px;
    }
    
    .custom-category-title {
      color: #38bdf8;
      font-size: 1.05rem;
      margin-bottom: 1rem;
    }
    
    .custom-practices {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .custom-practice {
      padding-left: 1.5rem;
      position: relative;
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .custom-practice:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
    }
    
    .region-intro {
      background: rgba(30, 41, 59, 0.5);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state
  currentState: {
    selectedCategory: null,
    selectedItinerary: 'japan7days',
    selectedResource: 'seasons',
    selectedCulture: 'japan'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Virtual Travel Guide Mode');
    
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
      chatInput.placeholder = "Ask for travel recommendations, itineraries, or specific destination information...";
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
    
    // Initialize with default selected itinerary
    this.showItinerary(container, this.currentState.selectedItinerary);
    
    // Initialize with default selected resource
    this.showResource(container, this.currentState.selectedResource);
    
    // Initialize with default selected culture
    this.showCulture(container, this.currentState.selectedCulture);
  },
  
  // Add event listeners to UI elements
  addEventListeners: function(container) {
    // Destination category selectors
    const categoryElements = container.querySelectorAll('.destination-category');
    categoryElements.forEach(element => {
      element.addEventListener('click', () => {
        const category = element.dataset.category;
        this.showDestinations(container, category);
      });
    });
    
    // Back to categories button
    const backButton = container.querySelector('#back-to-categories');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.hideDestinations(container);
      });
    }
    
    // Plan trip button
    const planTripBtn = container.querySelector('#plan-trip-btn');
    if (planTripBtn) {
      planTripBtn.addEventListener('click', () => {
        this.planTrip(container);
      });
    }
    
    // Interest tags
    const interestTags = container.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
      tag.addEventListener('click', function() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        this.classList.toggle('active', checkbox.checked);
      });
    });
    
    // Itinerary tabs
    const itineraryTabs = container.querySelectorAll('.itinerary-tab');
    itineraryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        itineraryTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected itinerary
        const itineraryId = tab.dataset.itinerary;
        this.showItinerary(container, itineraryId);
      });
    });
    
    // Resource tabs
    const resourceTabs = container.querySelectorAll('.resource-tab');
    resourceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        resourceTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected resource
        const resourceId = tab.dataset.resource;
        this.showResource(container, resourceId);
      });
    });
    
    // Culture tabs
    const cultureTabs = container.querySelectorAll('.culture-tab');
    cultureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        cultureTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected culture
        const cultureId = tab.dataset.culture;
        this.showCulture(container, cultureId);
      });
    });
  },
  
  // Show destinations for a category
  showDestinations: function(container, category) {
    // Update current state
    this.currentState.selectedCategory = category;
    
    // Show results container
    const resultsContainer = container.querySelector('#destination-results');
    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');
    }
    
    // Update title
    const resultsTitle = container.querySelector('#results-title');
    if (resultsTitle) {
      const categoryData = this.destinationTypes.find(type => type.id === category);
      if (categoryData) {
        resultsTitle.textContent = categoryData.name;
      }
    }
    
    // Populate destination cards
    const cardsContainer = container.querySelector('#destination-cards');
    if (cardsContainer && category) {
      const categoryData = this.destinationTypes.find(type => type.id === category);
      if (categoryData) {
        cardsContainer.innerHTML = '';
        
        // Add cards for each example destination
        categoryData.examples.forEach(destination => {
          // Determine icon based on category
          let icon = 'globe';
          switch (category) {
            case 'cities': icon = 'city'; break;
            case 'nature': icon = 'mountain'; break;
            case 'cultural': icon = 'landmark'; break;
            case 'beaches': icon = 'umbrella-beach'; break;
            case 'adventure': icon = 'hiking'; break;
            case 'hidden': icon = 'map-marked-alt'; break;
            case 'food': icon = 'utensils'; break;
            case 'budget': icon = 'wallet'; break;
          }
          
          const card = document.createElement('div');
          card.className = 'destination-card';
          card.innerHTML = `
            <div class="card-image">
              <i class="fas fa-${icon}"></i>
            </div>
            <div class="card-content">
              <div class="card-title">${destination}</div>
              <div class="card-description">${categoryData.description}</div>
              <button class="card-action" data-destination="${destination}">Explore</button>
            </div>
          `;
          
          // Add event listener to the explore button
          const exploreBtn = card.querySelector('.card-action');
          if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
              this.exploreDestination(destination);
            });
          }
          
          cardsContainer.appendChild(card);
        });
      }
    }
  },
  
  // Hide destinations and show categories
  hideDestinations: function(container) {
    const resultsContainer = container.querySelector('#destination-results');
    if (resultsContainer) {
      resultsContainer.classList.add('hidden');
    }
    
    // Reset current state
    this.currentState.selectedCategory = null;
  },
  
  // Explore a specific destination
  exploreDestination: function(destination) {
    // Prepare prompt for AI
    const prompt = `Please provide a detailed travel guide for ${destination}. Include:

1. Best time to visit and weather conditions
2. Top attractions and things to do
3. Local cuisine and must-try dishes
4. Transportation options in and around the area
5. Accommodation recommendations for different budgets
6. Cultural insights or etiquette tips
7. Any safety considerations or travel advice

Please format the response in a clear, organized way with headings. Thanks!`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Plan a trip based on form inputs
  planTrip: function(container) {
    // Get form values
    const destination = container.querySelector('#destination-input').value;
    const tripLength = container.querySelector('#trip-length').value;
    const travelStyle = container.querySelector('#travel-style').value;
    const travelPeriod = container.querySelector('#travel-period').value;
    
    // Get selected interests
    const selectedInterests = [];
    container.querySelectorAll('.interest-tag input[type="checkbox"]:checked').forEach(checkbox => {
      selectedInterests.push(checkbox.id.replace('interest-', ''));
    });
    
    // Validate destination
    if (!destination) {
      alert('Please enter a destination.');
      return;
    }
    
    // Prepare prompt for AI
    let prompt = `Please create a personalized travel itinerary for ${destination} with the following preferences:

1. Trip Duration: ${this.getTripLengthText(tripLength)}
2. Travel Style: ${travelStyle === 'any' ? 'Flexible' : this.getTravelStyleName(travelStyle)}
3. Travel Period: ${travelPeriod === 'any' ? 'Flexible timing' : this.getTravelPeriodText(travelPeriod)}`;

    // Add interests if selected
    if (selectedInterests.length > 0) {
      prompt += `\n4. Interests: ${selectedInterests.map(interest => this.formatInterest(interest)).join(', ')}`;
    }
    
    prompt += `\n\nPlease include:
- Day-by-day itinerary with activities and sights
- Recommended accommodations
- Transportation options
- Estimated budget range
- Practical tips specific to this destination
- Any seasonal considerations

Format the response as a clear, detailed itinerary. Thank you!`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Show an itinerary
  showItinerary: function(container, itineraryId) {
    const itineraryContainer = container.querySelector('#itinerary-container');
    if (!itineraryContainer) return;
    
    // Update current state
    this.currentState.selectedItinerary = itineraryId;
    
    // Find the itinerary data
    const itinerary = this.sampleItineraries.find(itin => itin.id === itineraryId);
    if (!itinerary) return;
    
    // Build HTML for itinerary
    let html = `
      <div class="itinerary-header">
        <div class="itinerary-title">${itinerary.name}</div>
        <div class="itinerary-subtitle">A comprehensive ${itinerary.days.length}-day journey through ${itinerary.destination}</div>
        
        <div class="itinerary-meta">
          <div class="meta-item">
            <i class="fas fa-calendar"></i>
            <span>Duration: ${itinerary.days.length} days</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>Budget: ${itinerary.estimatedCost.midRange}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>Best time: ${itinerary.bestTimeToVisit}</span>
          </div>
        </div>
      </div>
      
      <div class="itinerary-days">
    `;
    
    // Add each day
    itinerary.days.forEach(day => {
      html += `
        <div class="day-item">
          <div class="day-header">
            <div class="day-title">Day ${day.day}</div>
            <div class="day-location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${day.location}</span>
            </div>
          </div>
          
          <div class="day-activities">
            <ul class="activities-list">
              ${day.activities.map(activity => `
                <li class="activity-item">${activity}</li>
              `).join('')}
            </ul>
          </div>
          
          <div class="day-accommodation">
            <i class="fas fa-bed"></i>
            <div class="day-accommodation-text">
              <strong>Accommodation:</strong> ${day.accommodation}
            </div>
          </div>
          
          <div class="day-tips">
            <i class="fas fa-lightbulb"></i>
            <div class="day-tips-text">
              <strong>Tip:</strong> ${day.tips}
            </div>
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    itineraryContainer.innerHTML = html;
  },
  
  // Show a resource
  showResource: function(container, resourceId) {
    const resourceContainer = container.querySelector('#resource-container');
    if (!resourceContainer) return;
    
    // Update current state
    this.currentState.selectedResource = resourceId;
    
    // Find the resource data
    const resource = this.planningResources.find(res => res.id === resourceId);
    if (!resource) return;
    
    // Build different HTML based on resource type
    let html = '';
    
    switch (resourceId) {
      case 'seasons':
        html += `
          <div class="resource-section">
            <div class="resource-title">Seasonal Guide by Region</div>
            <div class="resource-cards">
              ${resource.regions.map(region => `
                <div class="resource-card">
                  <div class="resource-card-title">
                    <i class="fas fa-globe-americas"></i>
                    <span>${region.name}</span>
                  </div>
                  
                  <div class="recommendations">
                    <div class="recommendations-label">Best Times:</div>
                    <div class="recommendations-text">${region.recommendations}</div>
                  </div>
                  
                  <div class="avoid">
                    <div class="avoid-label">Consider Avoiding:</div>
                    <div class="avoid-text">${region.avoid}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;
        
      case 'packingTips':
        resource.categories.forEach(category => {
          html += `
            <div class="resource-section">
              <div class="resource-title">${category.name}</div>
              <ul class="resource-list">
                ${category.items.map(item => `
                  <li class="resource-item">${item}</li>
                `).join('')}
              </ul>
            </div>
          `;
        });
        break;
        
      case 'transportationTips':
      case 'safetySecurity':
        resource.categories.forEach(category => {
          html += `
            <div class="resource-section">
              <div class="resource-title">${category.name}</div>
              <ul class="resource-list">
                ${category.tips.map(tip => `
                  <li class="resource-item">${tip}</li>
                `).join('')}
              </ul>
            </div>
          `;
        });
        break;
    }
    
    resourceContainer.innerHTML = html;
  },
  
  // Show cultural etiquette
  showCulture: function(container, cultureId) {
    const cultureContainer = container.querySelector('#culture-container');
    if (!cultureContainer) return;
    
    // Update current state
    this.currentState.selectedCulture = cultureId;
    
    // Map culture IDs to regions in our data
    const cultureMap = {
      'japan': 'Japan',
      'middleEast': 'Middle East (General)',
      'southeastAsia': 'Southeast Asia'
    };
    
    // Find the culture data
    const culture = this.culturalEtiquette.find(c => c.region === cultureMap[cultureId]);
    if (!culture) return;
    
    // Build intro text based on region
    let introText = '';
    switch (cultureId) {
      case 'japan':
        introText = 'Japan has a rich cultural heritage with unique customs and etiquette. Understanding and respecting these practices will greatly enhance your travel experience and help you connect with locals. Here are key cultural norms to be aware of during your visit.';
        break;
      case 'middleEast':
        introText = 'The Middle East encompasses diverse countries with rich cultural traditions heavily influenced by Islam. While customs vary between countries (from more liberal areas like Dubai to conservative regions like Saudi Arabia), these guidelines help navigate the general cultural expectations of the region.';
        break;
      case 'southeastAsia':
        introText = 'Southeast Asia spans diverse countries including Thailand, Vietnam, Cambodia, Malaysia, Indonesia, and more. While each has distinct cultural traditions, they share certain common values related to respect, modesty, and social harmony. These guidelines will help you navigate cultural expectations in the region.';
        break;
    }
    
    // Build HTML for culture
    let html = `
      <div class="region-intro">
        ${introText}
      </div>
      
      <div class="custom-categories">
    `;
    
    // Add each category
    culture.customs.forEach(custom => {
      html += `
        <div class="custom-category">
          <div class="custom-category-title">${custom.category}</div>
          <div class="custom-practices">
            ${custom.practices.map(practice => `
              <div class="custom-practice">${practice}</div>
            `).join('')}
          </div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    cultureContainer.innerHTML = html;
  },
  
  // Helper function to format trip length text
  getTripLengthText: function(tripLength) {
    switch (tripLength) {
      case 'weekend': return 'Weekend (2-3 days)';
      case 'short': return 'Short Trip (4-7 days)';
      case 'medium': return 'Medium Trip (8-14 days)';
      case 'long': return 'Long Trip (15+ days)';
      default: return 'Flexible duration';
    }
  },
  
  // Helper function to get travel style name
  getTravelStyleName: function(styleId) {
    const style = this.travelStyles.find(s => s.id === styleId);
    return style ? style.name : 'Any Style';
  },
  
  // Helper function to format travel period text
  getTravelPeriodText: function(period) {
    switch (period) {
      case 'winter': return 'Winter (December-February)';
      case 'spring': return 'Spring (March-May)';
      case 'summer': return 'Summer (June-August)';
      case 'fall': return 'Fall (September-November)';
      default: return 'Flexible timing';
    }
  },
  
  // Helper function to format interest text
  formatInterest: function(interest) {
    switch (interest) {
      case 'sightseeing': return 'Sightseeing';
      case 'nature': return 'Nature & Outdoors';
      case 'food': return 'Food & Dining';
      case 'culture': return 'Culture & History';
      case 'adventure': return 'Adventure';
      case 'relaxation': return 'Relaxation';
      case 'photography': return 'Photography';
      case 'shopping': return 'Shopping';
      default: return interest;
    }
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
    VirtualTravelGuideMode.init();
  } else {
    window.addEventListener('load', function() {
      VirtualTravelGuideMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VirtualTravelGuideMode;
} else {
  window.VirtualTravelGuideMode = VirtualTravelGuideMode;
}