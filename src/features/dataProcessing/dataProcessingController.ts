import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';

import { dataProcessingDefaults } from "./dataProcessingDefaults.js";
import { dataProcessingEditor } from "./dataProcessingEditor.js";

 /**
  * @alias dataProcessingFeature
  * @classdesc <h2>dataProcessingFeature feature</h2>
  * Implementation for a feature.<br>
  * Makes use of the mediator pattern in order to subscribe the feature to
  * the plugin's event, through the $scope reference which is passed to it.
  * <br>
  * <br><h3>Functionaliy<h3>
  * This feature is responsible for managing data from TimeSeries, process it, <br>
  * and applying the specified statistic.
  * <i>Subscribed events</i>
  * <ul>
  *  <li>init-edit-mode</li>
  *  <li>data-received</li>
  *  <li>refresh</li>
  * </ul>
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

      const defaults = _.cloneDeep(dataProcessingDefaults);
      _.defaults( this.panelController.panel, defaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      this.panelController.events.on( 'data-received', this.onDataReceived.bind(this));
      //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
      this.panelController.events.on( 'refresh', this.onRefresh.bind(this));
  }

  /**
   * onInitEditMode - Handler for the event : init-edit-mode<br>
   *
   * @memberof dataProcessingFeature
   */
  onInitEditMode(){
      this.panelController.addEditorTab( 'DataProcessing', dataProcessingEditor( this.$scope), 2);
  }

  /**
   * onDataReceived - Handler for the event : data-received<br>
   * When new data is received, it is converted into a simpler data structure;<br>
   * then the selected statistic is applied to each of the metrics received.
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
   * onRefresh - Handler for the event : refresh<br>
   * When configuration is modified, data is converted into a simpler data structure;<br>
   * then the selected statistic is applied to each of the metrics received.<br>
   * <i>Previous data received, stored in the rawData attribute, is used.</i>
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
   * seriesHandler - Extracts a simpler data structure.<br>
   *
   * @param  {type} dataList Original data structure
   * @return {TimeSeries}          TimeSeries created from the original one
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
   * mapSeriesToValue - Applies statistics to obtain a [metric, value] pair from a TimeSeries.<br>
   *
   * @param  {Timeseries} timeseries receives a timeseries object containing all values registered for
   * a metric.
   * @return {Object}            Object containing both the name and value for a specific metric.
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
