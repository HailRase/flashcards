import React from 'react';
import {useAppSelector} from "../../s1-main/m2-bll/store";
import {Navigate} from "react-router-dom";


const Profile = () => {
    const {userData, isAuth} = useAppSelector(state => state.auth)
    if (!isAuth){
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <div> {userData?._id}</div>
            <div> {userData?.name}</div>
            <div> {userData?.email}</div>
            <div> {userData?.avatar}</div>
            <div> {userData?.publicCardPacksCount}</div>
            <h1>PROFILE PAGE!</h1>
        </div>
    );
};

export default Profile;