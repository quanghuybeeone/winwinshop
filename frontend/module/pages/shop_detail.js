import pathImg from './../config.js'
import callApi from './../../controllers/callApi.js';
import cart from './../cart.js'

const renderShopDetail = async() => {
    let id = window.location.search.replace("?id=", "")
    let listProducts = []
    await callApi('products/ALL', 'GET').then(res => listProducts = res.data.products)
                // console.log(id)
                // shopdetailPage.renderShopDetail(listProducts, id)

    listProducts.forEach((itemPrd) => {
        if (itemPrd.id == id) {
            document.querySelector('#detail-shop').innerHTML = `
                            <h4>${itemPrd.prd_name} ${itemPrd.description}</h4>
                            <p>${itemPrd.prd_name} ${itemPrd.description}. 
                                Bảo hành 12T lỗi 1 đổi 1, tặng đầy đủ phụ kiện, miễn phí giao hàng tận nơi, hàng Xách tay chính hãng, thiết kế cao
                                cấp, siêu mỏng đẹp, cấu hình mạnh. Trả góp 0% thẻ tín dụng.</p>
                            <div class="row">
                                <div class="col-lg-3 col-md-12 col-sm-12">
                                <div id="carouselExampleIndicators" class="carousel slide">
                                    <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                                        aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                        aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
                                        aria-label="Slide 4"></button>
                                    </div>
                                    <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="${pathImg}products/${itemPrd.prd_img_1}" class="d-block w-100" alt="">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${pathImg}products/${itemPrd.prd_img_2}" class="d-block w-100" alt="">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${pathImg}products/${itemPrd.prd_img_3}" class="d-block w-100" alt="">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="${pathImg}products/${itemPrd.prd_img_4}" class="d-block w-100" alt="">
                                    </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div class="row">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                                    aria-current="true" aria-label="Slide 1"
                                    style="float: left; width: 25%;border: none; outline: none; background: inherit; padding: 0;"><img
                                        width="100%" src="${pathImg}products/${itemPrd.prd_img_1}" alt=""></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"
                                    style="float: left; width: 25%;border: none; outline: none; background: inherit; padding: 0;"><img
                                        width="100%" src="${pathImg}products/${itemPrd.prd_img_2}" alt=""></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"
                                    style="float: left; width: 25%;border: none; outline: none; background: inherit; padding: 0;"><img
                                        width="100%" src="${pathImg}products/${itemPrd.prd_img_3}" alt=""></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"
                                    style="float: left; width: 25%;border: none; outline: none; background: inherit; padding: 0;"><img
                                        width="100%" src="${pathImg}products/${itemPrd.prd_img_4}" alt=""></button>
                                </div>
                                </div>
                                <div class="col-lg-5 col-md-6 col-sm-12 p-4">
                                <h4 class="text-danger">${itemPrd.prd_price.toLocaleString()} đ</h4>
                                <p>(Liên hệ ngay để biết thêm thông tin)</p>
                                <h6>KHUYẾN MÃI</h6>
                                <ul>
                                    <li>Tặng Voucher 300k áp dụng cho lần mua tiếp theo, đơn hàng trên 5tr, hạn sử dụng 24 tháng</li>
                                    <li>Tặng phiếu cài đặt, vệ sinh trọn đời máy trị giá 1 triệu</li>
                                    <li>Tặng phiếu hỗ trợ kỹ thuật từ xa miễn phí suốt đời máy trị giá 700k</li>
                                    <li>Tặng phiếu bảo hành tận nơi đối với doanh nghiệp mua số lượng máy PC or Workstation trị giá 10 triệu</li>
                                </ul>
                                <div class="row">
                                    <div class="col-12 p-1">
                                    <input hidden class="id-prd" type="number" value="${itemPrd.id}" />
                                    <button style="width: 100%;" class="btn btn-warning btn-add-to-cart"><b>MUA NGAY</b></button></div>
                                    
                                    <div class="col-6 p-1"><button style="width: 100%;" class="btn btn-dark border-0"><b>MUA TRẢ GÓP
                                        0%</b><br><small>Thủ tục đơn giản</small></button></div>
                                    <div class="col-6 p-1" style="padding-left: 5px;"><button style="width: 100%;"
                                        class="btn btn-dark border-0"><b>GỌI LẠI CHO TÔI</b><br><small>Sẵn sàn tư vấn</small></button></div>
    
                                </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-12 p-4">
                                <table class="table table-bordered border-1 text-success">
                                    <tr>
                                    <td class="text-center"><i class="fas fa-phone-volume"></i></td>
                                    <td>Tư vấn & Mua hàng <br> Gọi 1800 6820</td>
                                    </tr>
                                    <tr>
                                    <td class="text-center"><i class="fas fa-truck"></i></td>
                                    <td>Giao hàng miễn phí HCM</td>
                                    </tr>
                                    <tr>
                                    <td class="text-center"><i class="fas fa-truck-loading"></i></i></td>
                                    <td>Ship COD toàn quốc</td>
                                    </tr>
                                    <tr>
                                    <td class="text-center"><i class="fas fa-vote-yea"></i></td>
                                    <td>ProSupport 24h Workstation desktop</td>
                                    </tr>
                                    <tr>
                                    <td class="text-center"><i class="fas fa-wrench"></i></td>
                                    <td>Bảo Hành 12 Tháng Cho Laptop</td>
                                    </tr>
                                </table>
                                </div>
                            </div>
                            `;
        }
    })
}

const shop_detail = async()=>{
    await renderShopDetail()
    cart()
}

export default shop_detail