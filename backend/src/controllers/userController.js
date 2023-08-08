import userService from "../services/userService"

let handleLoginUser = async(req, res) =>{
    let email = req.body.email
    let password = req.body.password

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }
    let userData = await userService.loginUser(email, password)
    console.log(userData);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) =>{
    let id = req.params.id
    // console.log(id)
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter",
            users: []
        })
    }
    let users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}

let handleCreateUser = async(req, res)=>{
    let message = await userService.createUser(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteUser = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleEditUser = async(req, res)=>{
    let data = req.body
    let message = await userService.editUser(data)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleLoginUser: handleLoginUser,
    handleCreateUser: handleCreateUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser
}