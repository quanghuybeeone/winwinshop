import callApi from './../../controllers/callApi.js';

const renderListCategories = async () => {
    let listCategories = []
    await callApi('categories/ALL', 'GET').then(res => listCategories = res.data.categories)
    let html = ``
    Array.from(listCategories).forEach(category => {
        html += `<tr>
        <td class="id_cate">${category.id}</td>
        <td>${category.cate_name}</td>
        <td>${category.description}</td>
        <td>
            <button style="border: none; background-color: inherit;" class="text-secondary"><i class="fas fa-eye"></i></button>
            <button style="border: none; background-color: inherit;" class="text-warning"><i data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" class="fas fa-pencil btn-edit-category"></i></button>
            <button style="border: none; background-color: inherit;" class="text-danger"><i class="fas fa-trash-alt btn-delete-category"></i></button>
        </td>
    </tr>`
    })
    document.querySelector('.listCategories').innerHTML = html
    deleteCategory()
    editCategory()
}

const renderFormCategory = (data) => {
    if (!data) {
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
                    <label class="form-label">Tên danh mục</label>
                    <input type="text" class="form-control cate_name" placeholder="Laptop Gaming" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <input type="text" class="form-control description" placeholder="Dell, HP, Thinkpad, Asus, Msi" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Hủy
                </button>
                <button type="button" class="btn btn-primary btn-add-category" data-bs-dismiss="modal">Thêm mới</button>
            </div>
        </div>
    </div>`
    } else {
        document.querySelector('.modal').innerHTML = `<div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalToggleLabel">
                    Sửa tên danh mục
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Tên danh mục</label>
                    <input type="text" class="form-control cate_name" value="${data.cate_name}" placeholder="Laptop Gaming" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Mô tả</label>
                    <input type="text" class="form-control description" value="${data.description}" placeholder="Dell, HP, Thinkpad, Asus, Msi" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    Hủy
                </button>
                <button type="button" class="btn btn-primary edit-category" data-bs-dismiss="modal">Sửa</button>
            </div>
        </div>
    </div>`
    }
}

const createCategory = () => {
    let btn_add_category = document.querySelector('.btn-add-category')
    btn_add_category.addEventListener('click', async () => {
        let cate_name_input = document.querySelector('.cate_name').value
        let description_input = document.querySelector('.description').value

        console.log({
            cate_name: cate_name_input,
            description: description_input,
        })

        await callApi('create-category', 'POST', {
            cate_name: cate_name_input,
            description: description_input,
        }).then(res => console.log(res))
        renderListCategories()
    })
}

const deleteCategory = () => {
    let btns_delete_category = document.querySelectorAll(".btn-delete-category")
    // console.log(btns_delete_category);
    Array.from(btns_delete_category).forEach(btn_delete_category => {
        btn_delete_category.addEventListener('click', async (e) => {
            let id = e.target.parentElement.parentElement.parentElement.querySelector('.id_cate').innerHTML
            console.log(id);
            // console.log(e.target.parentElement.parentElement.parentElement)
            await callApi('delete-category', 'DELETE', {
                id: id
            }
            ).then(res => console.log(res))
            renderListCategories()
        })
    })
}

const editCategory = () => {
    let btns_edit_category = document.querySelectorAll(".btn-edit-category")
    // console.log(btns_edit_category);
    Array.from(btns_edit_category).forEach(btn_edit_category => {
        btn_edit_category.addEventListener('click', async (e) => {
            let id = e.target.parentElement.parentElement.parentElement.querySelector('.id_cate').innerHTML
            console.log(id);
            let dataCategory;
            await callApi(`categories/${id}`, 'GET').then(res => dataCategory = res.data.categories)
            console.log(dataCategory);
            await renderFormCategory(dataCategory)

            document.querySelector('.edit-category').addEventListener('click', async () => {
                let cate_name_input = document.querySelector('.cate_name').value
                let description_input = document.querySelector('.description').value
                await callApi('edit-category', 'PUT', {
                    id: id,
                    cate_name: cate_name_input,
                    description: description_input,
                }).then(res => console.log(res))
                renderListCategories()

            })

        })
    })


}
const loadModalAdd = () => {
    document.querySelector('.add-category').addEventListener('click', async () => {
        await renderFormCategory()
        createCategory()
    })
}

const categories = async () => {
    await renderListCategories()
    renderFormCategory()
    loadModalAdd()
}

export default categories