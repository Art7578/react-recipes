import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import css from "../Registration/Registration.module.css";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      alert('Failed to login!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Authorization</h2>
      <div className={css.formContainer}>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.label}>
            E-Mail
            <input
              type="email"
              {...register('email', {required: 'Enter your email'})}
              className={css.input}
            />
            {errors.email && <span className={css.error}>{errors.email.message}</span>}
          </label>
          <label className={css.label}>
            Password
            <input
              type="password"
              {...register('password', {required: 'Enter your password'})}
              className={css.input}
            />
            {errors.password && <span className={css.error}>{errors.password.message}</span>}
          </label>
          <button disabled={!isValid} type="submit" className={css.button}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};