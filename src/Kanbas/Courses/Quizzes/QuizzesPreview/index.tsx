import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as quizClient from "../client";

type QuestionOption = {
  id: string;
  answer_text: string;
  is_correct: boolean;
};

type Question = {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "true_false";
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


const QuizPreview = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>();
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {

    const fetchQuizzes = async () => {
      if (qid) {
        try {
          const fetchedQuiz = await quizClient.fetchQuizById(qid);
          setQuiz(fetchedQuiz); 
          setQuizQuestions(fetchedQuiz.question);
        } catch (error) {
          console.error("Error fetching quiz: ", error);
        }
      } else {
        return (
          <div className="alert alert-danger" role="alert">
            Quiz not found!
          </div>
        );
      }
    };
    fetchQuizzes();
  }, [qid]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];


  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length -1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const calculateScore = (): number => {
    let score = 0;

    quiz?.questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      if (question.question_type === "multiple_choice") {
        const correctOption = question.options?.find((option) => option.is_correct)?.answer_text;
        if (userAnswer === correctOption) {
          score++;
        }
      } else if (question.question_type === "true_false" && question.answer !== undefined) {
        if (userAnswer === String(question.answer)) {
          score++;
        }
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const totalQuestions = quiz?.questions.length;

    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Submit`, {
      state: {
        score,
        totalQuestions,
        quiz,
        userAnswers,
      },
    });
  };


  return (
    <div className="container">
      <h2>{quiz?.title}</h2>
      {
        currentUser.role !== "STUDENT" &&
        <div className="alert alert-danger" role="alert">
          This is a preview of the published version of the quiz.
        </div>
      }
      <div className="text-muted mb-2">Due: {quiz?.due_at || "No due date provided"}</div>

      <h3>Quiz Instructions</h3>
      <p>{quiz?.description || "No description provided."}</p>
      <hr className="my-4" />

      <div className="card mt-3">
        <div className="card-header d-flex justify-content-between">
          <h5>Question {currentQuestionIndex + 1}</h5>
          <span>1 pts</span>
        </div>
        <div className="card-body">
          <p>{currentQuestion?.question_text}</p>
          <form>
            {currentQuestion?.question_type === "multiple_choice" &&
              currentQuestion.options &&
              currentQuestion.options.map((option) => (
                <div key={option.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    id={`option${option.id}`}
                    value={option.answer_text}
                    checked={userAnswers[currentQuestion.id] === option.answer_text}
                    onChange={() =>
                      setUserAnswers({ ...userAnswers, [currentQuestion.id]: option.answer_text })
                    }
                  />
                  <label className="form-check-label" htmlFor={`option${option.id}`}>
                    {option.answer_text}
                  </label>
                </div>
              ))}
            {currentQuestion?.question_type === "true_false" && (
              <>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    id={`trueOption${currentQuestionIndex}`}
                    value="true"
                    checked={userAnswers[currentQuestion.id] === "true"}
                    onChange={() =>
                      setUserAnswers({ ...userAnswers, [currentQuestion.id]: "true" })
                    }
                  />
                  <label className="form-check-label" htmlFor={`trueOption${currentQuestionIndex}`}>
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    id={`falseOption${currentQuestionIndex}`}
                    value="false"
                    checked={userAnswers[currentQuestion.id] === "false"}
                    onChange={() =>
                      setUserAnswers({ ...userAnswers, [currentQuestion.id]: "false" })
                    }
                  />
                  <label className="form-check-label" htmlFor={`falseOption${currentQuestionIndex}`}>
                    False
                  </label>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3 mb-3">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={currentQuestionIndex === quizQuestions.length- 1}
        >
          Next
        </button>
      </div>

      <div className="card d-flex mt-3 p-3">
        <div className="d-flex justify-content-end align-items-center w-100">
          <p className="text-muted mb-0 me-2">Quiz saved at 8:19 am</p>
          <button className="btn btn-secondary" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      </div>
      {
        currentUser.role !== "STUDENT" && (
          <div className="mt-3">
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-link">
              Keep editing this quiz
            </Link>
          </div>
        )
      }

      <div className="mt-4">
        <h5>Questions</h5>
        <ul className="list-group">
          {quiz?.questions.map((question, index) => (
            <li
              key={question.id}
              className={`list-group-item ${currentQuestionIndex === index ? "text-danger fw-bold" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleQuestionClick(index)}
            >
              Question {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizPreview;