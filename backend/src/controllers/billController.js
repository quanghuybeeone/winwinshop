import billService from "../services/billService"

let handleGetAllBills = async (req, res) =>{
    let id = req.params.id
    // console.log(id)
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter",
            bills: []
        })
    }
    let bills = await billService.getAllBills(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        bills
    })
}

let handleCreateBill = async(req, res)=>{
    let message = await billService.createBill(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleEditBill = async(req, res)=>{
    let data = req.body
    let message = await billService.editBill(data)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllBills: handleGetAllBills,
    handleCreateBill: handleCreateBill,
    handleEditBill: handleEditBill,
}