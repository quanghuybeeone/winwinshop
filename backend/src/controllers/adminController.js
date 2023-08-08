// import db from '../models/index'
let getDashBoard = (req, res)=>{
    try{
        return res.render('admin/index.ejs')
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getDashBoard: getDashBoard,
}