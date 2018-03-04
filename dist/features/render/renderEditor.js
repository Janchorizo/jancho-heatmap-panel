'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, RenderEditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function renderEditor(scope) {
    'use strict';

    var pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/render/renderEditor.html';
    return function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: pathToTemplate, //'public/plugins/jancho-heatmap-panel/features/render/renderEditor.html',
        controller: RenderEditorController
      };
    };
  }

  _export('renderEditor', renderEditor);

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

      _export('RenderEditorController', RenderEditorController = function () {
        function RenderEditorController($scope) {
          _classCallCheck(this, RenderEditorController);

          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
        }

        _createClass(RenderEditorController, [{
          key: 'hola',
          value: function hola() {
            console.info('Qué pasa chavalada');
          }
        }]);

        return RenderEditorController;
      }());

      _export('RenderEditorController', RenderEditorController);
    }
  };
});
//# sourceMappingURL=renderEditor.js.map
