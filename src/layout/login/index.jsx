import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import Input from '../../components/input'; 
import Button from '../../components/button';
import { validateEmail } from '../../utils/util';
import * as authAction from '../../redux/actions/auth.actions';
import authSelector from '../../redux/selectors/auth.selector';


const LoginScreen = props => {
    
    const [error, setError] = useState({bool: false, msg:""})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectAuthDetails = useSelector(authSelector);
    const userId = localStorage.getItem('userId');
    const {isFailure, message} = selectAuthDetails.userValidation;
    useEffect(() =>{
        if(isFailure){
            setError({bool:true, msg:message})
        }
    }, [isFailure, message])
    useEffect(()=> {
        if(userId){
            navigate('/dashboard');
        }
    }, [userId, navigate])

const SignInSchema = Yup.object().shape({
    email: Yup.string().min(6, 'Too short - should be 6 chars minimum!').required('Required'),
    password: Yup.string().min(6, 'Too short - should be 6 chars minimum!').required('Required'),
})

const onSubmit = (e, values) =>{
    e.preventDefault();
    const {email, password} = values;
    if(email !== '' && password !== ''){
        // validating Email.
        if(!validateEmail(values.email)){
            setError({bool:true, msg:"Email Address / Phone number is not valid, Please provide a valid Email or phone number "});
        } else {
            setError({bool:false, msg:""});
        }

        dispatch( authAction.authLogin({userphone:email, userpassword:password}));
    } else {
        setError({bool: false, msg:'Fill user/password properly.'})
    }

}


return (
    <Grid container className='container'>
        <Box className="container-box">
            <Paper sx={{p:2}}>
                <Typography variant='h4' component={'h4'} sx={{mb:1}}> Login </Typography>
                <Formik
                initialValues={{email:'', password:''}}
                validationSchema={SignInSchema}
                >
                {({ errors, 
                    setFieldValue,
                    values 
                }) => (
                    <Form onSubmit={e => onSubmit(e, values)} style={{display:'flex', flexDirection:'column', }}>
                        <Input label="Your Email or Phone Number" 
                            value = {values.email}
                            onChange={e => {setFieldValue('email', e.target.value); setError({bool:false, msg:''})}} 
                            style={{marginBottom:'1em'}}
                            helperText={errors.email}
                        />

                        <Input label="Your Password" 
                            value = {values.password}
                            onChange={e => {setFieldValue('password', e.target.value); setError({bool:false, msg:''})}}
                            textType={'password'}
                            style={{marginBottom:'1em'}}
                        />
                        {error.bool && <Typography variant={'body2'} component={'p'} className='error-text'>{error.msg}</Typography>}
                        <Stack sx={{alignItems:'center'}}>
                            <Button label="Login" 
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

export default LoginScreen;