import { useState } from "react";
import BackButton from "./BackButton";
import MaterialsList from "./MaterialsList";
import ProjectInfo from "./ProjectInfo";
import StepsList from "./StepsList";
import { useRouter } from "next/router";

export default function ProjectDetails({ project }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
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

  return (
    <>
      <ProjectInfo
        title={project.title}
        imageURL={project.imageURL}
        duration={project.duration}
        complexity={project.complexity}
        description={project.description}
      />
      <MaterialsList materials={project.materials} />
      <StepsList steps={project.steps} />
      <BackButton />

      <button onClick={() => setShowConfirm(true)} disabled={showConfirm}>
        Delete Project
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showConfirm && (
        <div>
          <p>Are you sure you want to delete this project?</p>

          <button onClick={() => setShowConfirm(false)}>Cancel</button>

          <button onClick={handleDelete}>Delete Project</button>
        </div>
      )}
    </>
  );
}
