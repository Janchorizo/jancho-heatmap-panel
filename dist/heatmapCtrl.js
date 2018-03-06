'use strict';

System.register(['app/plugins/sdk', 'lodash', './features/render/renderController.js', './features/mapping/mappingController.js', './features/panelActions/panelActionsController.js', './features/dataProcessing/dataProcessingController.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, RenderFeature, MappingFeature, PanelActionsFeature, DataProcessingFeature, HeatmapController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_featuresRenderRenderControllerJs) {
            RenderFeature = _featuresRenderRenderControllerJs.default;
        }, function (_featuresMappingMappingControllerJs) {
            MappingFeature = _featuresMappingMappingControllerJs.default;
        }, function (_featuresPanelActionsPanelActionsControllerJs) {
            PanelActionsFeature = _featuresPanelActionsPanelActionsControllerJs.default;
        }, function (_featuresDataProcessingDataProcessingControllerJs) {
            DataProcessingFeature = _featuresDataProcessingDataProcessingControllerJs.default;
        }],
        execute: function () {
            _export('HeatmapController', HeatmapController = function (_MetricsPanelCtrl) {
                _inherits(HeatmapController, _MetricsPanelCtrl);

                function HeatmapController($scope, $injector) {
                    _classCallCheck(this, HeatmapController);

                    var _this = _possibleConstructorReturn(this, (HeatmapController.__proto__ || Object.getPrototypeOf(HeatmapController)).call(this, $scope, $injector));

                    _this.dataProcessingFeature = new DataProcessingFeature(_this.$scope);
                    _this.mappingFeature = new MappingFeature(_this.$scope);
                    _this.panelActionsFeature = new PanelActionsFeature(_this.$scope);
                    _this.renderFeature = new RenderFeature(_this.$scope);
                    return _this;
                }

                return HeatmapController;
            }(MetricsPanelCtrl));

            _export('HeatmapController', HeatmapController);

            HeatmapController.templateUrl = 'partials/module.html';
        }
    };
});
//# sourceMappingURL=heatmapCtrl.js.map
