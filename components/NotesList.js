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
                <ButtonRow>
                  <SaveButton type="submit">Save</SaveButton>
                  <CancelButton onClick={() => setEditingId(null)}>
                    Cancel
                  </CancelButton>
                </ButtonRow>
              </StyledForm>
            ) : (
              <>
                <StyledDate>
                  {formattedDate}, {formattedTime}
                </StyledDate>
                <p>{note.content}</p>
                <ButtonRow>
                  <EditButton
                    onClick={() => {
                      setEditingId(note.id);
                      setEditValue(note.content);
                    }}
                  >
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => onDelete(note.id)}>
                    Delete
                  </DeleteButton>
                </ButtonRow>
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
  display: grid;
  gap: 16px;
`;

const StyledDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #888;
`;

const StyledItem = styled.li`
  display: grid;
  gap: 12px;
  padding: 18px;
  border-radius: 18px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const StyledForm = styled.form`
  display: grid;
  gap: 12px;
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

const BaseButton = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const SaveButton = styled(BaseButton)`
  background: #111;
  color: white;
  &:hover {
    background: #2d2d2d;
  }
`;

const CancelButton = styled(BaseButton)`
  background: #f1f3f5;
  &:hover {
    background: #e9ecef;
  }
`;

const EditButton = styled(BaseButton)`
  background: #0070f3;
  color: white;
  &:hover {
    background: #0059c1;
  }
`;

const DeleteButton = styled(BaseButton)`
  background: #ff4d4f;
  color: white;
  &:hover {
    background: #e03131;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
