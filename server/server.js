var express = require('express');
//var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var app = express()

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
var cookieParser = require('cookie-parser');
app.use(cookieParser())


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'prav',
  database: 'monitor'
});
 
connection.connect();

connection.on('close', function(err) {
  if (err) {
    // Oops! Unexpected closing of connection, lets reconnect back.
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'monitor',
      password : 'teste',
      database: 'monitor'
    });
  } else {
    console.log('Connection closed normally.');
  }
});

app.set('view engine', 'ejs');


var fs = require('fs');


var sys = require('sys')
var exec = require('child_process').exec;



app.get('/tests', function (req, res) {
      var id = 0;

      var email_id = req.query.id;
      var watched  = req.query.watched;
      var config   = req.query.config;
      var video_choice = req.query.valor;


       var link = "../resources/hobbit-1080p-01.mp4";
       var link_original = "https://www.youtube.com/watch?v=9XuQK2MC3QA";


       switch(video_choice)
       {
        case '1':
        {
          link = "../resources/lenda_heroi.mp4";
          link_original = "https://www.youtube.com/watch?v=9XuQK2MC3QA";
          break;
        } 

        case '2':
        {
          link = "../resources/dqcaboclo.mp4";
          link_original = "https://www.youtube.com/watch?v=M7JeBg-YqeQ";
          break;
        } 

        case '3':
        {
          link = "../resources/fa.mp4";
          link_original = "https://www.youtube.com/watch?v=RsUD8CTDdAw";
          break;
        } 

        case '4':
        {
          link = "../resources/hp.mp4";
          link_original = "https://www.youtube.com/watch?v=622eqAEoJqo";
          break;
        } 

        case '5':
        {
          link = "../resources/lf.mp4";
          link_original = "https://www.youtube.com/watch?v=JozAmXo2bDE";
          break;
        }
      }

      res.render('pages/teste.ejs', {
        'link' : link,
        'link_original' : link_original,
        'config' : config,
        'email_id' : email_id,
        'watched' : watched
      });
});
  



app.get('/full_testes', function (req, res) {

    var email_id = 0;
    if(req.query.tempo != undefined)
    {
        insert_into_questionario2(req);
        
    }
    else 
    {
        console.log("Não inserir");
    }

    if(req.query.email_id != undefined)
    {
        email_id = req.query.email_id;
    } 
    else
    {
        email_id = req.body.email_id;
    }


    

    var query = connection.query("SELECT * FROM email_info WHERE email_id = '" + email_id + "'", function(err, result) {
        etapa = 1;
        if(result[0].watched_1 == 0 || result[0].watched_2 == 0 || result[0].watched_3 == 0 ||
           result[0].watched_4 == 0 || result[0].watched_5 == 0)
        {
          etapa = 1;
        }
        else
        {
          etapa = 2;
        }

        result[0]['etapa'] = etapa;

        res.render('pages/full_testes.ejs', result[0]);
      
    });



    
});




app.get('/inicio', function (req, res) {
      
   res.render('pages/inicio.ejs');
});

app.get('/questionario', function (req, res) {

  insert = true;
  var id_email = 0;
      
  var query = connection.query("SELECT * FROM email_info WHERE email = '" + req.query.email + "'", function(err, result) {
      for (var i = result.length - 1; i >= 0; i--) {
        if(result[i].watched_1 == 0 || result[i].watched_2 == 0 || result[i].watched_3 == 0 ||
           result[i].watched_4 == 0 || result[i].watched_5 == 0 || result[i].watched_6 == 0 ||
           result[i].watched_7 == 0 || result[i].watched_8 == 0 || result[i].watched_9 == 0 ||
           result[i].watched_10 == 0)
         {
            insert = false;
            id_email = result[i].email_id
            break;
         }
      }



      if(insert)
      {
         info  = { 
            email: req.query.email,
            watched_1: 0,
            watched_2: 0,
            watched_3: 0,
            watched_4: 0,
            watched_5: 0,
            watched_6: 0,
            watched_7: 0,
            watched_8: 0,
            watched_9: 0,
            watched_10: 0,
            video_config_1: 0,
            video_config_2: 0,
            video_config_3: 0,
            video_config_4: 0,
            video_config_5: 0,
            video_config_6: 0,
            video_config_7: 0,
            video_config_8: 0,
            video_config_9: 0,
            video_config_10: 0,
            video_pos_1: 0,
            video_pos_2: 0,
            video_pos_3: 0,
            video_pos_4: 0,
            video_pos_5: 0,
            video_pos_6: 0,
            video_pos_7: 0,
            video_pos_8: 0,
            video_pos_9: 0,
            video_pos_10: 0
          };

          valores = [1,2,3,4,5];
          indice = getRandomIntInclusive(0,4);
          valor = valores[indice];
          info.video_config_1 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,3);
          valor = valores[indice];
          info.video_config_2 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,2);
          valor = valores[indice];
          info.video_config_3 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,1);
          valor = valores[indice];
          info.video_config_4 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,0);
          valor = valores[indice];
          info.video_config_5 = valor;
          removeA(valores, valor);
          valores = [1,2,3,4,5];
          indice = getRandomIntInclusive(0,4);
          valor = valores[indice];
          info.video_config_6 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,3);
          valor = valores[indice];
          info.video_config_7 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,2);
          valor = valores[indice];
          info.video_config_8 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,1);
          valor = valores[indice];
          info.video_config_9 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,0);
          valor = valores[indice];
          info.video_config_10 = valor;
          removeA(valores, valor);

          valores = [1,2,3,4,5];
          indice = getRandomIntInclusive(0,4);
          valor = valores[indice];
          info.video_pos_1 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,3);
          valor = valores[indice];
          info.video_pos_2 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,2);
          valor = valores[indice];
          info.video_pos_3 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,1);
          valor = valores[indice];
          info.video_pos_4 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,0);
          valor = valores[indice];
          info.video_pos_5 = valor;
          removeA(valores, valor);
          valores = [1,2,3,4,5];
          indice = getRandomIntInclusive(0,4);
          valor = valores[indice];
          info.video_pos_6 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,3);
          valor = valores[indice];
          info.video_pos_7 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,2);
          valor = valores[indice];
          info.video_pos_8 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,1);
          valor = valores[indice];
          info.video_pos_9 = valor;
          removeA(valores, valor);
          indice = getRandomIntInclusive(0,0);
          valor = valores[indice];
          info.video_pos_10 = valor;
          removeA(valores, valor);
          

        var query = connection.query('INSERT INTO email_info SET ?', info, function(err, result) {
          id_email = result.insertId;
          res.render('pages/questionario.ejs', {'redirect' : { 'redirect' : !insert, 'email_id' : id_email}});
        });


                

      }
      else
      {
        res.render('pages/questionario.ejs', {'redirect' : { 'redirect' : !insert, 'email_id' : id_email}});
      }

      

      



      
  });   



});

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i] === what) return i;
            ++i;
        }
        return -1;
    };
}
  
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/questionario', function (req, res){
  console.log("received questionario");
  var return_object = insert_into_questionario(req);
  res.json(JSON.stringify(return_object));

});


