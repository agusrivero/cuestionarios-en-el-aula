'use strict';


module.exports = {
    up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('pregunta', [
            {
                question: 'admin',
                answer_correct: 'admin',
                answer_incorrect1: 'admin',
                answer_incorrect2: 'admin',
                answer_incorrect3: 'admin',
                quizId: 1,
                createdAt: new Date(), updatedAt: new Date()
            },
            {
                question: 'admin2',
                answer_correct: 'admin',
                answer_incorrect1: 'admin',
                answer_incorrect2: 'admin',
                answer_incorrect3: 'admin',
                quizId: 1,
                createdAt: new Date(), updatedAt: new Date()
            }
        ]);
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('pregunta', null, {});
    }
};