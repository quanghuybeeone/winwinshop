import db from "../models/index"

let getAllProducts = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ""
            if (productId === "ALL") {
                products = await db.Product.findAll()
            }
            if (productId && productId !== "ALL") {
                products = await db.Product.findOne({
                    where: { id: productId }
                })
            }
            resolve(products)
        } catch (e) {
            reject(e)
        }
    })
}

let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Product.create({
                id_cate: data.id_cate,
                prd_name: data.prd_name,
                prd_img_1: data.prd_img_1,
                prd_img_2: data.prd_img_2,
                prd_img_3: data.prd_img_3,
                prd_img_4: data.prd_img_4,
                description: data.description,
                prd_price: data.prd_price,
                amount: data.amount,
                view: data.view,
            })
            resolve({
                errCode: 0,
                message: "Create Ok"
            })
        } catch (e) {
            reject(e)
        }
    })
}

let deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.Product.findOne({
            where: { id: productId }
        })
        if (!product) {
            resolve({
                errCode: 2,
                errMessage: `The product isn't exit`
            })
        }

        await db.Product.destroy({
            where: { id: productId }
        })

        resolve({
            errCode: 0,
            message: `The product is delete`
        })
    })
}

let editProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                })
            }
            let product = await db.Product.findOne({
                where: { id: data.id },
                raw: false
            })

            if(product){
                product.id_cate = data.id_cate
                product.prd_name = data.prd_name
                product.prd_img_1 = data.prd_img_1
                product.prd_img_2 = data.prd_img_2
                product.prd_img_3 = data.prd_img_3
                product.prd_img_4 = data.prd_img_4
                product.description = data.description
                product.prd_price = data.prd_price
                product.amount = data.amount
                product.view = data.view
                await product.save()
                resolve({
                    errCode: 0,
                    message: `Update product success`
                })
            }else{
                resolve({
                    errCode: 1,
                    message: `Product not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllProducts: getAllProducts,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    editProduct: editProduct
}