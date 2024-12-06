import React, { useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../../Modules/GreenCheckmark";


export default function QuizControlButtons({ onEdit, onDelete, onPublish, onCopy, quizId }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Check the click ourside the area or not
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="float-end position-relative">
      <GreenCheckmark />
      
      <div ref={iconRef}>
        <IoEllipsisVertical
          className="fs-4"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        />

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              zIndex: 1,
            }}
          >
            <button className="dropdown-item" onClick={() => onEdit(quizId)}>
              Edit
            </button>
            <button className="dropdown-item" onClick={() => onDelete(quizId)}>
              Delete
            </button>
            <button className="dropdown-item" onClick={() => onPublish(quizId)}>
              Publish/Unpublish
            </button>
            <button className="dropdown-item" onClick={() => onCopy(quizId)}>
              Copy
            </button>
          </div>

        )}
      </div>
    </div>
  );
}
