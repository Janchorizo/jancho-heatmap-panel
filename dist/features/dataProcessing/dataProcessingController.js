'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', './dataProcessingDefaults.js', './dataProcessingEditor.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, _, dataProcessingDefaults, dataProcessingEditor, _createClass, Feature;

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

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
        }, function (_dataProcessingDefaultsJs) {
            dataProcessingDefaults = _dataProcessingDefaultsJs.dataProcessingDefaults;
        }, function (_dataProcessingEditorJs) {
            dataProcessingEditor = _dataProcessingEditorJs.dataProcessingEditor;
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
                    this.panel = this.panelController.panel;
                    _.defaults(this.panelController.panel, dataProcessingDefaults);

                    this.panelController.events.on('init-edit-mode', this.onInitEditMode.bind(this));
                    this.panelController.events.on('data-received', this.onDataReceived.bind(this));
                    //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
                    this.panelController.events.on('refresh', this.onRefresh.bind(this));
                    console.log('data object done');
                }

                _createClass(Feature, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.panelController.addEditorTab('DataProcessing', dataProcessingEditor(this.$scope), 2);
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        console.log('dataProcessing controller onDataReceived');
                        if (dataList.length > 0) {
                            this.panel.rawData = dataList;
                            this.panel.dataProcessing.processingOnGoing = true;

                            var data = dataList.map(this.seriesHandler.bind(this));
                            this.panel.data = data.map(this.mapSeriesToValue.bind(this));

                            this.panel.dataProcessing.processingOnGoing = false;
                        } else {
                            return;
                        }
                    }
                }, {
                    key: 'onRefresh',
                    value: function onRefresh() {
                        console.log('dataProcessing controller refresh');
                        if (this.panel.rawData.length > 0) {
                            this.panel.dataProcessing.processingOnGoing = true;

                            var data = this.panel.rawData.map(this.seriesHandler.bind(this));
                            this.panel.data = data.map(this.mapSeriesToValue.bind(this));

                            this.panel.dataProcessing.processingOnGoing = false;
                        } else {
                            return;
                        }
                    }
                }, {
                    key: 'seriesHandler',
                    value: function seriesHandler(dataList) {
                        console.log('data processing series handler');
                        //tratar nulos
                        var series = new TimeSeries({
                            datapoints: dataList.datapoints,
                            alias: dataList.target
                        });
                        return series;
                    }
                }, {
                    key: 'mapSeriesToValue',
                    value: function mapSeriesToValue(timeseries) {
                        var value = {};
                        value['metric'] = timeseries.id;
                        switch (this.panel.dataProcessing.valueStat) {
                            case 'min':
                                value['value'] = Math.min.apply(Math, _toConsumableArray(timeseries.datapoints.map(function (s) {
                                    return s[0];
                                })));
                                break;
                            case 'max':
                                value['value'] = Math.max.apply(Math, _toConsumableArray(timeseries.datapoints.map(function (s) {
                                    return s[0];
                                })));
                                break;
                            case 'avg':
                                value['value'] = timeseries.datapoints.map(function (s) {
                                    return s[0];
                                }).reduce(function (a, b) {
                                    return a + b;
                                }, 0) / timeseries.datapoints.length;
                                break;
                            case 'current':
                                value['value'] = timeseries.datapoints[timeseries.datapoints.length - 1][0];
                                break;
                            case 'total':
                                value['value'] = timeseries.datapoints.map(function (s) {
                                    return s[0];
                                }).reduce(function (a, b) {
                                    return a + b;
                                }, 0);
                                break;
                            case 'first':
                                value['value'] = timeseries.datapoints[0][0];
                                break;
                            case 'diff':
                                value['value'] = _.max(_.map(_.map(timeseries.datapoints.map(function (a) {
                                    return a[0];
                                }), function (a, b, c) {
                                    if (b < c.length - 1) {
                                        return [a, c[b + 1]];
                                    } else {
                                        return [0, 0];
                                    }
                                }), function (a) {
                                    return Math.abs(a[0] - a[1]);
                                }));
                                break;
                            case 'range':
                                value['value'] = _.max(timeseries.datapoints.map(function (a) {
                                    return a[0];
                                })) - _.min(timeseries.datapoints.map(function (a) {
                                    return a[0];
                                }));
                                break;
                            case 'last_time':
                                value['value'] = timeseries.datapoints[timeseries.datapoints.length - 1][1];
                                break;
                        }
                        return value;
                    }
                }]);

                return Feature;
            }();

            _export('default', Feature);
        }
    };
});
//# sourceMappingURL=dataProcessingController.js.map
