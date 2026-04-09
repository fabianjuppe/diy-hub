import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const categoryOptions = [
  "Woodworking",
  "Electronics",
  "Crafts",
  "Home Improvement",
  "Garden",
  "Upcycling",
];

const complexityOptions = ["Beginner", "Intermediate", "Advanced"];

export default function ProjectForm({ onSubmit }) {
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");

  return (
    <StyledForm onSubmit={onSubmit} aria-labelledby="form-heading">
      <h2 id="form-heading">Add a new project</h2>

      <label htmlFor="title">Title: </label>
      <input type="text" id="title" name="title" required minLength={3} />

      <label htmlFor="description">Description: </label>
      <input type="text" id="description" name="description" />

      <label htmlFor="categories">Category:</label>
      <select
        id="category"
        name="category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        required
      >
        <option value="" disabled>
          Please select a category
        </option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor="complexity">Complexity:</label>
      <select
        id="complexity"
        name="complexity"
        onChange={(e) => setComplexity(e.target.value)}
        value={complexity}
        required
      >
        <option value="" disabled>
          Please select a complexity
        </option>
        {complexityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor="duration">Duration: </label>
      <input type="text" id="duration" name="duration" required />

      <label htmlFor="materials">Materials: </label>
      <input type="text" id="materials" name="materials" />

      <label htmlFor="steps">Steps: </label>
      <input type="text" id="steps" name="steps" />

      <button type="submit">Submit</button>
    </StyledForm>
  );
}
