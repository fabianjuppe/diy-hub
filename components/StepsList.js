export default function StepsList({ steps }) {
  return (
    <ul>
      {steps?.map((step) => (
        <li key={step.id}>{step.description}</li>
      ))}
    </ul>
  );
}
