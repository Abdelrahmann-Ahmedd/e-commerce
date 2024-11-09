import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import "./Products.css";
import HomeSlider from '../Slider/HomeSlider';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/CartContextProvider';
import { authContext } from '../../Context/AuthContextProvider';

function Products() {

    const { isLoading, data} = useQuery("getAllProducts", getAllProducts);
    const {addProductToCart} = useContext(cartContext);
    const {myToken} = useContext(authContext);
    
    async function getAllProducts() {
        return await axios.get("https://fakestoreapi.com/products");
    }

    function addProduct(data) {
        addProductToCart(data);
    }

    if (isLoading){
        return <Loading/>
    }

    return (
        <div className="container mt-3">
            <HomeSlider />
            <h2 className='fs-3'>Shop Catagories</h2>
            <div className="row gx-2">
                <div className="col-xl-3 col-md-6">
                    <figure className='border border-1 d-flex  align-items-center'>
                        <img style={{height:"100px"}} className='w-50' src={require("../../Assets/men.jpg")} alt="mens cloths" />
                        <figcaption className='ms-4 fs-5 fw-bold'>men's clothing</figcaption>
                    </figure>
                </div>
                <div className="col-xl-3 col-md-6">
                    <figure className='border border-1 d-flex  align-items-center'>
                        <img style={{height:"100px"}} className='w-50 ' src={require("../../Assets/women.jpg")} alt="womens cloths" />
                        <figcaption className='ms-4 fs-5 fw-bold'>women's clothing</figcaption>
                    </figure>
                </div>
                <div className="col-xl-3  col-md-6">
                    <figure className='border border-1 d-flex  align-items-center'>
                        <img style={{height:"100px"}} className='w-50' src={require("../../Assets/electronic.jpg")} alt="electronic" />
                        <figcaption className='ms-4 fs-5 fw-bold'>electronics</figcaption>
                    </figure>
                </div>
                <div className="col-xl-3  col-md-6">
                    <figure className='border border-1 d-flex  align-items-center'>
                        <img style={{height:"100px"}} className='w-50 ' src={require("../../Assets/jellury.jpg")} alt="jewelary" />
                        <figcaption className='ms-4 fs-5 fw-bold'>jewelery</figcaption>
                    </figure>
                </div>
            </div>
            <div className="row gy-4 mt-4">
                    {data.data.map((product,ind)=>{return <div key={ind} className="box col-xl-3 col-lg-4 col-md-6">
                        <Link to={"/productdetails/" + product.id}>
                            <div className="card pt-4">
                                <img src={product.image} className="card-img-top" alt={product.title +"image"}/>
                                <div className="card-body p-4 pb-5">
                                    <h5 className="card-title text-success fw-bold">{product.title.split(" ").splice(0,2).join(" ")}</h5>
                                    <h5 className="card-title h6">{product.category}</h5>
                                    <h6 className='fw-bold'>{product.price+" EP"}</h6>
                                </div>
                            </div>
                        </Link>
                        {myToken?<button onClick={()=>{addProduct(product)}} className='showBtn btn btn-success w-50 m-auto d-block'>Add To Cart</button>:""}
                    </div>})}
            </div>
        </div>
    )
}

export default Products;
