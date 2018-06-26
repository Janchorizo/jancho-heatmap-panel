'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var panelDefaults;
    return {
        setters: [],
        execute: function () {
            _export('panelDefaults', panelDefaults = {
                data: [], // data values from operating over the received
                mappedData: [],
                rawData: [],
                panelDivId: '',
                legend: {
                    show: true, // disable/enable legend
                    values: false, // disable/enable legend values
                    min: false,
                    max: false,
                    current: false,
                    total: false,
                    avg: false
                }
            });

            _export('panelDefaults', panelDefaults);
        }
    };
});
//# sourceMappingURL=panelDefaults.js.map
