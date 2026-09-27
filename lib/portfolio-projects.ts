export type PortfolioProject = {
  id: string;
  title: string;
  category_label: string;
  summary: string;
  short_summary: string | null;
  note: string | null;
  live_url: string | null;
  image_url: string;
  badges: string[];
  sort_order: number;
  is_featured: boolean;
  show_on_home: boolean;
};

type ProjectRecord = Omit<PortfolioProject, "sort_order" | "is_featured" | "show_on_home"> & {
  status: string;
};

type ProjectSiteRecord = {
  project_id: string;
  site: string;
  sort_order: number;
  is_featured: boolean;
  show_on_home: boolean;
};

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Supabase URL and anon key must be configured");
  }

  const headers = {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
  };
  const fetchOptions = { headers, next: { revalidate: 300 } };
  const baseUrl = `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;
  const projectsQuery = new URLSearchParams({
    select: "id,title,category_label,summary,short_summary,note,live_url,image_url,badges,status",
    status: "eq.published",
  });
  const sitesQuery = new URLSearchParams({
    select: "project_id,site,sort_order,is_featured,show_on_home",
    site: "eq.portfolio",
    order: "sort_order.asc",
  });

  const [projectsResponse, sitesResponse] = await Promise.all([
    fetch(`${baseUrl}/projects?${projectsQuery}`, fetchOptions),
    fetch(`${baseUrl}/project_sites?${sitesQuery}`, fetchOptions),
  ]);

  if (!projectsResponse.ok || !sitesResponse.ok) {
    throw new Error(
      `Supabase project request failed (${projectsResponse.status}, ${sitesResponse.status})`,
    );
  }

  const [projects, sites] = (await Promise.all([
    projectsResponse.json(),
    sitesResponse.json(),
  ])) as [ProjectRecord[], ProjectSiteRecord[]];
  const projectsById = new Map(projects.map((project) => [project.id, project]));

  return sites.flatMap((site) => {
    const project = projectsById.get(site.project_id);
    if (!project) return [];

    return [{
      ...project,
      badges: project.badges ?? [],
      sort_order: site.sort_order,
      is_featured: site.is_featured,
      show_on_home: site.show_on_home,
    }];
  });
}