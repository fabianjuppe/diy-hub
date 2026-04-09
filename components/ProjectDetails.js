import { useState } from "react";
import BackButton from "./BackButton";
import MaterialsList from "./MaterialsList";
import ProjectInfo from "./ProjectInfo";
import StepsList from "./StepsList";
import { useRouter } from "next/router";

export default function ProjectDetails({ project }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  async function handleDelete() {
    const response = await fetch(`/api/projects/${project._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.error("Delete failed:", response.status);
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

      <button onClick={() => setShowConfirm(true)}>Delete Project</button>

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
