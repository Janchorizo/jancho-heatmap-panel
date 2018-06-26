'use strict';

System.register(['app/plugins/sdk', 'app/core/time_series2', 'lodash', '../.././libs/d3/build/d3.js', './panelActionsDefaults.js', './panelActionsEditor.js'], function (_export, _context) {
  "use strict";

  var MetricsPanelCtrl, TimeSeries, _, d3, panelActionsDefaults, panelActionsEditor, _createClass, Feature;

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
    }, function (_panelActionsDefaultsJs) {
      panelActionsDefaults = _panelActionsDefaultsJs.panelActionsDefaults;
    }, function (_panelActionsEditorJs) {
      panelActionsEditor = _panelActionsEditorJs.panelActionsEditor;
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
         * constructor - description
         *
         * @param  {type} $scope Es el contexto del plugin que se pasa para poder suscribirse
         * a los eventos.
         * @return {type}        Nueva instancia de un Feature
         */
        function Feature($scope) {
          _classCallCheck(this, Feature);

          this.$scope = $scope;
          this.panelController = $scope.ctrl;
          _.defaults(this.panelController.panel, panelActionsDefaults);

          //this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
          //this.panelController.events.on( 'data-received', this.onDataReceived);
          //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
          this.panelController.events.on('render', this.onRender);
          //this.panelController.events.on( 'refresh', this.onRefresh);
          this.panelController.events.on('init-panel-actions', this.onInitPanelActions.bind(this));
        }

        _createClass(Feature, [{
          key: 'onInitPanelActions',
          value: function onInitPanelActions(actions) {
            actions.push({ text: 'Toggle legend', click: 'ctrl.panelEvent()' });
          }
        }, {
          key: 'panelEvent',
          value: function panelEvent() {}
        }, {
          key: 'onRender',
          value: function onRender() {}
        }]);

        return Feature;
      }();

      _export('default', Feature);
    }
  };
});
//# sourceMappingURL=panelActionsController.js.map
