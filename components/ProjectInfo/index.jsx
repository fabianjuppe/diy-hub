import Image from "next/image";

export default function ProjectInfo({
  title,
  imageUrl,
  duration,
  complexity,
  description,
}) {
  return (
    <>
      <h2>{title}</h2>
      {/* TODO IMAGE SIZE ANPASSEN  */}
      <Image src={imageUrl} alt={title} width={200} height={200}></Image>
      <p>Duration: {duration}</p>
      <p>Complexity: {complexity}</p>
      <p>{description}</p>
    </>
  );
}
