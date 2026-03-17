import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requireRecruiter = false }) {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  if (requireRecruiter && user.role !== "recruiter") {
    return <Navigate replace to="/" />;
  }

  return children;
}

export default ProtectedRoute;
