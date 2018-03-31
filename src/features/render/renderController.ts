import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import * as d3 from '../../libs/d3/build/d3.js' ;

import { renderDefaults } from "./renderDefaults.js";
import { renderEditor } from "./renderEditor.js";

export default class Feature{
  constructor( $scope){
      this.$scope = $scope;
      this.panelController = $scope.ctrl;
      this.panel = this.panelController.panel;
      _.defaults( this.panelController.panel, renderDefaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      //this.panelController.events.on( 'data-received', this.onDataReceived);
      this.panelController.events.on( 'panel-initialized', this.onPanelInitialized.bind(this));
      this.panelController.events.on( 'render', this.onRender.bind(this));
      //this.panelController.events.on( 'refresh', this.onRefresh);
  }

  onInitEditMode(){
    this.panelController.addEditorTab( 'Render', renderEditor( this.$scope), 2);
  }

  onRender(){
    console.info('renderizando sala ...');
    this.renderSala( '#'+this.panel.panelDivId, this.panel.data);
    console.info('renderizado completado');
  }

  onPanelInitialized(){
    this.actualizarColores();
    this.cargarPlano( this.panel.panelDivId, this.panel.render.baseMapRoute + this.panel.render.mapRoute);
    this.panelController.render();
  }

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
   * @return {type}        No tiene valor de retorno
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

  renderSala (target, data){
    var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

    //Binding
    var salas = d3.select(target+' svg').selectAll( this.panel.render.elementIdentifyer)
      .data(data, function(d){ return d ? d.metric : this.id; });

    //Update
    salas
      .style('fill', '#fff');
    salas
      .transition(t)
      .style('fill', $.proxy( function(d){ return this.scaleColor( d.value)}, this));
/*
    //Binding
    var salas = d3.select(target+' svg').selectAll('path')
      .data(data, function(d){ return d ? d.metric : this.id; });

    //Update
    salas
      .transition(t)
      .style('fill', $.proxy( function(d){ return this.scaleColor( d.value)}, this));*/
  }
}
