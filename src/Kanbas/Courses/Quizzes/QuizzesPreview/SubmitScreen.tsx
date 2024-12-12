import { Link, useLocation, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizClient from "../client";
import parse from "html-react-parser";

type QuestionOption = {
  id: string;
  answer_text: string;
  is_correct: boolean;
};

type Question = {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false" | "fill_in_blank";
  options?: QuestionOption[];
  answer?: boolean;
};

type Quiz = {
  course: String,
  title: String,
  points_possible: Number,
  quiz_type: String,
  assignment_group_id: String,
  assignment_group_type: String,
  shuffle_answers: Boolean,
  allowed_attempts: Boolean,
  attempts_number: Number,
  show_correct_answers: Boolean,
  one_question_at_a_time: Boolean,
  has_access_code: Boolean,
  require_lockdown_browser: Boolean,
  cant_go_back: Boolean,
  due_at: String,
  unlock_at: String,
  lock_at: String,
  description: String,
  time_limit: Number,
  questions: Question[],
  is_published: Boolean,
};

const SubmitScreen = () => {
  const location = useLocation();
  const { cid, qid } = useParams();
  const { state } = location;

  const { score, totalQuestions, quiz: stateQuiz, userAnswers: stateUserAnswers } = state || {};
  const [quiz, setQuiz] = useState<Quiz | null>(stateQuiz || null);
  const [userAnswers, setUserAnswers] = useState<any>(stateUserAnswers || null);
  const [isLoading, setIsLoading] = useState(!stateQuiz || !stateUserAnswers);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!stateQuiz || !stateUserAnswers) {
        try {
          setIsLoading(true);
          const fetchedQuiz = await quizClient.fetchQuizById(qid!);
          const fetchedAttempt = await quizClient.fetchAttemptForQuiz(qid!);
          setQuiz(fetchedQuiz);
          setUserAnswers(fetchedAttempt.answers);
        } catch (error) {
          console.error("Error fetching quiz or answers:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchQuizData();
  }, [qid, stateQuiz, stateUserAnswers]);

  if (isLoading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!quiz || !userAnswers) {
    return (
      <div className="container">
        <h2 className="text-danger">Error</h2>
        <p>There was an error retrieving your quiz data. Please try again.</p>
        {currentUser.role !== "STUDENT" && (
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-primary">
            Keep editing this quiz
          </Link>
        )}
      </div>
    );
  }


  // function to check correctness of answers
  const isCorrect = (question: Question): boolean => {
    const userAnswer = userAnswers.find((a: any) => a.id === question.id)?.answer;
    console.log("User Answer: ", userAnswer);

    if (question.question_type === "multiple_choice") {
      return question.options?.some((option) => option.id === userAnswer && option.is_correct) || false;
    } else if (question.question_type === "true_false" && question.answer !== undefined) {
      return userAnswer === String(question.answer);
    } else if (question.question_type === "fill_in_blank" && question.answer) {
      return question.options?.some((option) => 
      option.answer_text.trim().toLowerCase() === userAnswer?.trim().toLowerCase()
    ) || false;
    }
    return false;
  };

  return (
    <div className="container text-center mt-5">
      <h3 className="fs-4">Congratulations! You have successfully completed the quiz.</h3>

      <div className="alert mt-4">
        <h4>Your Score</h4>
        <p>
          {score} / {totalQuestions}
        </p>
      </div>

      <div className="mt-5">
        <h4 className="text-start">Review Your Answers:</h4>
        <ul className="list-group mt-3">
          {quiz.questions.map((question: Question, index: number) => {
            const correct = isCorrect(question);
            const userAnswer = userAnswers.find((a: any) => a.id === question.id)?.answer || "No answer provided";

            const userAnswerText =
              question.question_type === "multiple_choice"
                ? question.options?.find((option) => option.id === userAnswer)?.answer_text || "No answer provided"
                : userAnswer;


            return (
              <li
                key={question.id}
                className={`list-group-item ${correct ? "text-success" : "text-danger"}`}
              >
                <div className="d-flex align-items-start text-start">
                  <div className="flex-grow-1">
                    <div className="fw-bold mb-2">
                      Question {index + 1}: {parse(question.question_text || "")}
                    </div>
                    <div className={`mb-1 ${correct ? "text-success" : "text-danger"}`}>
                      <strong>Your Answer:</strong> {userAnswerText}
                    </div>
                    {!correct && (
                      <div>
                        <strong>Correct Answer:</strong>{" "}
                      {question.question_type === "multiple_choice"
                        ? question.options?.find((option) => option.is_correct)?.answer_text || "N/A"
                        : question.question_type === "fill_in_blank"
                        ? question.options?.map((option) => option.answer_text).join(", ") || "N/A"
                        : question.answer || "N/A"}
                    </div>
                    )}
                  </div>
                  <div>
                    {correct ? (
                      <FaCheckCircle size={24} className="text-success" />
                    ) : (
                      <FaTimesCircle size={24} className="text-danger" />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {currentUser.role !== "STUDENT" && (
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-primary mt-5">
          Keep Editing this quiz
        </Link>
      )}
    </div>
  );
};

export default SubmitScreen;