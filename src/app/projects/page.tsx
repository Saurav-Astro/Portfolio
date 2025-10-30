import ProjectsSection from "@/components/portfolio-projects";
import { PortfolioPageLayout } from "../(portfolio)/portfolio-layout";
import { BlockGame } from "@/components/ui/block-game";

export default function ProjectsPage() {
  return (
    <PortfolioPageLayout>
      <main className="flex-1">
        <ProjectsSection />
        <BlockGame />
      </main>
    </PortfolioPageLayout>
  );
}
