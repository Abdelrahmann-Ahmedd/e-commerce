import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

function Loading() {
    return (
        <div className=' vh-100 d-flex justify-content-center align-items-center'>
            <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </div>
    )
}

export default Loading;
