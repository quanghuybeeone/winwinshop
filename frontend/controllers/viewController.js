import * as router from './../router/router-view.js'
import home from './../module/pages/home.js'
import shop_detail from './../module/pages/shop_detail.js'
import sign_up from './../module/pages/sign_up.js'
import my_account from './../module/pages/my_account.js'
import checkout from './../module/pages/checkout.js'
import history from './../module/pages/history.js'
import * as login from './../module/pages/login.js'
import menuCategories from './../module/menuCategories.js'
import searchProduct from './../module/search.js'

(async () => {
    await menuCategories()
    searchProduct()
    if (localStorage.getItem("user")) {
        // console.log(JSON.parse(localStorage.getItem("user")))
        let data = JSON.parse(localStorage.getItem("user"))
        login.renderMenuLogined(data)
    }
    // create a function that watches the url and calls the urlLocationHandler
    const locationController = async () => {
        // get the url path, replace hash with empty string
        let location = window.location.hash.replace("#", "");
        // if the path length is 0, set it to primary page route
        if (location.length == 0) {
            location = "/";
        }
        // get the route object from the routes object
        const route = router.routes[location] || router.routes["404"];
        // get the html from the template
        const html = await fetch(route.template).then((response) => response.text());
        // set the content of the content div to the html
        document.getElementById("main-page").innerHTML = html;
        // set the title of the document to the title of the route
        document.title = route.title;
        // set the description of the document to the description of the route
        document
            .querySelector('meta[name="description"]')
            .setAttribute("content", route.description);

        switch (location) {
            case "/":
                home()
                break;

            case "shop-detail":
                shop_detail()
                break;

            case "sign-up":
                sign_up()
                break;

            case "login":
                login.login()
                break;

            case "my-account":
                login.checklogin()
                my_account()
                break;

            case "checkout":
                login.checklogin()
                checkout()
                break;

            case "wishlist":
                login.checklogin()
                break;

            case "history":
                login.checklogin()
                history()
                break;

            default:
                break;
        }
    };
    // create a function that watches the hash and calls the urlLocationHandler
    window.addEventListener("hashchange", locationController);
    // call the urlLocationHandler to load the page
    locationController();
})();


