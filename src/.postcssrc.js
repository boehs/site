module.exports = {
    plugins: [
        require('postcss-csso')({
            restructure: true
        }),
        require('postcss-variable-compress')
    ]
};