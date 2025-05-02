import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AuthSuccess() {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    console.log("Logged in user email from Google:", email);
    // You can now send this to your backend to generate token or display
  }, [location]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Google Login Successful!</h1>
      <p>Redirecting or processing your account...</p>
    </div>
  );
}

export default AuthSuccess;
