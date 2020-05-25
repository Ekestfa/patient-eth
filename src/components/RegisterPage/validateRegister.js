function validateRegister(values,addre){
let errors = {}
// username
    // the string to be more than 0 chars
    // Hasn't been registered on blockchain
var format= /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
if(!values.username){
    errors.username = "请输入用户名！"
}
if(format.test(values.username)){
    errors.username = "用户名有禁止使用字！"
}
if(values.username.length > 20) {
    errors.username = "用户名太长了！"
}

// password
    // the string to be more than 0 chars
    if(!values.ETHaddress){
        if(addre==='启动MetaMask！'){
            errors.addre = "请启动MetaMask！"
        } 
    }
// else if(values.password < 10){
//     errors.password = "Password needs to be more than 10 characters"
// }
    return errors;
}
export default validateRegister;