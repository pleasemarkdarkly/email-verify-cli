const replace = require('replace-in-file'),
    ora = require('ora');

exports = logger = require('node-color-log');

exports = remove_credentials = async function (filename) {
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

// arr_files[arr_files.length] = filename;