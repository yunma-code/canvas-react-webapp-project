import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ 
	children, userRole, requiredRole }: 
	{ children: any; userRole?: string; requiredRole?: string  }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && (!requiredRole || userRole === requiredRole)) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Account/Signin" />;
}}
