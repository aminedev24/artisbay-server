import React, { useState } from "react";
import CountryList from "./countryList";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ setIsModalOpen, setModalType }) => {
  // Track the current step: 1 = name/email, 2 = verification, 3 = full form
  const [step, setStep] = useState(1);
  
  // Step 1 states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  
  // Step 2: Verification code state
  const [verificationCode, setVerificationCode] = useState("");

  // Step 3: Additional form fields
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [address, setAddress] = useState("");

  // General message and error handling
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Password strength handling
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordCriteriaMet, setPasswordCriteriaMet] = useState({ criteriaMet: 0, totalCriteria: 5 });

  const navigate = useNavigate();
  
  // Set your API URL (for demo purposes)
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server-clean/server"
      : "/server";

  // --- Step 1: Send confirmation email ---
  const sendEmailConfirmation = async () => {
    // In a real-world scenario, you would call an API to send a confirmation email.
    // For this demo, we simulate the process.
    setMessage("Confirmation email sent. Please check your email for your code.");
    setIsError(false);
    setStep(2);
  };

  // --- Step 2: Verify the email code ---
  const verifyEmail = async () => {
    // For demonstration, assume the correct code is "123456"
    if (verificationCode === "123456") {
      setMessage("Email verified successfully!");
      setIsError(false);
      setStep(3);
    } else {
      setMessage("Invalid verification code. Please try again.");
      setIsError(true);
    }
  };

  // --- Common Handlers ---
  const handleCountryChange = (event) => {
    const country = CountryList().find((c) => c.label === event.target.value);
    setSelectedCountry(event.target.value);
    setPhoneCode(country ? country.countryCode : "");
  };

  const handleInputChange = (setter, event) => {
    setter(event.target.value);
  };

  // Evaluate password strength
  const evaluatePasswordStrength = (password) => {
    let strength = "Weak";
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);

    const criteriaMet = [lengthCriteria, numberCriteria, specialCharCriteria, uppercaseCriteria, lowercaseCriteria]
      .filter(Boolean).length;

    if (criteriaMet >= 4) {
      strength = "Strong";
    } else if (criteriaMet === 3) {
      strength = "Medium";
    }
    return { strength, criteriaMet, totalCriteria: 5 };
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    const { strength, criteriaMet, totalCriteria } = evaluatePasswordStrength(newPassword);
    setPassword(newPassword);
    setPasswordStrength(strength);
    setPasswordCriteriaMet({ criteriaMet, totalCriteria });
  };

  // --- Final Signup Submission (Step 3) ---
  const handleSignup = async (event) => {
    event.preventDefault();

    // Basic validations for password and terms acceptance
    if (passwordStrength === "Weak") {
      setMessage("Your password is too weak. Please choose a stronger password.");
      setIsError(true);
      return;
    }

    if (!agreeToTerms) {
      setMessage("You must agree to the terms and conditions.");
      setIsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    setMessage("Signing up...");
    setIsError(false);

    // Include phone code if needed
    let fullPhoneNumber = phone;
    if (!fullPhoneNumber.startsWith(phoneCode)) {
      fullPhoneNumber = `${phoneCode} ${phone}`.trim();
    }

    const formData = {
      "full-name": fullName,
      email,
      password,
      country: selectedCountry,
      phone: fullPhoneNumber,
      company,
      address
    };

    try {
      const response = await fetch(`${apiUrl}/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setMessage(`Signup failed: ${result.error}`);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
      setIsError(true);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={step === 3 ? handleSignup : undefined}>
        {/* Step 1: Name & Email */}
        {step === 1 && (
          <div className="step1">
            <div className="input-group">
              <input
                type="text"
                value={fullName}
                onChange={(e) => handleInputChange(setFullName, e)}
                required
                placeholder="Your name"
              />
              <label>
                Full Name <span className="required">*</span>
              </label>
            </div>
            <div className="input-group">
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => handleInputChange(setEmail, e)}
                required
              />
              <label>
                Email <span className="required">*</span>
              </label>
            </div>
            <button type="button" onClick={sendEmailConfirmation}>
              Send Confirmation Email
            </button>
          </div>
        )}

        {/* Step 2: Email Verification */}
        {step === 2 && (
          <div className="step2">
            <div className="input-group">
              <input
                type="text"
                value={verificationCode}
                placeholder="Enter Verification Code"
                onChange={(e) => handleInputChange(setVerificationCode, e)}
                required
              />
              <label>
                Verification Code <span className="required">*</span>
              </label>
            </div>
            <button type="button" onClick={verifyEmail}>
              Verify Email
            </button>
            {message && (
              <div className={`message ${isError ? "error" : "success"}`}>
                {message}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Complete Form */}
        {step === 3 && (
          <>
            <div className="input-group phone-number-group">
              {phoneCode && <span className="phone-code">{phoneCode}</span>}
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => handleInputChange(setPhone, e)}
                required
                placeholder="Phone Number"
                className={phoneCode ? "shrink" : ""}
              />
              <label>
                Phone Number <span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <select
                id="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                name="country"
                className={selectedCountry ? "not-empty" : ""}
                required
              >
                <option value="">Select Country</option>
                {CountryList()
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((country) => (
                    <option key={country.code} value={country.label}>
                      {country.label}
                    </option>
                  ))}
              </select>
              <label className="country-label">
                Country <span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Address (e.g., City)"
                name="address"
                value={address}
                required
                onChange={(e) => handleInputChange(setAddress, e)}
              />
              <label>
                Address <span className="required">*</span>
              </label>
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Company"
                name="company"
                value={company}
                onChange={(e) => handleInputChange(setCompany, e)}
              />
              <label>Company</label>
            </div>

            <div className="input-group password">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                required
              />
              <label>
                Password <span className="required">*</span>
              </label>
              {password && <div className="password-strength">Strength: {passwordStrength}</div>}
            </div>

            <div className="password-criteria">
              <ul>
                <li className={password.length >= 8 ? "green" : "red"}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(password) ? "green" : "red"}>
                  Contains an uppercase letter
                </li>
                <li className={/[a-z]/.test(password) ? "green" : "red"}>
                  Contains a lowercase letter
                </li>
                <li className={/[0-9]/.test(password) ? "green" : "red"}>
                  Contains a number
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "green" : "red"}>
                  Contains a special character
                </li>
              </ul>
            </div>

            <div className="input-group confirm-password">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => handleInputChange(setConfirmPassword, e)}
                required
              />
              <label>
                Confirm Password <span className="required">*</span>
              </label>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agree-to-terms"
                checked={agreeToTerms}
                required
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <label htmlFor="agree-to-terms">
                I agree to the{" "}
                <span
                  className="terms-highlight"
                  onClick={() => {
                    setModalType("terms");
                    setIsModalOpen(true);
                  }}
                >
                  Terms & Conditions
                </span>{" "}
                and the{" "}
                <span
                  className="terms-highlight"
                  onClick={() => {
                    setModalType("privacy");
                    setIsModalOpen(true);
                  }}
                >
                  Privacy Policy
                </span>
              </label>
            </div>

            {message && (
              <div className={`message ${isError ? "error" : "success"}`}>
                {message}
              </div>
            )}

            <button type="submit">Sign Up</button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
