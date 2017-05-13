module.exports = {
    context: __dirname + '/private/app',
    entry: './client.js',
    output: {
        filename: 'client.js',
        path: __dirname + '/public/js/',
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015', 'react']
            }
        }],
    },
}
