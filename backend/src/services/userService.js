import db from "../models/index"
import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10)

let loginUser = (email, password)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'id', 'id_role'], //['email','roleId','password']
                    where: { email: email },
                    raw: true
                })

                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'Ok'

                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User's not found`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your's Email isn't exist in your system, Pls try other email!`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })

            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ""
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(data.email){
                let isExist = await checkUserEmail(data.email)
                if (isExist) {
                    resolve({
                        errCode: 1,
                        message: "Email already exists"
                    })
                }else{
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                    await db.User.create({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        password: hashPasswordFromBcrypt
                    })
                    resolve({
                        errCode: 0,
                        message: "Create Ok"
                    })
                }
            }
            
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exit`
            })
        }

        await db.User.destroy({
            where: { id: userId }
        })

        resolve({
            errCode: 0,
            message: `The user is delete`
        })
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                if(data.password){
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                    user.password = hashPasswordFromBcrypt
                }
                user.fullName = data.fullName
                user.address = data.address
                user.email = data.email
                user.phone = data.phone
                user.avatar = data.avatar
                
                await user.save()
                resolve({
                    errCode: 0,
                    message: `Update user success`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `User not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    createUser: createUser,
    deleteUser: deleteUser,
    editUser: editUser
}