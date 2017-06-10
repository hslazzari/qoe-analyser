
function normalize(c) {
  if(c.monitorar == "true" || c.monitorar == "1") 
    c.monitorar = true;
  if(c.monitorar == "false" || c.monitorar == "0")
    c.monitorar = false;

  if(c.questionario == "true" || c.questionario == "1")
    c.questionario = true;
  if(c.questionario == "false" || c.questionario == "0")
    c.questionario = false;

  if(c.relatorio == "true" || c.relatorio == "1")
    c.relatorio = true;
  if(c.relatorio == "false" || c.relatorio == "0")
    c.relatorio = false;

  c.intervalo_minimo_de_stall = Number(c.intervalo_minimo_de_stall);
  c.intervalo_de_monitoramento = Number(c.intervalo_de_monitoramento);


  if(c.ativar_startup_stall == "true" || c.ativar_startup_stall == "1")
    c.ativar_startup_stall = true;
  if(c.ativar_startup_stall == "false" || c.ativar_startup_stall == "0")
    c.ativar_startup_stall = false;

  if(c.ativar_stall == "true" || c.ativar_stall == "1")
    c.ativar_stall = true;
  if(c.ativar_stall == "false" || c.ativar_stall == "0")
    c.ativar_stall = false;



    

  if(c.enviar_para_servidor == "true" || c.enviar_para_servidor == "1")
    c.enviar_para_servidor = true;
  if(c.enviar_para_servidor == "false" || c.enviar_para_servidor == "0")
    c.enviar_para_servidor = false;

 if(c.show_video_controls == "true" || c.show_video_controls == "1")
    c.show_video_controls = true;
  if(c.show_video_controls == "false" || c.show_video_controls == "0")
    c.show_video_controls = false;

 if(c.show_questionario_simulador == "true" || c.show_questionario_simulador == "1")
    c.show_questionario_simulador = true;
  if(c.show_questionario_simulador == "false" || c.show_questionario_simulador == "0")
    c.show_questionario_simulador = false;

if(c.ativar_troca_de_resolucao == "true" || c.ativar_troca_de_resolucao == "1")
    c.ativar_troca_de_resolucao = true;
  if(c.ativar_troca_de_resolucao == "false" || c.ativar_troca_de_resolucao == "0")
    c.ativar_troca_de_resolucao = false;

  

 c.startup_time = Number(c.startup_time);
 c.stall_duration = Number(c.stall_duration);

}





// Saves options to chrome.storage
function save_options() {


  var ende = document.getElementById('endereco').value;
  
  var stall_state = {};
  $(".custom").each(function() {
          var btn = $(this);
          var name = btn.attr("id");
          var estado = btn.attr("estado");
          stall_state[name] = estado;
  });

  var resolution_state = {};
  $(".custom2").each(function() {
          var btn = $(this);
          var name = btn.attr("id");
          var estado = btn.attr("estado");
          resolution_state[name] = estado;
  });

  var dados = {
    endereco: ende,
    monitorar: $('input[name="monitorar"]:checked').val(),
    questionario: $('input[name="questionario"]:checked').val(),
    relatorio: $('input[name="relatorio"]:checked').val(),
    intervalo_minimo_de_stall: $("#intervalo_minimo_de_stall").val(),
    intervalo_de_monitoramento : $("#intervalo_de_monitoramento").val(),
    enviar_para_servidor : $("#enviar_para_servidor").prop('checked'),
    simulador : $("#simulador").text(),
    estado_stall : stall_state ,
    'resolution_state': resolution_state, 
    startup_time : $("#startup_time").val(),
    stall_duration : $("#stall_duration").val(),
    ativar_startup_stall : $("#ativar_startup_stall").prop('checked'),
    ativar_stall : $("#ativar_stall").prop('checked'),
    show_video_controls : $("#show_video_controls").prop('checked'),
    show_questionario_simulador : $("#show_questionario_simulador").prop('checked'),
    url_resolucao_1 : $("#url_resolucao_1").val(),
    url_resolucao_2 : $("#url_resolucao_2").val(),
    url_resolucao_3 : $("#url_resolucao_3").val(),
    url_resolucao_4 : $("#url_resolucao_4").val(),
    url_resolucao_5 : $("#url_resolucao_5").val(),
    ativar_troca_de_resolucao : $("#ativar_troca_de_resolucao").prop('checked'),
    url_page_simulador : $("#url_page_simulador").val(),
    perfil : config_resource
  };



  $.ajax({
      url: window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/config/save",
      type: "POST",
      data: JSON.stringify(dados),
      contentType: "application/json",
      success: function(result) {
        //
      }

  });


}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.


