
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CameraIcon from '@material-ui/icons/PhotoCamera';

import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import useStyle from './style';


function UserAccount(props) {
    const { profile } = props
    console.log('profile', profile)
    const [editMode, setEditMode] = useState(false);

    const classes = useStyle();

    return (
        <div className={`${classes.wrap} container flex-center`}>
            <div className={classes.root}>
            <div className="flex-center w-100 h-100">
                <div className={classes.avtWrap}>
                <img
                    className={`${classes.avt} w-100 h-100`}
                    src="https://firebasestorage.googleapis.com/v0/b/tuvungtienghanthaytu-2f56b.appspot.com/o/blank-profile-picture-973460__340.webp?alt=media&token=951b0070-8a51-4493-962b-7081b8eaad78"
                    alt="Avatar Photo"
                />

                <div className={`${classes.cameraIconWrap} flex-center`}>
                    <CameraIcon className={classes.cameraIcon} />

                    
                </div>
                </div>
            </div>

            {!editMode && (
                <div className="mt-8">
                    <h2 className={classes.name}>{profile.name}</h2>
                    <h2 className={classes.username}>Phone: {profile.phone}</h2>
                    <h2 className={classes.username}>Email: {profile.email}</h2>
                </div>
            ) }

            <div className={classes.info}>
                
            </div>
            {!editMode ? (
                <Button
                onClick={() => setEditMode(true)}
                className={`${classes.editBtn} _btn _btn-primary w-100`}
                startIcon={<EditIcon />}>
                Chỉnh sửa
                </Button>
            ) : (
                <div className="d-flex w-100">

                </div>
            )}
            </div>
        </div>
    )
}




export default UserAccount;
