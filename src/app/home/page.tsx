import HomeSection from "@/components/portfolio-home";
import { PortfolioPageLayout } from "../(portfolio)/portfolio-layout";

export default function HomePage() {
  return (
    <PortfolioPageLayout>
      <main className="flex-1">
        <HomeSection />
      </main>
    </PortfolioPageLayout>
  );
}
