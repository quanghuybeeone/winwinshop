import pathImg from './../config.js'
import callApi from './../../controllers/callApi.js';
import cart from './../cart.js'

const renderCateInBanner = async() => {
    let listCategories = []
    await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)

    
    document.querySelector("#cate_banner").innerHTML = listCategories
        .map((itemCate) => {
            let html = `
                                    <a class="nav-link link-dark my-0 py-2 ps-3 bg-white border-bottom" href="#"><b>${itemCate.cate_name}</b>
                                        <div class="text-secondary">${itemCate.description}</div>
                                    </a>
                                    `;
            return html;
        })
        .join("");

}

const renderMainListProducts = async() => {
    let listCategories = []
    await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)
    let listProducts = []
    await callApi('products/ALL', 'GET').then(res => listProducts = res.data.products)
    let html = "";
    listCategories.forEach((itemCate) => {
        html += `<div class="row">
                <div class="mb-4">
                    <h3>${itemCate.cate_name}</h3>
                </div>`;
        listProducts.forEach((itemPrd) => {
            if (itemPrd.id_cate == itemCate.id) {
                html += `
                    <div class="col-lg-3 col-md-6 col-sm-6 px-1">
                        <div class="card my-2 shadow-0">
                        <a href="?id=${itemPrd.id}#shop-detail" class="img-wrap">
                            <img src="${pathImg}products/${itemPrd.prd_img_1}" class="card-img-top" style="aspect-ratio: 1 / 1">
                        </a>
                        <div class="card-body p-0 pt-2">
                            <button class="btn btn-light border mx-2 px-2 pt-2 float-end icon-hover btn-add-to-cart"><i
                                class="fas fa-shopping-cart fa-lg px-1 text-secondary"></i></button>
                            <input hidden class="id-prd" type="number" value="${itemPrd.id}" />
                            <h6 class="px-3 card-title">${itemPrd.prd_price.toLocaleString()} đ</h6>
                            <p class="px-3 card-text mb-0">${itemPrd.prd_name}</p>
                            <p class="px-3 text-muted">${itemPrd.description}</p>
                        </div>
                        </div>
                    </div>
                    `;
            }
        });
        html += `</div>`;
    });
    document.querySelector("#listPrdHome").innerHTML = html;
}

const home = async()=>{
    await renderCateInBanner()
    await renderMainListProducts()
    cart()
}

export default home