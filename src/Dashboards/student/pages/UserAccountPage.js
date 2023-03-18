
import React from 'react';
import UserAccountData from '../../../Components/UserAccount/data';
import useTitle from '../../../Hooks/useTitle';

function UserAccountPage(props) {
  useTitle('Quản lý tài khoản');
  const { profile } = props
  return <UserAccountData profile={profile}/>;
}

export default UserAccountPage;

