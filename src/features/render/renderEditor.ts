import * as d3 from '../../libs/d3/build/d3.js' ;

export class RenderEditorController {
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = this.panelCtrl.panel;
  }

  hola(){
    console.info('Qué pasa chavalada');
  }

  invertirColores(){
    let temp = this.panel.render.colors[0];
    this.panel.render.colors[0] = this.panel.render.colors[2];
    this.panel.render.colors[2] = temp;
    this.panelCtrl.render();
  }

  actualizarMapa(){
    let target = this.panel.panelDivId;
    let dir = this.panel.render.baseMapRoute + this.panel.render.mapRoute;

    d3.xml( dir).mimeType( "image/svg+xml").get( function( error, xml){
      if( error){ throw( error);}
      let div = document.getElementById( target);
      div.removeChild(div.childNodes[0]);
      div.appendChild(xml.documentElement);
    });
    this.panelCtrl.render();
  }

  actualizarColores(){
    if(this.panel.render.discrete_continuous == true){
      this.panelCtrl.renderFeature.scaleColor = (function( value){
        if( value <= this.panel.render.thresholds[0]){
          return( this.panel.render.colors[0]);
        }else if( value <= this.panel.render.thresholds[1]){
          return( this.panel.render.colors[1]);
        }else{
          return( this.panel.render.colors[2]);
        }
      });
    }else{
      this.panelCtrl.renderFeature.scaleColor =  d3.scaleLinear()
        .domain( this.panel.render.domain)
        .range( this.panel.render.colors);
    }
    this.panelCtrl.render();
  }

  cambiarColor(){
    console.log( 'Color cambiado para el plugin');
    this.panelCtrl.render();
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
