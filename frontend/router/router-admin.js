const pageTitle = "Admin WinWin";
// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "/view/404.html",
		title: "404 | " + pageTitle,
		description: "Page not found",
	},
	"/": {
		template: "/admin/view/dashboard.html",
		title: "Dashboard | " + pageTitle,
		description: "This is the home page",
	},
	"products": {
		template: "/admin/view/products.html",
		title: "Products | " + pageTitle,
		description: "This is the products page",
	},
	"categories": {
		template: "/admin/view/categories.html",
		title: "Categories | " + pageTitle,
		description: "This is the categories page",
	},
	"orders": {
		template: "/admin/view/orders.html",
		title: "Orders | " + pageTitle,
		description: "This is the orders page",
	},
	"test": {
		template: "/admin/view/test.html",
		title: "Test | " + pageTitle,
		description: "This is the test page",
	},
	
};

export {routes}