export default function MaterialsList({ materials }) {
  return (
    <ul>
      {materials?.map((material) => (
        <li key={material}> {material}</li>
      ))}
    </ul>
  );
}
