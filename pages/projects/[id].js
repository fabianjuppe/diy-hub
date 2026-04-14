import { useRouter } from "next/router";
import useSWR from "swr";
import ProjectDetails from "@/components/ProjectDetails";
import { useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import styled from "styled-components";

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
      {toastMessage.text && (
        <Toast type={toastMessage.type}>{toastMessage.text}</Toast>
      )}

      {!showEditForm && (
        <>
          <ProjectDetails
            project={data}
            onEdit={() => setShowEditForm(true)}
            mutate={mutate}
          />
        </>
      )}

      {showEditForm && (
        <>
          <ProjectForm onSubmit={handleEditProject} defaultData={data} />

          <CancelButton onClick={() => setShowEditForm(false)}>
            Cancel
          </CancelButton>
        </>
      )}
    </>
  );
}

const ActionRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EditButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #0070f3;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  &:hover {
    background: #0059c1;
    transform: translateY(-1px);
  }
`;

const CancelButton = styled.button`
  margin: 20px auto;
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const Toast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 18px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
`;
