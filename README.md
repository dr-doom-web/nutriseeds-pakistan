# NutriSeeds Pakistan — Multimedia Midterm E-Commerce Website

**Project Name:** NutriSeeds Pakistan  
**Tagline:** Small Seeds. Big Health.  
**Course Context:** University Multimedia Midterm Project  
**Author / Contact:** ghulamujtabaedu@gmail.com | WhatsApp: 03297676956 (+923297676956)  
**Live Ready for:** GitHub Pages (Pure HTML5, CSS3, Vanilla JavaScript — zero build step required)

---

## 1. Official Business Contact Details
* **Business Name:** NutriSeeds Pakistan
* **Tagline:** Small Seeds. Big Health.
* **Email:** `ghulamujtabaedu@gmail.com`
* **WhatsApp Business:** `03297676956` (International: `+923297676956`)
* **WhatsApp Link:** [https://wa.me/923297676956](https://wa.me/923297676956)
* **Country:** Pakistan
* **Currency:** PKR (`Rs.`)

---

## 2. Completed Features & System Architecture

### A. Dual Order Request System
Since this is an academic e-commerce demonstration, no online payment gateway is integrated. Orders are handled as **Order Requests** through two distinct methods:
1. **Option A: Submit Order Request (Email via Formspree)**
   - Delivers complete order summary, customer contact details, delivery address, and line items directly to `ghulamujtabaedu@gmail.com`.
   - Prevents duplicate submissions by disabling buttons with loading state.
   - Clears cart only upon confirmed HTTP 200/201 acceptance from the backend.
2. **Option B: Order via WhatsApp**
   - Dynamically formats the cart into a structured, readable message matching course standards.
   - Includes Reference number, Customer details, Product lines (pack size, quantity, item prices), Subtotal, Delivery disclaimer ("To be confirmed"), and Delivery location.
   - Pre-fills WhatsApp conversation via `https://wa.me/923297676956?text=...`.
   - Keeps cart intact so the user can review and manually tap "Send" in WhatsApp.

### B. Shopping Cart & Inventory Behavior
- Real-time client-side cart backed by `localStorage` (`nutriseeds-cart-v1`).
- Pack size selection: 25g (Trial), 50g (Everyday), and 100g (Value).
- Line item quantity steppers (1 to 99) with automatic removal when reduced below 1.
- Responsive slide-out cart drawer on all 9 pages with quick WhatsApp ordering.
- Dynamic cart count badge on desktop and mobile headers.
- Cart subtotal accurately calculated in PKR (`Rs.`).

### C. Contact Us Form
- Fields: Full Name (required), Email Address (required), Phone Number (optional), Subject (required), Message (required).
- Direct links to email (`ghulamujtabaedu@gmail.com`) and WhatsApp Business (`03297676956`).
- Upon confirmed submission: Displays `"Thank you for contacting NutriSeeds Pakistan! Your message has been received. Our team will respond as soon as possible."`

### D. Interactive Features & Ethical Guidelines
- **Seed Finder:** Culinary-use matcher (Breakfast, Baking & oats, Salads & toppings, Easy snacking). No medical claims.
- **NutriGuide:** Clearly presented as a future proposed qualified-dietitian service, with explicit disclaimer that no clinicians are currently on staff.
- **Recipes:** Practical, approachable preparation guidance (e.g. soaking chia, grinding flax).

---

## 3. How to Connect Formspree (Final Step for Real Inbox Delivery)

The website is pre-configured with your WhatsApp number and email. To connect Formspree form endpoints:

1. Visit [https://formspree.io](https://formspree.io) and register using `ghulamujtabaedu@gmail.com`.
2. Click **+ New Form**:
   - Form 1 Name: `NutriSeeds Orders`
   - Form 2 Name: `NutriSeeds Contact`
3. Copy the two generated endpoint URLs (they look like `https://formspree.io/f/xbjvkqwe`).
4. Open `assets/js/config.js` and paste your endpoints:
   ```javascript
   window.NUTRI_CONFIG = Object.freeze({
     businessName: 'NutriSeeds Pakistan',
     tagline: 'Small Seeds. Big Health.',
     groupEmail: 'ghulamujtabaedu@gmail.com',
     whatsappNumber: '923297676956',
     whatsappDisplay: '03297676956',
     whatsappUrl: 'https://wa.me/923297676956',
     orderFormEndpoint: 'https://formspree.io/f/myeevbpw',
     contactFormEndpoint: 'https://formspree.io/f/mzeewkvg'
   });
   ```
5. If using WhatsApp notifications inside Formspree: In Formspree Dashboard > Settings > Integrations, you can enable phone/WhatsApp notification alerts if supported on your Formspree plan.

---

## 4. Deploying to GitHub Pages

1. Create a new public repository on GitHub (e.g., `nutriseeds-pakistan`).
2. Push or upload the project files into the root of the repository (`index.html`, `shop.html`, `cart.html`, etc., along with the `assets/` folder).
3. On GitHub, navigate to **Settings > Pages**.
4. Under **Branch**, select `main` (or `master`) and directory `/ (root)`, then click **Save**.
5. Wait 1-2 minutes. GitHub Pages will display your published URL (e.g. `https://<username>.github.io/nutriseeds-pakistan/`).
6. Open your live URL on desktop and mobile to verify all links, images, and WhatsApp/Email flows.

---

## 5. Course & Exam Defense Highlights

- **Logo Classification:** Combination Mark (Sprout icon symbol + NutriSeeds wordmark typography).
- **Typography:** Sans-serif pairing — Manrope for bold headings and Inter for clean, legible body text.
- **Color Psychology:** Forest Green (`#246B45`) conveys nature and wellness; Warm Cream (`#F6F3E8`) provides a comforting, organic background; Seed Gold (`#D9A64B`) highlights accents; Charcoal (`#24382D`) guarantees optimal contrast.
- **Design Philosophy:** Swiss Style minimalism — clear visual hierarchy, accessible tap targets, uncluttered content.
- **Multimedia Learning Theory (Mayer):** Split-attention avoidance, spatial contiguity, and dual-coding through paired photography/illustrations and concise text.
