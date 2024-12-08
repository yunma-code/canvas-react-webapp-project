import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Quiz.css";

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find((q: any) => q._id === quizId);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const hasEditAccess = currentUser.role === "FACULTY";

  const handleEdit = () => {
    navigate(`${pathname}/Edit`);
  };
  const handlePreview = () => {
    navigate(`${pathname}/preview`);
  };

  return (
    <div className="quiz-details-container">
      <div className="button-group">
        <button className="btn" onClick={handlePreview}>Preview</button>
        {hasEditAccess && (
          <button className="btn" onClick={handleEdit}>Edit</button>
        )}
      </div>

      <hr />
      <div className="quiz-header">
        <h2>{quiz?.title || "Quiz Title"}</h2>
      </div>

      <hr className="divider" />
      <div className="quiz-details">
        <div className="quiz-details-row">
          <span className="quiz-details-label">Quiz Type:</span>
          <span className="quiz-details-answer">{quiz?.quiz_type || "Graded Quiz"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Points:</span>
          <span className="quiz-details-answer">{quiz?.points_possible || "N/A"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Assignment Group:</span>
          <span className="quiz-details-answer">{quiz?.assignment_group_type || "Quizzes"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Shuffle Answers:</span>
          <span className="quiz-details-answer">{quiz?.shuffle_answers === true ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Time Limit:</span>
          <span className="quiz-details-answer">{quiz?.time_limit || "20 Minutes"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Multiple Attempts:</span>
          <span className="quiz-details-answer">{quiz?.allowed_attempts === true ? "Yes" : "No"}</span>
        </div>
        {quiz?.allowed_attempts && (
          <div className="quiz-details-row">
            <span className="quiz-details-label">How Many Attempts:</span>
            <span className="quiz-details-answer">{quiz?.attempts_number || "1"}</span>
          </div>
        )}
        <div className="quiz-details-row">
          <span className="quiz-details-label">Show Correct Answers:</span>
          <span className="quiz-details-answer">{quiz?.show_correct_answers === true ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">One Question at a Time:</span>
          <span className="quiz-details-answer">{quiz?.one_question_at_a_time === true ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Webcam Required:</span>
          <span className="quiz-details-answer">{quiz?.require_lockdown_browser || "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Lock Questions After Answering:</span>
          <span className="quiz-details-answer">{quiz?.cant_go_back || "No"}</span>
        </div>

        <div className="quiz-table">
          <div className="table-header">
            <span>Due</span>
            <span>For</span>
            <span>Available from</span>
            <span>Until</span>
          </div>
          <div className="table-row">
            <span>{quiz?.due_at ? new Date(quiz.due_at).toLocaleString() : "N/A"}</span>
            <span>Everyone</span>
            <span>{quiz?.unlock_at ? new Date(quiz.unlock_at).toLocaleString() : "N/A"}</span>
            <span>{quiz?.lock_at ? new Date(quiz.lock_at).toLocaleString() : "N/A"}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default QuizDetails;
