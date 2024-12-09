<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FaChevronDown } from "react-icons/fa";

export default function AssignmentEditor() {
  const { cid, aid = null } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const [assignment, setAssignment] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<any>(false);

  // Preload the assignment data when the component loads
  // when aid and assignments changes, this page should also rerender
  useEffect(() => {
    if (aid != null) {
      const selectedAssignment = Array.isArray(assignments) ? assignments.find((assignment: any) => assignment._id === aid) : null;

      if (selectedAssignment) {
        setAssignment(selectedAssignment);
        setIsEditing(true);
      }
    } else {
      setAssignment({
        _id: new Date().getTime().toString(),
        course: cid,
      });
      setIsEditing(false);
    }

  }, [aid, assignments]);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const save = () => {
    if (isEditing) {
      dispatch(updateAssignment(assignment));
      navigate(-1);
    } else {
      dispatch(addAssignment(assignment));
      navigate(-1);
    }

  }
  const cancel = () => {
    navigate(-1);
  }

  return (
    <div id="wd-assignments-editor" className="mt-4">
      <form>
        {/* Assignment Name */}
        <div className="mb-4 w-50">
          <label id="wd-name" className="form-label">Assignment Name</label>
          <input
            id="wd-name"
            name="title"
            value={assignment?.title}
            onChange={handleInputChange}
            className="form-control"
            required
=======
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
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
            placeholder="New Assignment"
          />
        </div>

<<<<<<< HEAD
        {/* Assignment Description */}
        <div className="mb-4 w-50 border p-3 rounded" id="wd-description">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea
            id="wd-description"
            value={assignment?.description}
            onChange={handleInputChange}
=======
        <div className="mb-4">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea
            id="wd-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
            className="form-control"
            rows={3}
            placeholder="New Assignment Description"
          />
        </div>

<<<<<<< HEAD
        {/* Points and Assignment Group */}
        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label id="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-md-6">
            <input
              id="wd-points"
              type="number"
              value={assignment?.points}
              onChange={handleInputChange}
              className="form-control"
              required
              placeholder="100"
            />
          </div>
        </div>

        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-md-6 position-relative">
            <select id="wd-group"
              className="form-control"
              name="assignmentGroup"
              value={assignment?.assignmentGroup}
              onChange={handleInputChange}
            >
              <option value="ASSI">ASSIGNMENTS</option>
              <option value="PROJ">PROJECTS</option>
              <option value="QUIZ">QUIZES</option>
            </select>
            <div className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
              <FaChevronDown />
=======
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
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label id="wd-display-grade-as" className="form-label">Display Grade as</label>
          </div>
          <div className="col-md-6 position-relative">

            <select id="wd-display-grade-as" className="form-control" value={assignment?.displayAs} onChange={handleInputChange}>
              <option value="PERC">Percentage</option>
              <option value="LETR">Letter</option>
              <option value="POINT">Points</option>
            </select>
            <div className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
              <FaChevronDown />
            </div>
          </div>
        </div>

        {/* Submission Type */}
        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label id="wd-submission-type" className="form-label">Submission Type</label>
          </div>
          <div className="col-md-6 position-relative">
            <select id="wd-submission-type" className="form-control">
              <option selected value="a1">Online</option>
              <option value="a2">Github</option>
              <option value="a3">GradeScope</option>
            </select>
            <div className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
              <FaChevronDown />
            </div>
          </div>
        </div>

        {/* Online Entry Options */}
        <div className="row mb-4 justify-content-end w-50">
          <div className="col-md-6">
            <p className="fw-bold">Online Entry Options</p>
            <div className="border p-3 rounded">
              <div className="form-check">
                <p>
                  <input type="checkbox" id="wd-text-entry" className="form-check-input" />
                  <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                </p>
                <p>
                  <input type="checkbox" id="wd-website-url" className="form-check-input" />
                  <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                </p>
                <p>
                  <input type="checkbox" id="wd-media-recording" className="form-check-input" />
                  <label htmlFor="wd-media-recording" className="form-check-label">Media Recordings</label>
                </p>
                <p>
                  <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
                  <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                </p>
                <p>
                  <input type="checkbox" id="wd-file-upload" className="form-check-input" />
                  <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Assign Section */}
        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label id="wd-assign" className="form-label">Assign</label>
          </div>
          <div className="col-auto">
            <div className="border rounded p-3">
              <div className="row mb-4">
                <div className="col-md-6">

                  <label id="wd-assign-to" className="form-label">Assign to</label>
                  <select id="wd-assign-to" className="form-control" value={assignment?.assignTo} onChange={handleInputChange}>
                    <option value="EVERYONE">Everyone</option>
                    <option value="SELECTED">Selected Students</option>
                  </select>
                  <div className="position-relative" style={{ left: '120px', top: '-20px', transform: 'translateY(-50%)' }}>
                    <FaChevronDown />
                  </div>

                </div>
              </div>

              <div className="row mb-4 w-100">
                <div className="col-md-6">
                  <label id="wd-due-date" className="form-label">Due</label><br/>
                  <input type="date" id="wd-due-date" onChange={handleInputChange} value={(isEditing && assignment?.due) ? assignment?.due.split('T')[0] : ""} />
                </div>
              </div>

              {/* Available From and Until */}
              <div className="row mb-4 justify-content-end w-100">
                <div className="col-md-6">
                  <label id="wd-available-from" className="form-label">Available from</label><br/>
                  <input type="date" id="wd-available-from" onChange={handleInputChange} value={(isEditing && assignment?.available) ? assignment?.available.split('T')[0] : ""} />
                </div>
                <div className="col-md-6">
                  <label id="wd-available-until" className="form-label">Until</label><br/>
                  <input type="date" id="wd-available-until" onChange={handleInputChange} value={(isEditing && assignment?.available) ? assignment?.available.split('T')[0] : ""} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end w-50">
          <button type="button" onClick={save} className="btn btn-secondary me-2">Cancel</button>
          <button type="submit" onClick={cancel} className="btn btn-save">Save</button>
=======
        <div className="d-flex justify-content-end">
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <button type="submit" className="btn btn-danger">Save</button>
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
        </div>
      </form>
    </div>
  );
}
