import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';

import { dataProcessingDefaults } from "./dataProcessingDefaults.js";
import { dataProcessingEditor } from "./dataProcessingEditor.js";

/**
 * @alias dataProcessingFeature
 * @classdesc <h2>dataProcessing feature</h2>
 * Implementación de una funcionalidad
 * Mediante el patrón mediador, se suscribe a los eventos del plugin a través
 * de la referencia al $scope que se le pasa.
 * <br>
 * <br><h3>Funcionalidad</h3>
 * Trata todos los datos provenientes de series temporales, los pasa a una estructura manejable
 * y aplica la estadística elegida.<br>
 * <br><h3>Eventos suscritos</h3>
 * <ul>
 *  <li>init-edit-mode</li>
 *  <li>data-received</li>
 *  <li>refresh</li>
 * </ul>
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

      const defaults = _.cloneDeep(dataProcessingDefaults);
      _.defaults( this.panelController.panel, defaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      this.panelController.events.on( 'data-received', this.onDataReceived.bind(this));
      //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
      this.panelController.events.on( 'refresh', this.onRefresh.bind(this));
  }

  /**
   * onInitEditMode - Handler para el evento de init-edit-mode
   *
   * @memberof dataProcessingFeature
   */
  onInitEditMode(){
      this.panelController.addEditorTab( 'DataProcessing', dataProcessingEditor( this.$scope), 2);
  }

  /**
   * onDataReceived - description
   *
   * @param  {type} dataList description
   * @memberof dataProcessingFeature
   */
  onDataReceived( dataList){
    if( dataList.length > 0){
      this.panel.rawData = dataList;
      let data = dataList.map( this.seriesHandler.bind( this));
      this.panel.data = [];
      this.panel.data = data.map( this.mapSeriesToValue.bind( this));
    }else{ return;}
    this.panelController.render();
  }

  /**
   * onRefresh - description
   *
   * @memberof dataProcessingFeature
   */
  onRefresh(){
    if( this.panel.rawData.length > 0){
      let data = this.panel.rawData.map( this.seriesHandler.bind( this));
      this.panel.data = data.map( this.mapSeriesToValue.bind( this));
    }else{ return;}
    this.panelController.render();
  }

  /**
   * seriesHandler - Extrae una estrctura más simple del dataList que proporciona Grafana.
   *
   * @param  {type} dataList Estructura original que proporciona Grafana
   * @return {TimeSeries}          Estructura simplificada para las métricas suministradas
   * @memberof dataProcessingFeature
   */
  seriesHandler( dataList){
      //tratar nulos
      let series = new TimeSeries({
          datapoints: dataList.datapoints,
          alias: dataList.target
      });
      return( series);
  }

  /**
   * mapSeriesToValue - Transforma una serie temporal a un objeto
   * con el alias de la métrica, y el valor asociado (según la estadística elegida).
   *
   * @param  {Timeseries} timeseries receives a timeseries object containing all values registered for
   * a metric.
   * @return {Object}            Object containing both the alias, and the value for a metric
   * @memberof dataProcessingFeature
   */
  mapSeriesToValue( timeseries){
        let value = {};
        value['metric'] = timeseries.id;
        const elements = timeseries.datapoints.map(function(s){ return( s[0]);});

        switch( this.panel.dataProcessing.valueStat){
            case 'min':
                value['value'] = Math.min( ...elements);
            break;
            case 'max':
                value['value'] = Math.max( ...elements);
            break;
            case 'avg':
                value['value'] = elements.reduce( (a,b)=>a+b, 0) / timeseries.datapoints.length
            break;
            case 'current':
                value['value'] = elements[ timeseries.datapoints.length -1];
            break;
            case 'total':;
                value['value'] = elements.reduce( (a,b)=>a+b, 0);
            break;
            case 'first':
                value['value'] = elements[0];
            break;
            case 'diff':
                const pairs = _.map( elements, (a,b,c)=>{ return (b< c.length -1)?([a, c[b+1]]):([0,0]); });
                const differences = _.map( pairs, (a)=>{return Math.abs(a[0]-a[1]);});
                value['value'] =_.max( differences);
            break;
            case 'range':
                value['value'] = _.max(elements) - _.min(elements);
            break;
            case 'last_time':
                value['value'] = timeseries.datapoints[ timeseries.datapoints.length -1][1];
            break;
        }
        return( value);
    }
}
