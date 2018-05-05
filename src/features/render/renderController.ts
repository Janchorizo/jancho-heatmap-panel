import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import * as d3 from '../../libs/d3/build/d3.js' ;

import { renderDefaults } from "./renderDefaults.js";
import { renderEditor } from "./renderEditor.js";

/**
 * @alias renderFeature
 * @classdesc <h2>render feature</h2>
 * Implementación de una funcionalidad
 * Mediante el patrón mediador, se suscribe a los eventos del plugin a través
 * de la referencia al $scope que se le pasa.
 * <br>
 * <br><h3>Funcionalidad</h3>
 * Implementa toda la representación visual del panel. Tanto la carga del SVG,
 * como la actualización del mismo a partir de los datos del plugin.<br>
 * <br><h3>Eventos suscritos</h3>
 * <ul>
 *  <li>init-edit-mode</li>
 *  <li>panel-initialized</li>
 *  <li>render</li>
 * </ul>
 * @requires D3.js
 */
export default class Feature{
  /**
   * constructor - description
   *
   * @param  {type} $scope Es el contexto del plugin que se pasa para poder suscribirse
   * a los eventos.
   * @return {type}        Nueva instancia de un Feature
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
      //this.panelController.events.on( 'refresh', this.onRefresh);
  }

  /**
   * onInitEditMode - Handler para el evento de init-edit-mode
   *
   * @memberof renderFeature
   */
  onInitEditMode(){
    this.panelController.addEditorTab( 'Render', renderEditor( this.$scope), 2);
  }

  /**
   * onRender - Handler para el evento de render
   *
   * @memberof renderFeature
   */
  onRender(){
    this.renderSala( '#'+this.panel.panelDivId, this.panel.data);
  }

  /**
   * onPanelInitialized - Handler para el evento panel-initialized
   *
   * @memberof renderFeature
   */
  onPanelInitialized(){
    this.actualizarColores();
    this.cargarPlano( this.panel.panelDivId, this.panel.render.baseMapRoute + this.panel.render.mapRoute);
    this.panelController.render();
  }

  /**
   * actualizarColores - Cambio de la función proporcionada para la escala de color <br><br>
   * Para la representación de valores discretos se construye una función ad-hoc.<br>
   * Para la representación de valores contínua se obtiene una escala de la librería D3.js.
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
  }

  /**
   * cargarPlano - Carga el plano svg en el elemento indicado
   *
   * @param  {type} target Id del elemento div en el que cargar el plano
   * @param  {type} dir    Dirección al fichero SVG
   * @memberof renderFeature
   */
  cargarPlano( target, dir){
    // target => class name
    d3.xml( dir).mimeType( "image/svg+xml").get( function( error, xml){
      if( error){ throw( error);}
      let div = document.getElementById(target);
      if(div != null){
        div.removeChild(div.childNodes[0]);
        div.appendChild(xml.documentElement);
      }
    });
  }

  /**
   * renderSala - Actualiza los colores de la figura SVG <br>
   * El color aplicado a cada sala lo proporciona la función scaleColor, que se suministra
   * mediante inyección de dependencias, y se actualiza en
   *
   * @param  {type} target Elemento del DOM del que cuelga el elemento svg
   * @param  {type} data   TimeSeries del que obtener los valores para el mapa de calor
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
  }
}
