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
            placeholder="New Assignment"
          />
        </div>

        {/* Assignment Description */}
        <div className="mb-4 w-50 border p-3 rounded" id="wd-description">
          <label htmlFor="wd-description" className="form-label">Description</label>
          <textarea
            id="wd-description"
            value={assignment?.description}
            onChange={handleInputChange}
            className="form-control"
            rows={3}
            placeholder="New Assignment Description"
          />
        </div>

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
            </div>
          </div>
        </div>

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
        </div>
      </form>
    </div>
  );
}
