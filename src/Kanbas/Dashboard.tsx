import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from './Database'
import { BsGripVertical } from 'react-icons/bs';

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {

    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {
  {
    const [enrolled, setEnrolled] = useState<any>();
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>();
    const [enrollments, setEnrollments] = useState<any[]>(db.enrollments);

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    let haveEditAccess = currentUser.role === "FACULTY"
    
    const getRandomInt = (max: any) => {
      return Math.floor(Math.random() * max);
    }
    const handleEnrollment = () => {
      if (enrolled === "Enrollment") {
        setEnrolled("Enrolled")
      } else if (enrolled === "Enrolled") {
        setEnrolled("Enrollment")
      }
    }
    const handleEnrollClick = (e: any) => {
      if (!enrolledCourses?.find((c) => c._id === e.target.name)) {
        const addCourse = courses.filter((c) => c._id === e.target.name)
        setEnrolledCourses(prev => [...prev!, ...addCourse])
        const newEnrollment = {
          _id: getRandomInt(1000),
          user: currentUser._id,
          course: e.target.name
        }
        setEnrollments((prev) => [...prev, newEnrollment]);
      }

    }

    const handleUnenrollClick = (e: any) => {
      console.log("unenroll clicked", e);
      setEnrolledCourses(enrolledCourses?.filter((c) => c._id !== e.target.name));
      setEnrollments(enrollments?.filter((enrollment) => (!(enrollment.course === e.target.name && enrollment.user === currentUser._id))))
    }

    useEffect(
      () => {
        setEnrolled("Enrollment");
        if(haveEditAccess){
          setEnrolledCourses(courses);
        }else
        {setEnrolledCourses(courses.filter(
          (course) =>
            enrollments.some(
              (enrollment) =>
                enrollment.user === currentUser._id && enrollment.course === course._id
            )
        ));}
      }
    )

    console.log("enrolled courses: ", enrolledCourses)


    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {haveEditAccess &&
          <>
            <h5>New Course
              <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse} > Add </button>
              <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
                Update
              </button>
            </h5><br />

            <input value={course.name} className="form-control mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <textarea value={course.description} className="form-control"
              onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          </>
        }

        {haveEditAccess ?
          <>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
          </> :
          <>
            <div className="d-flex justify-content-between align-items-center">
              <h2 id="wd-dashboard-published">Courses ({courses.length})</h2>
              <button type="button" className="btn btn-primary" onClick={handleEnrollment}>
                {enrolled}
              </button>
            </div>
            <hr />
          </>
        }

        <div id="wd-dashboard-courses" className="row">

          {
            enrolled === "Enrollment" ?
              (<div className="row row-cols-1 row-cols-md-5 g-4">
                {enrolledCourses?.map((course) => (
                  <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                    <div className="card rounded-3 overflow-hidden">
                      <Link to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                        <img src="images/reactjs.jpg" width="100%" height={160} />
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            {course.name} </h5>
                          <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                            {course.description} </p>
                          <button className="btn btn-primary"> Go </button>
                          {haveEditAccess &&
                            <>
                              <button onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }} className="btn btn-danger float-end"
                                id="wd-delete-course-click">
                                Delete
                              </button>

                              <button id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(course);
                                }}
                                className="btn btn-warning me-2 float-end" >
                                Edit
                              </button>
                            </>
                          }
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>)
              :
              (<div >
                <ul className="wd-courses list-group rounded-0">
                  {courses.map((course) => (
                    <li className="wd-course list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {course.name}
                      {enrolledCourses?.find((c) => {
                        return c._id === course._id;
                      }) ? (
                        <button type="button" name={course._id} className="btn btn-danger" onClick={(e) => handleUnenrollClick(e)} style={{ float: "right" }}>unenroll</button>
                      ) : (
                        <button type="button" name={course._id} className="btn btn-success" onClick={(e) => handleEnrollClick(e)} style={{ float: "right" }}>enroll</button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>)
          }

        </div>
      </div>);
  }
}
