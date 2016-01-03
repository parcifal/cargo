// the initiation methods to be called when the document is ready
var initiations = [];

// the scripts to be appended to the document's head when the document is ready
var scripts = [];

// the links to be appended to the document's head when the document is ready
var links = [];

// indicates whether or not the document has loaded all its resources
var ready = false;

var INDICATOR_CLASSNAME = "cargo-load";

var INDICATOR_LABEL_INITIATION = "calling %1()";
var INDICATOR_LABEL_SCRIPT = "loading script %1";
var INDICATOR_LABEL_LINK = "loading resource %1";

// call all initiation functions and load all scripts and links when the
// document is ready
window.onload = function() {
	ready = true;

	initiateIndicators(initiations.length + scripts.length + links.length);

	for (var i = 0; i < initiations.length; i++) {
		updateIndicators(INDICATOR_LABEL_INITIATION.replace("%1",
				initiations[i].name));

		initiations[i]();
	}

	for (var i = 0; i < scripts.length; i++) {
		updateIndicators(INDICATOR_LABEL_SCRIPT.replace("%1", scripts[i].src));

		document.head.appendChild(scripts[i]);
	}

	for (var i = 0; i < links.length; i++) {
		updateIndicators(INDICATOR_LABEL_LINK.replace("%1", links[i].href));

		document.head.appendChild(links[i]);
	}
	
	finishIndicators();
};

/**
 * The specified function will be called when the document is ready. If the
 * document is already ready it will be called immediately.
 * 
 * @param initiate
 *            The function the be called when the document is ready.
 */
function onReady(initiate) {
	if (ready) {
		initiate();
	} else {
		initiations.push(initiate);
	}
}

/**
 * Load the script at the specified source when the document is ready.
 * 
 * @param src
 *            The source of the script to be loaded.
 * @param async
 *            Whether or not the script should run asynchronous.
 */
function loadScript(src, async) {
	var script = document.createElement("script");

	script.src = src;

	if (async === undefined) {
		script.async = async;
	}

	if (ready) {
		document.head.appendChild(script);
	} else {
		scripts.push(script);
	}
}

/**
 * Load the resource with the specified reference, type and relationship.
 * 
 * @param href
 *            The reference to the resource to be loaded.
 * @param type
 *            The type of the resource to be loaded.
 * @param rel
 *            The relationship of the resource to be loaded.
 */
function loadLink(href, type, rel) {
	var link = document.createElement("link");

	link.href = href;
	link.type = type;
	link.rel = rel;

	if (ready) {
		document.head.appendChild(link);
	} else {
		links.push(link);
	}
}

function initiateIndicators(size) {
	var indicators = document.getElementsByClassName(INDICATOR_CLASSNAME);

	for (var i = 0; i < indicators.length; i++) {
		indicators[i].dataset.cargoSize = size;
		indicators[i].dataset.cargoStep = 0;

		indicators[i].classList.remove("idle");
		indicators[i].classList.add("active");
	}
}

function updateIndicators(label) {
	var indicators = document.getElementsByClassName(INDICATOR_CLASSNAME);

	for (var i = 0; i < indicators.length; i++) {
		var step = parseInt(indicators[i].dataset.cargoStep);
		var size = parseInt(indicators[i].dataset.cargoSize);
		
		step++;

		indicators[i].dataset.cargoStep = step;
		indicators[i].dataset.cargoLabel = label;
		indicators[i].dataset.cargoPercentageDone = (step / size) * 100;
		indicators[i].dataset.cargoPercentageLeft = 100 - (step / size) * 100;
	}
}

function finishIndicators() {
	var indicators = document.getElementsByClassName(INDICATOR_CLASSNAME);

	for (var i = 0; i < indicators.length; i++) {
		delete indicators[i].dataset.cargoSize;
		delete indicators[i].dataset.cargoStep;
		delete indicators[i].dataset.cargoLabel;
		delete indicators[i].dataset.cargoPercentageDone;
		delete indicators[i].dataset.cargoPercentageLeft;

		indicators[i].classList.remove("active");
		indicators[i].classList.add("idle");
	}
}