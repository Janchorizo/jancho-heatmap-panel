'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, DataProcessingEditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * dataProcessingEditor - function exported to be used as the AngularJs component
   *
   * @param  {type} scope A reference to the scope of the plugin to route functions and variables
   * @return AngularJS Component       New dataProcessingEditor
   * @memberof dataProcessingEditor
   */
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
        /**
         * constructor - description
         *
         * @param  {type} $scope A reference to the plugin's scope for editing panel's variables
         * @return {type}        New instance of DataProcessingEditorController
         * @memberof dataProcessingEditor
         */
        function DataProcessingEditorController($scope) {
          _classCallCheck(this, DataProcessingEditorController);

          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = this.panelCtrl.panel;
        }

        /**
         * toggleDescVisibility - handler for an editor tab event <br>
         * Toggles the state of <i>showDescription</i> variable to display or not <br>
         * the descriptions for the data mapping options.
         *
         * @memberof dataProcessingEditor
         */


        _createClass(DataProcessingEditorController, [{
          key: 'toggleDescVisibility',
          value: function toggleDescVisibility() {
            this.panel.dataProcessing.showDescription = !this.panel.dataProcessing.showDescription;
          }
        }]);

        return DataProcessingEditorController;
      }());

      _export('DataProcessingEditorController', DataProcessingEditorController);
    }
  };
});
//# sourceMappingURL=dataProcessingEditor.js.map
