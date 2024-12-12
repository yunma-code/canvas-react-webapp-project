import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchQuizById, fetchAttemptForQuiz, createAttempt, updateAttempt } from "../client";
import "./Quiz.css";

type Attempt = {
  _id?: string;
  attempts_left: number;
  score: number;
  answers: any[];
  user: string;
  quiz: string;
  course: string;
};

const QuizDetails = () => {
  const { qid } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [quiz, setQuiz] = useState<any>();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const hasEditAccess = ["FACULTY", "ADMIN", "TA"].includes(currentUser?.role);

  const [currentAttempt, setCurrentAttempt] = useState<Attempt | null>(null);


  useEffect(() => {
    const currentQuiz = async () => {
      const fetchedQuiz = await fetchQuizById(qid!);
      setQuiz(fetchedQuiz);
    };
    currentQuiz();
  },[]
  )

  useEffect(() => {
    const loadAttempt = async () => {
      if (!qid || !currentUser?._id) return;

      const attempts = await fetchAttemptForQuiz(qid!);
      const existingAttempt = attempts.find((attempt: Attempt) => attempt.user === currentUser._id);

      if (existingAttempt) {
        setCurrentAttempt(existingAttempt);
      } else {
        const newAttempt = await createAttempt({
          attempts_left: quiz.attempt_number || 1,
          score: 0,
          answers: [],
          user: currentUser._id,
          quiz: qid,
          course: quiz?.course,
        });
        setCurrentAttempt(newAttempt);
      }
    };
    loadAttempt();
  }, [qid, currentUser?._id, quiz]);


  const handleStart = async () => {
    if (!currentAttempt) {
      alert("No current attempt found. Please reload the page.");
      return;
    }

    if (currentAttempt.attempts_left === 0) {
      alert(`You have exceeded the maximum number of attempts (${quiz?.attempt_number}).`);
      return;
    }

    try {
      const updatedAttempt = await updateAttempt(currentAttempt._id!, {
        attempts_left: currentAttempt.attempts_left - 1,
      });

      setCurrentAttempt(updatedAttempt);
      navigate(`/quiz/${qid}/attempt`);
    } catch (error) {
      console.error("Failed to update attempt:", error);
      alert("An error occurred while starting the quiz. Please try again later.");
    }
  };


  const handleEdit = () => navigate(`${pathname}/Edit`);
  const handlePreview = () => navigate(`${pathname}/preview`);

  return (
    <div className="quiz-details-container">
      <div className="button-group">
        <button className="btn" onClick={handlePreview}>Preview</button>
        {hasEditAccess && <button className="btn" onClick={handleEdit}>Edit</button>}
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
          <span className="quiz-details-answer">{quiz?.shuffle_answers ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Time Limit:</span>
          <span className="quiz-details-answer">{quiz?.time_limit || "20 Minutes"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Multiple Attempts:</span>
          <span className="quiz-details-answer">{quiz?.allowed_attempts ? "Yes" : "No"}</span>
        </div>
        {quiz?.allowed_attempts && (
          <div className="quiz-details-row">
            <span className="quiz-details-label">How Many Attempts:</span>
            <span className="quiz-details-answer">{quiz?.attempt_number || "1"}</span>
          </div>
        )}
        <div className="quiz-details-row">
          <span className="quiz-details-label">Show Correct Answers:</span>
          <span className="quiz-details-answer">{quiz?.show_correct_answers ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">One Question at a Time:</span>
          <span className="quiz-details-answer">{quiz?.one_question_at_a_time ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Webcam Required:</span>
          <span className="quiz-details-answer">{quiz?.require_lockdown_browser ? "Yes" : "No"}</span>
        </div>
        <div className="quiz-details-row">
          <span className="quiz-details-label">Lock Questions After Answering:</span>
          <span className="quiz-details-answer">{quiz?.cant_go_back ? "Yes" : "No"}</span>
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
        {/* start quiz button if still have attempt */}
        <div>
          {currentAttempt ? (
            currentAttempt.attempts_left > 0 ? (
              <button className="btn" onClick={handleStart}>
                Start Quiz
              </button>
            ) : (
              <p className="error-message">
                You have reached the maximum number of attempts for this quiz.
              </p>
            )
          ) : (
            <p className="error-message">Loading attempt data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
