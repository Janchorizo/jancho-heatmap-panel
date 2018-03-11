'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', './mappingDefaults.js', './mappingEditor.js'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, TimeSeries, _, mappingDefaults, mappingEditor, _createClass, Feature;

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
    }, function (_mappingDefaultsJs) {
      mappingDefaults = _mappingDefaultsJs.mappingDefaults;
    }, function (_mappingEditorJs) {
      mappingEditor = _mappingEditorJs.mappingEditor;
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
          _.defaults(this.panelController.panel, mappingDefaults);

          this.panelController.events.on('init-edit-mode', this.onInitEditMode.bind(this));
          this.panelController.events.on('data-received', this.onDataReceived.bind(this));
          this.panelController.events.on('refresh', this.onRefresh.bind(this));
        }

        _createClass(Feature, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.panelController.addEditorTab('Mapping', mappingEditor(this.$scope), 2);
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {
            this.mapData();
            this.panelController.render();
          }
        }, {
          key: 'onRefresh',
          value: function onRefresh() {
            this.mapData();
            this.panelController.render();
          }
        }, {
          key: 'mapData',
          value: function mapData() {
            if (this.panelController.panel.data.processingOnGoing == true) {
              window.setTimeout(onDataReceived, 100); /* this checks the flag every 100 milliseconds*/
            } else {
              this.panel.mappedData = [];

              if (this.panelController.panel.mapping.mapByAlias == true) {
                for (var i in this.panel.targets) {
                  var _correspondance = this.panel.targets[i];
                  _correspondance.series = _correspondance.refId + "-series";
                  var index = this.panel.data.map(function (s) {
                    return s['metric'];
                  }).indexOf(_correspondance.series);

                  if (index != -1) {
                    var t = {};
                    t['identificador'] = _correspondance.alias;
                    t['valor'] = this.panel.data[index]['value'];
                    this.panel.mappedData.push(t);
                  }
                }
              } else {
                for (var i in this.panel.valueMaps) {
                  var correspondance = this.panel.valueMaps[i];
                  var _index = this.panel.data.map(function (s) {
                    return s['metric'];
                  }).indexOf(correspondance.metric);

                  if (_index != -1) {
                    var _t = {};
                    _t['identificador'] = correspondance.target;
                    _t['valor'] = this.panel.data[_index]['value'];
                    this.panel.mappedData.push(_t);
                  }
                }
              }
            }
          }
        }]);

        return Feature;
      }();

      _export('default', Feature);
    }
  };
});
//# sourceMappingURL=mappingController.js.map
