import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import { BsGripVertical } from 'react-icons/bs';
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { GrDocument } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";

export default function Assignments() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  let haveEditAccess = currentUser.role === "FACULTY";
  return (
    <div>
      {haveEditAccess &&
        <>
          <AssignmentControls /><br />
        </>
      }
      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignment-title list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignments
            <ModuleControlButtons haveEditAccess={haveEditAccess} />
            <div className="float-end">
              <button id="wd-title" className="btn me-1 rounded-btn">
                40% of Total
              </button>
            </div>
          </div>

          <ul className="wd-assignment-list list-group rounded-0">
            {
              assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
                <li key={assignment._id}
                  className="wd-assignment-list-item list-group-item p-3 ps-1 wd-lesson d-flex align-items-center" >
                  <div className="d-flex align-items-center me-2">
                    <BsGripVertical className="me-2 fs-3" />
                    <GrDocument style={{ marginRight: "10px" }} />
                  </div>
                  <div className="ms-2 d-flex flex-column">
                    <Link to={pathname + '/' + assignment._id} className="fw-bold">
                      {assignment._id} - {assignment.title}
                    </Link>
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{ color: "#8F0000" }}>Multiple Modules</span>
                        <span style={{ marginLeft: "20px", color: "#363636" }}>|</span>
                        <span style={{ marginLeft: "20px", color: "#363636", fontWeight: "bold" }}>
                          Not Available until
                        </span>
                        <span className="text-muted" style={{ marginLeft: "10px" }}>
                          {assignment.available ? new Date(assignment.available).toLocaleString() : "N/A"}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span style={{ color: "#363636", fontWeight: "bold" }}>Due</span>
                        <span style={{ marginLeft: "10px" }} className="text-muted">
                          {assignment.due ? new Date(assignment.due).toLocaleString() : "N/A"} | {assignment.points ? `${assignment.points} pts` : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="float-end ms-auto">
                    <LessonControlButtons hasEditAccess={haveEditAccess} assignmentId={assignment._id}
                      deleteAssignment={(assignmentId) => { dispatch(deleteAssignment(assignmentId)) }} />
                  </div>

                </li>
              )

              )
            }

          </ul>
        </li>


      </ul>
    </div>

  );
}