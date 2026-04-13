import { useState } from "react";
import styled from "styled-components";

export default function NotesList({ notes, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const noteData = Object.fromEntries(formData);

    onEdit(editingId, noteData.content);
    setEditingId(null);
    event.target.reset();
  }

  return (
    <StyledList>
      {notes?.map((note) => {
        const date = new Date(note.createdAt);
        const formattedDate = date.toLocaleDateString("de-DE");
        const formattedTime = date.toLocaleTimeString("de-DE");

        const isEditing = editingId === note.id;

        return (
          <StyledItem key={note.id}>
            {isEditing ? (
              <StyledForm onSubmit={handleSubmit}>
                <StyledLabel htmlFor="content">Note: </StyledLabel>
                <StyledInput
                  type="text"
                  id="content"
                  name="content"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  required
                />
                <StyledButton type="submit">Save</StyledButton>
                <StyledButton onClick={() => setEditingId(null)}>
                  Cancel
                </StyledButton>
              </StyledForm>
            ) : (
              <>
                <StyledDate>
                  {formattedDate}, {formattedTime}
                </StyledDate>
                <p>{note.content}</p>

                <StyledButton
                  onClick={() => {
                    setEditingId(note.id);
                    setEditValue(note.content);
                  }}
                >
                  Edit
                </StyledButton>
                <StyledButton onClick={() => onDelete(note.id)}>
                  Delete
                </StyledButton>
              </>
            )}
          </StyledItem>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledDate = styled.p`
  font-size: 0.75rem;
  color: #888;
  text-align: right;
`;

const StyledItem = styled.li`
  list-style: none;
  margin: 10px 0;
  padding: 15px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
`;

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
