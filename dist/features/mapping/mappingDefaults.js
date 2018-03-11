'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var mappingDefaults;
  return {
    setters: [],
    execute: function () {
      _export('mappingDefaults', mappingDefaults = {
        mapping: {
          feature: 'mapping',
          desc: 'mapping description',
          mapByAlias: true,
          valueMappings: [{
            metric: 'none',
            target: 'none',
            description: 'One simple mapping description'
          }]
        }
      });

      _export('mappingDefaults', mappingDefaults);
    }
  };
});
//# sourceMappingURL=mappingDefaults.js.map
