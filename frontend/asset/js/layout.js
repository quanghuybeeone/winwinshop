const loadHeader1 = () => {
  let header1 = document.querySelector("#header1");
  header1.innerHTML = `<div class="container d-flex flex-wrap">
    <ul class="nav me-auto">
        <li class="nav-item"><a href="#" class="nav-link link-dark text-white px-2">Email: abc123@gmail.com</a>
        </li>
        <li class="nav-item"><a href="#" class="nav-link link-dark text-white px-2">Hotline: 0378-123-123</a>
        </li>
    </ul>
    <ul class="nav d-flex flex-wrap justify-content-end menu-login">
        <li class="nav-item"><a href="#login" class="btn btn-outline-light me-2">Login</a></li>
        <li class="nav-item"><a href="#sign-up" class="btn btn-dark me-2">Sign up</a></li>  
    </ul>
    
</div>`;
};
const loadHeader2 = () => {
  let header2 = document.querySelector("#header2");
  header2.innerHTML = `
    <header>
      <!-- Jumbotron -->
      <div class="p-3 text-center bg-light border-bottom">
          <div class="container">
              <div class="row gy-3">
                  <!-- Left elements -->
                  <div class="col-lg-3 col-sm-4 col-4 text-center">
                      <a href="/" class="">
                          <img src="../asset/img/logo1.png" height="35" width="">
                      </a>
                  </div>
                  <!-- Left elements -->

                  <!-- Center elements -->
                  <div class="order-lg-last col-lg-2 col-sm-8 col-8">
                      <div class="d-flex float-end" style="cursor:pointer" onclick="openNav()">
                          <!-- <a href="#" class="me-1 border rounded py-1 px-3 text-warning nav-link d-flex align-items-center" target="_blank"> <i class="fas fa-user-alt m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Sign in</p> </a>
                            <a href="#" class="me-1 border rounded py-1 px-3 text-warning nav-link d-flex align-items-center" target="_blank"> <i class="fas fa-heart m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Wishlist</p> </a> -->
                          <div class="border rounded py-1 px-3 text-warning nav-link d-flex align-items-center"
                              target="_blank">
                              <i class="fas fa-shopping-cart m-1 me-md-2"></i>
                              <p class="d-none d-md-block mb-0">My cart</p>
                          </div>
                      </div>
                  </div>
                  <!-- Center elements -->

                  <!-- Right elements -->
                  <div class="col-lg-6 col-md-12 col-12">
                      <div class="input-group float-center justify-content-center">
                          <div class="form-outline position-relative col-10">
                              <input type="search" class="form-control input-search" id="dropdownSearch" data-bs-toggle="dropdown" aria-expanded="true">
                              <ul class="dropdown-menu text-small shadow content-search" aria-labelledby="dropdownSearch"  style="z-index: 10000;min-width: 100%">
                              <li class="dropdown-item"><div class="m-0 text-secondary"><small>Nhập từ khóa tìm kiếm</small></div></li>
                              </ul>
                          </div>
                          <button type="button" class="btn btn-warning shadow-0">
                              <i class="fas fa-search"></i>
                          </button>
                      </div>
                  </div>
                  <!-- Right elements -->
              </div>
          </div>
      </div>
  </header>
    `;
};
const loadHeader3 = () => {
  let header3 = document.querySelector("#header3");
  header3.innerHTML = `<ul class="nav nav-pills" id="cate_nav">
                          <!-- <li class="nav-item"><a href="#" class="nav-link link-dark active bg-warning" aria-current="page">Home</a></li> -->
                          <li class="nav-item"><a href="#" class="nav-link link-dark">DELL PRECISION</a></li>
                          <li class="nav-item"><a href="#" class="nav-link link-dark">HP ZBOOK WORKSTATION</a></li>
                          <li class="nav-item"><a href="#" class="nav-link link-dark">LENOVO THINKPAD</a></li>
                          <li class="nav-item"><a href="#" class="nav-link link-dark">DELL LATITUDE</a></li>
                          <li class="nav-item"><a href="#" class="nav-link link-dark">DELL OPTIPLEX</a></li>
                          <li class="nav-item"><a href="#" class="nav-link link-dark">PC GAMING</a></li>
                          <li class="nav-item"><a href="#" class="nav-link link-dark">MÁY TÍNH ALL IN ONE</a></li>
                        </ul>`;
};

const loadFooter = () => {
  let footer = document.querySelector("#footer");
  footer.innerHTML = `
    <div class="bg-dark bg-gradient text-white px-5">
        <div class="container">
            <footer class="pt-5">
                <div class="row">
                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Home</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Features</a>
                    </li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Pricing</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">FAQs</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">About</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Home</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Features</a>
                    </li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Pricing</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">FAQs</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">About</a></li>
                    </ul>
                </div>
                <div class="col-12 col-md-3 mb-3">
                    <h5>Danh mục sản phẩm</h5>
                    <ul class="nav flex-column "id="cate_footer">
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Home</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Features</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">Pricing</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">FAQs</a></li>
                    <li class="nav-item mb-2"><a href="#" class="nav-link link-light p-0 text-body-secondary">About</a></li>
                    </ul>
                </div>
                <div class="col-md-5 mb-3">
                    <form>
                    <h5>Subscribe to our newsletter</h5>
                    <p>Monthly digest of what's new and exciting from us.</p>
                    <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                        <label for="newsletter1" class="visually-hidden">Email address</label>
                        <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
                        <button class="btn btn-primary" type="button">Subscribe</button>
                    </div>
                    </form>
                </div>
                </div>
                <div class="d-flex flex-column flex-sm-row justify-content-between pt-2 border-top ">
                <p>© 2023 Fpoly, Huybeeone. All rights reserved.</p>
                <ul class="d-flex list-unstyled">
                    <li class="ms-3"><a class="link-body-emphasis link-light" href="#"><i class="fab fa-twitter"></i></a></li>
                    <li class="ms-3"><a class="link-body-emphasis link-light" href="#"><i class="fab fa-facebook"></i></a></li>
                    <li class="ms-3"><a class="link-body-emphasis link-light" href="#"><i class="fab fa-instagram"></i></a></li>
                </ul>
                </div>
            </footer>
        </div>
    </div>
    `;
};

const loadMyCart = () => {
  let my_cart = document.querySelector("#my-cart");
  my_cart.innerHTML = `
    <div id="mySidenav" class="sidenav">
        <h3 class="text-light px-4">My cart</h3>
        <a href="javascript:void(0)" class="closebtn px-2 m-0" onclick="closeNav()">&times;</a>
        <div class="box-cart p-2">
        <div class="bg-light cart">
            <div class="item-in-cart">
            <div class="row" id="content-cart">
            <div class="d-flex justify-content-end py-2">
            <span>Tổng tiền: </span> <b class="mx-2"> 0đ</b>
        </div>
            </div>
            </div>
        </div>
        <div class="row px-3 py-2">
            <a href="#checkout" class="btn btn-warning d-flex justify-content-center">Thanh toán</a>
        </div>
        </div>
    </div>
    `;
};

loadHeader1();
loadHeader2();
loadHeader3();
loadFooter();
loadMyCart();
