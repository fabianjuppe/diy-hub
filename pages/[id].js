import { useRouter } from "next/router";
import useSWR from "swr";
import ProjectDetails from "@/components/ProjectDetails";

export default function ProjectsDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/projects/${id}`);

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return <ProjectDetails project={data} />;
}
