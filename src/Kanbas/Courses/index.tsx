import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";

import { findUsersForCourse } from "./client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuizzesPreview from "./Quizzes/QuizzesPreview";
import Quizzes from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";

import SubmitScreen from "./Quizzes/QuizzesPreview/SubmitScreen";
import QuizDetails from "./Quizzes/QuizDetails/QuizDetails";

export default function Courses({courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [users, setUsers] = useState<any[]>([]);

  // get current page from pathname
  const currPage = pathname.split("/").pop();

  useEffect(() => {
    const fetchUsers = async () => {
      if(cid) {
        const enrolledUsers = await findUsersForCourse(cid);
        setUsers(enrolledUsers);
      }
    };
    fetchUsers();
  }, [cid]);

	return (
		<div id="wd-courses">
			<h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : "Course"} &gt; {currPage}
        </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/Editor/:assignmentId" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            {
              currentUser.role === "STUDENT" ?
              <>
                <Route path="Quizzes/:qid" element={<QuizDetails />} />
                <Route path="Quizzes/:qid/attempt" element={<QuizzesPreview/>}/>
                </>
                :
                <>
                  <Route path="Quizzes/New" element={<QuizEditor />} />
                  <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
                  <Route path="Quizzes/:qid/Preview" element={<QuizzesPreview />} />
                  <Route path="Quizzes/:qid" element={<QuizDetails />} />
                </>
            }

            <Route path="Quizzes/:qid/Submit" element={<SubmitScreen />} />

            <Route path="People" element={<PeopleTable />} />


          </Routes>
        </div></div>
    </div>
  )
}