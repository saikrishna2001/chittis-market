export const products = [
  // ================= FRUITS =================
  {
    id: "fruit-1",
    name: "Ratnagiri Alphonso Mango",
    slug: "alphonso-mango",
    category: "fresh-fruits",
    subcategory: "seasonal-fruits",
    price: 649,
    originalPrice: 799,
    discount: 19,
    unit: "1 Dozen (approx. 2.8 - 3.2 kg)",
    weightOptions: ["1 Dozen", "2 Dozens", "Gift Box (6 Pcs)"],
    rating: 4.9,
    reviewsCount: 342,
    inStock: true,
    stockQuantity: 45,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: true,
    isFeatured: true,
    badge: "GI Tagged King",
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Authentic GI-tagged Ratnagiri Alphonso mangoes, revered globally as the undisputed 'King of Mangoes'. Naturally tree-ripened with a saffron-tinted velvety pulp, non-fibrous texture, and an intoxicatingly sweet aroma.",
    nutritionalInfo: {
      calories: "60 kcal per 100g",
      carbs: "15 g",
      protein: "0.8 g",
      fiber: "1.6 g",
      vitaminC: "36.4 mg (60% DV)",
      potassium: "168 mg"
    },
    origin: "Ratnagiri, Maharashtra, India",
    farm: {
      name: "Konkan Agro Heritage Orchards",
      location: "Devgad Coastal Belt",
      certifiedOrganic: true
    },
    storageInstructions: "Store at room temperature until fragrant and slightly soft to touch. Once ripe, refrigerate for up to 5 days.",
    tags: ["mango", "alphonso", "seasonal", "sweet", "organic", "king"]
  },
  {
    id: "fruit-2",
    name: "Ruby Red Bhagwa Pomegranate",
    slug: "ruby-pomegranate",
    category: "fresh-fruits",
    subcategory: "fresh-fruits",
    price: 189,
    originalPrice: 240,
    discount: 21,
    unit: "1 kg (approx. 3-4 pcs)",
    weightOptions: ["500 g", "1 kg", "2 kg"],
    rating: 4.8,
    reviewsCount: 188,
    inStock: true,
    stockQuantity: 70,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: true,
    badge: "Antioxidant Rich",
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hand-selected Bhagwa variety pomegranates showcasing deep crimson, jewel-like arils bursting with sweet-tart juice. Renowned for rich polyphenol antioxidants, heart-healthy punicalagins, and gentle edible seeds.",
    nutritionalInfo: {
      calories: "83 kcal per 100g",
      carbs: "18.7 g",
      protein: "1.7 g",
      fiber: "4.0 g",
      vitaminC: "10.2 mg",
      potassium: "236 mg"
    },
    origin: "Solapur, Maharashtra",
    farm: {
      name: "Suryavanshi Organic Orchards",
      location: "Solapur Sunlands",
      certifiedOrganic: true
    },
    storageInstructions: "Store whole pomegranates at room temperature for up to a week, or refrigerate whole for up to a month. Extracted arils keep in an airtight container for 5 days.",
    tags: ["pomegranate", "antioxidant", "juice", "fresh", "heart-healthy"]
  },
  {
    id: "fruit-3",
    name: "Crisp Royal Gala Apples",
    slug: "royal-gala-apple",
    category: "fresh-fruits",
    subcategory: "fresh-fruits",
    price: 220,
    originalPrice: 260,
    discount: 15,
    unit: "1 kg (approx. 5-6 pcs)",
    weightOptions: ["500 g", "1 kg", "2 kg", "4 kg Box"],
    rating: 4.7,
    reviewsCount: 265,
    inStock: true,
    stockQuantity: 95,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: true,
    badge: "Crisp & Juicy",
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crisp, sweet, and wonderfully aromatic Royal Gala apples imported fresh from cold mountain valleys. Distinctive pinkish-orange stripes over a creamy gold skin with a satisfying crunch in every single bite.",
    nutritionalInfo: {
      calories: "52 kcal per 100g",
      carbs: "13.8 g",
      protein: "0.3 g",
      fiber: "2.4 g",
      vitaminC: "4.6 mg",
      potassium: "107 mg"
    },
    origin: "Kinnaur Valley, Himachal Pradesh",
    farm: {
      name: "Himalayan Crest Orchards",
      location: "Kinnaur",
      certifiedOrganic: true
    },
    storageInstructions: "Store in the refrigerator crisper drawer to maintain optimal crunchiness and moisture for up to 3 weeks.",
    tags: ["apple", "royal gala", "crisp", "sweet", "daily"]
  },
  {
    id: "fruit-4",
    name: "Nagpur Sweet Mandarin Oranges",
    slug: "nagpur-oranges",
    category: "fresh-fruits",
    subcategory: "seasonal-fruits",
    price: 130,
    originalPrice: 160,
    discount: 18,
    unit: "1 kg (approx. 6-7 pcs)",
    weightOptions: ["1 kg", "2 kg", "5 kg Crate"],
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
    stockQuantity: 60,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: false,
    isFeatured: true,
    badge: "Vitamin C Champion",
    images: [
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Famous Nagpur santra mandarins with an easy-to-peel loose rind, exceptionally juicy pulp segments, and a perfect harmony of sweetness and zesty tanginess. Loaded with immune-boosting natural Vitamin C.",
    nutritionalInfo: {
      calories: "47 kcal per 100g",
      carbs: "11.8 g",
      protein: "0.9 g",
      fiber: "2.4 g",
      vitaminC: "53.2 mg (88% DV)",
      potassium: "181 mg"
    },
    origin: "Nagpur, Maharashtra",
    farm: {
      name: "Orange City Bio Groves",
      location: "Nagpur Rural",
      certifiedOrganic: true
    },
    storageInstructions: "Keep at cool room temperature for up to 5 days, or refrigerate for up to 2 weeks.",
    tags: ["orange", "citrus", "vitamin-c", "juicy", "nagpur"]
  },
  {
    id: "fruit-5",
    name: "Organic Yelakki Small Bananas",
    slug: "yelakki-banana",
    category: "fresh-fruits",
    subcategory: "fresh-fruits",
    price: 75,
    originalPrice: 90,
    discount: 16,
    unit: "1 kg (approx. 10-12 pcs)",
    weightOptions: ["500 g", "1 kg", "2 kg"],
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stockQuantity: 110,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: false,
    badge: "Naturally Sweet",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Beloved South Indian Yelakki (Elaichi) bananas. Petite in size, golden thin-skinned, with dense, creamy, honey-sweet flesh. Great for toddlers, breakfasts, and pre-workout energy.",
    nutritionalInfo: {
      calories: "89 kcal per 100g",
      carbs: "22.8 g",
      protein: "1.1 g",
      fiber: "2.6 g",
      potassium: "358 mg",
      magnesium: "27 mg"
    },
    origin: "Mysore & Hassan, Karnataka",
    farm: {
      name: "Kaveri Basin Eco Farms",
      location: "Mysore",
      certifiedOrganic: true
    },
    storageInstructions: "Hang or keep at room temperature. Do not refrigerate until fully yellow.",
    tags: ["banana", "yelakki", "energy", "potassium", "organic"]
  },
  {
    id: "fruit-6",
    name: "Crisp Black Seedless Grapes",
    slug: "black-seedless-grapes",
    category: "fresh-fruits",
    subcategory: "seasonal-fruits",
    price: 145,
    originalPrice: 180,
    discount: 19,
    unit: "500 g punnet",
    weightOptions: ["500 g", "1 kg"],
    rating: 4.7,
    reviewsCount: 175,
    inStock: true,
    stockQuantity: 55,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: false,
    isFeatured: true,
    badge: "Sharad Seedless",
    images: [
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Plump, midnight-purple Sharad Seedless grapes directly from Nashik vineyards. Firm snap on the bite, thin skins, no seeds, and a rich nectar sweetness packed with resveratrol.",
    nutritionalInfo: {
      calories: "69 kcal per 100g",
      carbs: "18.1 g",
      protein: "0.7 g",
      fiber: "0.9 g",
      vitaminK: "14.6 mcg",
      resveratrol: "High"
    },
    origin: "Nashik Valley, Maharashtra",
    farm: {
      name: "Godavari Vine Estates",
      location: "Nashik",
      certifiedOrganic: true
    },
    storageInstructions: "Store unwashed in their ventilated punnet in the refrigerator. Wash just prior to snacking.",
    tags: ["grapes", "black grapes", "seedless", "sweet", "nashik"]
  },
  {
    id: "fruit-7",
    name: "Mahabaleshwar Fresh Strawberries",
    slug: "fresh-strawberries",
    category: "fresh-fruits",
    subcategory: "seasonal-fruits",
    price: 160,
    originalPrice: 210,
    discount: 23,
    unit: "250 g pack",
    weightOptions: ["250 g", "500 g (2 Packs)", "1 kg Gift Box"],
    rating: 4.9,
    reviewsCount: 220,
    inStock: true,
    stockQuantity: 40,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: true,
    isFeatured: true,
    badge: "Hill Station Fresh",
    images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Air-flown daily from the misty slopes of Mahabaleshwar. Glossy heart-shaped berries bursting with floral fragrance and vibrant crimson sweetness. Perfect for desserts, shakes, and fresh cream.",
    nutritionalInfo: {
      calories: "32 kcal per 100g",
      carbs: "7.7 g",
      protein: "0.7 g",
      fiber: "2.0 g",
      vitaminC: "58.8 mg (98% DV)",
      folate: "24 mcg"
    },
    origin: "Mahabaleshwar, Maharashtra",
    farm: {
      name: "Sahyadri Mist Berry Farms",
      location: "Mahabaleshwar Plateau",
      certifiedOrganic: true
    },
    storageInstructions: "Refrigerate in a single layer between paper towels; use within 3 days for maximum fragrance.",
    tags: ["strawberry", "berry", "mahabaleshwar", "fresh", "dessert"]
  },
  {
    id: "fruit-8",
    name: "Organic Sweet Sugar Baby Watermelon",
    slug: "sugar-baby-watermelon",
    category: "fresh-fruits",
    subcategory: "seasonal-fruits",
    price: 119,
    originalPrice: 150,
    discount: 20,
    unit: "1 Pc (approx. 2.5 - 3 kg)",
    weightOptions: ["1 Pc (2.5-3 kg)", "Large Pc (4-5 kg)"],
    rating: 4.8,
    reviewsCount: 160,
    inStock: true,
    stockQuantity: 35,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: false,
    isFeatured: false,
    badge: "Deep Crimson Pulp",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dense, dark green heirloom Sugar Baby watermelons. Exceptionally juicy, sugar-sweet scarlet heart with 92% hydration power and loaded with lycopene and L-citrulline for post-workout recovery.",
    nutritionalInfo: {
      calories: "30 kcal per 100g",
      water: "92%",
      carbs: "7.6 g",
      lycopene: "4532 mcg",
      vitaminA: "569 IU"
    },
    origin: "Anantapur, Andhra Pradesh",
    farm: {
      name: "Deccan Sunlight Organic Farms",
      location: "Anantapur",
      certifiedOrganic: true
    },
    storageInstructions: "Whole melon keeps at room temperature for 10 days. Once sliced, cover tightly and refrigerate.",
    tags: ["watermelon", "hydration", "summer", "sweet", "lycopene"]
  },
  {
    id: "fruit-9",
    name: "Red Lady Sweet Papaya",
    slug: "red-lady-papaya",
    category: "fresh-fruits",
    subcategory: "fresh-fruits",
    price: 85,
    originalPrice: 110,
    discount: 22,
    unit: "1 Pc (approx. 1.2 - 1.5 kg)",
    weightOptions: ["1 Pc (1.2-1.5 kg)", "Twin Pack (2 Pcs)"],
    rating: 4.7,
    reviewsCount: 134,
    inStock: true,
    stockQuantity: 50,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: false,
    badge: "Gut Health Boost",
    images: [
      "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Premium Red Lady Taiwan papaya with vibrant salmon-red flesh, smooth buttery texture, and gentle digestive papain enzymes. Sweet without any bitter aftertaste.",
    nutritionalInfo: {
      calories: "43 kcal per 100g",
      carbs: "10.8 g",
      fiber: "1.7 g",
      vitaminC: "60.9 mg (100% DV)",
      papain: "Digestive Enzyme Active"
    },
    origin: "Guntur, Andhra Pradesh",
    farm: {
      name: "Krishna Delta Agro Green",
      location: "Guntur",
      certifiedOrganic: true
    },
    storageInstructions: "Allow greenish spots to turn golden orange at room temperature, then chill slightly before serving with a squeeze of fresh lime.",
    tags: ["papaya", "red lady", "digestion", "vitamin-c", "gut-health"]
  },
  {
    id: "fruit-10",
    name: "Queen Mauritius Golden Pineapple",
    slug: "queen-golden-pineapple",
    category: "fresh-fruits",
    subcategory: "exotic-fruits",
    price: 120,
    originalPrice: 150,
    discount: 20,
    unit: "1 Pc (approx. 1 - 1.3 kg)",
    weightOptions: ["1 Pc (1-1.3 kg)", "Peeled & Sliced 500g"],
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockQuantity: 42,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: true,
    badge: "Extra Sweet",
    images: [
      "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Aromatic Queen variety pineapple from the lush rainforests of Vazhakulam, Kerala. Golden-yellow crispy flesh, low acidity, high sugar content, and active bromelain enzyme.",
    nutritionalInfo: {
      calories: "50 kcal per 100g",
      carbs: "13.1 g",
      bromelain: "Anti-inflammatory Enzyme",
      vitaminC: "47.8 mg",
      manganese: "0.9 mg (44% DV)"
    },
    origin: "Vazhakulam, Kerala",
    farm: {
      name: "Malabar Spice & Fruit Plantation",
      location: "Ernakulam",
      certifiedOrganic: true
    },
    storageInstructions: "Store whole pineapple upright at room temp for up to 3 days. Cut slices keep refrigerated in a sealed glass box.",
    tags: ["pineapple", "tropical", "sweet", "bromelain", "exotic"]
  },

  // ================= VEGETABLES =================
  {
    id: "veg-1",
    name: "Farm Fresh Country & Hybrid Tomatoes",
    slug: "fresh-tomatoes",
    category: "fresh-vegetables",
    subcategory: "fresh-vegetables",
    price: 38,
    originalPrice: 50,
    discount: 24,
    unit: "1 kg (approx. 10-12 pcs)",
    weightOptions: ["500 g", "1 kg", "2 kg", "Crate 5 kg"],
    rating: 4.8,
    reviewsCount: 420,
    inStock: true,
    stockQuantity: 180,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: true,
    badge: "Daily Essential",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546470427-e26264be0b11?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Vine-ripened, firm, bright red tomatoes picked early morning. Perfectly balanced between tang and sweet juiciness, ideal for classic curries, gravies, rasam, and fresh salads.",
    nutritionalInfo: {
      calories: "18 kcal per 100g",
      carbs: "3.9 g",
      fiber: "1.2 g",
      lycopene: "3025 mcg",
      vitaminC: "14 mg"
    },
    origin: "Madanapalle, Andhra Pradesh",
    farm: {
      name: "Valley Fresh Eco Greens",
      location: "Madanapalle",
      certifiedOrganic: true
    },
    storageInstructions: "Do not refrigerate unripe tomatoes; keep at room temperature stem-side down to preserve authentic aroma and juicy texture.",
    tags: ["tomato", "daily", "organic", "curry", "salad"]
  },
  {
    id: "veg-2",
    name: "Organic Hill Baby & Regular Potatoes",
    slug: "organic-potatoes",
    category: "fresh-vegetables",
    subcategory: "root-vegetables",
    price: 42,
    originalPrice: 55,
    discount: 23,
    unit: "1 kg (approx. 7-9 pcs)",
    weightOptions: ["1 kg", "2 kg", "5 kg Bag"],
    rating: 4.7,
    reviewsCount: 380,
    inStock: true,
    stockQuantity: 210,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: false,
    badge: "Pesticide Free",
    images: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Naturally grown hillside potatoes with firm skins and creamy, earthy flesh that stays tender without turning soggy. Unpolished and free of chemical anti-sprouting sprays.",
    nutritionalInfo: {
      calories: "77 kcal per 100g",
      carbs: "17.5 g",
      protein: "2.0 g",
      potassium: "421 mg",
      vitaminB6: "0.3 mg"
    },
    origin: "Nilgiri Hills, Tamil Nadu",
    farm: {
      name: "Ooty Mist Highland Farms",
      location: "Nilgiris",
      certifiedOrganic: true
    },
    storageInstructions: "Store in a cool, dark, dry, ventilated basket away from direct sunlight and onions.",
    tags: ["potato", "root", "staple", "organic", "unpolished"]
  },
  {
    id: "veg-3",
    name: "Nashik Special Pink & Red Onions",
    slug: "nashik-red-onions",
    category: "fresh-vegetables",
    subcategory: "root-vegetables",
    price: 48,
    originalPrice: 60,
    discount: 20,
    unit: "1 kg (approx. 8-10 pcs)",
    weightOptions: ["1 kg", "2 kg", "5 kg Mesh Bag"],
    rating: 4.8,
    reviewsCount: 395,
    inStock: true,
    stockQuantity: 195,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: false,
    badge: "Pungent & Crisp",
    images: [
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Famous Nashik red onions celebrated for their deep crimson papery skins, potent aroma, and rich sweetness when caramelized. Essential backbone of Indian cuisine.",
    nutritionalInfo: {
      calories: "40 kcal per 100g",
      carbs: "9.3 g",
      fiber: "1.7 g",
      quercetin: "Potent Flavonoid",
      vitaminC: "7.4 mg"
    },
    origin: "Lasalgaon, Nashik, Maharashtra",
    farm: {
      name: "Lasalgaon Kisan Syndicate",
      location: "Nashik",
      certifiedOrganic: false
    },
    storageInstructions: "Store in an open airy mesh wire basket at room temperature with good ventilation.",
    tags: ["onion", "nashik", "essential", "curry", "flavour"]
  },
  {
    id: "veg-4",
    name: "Ooty Sweet Orange & Red Carrots",
    slug: "ooty-sweet-carrots",
    category: "fresh-vegetables",
    subcategory: "root-vegetables",
    price: 58,
    originalPrice: 75,
    discount: 22,
    unit: "500 g",
    weightOptions: ["500 g", "1 kg", "2 kg"],
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    stockQuantity: 85,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: false,
    isFeatured: true,
    badge: "Extra Crunchy",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crunchy, sweet, and soil-washed highland carrots straight from the tea-shrouded Nilgiri hills. Packed with Beta-Carotene for bright eye health and glowing skin.",
    nutritionalInfo: {
      calories: "41 kcal per 100g",
      betaCarotene: "8285 mcg (104% DV Vitamin A)",
      fiber: "2.8 g",
      potassium: "320 mg"
    },
    origin: "Ooty, Tamil Nadu",
    farm: {
      name: "Blue Mountain Bio Terraces",
      location: "Ooty",
      certifiedOrganic: true
    },
    storageInstructions: "Remove carrot green tops immediately, wrap in breathable cloth and refrigerate up to 2 weeks.",
    tags: ["carrot", "ooty", "beta-carotene", "sweet", "salad"]
  },
  {
    id: "veg-5",
    name: "Crisp English Greenhouse Cucumber",
    slug: "english-cucumber",
    category: "fresh-vegetables",
    subcategory: "fresh-vegetables",
    price: 35,
    originalPrice: 45,
    discount: 22,
    unit: "500 g (approx. 2-3 pcs)",
    weightOptions: ["500 g", "1 kg"],
    rating: 4.8,
    reviewsCount: 168,
    inStock: true,
    stockQuantity: 90,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: false,
    badge: "Hydrating Crunch",
    images: [
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Slender, dark green, seedless English cucumbers grown in climate-controlled hydroponic greenhouses. Bitter-free with a thin edible skin and ultra-refreshing 95% water content.",
    nutritionalInfo: {
      calories: "15 kcal per 100g",
      water: "95.2%",
      silica: "Skin Hydration Mineral",
      vitaminK: "16.4 mcg"
    },
    origin: "Bengaluru Hydroponic Polyhouses, Karnataka",
    farm: {
      name: "GreenSpire Urban Farms",
      location: "Bengaluru Rural",
      certifiedOrganic: true
    },
    storageInstructions: "Refrigerate in the warmer upper door shelf of the fridge to prevent cold chill damage.",
    tags: ["cucumber", "salad", "crisp", "hydration", "hydroponic"]
  },
  {
    id: "veg-6",
    name: "Tender Crown Green Broccoli",
    slug: "green-broccoli",
    category: "fresh-vegetables",
    subcategory: "organic-vegetables",
    price: 89,
    originalPrice: 120,
    discount: 25,
    unit: "1 Pc (approx. 350-450 g)",
    weightOptions: ["1 Pc (350-450g)", "Twin Crown Pack"],
    rating: 4.9,
    reviewsCount: 194,
    inStock: true,
    stockQuantity: 48,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: true,
    badge: "Superfood Florets",
    images: [
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dense, deep green broccoli crowns with tight, crisp beads and thick tender stems. Sourced cold-chain from highland growers, bursting with sulforaphane, folate, and calcium.",
    nutritionalInfo: {
      calories: "34 kcal per 100g",
      protein: "2.8 g",
      fiber: "2.6 g",
      vitaminC: "89.2 mg (148% DV)",
      sulforaphane: "Potent Antioxidant"
    },
    origin: "Kodaikanal, Tamil Nadu",
    farm: {
      name: "Cloudcrest Bio Gardens",
      location: "Kodaikanal",
      certifiedOrganic: true
    },
    storageInstructions: "Keep unwashed in a loose perforated plastic bag in the refrigerator crisper for up to 6 days.",
    tags: ["broccoli", "superfood", "organic", "green", "healthy"]
  },
  {
    id: "veg-7",
    name: "Snow White Farm Cauliflower",
    slug: "farm-cauliflower",
    category: "fresh-vegetables",
    subcategory: "fresh-vegetables",
    price: 49,
    originalPrice: 65,
    discount: 24,
    unit: "1 Pc (approx. 600-800 g)",
    weightOptions: ["1 Pc", "Twin Pack (2 Pcs)"],
    rating: 4.7,
    reviewsCount: 145,
    inStock: true,
    stockQuantity: 62,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: false,
    badge: "Creamy White",
    images: [
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Compact, pearl-white cauliflower head wrapped in protective fresh green jacket leaves. Crisp and mild with zero yellow blemishes, great for aloo gobi, roasting, and cauliflower rice.",
    nutritionalInfo: {
      calories: "25 kcal per 100g",
      carbs: "5.0 g",
      fiber: "2.0 g",
      choline: "45 mg",
      vitaminC: "48.2 mg"
    },
    origin: "Pune Valley, Maharashtra",
    farm: {
      name: "Sahyadri Agro Collective",
      location: "Pune",
      certifiedOrganic: true
    },
    storageInstructions: "Store stem downwards in the vegetable crisper drawer in your refrigerator.",
    tags: ["cauliflower", "gobi", "fresh", "organic", "curry"]
  },
  {
    id: "veg-8",
    name: "Tricolor Crisp Bell Peppers (Capsicum)",
    slug: "tricolor-capsicum",
    category: "fresh-vegetables",
    subcategory: "fresh-vegetables",
    price: 79,
    originalPrice: 99,
    discount: 20,
    unit: "500 g (approx. 3-4 pcs)",
    weightOptions: ["Green Only 500g", "Tricolor Pack (Red/Yellow/Green) 500g", "1 kg Box"],
    rating: 4.8,
    reviewsCount: 178,
    inStock: true,
    stockQuantity: 75,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: true,
    badge: "Polyhouse Grown",
    images: [
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526346698789-2244fe090b83?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Thick-walled, crunchy, glossy bell peppers harvested fresh from shade-net greenhouses. Sweet, vibrant flavor that adds lively color and crunch to stir-fries, fajitas, and pizzas.",
    nutritionalInfo: {
      calories: "26 kcal per 100g",
      carbs: "6.0 g",
      vitaminC: "128 mg (213% DV)",
      vitaminA: "3131 IU"
    },
    origin: "Hosur, Tamil Nadu",
    farm: {
      name: "Flora Vista Polytech Farms",
      location: "Hosur",
      certifiedOrganic: true
    },
    storageInstructions: "Refrigerate unwashed in a reusable produce bag for up to 10 days.",
    tags: ["capsicum", "bell pepper", "crunchy", "stirfry", "fresh"]
  },
  {
    id: "veg-9",
    name: "Tender Baby Spinach (Palak)",
    slug: "tender-palak-spinach",
    category: "fresh-vegetables",
    subcategory: "leafy-vegetables",
    price: 29,
    originalPrice: 40,
    discount: 27,
    unit: "250 g bunch",
    weightOptions: ["250 g", "500 g (2 Bunches)", "1 kg Bulk"],
    rating: 4.9,
    reviewsCount: 312,
    inStock: true,
    stockQuantity: 120,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: true,
    badge: "Iron & Folate Rich",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Soil-free hydro-cleaned tender baby spinach leaves with succulent emerald stalks. Zero sand grit, thoroughly sorted, rich in iron, chlorophyll, and dietary fiber.",
    nutritionalInfo: {
      calories: "23 kcal per 100g",
      iron: "2.7 mg",
      folate: "194 mcg",
      lutein: "5626 mcg",
      vitaminK: "483 mcg"
    },
    origin: "Shamshabad Organic Valley, Telangana",
    farm: {
      name: "GreenRoots Living Soil Farms",
      location: "Shamshabad",
      certifiedOrganic: true
    },
    storageInstructions: "Keep in an airtight container lined with dry kitchen paper; refrigerate and use within 4-5 days.",
    tags: ["spinach", "palak", "greens", "iron", "organic", "leafy"]
  },
  {
    id: "veg-10",
    name: "Fiery Organic Green Chillies",
    slug: "organic-green-chilli",
    category: "fresh-vegetables",
    subcategory: "fresh-vegetables",
    price: 25,
    originalPrice: 35,
    discount: 28,
    unit: "200 g pack",
    weightOptions: ["200 g", "500 g"],
    rating: 4.8,
    reviewsCount: 162,
    inStock: true,
    stockQuantity: 110,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: false,
    isFeatured: false,
    badge: "Pungent & Fresh",
    images: [
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Slender, glossy, dark green spicy chillies with an authentic pungent kick. Harvested with stems intact to seal in essential oils and fiery heat.",
    nutritionalInfo: {
      calories: "40 kcal per 100g",
      capsaicin: "High (Metabolism Booster)",
      vitaminC: "143 mg (239% DV)",
      vitaminA: "952 IU"
    },
    origin: "Guntur, Andhra Pradesh",
    farm: {
      name: "Chilli Valley Naturals",
      location: "Guntur",
      certifiedOrganic: true
    },
    storageInstructions: "Remove stalks and store chillies in an airtight glass container lined with dry tissue in the fridge.",
    tags: ["chilli", "spicy", "green chilli", "flavour", "fresh"]
  },

  // ================= PREMIUM BASKETS =================
  {
    id: "basket-1",
    name: "Royal Celebration Fresh Fruit Basket",
    slug: "fresh-fruit-basket",
    category: "fruit-baskets",
    subcategory: "fruit-baskets",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    unit: "Handcrafted Cane Hamper (approx. 5 kg)",
    weightOptions: ["Classic (5 kg)", "Grand Royale (7.5 kg)"],
    rating: 5.0,
    reviewsCount: 146,
    inStock: true,
    stockQuantity: 25,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: true,
    isFeatured: true,
    badge: "Best Gifting Choice",
    images: [
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Our signature luxury gift hamper containing Alphonso Mangoes, Royal Gala Apples, Ruby Pomegranates, Sharad Seedless Grapes, Washington Oranges, and Kiwis artistically packed in an artisanal wicker basket adorned with eco-twine ribbon.",
    nutritionalInfo: {
      variety: "6 Seasonal Fruits",
      antioxidants: "Ultra Rich",
      serving: "Ideal for family of 4-6"
    },
    origin: "Curated Daily in Chitti's Master Facility",
    farm: {
      name: "Chitti's Artisan Gift Atelier",
      location: "Hyderabad Hub",
      certifiedOrganic: true
    },
    storageInstructions: "Unpack upon receipt. Refrigerate berries and grapes, keep whole apples and citrus on the fruit platter.",
    tags: ["basket", "gift", "fruit hamper", "premium", "royal"]
  },
  {
    id: "basket-2",
    name: "Weekly Harvest Fresh Vegetable Basket",
    slug: "fresh-vegetable-basket",
    category: "vegetable-baskets",
    subcategory: "vegetable-baskets",
    price: 699,
    originalPrice: 899,
    discount: 22,
    unit: "Farm Fresh Crate (approx. 7 kg)",
    weightOptions: ["Family Box (7 kg)", "Mega Kitchen Pantry (12 kg)"],
    rating: 4.9,
    reviewsCount: 230,
    inStock: true,
    stockQuantity: 35,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: true,
    badge: "Zero Chemical Crate",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The complete household culinary basket: 2kg Hill Potatoes, 1.5kg Nashik Onions, 1kg Vine Tomatoes, 500g Ooty Carrots, 500g Cucumbers, 1 Cauliflower Head, 250g Palak Spinach, 200g Green Chillies, Coriander, and Lemon.",
    nutritionalInfo: {
      variety: "10 Kitchen Essentials",
      servings: "Cooks 14+ nutritious home meals",
      purity: "Zero Synthetic Chemical Sprays"
    },
    origin: "Local Cooperatives via Cold-Chain Express",
    farm: {
      name: "Chitti's Direct Farmer Network",
      location: "Deccan & Western Ghats",
      certifiedOrganic: true
    },
    storageInstructions: "Separate roots into an airy basket; place leafy greens and crisp vegetables into the refrigerator crisper.",
    tags: ["basket", "vegetable box", "weekly essentials", "farm fresh", "organic"]
  },
  {
    id: "basket-3",
    name: "Signature Premium Mixed Harvest Basket",
    slug: "premium-mixed-basket",
    category: "fruit-baskets",
    subcategory: "fruit-baskets",
    price: 949,
    originalPrice: 1199,
    discount: 21,
    unit: "Artisanal Crate (approx. 6 kg)",
    weightOptions: ["Standard Hamper (6 kg)", "Deluxe Box (9 kg)"],
    rating: 4.9,
    reviewsCount: 184,
    inStock: true,
    stockQuantity: 28,
    isOrganic: true,
    isSeasonal: true,
    isBestSeller: false,
    isFeatured: true,
    badge: "Best of Both Worlds",
    images: [
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A harmonious combination of sweet, juicy orchard fruits and crunchy farm vegetables in one presentation crate. Ideal housewarming or festival gift that pleases the entire family.",
    nutritionalInfo: {
      contents: "Apples, Oranges, Pomegranates, Broccoli, Carrots, Bell Peppers, and Baby Spinach",
      certification: "Hand-checked for zero defects"
    },
    origin: "Chitti's Quality Assured Centers",
    farm: {
      name: "Integrated Bio Groves",
      location: "Multi-Region Certified",
      certifiedOrganic: true
    },
    storageInstructions: "Segregate fruits and vegetables into respective pantry bins upon arrival.",
    tags: ["mixed basket", "combo", "fruit vegetable", "gift", "premium"]
  },
  {
    id: "basket-4",
    name: "100% Certified Organic Produce Basket",
    slug: "organic-produce-basket",
    category: "vegetable-baskets",
    subcategory: "organic-vegetables",
    price: 849,
    originalPrice: 1050,
    discount: 19,
    unit: "Eco Jute Bag (approx. 5.5 kg)",
    weightOptions: ["Eco Jute Pack (5.5 kg)", "Double Eco Pack (11 kg)"],
    rating: 5.0,
    reviewsCount: 202,
    inStock: true,
    stockQuantity: 22,
    isOrganic: true,
    isSeasonal: false,
    isBestSeller: true,
    isFeatured: true,
    badge: "Jaivik Bharat Certified",
    images: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Independently lab-tested 100% certified organic produce basket delivered in a reusable biodegradable natural jute tote. Contains zero pesticide residues, grown using traditional cow dung vermicompost and neem oil sprays.",
    nutritionalInfo: {
      certification: "Jaivik Bharat & NPOP Accredited",
      heavyMetals: "ND (Not Detected)",
      pesticides: "0.00 ppm"
    },
    origin: "Certified Organic Agro Hubs",
    farm: {
      name: "Prakriti Bio Farms",
      location: "Deccan Plateau",
      certifiedOrganic: true
    },
    storageInstructions: "Keep in clean reusable cotton crisper pouches inside the refrigerator.",
    tags: ["organic", "certified", "pure", "jute bag", "health"]
  }
];

export const bestSellers = products.filter(p => p.isBestSeller);
export const seasonalProducts = products.filter(p => p.isSeasonal);
export const fruitsList = products.filter(p => p.category === 'fresh-fruits');
export const vegetablesList = products.filter(p => p.category === 'fresh-vegetables');
export const basketsList = products.filter(p => p.category.includes('baskets'));
