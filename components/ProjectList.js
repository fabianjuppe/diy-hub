import useSWR from "swr";
import ProjectCard from "./ProjectCard";
import styled from "styled-components";

export default function ProjectList() {
  const { data, isLoading, error } = useSWR("/api/projects");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Sorry we could not retrieve the latest projects at the moment. Please
        try again later.
      </p>
    );
  }

  return (
    <Grid>
      {data?.map((project) => (
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

const P = styled.p`
  text-align: center;
`;
