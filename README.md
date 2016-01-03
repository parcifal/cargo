# Cargo
Call initialization functions and load resources and scripts when the document is ready.

## Defining an initiation function
An initiation function is a function that will be called when the document is ready. To define a function as an initiation function, simply call the `onReady` function with the initiation function as the first parameter..

```
onReady(myInitiation);

function myInitiation() {
  console.log("I'm initiating!");
}
```

## Loading a script
To load a script from your script, call the function `loadScript` with the source of the script as the first parameter and optionaly a boolean as the second parameter, indicating whether or not the script should be asynchronous or not.

```
// load a script asynchronous
loadScript("myFirstScript.js", true);

// load a script synchronous
loadScript("mySecondScript.js", false);

// load a script synchronous
loadScript("myThirdScript.js");
```

## Loading a link
To load a link from your script, call the function `loadLink` with the reference to the link as the first parameter, the type of the resource linked to as the second parameter and the relation to the resource as the third parameter.

```
loadLink("myCss.css", "text/css", "stylesheet");
```

## Creating a loading indicator
To add a loading indicator to you document, add an element with `cargo-load` in its classname. The cargo script will update all of these elements with data about the current status.

```
<div class="cargo-load"></div>
```

The data can be accessed in CSS using the data attributes.

```
/* setting the size of the loading indicator as its content */
.cargo-load {
  content: attr(data-cargo-size);
}

/* setting the current step as the loading indicator's content */
.cargo-load {
  content: attr(data-cargo-step);
}

/* setting the label of the current step as the loading indicator's content */
.cargo-load {
  content: attr(data-cargo-label);
}

/* setting the percentatage done as the loading indicator's content */
.cargo-load {
  content: attr(data-cargo-percentage-done);
}

/* setting the percentatage left as the loading indicator's content */
.cargo-load {
  content: attr(data-cargo-percentage-left);
}
```
