
var simulador;


var config = null;
var $link = null;


function send_simulador(end, config, current_source, video_duration) {
	var return_object = {};

	return_object["start_timestamp"] = Date.now();
	return_object["ativar_stall"] = config.ativar_stall;
	return_object["ativar_startup_stall"] = config.ativar_startup_stall;
	return_object["ativar_troca_de_resolucao"] = config.ativar_troca_de_resolucao;
	return_object["show_video_controls"] = config.show_video_controls;
	return_object["stall_duration"] = config.stall_duration;
	return_object["startup_time"] = config.startup_time;
	return_object["url_page_simulador"] = config.url_page_simulador;
	return_object["url_resolucao_1"] = config.url_resolucao_1;
	return_object["url_resolucao_2"] = config.url_resolucao_2;
	return_object["url_resolucao_3"] = config.url_resolucao_3;
	return_object["url_resolucao_4"] = config.url_resolucao_4;
	return_object["url_resolucao_5"] = config.url_resolucao_5;
	return_object["url_resolucao_6"] = current_source;
	return_object["resolution_state"] = config.resolution_state;
	return_object["estado_stall"] = config.estado_stall;
	return_object["video_duration"] = video_duration;



	chrome.runtime.sendMessage({
		action: 'simulador',
		url: end,
		type: "POST",
		data: return_object,
	},  function(responseText) {
	});

}




function send_questionario(end, opinion) {
	var return_object = {};
	return_object["opinion"] = opinion;
	return_object["rating"] = $('#rating').raty('score');
	return_object["conteudo"] = $("#conteudo").val();
	return_object["diario"] = $("#diario").val();
	return_object["tempo"] = $('input[name="tempo"]:checked').val();
	return_object["idade"] = $("#idade").val();
	return_object["sexo"] = $('input[name="sex"]:checked').val();
	return_object["pais"] = $("#pais").val();
	return_object["comment"] = $("#comment").val();

	chrome.runtime.sendMessage({
		action: 'questionario',
		url: end,
		type: "POST",
		data: return_object,
	},  function(responseText) {
	});

}

$(document).ready(function() {

	var counter = 0;
	var wait_tree_seconds;
	

	chrome.runtime.sendMessage({
			    action: 'getPreferences'
				},  function(response) {
			   			config = response;
			    	});





    wait_tree_seconds = setInterval(function() {
		
		if((counter == 200 || document.getElementsByTagName('video').length > 0) && (config != null) && (document.getElementsByTagName('video').length > 0 && isNaN(document.getElementsByTagName('video')[0].duration) == false)) {
			clearInterval(wait_tree_seconds);
			
			normalize(config);

			console.log(config);

			
			
			if(config.monitorar == true && config.simulador == "Ativar simulador" && document.URL.indexOf("tests") == -1) {
				start_monitor(config);
			}
			else {
				console.log("Não monitorar");
			}

			if(config.monitorar == true && config.simulador == "Desativar simulador" && document.URL.indexOf("tests") == -1) {
				start_simulator(config);
				start_monitor(config);
			}
		}
		else {
			counter++;
		}
	
	}, 50);

	


function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if ((sParameterName[0]).toUpperCase() == sParam.toUpperCase())
        {
            return sParameterName[1];
        }
    }
}

function start_simulator(configuration) {
	var send_to_server = configuration.enviar_para_servidor;
	var has_already_sent_to_server = false;


	

	if(document.getElementsByTagName('video')[0] != null) {

		var url = document.URL;
		var video_element = document.getElementsByTagName('video')[0];
		
		simulador = new Simulador(video_element);

		
		if(config.show_video_controls)
		 	video_element.controls = true;
		else
			video_element.controls = false;
		
		video_element.play();
		

		if(config.ativar_startup_stall)
			simulador.simulate_startup_time();

		if(config.ativar_stall) {
			simulador.add_stall_duration(config.stall_duration);
			simulador.add_stalls_at_point(config.estado_stall);
			simulador.start_stall_creator();
		}
		
		if(document.URL.indexOf("tests") == -1) {
				document.getElementsByTagName('video')[0].addEventListener("ended", function() {
					simulador.stop_all_simulation();
						
					if(config.show_questionario_simulador) {
						BootstrapDialog.show( {
				   			title: "Qualidade de experiência - Simulada",
					   		message: $('<div></div>').load(chrome.extension.getURL("remote.html")),
					   		closable: true,
					    	closeByBackdrop: false,
					    	closeByKeyboard: false,
					   	 buttons: [{
					       	label: 'Boa',
					        cssClass: 'btn-primary',
					        action: function(dialogItself) {
					        			if(config.enviar_para_servidor)
						              		send_questionario(configuration.endereco, "Boa");
										dialogItself.close();
				               		}
					       	}, {
					            label: 'Ruim',
					            cssClass: 'btn-danger',
					            action: function(dialogItself) {
					            		if(config.enviar_para_servidor)
											send_questionario(configuration.endereco, "Ruim");
										dialogItself.close();
					               	}
					        }, {
					            label: 'Cancelar',
					            action: function(dialogItself) {
							                dialogItself.close();
					                	}
					        }]
					    });
					}
				});
			}
		

		

	}
}


