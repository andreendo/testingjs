module.exports = function(config) {
  config.set({
    testRunner: "jest",
    transpilers: [],
    mutate: [
      '**/*.js',
      '!**/*test.js',
      '!stryker.conf.js'
    ],
    reporters: ["clear-text", "progress"],
    packageManager: "npm",
    coverageAnalysis: "off"
  });
};
/**
 * to run stryker, perform this command:
 * 
 * node_modules/.bin/stryker run
 */