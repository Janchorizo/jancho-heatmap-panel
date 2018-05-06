
/**
 * @alias dataProcessingEditor
 * @classdesc <h2>dataProcessing editor controller</h2>
 * Implementation for a feature editor.<br>
 * Controller for the editor tab of the plugin for this specific feature. <br>
 * <i>It is the controller of the AngularJS component for the editor</i>
 * <br>
 */
export class DataProcessingEditorController {
  /**
   * constructor - description
   *
   * @param  {type} $scope A reference to the plugin's scope for editing panel's variables
   * @return {type}        New instance of DataProcessingEditorController
   * @memberof dataProcessingEditor
   */
  constructor( $scope) {
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
  toggleDescVisibility(){
    this.panel.dataProcessing.showDescription = !this.panel.dataProcessing.showDescription;
  }
}

/**
 * dataProcessingEditor - function exported to be used as the AngularJs component
 *
 * @param  {type} scope A reference to the scope of the plugin to route functions and variables
 * @return AngularJS Component       New dataProcessingEditor
 * @memberof dataProcessingEditor
 */
export function dataProcessingEditor( scope){
  'use strict';
  let pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/dataProcessing/dataProcessingEditor.html';
  return function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: pathToTemplate,
      controller: DataProcessingEditorController,
    };
  };
}
