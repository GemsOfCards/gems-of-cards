"use client";

import { useState } from "react";

export default function MobileImagePicker() {
  const [chosen, setChosen] = useState("No image selected");

  function updateName(files: FileList | null) {
    const file = files?.[0];
    if (file) setChosen(file.name);
  }

  return (
    <div className="mobile-upload">
      <h3>ADD CARD IMAGE</h3>
      <p>{chosen}</p>

      <div className="upload-actions">
        <label>
          TAKE PHOTO
          <input
            name="image"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => updateName(event.target.files)}
          />
        </label>

        <label>
          CHOOSE FROM GALLERY
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={(event) => updateName(event.target.files)}
          />
        </label>
      </div>
    </div>
  );
}
