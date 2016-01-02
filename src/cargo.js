var initiations = [];
var scripts = [];
var links = [];

var ready = false;

window.onload = function() {
	for(var i = 0; i < initiations.length; i++) {
		initiations[i]();
	}
	
	ready = true;
	
	notify();
};

function notify() {
	if(ready) {
		for(var i = 0; i < scripts.length; i++) {
			document.head.appendChild(scripts[i]);
		}
		
		scripts = [];
		
		for(var i = 0; i < links.length; i++) {
			document.head.appendChild(links[i]);
		}
		
		links = [];
	}
}

function onReady(method) {
	initiations.push(method);
}

function loadScript(src, async) {
	var script = document.createElement("script");
	
	script.src = src;
	script.async = async;
	
	scripts.push(script);
	
	notify();
}

function loadLink(href, type, rel) {
	var link = document.createElement("link");
	
	link.href = href;
	link.type = type;
	link.rel = rel;
	
	links.push(link);
	
	notity();
}