// import callApi from './callApi.js';
// import dashboardChart from './../module/chartDashboardAdmin.js'
import products from './../module/pages/adminProduct.js'
import categories from './../module/pages/adminCategory.js'
import dashBoard from './../module/pages/adminDashBoard.js'
import orders from './../module/pages/adminOrder.js'
import * as router from './../router/router-admin.js'
import * as login from './../module/pages/login.js'

(async () => {
    login.checklogin()
    login.checkLoginAdmin()
    login.sign_out()
    
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
                dashBoard()
                // dashboardChart()
                break;

            case "products":
                products()
                break;

            case "categories":
                categories()
                break;

            case "orders":
                orders()
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


