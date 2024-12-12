import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
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
  course: string,
  title: string,
  points_possible: number,
  quiz_type: string,
  assignment_group_id: string,
  assignment_group_type: string,
  shuffle_answers: boolean,
  allowed_attempts: boolean,
  attempts_number: number,
  show_correct_answers: boolean,
  one_question_at_a_time: boolean,
  has_access_code: boolean,
  require_lockdown_browser: boolean,
  cant_go_back: boolean,
  due_at: string,
  unlock_at: string,
  lock_at: string,
  description: string,
  time_limit: number,
  questions: Question[],
  is_published: boolean,
};


const QuizPreview = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const { attempt } = location.state || {};
  const [currentAttempt, setCurrentAttempt] = useState(attempt || { answers: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        if (!qid) throw new Error("Quiz id is required");

        const fetchedQuiz = await quizClient.fetchQuizById(qid);
        setQuiz(fetchedQuiz);
        setQuizQuestions(fetchedQuiz.questions);

        // const newAnswers = fetchedQuiz.questions.map((q: any) => ({
        //   id: q.id,
        //   answer: null,
        // }));
        // setCurrentAttempt({ ...currentAttempt, answers: newAnswers });
        const existingAttempt = await quizClient.fetchAttemptForQuiz(qid);
        if (existingAttempt) {
          setCurrentAttempt(existingAttempt);
        } else {
          const newAttempt = {
            current_attempt: 1,
            score: 0,
            answers: fetchedQuiz.questions.map((q: Question) => ({
              id: q.id,
              answer: null,
            })),
            user: currentUser.id,
            quiz: qid,
            course: cid,
          };
          setCurrentAttempt(newAttempt);
        }
      } catch (error) {
        console.error("Error fetching quiz: ", error);
      } finally {
        setIsLoading(false);
      }

    };

    fetchQuizzes();
  }, [qid, currentUser.id, cid]);


  const currentQuestion = quiz?.questions[currentQuestionIndex];


  const handleNext = () => {
    if (!Array.isArray(quizQuestions) || currentQuestionIndex < quizQuestions.length - 1) {
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

  //id: question id, means which question
  //answer: should be the answer of a specific question
  const handleUpdateAttempt = (id: string, answer: any) => {
    console.log("current attempt", currentAttempt)
    // Create a new array to avoid mutating state directly
    const updatedAnswers = currentAttempt.answers.map((a: any) =>
      a.id === id ? { ...a, answer } : a
    );

    // Check if the id was found; if not, add the new answer
    if (!currentAttempt.answers.some((a: any) => a.id === id)) {
      updatedAnswers.push({ id, answer });
    }

    // Update the currentAttempt state
    setCurrentAttempt((prev: any) => ({
      ...prev,
      answers: updatedAnswers,
    }));
  };

  // const calculateScore = (): number => {
  //   let score = 0;

  //   quiz?.questions.forEach((question) => {
  //     const userAnswer = currentAttempt.answers[question.id];
  //     if (question.question_type === "multiple_choice") {
  //       const correctOption = question.options?.find((option) => option.is_correct)?.answer_text;
  //       if (userAnswer === correctOption) {
  //         score++;
  //       }
  //     } else if (question.question_type === "true_false" && question.answer !== undefined) {
  //       if (userAnswer === String(question.answer)) {
  //         score++;
  //       }
  //       // }else if(question.question_type === "fill_in_blank" && question.answer !== undefined) {
  //       //   if (userAnswer)
  //     }
  //   });
  //   return score;
  // };
  const calculateScore = (): number => {
    let score = 0;
    quiz?.questions.forEach((question) => {
      const userAnswer = currentAttempt.answers.find((a: any) => a.id === question.id)?.answer;
      if (
        question.question_type === "multiple_choice" &&
        question.options?.find((option) => option.is_correct)?.id === userAnswer
      ) {
        score++;
      } else if (question.question_type === "true_false" && String(question.answer) === userAnswer) {
        score++;
      }
    });
    return score;
  };


  //   const handleSubmit = async () => {
  //     setIsSubmitting(true);
  //     try {
  //         const score = calculateScore();
  //         const totalQuestions = quiz?.questions.length || 0;

  //         const attemptData = {
  //             currentAttempt: 1,
  //             score,
  //             answers: currentAttempt.answers,
  //             users: currentUser.id,
  //             quiz: qid,
  //             course: cid,
  //         };
  //         console.log("attemped data to submit: ", attemptData);

  //         const createdAttemp = await quizClient.createAttempt(attemptData);

  //         navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Submit`, {
  //             state: {
  //                 score,
  //                 totalQuestions,
  //                 quiz,
  //                 userAnswers: currentAttempt.answers, // Pass user answers
  //             },
  //         });
  //     } catch (error) {
  //         console.error("Error submitting quiz attempt: ", error);
  //         alert("Failed to submit the quiz. Please try again later.");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  // };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const score = calculateScore();
      const totalQuestions = quiz?.questions.length || 0;

      const attemptPayload = {
        ...currentAttempt,
        score,
        quiz: qid,
        current_attempt: (currentAttempt.current_attempt || 0) + 1,
      };
      console.log("attetmp payload: ", attemptPayload);

      // Create or update the attempt
      if (currentAttempt._id) {
        await quizClient.updateAttemptForQuiz(currentAttempt._id, attemptPayload);
      } else {
        const newAttempt = await quizClient.createAttempt(attemptPayload);
        setCurrentAttempt(newAttempt);
      }


      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Submit`, {
        state: {
          score,
          totalQuestions,
          quiz,
          userAnswers: currentAttempt.answers,
        },
      });
    } catch (error) {
      console.error("Error submitting quiz attempt:", error);
      alert("Failed to submit the quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };




  return (
    <div>
      {isLoading ?
        <p>Loading...</p>
        :
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
          {quiz?.description ? <div>{parse(quiz.description)}</div> :
            "No description provided."}
          <hr className="my-4" />

          <div className="card mt-3">
            <div className="card-header d-flex justify-content-between">
              <h5>Question {currentQuestionIndex + 1}</h5>
              <span>1 pts</span>
            </div>
            <div className="card-body">
              <div>{parse(currentQuestion ? currentQuestion.question_text : "<p></p>")}</div>
              <form>
                {/* Multiple Choice Question */}
                {currentQuestion?.question_type === "multiple_choice" &&
                  currentQuestion.options &&
                  currentQuestion.options.map((option) => (
                    <div key={option.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question${currentQuestionIndex}`}
                        id={`option${option.id}`}
                        value={option.id} 
                        checked={
                          currentAttempt.answers.find((a: any) => a.id === currentQuestion.id)?.answer === option.id
                        }
                        onChange={() => handleUpdateAttempt(currentQuestion.id, option.id)} 
                      />
                      <label className="form-check-label" htmlFor={`option${option.id}`}>
                        {option.answer_text}
                      </label>
                    </div>
                  ))}

                {/* True/False Question */}
                {currentQuestion?.question_type === "true_false" && (
                  <>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentQuestion.id}
                        id={`trueOption${currentQuestionIndex}`}
                        value="true"
                        checked={currentAttempt.answers.find((a: any) => a.id === currentQuestion.id)?.answer === "true"}
                        onChange={() => handleUpdateAttempt(currentQuestion.id, "true")}
                      />
                      <label className="form-check-label" htmlFor={`trueOption${currentQuestionIndex}`}>
                        True
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={currentQuestion.id}
                        id={`falseOption${currentQuestionIndex}`}
                        value="false"
                        checked={currentAttempt.answers.find((a: any) => a.id === currentQuestion.id)?.answer === "false"}
                        onChange={() => handleUpdateAttempt(currentQuestion.id, "false")}
                      />
                      <label className="form-check-label" htmlFor={`falseOption${currentQuestionIndex}`}>
                        False
                      </label>
                    </div>
                  </>
                )}

                {/* Fill-in-the-Blank Question */}
                {currentQuestion?.question_type === "fill_in_blank" && (
                  <input
                    type="text"
                    className="form-control"
                    value={currentAttempt.answers.find((a: any) => a.id === currentQuestion.id)?.answer || ""}
                    onChange={(e) => handleUpdateAttempt(currentQuestion.id, e.target.value)}
                  />
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
              disabled={currentQuestionIndex === quizQuestions?.length - 1}
            >
              Next
            </button>
          </div>

          <div className="card d-flex mt-3 p-3">
            <div className="d-flex justify-content-end align-items-center w-100">
              <p className="text-muted mb-0 me-2">Quiz saved at 8:19 am</p>
              <button className="btn btn-secondary" onClick={handleSubmit} disabled={isSubmitting}>
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
        </div>}
    </div>
  );
};

export default QuizPreview;