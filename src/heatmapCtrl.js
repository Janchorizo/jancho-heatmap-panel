import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import { panelDefaults } from './panelDefaults.js';

import RenderFeature from './features/render/renderController.js';
import PanelActionsFeature from './features/panelActions/panelActionsController.js';
import DataProcessingFeature from './features/dataProcessing/dataProcessingController.js'


/**
 * HeatmapController - Class HeatmapController
 * <br>
 * Implements the responsabilities pattern, and acts as mediator for the plugin's
 * events. <br><br>
 * The $scope and $injector of this parent class is passed to each new instance
 * of a feature to make it posible for the feature to subscribe to Grafana events.
 * <br><br>
 * The class does not implement any kind of functionality, nor control. Each new
 * instance of a feature is responsible of implementing any of it, and should not
 * make assumptions about the existance of other plugins; otherwise should be
 * specified. <br><br>
 * Actually, the following features: <br>
 * <ul>
 *  <li>dataProcessing</li>
 *  <li>render</li>
 *  <li>panelActions</li>
 * </ul>
 */
export class HeatmapController extends MetricsPanelCtrl{

    /**
     * constructor - Constructor for HeatmapController
     * <br>
     * Instances each one of the registered features.
     *
     * @param  {type} $scope    description
     * @param  {type} $injector description
     * @return {type}           New panel plugin controller
     */
    constructor( $scope, $injector){
        super( $scope, $injector);
        const defaults = _.cloneDeep(panelDefaults);
        this.panel = _.defaultsDeep( this.panel, defaults);
        this.panel.panelDivId = 'heatmap-'+this.$scope.$id;

        console.info('Loading Features for v1.0...');
        this.dataProcessingFeature = new DataProcessingFeature( this.$scope);
        this.panelActionsFeature = new PanelActionsFeature( this.$scope);
        this.renderFeature = new RenderFeature( this.$scope);

        this.refresh();
        this.render();
    }
}

HeatmapController.templateUrl = 'partials/module.html';
