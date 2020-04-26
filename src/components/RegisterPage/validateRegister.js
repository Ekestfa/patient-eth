function validateRegister(values,addre){
let errors = {}
// username
    // the string to be more than 0 chars
    // Hasn't been registered on blockchain
if(!values.username){
    errors.username = "Username is required."
}
// else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)){
//     errors.username = "Invalid username."
// }


// password
    // the string to be more than 0 chars
    if(!values.ETHaddress){
        if(addre==='Press Enable Ethereum!'){
            errors.addre = "Ethereum address is required."
        } 
    }
// else if(values.password < 10){
//     errors.password = "Password needs to be more than 10 characters"
// }
    return errors;
}
export default validateRegister;