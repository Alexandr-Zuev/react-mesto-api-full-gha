import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip';

const Register = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  const [infoTooltip, setinfoTooltip] = useState({ isOpen: false, state: 'fail' });

  const handleChange = e => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    auth.signUp(formValue.email, formValue.password).then(res => {
      if (res.data) {
        setinfoTooltip({ isOpen: true, state: 'success' });
        setFormValue({
          email: '',
          password: ''
        });
      } else {
        setinfoTooltip({ isOpen: true, state: 'fail' });
      }
    });
  };

  const handleCloseInfoTooltip = () => {
    setinfoTooltip({ isOpen: false, state: 'fail' });
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          className="register__input"
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="register__input"
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <button className="register__submitbtn" type="submit">
          Зарегистрироваться
        </button>
        <p className="register__span">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__link">
            Войти
          </Link>
        </p>
      </form>
      <InfoTooltip
        onClose={handleCloseInfoTooltip}
        isOpen={infoTooltip.isOpen}
        state={infoTooltip.state}
      />
    </div>
  );
};

export default Register;
