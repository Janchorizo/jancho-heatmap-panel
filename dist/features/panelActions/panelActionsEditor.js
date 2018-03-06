'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, PanelActionsEditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function panelActionsEditor(scope) {
    'use strict';

    var pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/panelActions/panelActionsEditor.html';
    return function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: pathToTemplate,
        controller: PanelActionsEditorController
      };
    };
  }

  _export('panelActionsEditor', panelActionsEditor);

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

      _export('PanelActionsEditorController', PanelActionsEditorController = function () {
        function PanelActionsEditorController($scope) {
          _classCallCheck(this, PanelActionsEditorController);

          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
        }

        _createClass(PanelActionsEditorController, [{
          key: 'hola',
          value: function hola() {
            console.info('Qué pasa panelActions');
          }
        }]);

        return PanelActionsEditorController;
      }());

      _export('PanelActionsEditorController', PanelActionsEditorController);
    }
  };
});
//# sourceMappingURL=panelActionsEditor.js.map
