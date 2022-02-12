import React, {CSSProperties} from 'react';
import spinner from '../../../../assets/spinner.gif'

type PreloaderPropsType = {
    className?: string
}

const spinnerStyle: CSSProperties = {
    width: "100px",
    height: "100px",
    margin: "24px"
}

const containerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center"
}

const Preloader: React.FC<PreloaderPropsType> = ({className}) => {
    return <div className={className} style={containerStyle}>
        <img src={spinner} alt="loading animation" style={spinnerStyle}/>
    </div>


};

export default Preloader;