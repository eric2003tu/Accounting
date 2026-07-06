import Hero from "./components/Hero";
import GrowthSection from "./components/GrowthSection";
import CapabilitiesSection from "./components/CapabilitiesSection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <GrowthSection />
      <CapabilitiesSection />
    </div>
  );
}
