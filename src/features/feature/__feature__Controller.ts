import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
//import * as d3 from './libs/d3/build/d3.js' ;

import { __feature__Defaults } from "./__feature__Defaults.js";
import { __feature__Editor } from "./__feature__Editor.js";

export default class Feature{
  constructor( $scope){
      this.$scope = $scope;
      this.panelController = $scope.ctrl;
      _.defaults( this.panelController.panel, __feature__Defaults);

      this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      //this.panelController.events.on( 'data-received', this.onDataReceived);
      //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
      //this.panelController.events.on( 'render', this.onRender);
      //this.panelController.events.on( 'refresh', this.onRefresh);

  }

  onInitEditMode(){
      this.panelController.addEditorTab( '__Feature__', __feature__Editor( this.$scope), 2);
  }
}
