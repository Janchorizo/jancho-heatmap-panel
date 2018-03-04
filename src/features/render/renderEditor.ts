export class RenderEditorController {
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }

  hola(){
    console.info('Qué pasa chavalada');
  }
}

export function renderEditor( scope){
  'use strict';
  let pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/render/renderEditor.html';
  return function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: pathToTemplate,//'public/plugins/jancho-heatmap-panel/features/render/renderEditor.html',
      controller: RenderEditorController,
    };
  };
}
