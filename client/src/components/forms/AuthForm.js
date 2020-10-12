import React from 'react';

const AuthForm = ({ email, password = '', loading, setEmail, setPassword, handleSubmit, googleLogin, showPasswordInput = false, changeEmail = true }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        type="email"
        value={email}
        placeholder="Enter Email"
        disabled={loading || !changeEmail}
      />
    </div>

    {
      showPasswordInput && (
        <div className="form-group">
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            value={password}
            placeholder="Enter Password"
            disabled={loading}
          />
        </div>
      )
    }

    <button
      className="btn btn-raised btn-primary"
      disabled={!email || loading}
    >
      Submit
    </button>
    <button
      onClick={googleLogin}
      className="btn btn-raised btn-danger ml-1"
    >
      Login With Google
    </button>
  </form>
);

export default AuthForm;