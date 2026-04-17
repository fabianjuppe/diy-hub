import { useState } from "react";
import styled from "styled-components";
import ImageUpload from "./ImageUpload";

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
  const [imageFiles, setImageFiles] = useState(
    Array.isArray(defaultData?.imageUrl)
      ? defaultData.imageUrl.map((url) => ({ src: url, isExisting: true }))
      : []
  );

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // BESTEHENDE URL ÜBERNEHMEN
    const existingUrls = imageFiles
      .filter((imageFile) => imageFile.isExisting)
      .map((imageFile) => imageFile.src);

    // NEUE BEI CLOUDINARY HOCHLADEN
    const newUrls = [];
    for (const item of imageFiles.filter(
      (imageFile) => !imageFile.isExisting
    )) {
      const data = new FormData();
      data.append("image", item.file);

      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();

      if (!res.ok) {
        alert("Upload fehlgeschlagen: " + result.error);
        return;
      }
      newUrls.push(result.url);
    }

    const allImageUrls = [...existingUrls, ...newUrls];

    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      complexity: formData.get("complexity"),
      duration: formData.get("duration"),
      imageUrl: allImageUrls,
      materials: formData
        .get("materials")
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      steps: formData
        .get("steps")
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean)
        .map((desc) => ({ id: crypto.randomUUID(), description: desc })),
    };

    onSubmit(projectData);

    //RESET FOKUS
    event.target.reset();
    setImageFiles([]);
    event.target.elements.title?.focus();
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

      <ImageUpload
        onFilesChange={setImageFiles}
        existingImages={imageFiles
          .filter((imageFile) => imageFile.isExisting)
          .map((imageFile) => imageFile.src)}
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
        <option value="">Please select a category</option>
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
        <option value="">Please select a complexity</option>
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
        defaultValue={
          Array.isArray(defaultData?.materials)
            ? defaultData.materials.join(", ")
            : defaultData?.materials
        }
      />

      <StyledLabel htmlFor="steps">Steps: </StyledLabel>
      <StyledInput
        type="text"
        id="steps"
        name="steps"
        defaultValue={
          Array.isArray(defaultData?.steps)
            ? defaultData.steps.map((step) => step.description).join(", ")
            : ""
        }
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
