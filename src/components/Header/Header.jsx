import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";

import css from './Header.module.css';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const onClickLogOut = () => {
        if (window.confirm('Are you sure you want to log?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    return (
        <div className={css.root}>
            <div className={css.inner}>
                <Link className={css.logo} to="/">
                    <span>DAILY RECIPE</span>
                </Link>
                <div className={css.buttons}>
                    {isAuth ? (
                        <>
                            <button onClick={onClickLogOut} className={css.button_error} >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button>Log In</button>
                            </Link>
                            <Link to="/register">
                                <button>Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};