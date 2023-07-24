import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import * as authAction from '../../redux/actions/auth.actions';
import authSelector from '../../redux/selectors/auth.selector';

import Input from '../../components/input'; 
import Button from '../../components/button';
import { validateEmail } from '../../utils/util';


const SignupScreen = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectAuthDetails = useSelector(authSelector);
    const userId = localStorage.getItem('userId');              // Local Storage information
    const {isFailure, message} = selectAuthDetails.userValidation;  // Receive information after signup
    const [error, setError] = useState({bool: false, msg:''})   // setting error message

    // check for failure from api and show error message.
    useEffect(() =>{
        if(isFailure){
            setError({bool:true, msg:message})
        }
    }, [isFailure, message])
    // check for success from api and navigate to dashboard.
    useEffect(()=> {
        if(userId){
            navigate('/dashboard');
        }
    }, [userId, navigate])


// Form validation schema
const SignUpSchema = Yup.object().shape({
    userName: Yup.string().min(6, 'Too short - should be 6 chars minimum!').required('Required'),
    phoneNumber: Yup.number().min(10, 'Phone Number should be of 10-digit.').required('required').positive().integer(),
    email: Yup.string().email('Email is not in proper format.').min(6, 'Too short - should be 6 chars minimum!').required('Required'),
    password: Yup.string().min(6, 'Too short - should be 6 chars minimum!').required('Required'),
    repassword: Yup.string().min(6, 'Too short - should be 6 chars minimum!').required('Required'),
})

// Handling submit event
const onSubmit = (e, values) => {
    e.preventDefault();
    setError({bool:false, msg:""});
    const {userName, phoneNumber, password, repassword, email} = values; // Destructuring form data;
    // Checking whether form data is empty or not.
    if(userName.trim() === '' || phoneNumber.trim() === '' || email.trim() === '' || password.trim() === '' || repassword.trim() === '' ){
        setError({bool: true, msg:'Please check the form'});
        return false;
    }
    // checking for email whether is validated proper or not.
    if(!validateEmail(email)){
        setError({bool: true, msg:"Email is not proper. Please check and correct."});
        return false;
    }
    // checking for phone number whether it is of 10 digit or not.
    if(phoneNumber.length !== 10){
        setError({bool:true, msg:"Phone Number should be of 10-digit."});
        return false;
    }
    // checking for password and re-type password whether it is matching or not.
    if(password !== repassword){
        setError({bool:true, msg:"Password is not getting matched."});
        return false;
    }

    dispatch(authAction.authRegister({userName, password, phoneNumber, email}))
}

return (
    <Grid container className='container'>
        <Box className="container-box">
            <Paper sx={{p:2}}>
                <Typography variant='h4' component={'h4'} sx={{mb:1}}> Signup </Typography>
                <Formik
                initialValues={{userName:'', phoneNumber:'', email:'' , password:'' , repassword:''}}
                validationSchema={SignUpSchema}
                >
                {({ errors, 
                    setFieldValue,
                    values 
                }) => (
                    <Form onSubmit={e => onSubmit(e, values)} style={{display:'flex', flexDirection:'column', }}>
                        <Input label="Your Name" 
                            value = {values.userName}
                            onChange={e => {setFieldValue('userName', e.target.value); setError({bool:false, msg:''})}} 
                            style={{marginBottom:'1em'}}
                            helperText={errors.userName}
                        />
                        <Input label="Your Phone Number" 
                            value = {values.phoneNumber}
                            onChange={e => {setFieldValue('phoneNumber', e.target.value); setError({bool:false, msg:''})}}
                            style={{marginBottom:'1em'}}
                            helperText={errors.phoneNumber}
                        />
                        <Input label="Your Email" 
                            value = {values.email}
                            onChange={e => {setFieldValue('email', e.target.value); setError({bool:false, msg:''})}}
                            textType={'text'}
                            style={{marginBottom:'1em'}}
                            helperText={errors.email}
                        />
                        <Input label="Your Password" 
                            value = {values.password}
                            onChange={e => {setFieldValue('password', e.target.value); setError({bool:false, msg:''})}}
                            textType={'password'}
                            style={{marginBottom:'1em'}}
                            helperText={errors.password}
                        />
                        <Input label="Retype Password" 
                            value = {values.repassword}
                            onChange={e => {setFieldValue('repassword', e.target.value); setError({bool:false, msg:''})}}
                            textType={'password'}
                            style={{marginBottom:'1em'}}
                            helperText={errors.repassword}
                        />
                        {error.bool && <Typography variant='body2' component={'p'} className='error-text'> {error.msg} </Typography>}
                        <Stack sx={{alignItems:'center'}}>
                            <Button label="Signup" 
                                className='btn'
                                onClick={e =>{onSubmit(e, values)}} 
                            />
                                
                        </Stack>
                        
                    </Form>
                )}
                
                    
                </Formik>
            </Paper>
        </Box>
    </Grid>
)
}

export default SignupScreen;