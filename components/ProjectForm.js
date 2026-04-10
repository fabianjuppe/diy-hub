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

export default function ProjectForm({ onSubmit, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const projectData = Object.fromEntries(formData);

    projectData.materials = projectData.materials
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    projectData.steps = projectData.steps
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((desc) => ({
        id: crypto.randomUUID(),
        description: desc,
      }));

    onSubmit(projectData);
    event.target.reset();
    event.target.elements.title.focus();
  }

  return (
    <StyledForm onSubmit={handleSubmit} aria-labelledby="form-heading">
      <h2 id="form-heading">
        {defaultData ? "Edit Project" : "Add a new project"}
      </h2>

      <label htmlFor="title">Title: </label>
      <input
        type="text"
        id="title"
        name="title"
        required
        minLength={3}
        defaultValue={defaultData?.title}
      />

      <label htmlFor="description">Description: </label>
      <input
        type="text"
        id="description"
        name="description"
        defaultValue={defaultData?.description}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        defaultValue={defaultData?.category}
        required
      >
        <option value="" selected>
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
        defaultValue={defaultData?.complexity}
        required
      >
        <option value="" selected>
          Please select a complexity
        </option>
        {complexityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <label htmlFor="duration">Duration: </label>
      <input
        type="text"
        id="duration"
        name="duration"
        defaultValue={defaultData?.duration}
        required
      />

      <label htmlFor="materials">Materials: </label>
      <input
        type="text"
        id="materials"
        name="materials"
        defaultValue={defaultData?.materials}
      />

      <label htmlFor="steps">Steps: </label>
      <input
        type="text"
        id="steps"
        name="steps"
        defaultValue={defaultData?.steps
          ?.map((step) => step.description)
          .join(", ")}
      />

      <button type="submit">Submit</button>
    </StyledForm>
  );
}
