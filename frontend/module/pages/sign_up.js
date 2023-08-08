import callApi from './../../controllers/callApi.js';
const sign_up = () => {
    document.querySelector('.btn-sign-up').addEventListener('click', async () => {
        let email = document.querySelector('.email').value
        let phone = document.querySelector('.phone').value
        let password = document.querySelector('.password').value
        console.log(email,phone,password);
        await callApi('create-user', 'POST', {
            email: email,
            phone: phone,
            password: password,
        }).then(res => {
            console.log(res.data.message)
            alert(res.data.message)
            if(res.data.errCode==0){
                document.querySelector('.email').value = ''
                document.querySelector('.phone').value = ''
                document.querySelector('.password').value = ''
            }
        })
    })
}
//errCode message
export default sign_up