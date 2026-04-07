import useSWR from "swr";

export default function HomePage() {
  const { data, isLoading } = useSWR("/api/projects");

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
