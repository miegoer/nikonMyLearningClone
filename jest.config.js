/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
};