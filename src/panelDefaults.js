export const panelDefaults = {
    dataType : 'timeseries',
    data : [],      // data values from operating over the received
    mappedData : [], // data to be passed to the render function
    autohr: "x men",
    
    valueMaps: [{metric: 'none', target: 'none', desc: 'One simple mapping example'}],
    mapRoute:'public/plugins/alex-d3-panel/resources/plano.svg',
    discrete_continuous: true,
    colors:['rgb(98, 158, 81)', 'white', 'red'],
    domain: [0, 10, 20],
    thresholds: [33, 75],
    valueStat: 'current',
    valueStatOptions: [
    { value: 'min', text: 'Min' },
    { value: 'max', text: 'Max' },
    { value: 'avg', text: 'Average' },
    { value: 'current', text: 'Current' },
    { value: 'total', text: 'Total' },
    { value: 'name', text: 'Name' },
    { value: 'first', text: 'First' },
    { value: 'delta', text: 'Delta' },
    { value: 'diff', text: 'Difference' },
    { value: 'range', text: 'Range' },
    { value: 'last_time', text: 'Time of last point' },
    ]
};
