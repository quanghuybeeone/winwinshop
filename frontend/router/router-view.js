const pageTitle = "Laptop WinWin";
// create an object that maps the url to the template, title, and description
const routes = {
	404: {
		template: "/view/404.html",
		title: "404 | " + pageTitle,
		description: "Page not found",
	},
	"/": {
		template: "/view/home.html",
		title: "Home | " + pageTitle,
		description: "This is the home page",
	},
	"test": {
		template: "/view/test.html",
		title: "Test | " + pageTitle,
		description: "This is the test page",
	},
	"login": {
		template: "/view/login.html",
		title: "Login | " + pageTitle,
		description: "This is the login page",
	},
	"sign-up": {
		template: "/view/sign-up.html",
		title: "Sign-up | " + pageTitle,
		description: "This is the sign-up page",
	},
	"my-account": {
		template: "/view/my-account.html",
		title: "My account | " + pageTitle,
		description: "This is the my-account page",
	},
	"shop-detail": {
		template: "/view/shop-detail.html",
		title: "Shop detail | " + pageTitle,
		description: "This is the shop-detail page",
	},
	"checkout": {
		template: "/view/checkout.html",
		title: "Check out | " + pageTitle,
		description: "This is the checkout page",
	},
	"wishlist": {
		template: "/view/wishlist.html",
		title: "Wishlist | " + pageTitle,
		description: "This is the wishlist page",
	},
	"history": {
		template: "/view/history.html",
		title: "History | " + pageTitle,
		description: "This is the history page",
	},
};


export {routes}