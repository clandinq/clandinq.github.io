/* main.js - theme toggle, abstract toggles, thumbnail-effect switch.
   Vanilla JS, no dependencies. Loaded with defer. */
(function () {
  'use strict';

  var root = document.documentElement;

  /* (a) Theme -------------------------------------------------------------
     If no theme was applied by the inline head script, reflect the OS
     preference on <html> WITHOUT saving it (so the OS choice keeps winning
     until the visitor presses the toggle). */
  if (!root.getAttribute('data-theme')) {
    var prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) { /* storage unavailable: theme still applies this visit */ }
    });
  }

  /* (b) Abstract toggles --------------------------------------------------
     Each .abstract-toggle controls the element named in aria-controls. */
  var toggles = document.querySelectorAll('.abstract-toggle');
  Array.prototype.forEach.call(toggles, function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('aria-controls');
      var panel = id ? document.getElementById(id) : null;
      if (!panel) return;
      var nowHidden = !panel.hidden;
      panel.hidden = nowHidden;
      btn.setAttribute('aria-expanded', nowHidden ? 'false' : 'true');
    });
  });

  /* (c) Thumbnail effect --------------------------------------------------
     ?thumb=zoom|grayscale overrides the body default and is carried across
     the internal nav links so the choice persists between tabs. */
  var thumb = null;
  try {
    thumb = new URLSearchParams(window.location.search).get('thumb');
  } catch (e) { /* ignore malformed query */ }

  if (thumb === 'zoom' || thumb === 'grayscale') {
    if (document.body) document.body.dataset.thumbEffect = thumb;

    var links = document.querySelectorAll('.tabs a, .site-name');
    Array.prototype.forEach.call(links, function (a) {
      var href = a.getAttribute('href');
      // Only relative, internal links (index.html, data.html, cv.html)
      if (!href || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.charAt(0) === '#' ||
          href.indexOf('//') === 0) return;
      var hash = '';
      var hashAt = href.indexOf('#');
      if (hashAt !== -1) {
        hash = href.slice(hashAt);
        href = href.slice(0, hashAt);
      }
      href = href.replace(/([?&])thumb=[^&]*&?/, '$1').replace(/[?&]$/, '');
      a.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') +
        'thumb=' + thumb + hash);
    });
  }
})();
