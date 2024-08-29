const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Change the output path
      webpackConfig.output.path = path.resolve(__dirname, 'dist');

      // Update the public path
      webpackConfig.output.publicPath = '/';

      // Update the file-loader to use the new dist directory
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      if (oneOfRule) {
        const fileLoaderRule = oneOfRule.oneOf.find(rule => rule.loader && rule.loader.includes('file-loader'));
        if (fileLoaderRule) {
          fileLoaderRule.options.name = 'static/media/[name].[hash:8].[ext]';
        }
      }

      // Enable source maps
      webpackConfig.devtool = 'source-map';

      return webpackConfig;
    }
  },
  paths: (paths) => {
    // Update all references to the 'build' directory
    paths.appBuild = path.resolve(__dirname, 'dist');
    paths.publicUrlOrPath = '/';
    return paths;
  }
};
