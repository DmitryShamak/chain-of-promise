var SpeekingBox = function(attrs) {
	var self = this;
	
	self.blinkDelay = 5000;
	self.eyeStatus = "";	
	self.init = function() {
		self.element = document.getElementById("speekingBoxElem");
		addToChain(self, self.doBlink, self.blinkDelay);
	};
	self.init();
};

SpeekingBox.prototype.closeEye = function() {
	$(this.element).find('.eyelid').addClass('closed');
};
SpeekingBox.prototype.openEye = function() {
	var self = this;
	var eyeLid = self.element.querySelector('.eyelid');
	if(eyeLid) eyeLid.className = "eyelid " + self.eyeStatus;
};
SpeekingBox.prototype.doBlink = function() {
	var self = this;
	var blinkFreezeDelay = 500;

	addToChain(self, self.closeEye, blinkFreezeDelay);
	addToChain(self, self.openEye, 0);
	addToChain(self, self.doBlink, self.blinkDelay);
};

window.onload = function() {
	var speekingBox = new SpeekingBox();
};