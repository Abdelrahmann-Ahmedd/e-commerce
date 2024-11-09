import { useFormik } from 'formik';
import React, { useState , useContext} from 'react';
import * as Yup from "yup";
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { authContext } from './../../Context/AuthContextProvider';


function Login() {

    const userData = {
        username: "",
        password: ""
    }

    const mySchema = Yup.object({
        username: Yup.string().required().min(3).max(12),
        password: Yup.string().required().min(6).max(12)
    })


    const { setToken } = useContext(authContext);
    const myNavigate = useNavigate();
    const [ success, setSuccess ] = useState(false); 
    const [ error, setError ] = useState(undefined); 
    const [ loadButton, setLoadButton ] = useState(false);



    async function mySubmit(values) {
        setLoadButton(true);
        await axios.post("https://fakestoreapi.com/auth/login",values).then(function(x) {
            console.log("Success ",x);
            localStorage.setItem("token",x.data.token);
            setToken(x.data.token);
            setSuccess(true);
            setTimeout(function(){
                setSuccess(false);
                myNavigate('/products');
            },3000);
            setLoadButton(false);
        }).catch(function(x) {
            console.log("error ",x);
            setError(x.response.data);
            setTimeout(function(){
                setError(false);
            },3000);
            setLoadButton(false);
        });
        // myNavigate("/home");
    }

    // function myValidation(values) {
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     const errors = {};
    //     if (emailRegex.test(values.email) !== true) {
    //         errors.email = "Please Enter A valied Email.";
    //     }

    //     if (values.password.length < 6 || values.password.length > 12 ) {
    //         errors.password = "please Enter A vaild Password.";
    //     }

    //     return errors;
    // }

    const myFormik = useFormik({
        initialValues: userData,
        onSubmit: mySubmit,
        // validate: myValidation,
        validationSchema:mySchema
    })

    return (
        <>
        <div style={{height:"65vh"}} className="myForm m-auto p-5">
            {success?<div className="alert alert-success text-center">Login successful</div>:""}
            {error?<div className="alert alert-danger text-center">{error}</div>:""}
            <h2 className='fw-bold'>Login Now :</h2>
            <form onSubmit={ myFormik.handleSubmit }>

                <label htmlFor="username">User Name:</label>
                <input onBlur={myFormik.handleBlur} onChange={ myFormik.handleChange } value={myFormik.values.username} id='username' type="text" className='form-control mb-3' />
                {myFormik.touched.username && myFormik.errors.username ?<div className="alert alert-danger">{ myFormik.errors.username }</div>:"" }
                
                <label htmlFor="password">Password:</label>
                <input onBlur={myFormik.handleBlur} onChange={ myFormik.handleChange } value={myFormik.values.password} id='password' type="password" className='form-control mb-3' />
                {myFormik.touched.password && myFormik.errors.password ?<div className="alert alert-danger">{ myFormik.errors.password }</div>:"" }

                <button type='submit' className='btn btn-success text-white fw-bold'>
                    {loadButton?<ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                />:"Login"}
                </button>
            </form>
        </div>
    </>
    )
}

export default Login;
