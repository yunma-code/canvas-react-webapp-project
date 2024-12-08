import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editAssignment, updateAssignment } from "./reducer";

export default function AssignmentPreview() {
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { aid } = useParams();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const assignment = assignments.find((assignment: any) => assignment._id === aid)
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    let hasEditAccess = currentUser.role === "FACULTY";
    const submit = ()=>{
    }
    const edit = () => {
        navigate(pathname +"/Edit");
    }

    return (
        <div id="wd-assignments-preview">
            <table className="assignment-table">
                <tr>
                    <td width="20%" valign="top">
                        <label htmlFor="wd-name">Assignment Name</label><br />
                    </td>
                    <td>
                        <label htmlFor="wd-name">{assignment.title}</label><br />
                    </td>
                </tr>
                <tr>
                    <td width="20%" valign="top">
                        <label htmlFor="wd-description">Description</label><br />
                    </td>
                    <td>
                        <p id="wd-description" className="form-control">
                            {assignment?.description}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <label id="wd-points"  >{assignment?.points}</label>
                    </td>
                </tr>
                <tr>
                    <td valign="top">
                        <label htmlFor="wd-submission-type" >Submission Type</label>
                    </td>
                    <td >
                        <div >
                            <label htmlFor="wd-submission-type" >{assignment?.type}</label>
                        </div>
                    </td >
                </tr >
                <br />
                <tr>
                    <td>
                        <label>Due</label><br />
                    </td>
                    <td>
                        <label>{assignment.due ? new Date(assignment.due).toLocaleString() : "N/A"}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Available From</label><br />
                    </td>
                    <td>
                        <label>{assignment.available ? new Date(assignment.available).toLocaleString() : "N/A"} </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Until</label><br />
                    </td>
                    <td>
                        <label>{assignment.until ? new Date(assignment.until).toLocaleString() : "N/A"} </label>
                    </td>

                </tr>


            </table >
            <hr />
            {hasEditAccess ?
                <button className="btn btn-danger me-2" onClick={edit} style={{ float: "right" }}>Edit</button>
                :
                <button className="btn btn-danger me-2" onClick={submit} style={{ float: "right" }}>Submit Assignment</button>
            }


        </div >
    );
}
