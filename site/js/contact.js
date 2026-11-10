/* ==========================================================================
   contact.js: demo contact form on the About page.
   Checks each field in the browser and shows a success message.
   Nothing is sent anywhere: there is no server.
   ========================================================================== */

/* A simple email check: something@something.something */
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Show or clear an error under one field */
function setError(field, message) {
  var error = document.getElementById(field.id + "-error");
  error.textContent = message;
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
}

/* Check one field and return its error message ("" if it's fine) */
function checkField(field) {
  var value = field.value.trim();
  if (field.id === "contact-name" && value === "") {
    return "Please enter your name.";
  }
  if (field.id === "contact-email") {
    if (value === "") {
      return "Please enter your email.";
    }
    if (!EMAIL_PATTERN.test(value)) {
      return "That email doesn't look right. Check for a missing @ or dot.";
    }
  }
  if (field.id === "contact-topic" && value === "") {
    return "Please choose a topic.";
  }
  if (field.id === "contact-message" && value.length < 10) {
    return "Please write a message of at least 10 characters.";
  }
  return "";
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var fields = ["contact-name", "contact-email", "contact-topic", "contact-message"].map(function (id) {
    return document.getElementById(id);
  });
  var success = document.getElementById("contact-success");

  /* Re-check a field when the user leaves it, once it has shown an error */
  fields.forEach(function (field) {
    field.addEventListener("blur", function () {
      if (field.hasAttribute("aria-invalid")) {
        setError(field, checkField(field));
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault(); /* never actually submit */
    success.hidden = true;

    var firstInvalid = null;
    fields.forEach(function (field) {
      var message = checkField(field);
      setError(field, message);
      if (message && !firstInvalid) {
        firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var name = document.getElementById("contact-name").value.trim().split(/\s+/)[0];
    document.getElementById("contact-success-text").textContent =
      "Thanks, " + name + "! Your message looks good. This is a demo, so nothing was sent.";
    success.hidden = false;
    success.focus();
    form.reset();
  });
});
