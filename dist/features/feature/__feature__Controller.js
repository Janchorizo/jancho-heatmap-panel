'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', './__feature__Defaults.js', './__feature__Editor.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, _, __feature__Defaults, __feature__Editor, _createClass, Feature;

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
        }, function (_feature__DefaultsJs) {
            __feature__Defaults = _feature__DefaultsJs.__feature__Defaults;
        }, function (_feature__EditorJs) {
            __feature__Editor = _feature__EditorJs.__feature__Editor;
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
                    this.panel = $scope.ctrl.panel;

                    var defaults = _.cloneDeep(__feature__Defaults);
                    _.defaults(this.panel, defaults);

                    this.panelController.events.on('init-edit-mode', this.onInitEditMode.bind(this));
                    //this.panelController.events.on( 'data-received', this.onDataReceived.bind(this));
                    //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized.bind(this));
                    //this.panelController.events.on( 'render', this.onRender.bind(this));
                    //this.panelController.events.on( 'refresh', this.onRefresh.bind(this));
                    //this.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
                }

                _createClass(Feature, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.panelController.addEditorTab('__Feature__', __feature__Editor(this.$scope), 2);
                    }
                }, {
                    key: 'onInitPanelActions',
                    value: function onInitPanelActions(actions) {
                        actions.push({ text: 'event button text', click: 'ctrl.panelEvent()' });
                    }
                }, {
                    key: 'panelEvent',
                    value: function panelEvent() {}
                }]);

                return Feature;
            }();

            _export('default', Feature);
        }
    };
});
//# sourceMappingURL=__feature__Controller.js.map
