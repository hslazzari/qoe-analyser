var video;
var simulador;
var timer_int;
var index_start;
var monitor;

function init_next_etapa_dialog()
{
	index_start = 1;

	BootstrapDialog.show( {
		title: "Qualidade de experiência - Simulada - Ambiente",
			message: "Preparando o ambiente de testes para iniciar o experimento aguarde " + index_start + " segundos",
	   		closable: false,
	    	closeByBackdrop: false,
	    	closeByKeyboard: false,
		  	buttons: [{
			      		label: 'Iniciar experimento',
			        	cssClass: 'btn-primary',
			        	action: function(dialogItself) {
			        			dialogItself.close();
			        			simulador.stop_stall_creator();
								simulador.add_stall_info(0, video.duration, config_grupo[config_inicial - 1][0]['duration'], config_grupo[config_inicial - 1][0]['number'])
			       				simulador.start_stall_creator();
			           	}	
				   	}]
		});

	setTimeout(time_out, 1000);
		$(".btn-primary").attr('disabled', true);

}

$(document).ready(
	function()
	{
		video = $("video")[0];
		simulador = new Simulador(video);
		$("#avaliar").click(pular_proxima_etapa);
		init_next_etapa_dialog();
		document.getElementById('myVideo').addEventListener('ended',myHandler,false);
		monitor = new Monitor(video);

		

		monitor.start_all_monitoring(1000, 100);
		    
	}



);

function myHandler(e) 
{
	pular_proxima_etapa()
}

function time_out()
{
	if(index_start != 0)
	{
		$(".bootstrap-dialog-message").text("Preparando o ambiente de testes para iniciar o experimento aguarde "+index_start+" segundos");
		index_start = index_start- 1;
		setTimeout(time_out, 1000);
		$(".btn-primary").attr('disabled', true);
	}
	else
	{
		$(".bootstrap-dialog-message").text("Ambiente inicializado. Clique em iniciar para começar o experimento.");
		$(".btn-primary").attr('disabled', false);
	}
}

var open = false;

function pular_proxima_etapa()
{
	if(!open)
	{
		open = true;
		simulador.stop_all_simulation()
		video.currentTime = video.duration
		video.pause()
		$("#avaliar").off("click");
		monitor.set_left_time();
		monitor.stop_all_monitoring();

		BootstrapDialog.show( {
			title: "Qualidade de experiência - Simulada",
				message: $('<div></div>').load("../resources/html/remote.html"),
		   		closable: true,
		    	closeByBackdrop: false,
		    	closeByKeyboard: false,
			  	buttons: [{
				      		label: 'Enviar',
				        	cssClass: 'btn-primary',
				        	action: function(dialogItself) {
				        		dialogItself.close();
				        		enviar_resultado();
				           	}	
					   	}]
		});
	}
}


function enviar_resultado()
{
	var data_simulada = {};

	data_simulada['experiencia'] = $('#rating').raty('score');
	data_simulada['email_id'] = email_id;
	data_simulada['watched'] = watched;

	console.log(data_simulada['experiencia']);

	$.ajax({
            url: document.URL.replace(/tests.*/,"") + "api/questionario",
            type: "POST",
            data: JSON.stringify(data_simulada),
            contentType: "application/json",
            success: function(result) {
            	try
            	{
            		enviar_resultado2(monitor.json());
				}
				catch(err)
				{
					console.log("Erro ao enviar");
				}
            	window.location.href = "/full_testes?email_id=" + email_id
            }

        });
	
}



function enviar_resultado2(dados)
{

	dados['email_id'] = email_id;
	dados['watched'] = watched;

	$.ajax({
            url: document.URL.replace(/tests.*/,"") + "api/monitor",
            type: "POST",
            data: JSON.stringify(dados),
            contentType: "application/json",
            success: function(result) {
            	console.log("Resultados");
            	console.log(result);
            }

        });
	
}

