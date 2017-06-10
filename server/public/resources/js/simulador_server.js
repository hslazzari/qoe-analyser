
function add_loading_icon() 
{
	$("#status_loading").addClass("video_loading_custom");
	$("#status_loading").removeClass("video_playing_custom");
}

function remove_loading_icon() 
{
	$("#status_loading").removeClass("video_loading_custom");
	$("#status_loading").addClass("video_playing_custom");
}

function Simulador(video_element) {
	this.start_timestamp = Date.now();
	this.video_element_ = video_element;
	
	this.startup_time_ = 5000;
	
	this.timer_for_stall_simulator_;
	this.has_finished_playing_ = false;


	this.start_point_ = 0;
	this.end_point_ = 0;
	this.stall_duration_ = [];
	this.number_of_stall_ = [];

}


Simulador.prototype.add_stall_info = function(start_point, end_point, stall_duration, number_of_stall) {
	this.start_point_ = start_point;
	this.end_point_ = end_point;
	this.stall_duration_ = stall_duration;
	this.number_of_stall_ = number_of_stall;
}

Simulador.prototype.has_ended = function() {
	return this.has_finished_playing_;
}

Simulador.prototype.stop_stall_creator = function() {
	clearInterval(this.timer_for_stall_simulator_);
}

Simulador.prototype.stop_all_simulation = function() {
	console.log("Parei")
	this.has_finished_playing_ = true;
	this.stop_stall_creator();
}

Simulador.prototype.start_stall_creator = function() {
	var self = this;
	var is_stall = false;

	this.timer_for_stall_simulator_ = setInterval(function() {
		
		if(self.has_ended() || self.number_of_stall_.length <= 0) 
		{
			clearInterval(self.timer_for_stall_simulator_);
			return;
		}

		
		if(!is_stall)
		{
			if(Math.abs(self.video_element_.currentTime - self.number_of_stall_[0]) < 0.7)
			{
				self.video_element_.pause();
				is_stall = true;
				add_loading_icon();
				
				setTimeout(function() { 
					self.stall_duration_.shift()
					self.number_of_stall_.shift()

					if(self.has_ended() == false)
					{
						console.log("Iniciei")
						self.video_element_.play();
					}
					remove_loading_icon();
					is_stall = false;
						
				}, self.stall_duration_[0]);
			}
		}
	}, 50);
}


