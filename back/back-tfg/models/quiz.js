module.exports = function (sequelize, DataTypes) {
    return sequelize.define('quiz',
        {   
            accessId: {
                type: DataTypes.INTEGER,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                validate: {notEmpty: {msg: "Username must not be empty."}}
            },
            questionNumber: {
                type: DataTypes.STRING,
                default: 0
            }
        });
};