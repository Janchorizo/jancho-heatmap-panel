export class DataProcessingEditorController {
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }

  toggleDescVisibility(){
    this.panel.dataProcessing.showDescription = !this.panel.dataProcessing.showDescription;
  }
}

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
