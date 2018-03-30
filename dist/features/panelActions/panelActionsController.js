'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', './panelActionsDefaults.js', './panelActionsEditor.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, _, panelActionsDefaults, panelActionsEditor, Feature;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_appCoreTime_series) {
            TimeSeries = _appCoreTime_series.default;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_panelActionsDefaultsJs) {
            panelActionsDefaults = _panelActionsDefaultsJs.panelActionsDefaults;
        }, function (_panelActionsEditorJs) {
            panelActionsEditor = _panelActionsEditorJs.panelActionsEditor;
        }],
        execute: function () {
            Feature = function Feature($scope) {
                _classCallCheck(this, Feature);

                this.$scope = $scope;
                this.panelController = $scope.ctrl;
                _.defaults(this.panelController.panel, panelActionsDefaults);

                //this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
                //this.panelController.events.on( 'data-received', this.onDataReceived);
                //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
                //this.panelController.events.on( 'render', this.onRender);
                //this.panelController.events.on( 'refresh', this.onRefresh);
            }

            //onInitEditMode(){
            //    this.panelController.addEditorTab( 'PanelActions', panelActionsEditor( this.$scope), 2);
            //}
            ;

            _export('default', Feature);
        }
    };
});
//# sourceMappingURL=panelActionsController.js.map
