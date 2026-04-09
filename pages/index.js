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

  async function handleAddProject(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      complexity: formData.get("complexity"),
      duration: formData.get("duration"),

      materials: formData
        .get("materials")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      steps: formData
        .get("steps")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((desc) => ({
          id: crypto.randomUUID(),
          description: desc,
        })),
    };

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
    event.target.reset();
    event.target.elements.title.focus();
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
