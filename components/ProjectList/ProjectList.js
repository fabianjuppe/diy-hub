import useSWR from "swr";
import ProjectCard from "../ProjectCard/ProjectCard";

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
    <ul>
      {data?.map((project) => (
        <li key={project._id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
