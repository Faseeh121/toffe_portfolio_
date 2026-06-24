# Site Features

## Global
- Multi-language delivery: uses LanguageContext to serve English or translated content; falls back to English with a translation notice when translations are missing.
- RTL awareness: layouts, breadcrumbs, and badges flip direction when `isRTL` is true.
- SEO ready: Helmet page titles/descriptions across pages; SinglePost adds SEOHead, OpenGraph, Article schema, and Breadcrumb schema.
- Monetization-ready ad slots: header top, sidebar (top/mid), in-article, footer, and other placements wired via AdSlot.
- Media helpers: consistent image URL building, placeholder fallback, date formatting, and social share helper usage.

## Home (src/pages/Home.jsx)
- Pulls site settings (title/description/logo) and renders a branded hero.
- Exclusive ticker bar with auto-sliding headlines and hover-to-pause.
- Center image carousel with hover pause, dot indicators, and CTA overlay.
- Ranked "Latest News" list and side cards for 4th/5th stories with badges.
- Translation-aware fetch of latest posts, with graceful fallback and user notice when translations are unavailable.
- "Latest Stories" grid plus a large featured story; repeats for additional pages of content loaded via "Load More".
- Additional story groups render in batches of five with category badges and view counts.
- Multiple ad insertions (header, in-article, sidebar, footer) baked into layout.

## Blog Listing (src/pages/Blog.jsx)
- Paginated article listing (10 per page) with smooth scroll on page change.
- Language-aware data source (original or translated API) and pathing.
- Dynamic pagination builder with first/last shortcuts and ellipsis handling.
- Breadcrumbs and localized copy for RTL or translated languages.

## Category Listing (src/pages/Category.jsx)
- Category header with name/description and RTL-aware breadcrumbs.
- Grid of posts with language-aware links.
- "Load More" pagination with spinner state; stops when fewer than 12 posts remain.

## Tag Listing (src/pages/Tag.jsx)
- Tag header showing total post count and RTL-aware breadcrumbs.
- Grid of tagged posts; language-aware links and empty-state messaging.

## Search (src/pages/Search.jsx)
- Query-string driven search (`q`), using translated or base API as needed.
- Loading skeletons, result counts, and RTL-aware breadcrumbs/headings.
- Friendly empty state with CTA back to homepage.

## Single Post (src/pages/SinglePost.jsx)
- Language-aware post fetch with original slug propagation for language switching.
- SEO: Helmet via SEOHead, OpenGraph, canonical URL, Article schema, and Breadcrumb schema.
- Translation badges, RTL support, and category/tag chips.
- Rich article view with featured image, formatted publish date, author, and view counts.
- Two in-article ad slots, plus share buttons for Facebook, Twitter, LinkedIn, WhatsApp.
- Related articles from the same category (language-aware, current post filtered out).

## Single Page (src/pages/SinglePage.jsx)
- Language-aware static page fetch with original slug propagation.
- Supports two templates: full-width layout or content-with-sidebar.
- Translation badges, RTL-aware breadcrumbs (including parent page), and meta tags.
- Renders HTML content safely with direction-aware prose styling.

## Unsubscribe (src/pages/Unsubscribe.jsx)
- Newsletter unsubscribe flow: email capture, redirects to API endpoint, and success/failure messaging.
- Accepts pre-filled status via query params; provides cancel and return-to-home actions.

## Not Found (src/pages/NotFound.jsx)
- 404 page with primary/secondary CTAs and inline search form to recover navigation.
