import React from 'react';

const UserProfile = ({
  handleSubmit,
  handleChange,
  username,
  loading,
  email,
  about,
  createdAt,
  updatedAt,
  name
}) => (
  <form className="col-md-12" onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        className="form-control"
        placeholder="Username"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        className="form-control"
        placeholder="Name"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className="form-control"
        placeholder="Email"
        disabled
      />
    </div>
    <div className="form-group">
      <label>About</label>
      <textarea
        name="about"
        value={about}
        onChange={handleChange}
        className="form-control"
        placeholder="About"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label>Created</label>
      <input
        type="text"
        name="createdAt"
        value={createdAt}
        onChange={handleChange}
        className="form-control"
        placeholder="Created"
        disabled
      />
    </div>
    <div className="form-group">
      <label>Last Updated</label>
      <input
        type="text"
        name="updatedAt"
        value={updatedAt}
        onChange={handleChange}
        className="form-control"
        placeholder="Last Updated"
        disabled
      />
    </div>
    <button
      type="submit"
      className="btn btn-primary"
      disabled={!email || loading}
    >
      Submit
    </button>
  </form>
);

export default UserProfile;
