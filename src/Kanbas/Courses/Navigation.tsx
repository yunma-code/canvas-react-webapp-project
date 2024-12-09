import { Link, useLocation, useParams } from "react-router-dom";
<<<<<<< HEAD

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = [
    "Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {
        links.map((link) => (
          <Link id={`wd-course-${link.toLowerCase()}-link`}
            to={`/Kanbas/Courses/${cid}/${link}`}
            className={`list-group-item 
              ${pathname.includes(link) ? "active" : "text-danger"}
              border border-0`}>
            {link}
          </Link>
          
        )
        )
      }

    </div>
  );
}
=======
import { useState } from "react";
import * as db from "../Database";

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
      {/* <Link id="wd-course-home-link"    to="/Kanbas/Courses/1234/Home"
        className={`list-group-item border-0 ${isActive("/Kanbas/Courses/1234/Home")}`}>
          Home</Link>
      <Link id="wd-course-modules-link" to="/Kanbas/Courses/1234/Modules"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/1234/Modules")}`}>
          Modules</Link>
      <Link id="wd-course-piazza-link"  to="/Kanbas/Courses/1234/Piazza"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/1234/Piazza")}`}>
          Piazza</Link>
      <Link id="wd-course-zoom-link"    to="/Kanbas/Courses/1234/Zoom"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/1234/Zoom")}`}>
          Zoom</Link>
      <Link id="wd-course-quizzes-link" to="/Kanbas/Courses/1234/Assignments"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/1234/Assignments")}`}>
          Assignments</Link>
      <Link id="wd-course-assignments-link" to="/Kanbas/Courses/1234/Quizzes"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/1234/Quizzes")}`}>
          Quizzes</Link>
      <Link id="wd-course-grades-link"  to="/Kanbas/Courses/1234/Grades"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/1234/Grades")}`}>
          Grades</Link>
      <Link id="wd-course-people-link"  to="/Kanbas/Courses/:cid/People"
        className={`list-group-item text-danger border border-0 ${isActive("/Kanbas/Courses/:cid/People")}`}>
          People</Link><br/> */}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
