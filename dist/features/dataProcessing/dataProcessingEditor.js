'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, DataProcessingEditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function dataProcessingEditor(scope) {
    'use strict';

    var pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/dataProcessing/dataProcessingEditor.html';
    return function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: pathToTemplate,
        controller: DataProcessingEditorController
      };
    };
  }

  _export('dataProcessingEditor', dataProcessingEditor);

  return {
    setters: [],
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

      _export('DataProcessingEditorController', DataProcessingEditorController = function () {
        function DataProcessingEditorController($scope) {
          _classCallCheck(this, DataProcessingEditorController);

          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
        }

        _createClass(DataProcessingEditorController, [{
          key: 'changeValueStat',
          value: function changeValueStat(value) {
            this.panel.dataProcessing.valueStat = value;
            this.panelCtrl.refresh();
          }
        }, {
          key: 'hola',
          value: function hola() {
            console.info('Qué pasa dataProcessingggggg');
          }
        }]);

        return DataProcessingEditorController;
      }());

      _export('DataProcessingEditorController', DataProcessingEditorController);
    }
  };
});
//# sourceMappingURL=dataProcessingEditor.js.map
