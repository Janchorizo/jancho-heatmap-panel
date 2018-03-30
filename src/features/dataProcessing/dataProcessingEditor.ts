export class DataProcessingEditorController {
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }

  changeValueStat( value){
    this.panel.dataProcessing.valueStat = value;
    this.panelCtrl.refresh();
  }

  hola(){
    console.info('Qué pasa dataProcessingggggg');
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
