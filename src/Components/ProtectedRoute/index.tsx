import { Navigate } from "react-router-dom";

interface Props {
    children: any;
    user: string | undefined;
}
const ProtectedRoute = ({ user, children }:Props) => {
    if (!user || user === '') {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;