import db from "../models/index"

let getAllBills = (billId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bills = ""
            if (billId === "ALL") {
                bills = await db.Bill.findAll()
            }
            if (billId && billId !== "ALL") {
                bills = await db.Bill.findOne({
                    where: { id: billId }
                })
            }
            resolve(bills)
        } catch (e) {
            reject(e)
        }
    })
}

let createBill = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Bill.create({
                id_bill: data.id_bill,
                id_user: data.id_user,
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                address: data.address,
                total: data.total,
                // status: 0,
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

let editBill = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    message: `Missing required parameters`
                })
            }
            let bill = await db.Bill.findOne({
                where: { id: data.id },
                raw: false
            })

            if(bill){
                bill.status = data.status
                bill.id_user = data.id_user
                bill.fullnName = data.fullnName
                bill.phone = data.phone
                bill.email = data.email
                bill.address = data.address
                bill.total = data.total
                bill.status = data.status
                await bill.save()
                resolve({
                    errCode: 0,
                    message: `Update bill success`
                })
            }else{
                resolve({
                    errCode: 1,
                    message: `bill not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllBills: getAllBills,
    createBill: createBill,
    editBill: editBill,
}