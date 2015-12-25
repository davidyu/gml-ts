module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'unit/math.js',
      { pattern: '../gml.js', included: true },
      { pattern: 'vendor/gl-matrix.js', included: true },
    ],
    browsers: [ 'Firefox' ],
    singleRun: true
  });
};
