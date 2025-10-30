import ContactSection from "@/components/portfolio-contact";
import { PortfolioPageLayout } from "../(portfolio)/portfolio-layout";

export default function ContactPage() {
  return (
    <PortfolioPageLayout>
      <main className="flex-1">
        <ContactSection />
      </main>
    </PortfolioPageLayout>
  );
}
