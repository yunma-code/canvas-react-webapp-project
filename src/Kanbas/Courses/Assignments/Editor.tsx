
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
// import * as db from "../../Database";
import { createAssignment, updateAssignment as updateAssignmentAPI, getAssignmentById } from "./client";

export default function AssignmentEditor() {
  const { assignmentId, cid: courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignmentData = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find(
      (assignment: any) => assignment._id === assignmentId
    )
  );

  // init states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [due, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [until, setAvailableUntil] = useState("");

  useEffect(() => {
    if (assignmentId && courseId) {
      (async () => {
        const data = await getAssignmentById(assignmentId, courseId);
        if (data) {
          setTitle(data.title || "");
          setDescription(data.description || "");
          setPoints(data.points || 100);
          setDueDate(data.due || "");
          setAvailableFrom(data.availableFrom || "");
          setAvailableUntil(data.until || "");
        }
      })();
    }
  }, [assignmentId, courseId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const assignment = {
      title,
      description,
      points,
      due,
      availableFrom,
      until,
      course: courseId,
    };

    //update existing assignment
    if (assignmentId && assignmentId !== "NewAssignment") {
      const updatedAssignment = await updateAssignmentAPI({ ...assignment, _id: assignmentId });
      dispatch(updateAssignment(updatedAssignment));
    } else {
      //new assignment
      const newAssignment = await createAssignment(assignment); 
      dispatch(addAssignment(newAssignment));
    }
    //back to list
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);

  };

  return (
    <div className="assignment-editor-container mt-4 p-4">
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label htmlFor="wd-name" className="form-label">Assignment Name</label>
          <input
            id="wd-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="New Assignment"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea
            id="wd-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}

            className="form-control"
            rows={3}
            placeholder="New Assignment Description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="wd-points" className="form-label">Points</label>
          <input
            id="wd-points"
            type="number"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
            className="form-control"
            placeholder="100"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Assign</label>
          <div className="row border p-3 rounded">
            <div className="col-md-4">
              <label htmlFor="wd-due-date" className="form-label">Due</label>
              <input
                id="wd-due-date"
                type="date"
                value={due}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="wd-available-from" className="form-label">Available from</label>
              <input
                id="wd-available-from"
                type="date"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="wd-available-until" className="form-label">Until</label>
              <input
                id="wd-available-until"
                type="date"
                value={until}
                onChange={(e) => setAvailableUntil(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>


        <div className="d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-danger">Save</button>
        </div>
      </form>
    </div>
  );
}
