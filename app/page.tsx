import HomeContent from "./home-content";
import { getPortfolioProjects } from "@/lib/portfolio-projects";

export default async function HomePage() {
  const portfolioProjects = await getPortfolioProjects();
  const featured = portfolioProjects.find((project) => project.is_featured) ?? null;
  const projects = portfolioProjects.filter(
    (project) => project.show_on_home && project.id !== featured?.id,
  );

  return <HomeContent featured={featured} projects={projects} />;
}