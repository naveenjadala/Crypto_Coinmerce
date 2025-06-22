module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx,ts,tsx}', 
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/types.ts', 
    '!src/constants/**',
    '!src/assets/**',
    '!src/navigation/**',
  ],
 coveragePathIgnorePatterns: [
   '/node_modules/',
   '/android/',
   '/ios/'
 ]
};
