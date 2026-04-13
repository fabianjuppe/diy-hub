import styled from "styled-components";
import NotesList from "./NotesList";

export default function NotesSection({ notes, onAdd, onEdit, onDelete }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const noteData = Object.fromEntries(formData);

    const note = {
      id: crypto.randomUUID(),
      content: noteData.content,
    };

    onAdd(note);
    event.target.reset();
    event.target.elements.content.focus();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit} aria-labelledby="form-heading">
        <Title id="form-heading">Notes</Title>

        <StyledLabel htmlFor="content">Note: </StyledLabel>
        <StyledInput type="text" id="content" name="content" required />

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>

      <NotesList notes={notes} onEdit={onEdit} onDelete={onDelete} />
    </>
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
