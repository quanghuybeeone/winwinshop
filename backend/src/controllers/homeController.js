// import db from '../models/index'
// let getHomePage = async (req, res)=>{
//     try{
//         let data = await db.User.findAll()
//         console.log(data)
//         return res.render('homepage.ejs', {
//             data: JSON.stringify(data)
//         })
//     }catch(e){
//         console.log(e)
//     }
// }

let getHome = (req, res)=>{
    try{
        return res.render('home.ejs')
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getHome: getHome,
}