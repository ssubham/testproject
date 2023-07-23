import React from 'react';
import { TextField } from "@mui/material/";



const Input = props =>{

    const {textType, label, onChange, value, style, helperText } = props;

    const btnStyle = {width:'100%'};

    return  <TextField type={textType} label={label} helperText={helperText}
         style= {{btnStyle, ...style}} onChange={onChange} value={value} />
}

export default Input;