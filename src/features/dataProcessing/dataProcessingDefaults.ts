export const dataProcessingDefaults = {
  dataProcessing : {
    feature: 'dataProcessing',
    desc: 'dataProcessing description',
    valueStat: 'current',
    showDescription: false,
    valueStatOptions: [
      { value: 'min', text: 'Min', desc: 'Minimum value registered in the current data subset.' },
      { value: 'max', text: 'Max', desc: 'Maximum value registered in the current data subset.' },
      { value: 'avg', text: 'Average', desc: 'Average value registered in the current data subset.' },
      { value: 'current', text: 'Current', desc: 'Current value registered in the current data subset.' },
      { value: 'total', text: 'Total', desc: 'Acumulated sum of the values registered in the current data subset.' },
      { value: 'first', text: 'First', desc: 'First value registered in the current data subset.' },
      { value: 'diff', text: 'Difference', desc: 'Greatest difference between two consequent values in the current data subset.' },
      { value: 'range', text: 'Range', desc: 'Difference between the maximum and minimum values of the current data subset' },
      { value: 'last_time', text: 'Time of last point', desc: 'Last time register for the data subset. (Useful to see update time disparities)' },
    ],
  },
};
