import ProjectList from "@/components/ProjectList/ProjectList";
import useSWR from "swr";

export default function HomePage() {
  const { data, isLoading, error } = useSWR("/api/projects");

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <main>
      <header>
        <h1>DIY HUB</h1>
      </header>

      <section>
        <ProjectList />
      </section>
    </main>
  );
}
