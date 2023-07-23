import React from 'react';
import { Button } from "@mui/material";



const Index = props =>{

    const {id, label, onClick, style, className} = props;

    const btnStyle = {width:'100%'};

return (
    <Button id={id} style={{...btnStyle, ...style}} className={className} onClick={onClick}>{label}</Button>
)


}

export default Index;