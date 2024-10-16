import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const location = useLocation();

  const isActive = (path: string) : string => {
    return location.pathname.startsWith(path) ? "active" : "text-danger";
  };
  
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        to={`/Kanbas/Account/Signin`}
        className={`list-group-item border-0 ${isActive("/Kanbas/Account/Signin")}`}
      >
        Signin
      </Link>
      <Link
        to={`/Kanbas/Account/Signup`}
        className={`list-group-item border-0 ${isActive("/Kanbas/Account/Signup")}`}
      >
        Signup
      </Link>
      <Link
        to={`/Kanbas/Account/Profile`}
        className={`list-group-item border-0 ${isActive("/Kanbas/Account/Profile")}`}
      >
        Profile
      </Link>
    </div>
  );
}
