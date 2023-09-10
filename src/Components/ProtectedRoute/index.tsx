import { Navigate } from "react-router-dom";

interface Props {
    children: any;
    company: string | undefined;
}
const ProtectedRoute = ({ company, children }:Props) => {
    if (!company || company === '') {
      return <Navigate to="/login" replace />;
    }
  
    return children;
};

export default ProtectedRoute;