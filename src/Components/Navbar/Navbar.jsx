import React, { useContext } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import logo from "../../Assets/freshcart-logo.svg";
import { authContext } from './../../Context/AuthContextProvider';
import { cartContext } from '../../Context/CartContextProvider';
function Navbar() {

    const {myToken, setToken} = useContext(authContext);
    const {cartItems,setCartItems } = useContext(cartContext);
    const myNavigate = useNavigate();


    function logout() {
        setToken(null);
        localStorage.removeItem("token");
        myNavigate('/login');
        setCartItems(null);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
            <div className="container">
                <Link className="navbar-brand" href="/">
                    <img src={logo} alt="ShopSmart" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {myToken?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className=" position-relative nav-link" to="/cart">Cart
                                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catagories">Categories</Link>
                        </li>
                    </ul>:""}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <ul className='list-unstyled d-flex'>
                                <li className='me-3'><i className="fa-brands fa-instagram"></i></li>
                                <li className='me-3'><i className="fa-brands fa-facebook"></i></li>
                                <li className='me-3'><i className="fa-brands fa-tiktok"></i></li>
                                <li className='me-3'><i className="fa-brands fa-twitter"></i></li>
                                <li className='me-3'><i className="fa-brands fa-linkedin"></i></li>
                                <li className='me-3'><i className="fa-brands fa-youtube"></i></li>
                                <li role='button' onClick={()=>{ return myNavigate("/cart") }} className=' position-relative ms-5 me-3'><i className="  fa-solid fa-cart-shopping ">
                                    {cartItems?
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                            {cartItems}
                                    </span>:""}
                                    </i></li>
                            </ul>
                        </li>
                        {myToken?<li className="nav-item">
                            <span onClick={ logout } role='button' className="nav-link" to="">Logout</span>
                        </li>:<>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
