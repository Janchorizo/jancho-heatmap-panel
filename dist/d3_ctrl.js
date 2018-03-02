'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'moment', 'lodash', './libs/d3/build/d3.js', './panelDefaults.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, moment, _, d3, panelDefaults, _createClass, D3Controller;

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
        }, function (_moment) {
            moment = _moment.default;
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

            _export('D3Controller', D3Controller = function (_MetricsPanelCtrl) {
                _inherits(D3Controller, _MetricsPanelCtrl);

                function D3Controller($scope, $injector) {
                    _classCallCheck(this, D3Controller);

                    var _this = _possibleConstructorReturn(this, (D3Controller.__proto__ || Object.getPrototypeOf(D3Controller)).call(this, $scope, $injector));

                    _.defaults(_this.panel, panelDefaults);
                    _this.panel.thresholds = panelDefaults.thresholds;
                    _this.panel.thresholds = panelDefaults.thresholds;

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('panel-initialized', _this.onPanelInitialized.bind(_this));
                    _this.events.on('render', _this.onRender.bind(_this));
                    _this.events.on('refresh', _this.onRefresh.bind(_this));

                    _this.updateScaleColor();

                    _this.cargarPlano('plano', _this.panel.mapRoute);
                    console.info('This panel');
                    console.log(_this.panel);
                    return _this;
                }

                // Grafana event controllers


                _createClass(D3Controller, [{
                    key: 'onPanelInitialized',
                    value: function onPanelInitialized() {}
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/alex-d3-panel/partials/optionsEditor.html', 2);
                        //        this.addEditorTab( 'Value Mappings', 'public/plugins/alex-d3-panel/partials/valueMappingsEditor.html', 2);
                        this.addEditorTab('Render', 'public/plugins/alex-d3-panel/partials/renderEditor.html', 3);
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        //console.info('onDataReceived');
                        if (dataList.length > 0) {
                            if (dataList[0].type === 'table') {
                                console.info('table-received');
                                this.panel.dataType = 'table';
                            } else {
                                //if( dataList[0].type === 'timeseries'){
                                //                console.info('timeseries-received');
                                this.panel.dataType = 'timeseries';
                                var data = dataList.map(this.seriesHandler.bind(this));
                                this.panel.data = data.map(this.mapSeriesToValue.bind(this));
                            }
                        } else {
                            return;
                        }

                        this.panel.mappedData = [];
                        for (var i in this.panel.valueMaps) {
                            var correspondance = this.panel.valueMaps[i];
                            var index = this.panel.data.map(function (s) {
                                return s['metric'];
                            }).indexOf(correspondance.metric);

                            if (index != -1) {
                                var t = {};
                                t['identificador'] = correspondance.target;
                                t['valor'] = this.panel.data[index]['value'];
                                this.panel.mappedData.push(t);
                            }
                        }
                        //        console.log('Data : ',this.panel.data);
                        //        console.log('Mapped data : ',this.panel.mappedData);
                        this.render();
                    }
                }, {
                    key: 'onRender',
                    value: function onRender() {

                        //      console.info('onRender');
                        this.renderSala('.plano', this.panel.mappedData);
                    }
                }, {
                    key: 'onRefresh',
                    value: function onRefresh() {
                        //        console.info('onRefresh');
                        //        console.log( this.panel);
                    }
                }, {
                    key: 'onColorChange',
                    value: function onColorChange(index) {
                        console.info("onColorChange");
                        console.info('panel');
                        console.log(this.panel);
                        console.info('scnd');
                        console.log(this.panel.discrete_continuous + " ths -> " + this.panel.thresholds[0] + " domain -> " + this.panel.domain);

                        this.panel.thresholds = this.panel.thresholds.map(function (a) {
                            return parseInt(a);
                        });
                        this.panel.domain = this.panel.domain.map(function (a) {
                            return parseInt(a);
                        });

                        this.updateScaleColor();
                        this.render();
                    }
                }, {
                    key: 'seriesHandler',
                    value: function seriesHandler(dataList) {
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
                        switch (this.panel.valueStat) {
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
                            case 'name':

                                break;
                            case 'first':
                                value['value'] = timeseries.datapoints[0][0];
                                break;
                            case 'delta':

                                break;
                            case 'diff':

                                break;
                            case 'range':

                                break;
                            case 'last_time':

                                break;
                        }
                        return value;
                    }
                }, {
                    key: 'updateScaleColor',
                    value: function updateScaleColor() {
                        if (this.panel.discrete_continuous == true) {
                            this.scaleColor = function (value) {
                                if (value <= this.panel.thresholds[0]) {
                                    return this.panel.colors[0];
                                } else if (value <= this.panel.thresholds[1]) {
                                    return this.panel.colors[1];
                                } else {
                                    return this.panel.colors[2];
                                }
                            };
                        } else {
                            this.scaleColor = d3.scaleLinear().domain(this.panel.domain).range(this.panel.colors);
                        }
                    }
                }, {
                    key: 'cargarPlano',
                    value: function cargarPlano(target, dir) {
                        d3.xml(dir).mimeType("image/svg+xml").get(function (error, xml) {
                            if (error) {
                                throw error;
                            }
                            document.getElementsByClassName(target)[0].appendChild(xml.documentElement);
                        });
                    }
                }, {
                    key: 'renderSala',
                    value: function renderSala(target, data) {
                        //Binding
                        var salas = d3.select(target + ' svg').selectAll('rect').data(data, function (d) {
                            return d ? d.identificador : this.id;
                        });

                        //Update
                        var t = d3.transition().duration(750).ease(d3.easeLinear);
                        salas.transition(t).style('fill', $.proxy(function (d) {
                            return this.scaleColor(d.valor);
                        }, this));

                        var salas = d3.select(target + ' svg').selectAll('path').data(data, function (d) {
                            return d ? d.identificador : this.id;
                        });

                        //Update
                        var t = d3.transition().duration(750).ease(d3.easeLinear);
                        salas.transition(t).style('fill', $.proxy(function (d) {
                            return this.scaleColor(d.valor);
                        }, this));
                    }
                }, {
                    key: 'removeValueMapping',
                    value: function removeValueMapping(mapping) {
                        var index = this.panel.valueMaps.indexOf(mapping);
                        this.panel.valueMaps.splice(index);
                    }
                }, {
                    key: 'addValueMapping',
                    value: function addValueMapping() {
                        this.panel.valueMaps.push({ metric: '', target: '', desc: '' });
                    }
                }]);

                return D3Controller;
            }(MetricsPanelCtrl));

            _export('D3Controller', D3Controller);

            D3Controller.templateUrl = 'partials/module.html';
        }
    };
});
//# sourceMappingURL=d3_ctrl.js.map
