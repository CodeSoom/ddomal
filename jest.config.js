module.exports = {
  setupFiles: [
    'jest-plugin-context/setup',
  ],
  setupFilesAfterEnv: [
    './jest.setup',
    'given2/setup',
  ],
};
