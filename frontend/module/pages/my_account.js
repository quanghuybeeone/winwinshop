import callApi from './../../controllers/callApi.js';
import pathImg from './../config.js'

const renderInfoAccount = async()=>{
    let id_user = JSON.parse(localStorage.getItem("user")).id
    // console.log(id_user);
    let user;
    await callApi(`users/${id_user}`, 'GET').then(res=>user = res.data.users)
    // console.log(user);
    let fullName = user.fullName == "" ? "Vui lòng cập nhập" : user.fullName
    let email = user.email
    let phone = user.phone
    let address = user.address == "" ? "Vui lòng cập nhập" : user.address
    let avatar = user.avatar == "" ? "profile.webp" : user.avatar

    let welcome;
    if(user.fullName != ""){
        welcome=user.fullName
    }else{
        welcome=user.email
    }

    document.querySelector('.welcome').innerHTML = welcome

    document.querySelector('.infoAccount').innerHTML = `
                    <tr>
                        <td><b>Họ Và tên: </b></td>
                        <td>${fullName}</td>
                    </tr>
                    <tr>
                        <td><b>Địa chỉ: </b></td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td><b>Email: </b></td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td><b>Sđt: </b></td>
                        <td>${phone}</td>
                    </tr>
                    <tr>
                        <td><b>Password: </b></td>
                        <td><button class="btn btn-dark">Đổi mật khẩu</button></td>
                    </tr>
    `
    document.querySelector('.avatar').setAttribute('src',`${pathImg}users/${avatar}`)

}

const renderFrom =(data)=>{
    document.querySelector('.update-info-account').addEventListener('click',()=>{
        document.querySelector('.modal').innerHTML=`<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                    Cập nhập thông tin
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Họ và tên</label>
                    <input type="text" class="form-control fullName" value="${data.fullName}" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Địa chỉ</label>
                    <input type="text" class="form-control address" value="${data.address}" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Số điện thoại</label>
                    <input type="text" class="form-control phone" value="${data.phone}" placeholder=""/>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text">Ảnh đại diện</label>
                    <input type="file" class="form-control avatar">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary btn-update-info-account" data-bs-dismiss="modal">Cập nhật</button>
            </div>
        </div>
    </div>`
    
    updateInfor()
    })

    document.querySelector('.change-password').addEventListener('click',()=>{
        document.querySelector('.modal').innerHTML=`<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                    Thay đổi mật khẩu
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Mật khẩu mới</label>
                    <input type="password" class="form-control password" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Xác nhận mật khẩu mới</label>
                    <input type="password" class="form-control conf-password" placeholder=""/>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary btn-change-password" data-bs-dismiss="modal">Đổi mật khẩu</button>
            </div>
        </div>
    </div>`
    chagePassword()
    })
}

const updateInfor = ()=>{
    document.querySelector('.btn-update-info-account').addEventListener('click',async()=>{
        let fullName = document.querySelector('input.fullName').value
        let address = document.querySelector('input.address').value
        let phone = document.querySelector('input.phone').value
        let avatar = document.querySelector('input.avatar')
        let id_user = JSON.parse(localStorage.getItem("user")).id
        
        if(avatar.files.length > 0){
            const formData = new FormData();
            let txtname = Date.now() + "_" + avatar.files[0].name;
            formData.append("avatar", avatar.files[0], txtname);
            let data = {
                id: id_user,
                fullName: fullName,
                address: address,
                phone: phone,
                avatar: txtname,
            }
            console.log(data);
            await callApi('upload-avatar-user', 'POST', formData).then(res => console.log(res))
            await callApi('edit-user', 'PUT', data).then(res => alert(res.data.message))
            my_account()
        }else{
            let data = {
                id: id_user,
                fullName: fullName,
                address: address,
                phone: phone,
            }
            // console.log(data);
            await callApi('edit-user', 'PUT', data).then(res => alert(res.data.message))
            my_account()
        }
    })
}

const chagePassword=()=>{
    document.querySelector('.btn-change-password').addEventListener('click',async()=>{
        let id_user = JSON.parse(localStorage.getItem("user")).id
        let password = document.querySelector('input.password').value
        let conf_password = document.querySelector('input.conf-password').value
        
        
        if(password == conf_password){
            let data = {
                id: id_user,
                password: password,
            }
            // console.log(data);
            await callApi('edit-user', 'PUT', data).then(res => alert(res.data.message))
            my_account()
        }else{
            alert('Xác nhận mật khẩu chưa chính xác')
        }
    })
}

const my_account =async()=>{
    renderInfoAccount()
    let dataUser
    let id_user = JSON.parse(localStorage.getItem("user")).id
    await callApi(`users/${id_user}`, 'GET').then(res=>dataUser = res.data.users)
    renderFrom(dataUser)
}

export default my_account