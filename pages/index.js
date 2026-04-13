import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import useSWR from "swr";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Filter from "@/components/Filter";

export default function HomePage() {
  const [filters, setFilters] = useState(() => {
    if (typeof window === "undefined") {
      return {
        category: "",
        complexity: "",
        duration: "",
        search: "",
      };
    }

    const saved = localStorage.getItem("filters");
    return saved
      ? JSON.parse(saved)
      : {
          category: "",
          complexity: "",
          duration: "",
          search: "",
        };
  });

  const { data, isLoading, error, mutate } = useSWR("/api/projects");

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  const filteredProjects = data.filter((project) => {
    const matchesSearch =
      !filters.search ||
      project.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      !filters.category || project.category === filters.category;

    const matchesComplexity =
      !filters.complexity || project.complexity === filters.complexity;

    const matchesDuration =
      !filters.duration || project.duration === filters.duration;

    return (
      matchesSearch && matchesCategory && matchesComplexity && matchesDuration
    );
  });

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
        <Filter filters={filters} setFilters={setFilters} />
        <ProjectList projects={filteredProjects} />
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
