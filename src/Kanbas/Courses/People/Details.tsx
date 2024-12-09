import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
export default function PeopleDetails() {
  const { uid}  = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
	const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

	const [email, setEmail] = useState("");
	const [editingEmail, setEditingEmail] = useState(false);

	const [role, setRole] = useState("");
	const[editingRole, setEditingRole] = useState(false);

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };
	
	const saveEmail = async () => {
		const userId = uid || "";
		await client.updateEmail(userId , email);
		setUser({...user, email});
		setEditingEmail(false);
	};

	const saveRole = async () => {
		const userId = uid || "";
		await client.updateRole(userId, role);
		setUser({ ...user, role });
		setEditingRole(false);
	}

	const deleteUser = async (uid: string) => {
		await client.deleteUser(uid);
		navigate(-1);
	};
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;


  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4 wd-name"> 
			{!editing && (
          <FaPencil onClick={() => setEditing(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
			{editing && (
				<FaCheck onClick={() => saveUser()}
						className="float-end fs-5 mt-2 me-2 wd-save" /> )}
			{!editing && (
				<div className="wd-name"
							onClick={() => setEditing(true)}>	
					{user.firstName} {user.lastName} </div>)}
			{user && editing && (
				<input className="form-control w-50 wd-edit-name"
					defaultValue={`${user.firstName} ${user.lastName}`}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") { saveUser(); }}}/>)}
			</div>
			{/* update email */}
			<b>Email: </b>
      {!editingEmail && (
        <span className="wd-email">
          {user.email}
          <FaPencil
            onClick={() => setEditingEmail(true)}
            className="float-end fs-5 wd-edit"
          />
        </span>
      )}
      {editingEmail && (
        <div className="d-flex align-items-center">
          <input
            className="form-control w-50 wd-edit-email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveEmail(); }}} />
          <FaCheck
            onClick={() => saveEmail()}
            className="ms-2 fs-5 wd-save"
          />
        </div>
      )}<br/>
			{/* update role */}
			<div className="d-flex align-items-center">
  <b>Roles: </b>
  {!editingRole ? (
    <>
      <span className="ms-2">{user.role}</span>
      <FaPencil
        onClick={() => setEditingRole(true)}
        className="ms-auto fs-5 wd-edit"
      />
    </>
  ) : (
    <div className="d-flex align-items-center ms-2">
      <select value={role} onChange={(e) => setRole(e.target.value)}
        className="form-select w-auto">
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <FaCheck
        onClick={() => saveRole()}
        className="ms-2 fs-5 wd-save"
      /></div>
			)}
		</div>

      <br/>
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
			<hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
			</div>
	); }

