"use strict";

System.register(["../../libs/d3/build/d3.js"], function (_export, _context) {
  "use strict";

  var d3, _createClass, RenderEditorController;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * renderEditor - function exported to be used as the AngularJs component
   *
   * @param  {type} scope A reference to the scope of the plugin to route functions and variables
   * @return AngularJS Component       New renderEditor
   * @memberof renderEditor
   */
  function renderEditor(scope) {
    'use strict';

    var pathToTemplate = 'public/plugins/' + scope.ctrl.panel.type + '/features/render/renderEditor.html';
    return function () {
      return {
        restrict: 'E',
        scope: true,
        templateUrl: pathToTemplate,
        controller: RenderEditorController
      };
    };
  }

  _export("renderEditor", renderEditor);

  return {
    setters: [function (_libsD3BuildD3Js) {
      d3 = _libsD3BuildD3Js;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export("RenderEditorController", RenderEditorController = function () {

        /**
         * constructor - description
         *
         * @param  {type} $scope A reference to the plugin's scope for editing panel's variables
         * @return {type}        New instance of RenderEditorController
         * @memberof renderEditor
         */
        function RenderEditorController($scope) {
          _classCallCheck(this, RenderEditorController);

          $scope.editor = this;
          this.panelCtrl = $scope.ctrl;
          this.panel = $scope.ctrl.panel;
        }

        /**
         * invertirColores - handler for an editor tab event <br>
         * Reverts the order of the colors applied on the scale.
         *
         * @memberof renderEditor
         */


        _createClass(RenderEditorController, [{
          key: "invertirColores",
          value: function invertirColores() {
            var temp = this.panel.render.colors[0];
            this.panel.render.colors[0] = this.panel.render.colors[2];
            this.panel.render.colors[2] = temp;
            if (this.panel.render.discrete_continuous != true) {
              this.actualizarColores();
            }
            this.panelCtrl.render();
          }
        }, {
          key: "actualizarMapa",
          value: function actualizarMapa() {
            var target = this.panel.panelDivId;
            var dir = this.panel.render.baseMapRoute + this.panel.render.mapRoute + ".svg";

            d3.xml(dir).mimeType("image/svg+xml").get(function (error, xml) {
              if (error) {
                throw error;
              }
              var root = document.getElementById(target);
              var div = root.getElementsByClassName('image')[0];
              while (div.hasChildNodes()) {
                div.removeChild(div.firstChild);
              }
              div.appendChild(xml.documentElement);
            });
            this.panelCtrl.render();
          }
        }, {
          key: "importarMapa",
          value: function importarMapa() {
            var _this = this;

            window.fetch(this.panel.render.mapUrl).then(function (response) {
              return response.text();
            }).then(function (svg) {
              var target = _this.panel.panelDivId;
              var root = document.getElementById(target);
              var div = root.getElementsByClassName('image')[0];

              while (div.hasChildNodes()) {
                div.removeChild(div.firstChild);
              }
              div.insertAdjacentHTML("afterbegin", svg);
              _this.panelCtrl.render();
            });
          }
        }, {
          key: "cambiarFuente",
          value: function cambiarFuente() {
            if (this.panel.render.source.local === true) {
              this.panel.render.source.remote = false;
              this.actualizarMapa();
            } else if (this.panel.render.source.local === false) {
              this.panel.render.source.remote = true;
              this.importarMapa();
            }
          }
        }, {
          key: "actualizarColores",
          value: function actualizarColores() {
            if (this.panel.render.discrete_continuous == true) {
              this.panelCtrl.renderFeature.scaleColor = function (value) {
                if (value <= this.panel.render.thresholds[0]) {
                  return this.panel.render.colors[0];
                } else if (value <= this.panel.render.thresholds[1]) {
                  return this.panel.render.colors[1];
                } else {
                  return this.panel.render.colors[2];
                }
              };
            } else {
              this.panelCtrl.renderFeature.scaleColor = d3.scaleLinear().domain(this.panel.render.domain).range(this.panel.render.colors);
            }
            this.panelCtrl.render();
          }
        }]);

        return RenderEditorController;
      }());

      _export("RenderEditorController", RenderEditorController);
    }
  };
});
//# sourceMappingURL=renderEditor.js.map
