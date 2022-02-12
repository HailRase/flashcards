import React from 'react';
type PreloaderPropsType = {
    className?:string
}
const Preloader: React.FC<PreloaderPropsType> = ({className}) => {
    return <div className={className}>
        <img src={"https://i.gifer.com/ZKZg.gif"} alt=""/>
    </div>


};

export default Preloader;