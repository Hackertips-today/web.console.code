(function detectLoadedLibraries() {
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
        Knockout: () => window.ko?.version,
        Axios: () => window.axios?.VERSION,
        Backbone: () => window.Backbone?.VERSION,
        Handlebars: () => window.Handlebars?.VERSION,
        Polymer: () => window.Polymer?.version,
        Ember: () => window.Ember?.VERSION,
        ChartJS: () => window.Chart?.defaults?.version,
        Zepto: () => window.Zepto?.fn?.zepto,
        ThreeJS: () => window.THREE?.REVISION,
        AnimeJS: () => window.anime?.version,
        Leaflet: () => window.L?.version,
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
        AlpineJS: () => window.Alpine ? "Alpine.js Detected" : null,
        Mithril: () => window.m?.version,
        Ractive: () => window.Ractive?.VERSION,
        MathJax: () => window.MathJax?.version,
        MomentJS: () => window.moment?.version,
        jQueryUI: () => window.jQuery?.ui?.version,
        PrototypeJS: () => window.Prototype?.Version,
        MooTools: () => window.MooTools?.version,
        ExtJS: () => window.Ext?.version,
        FabricJS: () => window.fabric?.version,
        OpenLayers: () => window.ol?.VERSION,
        PDFJS: () => window.pdfjsLib?.version
    };

    // Get all script sources for better detection
    const scriptSources = Array.from(document.querySelectorAll("script")).map(s => s.src);

    // Collect detected libraries
    const detectedLibs = Object.entries(knownLibs)
        .map(([name, getVersion]) => {
            let version = getVersion();
            if (!version) return null; // Skip if not detected
            let source = scriptSources.find(src => src.toLowerCase().includes(name.toLowerCase())) || "Unknown source";
            return { name, version, source };
        })
        .filter(lib => lib !== null); // Remove null (non-detected) entries

    // Only show results if libraries are found
    if (detectedLibs.length > 0) {
        console.table(detectedLibs);
    } else {
        console.log("No known libraries detected.");
    }
})();
