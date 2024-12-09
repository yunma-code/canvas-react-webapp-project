import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
<<<<<<< HEAD
export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser) {
=======

export default function ProtectedRoute({ 
	children, userRole, requiredRole }: 
	{ children: any; userRole?: string; requiredRole?: string  }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser && (!requiredRole || userRole === requiredRole)) {
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
    return children;
  } else {
    return <Navigate to="/Kanbas/Account/Signin" />;
}}
