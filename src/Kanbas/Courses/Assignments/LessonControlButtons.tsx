import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function LessonControlButtons({hasEditAccess, assignmentId, deleteAssignment}:{hasEditAccess: boolean;assignmentId: string; deleteAssignment: (assignmentId: string) => void;}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmDelete = () => {
    deleteAssignment(assignmentId);
    setShowConfirmation(false); 
  };
  const cancelDelete = () => {
    setShowConfirmation(false);
  };
  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  return (
    <div className="float-end">
      {
        hasEditAccess &&
        <FaTrash className="text-danger me-2 mb-1" onClick={handleDeleteClick} />
      }
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this assignment?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Yes
            </button>
            <button className="btn btn-secondary" onClick={cancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
);}
