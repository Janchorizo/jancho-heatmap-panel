import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import * as d3 from './libs/d3/build/d3.js' ;

import { panelDefaults } from "./panelDefaults.js";

import renderFeature from './features/render/renderController.js';

export class HeatmapController extends MetricsPanelCtrl{
    constructor( $scope, $injector){
        super( $scope, $injector);
        _.defaults( this.panel, panelDefaults);
        this.panel.thresholds = panelDefaults.thresholds;

        this.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on( 'data-received', this.onDataReceived.bind(this));
        this.events.on( 'panel-initialized', this.onPanelInitialized.bind(this));
        this.events.on( 'render', this.onRender.bind(this));
        this.events.on( 'refresh', this.onRefresh.bind(this));

        this.renderFeature = new renderFeature( this.$scope);
    }

    // Grafana event controllers
    onPanelInitialized(){

    }

    onInitEditMode(){
    }

    onDataReceived( dataList){
    }

    onRender(){

    }
    onRefresh(){
    }

    onColorChange( index){

    }

}

HeatmapController.templateUrl = 'partials/module.html';