function insert_into_questionario(req) {
  var info;
  var return_object = {status : 'OK'};

  var query = connection.query("SELECT * FROM email_info WHERE email_id = '" + req.body.email_id + "'", function(err, result) {
        var video_config = 0;
        var video_id = 0;
        switch(req.body.watched)
        {
          case 1:
          {
            video_config = result[0].video_config_1;
            video_id     = result[0].video_pos_1;
            break;
          }
          case 2:
          {
            video_config = result[0].video_config_2;
            video_id     = result[0].video_pos_2;
            break;
          }
          case 3:
          {
            video_config = result[0].video_config_3;
            video_id     = result[0].video_pos_3;
            break;
          }
          case 4:
          {
            video_config = result[0].video_config_4;
            video_id     = result[0].video_pos_4;
            break;
          }
          case 5:
          {
            video_config = result[0].video_config_5;
            video_id     = result[0].video_pos_5;
            break;
          }
          case 6:
          {
            video_config = result[0].video_config_6;
            video_id     = result[0].video_pos_6;
            break;
          }
          case 7:
          {
            video_config = result[0].video_config_7;
            video_id     = result[0].video_pos_7;
            break;
          }
          case 8:
          {
            video_config = result[0].video_config_8;
            video_id     = result[0].video_pos_8;
            break;
          }
          case 9:
          {
            video_config = result[0].video_config_9;
            video_id     = result[0].video_pos_9;
            break;
          }
          case 10:
          {
            video_config = result[0].video_config_10;
            video_id     = result[0].video_pos_10;
            break;
          }
        }


        info  = { 
          email_id: req.body.email_id, 
          timestamp: Date.now(),
          experiencia : req.body.experiencia,
          config_inicial : video_config,
          video_id : video_id,
          perguntas : 0
        };

        var query = connection.query('INSERT INTO questionario SET ?', info, function(err, result) {
        if(err)
          console.log(err);
          return_object['status'] = "ERRO";
        });

        var obj = {}
        obj['watched_' + req.body.watched] = 1;

        objetos = [obj, req.body.email_id]




        

        

        var query = connection.query('UPDATE email_info SET ? WHERE email_id = ?', objetos, function(err, result) {
          
        });
        
        console.log("Saved questionario!");
  
      
  });


  
  

  return return_object;
}




function insert_into_questionario2(req) {
  var info;
  var return_object = {status : 'OK'};


console.log(req.query);

  
  info  = { 
        email_id: req.query.email_id, 
        timestamp: Date.now(),
        experiencia : req.query.experiencia,
        conteudo : req.query.conteudo,
        int_horas_por_dia : req.query.semana,
        dias_por_semana : req.query.tempo,
        idade : req.query.idade,
        sexo : req.query.sexo,
        grupo : req.query.grupo,
        config_inicial : req.query.config_inicial,
        video_id : req.query.video_id,
        perguntas : 1
      };



  var query = connection.query('INSERT INTO questionario SET ?', info, function(err, result) {
  if(err)
    console.log(err);
    return_object['status'] = "ERRO";
  });

  return_object["ip"] = info.ip;
  return_object["timestamp"] = info.timestamp;

  console.log("Saved questionario!");
  

  return return_object;
}




var last_timestamp = -1;
var last_config = null;


// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});




var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Monitoring server listening at http://%s:%s', host, port)

});
