export const renderDefaults = {
  render : {
    feature: 'render',
    desc: 'rendering SVG map',
    baseMapRoute: 'public/plugins/jancho-heatmap-panel/resources/',
    mapRoute: 'plano.svg',
    discrete_continuous: false,
    colors: ['rgb(98, 158, 81)', 'rgb(31, 29, 29)', 'red'],
    //colors:['rgb(98, 158, 81)', 'white', 'red'],
    domain: [0, 10, 20],
    thresholds: [33, 75],
  },
};
