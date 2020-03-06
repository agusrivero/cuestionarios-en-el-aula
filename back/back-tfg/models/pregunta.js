module.exports = function (sequelize, DataTypes) {
    return sequelize.define('pregunta',
        {
            question: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Question must not be empty"}}
            },
            answer_correct: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Answer must not be empty"}}
            },
            answer_incorrect1: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Answer must not be empty"}}
            },
            answer_incorrect2: {
                type: DataTypes.STRING,
            },
            answer_incorrect3: {
                type: DataTypes.STRING,
            }
        });
};
