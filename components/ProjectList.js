import ProjectCard from "./ProjectCard";
import styled from "styled-components";

export default function ProjectList({ projects }) {
  if (!projects || projects.length === 0) {
    return <Message>No projects found.</Message>;
  }

  return (
    <Grid>
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </Grid>
  );
}
const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const Message = styled.p`
  text-align: center;
`;
