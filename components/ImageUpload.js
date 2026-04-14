import { useState } from "react";

export default function ImageUpload({ onUpload, existingImages = [] }) {
  const [previews, setPreviews] = useState(existingImages);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const MAX_FILES = 5;
  const MAX_SIZE_MB = 2;
  const ALLOWED_TYPES = ["image/jpeg", "image/png"];

  //UPLOAD / ERROR
  async function handleFileChange(event) {
    const files = Array.from(event.target.files);

    setError(null);

    const totalImages = previews.length + files.length;

    if (totalImages > MAX_FILES) {
      setError("Du kannst maximal 5 Bilder insgesamt haben.");
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

    setLoading(true);

    try {
      const uploadedUrls = [];
      const localPreviews = [];

      for (const file of files) {
        // Preview lokal
        localPreviews.push(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);

        formData.append("upload_preset", "unsigned_upload");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqlls4v16/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "Upload failed");
        }

        uploadedUrls.push(data.secure_url);
      }

      const updatedPreviews = [...previews, ...localPreviews];
      setPreviews(updatedPreviews);

      // SEND TO PARENT FORM
      onUpload((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  //DELETE
  function handleDelete(indexToDelete) {
    const updated = previews.filter((_, i) => i !== indexToDelete);

    setPreviews(updated);
    onUpload(updated);
  }

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      {loading && <p>Uploading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* PREVIEWS */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {previews.map((src, index) => (
          <div
            key={index}
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          >
            <img
              src={src}
              alt={`preview-${index}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                transition: "opacity 0.2s",
                opacity: activeIndex === index ? 0.6 : 1,
              }}
            />
            {/* DELETE BUTTON */}
            {activeIndex === index && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Delete?
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
