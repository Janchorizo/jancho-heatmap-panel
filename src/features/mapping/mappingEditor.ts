export class MappingEditorController {
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }
  removeValueMapping( mapping){
    let index = this.panel.valueMaps.indexOf( mapping);
    this.panel.valueMaps.splice( index);
  }

  addValueMapping(){
    this.panel.valueMaps.push({metric: '', target: '', desc: ''});
  }
  hola(){
    console.info('Qué pasa mappingEditor');
  }
}

export function mappingEditor( scope){
  'use strict';
  let pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/mapping/mappingEditor.html';
  return function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: pathToTemplate,
      controller: MappingEditorController,
    };
  };
}
