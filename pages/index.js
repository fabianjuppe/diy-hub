import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import useSWR from "swr";

export default function HomePage() {
  const { data, isLoading, error, mutate } = useSWR("/api/projects");

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleAddProject(projectData) {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      console.error(response.status);
      alert("Error!");
      return;
    }

    mutate();
    alert("Project successfully created.");
  }

  return (
    <main>
      <header>
        <h1>DIY HUB</h1>
      </header>

      <section>
        <ProjectForm onSubmit={handleAddProject} />
        <ProjectList />
      </section>
    </main>
  );
}
