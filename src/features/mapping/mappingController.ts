import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
//import * as d3 from './libs/d3/build/d3.js' ;

import { mappingDefaults } from "./mappingDefaults.js";
import { mappingEditor } from "./mappingEditor.js";

export default class Feature{
  constructor( $scope){
      console.log('mapping object doing');
      this.$scope = $scope;
      this.panelController = $scope.ctrl;
      this.panel = this.panelController.panel;
      _.defaults( this.panelController.panel, mappingDefaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      this.panelController.events.on( 'data-received', this.onDataReceived.bind(this));
      this.panelController.events.on( 'refresh', this.onRefresh.bind(this));

      console.log('mapping object done');
  }

  onInitEditMode(){
      this.panelController.addEditorTab( 'Mapping', mappingEditor( this.$scope), 2);
  }

  onDataReceived( dataList){
    console.log('Mapping controller onDataReceived');
    this.mapData();
    this.panelController.render();
  }

  onRefresh( ){
    console.log('dataProcessing controller refresh');
    this.mapData();
    this.panelController.render();
  }

  mapData(){
    if(this.panelController.panel.data.processingOnGoing == true) {
       window.setTimeout(onDataReceived, 100); /* this checks the flag every 100 milliseconds*/
    } else {
      console.info('Mapping data ...');
      this.panel.mappedData = [];

      if(this.panelController.panel.mapping.mapByAlias == true){
        console.log('Mapping by alias');
        for( var i in this.panel.targets){
          let correspondance = this.panel.targets[i];
          correspondance.series = correspondance.refId+"-series";
          let index = this.panel.data.map( function(s){return(s['metric']);}).indexOf( correspondance.series);

          if( index != -1){
            let t = {};
            t['identificador'] = correspondance.alias;
            t['valor'] = this.panel.data[index]['value'];
            this.panel.mappedData.push(t);
            console.log('added ' + t.identificador + " " + t.valor);
          }
        }
      }else{
        console.log('Mapping by values');
        for( var i in this.panel.valueMaps){
          var correspondance = this.panel.valueMaps[i];
          let index = this.panel.data.map( function(s){return(s['metric']);}).indexOf( correspondance.metric);

          if( index != -1){
            let t = {};
            t['identificador'] = correspondance.target;
            t['valor'] = this.panel.data[index]['value'];
            this.panel.mappedData.push(t);
            console.log('added ' + t.identificador + " " + t.valor);
          }
        }
      }
    }
  }
}
