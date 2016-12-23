module.exports = function override(config, env) {
  config.node.dgram = 'empty';
  return config;
}
