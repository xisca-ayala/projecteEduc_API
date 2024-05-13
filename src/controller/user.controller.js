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

//dubtes: envio directament l'edad enlloc del llinatge? l:huaira de calcular aqui? per enviar tambe els items i les activitats de l'usuari, ho ficaria dins el model user??

const loginUser = async (req, res) =>{
    let response = new Response(false, 200, "Login correcto", null);
    try{
        let sql = "SELECT * FROM user JOIN item_user ON user.id_user = item_user.id_user WHERE user.name = '" + req.body.name + "' ";
        let [result] = await pool.query(sql);
        if(result.length){
            response.data = new User(result[0].id_user, result[0].name, result[0].birthday, result[0].logo, result[0].level, result[0].score,result[0].items_number, result[0].id_client );
        } else {
            response.err = true;
            response.message = "Login incorrecto";
            response.code = 400; 
        }
        res.send(response);
    }catch(err){
        console.error();(err);
    }
}


const updateUser = async(req, res) =>{
    let response = new Response(false, 200, "Usuario modificado", null);
    let user = new User(req.body.id_user, 
        req.body.name, 
        req.body.birthday,
        req.body.logo, 
        req.body.level);
    try{
        let sql = "UPDATE user SET  " +
        "name = COALESCE(?, name), " +
        "bithday = COALESCE (?, birthday), " +
        "logo = COALESCE(?, logo), " +
        "level = COALESCE(?, level) WHERE " +
        "id_user = ?"; 
        let [result] = await pool.query(sql, params);
        console.log(result);
        response.data = user;
        res.send(response);
    }catch(err){
        console.error(err);
        response.message = "Fallo al intentar modificar el usuario";
        response.code = 400; 
        response.err = true; 
        res.send(response);
    }
}

module.exports = { createUser, loginUser, updateUser}

