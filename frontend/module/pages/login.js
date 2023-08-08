import callApi from './../../controllers/callApi.js';
import pathImg from './../config.js'

const login = () => {
    document.querySelector('.btn-login').addEventListener('click', async () => {
        let email = document.querySelector('.email').value
        let password = document.querySelector('.password').value
        // console.log(email,password);
        await callApi('login-user', 'POST', {
            email: email,
            password: password,
        }).then(res => {
            // console.log(res.data.user)
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert(res.data.message)
            if (res.data.errCode == 0) {
                window.location = "/"
                // window.location.reload()
            }
        })
    })
}

const renderMenuLogined = async (data) => {
    // console.log(data.id);
    let user;
    await callApi(`users/${data.id}`, 'GET').then(res => user = res.data.users)
    // console.log(user.avatar);
    let avatar = user.avatar != "" ? user.avatar : "profile.webp"
    let welcome = user.fullName != "" ? user.fullName : user.email
    let html = ``
    if(user.id_role == 1){
        html = `<li><a class="dropdown-item" href="/admin/">Quản trị Admin</a></li>`
    }else{
        html = ``
    }

    document.querySelector('.menu-login').innerHTML = `
        <li class="nav-item"><a style="cursor: pointer;" class="me-2 nav-link link-dark text-white px-2">Welcom ${welcome}</a></li>
        <li class="nav-item">
            <div class="flex-shrink-0 dropdown">
                <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="${pathImg}users/${avatar}" alt="" width="32" height="32" class="rounded-circle">
                </a>
                <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2"  style="z-index: 10000;">
                    <li><a class="dropdown-item" href="#my-account">My accout</a></li>
                    <li><a class="dropdown-item" href="#wishlist">Wishlist</a></li>
                    <li><a class="dropdown-item" href="#history">Lịch sử mua hàng</a></li>
                    <li>
                    ${html}
                    <hr class="dropdown-divider">
                    </li>
                    <li><div class="dropdown-item sign-out">Sign out</div></li>
                </ul>
            </div>
        </li>
    `
    sign_out()
}

const sign_out = () => {
    document.querySelector('.sign-out').addEventListener('click', () => {
        localStorage.removeItem("user");
        window.location = "/"
    })
}

const checklogin = () => {
    if (!localStorage.getItem("user")) {
        window.location = "/#login"
    }

}
const checkLoginAdmin = () => {
    if (JSON.parse(localStorage.getItem("user")).id_role != 1) {
        window.location = "/"
    }
}

export { login, renderMenuLogined, checklogin, checkLoginAdmin, sign_out }