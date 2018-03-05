export class __Feature__EditorController {
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }

  hola(){
    console.info('Qué pasa chavalada');
  }
}

export function __feature__Editor( scope){
  'use strict';
  let pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/__feature__/__Feature__Editor.html';
  return function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: pathToTemplate,
      controller: __Feature__EditorController,
    };
  };
}
