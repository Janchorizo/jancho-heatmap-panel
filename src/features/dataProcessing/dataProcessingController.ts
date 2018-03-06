import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
//import * as d3 from './libs/d3/build/d3.js' ;

import { dataProcessingDefaults } from "./dataProcessingDefaults.js";
import { dataProcessingEditor } from "./dataProcessingEditor.js";

export default class Feature{
  constructor( $scope){
      this.$scope = $scope;
      this.panelController = $scope.ctrl;
      _.defaults( this.panelController.panel, dataProcessingDefaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      //this.panelController.events.on( 'data-received', this.onDataReceived);
      //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
      //this.panelController.events.on( 'render', this.onRender);
      //this.panelController.events.on( 'refresh', this.onRefresh);

  }

  onInitEditMode(){
      this.panelController.addEditorTab( 'DataProcessing', dataProcessingEditor( this.$scope), 2);
  }
}
