// AgreementForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import useAgreementStatus from '../utilities/agreementStatus';

const AgreementForm = ({ agreementType, agreementContent , setSuppressHighlight }) => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    terms: false,
    agreementType,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  // Use our custom hook to get the agreement status.
  const { alreadyAgreed, loading } = useAgreementStatus(agreementType, apiUrl);

  // You can still fetch user profile data separately if needed.
  const isMountedRef = useRef(true);
  const fetchUserData = async (signal) => {
    try {
      const response = await fetch(`${apiUrl}/profile.php`, {
        method: 'GET',
        credentials: 'include',
        signal,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (isMountedRef.current) {
        setFormData((prev) => ({
          ...prev,
          fullName: data.full_name,
          email: data.email,
        }));
        setIsFetched(true);
      }
    } catch (err) {
      if (err.name !== 'AbortError' && isMountedRef.current) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    const controller = new AbortController();
    fetchUserData(controller.signal);
    return () => {
      controller.abort();
      isMountedRef.current = false;
    };
  }, [apiUrl]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = { ...formData, agreementType, agreementContent };

    try {
      const response = await fetch(`${apiUrl}/submitAgreement.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(submissionData),
        credentials: 'include',
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred while submitting the form.');
      }
    } catch (err) {
      setError('An error occurred while submitting the form.');
    }
  };

  //console.log(agreementType)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-agreement-container">
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            readOnly={isFetched}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={isFetched}
            required
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={alreadyAgreed || formData.terms}
            onChange={handleChange}
            disabled={alreadyAgreed || isSubmitted}
            required
          />
          I agree to the {agreementType}
        </label>
        {!alreadyAgreed && (
          <button type="submit" disabled={isSubmitted}>
            Submit
          </button>
        )}
      </form>
      {alreadyAgreed && (
        <p className="success">
          You have already agreed to the {agreementType}.
        </p>
      )}
      {isSubmitted && !alreadyAgreed && (
        <p className="success">
          Thank you for agreeing to the {agreementType}.
        </p>
      )}
    </div>
  );
};

export default React.memo(AgreementForm);
