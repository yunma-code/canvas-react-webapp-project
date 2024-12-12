import { useEffect, useState } from "react";
import { BsGripVertical, BsRocket } from "react-icons/bs";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addQuizzes, deleteQuiz, publishQuiz } from "../reducer";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";
import * as quizzesClient from "../client";

export default function Quizzes() {

  type Quiz = {
    _id: string;
    id: string;
    course?: string,
    title?: string;
    points_possible?: number,
    quiz_type?: string,
    assignment_group_id?: string,
    assignment_group_type?: string,
    shuffle_answers?: boolean,
    allowed_attempts?: boolean,
    attempts_number?: number,
    show_correct_answers?: boolean,
    one_question_at_a_time?: boolean,
    has_access_code?: boolean,
    require_lockdown_browser?: boolean,
    cant_go_back?: boolean,
    due_at?: string,
    unlock_at?: string,
    lock_at?: string,
    description: string,
    time_limit?: number,
    questions?: Array<any>;
    is_published?: boolean,
    cid: string,
  };

  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Find the quizzes
  const courseQuizzes: Quiz[] = useSelector((state: any) =>
    state.quizzesReducer.quizzes.filter(
      (quiz: Quiz) => quiz.course === cid
    )
  );

  const handleEdit = (qid: string) => {
    console.log(`Editing Quiz ID: ${qid}`);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  const handleDelete = async (qid: any) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await quizzesClient.deleteQuiz(qid);
      dispatch(deleteQuiz(qid));
    }
  };

  const handlePublish = async (qid: string) => {
    const quiz = courseQuizzes.find((quiz: any) => quiz.id === qid);
    if (!quiz) {
      console.error(`Quiz with ID ${qid} not found.`);
      return;
    }
    dispatch(
      addQuizzes(
        courseQuizzes.map((q) =>
          q.id === qid ? { ...q, is_published: !q.is_published } : q
        )
      )
    );
    await quizzesClient.togglePublishQuiz(qid, !quiz.is_published);

  };

  const handleCopy = (qid: string) => {
    console.log(`Copying Quiz ID: ${qid}`);

  };


  const getAvailability = (quiz: any) => {
    const now = new Date();
    const availableFrom = new Date(quiz.unlock_at);
    const availableUntil = new Date(quiz.lock_at);

    if (now < availableFrom) {
      return `Not available until ${availableFrom.toLocaleString()}`;
    } else if (now >= availableFrom && now <= availableUntil) {
      return "Available";
    } else {
      return "Closed";
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (cid) {
        try {
          const fetchedQuizzes = await quizzesClient.fetchQuizzesForCourse(cid);
          // console.log("Fetched quizzes:", fetchedQuizzes); // debug log
          dispatch(addQuizzes(fetchedQuizzes));
        } catch (error) {
          // console.error("Error fetching quizzes:", error);
        }
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  return (
    <div className="container">
      <QuizzesControls />
      <hr />

      {/* Quizzes */}
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quiz list-group-item p-0 mb-3 fs-5 border-gray">

          {/* Title */}
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <strong className="fs-4">Assignment Quizzes</strong>
            </div>
          </div>

          {/* If no quizzes */}
          {courseQuizzes.length === 0 ? (
            <div className="p-4 text-center">
              {currentUser.role === "STUDENT" ? (
                <p className="text-muted fs-5">No quizzes found. Please wait for the teacher to publish assignments.</p>
              ) : (
                <p className="text-muted fs-5">No quizzes found. Please click the "+ Quiz" button to create a new quiz.</p>
              )}
            </div>
          ) : (
            // If quizzes exist
            <ul className="wd-quiz-details list-group rounded-0">
              {courseQuizzes
                .filter((quiz: any) => {
                  // If current role = student and is not published
                  if (currentUser.role === "STUDENT" && !quiz.is_published) {
                    return false;
                  }
                  return true;
                })
                .map((quiz: any) => (
                  <li
                    key={quiz.id}
                    className="wd-detail list-group-item d-flex justify-content-between align-items-center p-3 ps-1"
                  >
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-3 fs-3" />

                      <BsRocket
                        style={{ transform: "rotate(45deg)" }}
                        className="me-4 text-success"
                      />

                      <div>
                        <strong className="fs-4">
                          <Link to={`./${quiz.id}`}> {quiz.title} </Link>
                        </strong>

                        <div className="text-muted">
                          <span className="fw-bold">Availability:</span>{" "}
                          {getAvailability(quiz)} |
                          <span className="fw-bold"> Due:</span>{" "}
                          {quiz.due_at ? new Date(quiz.due_at).toLocaleString() : "N/A"} |
                          <span className="fw-bold"> Points:</span> {quiz.points_possible} |
                          <span className="fw-bold"> Questions:</span> {quiz.questions?.length || 0}
                          {currentUser.role === "STUDENT" && quiz.score !== undefined && (
                            <>
                              {" | "}
                              <span className="fw-bold">Score:</span> {quiz.score}
                            </>
                          )}
                        </div>
                      </div>
                    </div>


                    {/* Single Quiz Menu Button */}
                    <div className="d-flex align-items-center ms-auto">
                      {currentUser?.role === "FACULTY" && (
                        <QuizControlButtons
                          quizId={quiz.id}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onPublish={handlePublish}
                          onCopy={handleCopy}
                        />
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          )}

        </li>
      </ul>
    </div>
  );
}