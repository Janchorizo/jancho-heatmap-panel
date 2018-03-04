'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', './libs/d3/build/d3.js', './panelDefaults.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, _, d3, panelDefaults, _createClass, HeatmapController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_appCoreTime_series) {
            TimeSeries = _appCoreTime_series.default;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_libsD3BuildD3Js) {
            d3 = _libsD3BuildD3Js;
        }, function (_panelDefaultsJs) {
            panelDefaults = _panelDefaultsJs.panelDefaults;
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

            _export('HeatmapController', HeatmapController = function (_MetricsPanelCtrl) {
                _inherits(HeatmapController, _MetricsPanelCtrl);

                function HeatmapController($scope, $injector) {
                    _classCallCheck(this, HeatmapController);

                    var _this = _possibleConstructorReturn(this, (HeatmapController.__proto__ || Object.getPrototypeOf(HeatmapController)).call(this, $scope, $injector));

                    _.defaults(_this.panel, panelDefaults);
                    _this.panel.thresholds = panelDefaults.thresholds;

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('panel-initialized', _this.onPanelInitialized.bind(_this));
                    _this.events.on('render', _this.onRender.bind(_this));
                    _this.events.on('refresh', _this.onRefresh.bind(_this));
                    return _this;
                }

                // Grafana event controllers


                _createClass(HeatmapController, [{
                    key: 'onPanelInitialized',
                    value: function onPanelInitialized() {}
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {}
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {}
                }, {
                    key: 'onRender',
                    value: function onRender() {}
                }, {
                    key: 'onRefresh',
                    value: function onRefresh() {}
                }, {
                    key: 'onColorChange',
                    value: function onColorChange(index) {}
                }]);

                return HeatmapController;
            }(MetricsPanelCtrl));

            _export('HeatmapController', HeatmapController);

            HeatmapController.templateUrl = 'partials/module.html';
        }
    };
});
//# sourceMappingURL=heatmapCtrl.js.map
