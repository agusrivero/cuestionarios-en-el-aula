// Definition of the Alumno model:

module.exports = function (sequelize, DataTypes) {
    const Alumno = sequelize.define('alumno', {
            username: {
                type: DataTypes.STRING,
                unique: true,
                validate: {notEmpty: {msg: "Username must not be empty."}}
            },
        });

    return Alumno;
};