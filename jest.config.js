/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ['./jest.setup.js'],

    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform: {
      '\\.(css|less|scss|sass)$': 'jest-transform-stub',
    },
  };
};
