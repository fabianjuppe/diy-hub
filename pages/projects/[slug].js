import { useRouter } from "next/router";
import useSWR from "swr";
import ProjectDetails from "@/components/ProjectDetails";

export default function ProjectsDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { data: projects, isLoading, error } = useSWR("/api/projects");

  if (isLoading || !projects) return <div>Loading projects…</div>;
  if (error) return <div>Problems loading data</div>;
  if (!slug) return <div>Loading slug…</div>;

  const project = projects.find((p) => p.id === slug);
  if (!project) return <div>Projekt nicht gefunden</div>;

  return <ProjectDetails project={project} />;
}
