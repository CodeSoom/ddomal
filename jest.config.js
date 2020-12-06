module.exports = {
  setupFiles: [
    'jest-plugin-context/setup',
  ],
  setupFilesAfterEnv: [
    './jest.setup',
    'given2/setup',
  ],
  moduleNameMapper: {
    '\\.mp3$': '<rootDir>/__mocks__/fileMock.js',
    '\\.css$': '<rootDir>/__mocks__/fileMock.js',
  },
};