function restore_options() {

  $.ajax({
      url: window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '') + "/config/load",
      type: "POST",
      data: JSON.stringify({'perfil' : config_resource}),
      contentType: "application/json",
      success: function(result) {
        var result_json = $.parseJSON(result);
        normalize(result_json);

        document.getElementById('endereco').value = result_json.endereco;
        if(result_json.monitorar) {
            $('input[name="monitorar"]')[0].checked = true;
        } else {
            $('input[name="monitorar"]')[1].checked = true;
        }

        if(result_json.questionario) {
            $('input[name="questionario"]')[0].checked = true;
        } else {
            $('input[name="questionario"]')[1].checked = true;
        }

        if(result_json.relatorio) {
            $('input[name="relatorio"]')[0].checked = true;
        } else {
            $('input[name="relatorio"]')[1].checked = true;
        }

        $("#intervalo_de_monitoramento").val(result_json.intervalo_de_monitoramento);
        $("#intervalo_minimo_de_stall").val(result_json.intervalo_minimo_de_stall);

        $("#enviar_para_servidor").prop('checked', result_json.enviar_para_servidor);

        $("#ativar_startup_stall").prop('checked', result_json.ativar_startup_stall);
        
        $("#ativar_stall").prop('checked', result_json.ativar_stall);

        $("#ativar_troca_de_resolucao").prop('checked', result_json.ativar_troca_de_resolucao);

        $("#show_video_controls").prop('checked', result_json.show_video_controls);

        $("#show_questionario_simulador").prop('checked', result_json.show_questionario_simulador);
        

        $("#simulador").text(result_json.simulador);
        //console.log(result_json.estado_stall);
        if(result_json.estado_stall["pos0"] != "undefined") {
           $(".custom").each(function() {
              var btn = $(this);
              var name = btn.attr("id");
              btn.attr("estado", result_json.estado_stall[name]);
           });
        }

        if(result_json.resolution_state["pos0"] != "undefined") {
           $(".custom2").each(function() {
              var btn = $(this);
              var name = btn.attr("id");
              btn.attr("estado", result_json.resolution_state[name]);
           });
        }

        $("#url_resolucao_1").val(result_json.url_resolucao_1);
        $("#url_resolucao_2").val(result_json.url_resolucao_2);
        $("#url_resolucao_3").val(result_json.url_resolucao_3);
        $("#url_resolucao_4").val(result_json.url_resolucao_4);
        $("#url_resolucao_5").val(result_json.url_resolucao_5);
        
        $("#startup_time").val(result_json.startup_time);
        $("#stall_duration").val(result_json.stall_duration);
        $("#url_page_simulador").val(result_json.url_page_simulador);

        refresh_page();

      }

  });


}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


