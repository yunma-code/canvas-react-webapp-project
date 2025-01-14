import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdHome, IoMdStats, IoIosNotifications } from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import * as db from "../../Database";
import { useSelector } from "react-redux";


export default function CourseStatus() {
	// user role
	const { currentUser } = useSelector((state: any) => state.accountReducer);
	const user = db.users.find((user: any) => user.username === currentUser?.username);
	const userRole = user ? user.role : null;

  return (
    <div id="wd-course-status" style={{ width: "300px ", marginLeft: "20px"}}>
      <h2>Course Status</h2>
			<div className="d-flex">
				{/* Only faculty can see control buttons */}
				{ userRole !== "STUDENT" && (
					<>
				<div className="w-50 pe-1">
					<button className="btn btn-lg btn-secondary w-100 text-nowrap">
						<MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
				</div>

				<div className="w-50">
					<button className="btn btn-lg btn-success w-100">
						<FaCheckCircle className="me-2 fs-5" /> Publish </button>
				</div>
				</>
				)}
			</div> <br />

			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<IoMdStats className="me-2 fs-5" />View Course Stream</button> 
			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<IoIosNotifications className="me-2 fs-5" />View Course Notifications</button>

			{ userRole !== "STUDENT" && (
				<>
			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<BiImport className="me-2 fs-5" /> Import Existing Content </button>
			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<LiaFileImportSolid className="me-2 fs-5" />Import from Commons</button> 
			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<IoMdHome className="me-2 fs-5" />Choose Home Page</button> 
			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<TfiAnnouncement className="me-2 fs-5" />New Annoucement</button> 
			<button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
				<IoMdStats className="me-2 fs-5" />New Analytics</button> 
				</>
			)} 
    </div>
);}
