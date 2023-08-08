import callApi from './../../controllers/callApi.js';
import pathImg from './../config.js'

const renderListProducts = async () => {
    let listProducts = []
    let listCategories = []
    await callApi('products/ALL', 'GET').then(res => listProducts = res.data.products)
    await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)
    // console.log(listProducts);
    // console.log(listCategories);

    let html = ``
    Array.from(listCategories).forEach(category => {
        html += `<h2>Danh mục ${category.cate_name}</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sp</th>
                        <th scope="col">Hình sp</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Điều khiển</th>
                    </tr>
                </thead>
                <tbody>`
        Array.from(listProducts).forEach(product => {
            if (product.id_cate == category.id) {
                html += `<tr>
                <td class="id_prd">${product.id}</td>
                <td>${product.prd_name}</td>
                <td><img src="${pathImg}products/${product.prd_img_1}" alt="" style="width: 80px"></td>
                <td>${product.description}</td>
                <td>${product.prd_price.toLocaleString()}đ</td>
                <td>${product.amount}</td>
                <td style="width:95px;">
                    <button style="border: none; background-color: inherit;" class="text-secondary"><i class="fas fa-eye"></i></button>
                    <button style="border: none; background-color: inherit;" class="text-warning"><i data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" class="fas fa-pencil btn-edit-product"></i></button>
                    <button style="border: none; background-color: inherit;" class="text-danger"><i class="fas fa-trash-alt btn-delete-product"></i></button>
                </td>
            </tr>`
            }
        })

        html += `</tbody>
        </table>
    </div>`

    })

    document.querySelector('.content').innerHTML = html
    deleteProduct()
    editProduct()
}

const renderFormProduct = async (data) => {
    if (!data) {
        // console.log('ok');
        document.querySelector('.modal').innerHTML = `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                    Thêm mới sản phẩm
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Tên sản phẩm</label>
                    <input type="email" class="form-control prd_name" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Danh mục</label>
                    <select class="form-select id_cate" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Giá</label>
                    <input type="email" class="form-control prd_price" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <input type="email" class="form-control description" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Số lượng</label>
                    <input type="email" class="form-control amount" placeholder=""/>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text">Ảnh(4)</label>
                    <input type="file" multiple class="form-control prd_img">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary btn-add-product" data-bs-dismiss="modal">Thêm mới</button>
            </div>
        </div>
                                                    </div>`
        let listCategories = []
        await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)
        document.querySelector('.id_cate').innerHTML = Array.from(listCategories).map(category => {
            return `<option value="${category.id}">${category.cate_name}</option>`
        })
    } else {
        document.querySelector('.modal').innerHTML = `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                    Sửa thông tin sản phẩm
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Tên sản phẩm</label>
                    <input type="email" class="form-control prd_name" value="${data.prd_name}" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Danh mục</label>
                    <select class="form-select id_cate" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Giá</label>
                    <input type="email" class="form-control prd_price" value="${data.prd_price}" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <input type="email" class="form-control description" value="${data.description}" placeholder=""/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Số lượng</label>
                    <input type="email" class="form-control amount" value="${data.amount}" placeholder=""/>
                </div>
                <div class="input-group mb-3">
                    <label class="input-group-text">Ảnh(4)</label>
                    <input type="file" multiple class="form-control prd_img">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary edit-product" data-bs-dismiss="modal">Sửa thông tin</button>
            </div>
        </div>
                                                    </div>`
        let listCategories = []
        await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)
        document.querySelector('.id_cate').innerHTML = Array.from(listCategories).map(category => {
            // console.log(category);
            if (data.id_cate == category.id) {
                return `<option value="${category.id}" selected>${category.cate_name}</option>`
            } else {
                return `<option value="${category.id}">${category.cate_name}</option>`
            }

        })
    }

}

