import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import "./Register.css";

function Register() {

    const userData = {
        name: {
            firstname: '',
            lastname: '',
        },
        username: '',
        email: '',
        password: '',
        address:{
            city:'',
            street:'',
            number: undefined,
            zipcode:'',
            geolocation:{
                lat:'-37.3159',
                long:'81.1496'
            }
        },
        phone: '',
        __v: 0,
    }

    
    const schema =  Yup.object({
        name: Yup.object({
            firstname: Yup.string().required("first name is required").min(3,"First name must be greater than 3").max(14,"First name must be less than 3"),
            lastname: Yup.string().required("last name is required").min(3,"last name must be greater than 3").max(14,"last name must be less than 3"),
        }),
        username: Yup.string().required().min(3).max(14),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6).max(12),
        // rePassword: Yup.string().required().min(6).max(12).oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phone: Yup.string().required().matches( /01[0125][0-9]{8}/ ,"Please Enter A valied Number"),
        address: Yup.object({
            city: Yup.string().required("city is required"),
            street: Yup.string().required("street is required"),
            number: Yup.number().required("number is required"),
            zipcode: Yup.string().required("zip code is required"),
        })
    })

    const navigate = useNavigate();
    const [ success, setSuccess ] = useState(false); 
    const [ error, setError ] = useState(undefined); 
    const [ loadButton, setLoadButton ] = useState(false);

    async function mySubmit(values) {
        // Perform your registration logic here
        setLoadButton(true);
        await axios.post("https://fakestoreapi.com/users",values).then( function(x){
            console.log("success ",x)
            setSuccess(true);
            setTimeout(function(){
                setSuccess(false);
                navigate('/login');
            },3000);
            setLoadButton(false);
        }
        ).catch(function(x) {
            console.log("error ",x);
            setError(x.response.data);
            setTimeout(function(){
                setError(false);
            },3000);
            setLoadButton(false);
        });
        // Redirect to login page
    }

    // function myValidation(values) {
    //     const errors = {}

    //     const nameRegex = /^[A-Z][a-z]{3,10}$/;
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     const phoneRegex = /^01[0125][0-9]{8}$/; 

    //     if (nameRegex.test(values.name) !== true ) {
    //         errors.name = "The name must contain from 3 to 8 characters.";
    //     }

    //     if (phoneRegex.test(values.phone) !== true ) {
    //         errors.phone = "Please Enter the Valid Phone Number.";
    //     }

    //     if (emailRegex.test(values.email) !== true ) {
    //         errors.email = "Please Enter the Valid Email.";
    //     }

    //     if (values.password.length < 6 || values.password.length > 12) {
    //         errors.password = "Password must be from 6 to 12 characters or number.";
    //     }

    //     if (values.password !== values.rePassword) {
    //         errors.rePassword = "The Confirm Password must match password.";
    //     }

    //     return errors
    // }

    
    
    const myFormik = useFormik({
        initialValues: userData,
        onSubmit: mySubmit,
        // validate: myValidation
        validationSchema: schema,
    })


    return (
    <>
        <div className="myForm m-auto p-5">
            {success?<div className="alert alert-success text-center">The registration is been completed</div>:""}
            {error?<div className="alert alert-danger text-center">{error}</div>:""}
            <h2 className='fw-bold mb-3'>Register Now :</h2>
            <form onSubmit={ myFormik.handleSubmit }>

                <div className='resize d-flex' >
                    <div className='resizeItem '>
                        <label htmlFor="fName">First Name:</label>
                        <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.name.firstname } id='fName' type="text" name="name.firstname" className='form-control mb-3' />
                        {myFormik.touched.name?.firstname && myFormik.errors.name?.firstname ?<div className='alert alert-danger'>{ myFormik.errors.name.firstname }</div>:"" }
                    </div>
                    <div className='resizeItem '>
                        <label htmlFor="lName">Last Name:</label>
                        <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.name.lastname } id='lName' type="text" name="name.lastname" className='form-control mb-3' />
                        {myFormik.touched.name?.lastname && myFormik.errors.name?.lastname ?<div className='alert alert-danger'>{ myFormik.errors.name.lastname }</div>:"" }
                    </div>
                </div>

                <label htmlFor="userName">User Name:</label>
                <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.username } id='userName' type="text" name="username" className='form-control mb-3' />
                {myFormik.touched.username && myFormik.errors.username ?<div className='alert alert-danger'>{ myFormik.errors.username }</div>:"" }

                <label htmlFor="email">Email:</label>
                <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.email } id='email' type="email" className='form-control mb-3' />
                {myFormik.touched.email && myFormik.errors.email ?<div className='alert alert-danger'>{ myFormik.errors.email }</div>:"" }

                <label htmlFor="password">Password:</label>
                <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.password } id='password' type="password" className='form-control mb-3' />
                {myFormik.touched.password && myFormik.errors.password ?<div className='alert alert-danger'>{ myFormik.errors.password }</div>:"" }

                <div className='resize d-flex flex-wrap'>
                    <div className='resizeItem'>
                        <label htmlFor="city">City:</label>
                        <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.address.city } id='city' type="text" name="address.city" className='form-control mb-3' />
                        {myFormik.touched.address?.city && myFormik.errors.address?.city ?<div className='alert alert-danger'>{ myFormik.errors.address.city }</div>:"" }
                    </div>
                    <div className='resizeItem'>
                        <label htmlFor="street">Street:</label>
                        <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.address.street } id='street' type="text" name="address.street" className='form-control mb-3' />
                        {myFormik.touched.address?.street && myFormik.errors.address?.street ?<div className='alert alert-danger'>{ myFormik.errors.address.street }</div>:"" }
                    </div>
                    <div className='resizeItem'>
                        <label htmlFor="number">Number:</label>
                        <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.address.number } id='number' type="number" name="address.number" className='form-control mb-3' />
                        {myFormik.touched.address?.number && myFormik.errors.address?.number ?<div className='alert alert-danger'>{ myFormik.errors.address.number }</div>:"" }
                    </div>
                    <div className='resizeItem'>
                        <label htmlFor="zip">Zip Code:</label>
                        <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.address.zipcode } id='zip' type="text" name="address.zipcode" className='form-control mb-3' />
                        {myFormik.touched.address?.zipcode && myFormik.errors.address?.zipcode ?<div className='alert alert-danger'>{ myFormik.errors.address.zipcode }</div>:"" }
                    </div>
                </div>

                <label htmlFor="phone">Phone:</label>
                <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.phone } id='phone' type="text" className='form-control mb-3' />
                {myFormik.touched.phone && myFormik.errors.phone ?<div className='alert alert-danger'>{ myFormik.errors.phone }</div>:"" }

                <button type='submit' className='btn btn-success text-white fw-bold'>
                    {loadButton?<ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                                />:"Register"}
                </button>
            </form>
        </div>
    </>
    )
}

export default Register;
