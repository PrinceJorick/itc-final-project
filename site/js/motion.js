/* ==========================================================================
   motion.js: fills the "What's inside" meters on the home page.
   Each meter's <i> carries its share in data-fill (a percent). CSS draws
   the meter as a rounded pill; this script only sets the fill width.
   The mono redesign keeps motion to short hover and focus fades, so there
   are no scroll reveals or counting numbers any more. The counts are
   already written in the HTML, so the page is complete without JavaScript.
   ========================================================================== */

function fillMeters() {
  var bars = document.querySelectorAll(".reg-meter i[data-fill]");
  for (var i = 0; i < bars.length; i++) {
    bars[i].style.width = bars[i].getAttribute("data-fill") + "%";
  }
}

document.addEventListener("DOMContentLoaded", fillMeters);
