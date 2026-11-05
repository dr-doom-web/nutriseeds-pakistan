# NutriSeeds Pakistan - Shared Multimedia Midterm Revision

**Read as a group.** This sheet refers to the website as designed in the provided ZIP. Email/WhatsApp operation must be verified after your group connects the destinations; do not say a feature is live if it has not passed a real test.

## 1. Our 30-second business explanation

NutriSeeds Pakistan is a proposed seed-packet business selling chia, flax, pumpkin and sunflower seeds in 25g, 50g and 100g sizes. Its customers are price-conscious university students, office workers, fitness enthusiasts and families. Its value is the combination of small affordable trial packs, understandable preparation information and an easier buying process. A future optional NutriGuide service could provide independent dietary guidance from a qualified professional. The website allows customers to browse products, select sizes, manage a basket, use a culinary Seed Finder, and submit an order request when business email and WhatsApp accounts are connected.

Tagline: **Small Seeds. Big Health.**

## 2. Exact visual design answers

**Logo type:** Combination mark (logo includes text + symbol). The icon uses two seed-like leaves forming a growing sprout. It communicates seeds and natural growth without implying a medical facility. The wordmark spells out NutriSeeds. A simplified SVG symbol is used for the favicon. Source: The Science of Logo Design, lecture 7, simplified textual/graphical/combination classification.

**Fonts:** Manrope (headings/brand) and Inter (body and controls): both sans-serif, suitable for clean, readable e-commerce. Actual website Google Fonts declarations are in `styles.css` and HTML. Offline fallback fonts are Arial/sans-serif. Source: lecture 7 typography.

**Colors:** Forest green `#214F36` / primary brand green `#246B45` = nature and steadiness; cream `#F6F3E8` = warm, quiet background; seed gold `#D9A64B` = selective accent; charcoal `#24382D` = readable text. Source: lecture 7 color psychology and consistent palettes.

**Style:** Minimalism with Swiss Style influence: open space, clean typographic hierarchy, simple grid layout and visible actions. Source: lecture 10 graphic design styles.

**Camera/poster ideas:** Overhead flat-lay to show all varieties; close-up to show seed texture; eye-level front view of pack to show label. Poster uses a large packet shot, brief tagline, logo and one CTA; rule of thirds guides placement. Source: lecture 9 camera composition.

## 3. Competitors and realistic differentiation

- **ChiltanPure (Pakistan):** Seed product range including chia, flax, pumpkin and sunflower. Our contrast is a focused trial-pack-first beginner journey. https://chiltanpure.com/collections/seeds
- **SL Naturals (Pakistan):** Natural products including individual edible seeds and mixed options. Our contrast is a specifically seed-focused small-pack catalog and practical food-use guidance. https://slnaturals.com/collections/seeds
- **Gulroop (Pakistan):** Wider natural-product range with edible seeds. Our contrast is an uncluttered seed-focused brand and culinary Seed Finder. https://gulroop.pk/collections/edible-seeds
- **Munchy Seeds (UK):** Sells small seed snack formats and recipe-related products. This shows that mini packs are **not globally unique**. We adapt a seed-focused experience to Pakistani customers and local prices. https://munchyseeds.co.uk/shop/

Do not invent limitations such as 'no competitor sells small packs' or 'none gives advice'; those require further investigation.

## 4. Customer persona (hypothetical until interviewed)

Ayesha, 21, university student in Lahore, uses social media on her phone, wants to try more food varieties on a small budget, does not want a large unfamiliar pack, and values practical food-use instructions. She finds the store on Instagram, chooses a 25g trial packet, checks the recipe guidance and submits an order request. Lecture 6 emphasizes research, realistic personas and a specific value proposition rather than an invented 'everyone' audience.

## 5. Business Model Canvas - 9 components

1. **Customer Segments:** University students, office workers, fitness-focused customers and families.
2. **Value Proposition:** Small trial packs, easy culinary instructions, simple ordering, future qualified independent dietary guidance.
3. **Channels:** E-commerce website, Instagram, Facebook, WhatsApp Business; later university shops, gyms and neighborhood retailers.
4. **Customer Relationships:** Order inquiry support, response by email/WhatsApp, practical information and after-sales communication.
5. **Revenue Streams:** Sales of individual packets, discovery bundles, repeat and wholesale purchases. Paid guidance is hypothetical and requires a real qualified professional.
6. **Key Resources:** Quality suppliers, packaging, food safety processes, trained team, inventory, website, qualified future partner.
7. **Key Activities:** Buying seeds, checking quality, packing, labeling, marketing, delivering and responding to orders.
8. **Key Partnerships:** Edible-seed wholesalers, suitable packaging suppliers, couriers, shops, gyms and a qualified future dietitian.
9. **Cost Structure:** Seed procurement, packing, labeling, food registration/testing, transport, marketing, website/form tools, labor and professional fees.

