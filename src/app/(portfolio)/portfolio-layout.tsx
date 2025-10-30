import AnimatedBackground from "@/components/ui/animated-background";
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";
import PortfolioFooter from "@/components/portfolio-footer";

export function PortfolioPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-transparent dark">
      <AnimatedBackground />
      <TubelightNavbar />
      <div className="flex-1">{children}</div>
      <PortfolioFooter />
    </div>
  );
}
