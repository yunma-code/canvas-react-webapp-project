import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { addQuiz, updateQuiz } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import QuillEditor from './QuillEditor';
import "quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function QuizDetailsEditor({ quiz, onUpdateQuizDetails }: { quiz?: any; onUpdateQuizDetails: (quiz: any) => void; }) {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser);  // get current user role
  const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "TA" || currentUser?.role === "ADMIN";

  const [showTimeLimit, setShowTimeLimit] = useState<any>(true); //display purpose only

  // const formatDateToLocalDatetime = (date: Date) => {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   return `${year}-${month}-${day}T${hours}:${minutes}`;
  // };

  const [id, setId] = useState<string>(new Date().getTime().toString());
  const [course, setCourse] = useState<string>(cid!);
  const [title, setTitle] = useState<string>("Default Title");
  const [pointsPossible, setPointsPossible] = useState<number>(0);
  const [quizType, setQuizType] = useState<string>("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState<string>("Quizzes");
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState<boolean>(false);
  const [multipleAttempts, setMultipleAttempts] = useState<number>(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(false);
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState<boolean>(true);
  const [accessCode, setAccessCode] = useState<string | undefined>("");
  const [requireLockdownBrowser, setRequireLockdownBrowser] = useState(false);
  const [webcamRequired, setWebcamRequired] = useState<boolean>(false)
  const [cantGoBack, setCantGoBack] = useState<boolean>(false); // lock question after answering

  const [dueAt, setDueAt] = useState<Date | null>(null);
  const [unlockAt, setUnlockAt] = useState<Date | null>(null); //Available date
  const [lockAt, setLockAt] = useState<Date | null>(null); //until date

  const [description, setDescription] = useState<string>("");
  const [haveTimeLimit, setHaveTimeLimit] = useState<boolean>(false);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [isPublished, setIsPublished] = useState(false);
  const [assignTo, setAssignTo] = useState<any>("Everyone");
  const readOnly = false;

  const formatDateWithOffset = (date: Date) => {
    if (!date) return null;

    const offset = -date.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");

    return `${date.toISOString().split(".")[0]}${sign}${hours}:${minutes}`;
};

  useEffect(() => {
    // load quiz data if editing an existing quiz
    if (qid && quiz) {
      setId(quiz.id)
      setCourse(quiz.course)
      setTitle(quiz.title)
      setQuizType(quiz.quiz_type)
      setPointsPossible(quiz.points_possible)
      setAssignmentGroup(quiz.assignment_group_id)
      setShuffleAnswers(quiz.shuffle_answers)
      setAllowMultipleAttempts(quiz.attempts_number > 1)
      setMultipleAttempts(quiz.attempts_number)
      setShowCorrectAnswers(quiz.show_correct_answers)
      setAccessCode(quiz.access_code)
      setWebcamRequired(false)
      setHaveTimeLimit(quiz.time_limit > 0 )
      setTimeLimit(quiz.time_limit)
      setShowTimeLimit(quiz.time_limit > 0)
      setOneQuestionAtATime(quiz.one_question_at_a_time)
      setCantGoBack(quiz.cant_go_back)
      setDueAt(quiz.due_at ? new Date(quiz.due_at) : null);
      setUnlockAt(quiz.unlock_at ? new Date(quiz.unlock_at) : null);
      setLockAt(quiz.lock_at ? new Date(quiz.lock_at) : null);
      setDescription(quiz.description)
      setTimeLimit(quiz.time_limit)
      setIsPublished(!quiz.is_published);
    }
  }, []);

  const handleSave = async() => {
    if (!canEdit) return;  // prevent STUDENT from saving
    const quizDetails = {
      id,
      course,
      title,
      description,
      points_possible: pointsPossible,
      quiz_type: quizType,
      assignment_group_id: "",
      assignment_group_type: assignmentGroup,
      shuffle_answers: shuffleAnswers,
      allowed_attempts: allowMultipleAttempts,
      attempts_number: multipleAttempts,
      show_correct_answers: showCorrectAnswers,
      one_question_at_a_time: oneQuestionAtATime,
      has_access_code: accessCode ? true : false,
      access_code: accessCode,
      require_lockdown_browser: requireLockdownBrowser,
      webcam_required: webcamRequired,
      cant_go_back: cantGoBack,
      due_at: dueAt ? formatDateWithOffset(dueAt) : null,
      unlock_at: unlockAt ? formatDateWithOffset(unlockAt) : null,
      lock_at: lockAt ? formatDateWithOffset(lockAt) : null,
      time_limit: timeLimit,
      is_published: isPublished,
      assign_to: assignTo,
    }
    console.log('quizDetails:', quizDetails)
    if (qid) {
      console.log('have qid')
      dispatch(updateQuiz(quizDetails));
    } else {
      console.log('dont have qid', quizDetails)
      dispatch(addQuiz(quizDetails));
    }
    const fetchedId = await onUpdateQuizDetails(quizDetails);
    console.log("fetchedId:",fetchedId);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${fetchedId}`);
  };

  const handleSaveAndPublish = async () => {
    const quizDetails = {
      id,
      course,
      title,
      description,
      points_possible: pointsPossible,
      quiz_type: quizType,
      assignment_group_id: "",
      assignment_group_type: assignmentGroup,
      shuffle_answers: shuffleAnswers,
      allowed_attempts: allowMultipleAttempts,
      attempts_number: multipleAttempts,
      show_correct_answers: showCorrectAnswers,
      one_question_at_a_time: oneQuestionAtATime,
      has_access_code: !!accessCode,
      access_code: accessCode,
      require_lockdown_browser: requireLockdownBrowser,
      webcam_required: webcamRequired,
      cant_go_back: cantGoBack,
      due_at: dueAt ? formatDateWithOffset(dueAt) : null,
      unlock_at: unlockAt ? formatDateWithOffset(unlockAt) : null,
      lock_at: lockAt ? formatDateWithOffset(lockAt) : null,
      time_limit: timeLimit,
      is_published: true,
      assign_to: assignTo,
    };
    if (qid) {
      dispatch(updateQuiz(quizDetails));
    } else {
      dispatch(addQuiz(quizDetails));
    }
    const fetchedId = onUpdateQuizDetails(quizDetails);
    console.log("Published quiz ID:", fetchedId);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${fetchedId}`);
  };

  const handleAssignTo = (input: string) => {
    setAssignTo(input);
  }

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-4">
      <div>
        {/* title */}
        <div className="mb-3">
          <label htmlFor="quizName" className="form-label">Quiz Name</label>
          <input
            type="text"
            name="title"
            id="quizName"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <QuillEditor initialValue={description} onContentChange={(e) => setDescription(e)} />

        </div>


        <form className="col-md-8">
          {/* quiz type */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="quizType" className="form-label">Quiz Type</label>
            </div>
            <div className="col-md-8">
              <select
                id="quizType"
                className="form-select"
                value={quizType}
                onChange={(e) => { console.log(e) }}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </select>
            </div>
          </div>

          {/* points */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="points" className="form-label">Points</label>
            </div>
            <div className="col-md-8">
              <input
                type="number"
                id="points"
                name="points"
                className="form-control"
                value={pointsPossible}
                onChange={(e) => setPointsPossible(Number(e.target.value))}
              />
            </div>

          </div>

          {/* assignment group */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="assignmentGroup" className="form-label">Assignment Group</label>
            </div>
            <div className="col-md-8">
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
          </div>

          {/* shuffle answers */}

          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
            </div>

            <div className="col-md-8">
              <h4>options</h4>
              <div>
                <input type="checkbox" id="shuffle" checked={shuffleAnswers} onChange={e => { setShuffleAnswers(e.target.checked) }} />
                <label htmlFor="shuffle" className="form-label m-1">Shuffle Answers</label>
              </div>
              {/* time limit */}
              <div className="mb-2">
                <input type="checkbox" id="timeLimit" checked={haveTimeLimit}
                  onChange={e => {
                    setHaveTimeLimit(e.target.checked);
                    if (e.target.checked) setTimeLimit(20);
                    else setTimeLimit(-1);
                  }} />
                <label htmlFor="timeLimit" className="form-label m-1">Time Limit</label>

                {haveTimeLimit && <>
                  <input type="number" className="col-2 ms-4 me-2"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))} />
                  Minutes
                </>
                }

                {/* multiple attempts */}
                <div >
                  <input type="checkbox" id="allowMultipleAttempts" checked={allowMultipleAttempts} onClick={e => { setAllowMultipleAttempts(prev => !prev) }} />
                  <label htmlFor="allowMultipleAttempts" className="form-label m-1">Allow Muliple Attempts</label>
                  {allowMultipleAttempts &&
                    <>
                      <input type="number" className="col-2 ms-4 me-1"
                        value={multipleAttempts}
                        onChange={(e) => setMultipleAttempts(Number(e.target.value))} />
                      Attempts
                    </>
                  }

                </div>
                <div>
                  <input
                    type="checkbox"
                    id="showCorrectAnswers"

                    checked={showCorrectAnswers}
                    onChange={(e) => { setShowCorrectAnswers(e.target.checked) }}
                  />
                  <label htmlFor="showCorrectAnswers" className="form-label m-1">Show Correct Answers</label>
                </div>
              </div>



            </div>
          </div>


          {/* show correct answers */}
          {/* <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="showCorrectAnswers" className="form-label">Show Correct Answers</label>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                id="showCorrectAnswers"
                className="form-control"
                value={quizDetails?.showCorrectAnswers}
                onChange={handleInputChange}
              />
            </div>

          </div> */}

          {/* access code */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="accessCode" className="form-label">Access Code</label>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                id="accessCode"
                className="form-control"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>

          </div>

          {/* one question a time */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="oneQuestionAtATime" className="form-label">One Question at a Time</label>
            </div>
            <div className="col-md-8">
              <select
                id="oneQuestionAtATime"
                className="form-select"
                value={oneQuestionAtATime ? "Yes" : "No"}
                onChange={(e) => e.target.value === "Yes" ? setOneQuestionAtATime(true) : setOneQuestionAtATime(false)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

          </div>

          {/* webcam required */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="webcamRequired" className="form-label">Webcam Required</label>
            </div>
            <div className="col-md-8">
              <select
                id="webcamRequired"
                className="form-select"
                value={webcamRequired ? "Yes" : "No"}
                onChange={(e) => e.target.value === "Yes" ? setWebcamRequired(true) : setWebcamRequired(false)}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          {/* lock questions after answering */}
          <div className="row mb-4 justify-content-end align-items-center">
            <div className="col-md-auto">
              <label htmlFor="lockQuestionsAfterAnswering" className="form-label">Lock Questions After Answering</label>
            </div>
            <div className="col-md-8">
              <select
                id="lockQuestionsAfterAnswering"
                className="form-select"
                value={cantGoBack ? "Yes" : "No"}
                onChange={(e) => e.target.value === "Yes" ? setCantGoBack(true) : setCantGoBack(false)}

              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

          </div>

          {/* Assign Section */}
          <div className="row mb-4 justify-content-end ">
            <div className="col-auto">
              <label id="wd-assign" className="form-label">Assign</label>
            </div>
            <div className="col-md-8">
              <div className="border rounded p-3">
                <div className="row mb-4">
                  <div className="">


                    <label id="wd-assign-to" className="form-label">Assign to</label>
                    <select id="wd-assign-to" className="form-select" value={assignTo} onChange={(e) => handleAssignTo(e.target.value)}>
                      <option value="EVERYONE">Everyone</option>
                      <option value="SELECTED">Selected Students</option>
                    </select>

                  </div>
                </div>

                <div className="row mb-4 w-100">
                  <div className="col-md-6">
                    <label id="wd-due-date" className="form-label">Due</label><br />
                    <DatePicker
                      className="form-control"
                      selected={dueAt}
                      onChange={(date) => setDueAt(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Select Due Date"
                    />

                  </div>
                </div>

                {/* Available From and Until */}
                <div className="row mb-4 justify-content-end w-100">
                  <div className="col-md-6">
                    <label id="wd-available-from" className="form-label">Available from</label><br />
                    <DatePicker
                      className="form-control"
                      selected={unlockAt}
                      onChange={(date) => setUnlockAt(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Select Unlock Date"
                    />
                  </div>

                  <div className="col-md-6">
                    <label id="wd-available-until" className="form-label">Until</label><br />
                    <DatePicker
                      className="form-control"
                      selected={lockAt}
                      onChange={(date) => setLockAt(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Select Lock Date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <hr />

        {/* save, publish, and cancel */}
        <div className="d-flex justify-content-end mt-3">
          <button onClick={handleCancel} className="btn btn-secondary me-2">
            {canEdit ? "Cancel" : "Back"}
          </button>
          {canEdit && (
            <>
              <button onClick={handleSave} className="btn btn-danger me-2">Save</button>
            </>
          )}

          <button onClick={handleSaveAndPublish} className="btn btn-primary me-2">
            Save and Publish
          </button>

        </div>
      </div>


    </div>
  );
}
