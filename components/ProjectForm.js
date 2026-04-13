import { useState } from "react";
import styled from "styled-components";

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
      <Title id="form-heading">
        {defaultData ? "Edit Project" : "Add a new project"}
      </Title>

      <StyledLabel htmlFor="title">Title: </StyledLabel>
      <StyledInput
        type="text"
        id="title"
        name="title"
        required
        minLength={3}
        defaultValue={defaultData?.title}
      />

      <StyledLabel htmlFor="description">Description: </StyledLabel>
      <StyledInput
        type="text"
        id="description"
        name="description"
        defaultValue={defaultData?.description}
      />

      <StyledLabel htmlFor="category">Category:</StyledLabel>
      <StyledSelect
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
      </StyledSelect>

      <StyledLabel htmlFor="complexity">Complexity:</StyledLabel>
      <StyledSelect
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
      </StyledSelect>

      <StyledLabel htmlFor="duration">Duration: </StyledLabel>
      <StyledInput
        type="text"
        id="duration"
        name="duration"
        defaultValue={defaultData?.duration}
        required
      />

      <StyledLabel htmlFor="materials">Materials: </StyledLabel>
      <StyledInput
        type="text"
        id="materials"
        name="materials"
        defaultValue={defaultData?.materials}
      />

      <StyledLabel htmlFor="steps">Steps: </StyledLabel>
      <StyledInput
        type="text"
        id="steps"
        name="steps"
        defaultValue={defaultData?.steps
          ?.map((step) => step.description)
          .join(", ")}
      />

      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  &:focus {
    outline: none;
    border-color: #333;
  }
`;

const StyledButton = styled.button`
  margin-top: 15px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #333;
  }
`;