import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const { user } = useSelector((store) => store.auth);

  if (user) {
    return <Navigate replace to="/" />;
  }

  return children;
}

export default AuthRoute;
