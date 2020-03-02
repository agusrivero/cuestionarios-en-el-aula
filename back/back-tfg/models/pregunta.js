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
            answer_incorrect_1: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Answer must not be empty"}}
            },
            answer_incorrect_2: {
                type: DataTypes.STRING,
            },
            answer_incorrect_3: {
                type: DataTypes.STRING,
            }
        });
};
