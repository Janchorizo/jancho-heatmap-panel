'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, __Feature__EditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function __feature__Editor(scope) {
    'use strict';

    var pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/__feature__/__Feature__Editor.html';
    return function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: pathToTemplate,
        controller: __Feature__EditorController
      };
    };
  }

  _export('__feature__Editor', __feature__Editor);

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

      _export('__Feature__EditorController', __Feature__EditorController = function () {
        function __Feature__EditorController($scope) {
          _classCallCheck(this, __Feature__EditorController);

          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
        }

        _createClass(__Feature__EditorController, [{
          key: 'hola',
          value: function hola() {
            console.info('Qué pasa chavalada');
          }
        }]);

        return __Feature__EditorController;
      }());

      _export('__Feature__EditorController', __Feature__EditorController);
    }
  };
});
//# sourceMappingURL=renderEditor.js.map
