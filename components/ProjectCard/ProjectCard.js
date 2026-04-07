import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <article>
      {/* Project image */}
      <Image
        src={project.imageUrl || "/placeholder.jpg"}
        alt={`Image of ${project.title}`}
        width={300}
        height={200}
      />

      {/* Project title */}
      <h3>{project.title}</h3>

      {/* Project complexity */}
      <p>
        <strong>Complexity:</strong> {project.complexity}
      </p>

      {/* Project duration */}
      <p>
        <strong>Duration:</strong> {project.duration}
      </p>
    </article>
  );
}
