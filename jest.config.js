module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.tsx'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // An array of absolute paths to additional locations to search when resolving modules
  modulePaths: ['<rootDir>', '<rootDir>/src/'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules'],

  setupFiles: ['<rootDir>/enzyme.config.js'],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing.
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
};
