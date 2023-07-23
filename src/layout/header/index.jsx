import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = props => {

    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const userId = localStorage.getItem('userId');

    useEffect(() =>{
        if(!userId && (pathname !== '/login' && pathname !== '/signup' && pathname !== '/' )){
            navigate('/login');
        }
        if(userId && pathname === '/'){
            navigate('/dashboard');
        }
    }, [userId, navigate, pathname])

const handleLogout = () => {
    localStorage.clear();
}

return (
    <Grid >
        <Grid item xs={12} className='header' 
        >
            <Grid item xs={6} sm={3}>
                <img src={"/assets/logo.png"} alt={""} />
            </Grid>
            <Grid item xs={6} sm={9}>
                {userId ? <Link onClick={handleLogout} style={{marginRight:'1em'}}>Logout</Link> :
                    <>
                    <Link to={'login'} style={{marginRight:'1em'}}>Login</Link>
                    <Link to={'signup'} >Signup</Link>
                    </>
                }
            </Grid>
        </Grid>
    </Grid>
)

}

export default Header;