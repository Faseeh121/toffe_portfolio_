# Admin Features & Functionality

- Admin-only access with login guard, token storage, and route protection via PrivateRoute; navbar shows active section, user menu, logout, and quick link to public store.
- Dashboard with live stats (orders, products, users, revenue), recent orders table, and quick-action tiles to products, categories, orders, users, SEO/ads, and analytics.
- Product management: list with thumbnails, brand/category/type badges, popularity and feature badges (featured, smart, eco), stock/discount indicators, and edit/delete actions.
- Product creation/editing: rich form with name/description, price, brand, category, stock, appliance type, use case, popularity flag, tags, warranty, discount, featured/smart/energy-efficient toggles, multi-image upload, color palette builder (name + hex), and image-to-color mapping for gallery filtering.
- Category management: list with images, add/edit forms (name, description, image upload), and delete actions.
- Order management: table with payment state, status badge, totals; modal with shipping/contact details, line items, financial summary, status updater (Pending/Processing/Shipped/Delivered/Cancelled), and delete order option.
- User management: list with role badges, phone/email, joined date; promote/demote admin role and delete user (self actions disabled for safety).
- SEO & AdSense settings: edit site title/description/keywords/URL/OG image, Twitter handle, GA ID, site verification, GTM; configure AdSense enablement, publisher ID, per-slot toggles and formats (home top, listing top, between products with frequency, product detail sidebar, footer, etc.), plus social links and business contact info.
- Analytics dashboard: selectable window (7/30/90 days), summary cards for page views, unique visitors, orders, revenue, avg order value, AdSense earnings; traffic sources and device breakdown; top-selling products table; AdSense performance (impressions, clicks, CTR, RPM).
- Settings/data helpers: site settings hook for SEO/AdSense consumption; admin AuthContext with admin flag enforcement; toast feedback on key actions; responsive navbar layout.

## Demo Flow (talk track)
1) Login as admin (guarded). 2) Show dashboard stats and recent orders, then jump via quick tiles. 3) Open Products: edit/delete, then add new product with images, tags, colors, smart/eco flags, and popularity badge. 4) Categories: add image-backed category. 5) Orders: open order modal, update status, note payment state. 6) Users: promote/demote admin. 7) SEO/Ads: toggle AdSense, set slots, update SEO meta. 8) Analytics: switch date range, review traffic/device sources, top products, and AdSense metrics.
