import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControls() {
  
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
      

      <button id="wd-add-assignment-group" style={{ marginLeft: "10px"}} 
        className="btn btn-lg bg-assignment me-1">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
        Group</button>

      <button id="wd-add-assignment" style={{ marginLeft: "5px"}}
        className="btn btn-lg btn-danger me-1">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
        Assignment</button>
      
    </div>
);}
