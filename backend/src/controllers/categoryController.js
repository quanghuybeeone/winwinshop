import categoryService from "../services/categoryService"

let handleGetAllCategories = async (req, res) =>{
    let id = req.params.id
    // console.log(id)
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter",
            categories: []
        })
    }
    let categories = await categoryService.getAllCategories(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        categories
    })
}

let handleCreateCategory = async(req, res)=>{
    let message = await categoryService.createCategory(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteCategory = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await categoryService.deleteCategory(req.body.id)
    return res.status(200).json(message)
}

let handleEditCategory = async(req, res)=>{
    let data = req.body
    let message = await categoryService.editCategory(data)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllCategories: handleGetAllCategories,
    handleCreateCategory: handleCreateCategory,
    handleDeleteCategory: handleDeleteCategory,
    handleEditCategory: handleEditCategory
}