import billDetailService from "../services/billDetailService"

let handleGetAllBillDetails = async (req, res) =>{
    let id = req.params.id
    // console.log(id)
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter",
            billdetails: []
        })
    }
    let billdetails = await billDetailService.getAllBillDetails(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        billdetails
    })
}

let handleCreateBillDetail = async(req, res)=>{
    let message = await billDetailService.createBillDetail(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleEditBillDetail = async(req, res)=>{
    let data = req.body
    let message = await billDetailService.editBillDetail(data)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllBillDetails: handleGetAllBillDetails,
    handleCreateBillDetail: handleCreateBillDetail,
    handleEditBillDetail: handleEditBillDetail,
}