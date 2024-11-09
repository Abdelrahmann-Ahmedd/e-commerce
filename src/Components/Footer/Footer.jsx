import React from 'react';

function Footer() {
    return (
        <div className=' position-relative bottom-0 bg-light'>
            <div className='container pt-5 pb-4'>
                <h2>Get The FreshCart App</h2>
                <p className='opacity-75'>We will send you a link, open it on your phone to download the app.</p>
                <div className='d-flex justify-content-between'>
                    <input type="email" className=' form-control w-75' />
                    <button className='btn btn-success ms-4'>Share App Link</button>
                </div>
            </div>
        </div>
    )
}

export default Footer;
