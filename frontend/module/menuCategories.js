import callApi from './../controllers/callApi.js';

const renderCateInNav = (listCategories) => {
    document.querySelector("#cate_nav").innerHTML = listCategories
        .map((itemCate) => {
            let html = `
        <li class="nav-item"><a href="#" class="nav-link link-dark">${itemCate.cate_name}</a></li>
        `;
            return html;
        })
        .join("");
}
const renderCateInFooter = (listCategories) => {
    document.querySelector("#cate_footer").innerHTML = listCategories
        .map((itemCate) => {
            let html = `
        <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">${itemCate.cate_name}</a></li>
        `;
            return html;
        })
        .join("");
}

const renderMenuCate = async()=>{
    let listCategories = []
    await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)
    renderCateInNav(listCategories)
    renderCateInFooter(listCategories)
}

export default renderMenuCate