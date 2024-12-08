import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz } from "./reducer";
import { Link, useParams } from "react-router-dom";

const Quizzes = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes); 
  const { cid } = useParams<{ cid: string }>();

  const handleDelete = (quizId: string) => {
    dispatch(deleteQuiz(quizId));
  };

  if (!quizzes || quizzes.length === 0) {
    return <div>No quizzes available or loading...</div>;
  }

  return (
    <div className="container">
      <h1>Quizzes</h1>
      <ul className="list-group">
        {quizzes.map((quiz: any) => (
          <li
            key={quiz.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{quiz.title}</h5>
              <p>{quiz.description || "No description available."}</p>
            </div>
            <div>
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/preview/${quiz.id}`}
                className="btn btn-primary me-2">
                Preview
              </Link>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quizzes;


