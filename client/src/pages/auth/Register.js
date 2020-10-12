import React, { useState } from "react";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";

import AuthForm from '../../components/forms/AuthForm';

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    window.localStorage.setItem("emailForRegistration", email);

    toast.success(
      `An email has been sent to ${email}. Please click the link to complete your registration.`,
      {
        autoClose: false,
      }
    );

    setEmail("");
    setLoading(false);
  };

  return (
    <div className="container p-5">
      <h4>{loading ? "Loading..." : "Register"}</h4>
      <AuthForm 
        email={ email } 
        loading={ loading } 
        setEmail={ setEmail } 
        handleSubmit={ handleSubmit } 
      />
    </div>
  );
};

export default Register;
