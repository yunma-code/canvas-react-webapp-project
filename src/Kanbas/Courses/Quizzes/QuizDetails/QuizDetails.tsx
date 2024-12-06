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

  return (
    <div className="quiz-details-container">
      <div className="button-group">
        <button className="btn">Preview</button>
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
        <div className="quiz-row">
          <span className="label">Quiz Type:</span>
          <span>{quiz?.quizType || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Points:</span>
          <span>{quiz?.points || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Assignment Group:</span>
          <span>{quiz?.assignmentGroup || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Shuffle Answers:</span>
          <span>{quiz?.shuffleAnswers || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Time Limit:</span>
          <span>{quiz?.timeLimit || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Multiple Attempts:</span>
          <span>{quiz?.multipleAttempts || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Show Correct Answers:</span>
          <span>{quiz?.showCorrectAnswers || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">One Question at a Time:</span>
          <span>{quiz?.oneQuestionAtATime || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Webcam Required:</span>
          <span>{quiz?.webcamRequired || "N/A"}</span>
        </div>
        <div className="quiz-row">
          <span className="label">Lock Questions After Answering:</span>
          <span>{quiz?.lockQuestionsAfterAnswering || "N/A"}</span>
        </div>

        <div className="quiz-table">
          <div className="table-header">
            <span>Due</span>
            <span>For</span>
            <span>Available from</span>
            <span>Until</span>
          </div>
          <div className="table-row">
            <span>{quiz?.dueDate ? new Date(quiz.dueDate).toLocaleString() : "N/A"}</span>
            <span>Everyone</span>
            <span>{quiz?.availableFrom ? new Date(quiz.availableFrom).toLocaleString() : "N/A"}</span>
            <span>{quiz?.untilDate ? new Date(quiz.untilDate).toLocaleString() : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
