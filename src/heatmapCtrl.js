import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import { panelDefaults } from './panelDefaults.js';

import RenderFeature from './features/render/renderController.js';
import PanelActionsFeature from './features/panelActions/panelActionsController.js';
import DataProcessingFeature from './features/dataProcessing/dataProcessingController.js'

export class HeatmapController extends MetricsPanelCtrl{
    constructor( $scope, $injector){
        super( $scope, $injector);
        _.defaultsDeep( this.panel, panelDefaults);
        this.panel.panelDivId = 'heatmap-'+this.$scope.$id;

        console.info('Loading Features v9...');
        this.dataProcessingFeature = new DataProcessingFeature( this.$scope);
        this.panelActionsFeature = new PanelActionsFeature( this.$scope);
        this.renderFeature = new RenderFeature( this.$scope);
        console.info('Feature loading complete');

        this.refresh();
        this.render();
    }
}

HeatmapController.templateUrl = 'partials/module.html';
