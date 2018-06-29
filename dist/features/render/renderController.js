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
        /**
         * constructor - description <br>
         * Important the use of _.cloneDeep to ensure that no two instances of the same plugin
         * share references of the same variables.
         *
         * @param  {type} $scope A reference to the plugin's scope for the subscription to events
         * @return {type}        New instance of Feature
         */
        function Feature($scope) {
          _classCallCheck(this, Feature);

          this.$scope = $scope;
          this.panelController = $scope.ctrl;
          this.panel = this.panelController.panel;

          var defaults = _.cloneDeep(renderDefaults);
          _.defaults(this.panelController.panel, defaults);

          this.panelController.events.on('init-edit-mode', this.onInitEditMode.bind(this));
          //this.panelController.events.on( 'data-received', this.onDataReceived);
          this.panelController.events.on('panel-initialized', this.onPanelInitialized.bind(this));
          this.panelController.events.on('render', this.onRender.bind(this));
          //this.panelController.events.on( 'refresh', this.onRefresh);
        }

        /**
         * onInitEditMode - Handler for the event : init-edit-mode<br>
         *
         * @memberof renderFeature
         */


        _createClass(Feature, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.panelController.addEditorTab('Render', renderEditor(this.$scope), 2);
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            this.renderSala('#' + this.panel.panelDivId, this.panel.data);
          }
        }, {
          key: 'onPanelInitialized',
          value: function onPanelInitialized() {
            this.actualizarColores();
            this.cargarPlano(this.panel.panelDivId, this.panel.render.baseMapRoute + this.panel.render.mapRoute + ".svg");
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
            // target => id name
            if (this.panel.render.source.local === true) this.cargarPlanoLocal(target, dir);else if (this.panel.render.source.remote === true) this.cargarPlanoRemoto(target, this.panel.render.mapUrl);
          }
        }, {
          key: 'cargarPlanoLocal',
          value: function cargarPlanoLocal(target, dir) {
            d3.xml(dir).mimeType("image/svg+xml").get(function (error, xml) {
              if (error) {
                throw error;
              }
              var div = document.getElementById(target);
              if (div != null) {
                div.removeChild(div.childNodes[0]);
                div.appendChild(xml.documentElement);
              }
            });
          }
        }, {
          key: 'cargarPlanoRemoto',
          value: function cargarPlanoRemoto(target, dir) {
            var _this = this;

            window.fetch(dir).then(function (response) {
              return response.text();
            }).then(function (svg) {
              console.info('loading svg');
              var div = document.getElementById(target);

              while (div.hasChildNodes()) {
                div.removeChild(div.firstChild);
              }
              div.insertAdjacentHTML("afterbegin", svg);
              _this.panelCtrl.render();
            });
          }
        }, {
          key: 'renderSala',
          value: function renderSala(target, data) {
            var t = d3.transition().duration(750).ease(d3.easeLinear);

            //ClearOutput
            var t = d3.select(target + ' svg').selectAll('.' + this.panel.render.elementIdentifyer).style('fill', this.panel.render.unknownDataColor);

            //Binding
            var salas = d3.select(target + ' svg').selectAll('.' + this.panel.render.elementIdentifyer).data(data, function (d) {
              return d ? d.metric : this.id;
            });
            //Update
            salas.transition(t).style('fill', $.proxy(function (d) {
              return this.scaleColor(d.value);
            }, this));

            var legend = d3.select('div#' + this.panel.panelDivId).select('div.legend').selectAll('div.legendElement').data(data, function (d) {
              return d.metric;
            });

            d3.select('div#' + this.panel.panelDivId).select('div.legend').style('display', this.panel.render.legend === true ? 'block' : 'none');

            legend.exit().remove();

            legend.enter().append('div').attr('class', 'legendElement').style('display', 'flex').each(function () {
              d3.select(this).append('p');
              d3.select(this).append('div');
            });

            legend.selectAll('div').style('width', '0.8em').style('height', '0.8em').style('border-radius', '50%').style('margin', '0.3em 0.7em').style('background-color', $.proxy(function (d) {
              return this.scaleColor(d.value);
            }, this));
            legend.selectAll('p').style('margin', 0).style('display', 'inline-block').html(function (d) {
              console.log(d);
              return d.metric + ' ( ' + d.value + ' )';
            });
          }
        }]);

        return Feature;
      }();

      _export('default', Feature);
    }
  };
});
//# sourceMappingURL=renderController.js.map
