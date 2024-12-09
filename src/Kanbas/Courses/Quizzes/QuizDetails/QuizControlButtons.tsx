import React, { useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import GreenCheckmark from "../../Modules/GreenCheckmark";
import { FaBan } from "react-icons/fa";


export default function QuizControlButtons({ onEdit, onDelete, onPublish, onCopy, quizId }: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

   // Retrieve the quiz
   const quiz = useSelector((state: any) =>
    state.quizzesReducer.quizzes.find((quiz: any) => quiz.id === quizId)
  );

  const isPublished = quiz?.published ?? false;

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
    <div className="float-end d-flex align-items-center position-relative">
      {/* Green Checkmark */}
      <div style={{ marginRight: "10px" }}>
        <span
          style={{ cursor: "pointer" }}
          title={isPublished ? "Unpublish Quiz" : "Publish Quiz"}
        >
          {isPublished ? <GreenCheckmark /> : <FaBan style={{ color: "red" }} />}
        </span>
      </div>

      {/* Dropdown Menu Icon */}
      <div ref={iconRef}>
        <IoEllipsisVertical
          className="fs-4 ms-2"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        />
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
