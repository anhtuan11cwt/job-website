import CategoryCarousel from "@/components/shared/CategoryCarousel";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import LatestJobs from "@/components/shared/LatestJobs";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Home;
