import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/AuthContextProvider';
import { cartContext } from '../../Context/CartContextProvider';

function Categories() {
    const { myToken } = useContext(authContext);
    const { addProductToCart } = useContext(cartContext);
    const [selectedCategory, setSelectedCategory] = useState('electronics'); // Default category

    // Fetch categories
    const { isLoading: categoriesLoading, data: categoriesData } = useQuery(
        "getAllCategories",
        async () => {
            const response = await axios.get("https://fakestoreapi.com/products/categories");
            return response.data;
        }
    );

    // Fetch products for selected category
    const { isLoading: productsLoading, data: productsData } = useQuery(
        ["getCategoryItems", selectedCategory],
        async () => {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${selectedCategory}`);
            return response.data;
        },
        {
            enabled: !!selectedCategory, // Only run when there's a selected category
        }
    );

    // Handle category change
    function handleCategoryChange(e) {
        setSelectedCategory(e.target.value);
    }

    if (categoriesLoading || productsLoading) {
        return <Loading />;
    }

    return (
        <div className="container">
            <select onChange={handleCategoryChange} className='form-control w-50 m-auto mt-5' name="categories" id="cata">
                {categoriesData?.map((cate, ind) => (
                    <option key={ind} value={cate}>{cate}</option>
                ))}
            </select>

            {productsData && (
                <div className="row mt-4">
                    {productsData.map((product, ind) => (
                        <div key={ind} className="box col-xl-3 col-lg-4 col-md-6">
                            <Link to={"/productdetails/" + product.id}>
                                <div className="card pt-4">
                                    <img src={product.image} className="card-img-top" alt={product.title + " image"} />
                                    <div className="card-body p-4 pb-5">
                                        <h5 className="card-title text-success fw-bold">
                                            {product.title.split(" ").splice(0, 2).join(" ")}
                                        </h5>
                                        <h5 className="card-title h6">{product.category}</h5>
                                        <h6 className='fw-bold'>{product.price + " EP"}</h6>
                                    </div>
                                </div>
                            </Link>
                            {myToken && (
                                <button
                                    onClick={() => addProductToCart(product)}
                                    className='showBtn btn btn-success w-50 m-auto d-block'
                                >
                                    Add To Cart
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Categories;

