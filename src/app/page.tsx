import { Layout } from "@/components/layout";
import {
  HeroSection,
  StorySection,
  ExpertiseSection,
  ProductShowcase,
  WhyChooseSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <StorySection />
      <ExpertiseSection />
      <ProductShowcase />
      <WhyChooseSection />
      <ContactSection />
    </Layout>
  );
}
