import db from "../models/index"

let getAllBillDetails = (billdetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billdetails = ""
            if (billdetailId === "ALL") {
                billdetails = await db.BillDetail.findAll()
            }
            if (billdetailId && billdetailId !== "ALL") {
                billdetails = await db.BillDetail.findOne({
                    where: { id: billdetailId }
                })
            }
            resolve(billdetails)
        } catch (e) {
            reject(e)
        }
    })
}

let createBillDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.BillDetail.create({
                id_bill: data.id_bill,
                id_prd: data.id_prd,
                prd_name: data.prd_name,
                prd_img: data.prd_img,
                description: data.description,
                price: data.price,
                quanlity: data.quanlity,
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

let editBillDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                })
            }
            let billdetail = await db.BillDetail.findOne({
                where: { id: data.id },
                raw: false
            })

            if(billdetail){
                billdetail.id_bill = data.id_bill
                billdetail.id_prd = data.id_prd
                billdetail.prd_name = data.prd_name
                billdetail.prd_img = data.prd_img
                billdetail.description = data.description
                billdetail.price = data.price
                billdetail.quanlity = data.quanlity
                await billdetail.save()
                resolve({
                    errCode: 0,
                    message: `Update billdetail success`
                })
            }else{
                resolve({
                    errCode: 1,
                    message: `billdetail not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllBillDetails: getAllBillDetails,
    createBillDetail: createBillDetail,
    editBillDetail: editBillDetail,
}