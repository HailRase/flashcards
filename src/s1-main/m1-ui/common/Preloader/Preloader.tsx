import React from 'react';
import spinner from '../../../../assets/spinner.gif'

type PreloaderPropsType = {
    className?:string
}
const Preloader: React.FC<PreloaderPropsType> = ({className}) => {
    return <div className={className}>
        <img src={spinner} alt="loading animation"/>
    </div>


};

export default Preloader;