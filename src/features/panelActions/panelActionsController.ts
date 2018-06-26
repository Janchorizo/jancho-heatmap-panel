import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import _ from 'lodash';
import * as d3 from '../.././libs/d3/build/d3.js' ;

import { panelActionsDefaults } from "./panelActionsDefaults.js";
import { panelActionsEditor } from "./panelActionsEditor.js";

/**
 * @alias panelActionsFeature
 * @classdesc <h2>panelActions feature</h2>
 * Implementación de una funcionalidad<br>
 * Mediante el patrón mediador, se suscribe a los eventos del plugin a través
 * de la referencia al $scope que se le pasa.
 * <br>
 * <br><h3>Funcionalidad</h3>
 * Proporciona funcionalidad añadida para el menú contextual del panel<br>
 * <br><h3>Eventos suscritos</h3>
 * ninguno
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
      _.defaults( this.panelController.panel, panelActionsDefaults);

      //this.panelController.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
      //this.panelController.events.on( 'data-received', this.onDataReceived);
      //this.panelController.events.on( 'panel-initialized', this.onPanelInitialized);
      this.panelController.events.on( 'render', this.onRender);
      //this.panelController.events.on( 'refresh', this.onRefresh);
      this.panelController.events.on('init-panel-actions', this.onInitPanelActions.bind(this));

  }

  onInitPanelActions(actions) {
    actions.push({text: 'Toggle legend', click: 'ctrl.panelEvent()'});
  }
  //onInitEditMode(){
  //    this.panelController.addEditorTab( 'PanelActions', panelActionsEditor( this.$scope), 2);
  //}
  panelEvent(){


  }

  onRender(){

  }
}
