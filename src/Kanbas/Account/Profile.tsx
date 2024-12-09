import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
<<<<<<< HEAD
=======
import * as client from "./client";

>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
<<<<<<< HEAD
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = () => {
=======
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if(!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
<<<<<<< HEAD
          <input defaultValue={profile.username} id="wd-username" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <input defaultValue={profile.password} id="wd-password" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
          <input defaultValue={profile.firstName} id="wd-firstname" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
          <input defaultValue={profile.lastName} id="wd-lastname" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
          <input defaultValue={profile.dob} id="wd-dob" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
          <input defaultValue={profile.email} id="wd-email" className="form-control mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-2" id="wd-role" value={profile.role}>
            <option value="USER">User</option>            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
          </select>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
          </button>
        </div>
      )}
    </div>);
}

=======
      <input defaultValue={profile.username} id="wd-username"
        placeholder="username" className="form-control mb-2"
        onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
      <input defaultValue={profile.password} id="wd-password" 
        placeholder="password" type="password" className="form-control mb-2"
        onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
      <input defaultValue={profile.firstName} id="wd-firstname"
        placeholder="First Name" className="form-control mb-2"
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
      <input defaultValue={profile.lastName} id="wd-lastname" 
        placeholder="Last Name" className="form-control mb-2"
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
      <input defaultValue={profile.dob} id="wd-dob" type="date"
        className="form-control mb-2"
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })} />
      <input defaultValue={profile.email} id="wd-email" 
        type="email" className="form-control mb-2" 
        onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
      <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        id="wd-role" className="form-control mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
      <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">Sign out</button>
    </div>
      )}
    </div>
);}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
