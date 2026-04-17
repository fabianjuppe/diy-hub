import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export default function ImageUpload({ onFilesChange, existingImages = [] }) {
  const [previews, setPreviews] = useState(
    existingImages.map((url) => ({ src: url, isExisting: true }))
  );
  const [error, setError] = useState(null);

  const MAX_FILES = 5;
  const MAX_SIZE_MB = 2;
  const ALLOWED_TYPES = ["image/jpeg", "image/png"];

  function handleFileChange(event) {
    const files = Array.from(event.target.files);
    setError(null);

    const currentCount = previews.length;
    if (currentCount + files.length > MAX_FILES) {
      setError(`Maximal ${MAX_FILES} Bilder erlaubt.`);
      return;
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Nur JPG und PNG sind erlaubt.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError("Jedes Bild darf maximal 2MB groß sein.");
        return;
      }
    }

    const newPreviews = files.map((file) => ({
      src: URL.createObjectURL(file),
      file,
      isExisting: false,
    }));

    const updated = [...previews, ...newPreviews];
    setPreviews(updated);
    onFilesChange(updated);
  }

  function handleDelete(index) {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onFilesChange(updated);
  }

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      {error && <StyledP>{error}</StyledP>}

      <Wrapper>
        {previews.map((item, index) => (
          <StyledDiv key={index}>
            <StyledImage
              src={item.src}
              width={100}
              height={100}
              alt="Uploaded Image"
            />
            <StyledButton type="button" onClick={() => handleDelete(index)}>
              ✕
            </StyledButton>
          </StyledDiv>
        ))}
      </Wrapper>
    </div>
  );
}

const StyledP = styled.p`
  color: red;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const StyledDiv = styled.div`
  position: relative;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 6px;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
  font-size: 12px;
`;