const createProduct = () => {
    let btn_add_product = document.querySelector('.btn-add-product')
    btn_add_product.addEventListener('click', async () => {
        let id_cate_input = document.querySelector('.id_cate').value
        let prd_name_input = document.querySelector('.prd_name').value
        let description_input = document.querySelector('.description').value
        let prd_price_input = document.querySelector('.prd_price').value
        let amount_input = document.querySelector('.amount').value
        let prd_img_input = document.querySelector(".prd_img");

        // console.log({
        //     id_cate: id_cate,
        //     prd_name: prd_name,
        //     prd_img_1: prd_img_1,
        //     prd_img_2: prd_img_2,
        //     prd_img_3: prd_img_3,
        //     prd_img_4: prd_img_4,
        //     description: description,
        //     prd_price: prd_price,
        //     amount: amount,
        // })
        let arr_img_prd = ['', '', '', '']
        const formData = new FormData();
        for (let i = 0; i < prd_img_input.files.length; i++) {
            let txtname = Date.now() + i + "_" + prd_img_input.files[i].name;
            //   console.log(txtname);
            arr_img_prd[i] = txtname
            formData.append("prd_img", prd_img_input.files[i], txtname);
        }
        await callApi('upload-img-product', 'POST', formData).then(res => console.log(res))
        await callApi('create-product', 'POST', {
            id_cate: id_cate_input,
            prd_name: prd_name_input,
            prd_img_1: arr_img_prd[0],
            prd_img_2: arr_img_prd[1],
            prd_img_3: arr_img_prd[2],
            prd_img_4: arr_img_prd[3],
            description: description_input,
            prd_price: prd_price_input,
            amount: amount_input,
        }).then(res => console.log(res))
        renderListProducts()
        // renderListProducts()
    })
}

const deleteProduct = () => {
    let btns_delete_product = document.querySelectorAll(".btn-delete-product")
    // console.log(btns_delete_product);
    Array.from(btns_delete_product).forEach(btn_delete_product => {
        btn_delete_product.addEventListener('click', async (e) => {
            let id = e.target.parentElement.parentElement.parentElement.querySelector('.id_prd').innerHTML
            // console.log(id);
            await callApi('delete-product', 'DELETE', {
                id: id
            }
            ).then(res => console.log(res))
            renderListProducts()
        })
    })
}

const editProduct = () => {
    let btns_edit_product = document.querySelectorAll(".btn-edit-product")
    // console.log(btns_edit_product);
    Array.from(btns_edit_product).forEach(btn_edit_product => {
        btn_edit_product.addEventListener('click', async (e) => {
            let id = e.target.parentElement.parentElement.parentElement.querySelector('.id_prd').innerHTML
            let dataProduct;
            await callApi(`products/${id}`, 'GET').then(res => dataProduct = res.data.products)
            // console.log(dataProduct);
            await renderFormProduct(dataProduct)
            // products()

            document.querySelector('.edit-product').addEventListener('click', async () => {
                let id_cate_input = document.querySelector('.id_cate').value
                let prd_name_input = document.querySelector('.prd_name').value
                let description_input = document.querySelector('.description').value
                let prd_price_input = document.querySelector('.prd_price').value
                let amount_input = document.querySelector('.amount').value
                let prd_img_input = document.querySelector(".prd_img");
                // console.log(prd_img_input);
                // console.log({
                //     id: id,
                //     id_cate: id_cate_input,
                //     prd_name: prd_name_input,
                //     prd_img_1: prd_img_input,
                //     prd_img_2: prd_img_input,
                //     prd_img_3: prd_img_input,
                //     prd_img_4: prd_img_input,
                //     description: description_input,
                //     prd_price: prd_price_input,
                //     amount: amount_input,
                // })
                // console.log(prd_img_input.files.length);
                // console.log(id);
                if (prd_img_input.files.length > 0) {
                    let arr_img_prd = ['', '', '', '']
                    const formData = new FormData();
                    for (let i = 0; i < prd_img_input.files.length; i++) {
                        let txtname = Date.now() + i + "_" + prd_img_input.files[i].name;
                        console.log(txtname);
                        arr_img_prd[i] = txtname
                        formData.append("prd_img", prd_img_input.files[i], txtname);
                    }
                    await callApi('upload-img-product', 'POST', formData).then(res => console.log(res))
                    await callApi('edit-product', 'PUT', {
                        id: id,
                        id_cate: id_cate_input,
                        prd_name: prd_name_input,
                        prd_img_1: arr_img_prd[0],
                        prd_img_2: arr_img_prd[1],
                        prd_img_3: arr_img_prd[2],
                        prd_img_4: arr_img_prd[3],
                        description: description_input,
                        prd_price: prd_price_input,
                        amount: amount_input,
                    }).then(res => console.log(res))
                    renderListProducts()
                } else {
                    await callApi('edit-product', 'PUT', {
                        id: id,
                        id_cate: id_cate_input,
                        prd_name: prd_name_input,
                        description: description_input,
                        prd_price: prd_price_input,
                        amount: amount_input,
                    }).then(res => console.log(res))
                    renderListProducts()
                }
            })

        })
    })


}

const loadModalAdd = () => {
    document.querySelector('.add-product').addEventListener('click', async() => {
        await renderFormProduct()
        createProduct()
    })
}

const products = () => {
    renderListProducts()
    // renderFormProduct()
    // createProduct()
    loadModalAdd()
}

export default products