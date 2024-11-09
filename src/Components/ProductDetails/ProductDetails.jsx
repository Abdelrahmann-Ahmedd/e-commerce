import axios from 'axios';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import Loading from './../Loading/Loading';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContextProvider';

function ProductDetails() {

    const { id } = useParams("id");

    const {addProductToCart} = useContext(cartContext);


    function getProductDetails() {
        return axios.get("https://fakestoreapi.com/products/"+id);
    }

    function addproduct(data) {
        addProductToCart(data);
    }


    const {isFetching , data ,isError} = useQuery("productdetails-"+{id},getProductDetails);

    if(isFetching){
        return <Loading/>
    }

    if (isError){
        return <Navigate to="/products" />
    }
    return (
        <div className="container mt-5">
            <div className="row gx-5 align-items-center">
                <div className="col-md-4">
                    <figure>
                        <img style={{height:"400px"}} className='w-100' src={data.data.image} alt={data.data.title} />
                    </figure>
                </div>
                <div className="col-md-8">
                    <div>
                        <h3 className=' fw-bold text-success'>{data.data.title}</h3>
                        <h5 className='fs-6 fw-bold'>{data.data.category}</h5>
                        <p>{data.data.description}</p>
                        <h6 className='fw-bold'>{data.data.price +" EP"}</h6>
                        <button onClick={()=>{addproduct(data.data)}} className='btn btn-success w-100 mt-4'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
