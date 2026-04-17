import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import useSWR from "swr";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";

export default function HomePage({ bookmarks, toggleBookmark }) {
  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState(() => {
    if (typeof window === "undefined") return "";

    const saved = localStorage.getItem("search");
    return saved ? saved : "";
  });

  const [filters, setFilters] = useState(() => {
    if (typeof window === "undefined") {
      return {
        category: "",
        complexity: "",
        duration: "",
        bookmarked: false,
      };
    }

    const saved = localStorage.getItem("filters");
    return saved
      ? JSON.parse(saved)
      : {
          category: "",
          complexity: "",
          duration: "",
          bookmarked: false,
        };
  });

  const { data, isLoading, error, mutate } = useSWR("/api/projects");

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

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
      !search ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase()) ||
      project.materials?.some((material) =>
        material.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      !filters.category || project.category === filters.category;

    const matchesComplexity =
      !filters.complexity || project.complexity === filters.complexity;

    const matchesDuration =
      !filters.duration || project.duration === filters.duration;

    const matchesBookmarked =
      !filters.bookmarked || bookmarks.includes(project._id);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesComplexity &&
      matchesDuration &&
      matchesBookmarked
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
    await mutate();
    setShowForm(false);
  }

  return (
    <Main>
      <Header>
        <HeaderTop>
          <Heading>Hands On</Heading>
          <AddButton type="button" onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? "Close Form" : "+ Add Project"}
          </AddButton>
        </HeaderTop>

        <Subheading>
          Organise and manage your DIY projects in one place.
        </Subheading>
      </Header>

      <section>
        {showForm && <ProjectForm onSubmit={handleAddProject} />}
        <SearchBar search={search} setSearch={setSearch} />
        <Filter
          filters={filters}
          setFilters={setFilters}
          setSearch={setSearch}
        />
        <ProjectList
          projects={filteredProjects}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      </section>
    </Main>
  );
}
const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px 48px;
`;

const Header = styled.header`
  margin-bottom: 28px;
`;
const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
const Heading = styled.h1`
  margin: 0;
  font-size: 3rem;
  line-height: 1;
`;
const AddButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  background: #111;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease;
  &:hover {
    background: #2d2d2d;
    transform: translateY(-1px);
  }
`;
const Subheading = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;
`;
