var path = require('path');

//CARGAR modelo ORM
var Sequelize = require('sequelize');

//USAR BBDD SQlite o  Postgres
var sequelize = new Sequelize(null, null, null,
			{dialect: "sqlite",
                        storage: "quiz.sqlite",
                    }
                );

//Importar la definicion de la tabla quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; //exportar definicion de la tabla Quiz

//sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().then(function() {
    //then(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function(count){
        if(count === 0) { //la tabla se inicializa solo si esta vacia
            Quiz.create({ pregunta:'Capital de Italia',
                            respuesta: 'Roma'
                        })
            .then( function(){console.log('Base de datos inicializa')});
        };
    });
});
