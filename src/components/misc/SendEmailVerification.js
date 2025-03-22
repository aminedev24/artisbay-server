import { useState } from "react";
import '../../css/components/emailConfirmation.css';

const SendEmailVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-backup/server"
      : "/server";

  const sendVerificationEmail = async () => {
    setMessage("Sending...");

    try {
      const response = await fetch(`${apiUrl}/send-email-verification.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error sending verification email. Please try again.");
    }
  };

  return (
    <div className="send-email-container">
        <h2 className="send-email-title">Send Verification Email</h2>
        <input
            className="send-email-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <button className="send-email-button" onClick={sendVerificationEmail} disabled={loading}>
            {loading ? "Sending..." : "Send Verification"}
        </button>
        {message && (
            <p className={`send-email-message ${message.includes("Error") ? "send-email-error" : "send-email-success"}`}>
            {message}
            </p>
        )}
        </div>
  );
};

export default SendEmailVerification;
