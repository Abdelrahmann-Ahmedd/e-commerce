import React from 'react';
import errorimage from "../../Assets/error.svg";
function Error() {
    return (
        <div style={{height:"65vh"}} className="container d-flex justify-content-center align-items-center">
            <figure>
                <figcaption className='fs-1 fw-bold text-success text-center'>Page is Not Found</figcaption>
                <img className='w-100' src={errorimage} alt="page not found" />
            </figure>
        </div>
    )
}

export default Error
