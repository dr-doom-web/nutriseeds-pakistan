/* NUTRISEEDS PAKISTAN — PRODUCT CATALOG & RECIPE DATA
   Market-informed demonstration prices (Lahore, Nov 2026).
   Prices are research estimates for academic project evaluation.
   Delivery is confirmed separately; no online payment is taken.
*/
window.NUTRI_PRODUCTS = [
  {
    id: 'chia',
    name: 'Chia Seeds',
    tag: 'Breakfast favorite',
    blurb: 'Tiny black seeds for soaked breakfasts, smoothies, and pudding bowls.',
    long: 'Small dark chia seeds (Salvia hispanica) that can be soaked and added to prepared breakfast bowls, drinks, and yogurt. Always follow appropriate preparation guidance.',
    prices: { '200g': 449, '500g': 999, '1kg': 1899 },
    variants: [
      { size: '200g', label: '200g (Pantry Pack)', price: 449, unit: 'g' },
      { size: '500g', label: '500g (Value Pack)', price: 999, unit: 'g' },
      { size: '1kg', label: '1kg (Bulk Pack)', price: 1899, unit: 'kg' }
    ],
    tile: '#e7efea',
    tags: ['breakfast'],
    prep: 'Fully soak chia seeds in water, milk, or fresh juice before eating. Never swallow dry spoonfuls; chia absorbs liquid rapidly.',
    storage: 'Store in an airtight container in a cool, dry place away from direct sunlight.',
    use: 'Overnight soaked chia, yogurt bowls, porridge, puddings, smoothies.',
    ingredients: '100% whole raw chia seeds.'
  },
  {
    id: 'flax',
    name: 'Flax Seeds',
    tag: 'Pantry staple',
    blurb: 'Nutty brown seeds for oatmeal, homemade bread, and everyday baking.',
    long: 'Whole brown flax seeds (Linum usitatissimum / Alsi) for use in everyday meals, baking, and warm cereals. Grinding seeds shortly before use aids optimal absorption.',
    prices: { '200g': 219, '500g': 479, '1kg': 899 },
    variants: [
      { size: '200g', label: '200g (Pantry Pack)', price: 219, unit: 'g' },
      { size: '500g', label: '500g (Value Pack)', price: 479, unit: 'g' },
      { size: '1kg', label: '1kg (Bulk Pack)', price: 899, unit: 'kg' }
    ],
    tile: '#f0e8d8',
    tags: ['baking', 'breakfast'],
    prep: 'Grind an appropriate food-use amount shortly before adding to oats, smoothies, or dough, or use whole in crusty bread toppings.',
    storage: 'Store sealed in a cool, dark place. Ground flax should be refrigerated in a sealed container.',
    use: 'Oats, smoothies, yogurt, bread dough, and muffin baking.',
    ingredients: '100% whole raw brown flax seeds.'
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin Seeds Without Shell',
    tag: 'Naturally versatile',
    blurb: 'Shelled green pepita kernels for crunchy salads, soups, and toppings.',
    long: 'Green, machine-hulled pumpkin seed kernels (pepitas / Maghaz Kadu), perfect for adding wholesome texture to salads, soups, and snack bowls.',
    prices: { '200g': 649, '500g': 1499, '1kg': 2799 },
    variants: [
      { size: '200g', label: '200g (Pantry Pack)', price: 649, unit: 'g' },
      { size: '500g', label: '500g (Value Pack)', price: 1499, unit: 'g' },
      { size: '1kg', label: '1kg (Bulk Pack)', price: 2799, unit: 'kg' }
    ],
    tile: '#e7eedc',
    tags: ['topping', 'snacks'],
    prep: 'Ready to enjoy as a nutritious topping, or lightly pan-toast on low heat with a dash of sea salt for extra crunch.',
    storage: 'Keep in a tightly sealed pouch in a cool, dry pantry.',
    use: 'Salads, roasted vegetables, grain bowls, soup garnishes, trail mixes.',
    ingredients: '100% shelled green pumpkin kernels.'
  },
  {
    id: 'sunflower',
    name: 'Sunflower Kernels Without Shell',
    tag: 'Easy everyday use',
    blurb: 'Mild, shelled sunflower kernels for granola, breakfast bowls, and salads.',
    long: 'Raw, shelled sunflower seed kernels (Maghaz Surajmukhi) offering a delicate nutty crunch that complements both sweet and savory recipes.',
    prices: { '200g': 429, '500g': 979, '1kg': 1799 },
    variants: [
      { size: '200g', label: '200g (Pantry Pack)', price: 429, unit: 'g' },
      { size: '500g', label: '500g (Value Pack)', price: 979, unit: 'g' },
      { size: '1kg', label: '1kg (Bulk Pack)', price: 1799, unit: 'kg' }
    ],
    tile: '#f3ebd9',
    tags: ['topping', 'snacks'],
    prep: 'Use raw or lightly roasted as a topping for granola, salads, and vegetable stir-fries.',
    storage: 'Store sealed in a cool, dry place away from heat and humidity.',
    use: 'Granola bowls, bread baking, salads, and everyday snacking.',
    ingredients: '100% hulled sunflower kernels.'
  },
  {
    id: 'sesame',
    name: 'White Sesame Seeds',
    tag: 'Baking & culinary classic',
    blurb: 'Clean, delicate white sesame seeds for bread, tahini, and savory dishes.',
    long: 'Premium machine-cleaned white sesame seeds (Til Safaid / Sesamum indicum), offering a subtle nutty aroma when toasted and rich culinary versatility.',
    prices: { '200g': 249, '500g': 549, '1kg': 999 },
    variants: [
      { size: '200g', label: '200g (Pantry Pack)', price: 249, unit: 'g' },
      { size: '500g', label: '500g (Value Pack)', price: 549, unit: 'g' },
      { size: '1kg', label: '1kg (Bulk Pack)', price: 999, unit: 'kg' }
    ],
    tile: '#f6f0e3',
    tags: ['baking', 'topping'],
    prep: 'Lightly dry-toast in a skillet for 2-3 minutes until golden and fragrant before sprinkling on breads, naan, or stir-fries.',
    storage: 'Keep in a cool, dark, and dry cupboard in a sealed jar.',
    use: 'Naan, bakery bread, tahini pastes, stir-fries, and traditional sweets.',
    ingredients: '100% cleaned raw white sesame seeds.'
  },
  {
    id: 'nutrimix',
    name: 'NutriMix Four-Seed Blend',
    tag: 'All-in-one super blend',
    blurb: 'Balanced raw mix of chia, flax, pumpkin, and sunflower seeds.',
    long: 'NutriMix combines equal proportions of raw Chia, Flax, shelled Pumpkin, and Sunflower kernels in one convenient daily pantry pouch.',
    prices: { '200g': 499, '500g': 1099 },
    variants: [
      { size: '200g', label: '200g (Pouch)', price: 499, unit: 'g' },
      { size: '500g', label: '500g (Value Pouch)', price: 1099, unit: 'g' }
    ],
    tile: '#eaf1e7',
    tags: ['breakfast', 'topping'],
    prep: 'Stir directly into breakfast oats, smoothies, yogurt, or salad bowls without measuring separate seed bags.',
    storage: 'Store sealed in a cool, dry place. Reseal tightly after opening.',
    use: 'Daily breakfast bowls, yogurt, smoothies, and salad toppings.',
    ingredients: '25% Chia, 25% Flax, 25% Shelled Pumpkin, 25% Shelled Sunflower.'
  },
  {
    id: 'discovery-box',
    name: 'NutriSeeds Discovery Box',
    tag: 'Beginner sampler set',
    blurb: 'One complete sampler box with 4 separate 25g packs (Chia, Flax, Pumpkin, Sunflower).',
    long: 'The Discovery Box is designed for beginners to explore four core seed varieties without committing to large individual bags. Contains four individually sealed 25g packets (100g total).',
    prices: { '1-box': 299 },
    variants: [
      { size: '1-box', label: '1 Box (100g total · 4 × 25g packs)', price: 299, unit: 'box' }
    ],
    tile: '#f8f2e4',
    tags: ['breakfast', 'snacks'],
    prep: 'Try each seed variety one by one using the included food-use guides before choosing your favorite regular pack.',
    storage: 'Keep individual sealed pouches in the discovery box in a dry pantry.',
    use: 'Beginner seed tasting, morning trials, and thoughtful gifting.',
    ingredients: 'Chia 25g, Flax 25g, Hulled Pumpkin 25g, Hulled Sunflower 25g.',
    note: 'Sold only as one complete 100g box set. Individual 25g packets cannot be ordered separately.'
  },
  {
    id: 'sunflower-oil',
    name: 'Sunflower Cooking Oil',
    tag: 'Planned culinary product',
    blurb: 'Pure refined sunflower cooking oil with a high smoke point. Coming Soon.',
    long: 'Planned high-smoke-point sunflower cooking oil for high-heat cooking and baking. This product is currently in supplier qualification and is not yet available for ordering.',
    prices: { '500ml': 349, '1L': 649 },
    variants: [
      { size: '500ml', label: '500ml (Proposed: Rs. 349)', price: 349, unit: 'ml' },
      { size: '1L', label: '1 Litre (Proposed: Rs. 649)', price: 649, unit: 'L' }
    ],
    tile: '#fdf7e3',
    tags: ['baking'],
    prep: 'High smoke point oil suitable for everyday sautéing, frying, and baking.',
    storage: 'Store in a cool, dark cupboard away from direct stove heat.',
    use: 'Sautéing, shallow frying, salad dressings, and home baking.',
    ingredients: 'Pure sunflower oil (planned formulation).',
    isComingSoon: true,
    statusNote: 'Coming Soon — Ordering is disabled while supplier acquisition and packaging verification are underway. 500ml bottle size has not been independently confirmed.'
  }
];

