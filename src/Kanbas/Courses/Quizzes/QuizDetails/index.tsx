import { useState } from "react";
import { BsGripVertical, BsRocket } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { deleteQuiz } from "../reducer";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";


export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  const courseQuizzes = quizzes.filter(
      (quiz: { course: string | undefined; }) => quiz.course === cid);


  const handleEdit = (quizId: string) => {
    console.log(`Editing Quiz ID: ${quizId}`);
    // link to the Edit Quiz page
  };

  
  const handleDelete = (quizId: any) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(quizId));
    }
  };

  const handlePublish = (quizId: string) => {
    console.log(`Publishing Quiz ID: ${quizId}`);
  };

  const handleCopy = (quizId: string) => {
    console.log(`Copying Quiz ID: ${quizId}`);
  };


  const getAvailability = (quiz: any) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableUntil = new Date(quiz.until);

    if (now < availableFrom) {
      return `Not available until ${availableFrom.toLocaleString()}`;
    } else if (now >= availableFrom && now <= availableUntil) {
      return "Available";
    } else {
      return "Closed";
    }
  };


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

          <ul className="wd-quiz-details list-group rounded-0">
            {courseQuizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className="wd-detail list-group-item d-flex 
                           justify-content-between align-items-center p-3 ps-1"
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-3 fs-3" />
                  <BsRocket
                    style={{ transform: "rotate(45deg)" }}
                    className="me-4 text-success"
                  />

                  <div>
                    <strong className="fs-4">
                      <Link to={`./${quiz._id}`}> {quiz.title} </Link>
                    </strong>

                    <div className="text-muted">
                      <span className="fw-bold">Availability:</span>{" "}
                      {getAvailability(quiz)} | 
                      <span className="fw-bold"> Due:</span>{" "}
                      {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "N/A"} | 
                      <span className="fw-bold"> Points:</span> {quiz.points} | 
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

                <div className="d-flex align-items-center ms-auto">
                  {currentUser?.role === "FACULTY" && (
                    <button
                      className="btn btn-danger btn-sm me-3"
                      onClick={() => handleDelete(quiz._id)}
                      title="Delete Quiz"
                    >
                      <FaTrash />
                    </button>
                  )}

                  <QuizControlButtons
                    quizId={quiz._id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onPublish={handlePublish}
                    onCopy={handleCopy}
                  />
                  
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}