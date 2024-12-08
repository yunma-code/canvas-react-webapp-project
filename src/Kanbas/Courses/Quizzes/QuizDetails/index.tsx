import { useEffect, useState } from "react";
import { BsGripVertical, BsRocket } from "react-icons/bs";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz } from "../reducer";
import QuizzesControls from "./QuizzesControls";
import QuizControlButtons from "./QuizControlButtons";



export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const courseQuizzes = quizzes.filter(
      (quiz: { course: string | undefined; }) => quiz.course === cid);
      
  const handleEdit = (qid: string) => {
    console.log(`Editing Quiz ID: ${qid}`);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
  };

  
  const handleDelete = (qid: any) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(qid));
    }
  };

  const handlePublish = (qid: string) => {
    console.log(`Publishing Quiz ID: ${qid}`);
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

  useEffect(
    ()=>{
      console.log(courseQuizzes)
    }, [courseQuizzes]
  )

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
        </li>
      </ul>
    </div>
  );
}