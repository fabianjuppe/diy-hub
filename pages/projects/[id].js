import { useRouter } from "next/router";
import useSWR from "swr";
import ProjectDetails from "@/components/ProjectDetails";
import { useState } from "react";
import ProjectForm from "@/components/ProjectForm";

export default function ProjectsDetailsPage() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [toastMessage, setToastMessage] = useState({ type: "", text: "" });
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error, mutate } = useSWR(`/api/projects/${id}`);

  //EDIT
  async function handleEditProject(projectData) {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      await mutate();
      setShowEditForm(false);

      setToastMessage({
        type: "success",
        text: "Project updated successfully!",
      });
    } catch (error) {
      console.error(error);

      setToastMessage({
        type: "error",
        text: "Something went wrong while updating the project.",
      });
    }

    setTimeout(() => {
      setToastMessage({ type: "", text: "" });
    }, 3000);
  }
  return (
    <>
      {!showEditForm && (
        <>
          {toastMessage.text && <p>{toastMessage.text}</p>}
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
