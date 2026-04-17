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
    <Wrapper>
      <StyledForm onSubmit={handleSubmit} aria-labelledby="form-heading">
        <Title id="form-heading">Notes</Title>

        <StyledLabel htmlFor="content">Note: </StyledLabel>
        <StyledInput type="text" id="content" name="content" required />

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>

      <NotesList notes={notes} onEdit={onEdit} onDelete={onDelete} />
    </Wrapper>
  );
}
const Wrapper = styled.section`
  margin-top: 32px;
`;

const StyledForm = styled.form`
  display: grid;
  gap: 14px;
  margin: 0 0 24px;
  padding: 24px;
  border-radius: 18px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin: 0;
`;

const StyledLabel = styled.label`
  font-weight: 600;
`;

const StyledInput = styled.input`
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const StyledButton = styled.button`
  padding: 12px 14px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: white;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #2d2d2d;
  }
`;
