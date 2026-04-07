import useSWR from "swr";
import ProjectCard from "../ProjectCard/ProjectCard";

export default function ProjectList() {
  //Fetch project data from API using SWR
  const { data, isLoading, error } = useSWR("/api/projects");

  //Loading state
  if (isLoading) {
    return <p>Loading...</p>;
  }

  //Error state
  if (error) {
    return (
      <p>
        Sorry we could not retrieve the latest projects at the moment. Please
        try again later.
      </p>
    );
  }

  //Render project list
  return (
    <ul>
      {data?.map((project) => (
        <li key={project._id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
