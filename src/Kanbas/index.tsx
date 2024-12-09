<<<<<<< HEAD
import Account from "./Account";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as db from "./Database";
import { useEffect, useState } from "react";
import './styles.css'
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>(db.courses);
=======
import {Routes, Route, Navigate} from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import Session from "./Account/Session";
import CourseStatus from "./Courses/Home/Status";
import "bootstrap/dist/css/bootstrap.min.css";
import * as client from "./Courses/client";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";

import "./styles.css";
import { useSelector } from "react-redux";

export default function Kanbas() {
	const [courses, setCourses] = useState<any[]>([]);
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
<<<<<<< HEAD
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: new Date().getTime().toString() }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = () => {
    const newCourses = courses.map((c) => {
      if (c._id === course._id) {
        return course;
      } else {
        return c;
      }
    })
    setCourses(
      newCourses
    );
  };
  useEffect(() => {
    console.log(courses)
  }, [courses])
  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account/*" element={<Account />} />
          <Route path="Dashboard" element={
            <ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
              />
            </ProtectedRoute>
          } />
          <Route path="Courses/:cid/*" element={
            <ProtectedRoute>
              <Courses courses={courses} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>);
}


=======

	const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolling, setEnrolling] = useState<boolean>(false);
 const findCoursesForUser = async () => {
   try {
     const courses = await userClient.findCoursesForUser(currentUser._id);
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };
 const updateEnrollment = async (courseId: string, enrolled: boolean) => {
	if (enrolled) {
		await userClient.enrollIntoCourse(currentUser._id, courseId);
	} else {
		await userClient.unenrollFromCourse(currentUser._id, courseId);
	}
	setCourses(
		courses.map((course) => {
			if (course._id === courseId) {
				return { ...course, enrolled: enrolled };
			} else {
				return course;
			}
		})
	);
};

 const fetchCourses = async () => {
   try {
     const allCourses = await courseClient.fetchAllCourses();
     const enrolledCourses = await userClient.findCoursesForUser(
       currentUser._id
     );
     const courses = allCourses.map((course: any) => {
       if (enrolledCourses.find((c: any) => c._id === course._id)) {
         return { ...course, enrolled: true };
       } else {
         return course;
       }
     });
     setCourses(courses);
   } catch (error) {
     console.error(error);
   }
 };

  useEffect(() => {
		if(enrolling) {
			fetchCourses();
		}else {
			findCoursesForUser();
		}
  }, [currentUser, enrolling]);


  const addNewCourse = async () => {
		// const newCourse = await userClient.createCourse(course);
		const newCourse = await courseClient.createCourse(course); 
    setCourses([...courses, { ...course, newCourse }]);
  };
  const deleteCourse = async (courseId: any) => {
		const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };
  const updateCourse = async () => {
		await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

	const userRole = currentUser?.role || "STUDENT";

	return (
		<Session>
		<div id="wd-kanbas">
			<KanbasNavigation />
			<div className="wd-main-content-offset p-3">
				<Routes>
					<Route path="/" element={<Navigate to="Account" />} />
					<Route path="/Account/*" element={<Account />} />
					<Route path="/Dashboard" element={
						<ProtectedRoute>
						<Dashboard
						 courses={courses}
						 course={course}
						 setCourse={setCourse}
						 addNewCourse={userRole === "FACULTY" ? addNewCourse : undefined}
						 deleteCourse={deleteCourse}
						 updateCourse={updateCourse}
						 userRole={userRole}
						 enrolling={enrolling} 
						 setEnrolling={setEnrolling}
						 updateEnrollment={updateEnrollment}/>
						</ProtectedRoute>
				 } />
					<Route path="/Courses/:cid/*" 
						element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
					<Route path="/Calendar" element={<h1>Calendar</h1>} />
					<Route path="/Inbox" element={<h1>Inbox</h1>} />
				</Routes>
			</div>
		</div>
		</Session>
	)
}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
