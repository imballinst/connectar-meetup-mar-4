// jest.config.js
module.exports = {
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
};
