# Heatmap Generator
Heatmap generator panel plugin for Grafana
This plugin allows for the creation of configurable heatmaps from
SVG figures with class and id tags to identify elements to fill.
Documentation for the actual implementation of the plugin [can be found here](https://janchorizo.github.io/jancho-heatmap-panel/).

## Example of use case
Already with an static SVG image representing some model of the data provided
by some timeseries, and would like to represent such data (or a specific statistic
  from it) on the image.

This is a common use case for the heatmap generator. Just adding an arbitrary class
to all svg elements whished to be updated- differenciating between them through an id
selector and

## How to use

![svg location](/img/svgLocation.png)

![svg ](/img/svgAttributes.png)

![svg ](/img/svgLoad.png)

![svg ](/img/svgMetrics.png)

![svg ](/img/plugin.png)

## Available editor options
### Render tab
![Render Editor Tab](/img/renderEditorTab.png)
All visually affecting options are groupped in this tab. Currently implemented options are :
* SVG resurce name _excluding the .svg extension_

* Class attribute for elements to be updated

* Discrete / Continuous color scale

* Domain and thresholds for the color scales

* Colors to be used for data visualization

* Color to be used for SVG elements without data
### DataProcessing tab
![Data Processing Editor Tab](/img/dataProcessingEditorTab.png)
Refered to the the manipulation of incomming data, it is possible
to select a statistic to be applied to each of the metrics.

The following are supported :

* Min
    Minimum value registered in the current data subset.
* Max
    Maximum value registered in the current data subset.
* Average
    Average value registered in the current data subset.
* Current
    Current value registered in the current data subset.
* Total
    Acumulated sum of the values registered in the current data subset.
* First
    First value registered in the current data subset.
* Difference
    Greatest difference between two consequent values in the current data subset.
* Range
    Difference between the maximum and minimum values of the current data subset
* Time of last point
    Last time register for the data subset. (Useful to see update time disparities)


### Known Issues

### Changelog
