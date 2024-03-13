import React from 'react';
import css from './UserInfo.module.css'; 

export const UserInfo = ({ fullName, additionalText }) => {

  return (
    <div className={css.root}>
      <div className={css.userDetails}>
        <span className={css.userName}>{fullName}</span>
        <span className={css.additional}>{additionalText}</span>
      </div>
    </div>
  );
};