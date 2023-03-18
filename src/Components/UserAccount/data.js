
import React, { useEffect, useState } from 'react';

import UserAccount from '.';

function UserAccountData(props) {
    const { profile } = props

    return (
        <UserAccount
        profile={profile}
        />
    );
}

export default UserAccountData;
