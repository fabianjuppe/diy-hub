export default function StepsList({ steps }) {
  if (!steps) return null;
  return (
    <>
      <ul>
        {steps.map((step) => (
          <li key={step.id}>{step.description}</li>
        ))}
      </ul>
    </>
  );
}
