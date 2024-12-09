import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
<<<<<<< HEAD

export default function AssignmentControls() {
=======
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useNavigate } from "react-router";

export default function AssignmentControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const user = db.users.find((user: any) => user.username === currentUser?.username);
  const userRole = user ? user.role : null;

  const { cid } = useParams();
  const navigate = useNavigate();
  const handleAddAssignmentClick = () => {
    if(cid) {
      navigate(`/Kanbas/Courses/${cid}/Assignments/Editor/NewAssignment`); 
    }
  };
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
  
  return (
    <div id="wd-assignments">
      <div style={{ position: "relative", display: "inline-block"}}>
        <CiSearch style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#888",
            fontSize: "20px",
          }}/>
        <input id="wd-search-assignment"
        placeholder="Search..." style={{
          paddingLeft: "35px", 
          paddingRight: "10px",
          height: "35px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}/>
      </div>
      
<<<<<<< HEAD

=======
      {userRole === "FACULTY" && (
        <>
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
      <button id="wd-add-assignment-group" style={{ marginLeft: "10px"}} 
        className="btn btn-lg bg-assignment me-1">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
        Group</button>

      <button id="wd-add-assignment" style={{ marginLeft: "5px"}}
<<<<<<< HEAD
        className="btn btn-lg btn-danger me-1">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
        Assignment</button>
=======
        className="btn btn-lg btn-danger me-1"
        onClick={handleAddAssignmentClick}>
          
        <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
        Assignment</button>
        </>
      )}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
      
    </div>
);}
