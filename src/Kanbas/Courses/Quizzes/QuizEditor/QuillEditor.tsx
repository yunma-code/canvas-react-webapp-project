import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaExpandAlt } from "react-icons/fa";

const QuillEditor = ({
  initialValue = "",
  onContentChange = () => { },
}: {
  initialValue?: string;
  onContentChange?: (content: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (content: string) => {
    setValue(content); // Update local state
    onContentChange(content); // Notify parent of changes
  };

  const countWords = (content: string) => {
    const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const words = text.trim().split(/\s+/); // Split by whitespace
    return words.filter((word) => word.length > 0).length; // Filter out empty strings
  };

  useEffect(() => {
    setValue(initialValue); // 更新 value 为新的 initialValue
  }, [initialValue]); // 监听 initialValue 的变化

  return (
    <div>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ header: [1, 2, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ color: [] }, { background: [] }],
              ["link", "image"],
            ],
          }}
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
          }}
        />

      </div>
      {/* Word Count */}
      <div className="d-flex justify-content-end align-items-center py-2 text-danger">
        {countWords(value)} words |
        <button className="btn btn-sm ms-2 btn-outline-danger">
          <FaExpandAlt />
        </button>
      </div>

    </div>
  );
};

export default QuillEditor;
