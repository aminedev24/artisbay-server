import React, { useState, useEffect, useRef } from 'react';

const AgreementForm = ({ agreementType, agreementContent }) => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-server/server'
      : '/server';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    terms: false,
    agreementType: agreementType,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyAgreed, setAlreadyAgreed] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  // This ref helps ensure we only update state if the component is still mounted.
  const isMountedRef = useRef(true);

  // Fetch both user data and agreement status, using the provided AbortController signal.
  const fetchUserData = async (signal) => {
    try {
      console.log('Fetching user data and agreement status for:', agreementType);

      // Fetch user profile data
      const response = await fetch(`${apiUrl}/profile.php`, {
        method: 'GET',
        credentials: 'include',
        signal,
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (isMountedRef.current) {
        setFormData((prev) => ({
          ...prev,
          fullName: data.full_name,
          email: data.email,
        }));
        setIsFetched(true);
      }

      // Fetch agreement status
      const agreementResponse = await fetch(
        `${apiUrl}/checkAgreement.php?agreementType=${encodeURIComponent(agreementType)}`,
        { method: 'GET', credentials: 'include', signal }
      );
      const agreementData = await agreementResponse.json();
      console.log('Agreement API response:', agreementData);
      if (isMountedRef.current) {
        // Ensure the API returns a boolean by checking for true
        setAlreadyAgreed(agreementData.already_agreed === true);
      }
    } catch (error) {
      // Ignore abort errors so we don't trigger an error state when cancelling.
      if (error.name === 'AbortError') {
        console.log('Fetch Aborted');
        return;
      }
      if (isMountedRef.current) {
        console.error('Error fetching user data or agreement status:', error);
        setError(error.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    setLoading(true);

    // Create an AbortController for this effect
    const controller = new AbortController();
    fetchUserData(controller.signal);

    return () => {
      // Abort any pending fetches on cleanup and mark the component as unmounted.
      controller.abort();
      isMountedRef.current = false;
    };
  }, [agreementType]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      agreementType,
      agreementContent,
    };

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
    } catch (error) {
      setError('An error occurred while submitting the form.');
      console.log('Error: ' + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

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
