import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { addQuiz, updateQuiz } from "../reducer"; 
import { useDispatch, useSelector } from "react-redux";

export default function QuizEditor() {
  const { cid, quizID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser);  // get current user role
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("assignment");
  const [points, setPoints] = useState<number | string>("");
  const [assignmentGroup, setAssignmentGroup] = useState("483989");
  const [shuffleAnswers, setShuffleAnswers] = useState("Yes");
  const [timeLimit, setTimeLimit] = useState<number | string>("");
  const [multipleAttempts, setMultipleAttempts] = useState("No");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState("Yes");
  const [webcamRequired, setWebcamRequired] = useState("No");
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState("No");
  const [dueDate, setDueDate] = useState('');
  const [availableFrom, setAvailableFrom] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');

  useEffect(() => {
    // load quiz data if editing an existing quiz
    if (quizID) {
      const quiz = quizzes.find((q: any) => q._id === quizID);
        if (quiz) {
          setTitle(quiz.title);
          setDescription(quiz.description);
          setQuizType(quiz.quiz_type || "assignment");
          setPoints(quiz.points_possible?.toString() || "");
          setAssignmentGroup(quiz.assignment_group_id || "483989");
          setShuffleAnswers(quiz.shuffle_answers ? "Yes" : "No");
          setTimeLimit(quiz.time_limit?.toString() || "");
          setMultipleAttempts(quiz.allowed_attempts > 1 ? "Yes" : "No");
          setShowCorrectAnswers(quiz.show_correct_answers ? "Yes" : "No");
          setAccessCode(quiz.has_access_code ? "Yes" : "No");
          setOneQuestionAtATime(quiz.one_question_at_a_time ? "Yes" : "No");
          setWebcamRequired(quiz.require_lockdown_browser ? "Yes" : "No");
          setLockQuestionsAfterAnswering(quiz.cant_go_back ? "Yes" : "No");
          setDueDate(quiz.due_at);
          setAvailableFrom(quiz.unlock_at);
          setAvailableUntil(quiz.lock_at);
        }
      }
    }, [quizID, quizzes]);

  const handleSave = () => {
    if (!canEdit) return;  // prevent STUDENT from saving
    
    const newQuiz = {
      _id: quizID || new Date().getTime().toString(),
      title,
      description,
      quizType,
      points,
      assignmentGroup,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      showCorrectAnswers,
      accessCode,
      oneQuestionAtATime,
      webcamRequired,
      lockQuestionsAfterAnswering,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    if (quizID) {
      dispatch(updateQuiz(newQuiz));
    } else {
      dispatch(addQuiz(newQuiz));
    }

    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleSaveAndPublish = () => {
    handleSave();
    // publish
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-5">
      {/* tabs */}
      <div className="mb-4">
        <button
          className={`btn ${activeTab === "details" ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`btn ${activeTab === "questions" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
      </div>

      {activeTab === "details" && (
        <div>
          {/* title */}
          <div className="mb-3">
            <label htmlFor="quizName" className="form-label">Quiz Name</label>
            <input 
              type="text" 
              id="quizName" 
              className="form-control" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              id="description" 
              className="form-control wysiwyg-editor" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* quiz type */}
          <div className="mb-3">
            <label htmlFor="quizType" className="form-label">Quiz Type</label>
            <select
              id="quizType"
              className="form-select"
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>

          {/* points */}
          <div className="mb-3">
            <label htmlFor="points" className="form-label">Points</label>
            <input
              type="number"
              id="points"
              className="form-control"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>

          {/* assignment group */}
          <div className="mb-3">
            <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
            <select
              id="assignmentGroup"
              className="form-select"
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>

          {/* shuffle answers */}
          <div className="mb-3">
            <label htmlFor="shuffleAnswers" className="form-label">Shuffle Answers</label>
            <select
              id="shuffleAnswers"
              className="form-select"
              value={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* time limit */}
          <div className="mb-3">
            <label htmlFor="timeLimit" className="form-label">Time Limit</label>
            <input
              type="text"
              id="timeLimit"
              className="form-control"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>

          {/* multiple attempts */}
          <div className="mb-3">
            <label htmlFor="multipleAttempts" className="form-label">Multiple Attempts</label>
            <select
              id="multipleAttempts"
              className="form-select"
              value={multipleAttempts}
              onChange={(e) => setMultipleAttempts(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* show correct answers */}
          <div className="mb-3">
            <label htmlFor="showCorrectAnswers" className="form-label">Show Correct Answers</label>
            <input
              type="text"
              id="showCorrectAnswers"
              className="form-control"
              value={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.value)}
            />
          </div>

          {/* access code */}
          <div className="mb-3">
            <label htmlFor="accessCode" className="form-label">Access Code</label>
            <input
              type="text"
              id="accessCode"
              className="form-control"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>

          {/* one question a time */}
          <div className="mb-3">
            <label htmlFor="oneQuestionAtATime" className="form-label">One Question at a Time</label>
            <select
              id="oneQuestionAtATime"
              className="form-select"
              value={oneQuestionAtATime}
              onChange={(e) => setOneQuestionAtATime(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* webcam required */}
          <div className="mb-3">
            <label htmlFor="webcamRequired" className="form-label">Webcam Required</label>
            <select
              id="webcamRequired"
              className="form-select"
              value={webcamRequired}
              onChange={(e) => setWebcamRequired(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* lock questions after answering */}
          <div className="mb-3">
            <label htmlFor="lockQuestionsAfterAnswering" className="form-label">Lock Questions After Answering</label>
            <select
              id="lockQuestionsAfterAnswering"
              className="form-select"
              value={lockQuestionsAfterAnswering}
              onChange={(e) => setLockQuestionsAfterAnswering(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* due date */}
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input 
              type="datetime-local" 
              id="dueDate" 
              className="form-control" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* available from */}
          <div className="mb-3">
            <label htmlFor="availableFrom" className="form-label">Available From</label>
            <input 
              type="datetime-local" 
              id="availableFrom" 
              className="form-control" 
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>

          {/* available until */}
          <div className="mb-3">
            <label htmlFor="availableUntil" className="form-label">Available Until</label>
            <input 
              type="datetime-local" 
              id="availableUntil" 
              className="form-control" 
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </div>

          {/* save, publish, and cancel */}
          <div className="d-flex justify-content-end mt-3">
            <button onClick={handleCancel} className="btn btn-secondary me-2">
              {canEdit ? "Cancel" : "Back"}
            </button>
            {canEdit && (
              <>
                <button onClick={handleSave} className="btn btn-success me-2">Save</button>
                <button onClick={handleSaveAndPublish} className="btn btn-primary">Save and Publish</button>
              </>
            )}
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <div>
          <p>Quiz Questions Editor.</p>
        </div>
      )}
    </div>
  );
}
