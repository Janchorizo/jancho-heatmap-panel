export class MappingEditorController {
  constructor( $scope) {
    this.mappingAlias = true;
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }
  removeValueMapping( mapping){
    let index = this.panel.mapping.valueMappings.indexOf( mapping);
    this.panel.mapping.valueMappings.splice( index);
    this.panelCtrl.refresh();
  }

  addValueMapping(){
    this.panel.mapping.valueMappings.push({metric: '', target: '', desc: ''});
  }

  changeMapping( mappingByAlias){
    this.panel.mapping.mapByAlias = mappingByAlias;
    this.panelCtrl.refresh();
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
