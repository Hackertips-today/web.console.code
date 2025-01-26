// Detect known JS / Display version 

(function detectLibraries(showAll = 0) {
  const knownLibs = {
    jQuery: () => window.jQuery?.fn?.jquery,
    AngularJS: () => window.angular?.version?.full,
    React: () => window.React?.version,
    Vue: () => window.Vue?.version,
    lodash: () => window._?.VERSION,
    underscore: () => window._?.VERSION && window._.each && !window._.mixin && "Underscore.js",
    moment: () => window.moment?.version,
    rxjs: () => window.rxjs?.version,
    D3: () => window.d3?.version,
    Mustache: () => window.Mustache?.version || (window.Mustache && "unknown version"),
    Knockout: () => window.ko?.version,
    Axios: () => window.axios?.VERSION,
    Backbone: () => window.Backbone?.VERSION,
    Handlebars: () => window.Handlebars?.VERSION,
    Polymer: () => window.Polymer?.version,
    Ember: () => window.Ember?.VERSION,
    Bluebird: () => window.P?.version,
    ChartJS: () => window.Chart?.defaults?.version,
    Zepto: () => window.Zepto?.fn?.zepto,
    ThreeJS: () => window.THREE?.REVISION,
    AnimeJS: () => window.anime?.version,
    Leaflet: () => window.L?.version,
    Select2: () => window.jQuery?.fn?.select2?.amd?.requirejs?.s.contexts._?.config?.paths?.select2,
    FullCalendar: () => window.FullCalendar?.version,
    Swiper: () => window.Swiper?.version,
    Highcharts: () => window.Highcharts?.version,
    VideoJS: () => window.videojs?.VERSION,
    PixiJS: () => window.PIXI?.VERSION,
    BabylonJS: () => window.BABYLON?.version,
    SnapSVG: () => window.Snap?.version,
    SocketIO: () => window.io?.version,
    HighlightJS: () => window.hljs?.version,
    CodeMirror: () => window.CodeMirror?.version,
    Quill: () => window.Quill?.version,
    TinyMCE: () => window.tinymce?.majorVersion,
    CKEditor: () => window.CKEDITOR?.version,
    Froala: () => window.FroalaEditor?.VERSION,
    SweetAlert2: () => window.Swal?.version,
    Toastify: () => window.Toastify?.version,
    DayJS: () => window.dayjs?.version,
    AlpineJS: () => window.Alpine && "Alpine.js",
    Mithril: () => window.m?.version,
    Ractive: () => window.Ractive?.VERSION,
  };

  // Get the <script> tags for FQDN
  const scriptSources = Array.from(document.querySelectorAll("script")).map((s) => s.src);

  // Create the final result array
  const result = Object.entries(knownLibs).map(([name, versionFn]) => {
    const version = versionFn();
    const fqdn = scriptSources.find((src) => src.includes(name.toLowerCase())) || "Unknown source";
    return { name, version: version || "Not detected", source: fqdn };
  });

  // Filter to only show detected if showAll is 0
  const filteredResult = showAll === 1 ? result : result.filter((lib) => lib.version !== "Not detected");

  // Log results in a table for clarity
  console.table(filteredResult);
})(0); // Call with 0 to show only detected, 1 to show all




