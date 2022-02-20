import React from 'react';
import {useAppSelector} from "../../s1-main/m2-bll/store";
import searchIcon from "../../assets/search_icon.png";

import s from './Profile.module.css'

const Profile = () => {

    const {userData, isAuth} = useAppSelector(state => state.auth)
    
    // if (!isAuth){
    //     return <Navigate to={'/login'}/>
    // }

    // userData?._id .name .email .avatar .publicCardPacksCount 

    return <div className={s.container}>
        <ProfileSidebar/>
        <main className={s.main}>
            <ProfileHeader/>
            {/* <ProfileTable/>
            {maxPageNumber > 1 && <Pagination currentPage={filter.page}
                         maxPage={maxPageNumber}
                         onChange={onPageChange}
                         itemsPerPage={itemsPerPage}/>} */}
        </main>
    </div>
};
export default Profile;

const ProfileSidebar = () => {
    return (
    <div className={s.profileSidebar}>
        <div className={s.profileInfo}>
            <img src="https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png" />
            <div className={s.profileName}>Name Name</div>
            <div className={s.profileWork}>Front-end developer</div>
            <button>Edit profile</button>
        </div>

        <div className={''}>
            <div className={s.title}>Number of cards</div>
            <br/>
            <span>4---------100</span>
        </div>
    </div>)
};

const ProfileHeader = () => {
    return (
    <div className={''}>
        <h2>My packs list</h2>
            <div className={s.search_container}>
                <img src={searchIcon} />
                <input className={s.input} type="text" /*value={searchValue} onChange={onSearchChange}*/ name="search"
                       placeholder="Search..."/>
            </div>
    </div>)
};