import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <article>
      <Image
        src={project.imageUrl || "/placeholder.jpg"}
        alt={`Image of ${project.title}`}
        width={300}
        height={200}
      />

      <h2>{project.title}</h2>

      <p>
        <strong>Complexity:</strong> {project.complexity}
      </p>

      <p>
        <strong>Duration:</strong> {project.duration}
      </p>
    </article>
  );
}
