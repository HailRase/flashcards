import React from 'react';
import {useAppSelector} from "../../s1-main/m2-bll/store";


const Profile = () => {
    const profileData = useAppSelector(state => state.auth.userData)

    return (
        <div>
            <div> {profileData._id}</div>
            <div> {profileData.name}</div>
            <div> {profileData.email}</div>
            <div> {profileData.avatar}</div>
            <div> {profileData.publicCardPacksCount}</div>
            <h1>PROFILE PAGE!</h1>
        </div>
    );
};

export default Profile;