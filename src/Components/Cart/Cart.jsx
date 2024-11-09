import React, { useContext} from 'react';
import { cartContext } from '../../Context/CartContextProvider';
import Loading from '../Loading/Loading';

function Cart() {

    const{allProduct ,  updateProductCart, deleteProductCart } = useContext(cartContext);
    let totalPrice = 0;

    function updateProduct(proId , newQuan) {
        updateProductCart(proId,newQuan);
    }

    function deleteProduct(proId) {
        deleteProductCart(proId);
    }

    if (allProduct.length === 0) {
        return <Loading />
    }

    return (
        <div className="container mt-4 ">
            <h2 className='mb-4'>Shop Cart</h2>
            {allProduct?.map((product,ind)=>{totalPrice+=product.price * product.quantity; return <div key={ind} className="row mb-1 border-0 border-bottom p-2 align-items-center">
                <div className="col-lg-1 col-sm-2 col-4">
                    <figure>
                        <img className='w-100' src={product.image} alt="" />
                    </figure>
                </div>
                <div className="col-lg-9 col-sm-7 col-4">
                    <article>
                        <h5 className=' fw-bold'>{product.title}</h5>
                        <h6 className=' fw-bold opacity-50'>{product.category}</h6>
                        <h6 className='fw-bold text-success'>Price: {product.price+ " EP"}</h6>
                        <button onClick={()=> deleteProduct(product)} className='btn btn-outline-danger mt-2 fw-bold'>Remove</button>
                    </article>
                </div>
                <div className="col-lg-2 col-sm-3 col-4">
                    <aside className='d-flex align-items-center justify-content-between'>
                        <button disabled = {product.quantity===0} onClick={()=> updateProduct(product,product.quantity - 1)} className='btn btn-success fs-6 fw-bold'>-</button>
                        <div className='fw-bold'>{product.quantity}</div>
                        <button onClick={()=> updateProduct(product,product.quantity + 1)} className='btn btn-success fs-6 fw-bold'>+</button>
                    </aside>
                </div>
            </div> })}
            <h5 className='text-center mt-5 fw-bold text-success'>Total Price: {totalPrice}</h5>
        </div>
    )
}

export default Cart;