import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryCarousel from "@/components/shared/CategoryCarousel";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/shared/HeroSection";
import LatestJobs from "@/components/shared/LatestJobs";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

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
