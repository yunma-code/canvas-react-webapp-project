import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import './Quiz.css';

export default function QuizControls() {
  const navigate = useNavigate();
  const { cid } = useParams(); // get current id
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  ); // get current user

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSort = (criteria: string) => {
    console.log(`Sorted by ${criteria}`);
    setMenuOpen(false);
  };

  // Check if the click is outside the menu or button
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="position-relative" style={{ width: "300px" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search for Quiz"
          className="form-control"
          style={{ paddingLeft: "2rem" }}
        />
        <span
          className="position-absolute"
          style={{
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#999",
          }}
        >
          <BiSearch />
        </span>
      </div>

      {/* Add Quiz Button */}
      {currentUser?.role === "FACULTY" && (
        <div className="d-flex">
          <Link
            to={`/Kanbas/Courses/${cid}/Quizzes/New`}
            className="btn btn-danger d-flex align-items-center"
          >
            <MdAdd style={{ marginRight: "5px" }} /> Quiz
          </Link>

          {/* Context Menu Button */}
          <div className="position-relative">
            <button
              ref={buttonRef}
              className="btn btn-outline-secondary ms-2"
              onClick={toggleMenu}
            >
              <BsThreeDotsVertical />
            </button>

            {/* Context Menu */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="dropdown-menu show"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  zIndex: 1,
                }}
              >
                {/* Sort logic */}
                <button
                  className="dropdown-item"
                  onClick={() => handleSort("name")}
                >
                  Sort by Name
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleSort("dueDate")}
                >
                  Sort by Due Date
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleSort("availableDate")}
                >
                  Sort by Available Date
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
