import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth.js';

  const Login = ({handleLogin, setEmail}) => {
    const [formValue, setFormValue] = useState({
      email: '',
      password: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormValue({
        ...formValue,
        [name]: value
      });
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formValue.email || !formValue.password) {
        return;
      }
      auth.signIn (formValue.email, formValue.password)
        .then((res) => {
          if (res.token) {
            setFormValue({ email: '', password: '' });
            handleLogin();
            setEmail(formValue.email);
            navigate('/main', { replace: true });
          }
        })
        .catch(err => console.log(err));
    }

    return (
      <div className="register">
        <form className="register__form" onSubmit={handleSubmit}>
          <h2 className="register__title">Вход</h2>
          <input className="register__input"
            type="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            placeholder="Email"
            required />
          <input className="register__input"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            placeholder="Пароль"
            required />
          <button className="register__submitbtn" type="submit">
            Войти
          </button>
        </form>
      </div>
    )
  }

  export default Login;
