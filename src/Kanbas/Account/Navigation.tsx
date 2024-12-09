import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  
  const location = useLocation();

  const isActive = (path: string) : string => {
    return location.pathname.startsWith(path) ? "active" : "text-danger";
  };

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {!currentUser && (
        <>
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
      </>
      )}
      {currentUser && (
        
      <Link
        to={`/Kanbas/Account/Profile`}
        className={`list-group-item border-0 ${isActive("/Kanbas/Account/Profile")}`}
      >
        Profile
      </Link>
<<<<<<< HEAD
    )}
    </div>
  );
}
=======
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
        to={`/Kanbas/Account/Users`}
        className={`list-group-item ${isActive("Users")}`}
      > 
        Users
      </Link>
      )}
    </div>
  );
}
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
