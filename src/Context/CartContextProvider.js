import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { authContext } from './AuthContextProvider';
import { toast } from 'react-hot-toast';

export const cartContext = createContext();

export function CartContextProvider( { children } ) {
    
    
    const {myToken} = useContext(authContext);
    const [userCartId,setUserCartId] = useState(null);
    const [cartItems,setCartItems] = useState(0);
    const [cartProductsId,setCartProductsId] = useState(null);
    const [allProduct,setAllProduct] = useState([]);
    let userId ; 

    function decodeToken() {
        if (!myToken) return null;
    
        try {
            const payloadBase64 = myToken.split('.')[1];
            const decodedPayload = JSON.parse(atob(payloadBase64));
            return decodedPayload.sub; // Adjust field name as needed
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }

    function getUserCartId() {
        userId = decodeToken();
        if (!userId) { return; }
        axios.get("https://fakestoreapi.com/carts/user/"+userId).then((res)=>{
            setUserCartId(res.data[0]?.id);
            setCartItems(res.data[0]?.products.length || 0 );
        }).catch((err)=>{
            console.log(err);
        })
    }

    function getUserCard() {
        if (!userCartId) { return; }
        axios.get("https://fakestoreapi.com/carts/"+userCartId).then((res)=>{
            setCartProductsId(res.data.products);
        }).catch((err)=>{
            console.log(err)
        })
    }


    function getCartProductDetails() {
        setAllProduct([]); // Reset products before fetching new ones
        
        cartProductsId?.forEach((product) => {
            const { productId, quantity } = product; // Extract productId and quantity
            
            axios.get(`https://fakestoreapi.com/products/${productId}`)
                .then((res) => {
                    const productWithQuantity = { ...res.data, quantity }; // Add quantity to product data
                    setAllProduct((prevProducts) => [...prevProducts, productWithQuantity]);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    function addProductToCart(proId) {
        let id = decodeToken();
        axios.post("https://fakestoreapi.com/carts", {
            userId: id,
            date:"2020-02-03",
            products:[{productId:proId.id,quantity:1}]
        }
        ).then((res)=> {
            console.log(res.data);
            getCartProductDetails();
            toast.success("Item Added Successfuly.");
        }).catch((err)=> {
            console.log(err);
            toast.error("Try Again.");
        })
    }

    function updateProductCart(proId , newQuan) {
        let id = decodeToken();
        axios.put(`https://fakestoreapi.com/carts/${proId.id}`, {
            userId:id,
            date:2019-12-10,
            products:[{productId:proId.id,quantity:newQuan}]
        }).then((res)=>{
            console.log(res.data);
            getCartProductDetails();
            toast.success("Item Updated Successfuly.");
        }).catch((err)=>{
            console.log(err);
            toast.error("Try Again.");
        })
    }

    function deleteProductCart(proId) {
        axios.delete(`https://fakestoreapi.com/carts/${proId.id}`).then((res)=> {
            console.log(res);
            getCartProductDetails();
            toast.success("Item Removed Successfuly.");
        }).catch((err)=> {
            console.log(err);
            toast.error("Try Again.");
        })
    }



    useEffect(() => {
        getUserCartId();
    }, [myToken]);

    useEffect(() => {
        getUserCard();
    }, [userCartId]);

    useEffect(() => {
        getCartProductDetails();
    }, [cartProductsId]);

    
    return <cartContext.Provider value={{allProduct , cartItems,setCartItems , addProductToCart, updateProductCart, deleteProductCart }} >
        {children}
    </cartContext.Provider>
}
