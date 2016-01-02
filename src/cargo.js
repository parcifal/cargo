// the initiation methods to be called when the document is ready
var initiations = [];

// the elements to be appended to the document's head when the document is ready
var elements = [];

// indicates whether or not the document has loaded all its resources
var ready = false;

// call all initiation functions and load all elements when the document is
// ready
window.onload = function() {
	ready = true;

	for (var i = 0; i < initiations.length; i++) {
		initiations[i]();
	}

	for (var i = 0; i < elements.length; i++) {
		document.head.appendChild(elements[i]);
	}
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

	loadElement(script);
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

	loadElement(link);
}

/**
 * Load the specified element by appending it to the head of the document.
 * 
 * @param element
 *            The element to be appended to the head of the document.
 */
function loadElement(element) {
	if (ready) {
		document.head.appendChild(element);
	} else {
		elements.push(element);
	}
}