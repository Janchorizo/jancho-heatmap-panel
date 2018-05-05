'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var DataProcessingEditorController;

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
      _export('DataProcessingEditorController', DataProcessingEditorController = function DataProcessingEditorController($scope) {
        _classCallCheck(this, DataProcessingEditorController);

        $scope.editor = this;
        this.panelCtrl = $scope.ctrl;
        this.panel = this.panelCtrl.panel;
      });

      _export('DataProcessingEditorController', DataProcessingEditorController);
    }
  };
});
//# sourceMappingURL=dataProcessingEditor.js.map
