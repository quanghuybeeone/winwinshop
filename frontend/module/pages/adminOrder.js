import callApi from './../../controllers/callApi.js';
import pathImg from './../config.js'

const renderListOrder = async () => {
    let dataBills = [];
    await callApi('bills/ALL', 'GET').then(res => dataBills = res.data.bills)
    if (dataBills.length > 0) {
        // console.log(dataBills);
        let html = ``
        dataBills.forEach(bill => {
                // console.log(bill);
                let status
                let btn = ``
                if (bill.status == 1) {
                    status = `<span class="badge bg-dark">Đã hủy</span>`
                } else if (bill.status == 2) {
                    status = `<span class="badge bg-warning text-dark">Hàng đang được giao</span>`
                } else if (bill.status == 3) {
                    status = `<span class="badge bg-success">Thành công</span>`
                } else if (bill.status == 4) {
                    status = `<span class="badge bg-danger">Thất bại</span>`
                } else {
                    status = `<span class="badge bg-primary">Chờ xử lý</span>`
                    btn = `<button class="btn btn-info btn-handle">Xử lý</button>`
                }
                html += `
            <tr>
                <td class="id_bill" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"
                data-bs-dismiss="modal" style="cursor: pointer;">${bill.id_bill}</td>
                <td>${bill.email}đ</td>
                <td>${bill.total.toLocaleString()}đ</td>
                <td>${bill.createdAt}<input type="text" hidden class="id-order" value="${bill.id}"></td>
                <td>${status}</td>
                <td>${btn}</td>
            </tr>
        `
        
        });
        document.querySelector('.renderListBill').innerHTML = html
        renderBillDetail()
        handleConfirm()
    }


}

const renderBillDetail = () => {
    let links_id_bill = document.querySelectorAll('.id_bill')
    links_id_bill.forEach(link => {
        link.addEventListener('click', async (e) => {
            console.log(e.target.innerHTML);
            let id_bill = e.target.innerHTML
            await ham1(id_bill)
            await ham2(id_bill)
        })
    });
}

const ham1 = async(id_bill)=>{
    let dataBills
    await callApi(`bills/ALL`, 'GET').then(res => dataBills = res.data.bills)
    let html = ``
    dataBills.forEach(async (dataBill) => {
        if (id_bill == dataBill.id_bill) {
            // console.log(dataBill);
            let status
            if (dataBill.status == 1) {
                status = `<span class="badge bg-dark">Đã hủy</span>`
            } else if (dataBill.status == 2) {
                status = `<span class="badge bg-warning text-dark">Hàng đang được giao</span>`
            } else if (dataBill.status == 3) {
                status = `<span class="badge bg-success">Thành công</span>`
            } else if (dataBill.status == 4) {
                status = `<span class="badge bg-danger">Thất bại</span>`
            } else {
                status = `<span class="badge bg-primary">Chờ xử lý</span>`
            }
            html += `<div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">
                                    Chi tiết đơn hàng ${dataBill.id_bill}
                                </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th colspan="2" class="">Thông tin đơn hàng</th>
                                            </tr>
                                        </thead>
                                        <tbody class="infoAccount">
                                            <tr>
                                                <td><b>Họ tên KH: </b></td>
                                                <td>${dataBill.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Số điện thoại: </b></td>
                                                <td>${dataBill.phone}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Email: </b></td>
                                                <td>${dataBill.email}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Address: </b></td>
                                                <td>${dataBill.address}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Trạng thái: </b></td>
                                                <td>${status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="mb-3">
                                    <ul class="list-group mb-3 detail-order"></ul>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            </div>
                        </div>
                    </div>`
        }
    })
    // console.log(html);
    document.querySelector('.modal').innerHTML = html
}

const ham2 = async (id_bill) => {
    let html = ``
    let total = 0
    let dataBillDetails
    await callApi('billdetails/ALL', 'GET').then(res => dataBillDetails = res.data.billdetails)
    // console.log(dataBillDetails);

    dataBillDetails.forEach(dataBillDetail => {
        let totalItem = 0
        if (dataBillDetail.id_bill == id_bill) {
            console.log(dataBillDetail);
            total += dataBillDetail.price*dataBillDetail.quanlity
            totalItem = dataBillDetail.price*dataBillDetail.quanlity
            html += `<li class="list-group-item lh-sm">
                        <div class="d-flex justify-content-between">
                            <div class="p-1">
                                <img src="${pathImg}products/${dataBillDetail.prd_img}" alt="" width="80px">
                            </div>
                            <div class="p-1">
                            <h6 class="my-0">${dataBillDetail.prd_name}</h6>
                            <small class="text-body-secondary">${dataBillDetail.description}</small>
                            </div>
                            <span class="text-body-secondary">${dataBillDetail.price.toLocaleString()}đ</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <b>SL: ${dataBillDetail.quanlity}</b>
                            <b class="text-body-secondary">${totalItem.toLocaleString()}đ</b>
                        </div>
                    </li>`
        }
    })
    html+=`<li class="list-group-item d-flex justify-content-between">
                <span>Tổng tiền (VNĐ)</span>
                <strong>${total.toLocaleString()}đ</strong>
            </li>`
  document.querySelector('.detail-order').innerHTML = html
}

const handleConfirm = ()=>{
    let btns_handle = document.querySelectorAll('.btn-handle')
    btns_handle.forEach(btn_handle=>{
        btn_handle.addEventListener('click', async(e)=>{
            console.log(e.target.parentElement.parentElement.querySelector('.id-order').value);
            let id_order = e.target.parentElement.parentElement.querySelector('.id-order').value
            let data = {
                id: id_order,
                status: 2,
            }
            await callApi('edit-bill', 'PUT',data).then(res=>console.log(res.data))
            orders()
        })
    })
}

const orders = async () => {
    await renderListOrder()
}

export default orders