import { FaChevronDown } from "react-icons/fa";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="mt-4">
      <form>
        {/* Assignment Name */}
        <div className="mb-4 w-50">
          <label id="wd-name" className="form-label">Assignment Name</label>
          <input id="wd-name" value="A1 - ENV + HTML" className="form-control" />
        </div>

        {/* Assignment Description */}
        <div className="mb-4 w-50 border p-3 rounded" id="wd-description">
          <p>
            The assignment is <span style={{ color: "red" }}>Available online</span>
          </p>
          <p>
            Please submit a link to the landing page of your web application running on Netlify.
          </p>
          <p>The Landing page should include the following:</p>
          <ul className="mb-4">
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kanbas application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>
            The Kanbas application should include a link to navigate back to the landing page.
          </p>
        </div>

        {/* Points and Assignment Group */}
        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label id="wd-points" className="form-label">Points</label>
          </div>
          <div className="col-md-6">
            <input id="wd-points" value={100} className="form-control" />
          </div>
        </div>

        <div className="row mb-4 justify-content-end w-50">
          <div className="col-auto">
            <label htmlFor="wd-group" className="form-label">Assignment Group</label>
          </div>
          <div className="col-md-6 position-relative"> 
            <select id="wd-group" className="form-control">
              <option>ASSIGNMENT1</option>
              <option>ASSIGNMENT2</option>
              <option>ASSIGNMENT3</option>
              <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
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
            <select id="wd-display-grade-as" className="form-control">
              <option selected value="a1">Percentage</option>
              <option value="a2">Letter</option>
              <option value="a3">Points</option>
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
                  <input id="wd-assign-to" value="Everyone" className="form-control" />
                </div>
              </div>

              <div className="row mb-4 w-100">
                <div className="col-md-6">
                  <label id="wd-due-date" className="form-label">Due</label>
                  <input type="date" id="wd-due-date" value="2024-05-13" className="form-control" />
                </div>
              </div>

              {/* Available From and Until */}
              <div className="row mb-4 justify-content-end w-100">
                <div className="col-md-6">
                  <label id="wd-available-from" className="form-label">Available from</label>
                  <input type="date" id="wd-available-from" value="2024-05-06" className="form-control" />
                </div>
                <div className="col-md-6">
                  <label id="wd-available-until" className="form-label">Until</label>
                  <input type="date" id="wd-available-until" value="2024-05-20" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end w-50">
          <button type="button" className="btn btn-secondary me-2">Cancel</button>
          <button type="submit" className="btn btn-save">Save</button>
        </div>
      </form>
    </div>
  );
}
