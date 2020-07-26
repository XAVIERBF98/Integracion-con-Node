var express = require('express');
var bcrypt = require('bcrypt');
var Swal = require('sweetalert2');


var app = express();
var Usuario = require('../models/usuario');
/// ===========================================
// Inicio Obtener Todos los Usuarios
//==================================
app.get('/all', (req, res, next) => {
    Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Carganfo Usuarios',
                errors: err
            });
        }
        res.render('all', {
            usuarios
        });

    });
});

//===========================
// Actualizar Datos
//==============================
app.put('/:cedula', (req, res) => {
    var cedula = req.params.cedula;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al Buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id::>' + cedula + " no existe",
                errors: { message: 'No exite el usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al Actualizar el  usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });


});






//===================================
//Crear Nuevo Usuario
//====================================
app.post('/', (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        cedula: body.cedula,
        img: body.appellido
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        Swal.fire('Hello world!');
        res.render('home');
    });


});
// ===================================
// Eliminar Usuario
//=======================================
app.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el  usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: { message: 'No existe un usario con es ID' }
            });
        }
        res.render('all',);
    });
});
// ==========================================
// Obtener Curso por ID
// ==========================================
app.post('/a', (req, res) => {
    var cedula = req.body.cedula;
    Usuario.find({ "cedula": cedula })
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar curso',
                    errors: err
                });
            }
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El curso con el id ' + cedula + 'no existe ',
                    errors: {
                        message: 'No existe un curso con ese ID '
                    }
                });
            }
            var nombre1 = usuario.nombre;
            res.render('home', {
                usuario
            });

        });
});


module.exports = app;