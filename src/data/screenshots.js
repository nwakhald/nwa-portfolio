import images from './images.json';

export const britishScreenshots = [
  { title: 'Dashboard', file: 'assets/britishlightup-dashboard.png', caption: 'Sales, orders, customers and stock in one view.', alt: 'BritishLightUp Executive Analytics dashboard showing sales, orders, customer and inventory cards, revenue trends, and management and audit navigation.' },
  { title: 'Storefront', file: 'assets/britishlightup-storefront.png', caption: 'Lighting products, search, wishlist, cart and Ask Lumi.', alt: 'BritishLightUp storefront with lighting collections, product search, wishlist, cart and Ask Lumi AI assistant.' },
  { title: 'Products', file: 'assets/britishlightup-catalogue.png', caption: 'Product filters, prices, stock and reviews.', alt: 'BritishLightUp catalogue with categories, product cards, prices, stock, ratings and wishlist buttons.' },
  { title: 'AI product form', file: 'assets/britishlightup-ai-admin-form.png', caption: 'Product details with Gemini-assisted descriptions.', alt: 'BritishLightUp product form with name, SKU, prices, stock, category, descriptions and Write Copy with Gemini AI.' },
].map((shot) => ({ ...shot, ...images[shot.file] }));

export const appScreenshots = [
  { title: 'Home', file: 'assets/online-ncc-home.jpeg', caption: 'Subscriptions and recharge. Connection-error state shown.', alt: 'Online NCC home screen with remaining service days, recharge and debt options, and a network-error message with a Retry button.' },
  { title: 'Account', file: 'assets/online-ncc-account-redacted.png', caption: 'Account and package details. Phone number hidden.', alt: 'Online NCC account screen with active status, package information, expiry date and remaining time. The phone number is hidden.' },
  { title: 'Menu', file: 'assets/online-ncc-menu.jpeg', caption: 'Language, themes and support options.', alt: 'Online NCC menu with light, dark and system themes; English, Arabic and Kurdish languages; FAQs, complaints, requests and contact.' },
].map((shot) => ({ ...shot, ...images[shot.file] }));
