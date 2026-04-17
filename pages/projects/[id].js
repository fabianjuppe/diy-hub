import { useRouter } from "next/router";
import useSWR from "swr";
import ProjectDetails from "@/components/ProjectDetails";
import { useState } from "react";
import ProjectForm from "@/components/ProjectForm";
import styled from "styled-components";

export default function ProjectsDetailsPage({ bookmarks, toggleBookmark }) {
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
    <Wrapper>
      {toastMessage.text && (
        <Toast type={toastMessage.type}>{toastMessage.text}</Toast>
      )}

      {!showEditForm && (
        <>
          <ProjectDetails
            project={data}
            onEdit={() => setShowEditForm(true)}
            mutate={mutate}
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
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
    </Wrapper>
  );
}

const Wrapper = styled.main`
  padding-bottom: 40px;
`;

const CancelButton = styled.button`
  margin: 20px auto 0;
  display: block;
  padding: 12px 16px;
  border-radius: 12px;
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
  z-index: 1000;
  padding: 12px 18px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  background: ${({ $type }) => ($type === "error" ? "#ff4d4f" : "#16a34a")};
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
`;
