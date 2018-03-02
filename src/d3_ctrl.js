import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series2';
import moment from 'moment';
import _ from 'lodash';
import * as d3 from './libs/d3/build/d3.js' ;

import { panelDefaults } from "./panelDefaults.js";

export class D3Controller extends MetricsPanelCtrl{
    constructor( $scope, $injector){
        super( $scope, $injector);
        _.defaults( this.panel, panelDefaults);
        this.panel.thresholds = panelDefaults.thresholds;
        this.panel.thresholds = panelDefaults.thresholds;


        this.events.on( 'init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on( 'data-received', this.onDataReceived.bind(this));
        this.events.on( 'panel-initialized', this.onPanelInitialized.bind(this));
        this.events.on( 'render', this.onRender.bind(this));
        this.events.on( 'refresh', this.onRefresh.bind(this));

        this.updateScaleColor();

        this.cargarPlano( 'plano', this.panel.mapRoute);
        console.info('This panel');
        console.log(this.panel);
    }

    // Grafana event controllers
    onPanelInitialized(){
    
    }

    onInitEditMode(){
        this.addEditorTab( 'Options', 'public/plugins/alex-d3-panel/partials/optionsEditor.html', 2);
//        this.addEditorTab( 'Value Mappings', 'public/plugins/alex-d3-panel/partials/valueMappingsEditor.html', 2);
        this.addEditorTab( 'Render', 'public/plugins/alex-d3-panel/partials/renderEditor.html', 3);
    }

    onDataReceived( dataList){
        //console.info('onDataReceived');
        if( dataList.length > 0){
            if( dataList[0].type === 'table'){
                console.info('table-received');
                this.panel.dataType = 'table';
                

            }else {//if( dataList[0].type === 'timeseries'){
//                console.info('timeseries-received');
                this.panel.dataType = 'timeseries';
                let data = dataList.map( this.seriesHandler.bind( this));
                this.panel.data = data.map( this.mapSeriesToValue.bind( this));
            }
        }else{ return;}

        this.panel.mappedData = [];
        for( var i in this.panel.valueMaps){
            var correspondance = this.panel.valueMaps[i];
            let index = this.panel.data.map( function(s){return(s['metric']);}).indexOf( correspondance.metric);

            if( index != -1){                
                let t = {};
                t['identificador'] = correspondance.target;
                t['valor'] = this.panel.data[index]['value'];
                this.panel.mappedData.push(t);
            }
        }
//        console.log('Data : ',this.panel.data);
//        console.log('Mapped data : ',this.panel.mappedData);
        this.render();
    }

    onRender(){
        
  //      console.info('onRender');
        this.renderSala( '.plano', this.panel.mappedData);
    }

    onRefresh(){
//        console.info('onRefresh');
//        console.log( this.panel);
    }

    onColorChange( index){
        console.info("onColorChange");
        console.info('panel');
        console.log(this.panel);
        console.info('scnd');
        console.log(this.panel.discrete_continuous + " ths -> "+this.panel.thresholds[0]+" domain -> "+this.panel.domain);

        this.panel.thresholds = this.panel.thresholds.map(a=>parseInt(a));
        this.panel.domain = this.panel.domain.map(a=>parseInt(a));

        this.updateScaleColor();
        this.render();
    }

    // Data manipulation functions
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

    // Rendering functions
    updateScaleColor(){
        if(this.panel.discrete_continuous == true){
            this.scaleColor = (function( value){
                if( value <= this.panel.thresholds[0]){
                    return( this.panel.colors[0]);
                }else if( value <= this.panel.thresholds[1]){
                    return( this.panel.colors[1]);
                }else{
                    return( this.panel.colors[2]);
                }
            });
        }else{
            this.scaleColor =  d3.scaleLinear()
            .domain( this.panel.domain)
            .range( this.panel.colors);
        }
    }

    cargarPlano( target, dir){
        d3.xml( dir).mimeType( "image/svg+xml").get( function( error, xml){
            if( error){ throw( error);}
            document.getElementsByClassName(target)[0].appendChild(xml.documentElement);
        });
    }

    renderSala (target, data){
        //Binding
        var salas = d3.select(target+' svg').selectAll('rect')
            .data(data, function(d){ return d ? d.identificador : this.id; });

        //Update
        var t = d3.transition()
            .duration(750)
            .ease(d3.easeLinear);
        salas
            .transition(t)
                .style('fill', $.proxy( function(d){ return this.scaleColor( d.valor)}, this));

        var salas = d3.select(target+' svg').selectAll('path')
            .data(data, function(d){ return d ? d.identificador : this.id; });

        //Update
        var t = d3.transition()
            .duration(750)
            .ease(d3.easeLinear);
        salas
            .transition(t)
                .style('fill', $.proxy( function(d){ return this.scaleColor( d.valor)}, this));
    }

    // Configuration panels

    removeValueMapping( mapping){
        let index = this.panel.valueMaps.indexOf( mapping);
        this.panel.valueMaps.splice( index);
    }

    addValueMapping(){
        this.panel.valueMaps.push({metric: '', target: '', desc: ''});
    }    
}

D3Controller.templateUrl = 'partials/module.html';
