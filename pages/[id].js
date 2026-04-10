import { useRouter } from "next/router";
import useSWR from "swr";
import ProjectDetails from "@/components/ProjectDetails";
import { useState } from "react";
import styled from "styled-components";
import ProjectForm from "@/components/ProjectForm";

export default function ProjectsDetailsPage() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error, mutate } = useSWR(`/api/projects/${id}`);

  //EDIT
  async function handleEditProject(projectData) {
    const response = await fetch(`api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    await mutate();
    setShowEditForm(false);

    setSuccessMessage("Project updated successfully!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;
  if (!data) return null;

  return (
    <>
      {!showEditForm && (
        <>
          {successMessage && <p>{successMessage}</p>}
          <ProjectDetails project={data} />
          <button onClick={() => setShowEditForm(true)}>Edit</button>
        </>
      )}

      {showEditForm && (
        <ProjectForm onSubmit={handleEditProject} defaultData={data} />
      )}
    </>
  );
}
