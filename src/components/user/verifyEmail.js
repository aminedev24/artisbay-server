import { useEffect, useState } from "react";
import "../../css/components/emailConfirmation.css"; // Import CSS file

const VerifyEmail = () => {
  const [status, setStatus] = useState({ loading: true, message: "" });

  const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost/artisbay-server/server"
    : "/server";

    useEffect(() => {
        const params = new URLSearchParams(
          window.location.search || window.location.hash.split("?")[1]
        );
        const token = params.get("token");
      
        console.log("Extracted Token:", token);
      
        if (!token) {
          setStatus({ loading: false, message: "Invalid verification link." });
          return;
        }
      
        const requestUrl = `${apiUrl}/verifyEmail.php?token=${token}`;
        console.log("Fetching from URL:", requestUrl);
      
        fetch(requestUrl)
          .then((res) => {
            console.log("Response Status:", res.status);
            return res.json();
          })
          .then((data) => {
            console.log("Response Data:", data);
            setStatus({ loading: false, message: data.message });
          })
          .catch((error) => {
            console.error("Fetch Error:", error);
            setStatus({ loading: false, message: "An error occurred. Please try again." });
          });
      }, []);
      

  return (
    <div className="verify-email-container">
      <h2 className="verify-email-title">Email Verification</h2>
      {status.loading ? (
        <p className="verify-email-message">Verifying...</p>
      ) : (
        <p className={`verify-email-message ${status.message.includes("success") ? "verify-email-success" : "verify-email-error"}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
