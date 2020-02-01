exports = program = require('commander');
exports = logger = require('node-color-log');

var chalk = require('chalk'),
    normal = chalk.blue,
    error = chalk.bold.red,
    warning = chalk.keyword('orange');

program.version('1.0.2');

program
    .option('-d, --debug', 'DEBUG, ERROR, INFO, WARN')
    .option('-f, --filename <string>', 'i.e.filename')
    .option('-l, --directory <string>', 'i.e. directory (priority over file)')
    .option('--no-unique', 'filter duplicate lines ** unimplemented')
    .option('-o, --output', 'timestamped filename')
    .option('-z, --output-directory <string>', '** unimplemented')
    .parse(process.argv);

module.exports = (function displayDebugMessageState() {
    let message = "This is an example logging message.";
    logger.debug(message);
    logger.error(message);
    logger.info(message);
    logger.warn(message);
    logger.log("\n");
})();

if (program.debug) {
    console.log(program.opts());
    console.log('\n');
}

const sort_unique = (program.uniq === false) ? false : true;

switch (program.debug) {
    case 'DEBUG':
        logger.setLevel("debug");
        break;
    case 'ERROR':
        logger.setLevel("error");
        break;
    case 'INFO':
        logger.setLevel("info");
        break;
    case 'WARN':
        logger.setLevel("warn");
        break;
    case 'ALL':
        logger.setLevel("info")
        break;
    default:
        logger.setLevel("info");
        break;
};
