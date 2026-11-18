/* ==========================================================================
   scroll.js: eased scrolling, shared by every page.
   The wheel moves the page a little at a time instead of jumping, the same
   calm catch-up the studio site uses. The scrollbar, keyboard, touch, the
   find bar and any panel that scrolls on its own stay native.
   - "Reduce motion" turns it off and the page scrolls normally.
   - The stylesheet keeps smooth anchor jumps; each frame here asks for an
     instant scroll so the two never animate on top of each other.
   ========================================================================== */

(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var LERP = 0.12; /* how quickly the page catches up with the wheel: 0-1 */
  var frameId = 0;
  var target = 0;
  var current = 0;
  var enabled = false;

  /* "instant" keeps the stylesheet's smooth scrolling out of our way. Older
     browsers fall back to a plain scrollTo. */
  var instant = true;
  try {
    window.scrollTo({ top: window.scrollY, behavior: "instant" });
  } catch (error) {
    instant = false;
  }

  function limit() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function clamp(value) {
    return Math.min(Math.max(value, 0), limit());
  }

  function scrollTo(value) {
    if (instant) {
      window.scrollTo({ top: value, behavior: "instant" });
    } else {
      window.scrollTo(0, value);
    }
  }

  function stop() {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  }

  function step() {
    current += (target - current) * LERP;
    if (Math.abs(target - current) < 0.5) {
      current = target;
    }
    scrollTo(current);
    if (current === target) {
      frameId = 0;
      return;
    }
    frameId = requestAnimationFrame(step);
  }

  function glideTo(value) {
    target = clamp(value);
    if (!frameId) {
      current = window.scrollY;
      frameId = requestAnimationFrame(step);
    }
  }

  /* Trackpads report pixels, some mice report lines, a few report pages */
  function wheelDelta(event) {
    if (event.deltaMode === 1) {
      return event.deltaY * 16;
    }
    if (event.deltaMode === 2) {
      return event.deltaY * window.innerHeight;
    }
    return event.deltaY;
  }

  /* A panel that scrolls on its own (the phone menu, the resume preview, a
     textarea) keeps its wheel until it reaches its edge */
  function scrollsInside(node, delta) {
    while (node && node !== document.body && node !== document.documentElement) {
      var overflow = window.getComputedStyle(node).overflowY;
      var scrolls = overflow === "auto" || overflow === "scroll" || overflow === "overlay";
      if (scrolls && node.clientHeight > 0 && node.scrollHeight > node.clientHeight + 1) {
        var canMove = delta < 0
          ? node.scrollTop > 0
          : node.scrollTop + node.clientHeight < node.scrollHeight - 1;
        if (canMove) {
          return true;
        }
      }
      node = node.parentElement;
    }
    return false;
  }

  function onWheel(event) {
    if (!enabled || event.ctrlKey || event.defaultPrevented) {
      return; /* pinch zoom, or something else already handled it */
    }
    if (document.body.classList.contains("menu-open")) {
      return; /* the phone menu has locked the page */
    }
    var delta = wheelDelta(event);
    if (!delta || Math.abs(event.deltaX) > Math.abs(delta)) {
      return; /* nothing vertical, or a sideways gesture */
    }
    if (scrollsInside(event.target, delta)) {
      return;
    }
    var top = window.scrollY;
    if ((top <= 0 && delta < 0) || (top >= limit() && delta > 0)) {
      return; /* already at the end: leave the browser alone */
    }
    event.preventDefault();
    glideTo(target + delta);
  }

  /* Anything that moves the page by itself (scrollbar, keyboard, an anchor)
     becomes the new starting point */
  function onScroll() {
    var top = window.scrollY;
    if (frameId) {
      if (Math.abs(top - current) > 2) {
        stop(); /* the page was moved from outside: stop fighting it */
      }
    }
    if (!frameId) {
      target = current = top;
    }
  }

  function onResize() {
    if (!frameId) {
      target = current = window.scrollY;
    } else {
      target = clamp(target);
    }
  }

  function applyPreference() {
    enabled = !reduceMotion.matches;
    if (!enabled) {
      stop();
      target = current = window.scrollY;
    }
  }

  applyPreference();
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", applyPreference);
  } else if (reduceMotion.addListener) {
    reduceMotion.addListener(applyPreference); /* older browsers */
  }
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
})();
