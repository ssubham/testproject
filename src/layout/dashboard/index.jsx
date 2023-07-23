import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import Button from '../../components/button';
import selectDashboardDetails from '../../redux/selectors/dashboard.selector'
import * as actions from '../../redux/actions/dashboard.actions'
const Dashboard = props => {

    const dispatch = useDispatch()
    const dashboardDetails = useSelector(selectDashboardDetails);
    const {isFailure, isSuccess, data} = dashboardDetails.dashboardDetails;
    const [cardData, setCardData] = useState([])
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const CARD_SIZE = 10;

    const navigate = useNavigate()

    
useEffect(() => {
    // checking for user is available or not.
    if(!localStorage.getItem('userName')) {navigate('/login');};

    // If the data is not available then get it loaded.
    if(!data){
        dispatch(actions.getDashboardData())
    }
    // If the data is available then store locally.
    if(isSuccess && data){
        setCardData(data);
    }
    // If the data is not available error comes then show error.
    if(isFailure){
        setError(true);
    }
    
}, [navigate, data, dispatch, isFailure, isSuccess])
const handleLoadMore = () =>{
    setCurrentPage(prevState => prevState+1)
}

return (
    <Grid container sx={{display:'flex', flexDirection:'column', mt:10}}>
        <Grid item sx={{display:'flex', flexWrap:'wrap'}}>
            {cardData && cardData.length > 0 && data.slice(0, currentPage*CARD_SIZE).map( (item, index) =>
                <Card key={`${item.API}_${index}`} sx={{width:200, mb:2, mx:1}}>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component={'div'}>{item.API}</Typography>
                        <Typography variant={'body2'} component={'p'} sx={{textAlign:'left'}}>{item.Description}</Typography>
                    </CardContent>
                    <CardActions sx={{flexDirection:'column'}}>
                        <Typography variant='body2' component={'div'} sx={{ width: '100%', mb:1, textAlign:'left'}}>Category: {item.Category}</Typography>
                        <Button label="Learn More" style={{padding:10, backgroundColor:'#559EFF', color:'#FFFFFF'}}>Learn More</Button>
                    </CardActions>

                </Card>
                
            )}
        </Grid>
        
        <Stack sx={{alignItems:'center'}}>
        {error && <Typography variant='h5' component={'div'}>There is some issue with data loading. Please try again later.</Typography>}
        {cardData && cardData.length>0 ? 
            <Button label="Load More" style={{padding:10, backgroundColor:'#559EFF', color:'#FFFFFF', width:'20%'}} onClick={handleLoadMore}></Button>
            : <Typography variant='h5' component={'div'}>Please wait, Data is loading.......</Typography>
        }
        
        </Stack>
    </Grid>
)


}

export default Dashboard;