import productService from "../services/productService"

let handleGetAllProducts = async (req, res) =>{
    let id = req.params.id
    console.log(id)
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter",
            products: []
        })
    }
    let products = await productService.getAllProducts(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        products
    })
}

let handleCreateProduct = async(req, res)=>{
    let message = await productService.createProduct(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteProduct = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await productService.deleteProduct(req.body.id)
    return res.status(200).json(message)
}

let handleEditProduct = async(req, res)=>{
    let data = req.body
    let message = await productService.editProduct(data)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllProducts: handleGetAllProducts,
    handleCreateProduct: handleCreateProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleEditProduct: handleEditProduct
}