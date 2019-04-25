'use strict';

/** @type Egg.EggPlugin */
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.swaggerdoc = {
  enable: true,
  package: 'egg-swagger-doc',
};
exports.helper = {
  enable: true,
  package: 'egg-helper',
};
exports.security = {
  xframe: {
    enable: false,
  },
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
