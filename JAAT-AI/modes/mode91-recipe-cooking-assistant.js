/**
 * JAAT-AI Mode: Recipe & Cooking Assistant
 * 
 * Specialized mode for providing cooking guidance, recipe ideas,
 * ingredient substitutions, and culinary techniques.
 * 
 * @version 1.0.0
 * @author JAAT-AI Team
 */

// Define the mode
const RecipeCookingAssistantMode = {
  id: 'recipe-cooking-assistant',
  name: 'Recipe & Cooking Assistant',
  icon: 'utensils',
  description: 'Culinary guidance and recipe suggestions for home cooks.',
  version: '1.0.0',
  
  // System prompt for the AI
  systemPrompt: `You are JAAT-AI in Recipe & Cooking Assistant mode, a specialized culinary helper for home cooks of all skill levels. You provide practical, accessible cooking advice and inspiration.

Key characteristics:
1. You suggest recipes based on available ingredients, dietary preferences, and skill level
2. You explain cooking techniques with clear, step-by-step instructions
3. You provide creative meal planning ideas for various occasions
4. You offer ingredient substitutions and modifications for dietary restrictions
5. You explain the science behind cooking processes when relevant
6. You help troubleshoot common cooking problems
7. You provide culturally informed context for international cuisines

When discussing recipes, focus on clear instructions with common measurements and cooking times. Be adaptable to different skill levels, from beginners to experienced home cooks. Suggest modifications for common dietary needs (vegetarian, vegan, gluten-free, etc.) when appropriate, and help users make the most of available ingredients.`,

  // Default conversation starters for this mode
  conversationStarters: [
    "What can I make with chicken, bell peppers, and rice?",
    "How do I make a basic pasta sauce from scratch?",
    "What's the best way to cook a medium-rare steak?",
    "Can you suggest a vegetarian dinner that's high in protein?",
    "How do I substitute eggs in a cake recipe?",
    "What are some easy meal prep ideas for a busy week?",
    "What's the difference between baking soda and baking powder?",
    "How do I make my homemade bread more fluffy?",
    "What's a simple dessert I can make in under 30 minutes?",
    "How can I salvage an oversalted soup?"
  ],
  
  // Cooking techniques with descriptions
  cookingTechniques: [
    {
      name: "Sautéing",
      description: "Cooking food quickly in a small amount of oil or fat over relatively high heat",
      bestFor: "Vegetables, small pieces of meat, seafood, aromatics like garlic and onions",
      keyPoints: [
        "Use a wide pan with sloped sides for easy tossing",
        "Preheat the pan before adding oil or butter",
        "Cut ingredients to similar sizes for even cooking",
        "Don't overcrowd the pan - cook in batches if necessary",
        "Keep ingredients moving with a spatula or by tossing the pan"
      ],
      commonMistakes: [
        "Adding ingredients to a cold pan (leads to soggy texture)",
        "Overcrowding the pan (causes steaming instead of sautéing)",
        "Using too high heat (causes burning)",
        "Not patting ingredients dry (creates steam rather than browning)"
      ]
    },
    {
      name: "Roasting",
      description: "Cooking food with dry heat in an oven, often producing caramelization on the exterior",
      bestFor: "Meats, poultry, vegetables, fruits, nuts",
      keyPoints: [
        "Preheat the oven thoroughly before adding food",
        "Use a roasting rack for meats to allow air circulation",
        "For vegetables, ensure they're not overlapping for even browning",
        "Baste or turn food occasionally for even cooking",
        "Let meats rest after roasting before carving"
      ],
      commonMistakes: [
        "Not preheating the oven completely",
        "Opening the oven door too frequently (causes temperature fluctuations)",
        "Overcrowding the roasting pan (leads to steaming rather than roasting)",
        "Not accounting for carryover cooking in meats"
      ]
    },
    {
      name: "Braising",
      description: "Cooking method that combines dry and moist heat, typically searing at high temperature followed by cooking in liquid at low temperature",
      bestFor: "Tough cuts of meat, root vegetables, legumes",
      keyPoints: [
        "Sear ingredients first to develop flavor and color",
        "Use enough liquid to cover ingredients partially, not fully",
        "Maintain a gentle simmer, not a rapid boil",
        "Cover the pot during the slow-cooking phase",
        "Season conservatively as flavors concentrate during long cooking"
      ],
      commonMistakes: [
        "Skipping the searing step (misses flavor development)",
        "Using too much liquid (dilutes flavors)",
        "Cooking at too high a temperature (toughens meat)",
        "Not checking for doneness (timing varies based on ingredients)"
      ]
    },
    {
      name: "Steaming",
      description: "Cooking food with hot vapor from boiling water without immersing it in the water",
      bestFor: "Vegetables, fish, certain dumplings and breads",
      keyPoints: [
        "Ensure water doesn't touch the food or steamer basket",
        "Bring water to a boil before adding food to the steamer",
        "Keep the lid on during steaming",
        "For vegetables, steam until just tender for best texture and nutrient retention",
        "Check water level during extended steaming"
      ],
      commonMistakes: [
        "Allowing water to touch the food (causes sogginess)",
        "Overcrowding the steamer basket (leads to uneven cooking)",
        "Taking the lid off too often (releases necessary steam)",
        "Oversteaming vegetables (causes loss of color, texture, and nutrients)"
      ]
    },
    {
      name: "Poaching",
      description: "Cooking food gently in liquid kept just below boiling point",
      bestFor: "Eggs, chicken, fish, fruit",
      keyPoints: [
        "Maintain liquid at 160-180°F (71-82°C) - look for small bubbles at the bottom of the pan",
        "Use enough liquid to completely cover the food",
        "Add aromatics to the poaching liquid for flavor",
        "Remove delicate items with a slotted spoon or spatula",
        "Poaching time varies greatly by ingredient"
      ],
      commonMistakes: [
        "Letting the liquid boil (toughens food)",
        "Using too little liquid (causes uneven cooking)",
        "Poaching foods of different sizes together (results in inconsistent doneness)",
        "Not adding salt or flavoring to the poaching liquid"
      ]
    },
    {
      name: "Stir Frying",
      description: "Quickly cooking small, uniform pieces of food in a wok or pan over very high heat with constant stirring",
      bestFor: "Bite-sized pieces of meat, seafood, vegetables",
      keyPoints: [
        "Prepare all ingredients before starting - cooking happens quickly",
        "Use an oil with high smoke point (like peanut or canola)",
        "Preheat wok or pan until very hot before adding oil",
        "Cook ingredients in order of longest to shortest cooking time",
        "Keep food moving constantly with a spatula or by tossing"
      ],
      commonMistakes: [
        "Using a wet wok/pan (prevents proper searing)",
        "Overcrowding the pan (lowers temperature and causes steaming)",
        "Using too low heat (prevents proper searing)",
        "Not having ingredients prepped before starting (causes overcooking)"
      ]
    },
    {
      name: "Grilling",
      description: "Cooking food directly over heat source (gas, charcoal, or wood)",
      bestFor: "Meats, seafood, vegetables, fruits, bread",
      keyPoints: [
        "Preheat the grill thoroughly before cooking",
        "Clean and oil grates to prevent sticking",
        "Create zones for direct and indirect heat",
        "Leave food undisturbed until it releases naturally from the grate",
        "Use a meat thermometer for accurate doneness of meats"
      ],
      commonMistakes: [
        "Flipping food too frequently (prevents proper sear marks)",
        "Pressing down on foods, especially burgers (releases flavorful juices)",
        "Applying barbecue sauce too early (causes burning due to sugar content)",
        "Not allowing meats to rest after grilling"
      ]
    },
    {
      name: "Broiling",
      description: "Cooking food with high heat from above, similar to grilling but inverted",
      bestFor: "Thin cuts of meat, fish, toasting/melting cheese, browning dishes",
      keyPoints: [
        "Position oven rack 3-6 inches from the broiler element",
        "Preheat the broiler for several minutes",
        "Keep the oven door slightly ajar for most broilers (check your appliance manual)",
        "Watch food constantly - broiling happens very quickly",
        "Use broiler-safe cookware (no plastic handles or non-stick coatings)"
      ],
      commonMistakes: [
        "Not monitoring food closely (causes burning)",
        "Placing food too close to the broiler element (causes exterior burning before interior cooks)",
        "Using inappropriate cookware (can damage pans or release harmful chemicals)",
        "Trying to broil thick items (exterior burns before interior cooks)"
      ]
    },
    {
      name: "Baking",
      description: "Cooking with dry heat in an oven, typically for items made from batters and doughs",
      bestFor: "Breads, pastries, cakes, cookies, casseroles",
      keyPoints: [
        "Preheat oven thoroughly before baking",
        "Measure ingredients precisely, especially for pastries",
        "Understand your oven's quirks (hot spots, temperature accuracy)",
        "Check for doneness with appropriate methods (toothpick test, internal temperature)",
        "Allow proper cooling time before cutting or unmolding"
      ],
      commonMistakes: [
        "Opening the oven door too frequently (causes temperature fluctuations)",
        "Inaccurate measuring of ingredients (affects chemistry of baked goods)",
        "Not rotating pans halfway through baking (leads to uneven cooking)",
        "Not accounting for carryover cooking in some items"
      ]
    },
    {
      name: "Deep Frying",
      description: "Cooking food completely submerged in hot oil",
      bestFor: "Battered foods, breaded items, certain pastries",
      keyPoints: [
        "Use oils with high smoke points (peanut, canola, refined vegetable oil)",
        "Maintain oil temperature between 350-375°F (175-190°C)",
        "Don't overcrowd the fryer (causes temperature drop)",
        "Ensure food is dry before adding to hot oil (prevents dangerous splatter)",
        "Use a thermometer for accurate temperature control"
      ],
      commonMistakes: [
        "Using too small a container (causes dangerous overflow)",
        "Adding wet battered foods directly from the batter (causes oil to bubble over)",
        "Frying at too low a temperature (makes food greasy)",
        "Frying at too high a temperature (burns exterior before interior cooks)"
      ]
    },
    {
      name: "Blanching",
      description: "Briefly cooking ingredients in boiling water followed by immediate cooling in ice water",
      bestFor: "Vegetables, removing skins from tomatoes or peaches, reducing bitterness",
      keyPoints: [
        "Use plenty of water at a rolling boil",
        "Salt the water generously (it should taste like seawater)",
        "Prepare ice bath before blanching",
        "Time precisely - usually 30 seconds to 2 minutes depending on ingredient",
        "Transfer immediately to ice bath to stop cooking"
      ],
      commonMistakes: [
        "Not using enough water (causes temperature to drop too much)",
        "Overcrowding the pot (leads to uneven blanching)",
        "Blanching for too long (overcooks vegetables)",
        "Not shocking in ice water (allows carryover cooking)"
      ]
    },
    {
      name: "Simmering",
      description: "Cooking in liquid maintained just below boiling point with small bubbles occasionally rising to the surface",
      bestFor: "Soups, stews, sauces, dried legumes, tough cuts of meat",
      keyPoints: [
        "Maintain temperature around 185-200°F (85-93°C)",
        "Look for small bubbles around the edges with occasional breaks on the surface",
        "Cover for even heat distribution (or leave uncovered to reduce liquids)",
        "Stir occasionally to prevent sticking",
        "Adjust heat as needed to maintain proper simmer"
      ],
      commonMistakes: [
        "Confusing simmering with boiling (boiling is too rough for many foods)",
        "Simmering with lid off when not trying to reduce (causes excess evaporation)",
        "Not adjusting heat as needed (heat requirements change throughout cooking)",
        "Adding all ingredients at once instead of considering cooking times"
      ]
    }
  ],
  
  // Basic ingredient substitutions
  ingredientSubstitutions: [
    {
      ingredient: "Butter",
      substitutions: [
        {
          substitute: "Olive Oil",
          ratio: "3/4 cup oil for each cup of butter",
          bestFor: "Sautéing, some baking (especially savory items)",
          notes: "Will change flavor profile. Not ideal for delicate baked goods."
        },
        {
          substitute: "Coconut Oil",
          ratio: "1:1 replacement",
          bestFor: "Baking, sautéing, general cooking",
          notes: "Imparts a slight coconut flavor. Use refined coconut oil for a more neutral taste."
        },
        {
          substitute: "Applesauce (unsweetened)",
          ratio: "1:1 replacement",
          bestFor: "Baking moist items like cakes, muffins, quickbreads",
          notes: "Reduces fat content. Best when replacing half the butter. May need to reduce other liquids."
        },
        {
          substitute: "Greek Yogurt",
          ratio: "1:1 replacement",
          bestFor: "Baking cakes, muffins, quickbreads",
          notes: "Adds protein and reduces fat. Works best in recipes where dairy flavors are appropriate."
        },
        {
          substitute: "Avocado",
          ratio: "1:1 replacement (puréed)",
          bestFor: "Baking, especially chocolate recipes",
          notes: "Adds richness and healthy fats. Slight color change in lighter baked goods."
        }
      ]
    },
    {
      ingredient: "Eggs",
      substitutions: [
        {
          substitute: "Flax or Chia Seeds",
          ratio: "1 tablespoon ground seeds + 3 tablespoons water = 1 egg (let sit 15 minutes)",
          bestFor: "Binding in baking, especially hearty baked goods",
          notes: "Creates a gelatinous mixture similar to egg. Visible specks may appear in final product."
        },
        {
          substitute: "Applesauce",
          ratio: "1/4 cup = 1 egg",
          bestFor: "Baking moist items like cakes, muffins, quickbreads",
          notes: "Works as a binder but doesn't help with leavening. Adds slight sweetness."
        },
        {
          substitute: "Mashed Banana",
          ratio: "1/4 cup = 1 egg",
          bestFor: "Sweet baked goods like muffins, pancakes, quickbreads",
          notes: "Adds banana flavor, which works well in many sweet recipes."
        },
        {
          substitute: "Aquafaba (chickpea liquid)",
          ratio: "3 tablespoons = 1 egg, 2 tablespoons = 1 egg white",
          bestFor: "Meringues, mousses, macarons, recipes needing whipped egg whites",
          notes: "Can be whipped like egg whites. Mild flavor that disappears in most recipes."
        },
        {
          substitute: "Silken Tofu",
          ratio: "1/4 cup puréed = 1 egg",
          bestFor: "Custards, quiches, dense cakes, brownies",
          notes: "Best in recipes where eggs provide moisture and density rather than leavening."
        }
      ]
    },
    {
      ingredient: "All-Purpose Flour",
      substitutions: [
        {
          substitute: "Cake Flour",
          ratio: "1 cup + 2 tablespoons cake flour = 1 cup all-purpose flour",
          bestFor: "Cakes, pastries, biscuits, other delicate baked goods",
          notes: "Creates lighter, softer texture in baked goods."
        },
        {
          substitute: "Bread Flour",
          ratio: "1:1 replacement",
          bestFor: "Breads, pizza dough, other items needing chewiness",
          notes: "Higher protein content creates more gluten and chewier texture."
        },
        {
          substitute: "Whole Wheat Flour",
          ratio: "7/8 cup whole wheat flour = 1 cup all-purpose flour",
          bestFor: "Breads, cookies, heartier baked goods",
          notes: "Creates denser, nuttier results. Best when replacing half the flour in most recipes."
        },
        {
          substitute: "Gluten-Free Flour Blend",
          ratio: "1:1 replacement (for blends formulated for 1:1 substitution)",
          bestFor: "Most baking applications when gluten must be avoided",
          notes: "Results vary greatly based on the blend. May need additional binders like xanthan gum."
        },
        {
          substitute: "Almond Flour",
          ratio: "1:1 replacement (may need adjustment)",
          bestFor: "Cookies, quickbreads, pancakes",
          notes: "Cannot replace flour in all recipes due to lack of gluten. Creates denser, moister results."
        }
      ]
    },
    {
      ingredient: "Milk",
      substitutions: [
        {
          substitute: "Plant-Based Milks (almond, soy, oat)",
          ratio: "1:1 replacement",
          bestFor: "Most recipes calling for milk",
          notes: "Different plant milks have different flavors and fat contents affecting results. Oat and soy work best for most cooking applications."
        },
        {
          substitute: "Evaporated Milk",
          ratio: "1/2 cup evaporated milk + 1/2 cup water = 1 cup milk",
          bestFor: "Baking, cream soups, sauces",
          notes: "Adds richness due to higher protein content."
        },
        {
          substitute: "Yogurt",
          ratio: "3/4 cup yogurt + 1/4 cup water = 1 cup milk",
          bestFor: "Baking, marinades, cream-based dishes",
          notes: "Adds tanginess and protein. Use plain yogurt unless sweetness is desired."
        },
        {
          substitute: "Sour Cream",
          ratio: "1 cup sour cream + 1/4 cup water = 1 cup milk",
          bestFor: "Baking, creamy soups and sauces",
          notes: "Adds richness and tanginess. Best in savory dishes or baked goods that benefit from richness."
        },
        {
          substitute: "Water",
          ratio: "1:1 replacement (in desperate situations)",
          bestFor: "Recipes where milk is not the main ingredient",
          notes: "Add 1 tablespoon butter per cup to improve richness. Will lack protein and fat of milk."
        }
      ]
    },
    {
      ingredient: "Sugar (White/Granulated)",
      substitutions: [
        {
          substitute: "Brown Sugar",
          ratio: "1:1 replacement",
          bestFor: "Most recipes calling for white sugar",
          notes: "Adds subtle molasses flavor and moisture. May darken light-colored dishes."
        },
        {
          substitute: "Honey",
          ratio: "3/4 cup honey = 1 cup sugar",
          bestFor: "Baking, sauces, dressings",
          notes: "Reduce other liquids by 1/4 cup per cup of honey. Lower oven temperature by 25°F to prevent over-browning."
        },
        {
          substitute: "Maple Syrup",
          ratio: "3/4 cup maple syrup = 1 cup sugar",
          bestFor: "Baking, sauces, beverages",
          notes: "Reduce other liquids by 3 tablespoons per cup of maple syrup. Adds distinct flavor."
        },
        {
          substitute: "Coconut Sugar",
          ratio: "1:1 replacement",
          bestFor: "Most recipes calling for brown or white sugar",
          notes: "Less sweet with a slight caramel flavor. Similar texture to brown sugar."
        },
        {
          substitute: "Applesauce (unsweetened)",
          ratio: "1:1 replacement",
          bestFor: "Baking moist items like cakes, muffins, quickbreads",
          notes: "Best when replacing half the sugar. Reduces sweetness but adds moisture and some natural sweetness."
        }
      ]
    },
    {
      ingredient: "Sour Cream",
      substitutions: [
        {
          substitute: "Greek Yogurt",
          ratio: "1:1 replacement",
          bestFor: "Dips, dressings, baking, garnishes",
          notes: "Nearly identical results with higher protein, lower fat. Slightly tangier."
        },
        {
          substitute: "Plain Yogurt",
          ratio: "1:1 replacement",
          bestFor: "Dressings, marinades, baking",
          notes: "Thinner consistency; strain through cheesecloth for closer texture match."
        },
        {
          substitute: "Buttermilk",
          ratio: "1:1 replacement (for baking)",
          bestFor: "Baking applications",
          notes: "Much thinner consistency, so not suitable for dips or toppings."
        },
        {
          substitute: "Coconut Cream",
          ratio: "1:1 replacement",
          bestFor: "Dairy-free applications, especially in curries and some desserts",
          notes: "Adds coconut flavor. For closer tanginess, add 1 tablespoon lemon juice per cup."
        },
        {
          substitute: "Cream Cheese",
          ratio: "1:1 replacement (softened and thinned with 1-2 tablespoons milk)",
          bestFor: "Dips, toppings, some baking",
          notes: "Richer, less tangy. Works well in frosting and creamy applications."
        }
      ]
    },
    {
      ingredient: "Buttermilk",
      substitutions: [
        {
          substitute: "Milk + Acid",
          ratio: "1 cup milk + 1 tablespoon vinegar or lemon juice (let stand 5-10 minutes)",
          bestFor: "Baking, marinades, dressings",
          notes: "Nearly identical results in most recipes. Use white vinegar or lemon juice."
        },
        {
          substitute: "Yogurt",
          ratio: "3/4 cup yogurt + 1/4 cup water or milk",
          bestFor: "Baking, dressings, marinades",
          notes: "Slightly thicker consistency but works well in most recipes."
        },
        {
          substitute: "Kefir",
          ratio: "1:1 replacement",
          bestFor: "Any buttermilk application",
          notes: "Very similar in acidity and consistency. Excellent substitute."
        },
        {
          substitute: "Sour Cream",
          ratio: "3/4 cup sour cream + 1/4 cup water or milk",
          bestFor: "Baking, especially quick breads",
          notes: "Provides acidity but is much thicker; thinning helps match consistency."
        },
        {
          substitute: "Buttermilk Powder",
          ratio: "Follow package directions (typically 1/4 cup powder + 1 cup water)",
          bestFor: "Any buttermilk application",
          notes: "Convenient shelf-stable option with very similar results."
        }
      ]
    },
    {
      ingredient: "Cream of Tartar",
      substitutions: [
        {
          substitute: "Lemon Juice or White Vinegar",
          ratio: "3 times the amount of cream of tartar called for",
          bestFor: "Stabilizing egg whites, preventing crystallization in syrups",
          notes: "For egg whites: 1/2 teaspoon lemon juice per egg white replaces 1/8 teaspoon cream of tartar."
        },
        {
          substitute: "Baking Powder",
          ratio: "1.5 teaspoons baking powder = 1 teaspoon cream of tartar + 1/2 teaspoon baking soda",
          bestFor: "Baking recipes where cream of tartar is used with baking soda",
          notes: "Only use when recipe calls for both cream of tartar and baking soda."
        },
        {
          substitute: "Buttermilk",
          ratio: "Replace liquid in recipe with equal amount of buttermilk; omit cream of tartar + reduce baking soda by 1/2 teaspoon",
          bestFor: "Baking recipes where cream of tartar provides acidity",
          notes: "Adjust other liquids in recipe to compensate for added buttermilk."
        },
        {
          substitute: "Yogurt",
          ratio: "Replace liquid in recipe with equal amount of yogurt; omit cream of tartar",
          bestFor: "Baking recipes where cream of tartar provides acidity",
          notes: "Similar to buttermilk substitution, requires adjusting other liquids."
        }
      ]
    },
    {
      ingredient: "Fresh Herbs",
      substitutions: [
        {
          substitute: "Dried Herbs",
          ratio: "1 teaspoon dried herbs = 1 tablespoon fresh herbs (1:3 ratio)",
          bestFor: "Most cooking applications, especially those with longer cooking times",
          notes: "Add dried herbs earlier in cooking process to rehydrate. Dried herbs have more concentrated flavor."
        },
        {
          substitute: "Other Fresh Herbs",
          ratio: "1:1 replacement within herb families",
          bestFor: "Finishing dishes, salads, quick-cooking applications",
          notes: "Mint, basil, and cilantro can sometimes substitute for each other in certain cuisines. Thyme, oregano, marjoram, and sage can often be interchanged."
        },
        {
          substitute: "Herb Pastes",
          ratio: "1-2 teaspoons paste = 1 tablespoon fresh herbs",
          bestFor: "Most cooking applications",
          notes: "Concentrated flavor, often includes oil and salt; adjust recipe accordingly."
        },
        {
          substitute: "Frozen Herbs",
          ratio: "1:1 replacement for fresh herbs",
          bestFor: "Cooked applications rather than garnishes",
          notes: "Texture changes when frozen but flavor remains. Best added during cooking."
        }
      ]
    },
    {
      ingredient: "Bread Crumbs",
      substitutions: [
        {
          substitute: "Rolled Oats",
          ratio: "1:1 replacement (pulse in food processor for finer texture)",
          bestFor: "Binding meatballs, meatloaf, veggie burgers",
          notes: "Adds nutty flavor and creates moister texture. Works well in most savory applications."
        },
        {
          substitute: "Crushed Crackers",
          ratio: "1:1 replacement",
          bestFor: "Breading, casserole toppings, binding",
          notes: "Saltines, Ritz, or any plain cracker works well. Adjust salt in recipe as crackers are often salty."
        },
        {
          substitute: "Crushed Cereal",
          ratio: "1:1 replacement",
          bestFor: "Breading, toppings",
          notes: "Cornflakes, rice cereals, or other unsweetened cereals work well. Provides extra crunch."
        },
        {
          substitute: "Ground Nuts",
          ratio: "1:1 replacement",
          bestFor: "Breading, toppings for baked goods",
          notes: "Creates rich, flavorful crust. Almonds, walnuts, pecans, or pistachios work well. Watch for burning as nuts cook faster."
        },
        {
          substitute: "Grated Parmesan",
          ratio: "1:1 replacement (for breading only)",
          bestFor: "Breading for meats, vegetables",
          notes: "Creates crispy, flavorful crust. Best mixed with other ingredients for coating. Low-carb alternative."
        }
      ]
    }
  ],
  
  // Common cooking conversions
  cookingConversions: [
    {
      category: "Volume Measurements (US to Metric)",
      conversions: [
        { from: "1/4 teaspoon", to: "1.25 milliliters" },
        { from: "1/2 teaspoon", to: "2.5 milliliters" },
        { from: "1 teaspoon", to: "5 milliliters" },
        { from: "1 tablespoon", to: "15 milliliters" },
        { from: "1/4 cup", to: "60 milliliters" },
        { from: "1/3 cup", to: "80 milliliters" },
        { from: "1/2 cup", to: "120 milliliters" },
        { from: "2/3 cup", to: "160 milliliters" },
        { from: "3/4 cup", to: "180 milliliters" },
        { from: "1 cup", to: "240 milliliters" },
        { from: "1 pint (2 cups)", to: "480 milliliters" },
        { from: "1 quart (4 cups)", to: "950 milliliters" },
        { from: "1 gallon (16 cups)", to: "3.8 liters" }
      ]
    },
    {
      category: "Weight Measurements (US to Metric)",
      conversions: [
        { from: "1 ounce", to: "28 grams" },
        { from: "1 pound", to: "454 grams" },
        { from: "1 pound", to: "0.45 kilograms" }
      ]
    },
    {
      category: "Common Ingredient Weights (1 cup)",
      conversions: [
        { from: "1 cup all-purpose flour", to: "120-125 grams" },
        { from: "1 cup granulated sugar", to: "200 grams" },
        { from: "1 cup brown sugar (packed)", to: "220 grams" },
        { from: "1 cup confectioners' sugar", to: "120 grams" },
        { from: "1 cup butter (2 sticks)", to: "227 grams" },
        { from: "1 cup milk", to: "240 grams" },
        { from: "1 cup honey", to: "340 grams" },
        { from: "1 cup cocoa powder", to: "85 grams" },
        { from: "1 cup chocolate chips", to: "170 grams" },
        { from: "1 cup nuts (whole)", to: "120-150 grams" },
        { from: "1 cup rice (uncooked)", to: "185 grams" },
        { from: "1 cup oats (rolled)", to: "90 grams" }
      ]
    },
    {
      category: "Temperature Conversions",
      conversions: [
        { from: "325°F", to: "165°C / Gas Mark 3" },
        { from: "350°F", to: "175°C / Gas Mark 4" },
        { from: "375°F", to: "190°C / Gas Mark 5" },
        { from: "400°F", to: "200°C / Gas Mark 6" },
        { from: "425°F", to: "220°C / Gas Mark 7" },
        { from: "450°F", to: "230°C / Gas Mark 8" },
        { from: "475°F", to: "245°C / Gas Mark 9" }
      ]
    },
    {
      category: "Common Substitutions (Volume)",
      conversions: [
        { from: "1 tablespoon", to: "3 teaspoons" },
        { from: "1/4 cup", to: "4 tablespoons" },
        { from: "1/3 cup", to: "5 tablespoons + 1 teaspoon" },
        { from: "1/2 cup", to: "8 tablespoons" },
        { from: "2/3 cup", to: "10 tablespoons + 2 teaspoons" },
        { from: "3/4 cup", to: "12 tablespoons" },
        { from: "1 cup", to: "16 tablespoons" },
        { from: "1 fluid ounce", to: "2 tablespoons" },
        { from: "1 pint", to: "2 cups" },
        { from: "1 quart", to: "4 cups" },
        { from: "1 quart", to: "2 pints" },
        { from: "1 gallon", to: "4 quarts" }
      ]
    }
  ],
  
  // Food safety guidelines
  foodSafetyGuidelines: [
    {
      category: "Safe Storage Temperatures",
      guidelines: [
        "Keep refrigerator at 40°F (4°C) or below",
        "Keep freezer at 0°F (-18°C) or below",
        "Refrigerate perishable foods within 2 hours (1 hour if above 90°F/32°C)",
        "Cold foods should be kept at 40°F (4°C) or below",
        "Hot foods should be kept at 140°F (60°C) or above"
      ]
    },
    {
      category: "Cooking Temperatures (Internal)",
      guidelines: [
        "Ground meats: 160°F (71°C)",
        "Fresh beef, veal, lamb steaks/chops/roasts: 145°F (63°C) with 3-minute rest",
        "Poultry (whole, parts, ground): 165°F (74°C)",
        "Pork and ham: 145°F (63°C) with 3-minute rest",
        "Fish and shellfish: 145°F (63°C)",
        "Leftovers and casseroles: 165°F (74°C)",
        "Egg dishes: 160°F (71°C)"
      ]
    },
    {
      category: "Food Storage Duration (Refrigerator)",
      guidelines: [
        "Raw poultry: 1-2 days",
        "Raw ground meats: 1-2 days",
        "Raw steaks, chops, roasts: 3-5 days",
        "Cooked meat, poultry, seafood: 3-4 days",
        "Soups and stews: 3-4 days",
        "Eggs in shell: 3-5 weeks",
        "Hard-boiled eggs: 1 week",
        "Opened lunch meat: 3-5 days",
        "Opened milk: 5-7 days",
        "Leftovers: 3-4 days"
      ]
    },
    {
      category: "Food Storage Duration (Freezer for Quality)",
      guidelines: [
        "Raw poultry (whole): 1 year",
        "Raw poultry (pieces): 9 months",
        "Raw ground meats: 3-4 months",
        "Raw steaks, chops, roasts: 4-12 months",
        "Cooked meat and poultry: 2-6 months",
        "Soups and stews: 2-3 months",
        "Fresh fish and shellfish: 3-6 months"
      ]
    },
    {
      category: "Preventing Cross-Contamination",
      guidelines: [
        "Use separate cutting boards for raw meat/poultry and produce",
        "Wash hands for 20 seconds with soap after handling raw meats",
        "Never place cooked food on a plate that previously held raw meat",
        "Wash all utensils, cutting boards, and counters that touched raw meat",
        "Store raw meat on the bottom shelf of the refrigerator",
        "Keep raw meat, poultry, seafood, and eggs separate from other foods in shopping carts and bags"
      ]
    },
    {
      category: "Thawing Safety",
      guidelines: [
        "Thaw in refrigerator (safest method) - requires planning ahead",
        "Thaw in cold water, changing water every 30 minutes",
        "Thaw in microwave, cooking immediately afterward",
        "Cook without thawing (adds about 50% more cooking time)",
        "Never thaw at room temperature on the counter",
        "Once thawed, food should not be refrozen without cooking"
      ]
    },
    {
      category: "Cleaning and Sanitizing",
      guidelines: [
        "Wash hands for 20 seconds with soap before and during food preparation",
        "Wash produce thoroughly under running water",
        "Clean surfaces with hot, soapy water before and after food preparation",
        "Sanitize surfaces with a solution of 1 tablespoon bleach to 1 gallon water",
        "Wash dishcloths and kitchen towels frequently on hot cycle",
        "Replace sponges frequently or sanitize daily (wet and microwave for 1 minute)"
      ]
    }
  ],
  
  // Meal planning templates
  mealPlanningTemplates: [
    {
      name: "Weekly Family Meal Plan",
      description: "A balanced weekly plan for families with busy schedules",
      template: [
        {
          day: "Monday",
          meal: "Quick Protein & Veggies",
          example: "Sheet Pan Chicken with Roasted Vegetables",
          tip: "Prep vegetables the night before to save time. Make extra for Tuesday's lunch."
        },
        {
          day: "Tuesday",
          meal: "Pasta Night",
          example: "Whole Wheat Pasta with Tomato Sauce and Side Salad",
          tip: "Keep jarred sauce on hand and enhance with fresh herbs. Add any protein leftovers from Monday."
        },
        {
          day: "Wednesday",
          meal: "Slow Cooker Day",
          example: "Slow Cooker Chili or Stew with Cornbread",
          tip: "Prep slow cooker ingredients the night before and refrigerate the insert."
        },
        {
          day: "Thursday",
          meal: "Breakfast for Dinner",
          example: "Veggie Frittata with Toast and Fruit",
          tip: "Great way to use up vegetables. Quick to prepare on busy evenings."
        },
        {
          day: "Friday",
          meal: "Pizza Night",
          example: "Homemade or Semi-homemade Pizza with Toppings",
          tip: "Keep pre-made dough or crusts in freezer. Let kids customize their portions."
        },
        {
          day: "Saturday",
          meal: "International Night",
          example: "Tacos, Stir-fry, or Curry",
          tip: "More time on weekends for slightly more involved recipes. Double recipes to have leftovers."
        },
        {
          day: "Sunday",
          meal: "Sunday Roast or Batch Cooking",
          example: "Roasted Meat or Vegetable Lasagna",
          tip: "Cook once, eat twice - plan to use Sunday's dinner in Monday's lunch."
        }
      ]
    },
    {
      name: "Meal Prep Sunday Plan",
      description: "Prepare components ahead for quick assembly during busy weekdays",
      components: [
        {
          category: "Proteins (choose 2-3)",
          examples: [
            "Grilled or roasted chicken breast",
            "Hard-boiled eggs",
            "Seasoned ground turkey or beef",
            "Baked tofu or tempeh",
            "Slow cooker beans",
            "Canned tuna or salmon"
          ],
          tip: "Cook proteins simply with versatile seasonings to use in multiple dishes."
        },
        {
          category: "Grains & Starches (choose 1-2)",
          examples: [
            "Brown rice or quinoa",
            "Roasted sweet or white potatoes",
            "Cooked pasta",
            "Prepared oatmeal",
            "Farro or barley"
          ],
          tip: "Cooked grains last 3-4 days in the refrigerator or can be frozen in portions."
        },
        {
          category: "Vegetables (choose 3-4)",
          examples: [
            "Roasted vegetable medley",
            "Washed and chopped salad greens",
            "Pre-cut vegetable sticks",
            "Steamed or blanched broccoli/green beans",
            "Sautéed greens"
          ],
          tip: "Keep some vegetables raw for maximum longevity. Store with paper towel to absorb moisture."
        },
        {
          category: "Sauces & Dressings (choose 2-3)",
          examples: [
            "Homemade vinaigrette",
            "Yogurt-based dip",
            "Pesto",
            "Tahini sauce",
            "Salsa or pico de gallo"
          ],
          tip: "Store in small containers or mason jars. Brighten flavors with fresh herbs or citrus just before serving."
        },
        {
          category: "Snacks (choose 2-3)",
          examples: [
            "Trail mix portions",
            "Cut fruit",
            "Hummus",
            "Energy balls",
            "Yogurt parfait components"
          ],
          tip: "Pre-portion into grab-and-go containers to make healthy snacking easier."
        }
      ],
      mealIdeas: [
        "Grain bowls: grain base + protein + vegetables + sauce",
        "Wraps/sandwiches: protein + vegetables + spread in wrap or bread",
        "Salad jars: dressing on bottom, hearty vegetables, protein, then greens on top",
        "Bento boxes: protein + grain + vegetables + fruit + small treat",
        "Breakfast parfaits: yogurt + granola + fruit layers in jars"
      ]
    },
    {
      name: "Budget-Friendly Meal Plan",
      description: "Maximize nutrition while minimizing cost with strategic planning",
      strategies: [
        {
          strategy: "Use Inexpensive Protein Sources",
          examples: [
            "Dried beans and lentils",
            "Eggs",
            "Canned tuna or salmon",
            "Whole chicken (butcher yourself)",
            "Ground turkey or chicken",
            "Tofu"
          ]
        },
        {
          strategy: "Incorporate Economical Grains",
          examples: [
            "Rice (especially in bulk)",
            "Oats",
            "Barley",
            "Pasta (on sale)",
            "Cornmeal for polenta/cornbread"
          ]
        },
        {
          strategy: "Shop Seasonal Produce",
          examples: [
            "Check farmers markets near closing time",
            "Focus on versatile vegetables (carrots, cabbage, potatoes, onions)",
            "Use frozen vegetables for out-of-season items",
            "Regrow green onions and herbs in water"
          ]
        },
        {
          strategy: "Reduce Food Waste",
          examples: [
            "Plan 'clean out fridge' meals weekly (soups, stir-fries, frittatas)",
            "Freeze leftovers promptly",
            "Save vegetable scraps for homemade stock",
            "Repurpose stale bread into croutons or breadcrumbs"
          ]
        },
        {
          strategy: "Batch Cook Basics",
          examples: [
            "Make large batches of beans, grains, and sauces",
            "Cook whole chickens and use meat for multiple meals",
            "Prepare versatile tomato sauce for pasta, pizza, and casseroles"
          ]
        }
      ],
      sampleWeek: [
        {
          day: "Monday",
          meal: "Bean and Rice Bowls with Seasonal Vegetables",
          tip: "Cook extra beans and rice for later in the week."
        },
        {
          day: "Tuesday",
          meal: "Vegetable Frittata with Side Salad",
          tip: "Use any vegetables that need to be used up soon."
        },
        {
          day: "Wednesday",
          meal: "Whole Chicken with Roasted Vegetables",
          tip: "Save carcass for stock and use leftover meat in Thursday's meal."
        },
        {
          day: "Thursday",
          meal: "Chicken and Vegetable Soup with Homemade Stock",
          tip: "Make stock overnight in slow cooker using Wednesday's chicken carcass."
        },
        {
          day: "Friday",
          meal: "Pasta with Quick Tomato Sauce and Beans",
          tip: "Use some of Monday's beans in the sauce for protein."
        },
        {
          day: "Saturday",
          meal: "Lentil Curry with Rice",
          tip: "Lentils are inexpensive and don't require pre-soaking like beans."
        },
        {
          day: "Sunday",
          meal: "Leftovers Remix or Pantry Meal",
          tip: "Combine small amounts of leftovers into burritos, quesadillas, or grain bowls."
        }
      ]
    },
    {
      name: "Plant-Based Meal Plan",
      description: "Nutritionally balanced meals focusing on plant-based ingredients",
      nutritionTips: [
        {
          category: "Protein Sources",
          examples: [
            "Legumes (beans, lentils, chickpeas)",
            "Tofu, tempeh, and edamame",
            "Seitan (wheat gluten)",
            "Nuts and seeds",
            "Nutritional yeast",
            "Whole grains (quinoa, amaranth)"
          ]
        },
        {
          category: "Important Nutrients to Include",
          examples: [
            "Vitamin B12: fortified plant milks, nutritional yeast, supplements",
            "Iron: lentils, tofu, spinach, fortified cereals (pair with vitamin C for absorption)",
            "Calcium: fortified plant milks, tahini, leafy greens, calcium-set tofu",
            "Omega-3: ground flaxseeds, chia seeds, walnuts, algae supplements",
            "Vitamin D: fortified foods, mushrooms exposed to sunlight, supplements"
          ]
        },
        {
          category: "Meal Components Balance",
          examples: [
            "½ plate vegetables and fruits",
            "¼ plate protein (legumes, tofu, etc.)",
            "¼ plate whole grains or starchy vegetables",
            "Include sources of healthy fats (avocado, nuts, seeds, olive oil)"
          ]
        }
      ],
      mealIdeas: [
        {
          category: "Breakfast",
          examples: [
            "Overnight oats with fruits, nuts, and ground flaxseeds",
            "Tofu scramble with vegetables and nutritional yeast",
            "Smoothie bowl with plant protein, fruits, and nut butter",
            "Whole grain toast with avocado and hemp seeds"
          ]
        },
        {
          category: "Lunch",
          examples: [
            "Buddha bowl (grain + legume + vegetables + sauce)",
            "Lentil soup with whole grain bread",
            "Chickpea salad sandwich on whole grain bread",
            "Collard green wraps with hummus and vegetables"
          ]
        },
        {
          category: "Dinner",
          examples: [
            "Stir-fried tofu with vegetables over brown rice",
            "Black bean and sweet potato tacos",
            "Lentil shepherd's pie with mashed potatoes",
            "Whole grain pasta with vegetable-based sauce and cannellini beans"
          ]
        },
        {
          category: "Snacks",
          examples: [
            "Hummus with vegetable sticks",
            "Trail mix with nuts, seeds, and dried fruits",
            "Roasted chickpeas",
            "Chia pudding",
            "Apple with almond butter"
          ]
        }
      ],
      sampleDay: [
        {
          meal: "Breakfast",
          example: "Overnight oats with chia seeds, berries, and walnuts",
          nutritionHighlights: "Omega-3 from chia and walnuts, protein from oats, antioxidants from berries"
        },
        {
          meal: "Lunch",
          example: "Quinoa bowl with roasted sweet potatoes, chickpeas, kale, and tahini dressing",
          nutritionHighlights: "Complete protein from quinoa, iron from chickpeas and kale, calcium from tahini"
        },
        {
          meal: "Dinner",
          example: "Lentil and vegetable curry with brown rice",
          nutritionHighlights: "Protein and iron from lentils, varying nutrients from mixed vegetables"
        },
        {
          meal: "Snacks",
          example: "Apple with almond butter; hummus with carrots",
          nutritionHighlights: "Healthy fats and protein from nuts, fiber from fruits and vegetables"
        }
      ]
    }
  ],
  
  // Flavor profiles and pairings
  flavorProfiles: [
    {
      cuisine: "Italian",
      keyIngredients: [
        "Tomatoes", "Garlic", "Basil", "Oregano", "Olive oil", 
        "Parmesan cheese", "Balsamic vinegar", "Rosemary", "Thyme"
      ],
      signatureDishes: [
        "Pasta with tomato sauce", "Risotto", "Pizza", 
        "Osso buco", "Lasagna", "Polenta"
      ],
      commonPairings: [
        "Tomatoes + Basil", "Pasta + Garlic + Olive Oil", 
        "Rosemary + Lamb", "Basil + Mozzarella + Tomato"
      ],
      aromatics: "Garlic, basil, oregano, and parsley form the aromatic foundation of many Italian dishes."
    },
    {
      cuisine: "French",
      keyIngredients: [
        "Butter", "Shallots", "Wine", "Herbs de Provence", 
        "Tarragon", "Dijon mustard", "Cream", "Leeks"
      ],
      signatureDishes: [
        "Coq au vin", "Boeuf Bourguignon", "Ratatouille", 
        "Cassoulet", "Soufflé", "Quiche"
      ],
      commonPairings: [
        "White Wine + Cream + Mushrooms", "Tarragon + Chicken", 
        "Shallots + Butter + White Wine", "Dijon + White Wine + Cream"
      ],
      aromatics: "The 'mirepoix' of onions, carrots, and celery creates the flavor base for many French stocks and sauces."
    },
    {
      cuisine: "Mexican",
      keyIngredients: [
        "Chiles", "Lime", "Cilantro", "Cumin", "Oregano", 
        "Corn", "Beans", "Tomatoes", "Avocado"
      ],
      signatureDishes: [
        "Tacos", "Enchiladas", "Mole", "Pozole", 
        "Tamales", "Chiles rellenos"
      ],
      commonPairings: [
        "Chile + Lime + Cilantro", "Corn + Chile + Cheese", 
        "Cumin + Oregano + Chile", "Chocolate + Chile (in mole)"
      ],
      aromatics: "Mexican 'sofrito' typically includes onions, garlic, and chiles sautéed as a flavor base."
    },
    {
      cuisine: "Chinese (varied by region)",
      keyIngredients: [
        "Soy sauce", "Ginger", "Garlic", "Scallions", 
        "Rice wine", "Five spice powder", "Sesame oil", "Chili oil"
      ],
      signatureDishes: [
        "Dim sum", "Kung Pao chicken", "Mapo tofu", 
        "Hot pot", "Peking duck", "Fried rice"
      ],
      commonPairings: [
        "Ginger + Scallion + Garlic", "Star Anise + Soy Sauce + Sugar", 
        "Sesame Oil + Soy Sauce", "Garlic + Chiles + Sichuan Peppercorns"
      ],
      aromatics: "The combination of scallions, ginger, and garlic forms the aromatic foundation of many Chinese dishes."
    },
    {
      cuisine: "Indian",
      keyIngredients: [
        "Turmeric", "Cumin", "Coriander", "Cardamom", "Garam masala", 
        "Ghee", "Chilies", "Ginger", "Garlic"
      ],
      signatureDishes: [
        "Curry dishes", "Biryani", "Tandoori meats", 
        "Samosas", "Dal", "Naan"
      ],
      commonPairings: [
        "Cumin + Coriander + Turmeric", "Ginger + Garlic + Green Chili", 
        "Cardamom + Cinnamon + Cloves", "Yogurt + Spices (for marinades)"
      ],
      aromatics: "Indian cooking often begins with blooming spices in hot oil or ghee, sometimes with onions, ginger, and garlic."
    },
    {
      cuisine: "Thai",
      keyIngredients: [
        "Fish sauce", "Lemongrass", "Lime leaves", "Coconut milk", 
        "Chilies", "Thai basil", "Galangal", "Palm sugar"
      ],
      signatureDishes: [
        "Pad Thai", "Green, red, and yellow curries", "Tom Yum soup", 
        "Papaya salad", "Massaman curry", "Larb"
      ],
      commonPairings: [
        "Lime + Fish Sauce + Chili", "Lemongrass + Coconut + Galangal", 
        "Peanuts + Chili + Lime", "Thai Basil + Garlic + Chili"
      ],
      aromatics: "Thai curry pastes typically contain lemongrass, galangal, kaffir lime leaves, chilies, and other aromatics."
    },
    {
      cuisine: "Japanese",
      keyIngredients: [
        "Soy sauce", "Mirin", "Sake", "Dashi", "Miso", 
        "Rice vinegar", "Wasabi", "Ginger", "Nori seaweed"
      ],
      signatureDishes: [
        "Sushi", "Ramen", "Tempura", "Miso soup", 
        "Teriyaki dishes", "Donburi rice bowls"
      ],
      commonPairings: [
        "Soy Sauce + Mirin + Sake", "Dashi + Miso", 
        "Ginger + Wasabi + Soy Sauce", "Rice Vinegar + Sugar + Salt"
      ],
      aromatics: "Dashi, a stock made from kombu seaweed and dried bonito flakes, forms the umami-rich foundation of many Japanese dishes."
    },
    {
      cuisine: "Middle Eastern",
      keyIngredients: [
        "Olive oil", "Parsley", "Mint", "Cumin", "Cinnamon", 
        "Sesame (tahini)", "Lemon", "Garlic", "Sumac"
      ],
      signatureDishes: [
        "Hummus", "Falafel", "Kebabs", "Tabbouleh", 
        "Shakshuka", "Kibbeh"
      ],
      commonPairings: [
        "Lemon + Parsley + Olive Oil", "Tahini + Garlic + Lemon", 
        "Cumin + Coriander + Cinnamon", "Yogurt + Mint + Cucumber"
      ],
      aromatics: "Many Middle Eastern dishes feature a base of sautéed onions, garlic, and spices like cumin and coriander."
    },
    {
      cuisine: "Mediterranean",
      keyIngredients: [
        "Olive oil", "Lemon", "Oregano", "Garlic", "Feta cheese", 
        "Olives", "Tomatoes", "Eggplant", "Fresh herbs"
      ],
      signatureDishes: [
        "Greek salad", "Paella", "Moussaka", "Ratatouille", 
        "Bouillabaisse", "Mezze platters"
      ],
      commonPairings: [
        "Olive Oil + Lemon + Oregano", "Tomato + Basil + Garlic", 
        "Olives + Feta + Oregano", "Eggplant + Olive Oil + Garlic"
      ],
      aromatics: "The Mediterranean 'soffritto' varies by region but often includes olive oil, garlic, and aromatic vegetables."
    },
    {
      cuisine: "American Southern",
      keyIngredients: [
        "Bacon fat", "Butter", "Hot sauce", "Black pepper", 
        "Cayenne", "Thyme", "Bay leaf", "Celery", "Bell peppers"
      ],
      signatureDishes: [
        "Fried chicken", "Gumbo", "Jambalaya", "Cornbread", 
        "Biscuits and gravy", "Barbecue"
      ],
      commonPairings: [
        "Celery + Bell Pepper + Onion (Holy Trinity)", "Bacon Fat + Greens", 
        "Buttermilk + Hot Sauce", "Smoked Paprika + Brown Sugar + Cayenne"
      ],
      aromatics: "The 'holy trinity' of onions, celery, and bell peppers forms the foundation of many Cajun and Creole dishes."
    },
    {
      cuisine: "North African/Moroccan",
      keyIngredients: [
        "Cumin", "Cinnamon", "Coriander", "Harissa", 
        "Preserved lemon", "Dates", "Apricots", "Olive oil", "Mint"
      ],
      signatureDishes: [
        "Tagines", "Couscous", "Shakshuka", "Pastilla", 
        "Harira soup", "Moroccan mezze"
      ],
      commonPairings: [
        "Cinnamon + Cumin + Coriander", "Preserved Lemon + Olives + Chicken", 
        "Harissa + Olive Oil + Garlic", "Sweet (dates) + Savory (meat) + Spices"
      ],
      aromatics: "Moroccan dishes often begin with sautéed onions, garlic, and ginger, followed by spice blends like ras el hanout."
    }
  ],
  
  // Common cooking problems and solutions
  cookingTroubleshooting: [
    {
      problem: "Oversalted Dish",
      solutions: [
        {
          solution: "Add more of everything except salt",
          description: "Double the recipe without adding additional salt to dilute the saltiness. You can freeze the extra portion for later use."
        },
        {
          solution: "Add starchy ingredients",
          description: "Potatoes, rice, or pasta can absorb excess salt. For soups and stews, add diced potatoes, cook until soft, then remove some or all depending on desired consistency."
        },
        {
          solution: "Add acid or sweetness",
          description: "A splash of vinegar, lemon juice, or a bit of sugar can help balance saltiness. Start with small amounts and taste as you go."
        },
        {
          solution: "Increase liquid",
          description: "For soups, sauces, and stews, add unsalted broth, water, or cream to dilute salt concentration."
        },
        {
          solution: "Serve with unsalted accompaniments",
          description: "Pair the salty dish with bland side dishes like unsalted rice, potatoes, or bread to balance flavors when eaten together."
        }
      ]
    },
    {
      problem: "Bland or Under-seasoned Food",
      solutions: [
        {
          solution: "Layer flavors",
          description: "Add seasonings at different stages of cooking, not just at the beginning or end, to create depth of flavor."
        },
        {
          solution: "Add acid",
          description: "A splash of vinegar, lemon juice, or wine can brighten flavors. Even a small amount can transform a dish without making it taste sour."
        },
        {
          solution: "Use more aromatics",
          description: "Sauté additional garlic, onions, shallots, or ginger as a flavor base to add depth."
        },
        {
          solution: "Incorporate umami ingredients",
          description: "Add small amounts of soy sauce, fish sauce, Worcestershire sauce, miso, or parmesan cheese to boost savory flavors."
        },
        {
          solution: "Finish with fresh herbs or zest",
          description: "Add chopped fresh herbs, citrus zest, or a compound butter at the end of cooking for a flavor boost."
        }
      ]
    },
    {
      problem: "Burnt Food",
      solutions: [
        {
          solution: "For pots and pans",
          description: "If the bottom of a soup, sauce, or stew is burnt, carefully transfer the unburnt portion to a new pot without scraping the bottom. Add new ingredients to adjust flavor."
        },
        {
          solution: "For meats and proteins",
          description: "If the outside is burnt but inside is fine, cut away the burnt portion. Consider repurposing in a dish that can mask slight burnt flavor, like a spicy stew or chili."
        },
        {
          solution: "For baked goods",
          description: "For cakes or bread with burnt edges, trim away burnt areas. For cookies or pie crusts, gently grate off the burnt surface with a microplane."
        },
        {
          solution: "Balance with other flavors",
          description: "Add small amounts of sugar or honey to counteract bitter burnt taste. Add acid like lemon juice or vinegar to brighten flavors."
        },
        {
          solution: "Prevention for next time",
          description: "Use lower heat, rotate food more frequently, check oven temperature accuracy with an oven thermometer, and set timers."
        }
      ]
    },
    {
      problem: "Overcooked or Dry Meat",
      solutions: [
        {
          solution: "Create a sauce or gravy",
          description: "Make a flavorful sauce or gravy using the cooking juices to serve over the meat, adding moisture and flavor."
        },
        {
          solution: "Shred and repurpose",
          description: "Shred overcooked meat and use in dishes where additional moisture is added: tacos, enchiladas, pasta sauces, soups, or stews."
        },
        {
          solution: "Slice thinly and moisten",
          description: "Cut meat against the grain into very thin slices, then briefly dip in warm broth or sauce before serving."
        },
        {
          solution: "Use in salads",
          description: "Toss bite-sized pieces with a flavorful vinaigrette, which helps counter dryness."
        },
        {
          solution: "Prevention for next time",
          description: "Use a meat thermometer, remove from heat 5-10°F before target temperature (carryover cooking will continue), and let meat rest before cutting."
        }
      ]
    },
    {
      problem: "Curdled or Separated Sauce",
      solutions: [
        {
          solution: "For dairy-based sauces",
          description: "Remove from heat immediately. Try whisking vigorously or blending with an immersion blender to recombine. For cream soups or sauces, adding a small amount of cold cream while whisking can help."
        },
        {
          solution: "For broken emulsions (like hollandaise)",
          description: "Put 1 tablespoon of warm water in a clean bowl and slowly whisk in the broken sauce, a few drops at a time, until it starts to re-emulsify. Then continue adding the rest more quickly."
        },
        {
          solution: "For vinaigrettes",
          description: "Add a teaspoon of hot water and whisk vigorously, or place in a jar and shake well to re-emulsify."
        },
        {
          solution: "For tomato cream sauces",
          description: "If the cream has curdled, try whisking in fresh cream or a cornstarch slurry to help re-emulsify."
        },
        {
          solution: "Prevention for next time",
          description: "For dairy sauces, use lower heat, temper cold dairy by gradually adding a small amount of hot liquid to it before adding to the main pot, and avoid boiling. For emulsified sauces, add oil very slowly while whisking continuously."
        }
      ]
    },
    {
      problem: "Soggy Vegetables",
      solutions: [
        {
          solution: "Crisp in high heat",
          description: "For slightly overcooked vegetables, quickly sauté in a very hot pan with a little oil to create some caramelization and crisp edges."
        },
        {
          solution: "Repurpose into purée or soup",
          description: "Blend overcooked vegetables with broth, cream, or seasonings to make a smooth soup or purée."
        },
        {
          solution: "Add texture contrast",
          description: "Top with crispy elements like toasted nuts, seeds, breadcrumbs, or fried onions to provide textural contrast."
        },
        {
          solution: "Transform with a flavorful dressing",
          description: "Toss with a sharp vinaigrette or sauce to distract from the texture and enhance flavor."
        },
        {
          solution: "Prevention for next time",
          description: "Use high heat and short cooking times, avoid overcrowding the pan (which causes steaming), and consider blanching followed by ice bath before final cooking."
        }
      ]
    },
    {
      problem: "Lumpy Gravy or Sauce",
      solutions: [
        {
          solution: "Strain it",
          description: "Pour the sauce through a fine-mesh strainer to remove lumps."
        },
        {
          solution: "Blend it",
          description: "Use an immersion blender, regular blender, or food processor to smooth out lumps. Make sure hot liquids are vented when blending."
        },
        {
          solution: "Whisk vigorously",
          description: "For minor lumps, vigorous whisking may incorporate them back into the sauce."
        },
        {
          solution: "Make a cornstarch slurry",
          description: "Mix 1 tablespoon cornstarch with 2 tablespoons cold water, then whisk into the simmering sauce to create a new, smooth thickener."
        },
        {
          solution: "Prevention for next time",
          description: "For flour-based roux, cook the flour and fat well before adding liquid. Add liquid gradually while whisking constantly. For cornstarch or other starch thickeners, always make a slurry with cold liquid first."
        }
      ]
    },
    {
      problem: "Undercooked Baked Goods",
      solutions: [
        {
          solution: "Return to the oven",
          description: "If just slightly undercooked in the center, cover edges with foil to prevent burning and return to the oven at the original temperature."
        },
        {
          solution: "Lower temperature, longer time",
          description: "If edges are done but center is very undercooked, reduce oven temperature by 25°F and continue baking with foil covering the edges or top."
        },
        {
          solution: "Microwave method (for certain items)",
          description: "For items like cookies or brownies, a few seconds in the microwave can help cook the center without drying the edges. Use low power and short intervals."
        },
        {
          solution: "Repurpose the item",
          description: "Undercooked cake can become trifle layers, undercooked brownies can be reheated and served as warm pudding with ice cream."
        },
        {
          solution: "Prevention for next time",
          description: "Check oven temperature accuracy with an oven thermometer. Use the correct size pan. Test doneness with appropriate methods (toothpick, temperature, touch)."
        }
      ]
    },
    {
      problem: "Stuck-On Food in Pans",
      solutions: [
        {
          solution: "Deglaze while warm",
          description: "While the pan is still warm, add liquid (water, wine, broth, etc.) and scrape with a wooden spoon to lift stuck-on bits. This actually creates flavorful fond for sauces."
        },
        {
          solution: "Soak method",
          description: "For stubborn residue, fill the pan with warm water and a drop of dish soap, let soak for 30 minutes to several hours."
        },
        {
          solution: "Vinegar and baking soda",
          description: "For tough residue, add equal parts water and vinegar with a tablespoon of baking soda, bring to a simmer, then let cool before washing."
        },
        {
          solution: "Salt scrub for cast iron",
          description: "For cast iron without destroying seasoning, use coarse salt and a little oil with a paper towel to scrub away stuck-on food."
        },
        {
          solution: "Prevention for next time",
          description: "Ensure pans are properly preheated before adding food. Use enough fat/oil. Don't flip food before it naturally releases. For certain pans, consider using parchment paper or proper seasoning."
        }
      ]
    },
    {
      problem: "Too Spicy Dish",
      solutions: [
        {
          solution: "Add dairy",
          description: "Dairy products like cream, yogurt, sour cream, or milk can neutralize capsaicin, the compound that makes peppers hot."
        },
        {
          solution: "Add sweetness",
          description: "A little sugar, honey, or even sweet vegetables like carrots or corn can balance spiciness without masking other flavors."
        },
        {
          solution: "Add starchy components",
          description: "Serve with or mix in plain rice, potatoes, pasta, or bread to absorb and dilute the spiciness."
        },
        {
          solution: "Add acid",
          description: "A splash of vinegar or citrus juice can balance heat while brightening flavors."
        },
        {
          solution: "Dilute the dish",
          description: "Add more of the non-spicy ingredients to reduce the concentration of spice. For soups and stews, additional broth helps."
        }
      ]
    }
  ],
  
  // UI template for this mode's special interface
  template: `
    <div class="cooking-assistant-interface">
      <div class="cooking-header">
        <div class="cooking-icon">
          <i class="fas fa-utensils"></i>
        </div>
        <div class="cooking-title">
          <h2>Recipe & Cooking Assistant</h2>
          <p>Culinary guidance and recipe suggestions for home cooks</p>
        </div>
      </div>
      
      <div class="cooking-techniques">
        <div class="section-header">
          <h3>Cooking Techniques</h3>
          <p>Master essential methods for better results</p>
        </div>
        
        <div class="techniques-grid">
          <!-- Technique cards will be dynamically generated -->
        </div>
        
        <div class="selected-technique hidden" id="selected-technique">
          <div class="selected-header">
            <h4 id="technique-name">Sautéing</h4>
            <button id="back-to-techniques" class="back-button">
              <i class="fas fa-arrow-left"></i> Back to Techniques
            </button>
          </div>
          
          <div class="technique-info" id="technique-info">
            <!-- Selected technique information will be loaded here -->
          </div>
        </div>
      </div>
      
      <div class="ingredient-substitutions">
        <div class="section-header">
          <h3>Ingredient Substitutions</h3>
          <p>Alternatives when you're missing an ingredient</p>
        </div>
        
        <div class="substitution-select">
          <select id="ingredient-select">
            <option value="">Select an ingredient to substitute...</option>
            <!-- Options will be dynamically generated -->
          </select>
        </div>
        
        <div class="substitution-results hidden" id="substitution-results">
          <!-- Substitution results will be loaded here -->
        </div>
      </div>
      
      <div class="cooking-conversions">
        <div class="section-header">
          <h3>Cooking Conversions</h3>
          <p>Helpful measurement and weight conversions</p>
        </div>
        
        <div class="conversion-tabs">
          <button class="conversion-tab active" data-conversion="volume">Volume</button>
          <button class="conversion-tab" data-conversion="weight">Weight</button>
          <button class="conversion-tab" data-conversion="ingredients">Ingredients</button>
          <button class="conversion-tab" data-conversion="temperature">Temperature</button>
        </div>
        
        <div class="conversion-content" id="conversion-content">
          <!-- Conversion content will be loaded here -->
        </div>
      </div>
      
      <div class="flavor-profiles">
        <div class="section-header">
          <h3>Flavor Profiles & Pairings</h3>
          <p>Explore global cuisine flavors and ingredient combinations</p>
        </div>
        
        <div class="cuisine-select">
          <select id="cuisine-select">
            <option value="">Select a cuisine to explore...</option>
            <!-- Options will be dynamically generated -->
          </select>
        </div>
        
        <div class="cuisine-results hidden" id="cuisine-results">
          <!-- Cuisine results will be loaded here -->
        </div>
      </div>
      
      <div class="cooking-troubleshooting">
        <div class="section-header">
          <h3>Cooking Problems & Solutions</h3>
          <p>Fixes for common cooking challenges</p>
        </div>
        
        <div class="problems-accordion" id="problems-accordion">
          <!-- Problems will be loaded here -->
        </div>
      </div>
      
      <div class="cooking-tools">
        <div class="section-header">
          <h3>Helpful Tools</h3>
          <p>Interactive assistants for cooking challenges</p>
        </div>
        
        <div class="tools-container">
          <div class="tool-card" id="recipe-finder">
            <div class="tool-icon">
              <i class="fas fa-search"></i>
            </div>
            <div class="tool-info">
              <h4>Recipe Finder</h4>
              <p>Find recipes with ingredients you have</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="meal-planner">
            <div class="tool-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="tool-info">
              <h4>Meal Planner</h4>
              <p>Create balanced meal plans</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="recipe-scaler">
            <div class="tool-icon">
              <i class="fas fa-balance-scale"></i>
            </div>
            <div class="tool-info">
              <h4>Recipe Scaler</h4>
              <p>Adjust recipe quantities up or down</p>
            </div>
            <button class="tool-button">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="tool-card" id="cooking-timer">
            <div class="tool-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="tool-info">
              <h4>Cooking Timer Guide</h4>
              <p>Standard cooking times for common foods</p>
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
    .cooking-assistant-interface {
      background: linear-gradient(to bottom right, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.05));
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(249, 115, 22, 0.2);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .cooking-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .cooking-icon {
      font-size: 2.5rem;
      color: #f97316;
      margin-right: 1rem;
    }
    
    .cooking-title h2 {
      color: #f97316;
      margin-bottom: 0.3rem;
    }
    
    .cooking-title p {
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
    
    .cooking-techniques, .ingredient-substitutions, .cooking-conversions, .flavor-profiles, .cooking-troubleshooting, .cooking-tools {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    /* Techniques Grid */
    .techniques-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }
    
    .technique-card {
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
    
    .technique-card:hover {
      background: rgba(30, 41, 59, 0.7);
      transform: translateY(-3px);
      border-color: rgba(249, 115, 22, 0.3);
    }
    
    .technique-icon {
      font-size: 2rem;
      color: #f97316;
    }
    
    .technique-label {
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }
    
    /* Selected Technique View */
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
    
    .technique-info {
      color: #e2e8f0;
    }
    
    .technique-description {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    .best-for {
      margin-bottom: 1rem;
    }
    
    .best-for-title {
      color: #f97316;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .best-for-content {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .key-points, .common-mistakes {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    .key-points {
      border-left: 3px solid #4ade80;
    }
    
    .common-mistakes {
      border-left: 3px solid #f87171;
    }
    
    .points-title {
      font-size: 0.95rem;
      margin-bottom: 0.75rem;
    }
    
    .key-points .points-title {
      color: #4ade80;
    }
    
    .common-mistakes .points-title {
      color: #f87171;
    }
    
    .points-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .points-list li {
      margin-bottom: 0.3rem;
    }
    
    /* Ingredient Substitutions */
    .substitution-select {
      margin-bottom: 1.25rem;
    }
    
    #ingredient-select {
      width: 100%;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .substitution-results {
      color: #e2e8f0;
    }
    
    .substitution-header {
      margin-bottom: 1rem;
    }
    
    .substitution-title {
      color: #f97316;
      font-size: 1.05rem;
      margin-bottom: 0.3rem;
    }
    
    .substitution-subtitle {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .substitution-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .substitution-item {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
      border-left: 3px solid #f97316;
    }
    
    .substitute-name {
      color: #f3f4f6;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
    }
    
    .substitute-ratio {
      color: #f97316;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }
    
    .substitute-best-for {
      color: #4ade80;
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
    }
    
    .substitute-notes {
      color: #94a3b8;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    /* Cooking Conversions */
    .conversion-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
      padding-bottom: 0.75rem;
    }
    
    .conversion-tab {
      background: rgba(15, 23, 42, 0.6);
      border: none;
      border-radius: 6px;
      padding: 0.6rem 1rem;
      color: #e2e8f0;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .conversion-tab:hover {
      background: rgba(30, 41, 59, 0.7);
    }
    
    .conversion-tab.active {
      background: rgba(249, 115, 22, 0.2);
      color: #f97316;
    }
    
    .conversion-content {
      color: #e2e8f0;
    }
    
    .conversion-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .conversion-table th {
      text-align: left;
      padding: 0.75rem;
      color: #94a3b8;
      font-size: 0.85rem;
      font-weight: 500;
      border-bottom: 1px solid rgba(71, 85, 105, 0.5);
    }
    
    .conversion-table td {
      padding: 0.75rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.3);
    }
    
    .conversion-table tr:hover td {
      background: rgba(30, 41, 59, 0.7);
    }
    
    /* Flavor Profiles */
    .cuisine-select {
      margin-bottom: 1.25rem;
    }
    
    #cuisine-select {
      width: 100%;
      padding: 0.75rem;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(71, 85, 105, 0.5);
      border-radius: 6px;
      color: #e2e8f0;
      font-size: 0.95rem;
    }
    
    .cuisine-results {
      color: #e2e8f0;
    }
    
    .cuisine-header {
      margin-bottom: 1rem;
    }
    
    .cuisine-title {
      color: #f97316;
      font-size: 1.05rem;
      margin-bottom: 0.3rem;
    }
    
    .cuisine-sections {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .cuisine-section {
      background: rgba(15, 23, 42, 0.6);
      border-radius: 8px;
      padding: 1rem;
    }
    
    .section-label {
      color: #f97316;
      font-size: 0.95rem;
      margin-bottom: 0.5rem;
    }
    
    .ingredient-tags, .dish-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .ingredient-tag {
      background: rgba(249, 115, 22, 0.15);
      color: #f97316;
      padding: 0.3rem 0.6rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    
    .dish-tag {
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      padding: 0.3rem 0.6rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
    
    .pairings-list {
      list-style-type: disc;
      padding-left: 1.5rem;
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    .pairings-list li {
      margin-bottom: 0.3rem;
    }
    
    .aromatics-text {
      color: #cbd5e1;
      font-size: 0.9rem;
      font-style: italic;
    }
    
    /* Cooking Troubleshooting */
    .problems-accordion {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .problem-item {
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .problem-header {
      background: rgba(15, 23, 42, 0.6);
      padding: 1rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
    
    .problem-title {
      color: #f3f4f6;
      font-size: 1rem;
      font-weight: 500;
    }
    
    .problem-icon i {
      color: #f97316;
      transition: transform 0.3s ease;
    }
    
    .problem-content {
      background: rgba(15, 23, 42, 0.4);
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
    
    .problem-content.active {
      padding: 1.25rem;
      max-height: 1000px;
    }
    
    .problem-header.active .problem-icon i {
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
      color: #f97316;
      font-size: 0.95rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .solution-description {
      color: #cbd5e1;
      font-size: 0.9rem;
    }
    
    /* Cooking Tools */
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
      background: rgba(249, 115, 22, 0.15);
      color: #f97316;
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
      color: #f97316;
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
      background: rgba(249, 115, 22, 0.15);
    }
    
    .hidden {
      display: none !important;
    }
  `,
  
  // Current state
  currentState: {
    selectedTechnique: null,
    selectedConversion: 'volume'
  },
  
  // Initialize the mode
  init: function() {
    console.log('Initializing Recipe & Cooking Assistant Mode');
    
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
      chatInput.placeholder = "Ask for recipe ideas, cooking guidance, or food tips...";
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
    
    // Populate technique cards
    this.populateTechniqueCards(container);
    
    // Populate substitution select
    this.populateSubstitutionSelect(container);
    
    // Populate cuisine select
    this.populateCuisineSelect(container);
    
    // Populate problems accordion
    this.populateProblemsAccordion(container);
    
    // Add event listeners
    this.addEventListeners(container);
    
    // Initialize with default selected conversion
    this.showConversionContent(container, this.currentState.selectedConversion);
  },
  
  // Populate technique cards
  populateTechniqueCards: function(container) {
    const techniquesGrid = container.querySelector('.techniques-grid');
    if (!techniquesGrid) return;
    
    // Clear existing content
    techniquesGrid.innerHTML = '';
    
    // Add technique cards
    this.cookingTechniques.forEach(technique => {
      const card = document.createElement('div');
      card.className = 'technique-card';
      card.dataset.technique = technique.name.toLowerCase().replace(/\s+/g, '-');
      
      // Select appropriate icon for the technique
      let icon = 'fire';
      switch (technique.name.toLowerCase()) {
        case 'sautéing': icon = 'fire'; break;
        case 'roasting': icon = 'temperature-high'; break;
        case 'braising': icon = 'burn'; break;
        case 'steaming': icon = 'cloud'; break;
        case 'poaching': icon = 'water'; break;
        case 'stir frying': icon = 'utensils'; break;
        case 'grilling': icon = 'fire-alt'; break;
        case 'broiling': icon = 'fire-alt'; break;
        case 'baking': icon = 'bread-slice'; break;
        case 'deep frying': icon = 'oil-can'; break;
        case 'blanching': icon = 'tint'; break;
        case 'simmering': icon = 'mug-hot'; break;
      }
      
      card.innerHTML = `
        <div class="technique-icon">
          <i class="fas fa-${icon}"></i>
        </div>
        <div class="technique-label">${technique.name}</div>
      `;
      
      // Add event listener
      card.addEventListener('click', () => {
        this.showTechniqueDetails(container, technique.name);
      });
      
      techniquesGrid.appendChild(card);
    });
  },
  
  // Populate substitution select
  populateSubstitutionSelect: function(container) {
    const ingredientSelect = container.querySelector('#ingredient-select');
    if (!ingredientSelect) return;
    
    // Clear existing options (except the first one)
    while (ingredientSelect.options.length > 1) {
      ingredientSelect.remove(1);
    }
    
    // Add ingredient options
    this.ingredientSubstitutions.forEach(item => {
      const option = document.createElement('option');
      option.value = item.ingredient.toLowerCase().replace(/\s+/g, '-');
      option.textContent = item.ingredient;
      ingredientSelect.appendChild(option);
    });
  },
  
  // Populate cuisine select
  populateCuisineSelect: function(container) {
    const cuisineSelect = container.querySelector('#cuisine-select');
    if (!cuisineSelect) return;
    
    // Clear existing options (except the first one)
    while (cuisineSelect.options.length > 1) {
      cuisineSelect.remove(1);
    }
    
    // Add cuisine options
    this.flavorProfiles.forEach(cuisine => {
      const option = document.createElement('option');
      option.value = cuisine.cuisine.toLowerCase().replace(/\s+/g, '-');
      option.textContent = cuisine.cuisine;
      cuisineSelect.appendChild(option);
    });
  },
  
  // Populate problems accordion
  populateProblemsAccordion: function(container) {
    const accordion = container.querySelector('#problems-accordion');
    if (!accordion) return;
    
    // Clear existing content
    accordion.innerHTML = '';
    
    // Add problem items
    this.cookingTroubleshooting.forEach(problem => {
      const item = document.createElement('div');
      item.className = 'problem-item';
      
      // Create header
      const header = document.createElement('div');
      header.className = 'problem-header';
      header.innerHTML = `
        <div class="problem-title">${problem.problem}</div>
        <div class="problem-icon">
          <i class="fas fa-chevron-down"></i>
        </div>
      `;
      
      // Create content
      const content = document.createElement('div');
      content.className = 'problem-content';
      
      // Add solutions to content
      let solutionsHtml = '<div class="solutions-list">';
      problem.solutions.forEach(solution => {
        solutionsHtml += `
          <div class="solution-item">
            <div class="solution-name">${solution.solution}</div>
            <div class="solution-description">${solution.description}</div>
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
    // Back to techniques button
    const backButton = container.querySelector('#back-to-techniques');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.hideTechniqueDetails(container);
      });
    }
    
    // Ingredient select
    const ingredientSelect = container.querySelector('#ingredient-select');
    if (ingredientSelect) {
      ingredientSelect.addEventListener('change', () => {
        if (ingredientSelect.value) {
          this.showSubstitutionResults(container, ingredientSelect.value);
        } else {
          this.hideSubstitutionResults(container);
        }
      });
    }
    
    // Conversion tabs
    const conversionTabs = container.querySelectorAll('.conversion-tab');
    conversionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        conversionTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Show the selected conversion
        const conversion = tab.dataset.conversion;
        this.showConversionContent(container, conversion);
      });
    });
    
    // Cuisine select
    const cuisineSelect = container.querySelector('#cuisine-select');
    if (cuisineSelect) {
      cuisineSelect.addEventListener('change', () => {
        if (cuisineSelect.value) {
          this.showCuisineResults(container, cuisineSelect.value);
        } else {
          this.hideCuisineResults(container);
        }
      });
    }
    
    // Tool cards
    const recipeFinder = container.querySelector('#recipe-finder');
    if (recipeFinder) {
      recipeFinder.addEventListener('click', () => {
        this.openRecipeFinder();
      });
    }
    
    const mealPlanner = container.querySelector('#meal-planner');
    if (mealPlanner) {
      mealPlanner.addEventListener('click', () => {
        this.openMealPlanner();
      });
    }
    
    const recipeScaler = container.querySelector('#recipe-scaler');
    if (recipeScaler) {
      recipeScaler.addEventListener('click', () => {
        this.openRecipeScaler();
      });
    }
    
    const cookingTimer = container.querySelector('#cooking-timer');
    if (cookingTimer) {
      cookingTimer.addEventListener('click', () => {
        this.openCookingTimer();
      });
    }
  },
  
  // Show technique details
  showTechniqueDetails: function(container, techniqueName) {
    // Update current state
    this.currentState.selectedTechnique = techniqueName;
    
    // Hide techniques grid
    const techniquesGrid = container.querySelector('.techniques-grid');
    if (techniquesGrid) {
      techniquesGrid.style.display = 'none';
    }
    
    // Show selected technique details
    const selectedTechnique = container.querySelector('#selected-technique');
    if (selectedTechnique) {
      selectedTechnique.classList.remove('hidden');
    }
    
    // Find technique data
    const techniqueData = this.cookingTechniques.find(t => t.name === techniqueName);
    if (!techniqueData) return;
    
    // Update technique name
    const techniqueTitleElement = container.querySelector('#technique-name');
    if (techniqueTitleElement) {
      techniqueTitleElement.textContent = techniqueData.name;
    }
    
    // Update technique info
    const techniqueInfo = container.querySelector('#technique-info');
    if (techniqueInfo) {
      techniqueInfo.innerHTML = `
        <div class="technique-description">${techniqueData.description}</div>
        
        <div class="best-for">
          <div class="best-for-title">
            <i class="fas fa-check-circle"></i> Best For
          </div>
          <div class="best-for-content">${techniqueData.bestFor}</div>
        </div>
        
        <div class="key-points">
          <div class="points-title">Key Points for Success</div>
          <ul class="points-list">
            ${techniqueData.keyPoints.map(point => `
              <li>${point}</li>
            `).join('')}
          </ul>
        </div>
        
        <div class="common-mistakes">
          <div class="points-title">Common Mistakes to Avoid</div>
          <ul class="points-list">
            ${techniqueData.commonMistakes.map(mistake => `
              <li>${mistake}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  },
  
  // Hide technique details
  hideTechniqueDetails: function(container) {
    // Reset current state
    this.currentState.selectedTechnique = null;
    
    // Show techniques grid
    const techniquesGrid = container.querySelector('.techniques-grid');
    if (techniquesGrid) {
      techniquesGrid.style.display = 'grid';
    }
    
    // Hide selected technique details
    const selectedTechnique = container.querySelector('#selected-technique');
    if (selectedTechnique) {
      selectedTechnique.classList.add('hidden');
    }
  },
  
  // Show substitution results
  showSubstitutionResults: function(container, ingredientValue) {
    const substitutionResults = container.querySelector('#substitution-results');
    if (!substitutionResults) return;
    
    // Show the container
    substitutionResults.classList.remove('hidden');
    
    // Find ingredient data
    const ingredientData = this.ingredientSubstitutions.find(item => 
      item.ingredient.toLowerCase().replace(/\s+/g, '-') === ingredientValue
    );
    
    if (!ingredientData) return;
    
    // Build HTML for substitution results
    let html = `
      <div class="substitution-header">
        <div class="substitution-title">Substitutes for ${ingredientData.ingredient}</div>
        <div class="substitution-subtitle">Choose the best option based on your recipe and available ingredients</div>
      </div>
      
      <div class="substitution-items">
    `;
    
    // Add each substitution
    ingredientData.substitutions.forEach(sub => {
      html += `
        <div class="substitution-item">
          <div class="substitute-name">${sub.substitute}</div>
          <div class="substitute-ratio">${sub.ratio}</div>
          <div class="substitute-best-for">Best for: ${sub.bestFor}</div>
          <div class="substitute-notes">Note: ${sub.notes}</div>
        </div>
      `;
    });
    
    html += `
      </div>
    `;
    
    substitutionResults.innerHTML = html;
  },
  
  // Hide substitution results
  hideSubstitutionResults: function(container) {
    const substitutionResults = container.querySelector('#substitution-results');
    if (substitutionResults) {
      substitutionResults.classList.add('hidden');
    }
  },
  
  // Show conversion content
  showConversionContent: function(container, conversion) {
    // Update current state
    this.currentState.selectedConversion = conversion;
    
    const conversionContent = container.querySelector('#conversion-content');
    if (!conversionContent) return;
    
    // Find conversion data based on category
    let conversionData;
    
    if (conversion === 'volume') {
      conversionData = this.cookingConversions.find(c => c.category === "Volume Measurements (US to Metric)");
    } else if (conversion === 'weight') {
      conversionData = this.cookingConversions.find(c => c.category === "Weight Measurements (US to Metric)");
    } else if (conversion === 'ingredients') {
      conversionData = this.cookingConversions.find(c => c.category === "Common Ingredient Weights (1 cup)");
    } else if (conversion === 'temperature') {
      conversionData = this.cookingConversions.find(c => c.category === "Temperature Conversions");
    }
    
    if (!conversionData) return;
    
    // Build HTML for conversion content
    let html = `
      <table class="conversion-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    // Add each conversion
    conversionData.conversions.forEach(conv => {
      html += `
        <tr>
          <td>${conv.from}</td>
          <td>${conv.to}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
    `;
    
    conversionContent.innerHTML = html;
  },
  
  // Show cuisine results
  showCuisineResults: function(container, cuisineValue) {
    const cuisineResults = container.querySelector('#cuisine-results');
    if (!cuisineResults) return;
    
    // Show the container
    cuisineResults.classList.remove('hidden');
    
    // Find cuisine data
    const cuisineData = this.flavorProfiles.find(cuisine => 
      cuisine.cuisine.toLowerCase().replace(/\s+/g, '-') === cuisineValue
    );
    
    if (!cuisineData) return;
    
    // Build HTML for cuisine results
    let html = `
      <div class="cuisine-header">
        <div class="cuisine-title">${cuisineData.cuisine} Flavor Profile</div>
      </div>
      
      <div class="cuisine-sections">
        <div class="cuisine-section">
          <div class="section-label">Key Ingredients</div>
          <div class="ingredient-tags">
            ${cuisineData.keyIngredients.map(ingredient => `
              <div class="ingredient-tag">${ingredient}</div>
            `).join('')}
          </div>
        </div>
        
        <div class="cuisine-section">
          <div class="section-label">Signature Dishes</div>
          <div class="dish-tags">
            ${cuisineData.signatureDishes.map(dish => `
              <div class="dish-tag">${dish}</div>
            `).join('')}
          </div>
        </div>
        
        <div class="cuisine-section">
          <div class="section-label">Common Flavor Pairings</div>
          <ul class="pairings-list">
            ${cuisineData.commonPairings.map(pairing => `
              <li>${pairing}</li>
            `).join('')}
          </ul>
        </div>
        
        <div class="cuisine-section">
          <div class="section-label">Aromatic Base</div>
          <div class="aromatics-text">${cuisineData.aromatics}</div>
        </div>
      </div>
    `;
    
    cuisineResults.innerHTML = html;
  },
  
  // Hide cuisine results
  hideCuisineResults: function(container) {
    const cuisineResults = container.querySelector('#cuisine-results');
    if (cuisineResults) {
      cuisineResults.classList.add('hidden');
    }
  },
  
  // Open Recipe Finder tool
  openRecipeFinder: function() {
    const prompt = `I'd like to use the Recipe Finder tool. Please help me find recipes based on the ingredients I have available.

1. Please ask me what ingredients I have on hand
2. Ask about any dietary restrictions or preferences
3. Ask about my cooking skill level and available time
4. Based on my responses, suggest 3-5 recipe ideas using my available ingredients
5. For each suggestion, provide:
   - A brief description
   - List of additional ingredients I might need
   - Basic preparation method
   - Approximate cooking time

I'll provide my ingredients after your response.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Meal Planner tool
  openMealPlanner: function() {
    const prompt = `I'd like to use the Meal Planner tool. Please help me create a balanced meal plan.

1. Please ask me about:
   - How many days I want to plan for
   - Any dietary preferences or restrictions
   - My cooking skill level and available time
   - Any specific goals (budget-friendly, batch cooking, weight management, etc.)

2. Based on my responses, provide:
   - A structured meal plan for the requested period
   - A shopping list organized by grocery department
   - Preparation tips and time-saving suggestions
   - Ideas for using leftovers efficiently

3. Include a mix of:
   - Quick weekday meals
   - More elaborate weekend options (if applicable)
   - Batch-cooking opportunities
   - Smart ingredient overlaps to reduce waste

I'll provide my preferences after your response.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Recipe Scaler tool
  openRecipeScaler: function() {
    const prompt = `I'd like to use the Recipe Scaler tool. Please help me adjust recipe quantities.

Please ask me for the following information:
1. The original recipe ingredients with their quantities
2. How I want to scale the recipe (e.g., halve, double, adjust for specific number of servings)
3. The original yield of the recipe (if known)

Then, provide me with:
1. The scaled ingredient quantities with appropriate measurements
2. Any cooking time or temperature adjustments needed
3. Tips for successfully executing the scaled recipe
4. Notes on ingredients that might not scale linearly (e.g., spices, leavening agents)

I'll provide my recipe details after your response.`;
    
    // Send the prompt to the AI
    this.sendPromptToAI(prompt);
  },
  
  // Open Cooking Timer Guide
  openCookingTimer: function() {
    const prompt = `I'd like to use the Cooking Timer Guide. Please provide me with standard cooking times for common foods.

Please ask me what type of food I'm cooking, such as:
- Meat (chicken, beef, pork, fish)
- Vegetables (roasted, steamed, sautéed)
- Grains (rice, pasta, quinoa)
- Baked goods (cookies, cakes, breads)
- Eggs (boiled, fried, scrambled)

Based on my response, provide:
1. Detailed cooking times for different preparations and portion sizes
2. Temperature guidelines (oven, stovetop, internal temperatures)
3. Doneness indicators to check for proper cooking
4. Common mistakes to avoid
5. Tips for achieving the best results

I'll specify the type of food I'm interested in after your response.`;
    
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
    RecipeCookingAssistantMode.init();
  } else {
    window.addEventListener('load', function() {
      RecipeCookingAssistantMode.init();
    });
  }
}

// Export the mode
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RecipeCookingAssistantMode;
} else {
  window.RecipeCookingAssistantMode = RecipeCookingAssistantMode;
}