**Illustrative 50g unit calculation:** Rs. 150 selling price - Rs. 90 unit cost = Rs. 60 contribution, or 40% of sales. 500 units would give Rs. 30,000 contribution **before** any excluded costs; it is not net profit. Prices in the website are illustrative and vary by seed.

## 6. Multimedia theory revision

The lecture 2 slide set mentions more than seven concepts. The following seven are high-priority examples to connect to this site, **not independently verified as the exact seven selected by the instructor**:

1. **Cognitive Theory of Multimedia Learning (Richard Mayer):** People have limited processing capacity. We use brief descriptions, photographs/illustrations and simple page hierarchy, with no distracting autoplay audio. Specific principles: multimedia, coherence, signaling, spatial contiguity.
2. **Dual-Coding Theory (Allan Paivio):** Words and images reinforce understanding. Each seed has a clear name, image and use description.
3. **Integrated Model of Text and Picture Comprehension (Wolfgang Schnotz):** Readers combine text and depictions into a mental understanding. Recipes combine visuals and step-by-step preparation instructions.
4. **Magic Bullet / Hypodermic Needle Theory (historical early mass-effects model):** Assumed audiences respond directly and uniformly. We do not rely on this as an accurate modern model; our site encourages informed product comparison.
5. **Cultivation Theory (George Gerbner):** Repeated media images can shape perceptions over time. A consistent, non-exaggerated brand message about small everyday habits may build recognition over time. We cannot claim a measured cultivation effect from this prototype.
6. **Agenda-Setting Theory (Maxwell McCombs and Donald Shaw):** Media can influence which topics receive attention. Our proposed social content could encourage questions about seed preparation and label reading rather than claim cures.
7. **Uses and Gratifications Theory:** Audiences actively choose media to satisfy needs. Our Seed Finder, product pages and recipes serve different customer information needs.

**Also study:** Media Richness Theory (Daft & Lengel): photos, guided information and a future qualified conversation can help clarify uncertainty, but NutriGuide is not operational. The lecture also references 4C/ID and interactivity. Confirm the exact seven asked by the instructor from the recording.

## 7. Website functionality - truthful test answer

**Cart:** JavaScript adds products in a chosen size, keeps them in browser localStorage, updates quantities and recalculates the total.

**Email orders:** When the group configures a real Formspree endpoint, the completed order form sends product details, subtotal and customer information to the form service. A success message appears only after the service returns a successful response. Actual inbox delivery must be verified.

**WhatsApp orders:** Clicking the button opens a prefilled message to the configured WhatsApp Business number. The customer must send the message. This does not automatically place a confirmed order.

**Contact Us:** Separate Formspree contact form includes name, email, subject and message. The team can reply using the provided email once the real form/inbox works.

**NutriGuide:** Planned professional dietary-information support; no clinician hired or medical form implemented. Ordinary seed shopping does not require medical consultation.

**Mobile design:** Media queries convert the desktop navigation to a mobile menu and collapse product grids to one column; tap targets and form fields adapt to smaller screens.

## 8. Sample long-answer framework (7.5-mark question)

**Question: Explain your business idea and how Multimedia concepts shaped the website.**

NutriSeeds Pakistan is a student e-commerce concept selling chia, flax, pumpkin and sunflower seeds in small 25g, 50g and 100g packs. Our target customers include university students and working adults who want practical, affordable quantities and easy instructions. Our unique value is not the seeds alone; it is the small-pack shopping experience combined with clear culinary guidance and a future plan for optional qualified dietitian support. We designed the website using a combination-mark logo: a seed/sprout icon and the NutriSeeds name. Green, cream and gold make a consistent natural-food identity. Manrope and Inter are readable sans-serif fonts. The layout uses minimalist grids, open space and clear hierarchy. We apply Mayer's multimedia learning principles by placing concise text near seed images; Paivio's Dual-Coding Theory through visuals and words together; and Uses and Gratifications Theory through an interactive Seed Finder that allows customers to choose food-use information they need. Our JavaScript cart calculates prices and quantities, while Formspree and WhatsApp provide order-request channels once configured. The business model includes customers, value, channels, relationships, revenue, resources, activities, partners and costs. The site is an academic prototype; real fulfillment and nutrition consultation would need verified suppliers, professional partners and food-business compliance.

## 9. Group consistency checks

Every member should use the same seed names and pack sizes, the same tagline, the same **combination mark** classification, the same font names, the same key audience and competitors, and the same honest distinction between **planned** and **operational** features. After email/WhatsApp configuration, update these notes to reflect which features you actually tested successfully.
