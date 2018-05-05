'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var renderDefaults;
  return {
    setters: [],
    execute: function () {
      _export('renderDefaults', renderDefaults = {
        render: {
          feature: 'render',
          desc: 'rendering SVG map',
          baseMapRoute: 'public/plugins/jancho-heatmap-panel/resources/',
          elementIdentifyer: 'sala',
          unknownDataColor: 'white',
          availableMaps: ['plano', 'brain'],
          mapRoute: 'plano',
          discrete_continuous: true,
          colors: ['rgb(98, 158, 81)', 'rgb(31, 29, 29)', 'red'],
          //colors:['rgb(98, 158, 81)', 'white', 'red'],
          domain: [0, 10, 20],
          thresholds: [7.5, 15]
        }
      });

      _export('renderDefaults', renderDefaults);
    }
  };
});
//# sourceMappingURL=renderDefaults.js.map
