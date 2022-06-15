import React from 'react';
import './Login.css';

function Login({ onLogin }) {

  const [ values, setValues ] = React.useState({ email: '', password: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    setValues(values);
    onLogin(values);
  }

  return (

    <div className="login-container">
      <div className="login-logo">LOGO</div>
      <h1 className="login-title">IVOverflow</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-input-label" htmlFor="email">Email:</label>
        <input className="login-input" id="email" type="email" name="email" autoComplete="useremail" onChange={handleChange} required></input>
        <label className="login-input-label" htmlFor="password">Password:</label>
        <input className="login-input" id="password" type="password" name="password" autoComplete="current-password" onChange={handleChange} required></input>
        <button className="login-submit" type="submit">Login</button>
      </form>
    </div>
    
  );
}

export default Login;
