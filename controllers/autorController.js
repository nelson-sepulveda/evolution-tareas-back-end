var Autor = require('../models/autor.js');
var mongoose = require("mongoose");

function AutorData(data) {
	this.id = data._id;
	this.nombre= data.nombre;
	this.email = data.email;
	this.password = data.password;
}


function validateRegister (autor) {
  if (!autor) {
    return {
      error: true,
      message: 'No request body',
      status: 404
    }
  } else if (!autor.nombre || autor.nombre === "") {
    return {
      error: true,
      message: 'Campo Nombre Requerido',
      status: 404
    }
  } else if (!autor.email || autor.email === "") {
    return {
      error: true,
      message: 'Campo Email Requerido',
      status: 404
    }
  } else if (!autor.password || autor.password === "") {
    return {
      error: true,
      message: 'Campo Contraseña Requerido',
      status: 404
    }
  }
  return {
    error: false,
    message: '',
    status: 0
  }
}

/**
 * Creación de Autor
 */
exports.autorCreate = [
  function (req, res) {
    try {
      const { error, message, status } = validateRegister(req.body)
      if (error) {
        res.status(status).send({data: {}, message: message})
      } else {
        let objectAutor = {
          nombre: req.body.nombre,
          email: req.body.email,
          password: req.body.password
        }
        var autor = new Autor(objectAutor);
        Autor.findOne({email : req.body.email}).then(( user ) => {
          if (user) {
            res.status(400).send({data: {}, message: "E-mail already in use"})
          } else {
            autor.save(function (err, data) {
              if (!err) {
                Autor.findById({_id: data._id},"_id nombre email password createdAt").then((autorResponse) => {
                  if(autorResponse !== null) {
                    let createAutor = new AutorData(autorResponse);
                    res.send({data: createAutor, message: 'Creación Exitosa de Autor'});
                  } else {
                    res.status(500).json({data: 'error'})
                  }
                });
              } else {
                res.send(err)
              }
            });
          }
        })
      }
    } catch (error) {
      return res.json(error)
    }
  }
];

function  validateLogin(autor) {
  if (!autor.email || autor.email === "") {
    return {
      error: true,
      message: 'Correo Electronico Requerido',
      status: 404
    }
  } else if (!autor.password || autor.password === "") {
    return {
      error: true,
      message: 'Contraseña Requerida',
      status: 404
    }
  }
  return {
    error: false,
    message: '',
    status: 0
  }
}

exports.login = [
  function (req, res) {
    const { error, message, status } = validateLogin(req.body)
    if (error) {
      res.status(status).send({data: {}, message: message})
    } else {
      try {
        Autor.findOne({email : req.body.email}).then(user => {
          if (user) {
            if (req.body.password === user.password) {
              res.status(200).send({data: user, message: 'success account'})
            } else {
              res.status(400).send({data: {}, message: "Email o Contraseña no validos"})
            }
          } else {
            res.status(400).send({data: {}, message: "Email o Contraseña no validos"})
          }
        })
      } catch (error) {
        return res.json(error)
      }
    }
  }
];