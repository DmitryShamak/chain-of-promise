var TheList = [],
	chainActivity = false;

var ListItem = function(attrs) {
	var self = this;

	self.callAction = function() {
		var promise = new Promise(function(onResolve, onReject) {
			if(self.callback && self.delay != undefined) {
				self.callback.call(self.scope);
				setTimeout(function() {
					onResolve(true);
				}, self.delay);
			}
		});

		return promise;
	};

	(function() {
		for(var key in attrs) {
			self[key] = attrs[key];
		}
	})();
};


var replaceItem = function(ind) {
	TheList.splice(ind, 1);
};

var getNextItem = function() {
	var item = TheList[0];
	return item;
};

var getChainPromise = function() {
	var promise = new Promise(function(onResolve, onReject) {
		var item = getNextItem();
		item.callAction().then(function() {
			replaceItem(0);
			onResolve(true);
		});
	});

	return promise;
};

var callChainItem = function() {
	getChainPromise().then(function() {
		if(TheList.length) return callChainItem();

		stopChaining();
	});
};

var stopChaining = function() {
	console.log("No More to call", TheList);
	chainActivity = false;
};

var startChaining = function() {
	if(!chainActivity) {
		chainActivity = true;
		callChainItem();
	}
};

var addToChain = function(scope, action, delay) {
	TheList.push(new ListItem({ delay: delay, scope: scope, callback: action }));

	if(!chainActivity) startChaining();
};