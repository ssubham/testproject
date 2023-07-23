
export function validateEmail(pValue) {
    var mailFormat = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9 -])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
    if (pValue === "") {
        alert( "  Please enter your Email or Phone Number  ");
    }
    else if (!mailFormat.test(pValue)) {
        return false;
    }
    else {
        return true;
    }
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
} 
