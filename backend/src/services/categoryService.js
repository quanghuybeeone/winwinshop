import db from "../models/index"

let getAllCategories = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = ""
            if (categoryId === "ALL") {
                categories = await db.Category.findAll()
            }
            if (categoryId && categoryId !== "ALL") {
                categories = await db.Category.findOne({
                    where: { id: categoryId }
                })
            }
            resolve(categories)
        } catch (e) {
            reject(e)
        }
    })
}

let createCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Category.create({
                cate_name: data.cate_name,
                description: data.description,
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

let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        let category = await db.Category.findOne({
            where: { id: categoryId }
        })
        if (!category) {
            resolve({
                errCode: 2,
                errMessage: `The category isn't exit`
            })
        }

        await db.Category.destroy({
            where: { id: categoryId }
        })

        resolve({
            errCode: 0,
            message: `The category is delete`
        })
    })
}

let editCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                })
            }
            let category = await db.Category.findOne({
                where: { id: data.id },
                raw: false
            })

            if(category){
                category.cate_name = data.cate_name
                category.description = data.description
                category.view = data.view
                await category.save()
                resolve({
                    errCode: 0,
                    message: `Update category success`
                })
            }else{
                resolve({
                    errCode: 1,
                    message: `category not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllCategories: getAllCategories,
    createCategory: createCategory,
    deleteCategory: deleteCategory,
    editCategory: editCategory
}