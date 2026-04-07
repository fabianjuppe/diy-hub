import useSWR from "swr";

export default function HomePage() {
  const { data, isLoading, error } = useSWR("/api/projects");

  if (error) {
    return <h1>ERROR</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <div>
      <h1>DIY HUB</h1>
      <ul>
        {data.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}
