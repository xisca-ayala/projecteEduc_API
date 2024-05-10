const {pool} = require("../database");
const Response = require("../models/response");
const User = require("../models/user");

const createUser = async (req, res) => {
    let response = new Response (false, 200, "Usuario creado correctamente", null);
    let user = new User(null, 
                        req.body.name, 
                        req.body.birthday,
                        req.body.level);
    try{
        let sql = "INSERT INTO user (name, birthday, level)" +
        "VALUES ('" + user.name + "', '" +
        user.birthday + "','" +
        user.level + "')";
        await pool.query(sql);
        let [userId] = await pool.query(sqlUser);
        user.id_user = userId[0].id_user;
        response.data = user;
        res.send(response);
    }catch(err){
        console.error(err);
        response.message = "Error al crear usuari";
    }
}

// const login = async (req, res) =>{
//     let response = new Response(false, 200, "Login correcto", null);
//     try{
//         let sql = "SELECT * FROM user WHERE user.email = '" + req.body.email + "' AND user.password = '" + req.body.password + "'";
//         let [result] = await pool.query(sql);
//         if(result.length){
//             response.data = new User(result[0].id_user, result[0].name, result[0].last_name, result[0].email, result[0].photo, null);
//         } else {
//             response.err = true;
//             response.message = "Login incorrecto";
//             response.code = 400; 
//         }
//         res.send(response);
//     }catch(err){
//         console.error();(err);
//     }
// }

// const updateUser = async(req, res) =>{
//     let response = new Response(false, 200, "Usuario modificado", null);
//     let user = new User(req.body.id_user, 
//         req.body.name, 
//         req.body.last_name,
//         req.body.email, 
//         req.body.photo, 
//         null);
//     try{
//         let sqlEmail = "SELECT email FROM user WHERE email = '" + user.email + "' and id_user != " + user.id_user;
//         let [checkEmail] = await pool.query(sqlEmail);
//         if(checkEmail.length){
//             response.err = true;
//             response.message = 'Ya existe un usuario con este email';
//         } else {
//             let params =  [
//                 user.name,
//                 user.last_name, 
//                 user.email,
//                 user.photo,
//                 user.id_user
//             ];
//             let sql = "UPDATE user SET  " +
//             "name = COALESCE(?, name), " +
//             "last_name = COALESCE (?, last_name), " +
//             "email = COALESCE(?, email), " +
//             "photo = COALESCE(?, photo) WHERE " +
//             "id_user = ?"; 
//             let [result] = await pool.query(sql, params);
//             console.log(result);
//             response.data = user;
//             res.send(response);
//         }
//     }catch(err){
//         console.error(err);
//         response.message = "Fallo al intentar modificar el usuario";
//         response.code = 400; 
//         response.err = true; 
//         res.send(response);
//     }
// }




module.exports = { createUser}
// , login, updateUser }
