'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', './renderDefaults.js', './renderEditor.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, _, renderDefaults, renderEditor, _createClass, Feature;

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
        }, function (_renderDefaultsJs) {
            renderDefaults = _renderDefaultsJs.renderDefaults;
        }, function (_renderEditorJs) {
            renderEditor = _renderEditorJs.renderEditor;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            Feature = function () {
                function Feature($scope) {
                    _classCallCheck(this, Feature);

                    this.$scope = $scope;
                    this.panelController = $scope.ctrl;
                    _.defaults(this.panelController.panel, renderDefaults);

                    this.panelController.events.on('init-edit-mode', this.onInitEditMode.bind(this));
                    //this.panelController.events.on( 'data-received', this.onDataReceived);
                    //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
                    //this.panelController.events.on( 'render', this.onRender);
                    //this.panelController.events.on( 'refresh', this.onRefresh);
                }

                _createClass(Feature, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.panelController.addEditorTab('Render', renderEditor(this.$scope), 2);
                    }
                }]);

                return Feature;
            }();

            _export('default', Feature);
        }
    };
});
//# sourceMappingURL=renderController.js.map
