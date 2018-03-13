export const dataProcessingDefaults = {
  dataProcessing : {
    feature: 'dataProcessing',
    desc: 'dataProcessing description',
    processingOnGoing: false,
    valueStat: 'current',
    valueStatOptions: [
      { value: 'min', text: 'Min' },
      { value: 'max', text: 'Max' },
      { value: 'avg', text: 'Average' },
      { value: 'current', text: 'Current' },
      { value: 'total', text: 'Total' },
      { value: 'first', text: 'First' },
      { value: 'diff', text: 'Difference' },
      { value: 'range', text: 'Range' },
      { value: 'last_time', text: 'Time of last point' },
    ],
  },
};
