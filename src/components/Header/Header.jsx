import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";

import css from './Header.module.css';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const location = useLocation();

    const isActiveRoute = (route) => {
        return location.pathname === route;
      };

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

                <Link className={css.fav} to="/favorites">
                    <span>Favorites</span>
                </Link>

                <div className={css.buttons}>
                    {isAuth ? (
                        <>
                            <Link to="/add-recipe">
                                <button className={css.button_add}>Write the recipe</button>
                            </Link>
                            <button onClick={onClickLogOut} className={css.button_error} >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className={isActiveRoute('/login') ? `${css.button_contained} ${css.active}` : css.button_contained}>Log In</button>
                            </Link>
                            <Link to="/register">
                                <button className={isActiveRoute('/register') ? `${css.button_contained} ${css.active}` : css.button_contained}>Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};