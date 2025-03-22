// AgreementForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import useAgreementStatus from '../utilities/agreementStatus';
import { useUser } from "../user/userContext";
import Modal from "../common/alertModal";

const AgreementForm = ({ agreementType, agreementContent , setSuppressHighlight }) => {
  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost/artisbay-backup/server'
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

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");  // Could be 'alert', 'confirmation', or 'clear_all'
  
  const showAlert = (message, type = "alert") => {
    setTimeout(() => {
      setModalMessage(message);
      setModalType(type);
      setShowModal(true);
    }, 1000); // Delay for 1 second
  };


  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { user } = useUser();

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
    if (user?.isImpersonating) {
      showAlert(`you can\'t accepct the ${agreementType} on behalf the user.`)
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/submitAgreement.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(submissionData),
        credentials: 'include',
      });
      if (response.ok) {
        setIsSubmitted(true);
        // Reload the page after 3 seconds (3000 milliseconds)
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
      {showModal && (
      <Modal
        message={modalMessage}
        onClose={handleCloseModal}
        type={modalType}
      />
       )}

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
            disabled={alreadyAgreed || isSubmitted || user?.isImpersonating}
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
