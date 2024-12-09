import { FaUserCircle } from "react-icons/fa";
<<<<<<< HEAD
export default function PeopleTable() {
  return (
    <div id="wd-people-table">
=======
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";
// import { useParams } from "react-router-dom";
// import * as db from "../../Database";


export default function PeopleTable({ users = [] }: { users?: any[] }) {
  // const { cid } = useParams();
  // const { users, enrollments } = db;

  return (
    <div id="wd-people-table">
      <PeopleDetails />
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
      <table className="table table-striped">
        <thead>
          <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
        </thead>
        <tbody>
<<<<<<< HEAD
          <tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{" "}
              <span className="wd-last-name">Stark</span></td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td> </tr>
          {/* Add at least 3 more users such as Bruce Wayne, Steve Rogers, and Natasha Romanoff */}
					<tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span>{" "}
              <span className="wd-last-name">Wayne</span></td>
            <td className="wd-login-id">001234562S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-11-02</td>
            <td className="wd-total-activity">15:32:43</td> </tr>

					<tr><td className="wd-full-name text-nowrap">
						<FaUserCircle className="me-2 fs-1 text-secondary" />
						<span className="wd-first-name">Steve</span>{" "}
						<span className="wd-last-name">Rogers</span></td>
					<td className="wd-login-id">001234563S</td>
					<td className="wd-section">S101</td>
					<td className="wd-role">STUDENT</td>
					<td className="wd-last-activity">2020-10-02</td>
					<td className="wd-total-activity">23:32:43</td> </tr>

					<tr><td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span>{" "}
              <span className="wd-last-name">Romanoff</span></td>
            <td className="wd-login-id">001234564S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-11-05</td>
            <td className="wd-total-activity">13:23:34</td> </tr>

					<tr><td className="wd-full-name text-nowrap">
						<FaUserCircle className="me-2 fs-1 text-secondary" />
						<span className="wd-first-name">Thor</span>{" "}
						<span className="wd-last-name">Odinson</span></td>
					<td className="wd-login-id">001234565S</td>
					<td className="wd-section">S101</td>
					<td className="wd-role">STUDENT</td>
					<td className="wd-last-activity">2020-12-01</td>
					<td className="wd-total-activity">11:22:33</td> </tr>
=======
        {users
          // .filter((usr) =>
          //   enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
          // )
          .map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-decoration-none">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>
                  <span className="wd-last-name">{user.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}

          
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6

        </tbody>
      </table>
    </div> );}