function refresh_page() {
      if($('input[name="monitorar"]:checked').val() == "true") {
          //$("#monitorando").css('visibility','visible');
          $("#monitorando").show();
      } else {
         // $("#monitorando").css('visibility','hidden');
         $("#monitorando").hide();
      }

       console.log($("#simulador").text());
       if($("#simulador").text() == "Ativar simulador") {
        $("#simulador").removeClass("btn-danger");
        $("#simulador").addClass("btn-primary");
        $("#monitor").show();  
        $("#simulacao").hide();
        $("#titulo_config").text("Configurações");
      } else {
        $("#simulador").addClass("btn-danger");
        $("#simulador").removeClass("btn-primary");
        $("#monitor").hide();  
        $("#simulacao").show();
        $("#titulo_config").text("Configurações - Simulador");
      }


      $(".custom").each(function() {
          var btn = $(this);
          if(btn.attr("estado") == "good") {
              btn.removeClass("btn-danger");
              btn.addClass("btn-success");
          } else {
              btn.removeClass("btn-success");
              btn.addClass("btn-danger");
          }
      });

      $(".custom2").each(function() {
          var btn = $(this);
          if(btn.attr("estado") == "1") {
            //<!-- primary success info warning danger default -->
              btn.removeClass("btn-primary");
              btn.removeClass("btn-success");
              btn.removeClass("btn-info");
              btn.removeClass("btn-warning");
              btn.removeClass("btn-danger");
              btn.removeClass("btn-default");
              
              btn.addClass("btn-default");
          } else if(btn.attr("estado") == "2") {
            //<!-- primary success info warning danger default -->
              btn.removeClass("btn-primary");
              btn.removeClass("btn-success");
              btn.removeClass("btn-info");
              btn.removeClass("btn-warning");
              btn.removeClass("btn-danger");
              btn.removeClass("btn-default");
              
              btn.addClass("btn-info");
          } else if(btn.attr("estado") == "3") {
            //<!-- primary success info warning danger default -->
              btn.removeClass("btn-primary");
              btn.removeClass("btn-success");
              btn.removeClass("btn-info");
              btn.removeClass("btn-warning");
              btn.removeClass("btn-danger");
              btn.removeClass("btn-default");
              
              btn.addClass("btn-warning");
          } else if(btn.attr("estado") == "4") {
            //<!-- primary success info warning danger default -->
              btn.removeClass("btn-primary");
              btn.removeClass("btn-success");
              btn.removeClass("btn-info");
              btn.removeClass("btn-warning");
              btn.removeClass("btn-danger");
              btn.removeClass("btn-default");
              
              btn.addClass("btn-danger");
          } else if(btn.attr("estado") == "5") {
            //<!-- primary success info warning danger default -->
              btn.removeClass("btn-primary");
              btn.removeClass("btn-success");
              btn.removeClass("btn-info");
              btn.removeClass("btn-warning");
              btn.removeClass("btn-danger");
              btn.removeClass("btn-default");
              
              btn.addClass("btn-primary");
          } else if(btn.attr("estado") == "6") {
            //<!-- primary success info warning danger default -->
              btn.removeClass("btn-primary");
              btn.removeClass("btn-success");
              btn.removeClass("btn-info");
              btn.removeClass("btn-warning");
              btn.removeClass("btn-danger");
              btn.removeClass("btn-default");
              
              btn.addClass("btn-success");
          } 
      });

      


      $("#endereco_disabled").val($("#endereco").val());
      $("#enviar_para_servidor_disabled").prop('checked', $("#enviar_para_servidor").prop('checked'));
      
};


$('input[name="monitorar"]').change(function() {
    refresh_page();
});

document.getElementById('simulador').addEventListener('click',
    simulador);


