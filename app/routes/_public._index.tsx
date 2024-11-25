import type { MetaFunction } from "@remix-run/node";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import CallToAction from "@/components/CallToAction";
import Partnerships from "@/components/Partnerships";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";

export const meta: MetaFunction = () => {
  return [
    { title: "SteelService - North America's Leading Steel Plate Supplier" },
    { name: "description", content: "Premium steel plates and processing services" },
  ];
};

export default function Index() {
  return (
    <main>
      <Hero />
      <Products />
      <Services />
      <CallToAction />
      <Partnerships />
      <FAQ />
      <ContactSection />
    </main>
  );
}