if(document.URL.indexOf("tests") > -1) {

	var $vid = $('video','.outer-container');
    var $msg = $('.video-overlay'); 
    $msg.css({
        top:$vid.offset().top + (($vid.height()/2) - ($msg.height()/2)),
        left:$vid.offset().left + (($vid.width()/2) - ($msg.width()/2))
    });


    $('.video-overlay').hide();
    $('.video-overlay').show();


	var video_element = document.getElementsByTagName('video')[0];
	var avaliados = 1;
	var config_atual = {};

	//alert(GetURLParameter2("video_4"));


	var p1 = GetURLParameter2("perfil" + avaliados);

	if(p1 != "erro")
	{
		p1 =  decodeURIComponent(p1);
		config_atual = JSON.parse(p1);
	}

	var source_o = video_element.currentSrc;

	video_element.pause();

	var counter_start = 9;

	var dialogIt = BootstrapDialog.show( {
			title: "Configuração dos testes",
			message: "O teste iniciará em 10 segundos!",
		   	closable: true,
		    closeByBackdrop: false,
		    closeByKeyboard: false
			
	});
	console.log(config_atual);

	var timer_5_seconds = setInterval(function() {
		if(counter_start > 0) {
			$('.bootstrap-dialog-message').html("O teste iniciará em " + counter_start + " segundos!");
			counter_start--;
		} else {
			clearInterval(timer_5_seconds);
			dialogIt.close();

			var url = document.URL;
			var time_interval = config_atual.intervalo_de_monitoramento; //In miliseconds
			
			monitor = new Monitor(video_element, url);

			console.log(time_interval);
							console.log(config_atual.intervalo_minimo_de_stall);

			monitor.start_all_monitoring(time_interval, config_atual.intervalo_minimo_de_stall);
			simulador = new Simulador(video_element);
			video_element.controls = false;
			
			if(config_atual.ativar_startup_stall) {
								$('.video-overlay').show();
								setTimeout(function() {
									$('.video-overlay').hide();
									video_element.play();
								}, config_atual.startup_time);
			} else
				video_element.play();

			
			if(config_atual.ativar_stall) {
				simulador.add_stall_duration(config_atual.stall_duration);
				simulador.add_stalls_at_point(config_atual.estado_stall);
				simulador.start_stall_creator();
			}
		}
		
	}, 1000);

	setTimeout(function() {
		

		chrome.runtime.sendMessage({
			action: 'create_link',
			url: "http://0.0.0.0:3000",
			type: "POST",
		}, function(responseText) {
				
			}
		);



		//Start monitoring
	
		

	}, 3000);

	$("#avaliar").click(function() {

		//Enviar dados da simulacao

		monitor.stop_all_monitoring();
		simulador.stop_all_simulation();




		var dt = monitor.json();
	
		dt["teste_simulado"] = true;
		dt["perfil"] = avaliados;
		dt["end_o"] = "0.0.0.0:3000";
		
		chrome.runtime.sendMessage({
			action: 'monitor',
			url: "http://0.0.0.0:3000",
			type: "POST",
			data: dt,
		},  function(responseText) {
		
			}
		);



		var return_object = {};

		return_object["start_timestamp"] = Date.now();
		return_object["ativar_stall"] = config_atual.ativar_stall;
		return_object["ativar_startup_stall"] = config_atual.ativar_startup_stall;
		return_object["ativar_troca_de_resolucao"] = false;
		return_object["show_video_controls"] = true;
		return_object["stall_duration"] = config_atual.stall_duration;
		return_object["startup_time"] = config_atual.startup_time;
		return_object["url_page_simulador"] = "";
		return_object["url_resolucao_1"] = "";
		return_object["url_resolucao_2"] = "";
		return_object["url_resolucao_3"] = "";
		return_object["url_resolucao_4"] = "";
		return_object["url_resolucao_5"] = "";
		return_object["url_resolucao_6"] = "";
		return_object["resolution_state"] = {};
		return_object["estado_stall"] = config_atual.estado_stall;
		return_object["video_duration"] = video_element.duration;
		return_object["perfil"] = avaliados;
		return_object["teste_simulado"] = true;

		chrome.runtime.sendMessage({
			action: 'simulador',
			url: config.endereco,
			type: "POST",
			data: return_object,
		},  function(responseText) {

		});


		
		clearInterval(timer_for_change_);

		avaliados = avaliados + 1;
		var duration = video_element.duration;
	
		video_element.pause();
		video_element.currentTime = video_element.currentTime - 1;
	
		timer_for_change_= setInterval(function() {
			if(video_element.currentTime > avaliados * (video_element.duration/5.0)) {
				clearInterval(timer_for_change_);
				$("#avaliar").click();
			}
		}, 300);



		
	    var pN = GetURLParameter2("perfil" + avaliados);

		if(pN != "erro")
		{
			pN =  decodeURIComponent(pN);
			config_atual = JSON.parse(pN);
		}



		BootstrapDialog.show( {
			title: "Qualidade de experiência - Simulada",
			message: $('<div></div>').load("../resources/html/remote.html"),
		   	closable: false,
		    closeByBackdrop: false,
		    closeByKeyboard: false,
			buttons: [{
			      		label: 'Boa',
			        	cssClass: 'btn-primary',
				        action: function(dialogItself) {
				       		
				       		var return_object = {};
							return_object["opinion"] = "Boa";
							return_object["rating"] = $('#rating').raty('score');
							return_object["conteudo"] = $("#conteudo").val();
							return_object["diario"] = $("#diario").val();
							return_object["tempo"] = $('input[name="tempo"]:checked').val();
							return_object["idade"] = $("#idade").val();
							return_object["sexo"] = $('input[name="sex"]:checked').val();
							return_object["pais"] = $("#pais").val();
							return_object["comment"] = $("#comment").val();
							return_object["perfil"] = avaliados-1
							return_object["teste_simulado"] = true;
							return_object["end_o"] = "";

							chrome.runtime.sendMessage({
								action: 'questionario',
								url: config.endereco,
								type: "POST",
								data: return_object,
							},  function(responseText) {
							});



							var time_interval = config_atual.intervalo_de_monitoramento; //In miliseconds
							var url = document.URL;
							video_element.currentTime = (avaliados-1) * (video_element.duration/5.0);
							
							monitor = new Monitor(video_element, url);
							console.log(time_interval);
							console.log(config_atual.intervalo_minimo_de_stall);
							monitor.start_all_monitoring(time_interval, config_atual.intervalo_minimo_de_stall);



							simulador = new Simulador(video_element);
							video_element.controls = false;
							
							if(config_atual.ativar_startup_stall && avaliados < 6) {
								$('.video-overlay').show();
								setTimeout(function() {
									$('.video-overlay').hide();
									video_element.play();
								}, config_atual.startup_time);
							}
							
							if(config_atual.ativar_stall) {
								simulador.add_stall_duration(config_atual.stall_duration);
								simulador.add_stalls_at_point(config_atual.estado_stall);
								simulador.start_stall_creator();
							}





							if(avaliados < 6 && config_atual.ativar_startup_stall == false)
								video_element.play();
								
							dialogItself.close();

							if(avaliados >= 6)
							{
								BootstrapDialog.show({
						            title: 'Experimento',
						            message: 'Teste finalizado! <br> Fechar a aba para concluir.'
						        });
							}
				       	}	
					}, {
					    label: 'Ruim',
					    cssClass: 'btn-danger',
						action: function(dialogItself) {
						    var return_object = {};
							return_object["opinion"] = "Ruim";
							return_object["rating"] = $('#rating').raty('score');
							return_object["conteudo"] = $("#conteudo").val();
							return_object["diario"] = $("#diario").val();
							return_object["tempo"] = $('input[name="tempo"]:checked').val();
							return_object["idade"] = $("#idade").val();
							return_object["sexo"] = $('input[name="sex"]:checked').val();
							return_object["pais"] = $("#pais").val();
							return_object["comment"] = $("#comment").val();
							return_object["perfil"] = avaliados-1
							return_object["teste_simulado"] = true;
							return_object["end_o"] = "0.0.0.0:3000";

							chrome.runtime.sendMessage({
								action: 'questionario',
								url: config.endereco,
								type: "POST",
								data: return_object,
							},  function(responseText) {
							});



							var time_interval = config_atual.intervalo_de_monitoramento; //In miliseconds
							var url = document.URL;
							video_element.currentTime = (avaliados-1) * (video_element.duration/5.0);
							
							monitor = new Monitor(video_element, url);
							monitor.start_all_monitoring(time_interval, config_atual.intervalo_minimo_de_stall);



							simulador = new Simulador(video_element);
							video_element.controls = false;
							
							
							if(config_atual.ativar_startup_stall && avaliados < 6) {
								$('.video-overlay').show();
								setTimeout(function() {
									$('.video-overlay').hide();
									video_element.play();
								}, config_atual.startup_time);
							}

							if(config_atual.ativar_stall) {
								simulador.add_stall_duration(config_atual.stall_duration);
								simulador.add_stalls_at_point(config_atual.estado_stall);
								simulador.start_stall_creator();
							}

							if(avaliados < 6 && config_atual.ativar_startup_stall == false)
								video_element.play();

							dialogItself.close();

							if(avaliados >= 6)
							{
								BootstrapDialog.show({
						            title: 'Experimento',
						            message: 'Teste finalizado! <br> Fechar a aba para concluir.'
						        });
							}
						}
					}]
		});

		
	});

	var timer_for_change_= setInterval(function() {
		if(video_element.currentTime > avaliados * (video_element.duration/5.0)) {
			clearInterval(timer_for_change_);
			$("#avaliar").click();
		}
	}, 300);
}

