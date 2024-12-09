import { Link, useLocation, useParams } from "react-router-dom";


export default function CoursesNavigation() {
  const location = useLocation();
  // set curr link as active
  const isActive = (path: string): string => {
    return location.pathname.startsWith(path) ? "active" : "text-danger";
  };

  // use data structure to configure components
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
 

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = location.pathname.startsWith(path) ? "active" : "text-danger";

        return (
          <Link
            key={link}
            to={path}
            className={`list-group-item border-0 ${isActive}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
     