import BackButton from "../BackButton";
import MaterialsList from "../MaterialsList";
import ProjectInfo from "../ProjectInfo";
import StepsList from "../StepsList";

export default function ProjectDetails({ project }) {
  return (
    <>
      <ProjectInfo
        title={project.title}
        imageURL={project.imageURL}
        duration={project.duration}
        complexity={project.complexity}
        description={project.description}
      ></ProjectInfo>
      <MaterialsList materials={project.materials}></MaterialsList>
      <StepsList steps={project.steps}></StepsList>
      <BackButton></BackButton>
    </>
  );
 
}
