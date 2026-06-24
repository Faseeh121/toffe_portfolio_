import { useState, useEffect } from "react";
import { PremiumPortfolio } from "./PremiumPortfolio";
import FoodApp from "./Projects/food_app";
import ServiceProviderApp from "./Projects/Service_provider_app";
import SocialMediaApp from "./Projects/social_media_app";
import AppNav from "./components/app_nav";
import WebNav from "./components/web_nav";
import BlogWebsite from "./Projects/blog_website";
import ArabNewsWebsite from "./Projects/arab_news_website";
import EcommerceWebsite from "./Projects/ecommerce_website";
import AdminPanels from "./Projects/admin_panels";

type Page =
  | "portfolio"
  | "mobile-apps"
  | "food-app"
  | "service-provider-app"
  | "social-media-app"
  | "websites"
  | "blog-website"
  | "arab-news-website"
  | "ecommerce-website"
  | "admin-panels";

function App() {
  const [page, setPage] = useState<Page>("portfolio");

  // Reset scroll position when navigating between pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (page === "food-app") {
    return <FoodApp onBack={() => setPage("mobile-apps")} />;
  }

  if (page === "service-provider-app") {
    return <ServiceProviderApp onBack={() => setPage("mobile-apps")} />;
  }

  if (page === "social-media-app") {
    return <SocialMediaApp onBack={() => setPage("mobile-apps")} />;
  }

  if (page === "mobile-apps") {
    return (
      <AppNav
        onBack={() => setPage("portfolio")}
        onNavigate={(p: string) => setPage(p as Page)}
      />
    );
  }

  if (page === "websites") {
    return (
      <WebNav
        onBack={() => setPage("portfolio")}
        onNavigate={(p: string) => setPage(p as Page)}
      />
    );
  }

  if (page === "blog-website") {
    return <BlogWebsite onBack={() => setPage("websites")} />;
  }

  if (page === "arab-news-website") {
    return <ArabNewsWebsite onBack={() => setPage("websites")} />;
  }

  if (page === "ecommerce-website") {
    return <EcommerceWebsite onBack={() => setPage("websites")} />;
  }

  if (page === "admin-panels") {
    return <AdminPanels onBack={() => setPage("portfolio")} />;
  }

  return <PremiumPortfolio onNavigate={(p) => setPage(p as Page)} />;
}

export default App;
