import pathImg from './config.js'
import callApi from './../controllers/callApi.js';

const searchProduct = async()=>{
    let listProducts = []
    await callApi('products/ALL', 'GET').then(res=>listProducts = res.data.products)
    // console.log(listProducts);
     document.querySelector('.input-search').addEventListener('click',(e)=>{
        e.stopPropagation();
     })
    document.querySelector('.input-search').addEventListener('keyup',(e)=>{
        let keyword = e.target.value
        let html = ``
        console.log(keyword);
        let i = 0
        if(keyword!= ""){
            listProducts.forEach(item => {
                if(item.prd_name.toUpperCase().search(keyword.toUpperCase())>-1 || item.description.toUpperCase().search(keyword.toUpperCase())>-1){
                    console.log(item);
                    if(i<7){
                        html +=`
                        <li class="dropdown-item">
                            <a href="?id=${item.id}#shop-detail" class="d-flex text-decoration-none">
                                <img src="${pathImg}products/${item.prd_img_1}" width="50px" height="50px" alt="">
                                <div class="px-2">
                                    <div class="m-0 text-dark"><small>${item.prd_name}</small></div>
                                    <div class="m-0 text-secondary"><small>${item.description}</small></div>
                                </div>
                            </a>
                        </li>
                        `
                    }
                    i++
                }
                
            })
            if(html == ``){
                html=`<li class="dropdown-item"><div class="m-0 text-secondary"><small>Không tìm thấy kế quả "${keyword}"</small></div></li>`
            }
            document.querySelector('.content-search').innerHTML = html
        }
        
    })
}

export default searchProduct