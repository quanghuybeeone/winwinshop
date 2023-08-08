import pathImg from './config.js'
import callApi from './../controllers/callApi.js';

const renderMyCart = async() => {
    let total = 0
    if(!localStorage.getItem("arrMyCart")){
        localStorage.setItem("arrMyCart", "[]");
    }
    let arrMyCart = JSON.parse(localStorage.getItem("arrMyCart"));
    // console.log(arrMyCart);
    let listProducts = []
    await callApi('products/ALL', 'GET').then(res => listProducts = res.data.products)
    let html = ``
    let i = 0
    arrMyCart.forEach((itemCart) => {
        listProducts.forEach(itemPrd => {
            let totalItem = 0
            if (itemPrd.id == itemCart.id) {
                totalItem = itemPrd.prd_price * itemCart.sl
                total += totalItem
                html += `<div class="px-3 py-2 d-flex justify-content-center position-relative">
                <div class="d-flex align-items-center border-bottom p-1">
                    <img src="${pathImg}products/${itemPrd.prd_img_1}" alt="" height="50" width="50">
                    <div class="d-flex flex-column px-2">
                    <small>${itemPrd.prd_name}</small>
                    <div>
                        <span>${itemPrd.prd_price.toLocaleString()} đ x</span><input class="col-2 mx-1 amount-cart" style="width:40px;" type="number" min="1" max="10" value="${itemCart.sl}"><span>SL</span>
                    </div>
                    <b>${totalItem.toLocaleString()} đ</b>
                    <input type="text" hidden class="index-cart" value="${i}">
                    <div class="delete-item p-2 m-0 mt-3" style="cursor: pointer; color: black;">x</div>
                    </div>
                </div>
                </div>`
                i++
            }
        });

    })
    // console.log(html);
    html += `
    <div class="d-flex justify-content-end py-2">
                        <span>Tổng tiền: </span> <b class="mx-2"> ${total.toLocaleString()} đ</b>
                    </div>
                    `

    document.querySelector("#content-cart").innerHTML = html
    changeAmount()
    deleteItemCart()   
}

function openCart() {
    document.getElementById("mySidenav").style.width = "300px";
}

const addToCart = () => {
    const btn_add_to_carts = document.querySelectorAll(".btn-add-to-cart")
    Array.from(btn_add_to_carts).forEach(btn_add_to_cart=>{
        btn_add_to_cart.addEventListener('click', function(event){
            let arrMyCart = JSON.parse(localStorage.getItem("arrMyCart"));
           console.log('ok');
           const id_prd = event.target.parentElement.parentElement.querySelector('.id-prd').value
                   let flag = 0
                   for (let i = 0; i <= arrMyCart.length; i++) {
                       if (arrMyCart[i]) {
                           // console.log(arrMyCart[i].id);
                           if (id_prd == arrMyCart[i].id) {
                               flag = 1
                               arrMyCart[i].sl++
                           }
                           if(arrMyCart[i].sl>10){
                            arrMyCart[i].sl=10
                           }
                       }
                   }
       
                   if (flag == 0) {
                       arrMyCart.push({
                           id: id_prd,
                           sl: 1
                       })
                   }
                   localStorage.setItem("arrMyCart", JSON.stringify(arrMyCart));
            renderMyCart()
            openCart()
        })
    })

    
    
}

const changeAmount = ()=>{
    let arrMyCart = JSON.parse(localStorage.getItem("arrMyCart"));
    const inputAmounts = document.querySelectorAll(".amount-cart")
    Array.from(inputAmounts).forEach(inputAmount=>{
        inputAmount.addEventListener('click', function(event){
            // console.log(event.target.parentElement.parentElement.querySelector(".index-cart").value);
            let sl = event.target.value
            let index = event.target.parentElement.parentElement.querySelector(".index-cart").value
            arrMyCart[index].sl = Number(sl)
            // console.log(arrMyCart[index].sl);
            localStorage.setItem("arrMyCart", JSON.stringify(arrMyCart));
            renderMyCart()
        })
    })
}

const deleteItemCart = () => {
    let arrMyCart = JSON.parse(localStorage.getItem("arrMyCart"));
    const btn_deletes = document.querySelectorAll(".delete-item")
    Array.from(btn_deletes).forEach(btn_delete => {
        btn_delete.addEventListener('click', function(event) {
            // console.log(event.target.parentElement.querySelector(".index-cart").value)
            let index = event.target.parentElement.querySelector(".index-cart").value
            arrMyCart.splice(index, 1);
            localStorage.setItem("arrMyCart", JSON.stringify(arrMyCart));
            renderMyCart()
        });
    });   
}

const cart = async()=>{
    await renderMyCart()
    addToCart()
    changeAmount()
    deleteItemCart()
}

export default cart