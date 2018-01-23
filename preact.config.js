const webpack = require('webpack');
const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

export default (config, env, helpers) => {
	// Disabled CSS modules
	let styles = helpers.getLoadersByName(config, 'css-loader');
	styles[0].loader.options.modules = false;

	config.plugins.push(
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
			DEBUG: false,
			API_URL: 'http://localhost:5000/onlinestore-2e046/us-central1/api/',
			GA: ''
		})
	);

	if (env.isProd) {
		config.plugins.push(
			// new CriticalPlugin({
			//   src: "index.html",
			//   inline: true,
			//   minify: true,
			//   dest: "index.html"
			// })
			new StyleExtHtmlWebpackPlugin()
		);
	}
};
