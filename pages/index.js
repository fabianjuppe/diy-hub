import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import useSWR from "swr";
import styled from "styled-components";

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
    <Main>
      <Header>
        <Heading>DIY HUB</Heading>
      </Header>

      <section>
        <ProjectForm onSubmit={handleAddProject} />
        <ProjectList />
      </section>
    </Main>
  );
}
const Main = styled.main`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;
`;
