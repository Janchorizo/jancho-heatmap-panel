'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, MappingEditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function mappingEditor(scope) {
    'use strict';

    var pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/mapping/mappingEditor.html';
    return function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: pathToTemplate,
        controller: MappingEditorController
      };
    };
  }

  _export('mappingEditor', mappingEditor);

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

      _export('MappingEditorController', MappingEditorController = function () {
        function MappingEditorController($scope) {
          _classCallCheck(this, MappingEditorController);

          this.mappingAlias = true;
          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
        }

        _createClass(MappingEditorController, [{
          key: 'removeValueMapping',
          value: function removeValueMapping(mapping) {
            var index = this.panel.mapping.valueMappings.indexOf(mapping);
            this.panel.mapping.valueMappings.remove(index, 1);
            this.panelCtrl.refresh();
          }
        }, {
          key: 'addValueMapping',
          value: function addValueMapping() {
            this.panel.mapping.valueMappings.push({ metric: '', target: '', desc: '' });
          }
        }, {
          key: 'changeMapping',
          value: function changeMapping(mappingByAlias) {
            this.panel.mapping.mapByAlias = mappingByAlias;
            this.panelCtrl.refresh();
          }
        }, {
          key: 'hola',
          value: function hola() {
            console.info('Qué pasa mappingEditor');
          }
        }]);

        return MappingEditorController;
      }());

      _export('MappingEditorController', MappingEditorController);
    }
  };
});
//# sourceMappingURL=mappingEditor.js.map