window.NUTRI_RECIPES = [
  {
    id: 'chia-breakfast',
    title: 'Soaked Chia Breakfast Bowl',
    seed: 'chia',
    category: 'Breakfast',
    time: 'Prep ahead',
    summary: 'A simple make-ahead bowl with yogurt and fresh fruit.',
    ingredients: ['2 tbsp NutriSeeds Chia Seeds', '1/2 cup Milk or plant-based drink', '1/2 cup Plain yogurt', 'Fresh seasonal fruit or honey to taste'],
    steps: 'Combine chia seeds with liquid in a bowl or jar. Stir thoroughly and soak in the refrigerator for at least 4 hours or overnight. Top with yogurt and fresh fruit before serving.'
  },
  {
    id: 'flax-oats',
    title: 'Ground Flax & Oatmeal Bowl',
    seed: 'flax',
    category: 'Breakfast',
    time: '10 min',
    summary: 'Bring a mild nutty touch and wholesome fiber to an everyday oatmeal bowl.',
    ingredients: ['1 cup Cooked rolled oats', '1-2 tbsp Freshly ground NutriSeeds Flax Seeds', '1/2 cup Warm milk or water', 'Sliced banana or dates'],
    steps: 'Prepare oats according to your favorite method. Remove from heat and stir in freshly ground flax seeds. Garnish with sliced banana or chopped dates.'
  },
  {
    id: 'pumpkin-salad',
    title: 'Crunchy Salad & Grain Topper',
    seed: 'pumpkin',
    category: 'Lunch',
    time: '5 min',
    summary: 'Add satisfying crunch to green salads, soups, and roasted vegetables.',
    ingredients: ['2 tbsp NutriSeeds Pumpkin Seeds Without Shell', 'Mixed green salad leaves or warm roasted vegetables', 'Olive oil, lemon juice, and black pepper'],
    steps: 'Lightly toast pumpkin seeds in a dry skillet on medium-low heat for 2 minutes until aromatic. Sprinkle directly over dressed salad or warm soup.'
  },
  {
    id: 'sunflower-granola',
    title: 'Sunflower Granola Bowl',
    seed: 'sunflower',
    category: 'Snack',
    time: '5 min',
    summary: 'Use shelled sunflower kernels in a wholesome cereal or yogurt bowl.',
    ingredients: ['1/2 cup Granola or puffed grain cereal', '1/2 cup Fresh yogurt', '2 tbsp NutriSeeds Sunflower Kernels Without Shell'],
    steps: 'Layer yogurt and crunchy granola in a small bowl, then generously top with raw or lightly toasted sunflower kernels before serving.'
  }
];
