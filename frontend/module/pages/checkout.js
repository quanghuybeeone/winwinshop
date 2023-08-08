import callApi from './../../controllers/callApi.js';
import cart from './../cart.js'

const renderProductInCart = async () => {
  let listProducts = []
  await callApi('products/ALL', 'GET').then(res => listProducts = res.data.products)

  let arrMyCart = JSON.parse(localStorage.getItem("arrMyCart"))
  let html = ``
  let totalCart = 0
  let amountCart = 0
  Array.from(arrMyCart).forEach(itemCart => {
    listProducts.forEach(itemPrd => {
      if (itemPrd.id == itemCart.id) {
        let totalCartItem = 0;
        totalCartItem = itemPrd.prd_price * itemCart.sl
        totalCart += totalCartItem
        amountCart += itemCart.sl
        // console.log(itemPrd.prd_price)
        html += `<li class="list-group-item lh-sm">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <h6 class="my-0">${itemPrd.prd_name}</h6>
                                    <small class="text-body-secondary">${itemPrd.description}</small>
                                </div>
                                <span class="text-body-secondary">${itemPrd.prd_price.toLocaleString()} đ</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <b>SL: ${itemCart.sl}</b>
                                <b class="text-body-secondary">${totalCartItem.toLocaleString()} đ</b>
                            </div>
                        </li>`
      }
    })
  })
  html += `<li class="list-group-item d-flex justify-content-between">
                <span>Tổng tiền (VNĐ)</span>
                <strong>${totalCart.toLocaleString()} đ</strong>
            </li>`
  document.querySelector('.cart-in-checkout').innerHTML = html
  document.querySelector('.badge').innerHTML = amountCart
}

const renderInfoAccountInFormCheckout = async () => {
  let id_user = JSON.parse(localStorage.getItem("user")).id
  // console.log(id_user);
  let user;
  await callApi(`users/${id_user}`, 'GET').then(res => user = res.data.users)
  // console.log(user);
  document.querySelector('.form-checkout').innerHTML = `
    <div class="col-sm-12">
            <label for="fullName" class="form-label">Họ và </label>
            <input type="text" class="form-control" id="fullName" placeholder="" value="${user.fullName}" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>

          <div class="col-12">
            <label for="username" class="form-label">Email</label>
            <div class="input-group has-validation">
              <span class="input-group-text">@</span>
              <input type="text" class="form-control" id="email" value="${user.email}" placeholder="Email" required="">
              <div class="invalid-feedback">
                Your username is required.
              </div>
            </div>
          </div>


          <div class="col-12">
            <label for="address" class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" id="address" value="${user.address}" placeholder="" required="">
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div class="col-12">
            <label for="phone" class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" id="phone" value="${user.phone}" placeholder="" required="">
            <div class="invalid-feedback">
              Please enter your shipping phone.
            </div>
          </div>
    `
}

const handleCheckOut = () => {
  document.querySelector(".btn-checkout").addEventListener('click', async () => {
    let fullName = document.querySelector('#fullName').value
    let phone = document.querySelector('#phone').value
    let email = document.querySelector('#email').value
    let address = document.querySelector('#address').value
    let id_user = JSON.parse(localStorage.getItem("user")).id
    // console.log(id_user);
    let id_bill = "HD"+Date.now()
    

    let listProducts = []
    await callApi('products/ALL', 'GET').then(res => listProducts = res.data.products)

    let arrMyCart = JSON.parse(localStorage.getItem("arrMyCart"))

    let totalCart = 0
    let amountCart = 0
    Array.from(arrMyCart).forEach(itemCart => {
      listProducts.forEach(async(itemPrd) => {
        if (itemPrd.id == itemCart.id) {
          let totalCartItem = 0;
          totalCartItem = itemPrd.prd_price * itemCart.sl
          totalCart += totalCartItem
          // console.log(totalCartItem);
          let dataBillDetail = {
            id_bill: id_bill,
            id_prd: itemPrd.id,
            prd_name: itemPrd.prd_name,
            prd_img: itemPrd.prd_img_1,
            description: itemPrd.description,
            price: itemPrd.prd_price,
            quanlity: itemCart.sl,
          }
          
          // console.log(dataBillDetail);
          await callApi('create-billdetail', 'POST',dataBillDetail).then(res=>console.log(res.data))
          amountCart += itemCart.sl
        }
      })
    })
    console.log(totalCart);
    let dataBill = {
      id_bill: id_bill,
      id_user: id_user,
      fullName: fullName,
      phone: phone,
      email: email,
      address: address,
      total: totalCart,
    }
    // console.log(dataBill)
    await callApi('create-bill', 'POST',dataBill).then(res=>console.log(res.data))
    localStorage.removeItem("arrMyCart");
    window.location.href = "/#history"
    window.location.reload()
  })
}

const checkout = async () => {
  await renderProductInCart()
  await renderInfoAccountInFormCheckout()
  handleCheckOut()
  cart()
}

export default checkout