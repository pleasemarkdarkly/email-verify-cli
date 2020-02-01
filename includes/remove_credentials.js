const replace = require('replace-in-file'),
    ora = require('ora'),
    logger = require('node-color-log');

module.exports.remove_credentials = remove_credentials = async function (filename) {
    logger.warn("removing [;:]: " + filename);
    const options = {
        files: filename,
        from: /[:;](.*)/g,
        to: ''
    };

    const spinner = ora().start();

    try {
        const results = await replace(options)
        spinner.stop();
        logger.info('credentials removed successfully', results);
    }
    catch (error) {
        spinner.stop();
        logger.error('credential replacement error', error);
    }
};
