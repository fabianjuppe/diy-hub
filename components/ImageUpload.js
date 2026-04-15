import { useState } from "react";

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flexWrap: "wrap",
        }}
      >
        {previews.map((item, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={item.src}
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
            <button
              type="button"
              onClick={() => handleDelete(index)}
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "rgba(0,0,0,0.6)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 22,
                height: 22,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
