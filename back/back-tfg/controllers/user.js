const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');

exports.allowConections = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

exports.newUser = (req, res, next) => {
    res.render('admin/new');
}

exports.createUser = (req, res, next) => {
    const {username, email, password} = req.body;

    const user = models.user.build({
        username,
        password,
        email
    });

    user.save({fields: ["username", "password", "email", "salt"]})
    .then(user => {
        req.flash('success', 'Usuario creado correctamente')
        res.redirect('/')
    })
    .catch(Sequelize.ValidationError, error => {
        req.flash('error', 'Los datos introducidos no son válidos');
        error.errors.forEach(({message}) => req.flash('error', message));
        res.render('admin/new');
    })
    .catch(error => {
        req.flash('error', 'Error al crear el usuario: ' + error.message);
        next(error);
    });

}

exports.index = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    let countOptions = {
        where: {}
    };

    let title = "Usuarios";

    models.user.count(countOptions)
    .then(count => {
        return models.user.findAll();
    })
    .then(users => {
        console.log(users)
        // return {users}
        // res.render('admin/index', {
        //     users,
        //     title
        // });
        res.send(users)
    })
    .catch(error => next(error));
};

exports.viewUser = (req, res, next) => {
    const id = req.params.id;
    
    models.user.findByPk(id)
    .then(user => {
        // res.render('admin/view', {user});
        res.send(user)
    })
    .catch(error => next(error));
}

exports.editUser = (req, res, next) => {
    const id = req.params.id;

    models.user.findByPk(id)
    .then(user => {
        res.render('admin/edit', {user});
    })
    .catch(error => next(error));
}

exports.edit = (req, res, next) => {
    const id = req.params.id;
    const {username, email, password} = req.body;

    models.user.findByPk(id)
    .then(user => {
        user.username = username;
        user.email = email;
        user.password = password
        user.save({fields: ["username", "password", "email", "salt"]})
        .then(user => {
            if(user.isAdmin){
                // res.redirect('/admin/view/'+user.id);
                res.send(true)
            }else{
                // res.redirect('/user/'+user.id);
                res.send(false)
            }
            
        })
    })
    .catch(error => next(error));
}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    models.user.findByPk(id)
    .then(user => {
        user.destroy()
        .then(user => {
            // res.redirect('/admin/index');
            res.send(true)
        })
    })
    .catch(error => next(error));
}


