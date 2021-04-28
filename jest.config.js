module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.tsx'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    '\\.svg': 'svgr/webpack',
    '^common(.*)$': '<rootDir>/src/common$1',
  },

  // An array of absolute paths to additional locations to search when resolving modules
  modulePaths: ['<rootDir>', '<rootDir>/src/'],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['node_modules'],

  setupFiles: ['<rootDir>/src/__mocks__/jest.mocks.ts'],

  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
