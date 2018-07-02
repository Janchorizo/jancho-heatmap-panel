import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import * as d3 from '../../libs/d3/build/d3.js' ;

import { renderDefaults } from "./renderDefaults.js";
import { renderEditor } from "./renderEditor.js";

/**
 * @alias renderFeature
 * @classdesc <h2>render feature</h2>
 * Implementation for a feature.<br>
 * Makes use of the mediator pattern in order to subscribe the feature to
 * the plugin's event, through the $scope reference which is passed to it.
 * <br>
 * <br><h3>Functionaliy<h3><br>
 * This feature is responsible for representing data values in an svg, including <br>
 * the load of the svg in the DOM.
 * <i>Subscribed events</i>
 * <ul>
 *   <li>init-edit-mode</li>
 *   <li>panel-initialized</li>
 *   <li>render</li>
 * </ul>
 * @requires D3.js
 */
export default class Feature{
  /**
   * constructor - description <br>
   * Important the use of _.cloneDeep to ensure that no two instances of the same plugin
   * share references of the same variables.
   *
   * @param  {type} $scope A reference to the plugin's scope for the subscription to events
   * @return {type}        New instance of Feature
   */
  constructor( $scope){
      this.$scope = $scope;
      this.panelController = $scope.ctrl;
      this.panel = this.panelController.panel;

      const defaults = _.cloneDeep(renderDefaults)
      _.defaults( this.panelController.panel, defaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      //this.panelController.events.on( 'data-received', this.onDataReceived);
      this.panelController.events.on( 'panel-initialized', this.onPanelInitialized.bind(this));
      this.panelController.events.on( 'render', this.onRender.bind(this));
      this.panelController.events.on( 'panel-size-changed', this.onSizeChange.bind(this));
      //this.panelController.events.on( 'refresh', this.onRefresh);
      console.log(this.panelController);
  }

  /**
   * onInitEditMode - Handler for the event : init-edit-mode<br>
   *
   * @memberof renderFeature
   */
  onInitEditMode(){
    this.panelController.addEditorTab( 'Render', renderEditor( this.$scope), 2);
  }

  /**
   * onRender - Handler for the event : render<br>
   * Requires of an element containing the svg to update based on the data
   * @memberof renderFeature
   */
  onRender(){
    this.renderSala( '#'+this.panel.panelDivId, this.panel.data);
  }

  onSizeChange(a){
  //console.log('size has changed', a);
  }

  /**
   * onPanelInitialized - Handler for the event : panel-initialized <br>
   * Renders the svg and data for the first time. Including :
   * <ol>
   * <li>Create a first instance of the color scale</li>
   * <li>Load and append it to the specified element by the panelDivId identyfier</li>
   * <li>Create an event for rendering the data over the svg</li>
   * </ol>
   *
   * @memberof renderFeature
   */
  onPanelInitialized(){
    this.actualizarColores();
    this.cargarPlano( this.panel.panelDivId, this.panel.render.baseMapRoute + this.panel.render.mapRoute + ".svg");
    this.panelController.render();
  }

  /**
   * actualizarColores - Changes the instance of color scale to be used by D3.<br><br>
   * For discrete representation (fixed number of colors) an ad-hoc function is done.<br>
   * For continous representation (range of colors) a D3.js scale function is used, based on <br>
   * domain and color selected.
   *
   * @memberof renderFeature
   */
  actualizarColores(){
    if(this.panel.render.discrete_continuous == true){
      this.scaleColor = (function( value){
        if( value <= this.panel.render.thresholds[0]){
          return( this.panel.render.colors[0]);
        }else if( value <= this.panel.render.thresholds[1]){
          return( this.panel.render.colors[1]);
        }else{
          return( this.panel.render.colors[2]);
        }
      });
    }else{
      this.scaleColor =  d3.scaleLinear()
        .domain( this.panel.render.domain)
        .range( this.panel.render.colors);
    }
    this.panelController.render();
  }

  /**
   * cargarPlano - Loads the svg resource into the DOM, hanging from the<br>
   * element specified by the elementIdentifyer id attribute.
   *
   * @param  {type} target id attribute
   * @param  {type} dir    svg resource url from where it is served
   * @memberof renderFeature
   */
  cargarPlano( target, dir){
    // target => id name
    if(this.panel.render.source.local === true)
        this.cargarPlanoLocal( target, dir)
    else if(this.panel.render.source.remote === true)
        this.cargarPlanoRemoto( target, this.panel.render.mapUrl)
    this.panelController.render();
  }

  cargarPlanoLocal( target, dir){
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
        console.log('al reves')
    });
  }

  cargarPlanoRemoto( target, dir){
    window.fetch(dir)
    .then((response) => response.text())
    .then(svg => {
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
    });
  }
  /**
   * renderSala - Renders data on the svg resource <br>
   * Color applied to each element specified is provided by the function loaded in scaleColor.
   *
   * @param  {type} target DOM element from which it hangs the svg
   * @param  {type} data   TimeSeries processed data, in the form of pairs [metric, value]
   * @memberof renderFeature
   */
  renderSala (target, data){
    var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

    //ClearOutput
    var t = d3.select(target+' svg').selectAll( '.'+this.panel.render.elementIdentifyer).style( 'fill', this.panel.render.unknownDataColor);

    //Binding
    var salas = d3.select(target+' svg').selectAll( '.'+this.panel.render.elementIdentifyer)

    .data(data, function(d){ return d ? d.metric : this.id; });
    //Update
    salas
      .transition(t)
      .style('fill', $.proxy( function(d){ return this.scaleColor( d.value)}, this));

    var legend = d3.select('div#'+this.panel.panelDivId).select('div.legend').selectAll('div.legendElement')
      .data(data, d=>d.metric);

    d3.select('div#'+this.panel.panelDivId).select('div.legend')
      .style('display',(this.panel.render.legend===true)?'block':'none');

    legend
      .exit()
        .remove();

    legend
      .enter()
        .append('div')
        .attr('class', 'legendElement')
        .style('display','flex')
        .each(function(){
          d3.select(this).append('p');
          d3.select(this).append('div');
        });

    legend.selectAll('div')
        .style('width','0.8em')
        .style('height','0.8em')
        .style('border-radius','50%')
        .style('margin', '0.3em 0.7em')
        .style('background-color', $.proxy( function(d){ return this.scaleColor( d.value)}, this));
    legend.selectAll('p')
      .style('margin',0)
      .style('display','inline-block')
      .html(function(d){
        return(d.metric+' ( '+d.value+' )')});

  }
}
