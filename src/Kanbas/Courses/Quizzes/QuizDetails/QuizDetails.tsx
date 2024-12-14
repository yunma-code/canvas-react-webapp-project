import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchQuizById, fetchAttemptForQuiz } from "../client";
import "./Quiz.css";

type Attempt = {
  _id?: string;
  current_attempt: number;
  score: number;
  answers: any[];
  user: string;
  quiz: string;
  course: string;
};

const QuizDetails = () => {
  const { qid } = useParams();
  const { cid } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [quiz, setQuiz] = useState<any>();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const hasEditAccess = ["FACULTY", "ADMIN", "TA"].includes(currentUser?.role);

  const [currentAttempt, setCurrentAttempt] = useState<Attempt | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const currentQuiz = async () => {
      if (qid) {
        try {
          setIsLoading(true);
          const fetchedQuiz = await fetchQuizById(qid!);
          setQuiz(fetchedQuiz);
          console.log("currentQuiz", fetchedQuiz)
        } catch (error) {
          console.error("Error fetching quiz: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
      }

    };
    const loadAttempt = async () => {
      if (!qid || !currentUser?._id) return;

      const attempt = await fetchAttemptForQuiz(qid!);

      if (attempt) {
        setCurrentAttempt(attempt);
      } else {
        const newAttempt = {
          current_attempt: 0,
          score: 0,
          answers: [],
          user: currentUser._id,
          quiz: qid,
          course: quiz?.course,
        };
        console.log("creating attempt: ", newAttempt);
        // create attempt at local when the remote attempt is not found
        setCurrentAttempt(newAttempt);
      }
    };
    currentQuiz();
    loadAttempt();
  }, []);



  const handleStart = async () => {
    if (currentUser.role === "STUDENT") {
      //push attempt to remote, also reduce attempt_left
      if (!currentAttempt) {
        alert("No current attempt found. Please reload the page.");
        return;
      }

      if (currentAttempt.current_attempt === quiz.attempt_number) {
        alert(`You have exceeded the maximum number of attempts (${quiz?.attempt_number}).`);
        return;
      }
      try {
        const updatedAttempt = {
          ...currentAttempt,
          current_attempt: currentAttempt.current_attempt + 1
        }
        // await updateAttemptForQuiz(quiz.id, currentAttempt);

        setCurrentAttempt(updatedAttempt);
        console.log(updatedAttempt)
        navigate(`attempt`, { state: { attempt: updatedAttempt } });
      } catch (error) {
        console.error("Failed to update attempt:", error);
        alert("An error occurred while starting the quiz. Please try again later.");
      }
    } else {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
    }


  };

  const handleViewLastAttempt = () => {
    if (!currentAttempt) {
      alert("No attempt available yet");
      return;
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Submit`, {
      state: {
        score: currentAttempt.score,
        totalQuestions: quiz?.questions?.length || 0,
        quiz,
        userAnswers: currentAttempt.answers,
      },
    });
  };

  const handleEdit = () => navigate(`${pathname}/Edit`);
  const handlePreview = () => navigate(`${pathname}/preview`);

  // Set error modal
  const [showErrorModal, setShowErrorModal] = useState(false);
  useEffect(() => {
    if (
      currentUser?.role === "STUDENT" &&
      currentAttempt &&
      quiz &&
      (quiz.attempts_number - currentAttempt.current_attempt) <= 0
    ) {
      setShowErrorModal(true);
    }
  }, [quiz, currentAttempt, currentUser]);
  const handleCloseModal = () => { setShowErrorModal(false); };

  return (
    <div>
      {isLoading ?
        <>
          <p> Loading ...</p>
        </>
        :
        <div className="quiz-details-container">
          {currentUser.role !== 'STUDENT' &&
            <div className="button-group">
              <button className="btn" onClick={handlePreview}>Preview</button>
              {hasEditAccess && <button className="btn" onClick={handleEdit}>Edit</button>}
            </div>
          }

          <hr />
          {/* <div className="quiz-header-container">
            <h2 className="quiz-header-title">{quiz?.title || "Quiz Title"}</h2>
            {currentAttempt && currentAttempt.current_attempt > 0 && (
              <button
                className="btn quiz-header-view-attempt-btn"
                onClick={handleViewLastAttempt}
              >
                View Last Attempt
              </button>
            )}
          </div> */}

          {/* <div className="quiz-header">
            <h2>{quiz?.title || "Quiz Title"}</h2>
          </div> */}

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

            {/* Start quiz button or error modal */}
            {currentAttempt && (
              (quiz.attempts_number - currentAttempt.current_attempt) > 0 ? (
                <button className="btn" onClick={handleStart}>
                  Start Quiz
                </button>
              ) : (
                <div className="error-message-container">
                  <p className="error-message">
                    You've reached the maximum number of attempts for this quiz. 
                  </p>
                 <hr/>
                </div>

              )
            )}


            {/* show previous attempt results*/}
            {currentAttempt && currentAttempt.current_attempt > 0 && (
              <div>
                <button className="btn" onClick={handleViewLastAttempt}>
                  View last attempt
                </button>
              </div>
            )}

          </div>
        </div>}
    </div>
  );
};

export default QuizDetails;
