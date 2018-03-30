'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', '../../libs/d3/build/d3.js', './renderDefaults.js', './renderEditor.js'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, TimeSeries, _, d3, renderDefaults, renderEditor, _createClass, Feature;

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
    }, function (_libsD3BuildD3Js) {
      d3 = _libsD3BuildD3Js;
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
          this.panel = this.panelController.panel;
          _.defaults(this.panelController.panel, renderDefaults);

          this.panelController.events.on('init-edit-mode', this.onInitEditMode.bind(this));
          //this.panelController.events.on( 'data-received', this.onDataReceived);
          this.panelController.events.on('panel-initialized', this.onPanelInitialized.bind(this));
          this.panelController.events.on('render', this.onRender.bind(this));
          //this.panelController.events.on( 'refresh', this.onRefresh);
          console.log('hola, feature iniciada');
        }

        _createClass(Feature, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.panelController.addEditorTab('Render', renderEditor(this.$scope), 2);
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            console.info('renderizando sala ...');
            this.renderSala('#' + this.panel.panelDivId, this.panel.mappedData);
            console.info('renderizado completado');
          }
        }, {
          key: 'onPanelInitialized',
          value: function onPanelInitialized() {
            this.actualizarColores();
            this.cargarPlano(this.panel.panelDivId, this.panel.render.baseMapRoute + this.panel.render.mapRoute);
            this.panelController.render();
          }
        }, {
          key: 'actualizarColores',
          value: function actualizarColores() {
            if (this.panel.render.discrete_continuous == true) {
              this.scaleColor = function (value) {
                if (value <= this.panel.render.thresholds[0]) {
                  return this.panel.render.colors[0];
                } else if (value <= this.panel.render.thresholds[1]) {
                  return this.panel.render.colors[1];
                } else {
                  return this.panel.render.colors[2];
                }
              };
            } else {
              this.scaleColor = d3.scaleLinear().domain(this.panel.render.domain).range(this.panel.render.colors);
            }
          }
        }, {
          key: 'cargarPlano',
          value: function cargarPlano(target, dir) {
            // target => class name
            console.log("rendering on " + target);
            console.log(document.getElementById(target));
            d3.xml(dir).mimeType("image/svg+xml").get(function (error, xml) {
              if (error) {
                throw error;
              }
              var div = document.getElementById(target);
              div.removeChild(div.childNodes[0]);
              div.appendChild(xml.documentElement);
            });
          }
        }, {
          key: 'renderSala',
          value: function renderSala(target, data) {
            console.log('Fase 1 ...');
            //Binding
            var salas = d3.select(target + ' svg').selectAll('rect').data(data, function (d) {
              return d ? d.identificador : this.id;
            });

            console.log('Fase 1 update ...');
            //Update
            var t = d3.transition().duration(750).ease(d3.easeLinear);

            salas.transition(t).style('fill', $.proxy(function (d) {
              return this.scaleColor(d.valor);
            }, this));

            console.log('Fase 2 ...');
            var salas = d3.select(target + ' svg').selectAll('path').data(data, function (d) {
              return d ? d.identificador : this.id;
            });

            console.log('Fase 2 update...');
            //Update
            var t = d3.transition().duration(750).ease(d3.easeLinear);

            salas.transition(t).style('fill', $.proxy(function (d) {
              return this.scaleColor(d.valor);
            }, this));
          }
        }]);

        return Feature;
      }();

      _export('default', Feature);
    }
  };
});
//# sourceMappingURL=renderController.js.map
