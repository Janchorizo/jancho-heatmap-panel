import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';

import { dataProcessingDefaults } from "./dataProcessingDefaults.js";
//import { dataProcessingEditor } from "./dataProcessingEditor.js";

export default class Feature{
  constructor( $scope){
      this.$scope = $scope;
      this.panelController = $scope.ctrl;
      this.panel = this.panelController.panel;
      _.defaults( this.panelController.panel, dataProcessingDefaults);

      //this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      this.panelController.events.on( 'data-received', this.onDataReceived.bind(this));
      //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
      this.panelController.events.on( 'refresh', this.onRefresh.bind(this));

  }

  onInitEditMode(){
      this.panelController.addEditorTab( 'DataProcessing', dataProcessingEditor( this.$scope), 2);
  }

  onDataReceived( dataList){
    if( dataList.length > 0){
      this.panel.rawData = dataList;
      this.panel.dataProcessing.processingOnGoing = true;

      let data = dataList.map( this.seriesHandler.bind( this));
      this.panel.data = data.map( this.mapSeriesToValue.bind( this));

      this.panel.dataProcessing.processingOnGoing = false;
    }else{ return;}
  }

  onRefresh(){
    if( this.panel.rawData.length > 0){
      this.panel.dataProcessing.processingOnGoing = true;

      let data = this.panel.rawData.map( this.seriesHandler.bind( this));
      this.panel.data = data.map( this.mapSeriesToValue.bind( this));

      this.panel.dataProcessing.processingOnGoing = false;
    }else{ return;}
  }

  seriesHandler( dataList){
        //tratar nulos
        let series = new TimeSeries({
            datapoints: dataList.datapoints,
            alias: dataList.target
        });
        return( series);
    }

  mapSeriesToValue( timeseries){
        let value = {};
        value['metric'] = timeseries.id;
        switch( this.panel.valueStat){
            case 'min':
                value['value'] = Math.min( ...timeseries.datapoints.map(function(s){ return( s[0]);}));
            break;
            case 'max':
                value['value'] = Math.max( ...timeseries.datapoints.map(function(s){ return( s[0]);}));
            break;
            case 'avg':
                value['value'] = timeseries.datapoints.map(function(s){ return( s[0]);})
                                            .reduce( (a,b)=>a+b, 0) / timeseries.datapoints.length
            break;
            case 'current':
                value['value'] = timeseries.datapoints[ timeseries.datapoints.length -1][0];
            break;
            case 'total':
                value['value'] = timeseries.datapoints.map(function(s){ return( s[0]);}).reduce( (a,b)=>a+b, 0);
            break;
            case 'name':

            break;
            case 'first':
                value['value'] = timeseries.datapoints[0][0];
            break;
            case 'delta':

            break;
            case 'diff':

            break;
            case 'range':

            break;
            case 'last_time':

            break;
        }
        return( value);
    }
}
