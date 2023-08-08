import express from "express"
import fs from "fs"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import productController from "../controllers/productController"
import billController from "../controllers/billController"
import billDetailController from "../controllers/billDetailController"
import categoryController from "../controllers/categoryController"
import uploadController from "../controllers/uploadController"
import adminController from "../controllers/adminController"
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path';

let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname == 'prd_img'){
            cb(null, appRoot + "/src/public/uploads/products");
        }else if (file.fieldname == 'avatar'){
            cb(null, appRoot + "/src/public/uploads/users");
        }else{
            cb(null, appRoot + "/src/public/uploads/");
        }
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, file.originalname);
        // + path.extname(file.originalname)
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let uploadOneFile = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 5);
let uploadMultipleImgPrd = multer({ storage: storage, fileFilter: imageFilter }).array('prd_img', 4);
let uploadAvatarUser = multer({ storage: storage, fileFilter: imageFilter }).single('avatar');

let initWebRoutes = (app) => {
    router.get('/', homeController.getHome)
    router.get('/admin', adminController.getDashBoard)

    router.get('/huybeeone', (req, res) => {
        return res.send("Huybeeone")
    })

    router.post('/api/login-user', userController.handleLoginUser)
    router.get('/api/users/:id', userController.handleGetAllUsers)
    router.post('/api/create-user', userController.handleCreateUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.post('/api/upload-avatar-user', uploadAvatarUser, uploadController.handleUploadFile)

    router.get('/api/products/:id', productController.handleGetAllProducts)
    router.post('/api/create-product', productController.handleCreateProduct)
    router.post('/api/upload-img-product', uploadMultipleImgPrd, uploadController.handleUploadMultipleFiles)
    router.put('/api/edit-product', productController.handleEditProduct)
    router.delete('/api/delete-product', productController.handleDeleteProduct)

    router.get('/api/bills/:id', billController.handleGetAllBills)
    router.post('/api/create-bill', billController.handleCreateBill)
    router.put('/api/edit-bill', billController.handleEditBill)

    router.get('/api/billdetails/:id', billDetailController.handleGetAllBillDetails)
    router.post('/api/create-billdetail', billDetailController.handleCreateBillDetail)
    router.put('/api/edit-billdetail', billDetailController.handleEditBillDetail)

    router.get('/api/categories/:id', categoryController.handleGetAllCategories)
    router.post('/api/create-category', categoryController.handleCreateCategory)
    router.put('/api/edit-category', categoryController.handleEditCategory)
    router.delete('/api/delete-category', categoryController.handleDeleteCategory)

    
    router.post('/upload-one-image', uploadOneFile, uploadController.handleUploadFile)
    router.post('/upload-multiple-images', uploadMultipleFiles, uploadController.handleUploadMultipleFiles)
    


    return app.use("/", router)
}

module.exports = initWebRoutes