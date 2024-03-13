import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import css from './Registration.module.css';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, 
    handleSubmit,  
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      alert('Failed to register!');
    }
    
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/"/>
  }
  
  return (
    <div className={css.container}>
      <h2 className={css.title}>Account Creation</h2>
      <div className={css.formContainer}>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={css.label}>
            Full name
            <input
              type="text"
              {...register('fullName', {required: 'Enter your fullName'})}
              className={css.input}
            />
            {errors.fullName && <span className={css.error}>{errors.fullName.message}</span>}
          </label>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};