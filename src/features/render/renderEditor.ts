import * as d3 from '../../libs/d3/build/d3.js' ;

/**
 * @alias renderEditor
 * @classdesc <h2>render editor controller</h2>
 * Implementation for a feature editor.<br>
 * Controller for the editor tab of the plugin for this specific feature. <br>
 * <i>It is the controller of the AngularJS component for the editor</i>
 * <br>
 * @requires D3.js
 */
export class RenderEditorController {

  /**
   * constructor - description
   *
   * @param  {type} $scope A reference to the plugin's scope for editing panel's variables
   * @return {type}        New instance of RenderEditorController
   * @memberof renderEditor
   */
  constructor( $scope) {
    $scope.editor = this;
    this.panelCtrl = $scope.ctrl;
    this.panel = $scope.ctrl.panel;
  }

  /**
   * invertirColores - handler for an editor tab event <br>
   * Reverts the order of the colors applied on the scale.
   *
   * @memberof renderEditor
   */
  invertirColores(){
    let temp = this.panel.render.colors[0];
    this.panel.render.colors[0] = this.panel.render.colors[2];
    this.panel.render.colors[2] = temp;
    if(this.panel.render.discrete_continuous != true){
      this.actualizarColores();
    }
    this.panelCtrl.render();
  }

  /**
   * actualizarMapa - handler for an editor tab event <br>
   * Loads the svg resource on the DOM, after flushing the older one.<br>
   * It is follwed by a render event call.
   *
   * @memberof renderEditor
   */
  actualizarMapa(){
    let target = this.panel.panelDivId;
    let dir = this.panel.render.baseMapRoute + this.panel.render.mapRoute + ".svg";

    d3.xml( dir).mimeType( "image/svg+xml").get( function( error, xml){
      if( error){ throw( error);}
      let root = document.getElementById(target);
      let div = root.getElementsByClassName('image')[0]
      while (div.hasChildNodes()) {  
        div.removeChild(div.firstChild);
      } 
      div.appendChild(xml.documentElement);
        const h = (d3.select('div#'+target+' div.image svg').style('height').split('px')[0])*1.1;
        const w = (d3.select('div#'+target+' div.image svg').style('width').split('px')[0])*1.1;
          d3.select('div#'+target+' div.image svg')
            .attr('width','100%')
            .attr('height','100%')
            .attr('viewBox', '0 0 '+w+' '+h)
            .attr('preserveAspectRatio', 'xMinYMin meet');
    });
    this.panelCtrl.render();
  }

  /**
   * importarMapa - handler for an editor tab event <br>
   * Loads the svg resource on the DOM, after flushing the older one, and
   * retrieving the svg from the url given.<br>
   * It is follwed by a render event call.
   *
   * @memberof renderEditor
   */
  importarMapa(){

    window.fetch(this.panel.render.mapUrl)
    .then((response) => response.text())
    .then(svg => {
        let target = this.panel.panelDivId;
          let root = document.getElementById(target);
          let div = root.getElementsByClassName('image')[0]

        while (div.hasChildNodes()) {  
            div.removeChild(div.firstChild);
        } 
        div.insertAdjacentHTML("afterbegin", svg);
        const h = (d3.select('div#'+target+' div.image svg').style('height').split('px')[0])*1.1;
        const w = (d3.select('div#'+target+' div.image svg').style('width').split('px')[0])*1.1;
          d3.select('div#'+target+' div.image svg')
            .attr('width','100%')
            .attr('height','100%')
            .attr('viewBox', '0 0 '+w+' '+h)
            .attr('preserveAspectRatio', 'xMinYMin meet');
            this.panelCtrl.render();
    });
  }

  cambiarFuente(){
    if(this.panel.render.source.local === true){
        this.panel.render.source.remote = false;
        this.actualizarMapa();
    }else if(this.panel.render.source.local === false){
        this.panel.render.source.remote = true;
        this.importarMapa();
    }
  }

  /**
   * actualizarColores - handler for an editor tab event <br>
   * Changes the instance of color scale to be used by D3.<br>
   * For discrete representation (fixed number of colors) an ad-hoc function is done.<br>
   * For continous representation (range of colors) a D3.js scale function is used, based on <br>
   * domain and color selected.
   *
   * @memberof renderEditor
   */
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
}

/**
 * renderEditor - function exported to be used as the AngularJs component
 *
 * @param  {type} scope A reference to the scope of the plugin to route functions and variables
 * @return AngularJS Component       New renderEditor
 * @memberof renderEditor
 */
export function renderEditor( scope){
  'use strict';
  let pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/render/renderEditor.html';
  return function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: pathToTemplate,
      controller: RenderEditorController,
    };
  };
}
