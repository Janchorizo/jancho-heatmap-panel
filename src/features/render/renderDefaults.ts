export const renderDefaults = {
  render : {
    feature: 'render',
    desc: 'rendering SVG map',
    baseMapRoute: 'public/plugins/jancho-heatmap-panel/resources/',
    elementIdentifyer:'sala',
    unknownDataColor: 'white',
    availableMaps: ['plano', 'brain'],
    mapRoute: 'plano',
    mapUrl: '',
    legend:true,
    discrete_continuous: true,
    colors: ['rgb(98, 158, 81)', 'rgb(31, 29, 29)', 'red'],
    domain: [0, 10, 20],
    thresholds: [7.5, 15],
  },
};
