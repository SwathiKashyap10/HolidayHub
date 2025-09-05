import React from "react";

const ImageUpload = ({ preview, onFileChange }) => {
  return (
    <div>
      {/* Upload Box */}
      <label className="flex justify-center items-center cursor-pointer w-48 h-28 border-2 border-dashed rounded-lg bg-gray-100 overflow-hidden">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Upload</span>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
