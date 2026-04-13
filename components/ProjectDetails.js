import { useState } from "react";
import BackButton from "./BackButton";
import MaterialsList from "./MaterialsList";
import ProjectInfo from "./ProjectInfo";
import StepsList from "./StepsList";
import { useRouter } from "next/router";
import styled from "styled-components";
import NotesSection from "./NotesSection";
import useSWR from "swr";

export default function ProjectDetails({ project, onEdit, mutate }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    setError(null);
    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      router.push("/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleAddNote(note) {
    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "addNote", note }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      await mutate();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditNote(noteId, content) {
    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "editNote",
          noteId,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      await mutate();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteNote(noteId) {
    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "deleteNote",
          noteId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      await mutate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <ProjectInfo
        title={project?.title}
        imageUrl={project?.imageUrl}
        category={project?.category}
        duration={project?.duration}
        complexity={project?.complexity}
        description={project?.description}
      />
      <Section>
        <h3>Materials</h3>
        <MaterialsList materials={project?.materials} />
      </Section>
      <Section>
        <h3>Steps</h3>
        <StepsList steps={project?.steps} />
      </Section>
      <NotesSection
        notes={project?.notes}
        onAdd={handleAddNote}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
      />
      <BackWrapper>
        <BackButton />
      </BackWrapper>
      <ActionGroup>
        <EditButton onClick={onEdit}>Edit</EditButton>
        <DeleteButton
          onClick={() => setShowConfirm(true)}
          disabled={showConfirm}
        >
          Delete Project
        </DeleteButton>
      </ActionGroup>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showConfirm && (
        <Overlay>
          <ConfirmBox>
            <ConfirmText>
              Are you sure you want to delete this project?
            </ConfirmText>

            <ButtonRow>
              <CancelButton onClick={() => setShowConfirm(false)}>
                Cancel
              </CancelButton>

              <ConfirmDeleteButton onClick={handleDelete}>
                Delete
              </ConfirmDeleteButton>
            </ButtonRow>
          </ConfirmBox>
        </Overlay>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-top: 30px;
  h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  ul {
    padding-left: 20px;
    line-height: 1.6;
  }
`;

const BackWrapper = styled.div`
  margin-top: 30px;
`;

const DeleteButton = styled.button`
  margin-top: 20px;
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.15s ease-out,
    transform 0.15s ease-out;
  &:hover {
    background: #e03131;
    transform: translateY(-1px);
  }
`;

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const ConfirmBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 320px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const ConfirmText = styled.p`
  margin-bottom: 20px;
  font-size: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const CancelButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const ConfirmDeleteButton = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #ff4d4f;
  color: white;
  cursor: pointer;
  &:hover {
    background: #e03131;
  }
`;
const ActionGroup = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

const EditButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #0070f3;
  color: white;
  cursor: pointer;
  &:hover {
    background: #0059c1;
  }
`;
