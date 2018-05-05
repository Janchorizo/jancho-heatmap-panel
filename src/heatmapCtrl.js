import {MetricsPanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';

import { panelDefaults } from './panelDefaults.js';

import RenderFeature from './features/render/renderController.js';
import PanelActionsFeature from './features/panelActions/panelActionsController.js';
import DataProcessingFeature from './features/dataProcessing/dataProcessingController.js'


/**
 * HeatmapController - Clase HeatmapController
 * <br>
 * Implementa el patrón de cadena de responsabilidades, y como mediador para
 * los eventos del plugin. <br><br>
 *
 * A cada instancia de nueva funcionalidad, se le pasa el $scope e $injector,
 * para poder suscribirse a los eventos que recibe el plugin.
 * El plugin no implementa funcionalidad, ni control. Cada instancia de nueva
 * funcionalidad es responsable de implementar aquello que requiera.
 * <br><br>
 * Actualmente se instancian :
 * - dataProcessing
 * - render
 * - panelActions
 */
export class HeatmapController extends MetricsPanelCtrl{

    /**
     * constructor - Constructor para HeatmapController
     * <br>
     * Instancia cada una de las funcionalidades registradas.
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
