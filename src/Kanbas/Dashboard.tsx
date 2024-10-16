import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {/* course1 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course1">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/react.png" width="100%" height={160} alt="React JS" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1234 React JS</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          {/* course 2 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course2">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/css.png" width="100%" height={160} alt="CSS" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1110 CSS</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          {/* course 3 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course3">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/js.png" width="100%" height={160} alt="JavaScript" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1120 JavaScript</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          {/* course 4 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course4">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/cpp.png" width="100%" height={160} alt="C++ Foundation" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1130 C++ Foundation</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          {/* course 5 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course5">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/sql.png" width="100%" height={160} alt="SQL" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1140 SQL</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          {/* course 6 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course6">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/python.png" width="100%" height={160} alt="Python" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1150 Python</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          {/* course 7 */}
          <div className="wd-dashboard-course col" style={{ width: "300px" }} key="course7">
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/1234/Home">
                <img src="/images/java.png" width="100%" height={160} alt="Java" />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">CS1160 Java</h5>
                  <p className="card-text">Full Stack software developer</p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}