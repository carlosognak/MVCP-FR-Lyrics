// Makeshift carousel function that gets invoked with the Index to start it off, then the callback increments the index to recursively invoke the same function. Works even in IE11!
var testimonialItems = document.querySelectorAll(".item label");
var timer;
function cycleTestimonials(index) {
  timer = setTimeout(function () {
    var evt;
    if (document.createEvent) {
      //If browser = IE, then polyfill
      evt = document.createEvent("MouseEvent");
      evt.initMouseEvent(
        "click",
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
    } else {
      //If Browser = modern, then create new MouseEvent
      evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 20
      });
    }
    var ele = "." + testimonialItems[index].className;
    var ele2 = document.querySelector(ele);
    ele2.dispatchEvent(evt);
    index++; // Increment the index
    if (index >= testimonialItems.length) {
      index = 0; // Set it back to `0` when it reaches `3`
    }
    cycleTestimonials(index); // recursively call `cycleTestimonials()`
    document
      .querySelector(".testimonials")
      .addEventListener("click", function () {
        clearTimeout(timer); //stop the carousel when someone clicks on the div
      });
  }, 100); //adjust scroll speed in miliseconds
}

//run the function - Commenter pour ne pas exécuter automatiquement. L'exécution se fait par clique.
//cycleTestimonials(0);

// Code à exécuter quand le formulaire de chargement de lyrics est exécuté
function charger_lyrics() {
  var texte = document.getElementById("lyrics").value;

  var my_random_id = Math.random();

  var input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("id", "page" + my_random_id);
  input.setAttribute("name", "basic_carousel");
  input.setAttribute("checked", "checked");

  var label = document.createElement("label");
  label.setAttribute("class", "label_testimonial");
  label.setAttribute("for", "page" + my_random_id);
  label.appendChild(document.createTextNode(texte));

  var div = document.createElement("div");
  div.setAttribute("class", "content-test content_testimonial");
  var h1 = document.createElement("h1");
  h1.appendChild(document.createTextNode(texte));
  div.appendChild(h1);

  var li = document.createElement("li");
  li.setAttribute("class", "item");

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(div);

  var ul = document.getElementById("list");
  ul.appendChild(li);

  return false;
}
