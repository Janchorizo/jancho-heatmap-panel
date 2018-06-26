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
The plugin needs a base svg file on top of which to represent data by coloring the
regions of the svg according to the identifiers, the values and color scale specified.

> Now, it is possible to import an svg image directly through the Render editor tab.
> Inserting the URL into the box and clicking in the adyacent import button is everything
> needed to use the image in the plugin.
> _Note that, given that the image is added client-side, it will not appear in the available
> images, as there is not a possibility to store it locally_

Firstly, save the svg resources under the _resources_ folder of the plugin.

![svg location](/img/svgLocation.png)

These svg files should have, for each region desired to be colored, a class attribute
common to all regions which will be used to locate every one of them; and an unique
identifier _(id attribute)_ for each of them, which will be used as an alias in the metrics
tab to associate the data to the regions of the image.

![svg attributes](/img/svgAttributes.png)

Additionally, the name _(without the .svg extension)_ of the resource can be written in
the defaults file of the render feature, so that it can be easily selected from a dropdown menu.

![svg defaults](/img/svgDefaults.png)

In the render editor tab, specify the name of the file from the dropdown menu or manually.
Define too the class attribute that each element to be colored has.

![svg ](/img/svgLoad.png)

Use the identifier in the Alias field of a metric to associate incoming data to that region.

![svg ](/img/svgMetrics.png)

Now, the svg elements will be colored according to the value of statistic applied to data incoming,
and to the alias of the metrics.

![svg ](/img/plugin.png)



## Available editor options
### Render tab
![Render Editor Tab](/img/renderEditorTab.png)
All visually affecting options are groupped in this tab. Currently implemented options are :
* SVG resurce name _excluding the .svg extension_

* URL pointing to an SVG image online, to import it into the plugin

* Class attribute for elements to be updated

* Discrete / Continuous color scale

* Domain and thresholds for the color scales

* Colors to be used for data visualization

* Color to be used for SVG elements without data

* Legend for displaying the alias, value and color for each metric

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
