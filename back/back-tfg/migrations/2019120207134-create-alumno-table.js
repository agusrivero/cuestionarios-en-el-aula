'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('alumnos',
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    unique: true
                },
                username: {
                    type: Sequelize.STRING,
                    unique: true,
                    validate: {
                        notEmpty: {msg: "Username must not be empty."}
                    }
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                sync: {force: true}
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('alumnos');
    }
};