function simulador() {
      if($("#simulador").text() == "Ativar simulador") {
        $("#simulador").text("Desativar simulador");
        $("#simulador").addClass("btn-danger");
        $("#simulador").removeClass("btn-primary");
        $("#monitor").hide();  
        $("#simulacao").show();
        $("#simulacao").attr("estado","ativo");
        $("#titulo_config").text("Configurações - Simulador");
        $("#endereco_disabled").val($("#endereco").val());
        $("#enviar_para_servidor_disabled").prop('checked', $("#enviar_para_servidor").prop('checked'));
      } else {
        $("#simulador").text("Ativar simulador");
        $("#simulador").removeClass("btn-danger");
        $("#simulador").addClass("btn-primary");
        $("#monitor").show();  
        $("#simulacao").hide();
        $("#simulacao").attr("estado","inativo");
        $("#titulo_config").text("Configurações");
        $("#endereco_disabled").val($("#endereco").val());
        $("#enviar_para_servidor_disabled").prop('checked', $("#enviar_para_servidor").prop('checked'));
      }
      
}


$(".custom").each(function() {
          var btn = $(this);

          $(this).click(function() {
              if(btn.attr("estado") == "good") {
                btn.removeClass("btn-success");
                btn.addClass("btn-danger");
                btn.attr("estado", "bad");
              } else {
                btn.removeClass("btn-danger");
                btn.addClass("btn-success");
                btn.attr("estado", "good");
              }
          })
});


$("#calculator").click(function() {
      BootstrapDialog.show( {
          title: "Calculadora para porcentagem",
          message: $('<div></div>').load(chrome.extension.getURL("calculator.html")),
          closable: true,
          closeByBackdrop: false,
          closeByKeyboard: false,
          buttons: [{
              label: 'Calcular',
              cssClass: 'btn-primary',
              action: function(dialogItself) {
                var result = Number($("#posicao").val().replace(",", ".")) * 100.0;
                result = result / Number($("#duracao").val().replace(",", "."))

                $("#resultado_exato").text("Resultado exato: " + result);
                $("#resultado_aproximado").text("Resultado aproximado: " + Math.round(result));
              }}, {
                  label: 'Cancelar',
                  action: function(dialogItself) {
                          dialogItself.close();
                        }
              }]
          });
});



$("#calculator2").click(function() {
      BootstrapDialog.show( {
          title: "Calculadora para porcentagem",
          message: $('<div></div>').load(chrome.extension.getURL("calculator.html")),
          closable: true,
          closeByBackdrop: false,
          closeByKeyboard: false,
          buttons: [{
              label: 'Calcular',
              cssClass: 'btn-primary',
              action: function(dialogItself) {
                var result = Number($("#posicao").val().replace(",", ".")) * 100.0;
                result = result / Number($("#duracao").val().replace(",", "."))

                $("#resultado_exato").text("Resultado exato: " + result);
                $("#resultado_aproximado").text("Resultado aproximado: " + Math.round(result));
              }}, {
                  label: 'Cancelar',
                  action: function(dialogItself) {
                          dialogItself.close();
                        }
              }]
          });
});


$("#proxPagina").click(function() {
  $("#pagina_1").hide();
  $("#pagina_2").show();
});
$("#prevPagina").click(function() {
  $("#pagina_1").show();
  $("#pagina_2").hide();
});


$(".custom2").each(function() {
          var btn = $(this);

          $(this).click(function() {
              if(btn.attr("estado") == "1") {
                btn.removeClass("btn-default");
                btn.addClass("btn-info");
                btn.attr("estado", "2");
              } else if(btn.attr("estado") == "2") {
                btn.removeClass("btn-info");
                btn.addClass("btn-warning");
                btn.attr("estado", "3");
              } else if(btn.attr("estado") == "3") {
                btn.removeClass("btn-warning");
                btn.addClass("btn-danger");
                btn.attr("estado", "4");
              } else if(btn.attr("estado") == "4") {
                btn.removeClass("btn-danger");
                btn.addClass("btn-primary");
                btn.attr("estado", "5");
              } else if(btn.attr("estado") == "5") {
                btn.removeClass("btn-primary");
                btn.addClass("btn-success");
                btn.attr("estado", "6");
              } else if(btn.attr("estado") == "6") {
                btn.removeClass("btn-success");
                btn.addClass("btn-default");
                btn.attr("estado", "1");
              }
          })
});
