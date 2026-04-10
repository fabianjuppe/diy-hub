import BackButton from "./BackButton";
import MaterialsList from "./MaterialsList";
import ProjectInfo from "./ProjectInfo";
import StepsList from "./StepsList";

export default function ProjectDetails({ project }) {
  return (
    <>
      <ProjectInfo
        title={project?.title}
        imageURL={project?.imageURL}
        category={project?.category}
        duration={project?.duration}
        complexity={project?.complexity}
        description={project?.description}
      />
      <MaterialsList materials={project?.materials} />
      <StepsList steps={project?.steps} />
      <BackButton />
    </>
  );
}
