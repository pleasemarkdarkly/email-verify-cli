program = require('commander');
logger = require('node-color-log');

var chalk = require('chalk'),
    normal = chalk.blue,
    error = chalk.bold.red,
    warning = chalk.keyword('orange');

exports = sqlite = false;

program.version('1.0.4');

program
    .option('-d, --debug', 'DEBUG, ERROR, INFO, WARN')
    .option('--sqlite', 'search for emails..')
    .option('-b --db_name', 'specify db name')
    .option('-f, --filename <string>', 'i.e.filename')
    .option('-l, --directory <string>', 'i.e. directory (priority over file)')
    .option('-o, --output', 'timestamped filename')
    .option('-z, --output-directory <string>', '** unimplemented')
    .parse(process.argv);

if (program.debug) {
    console.log(program.opts());
    console.log('\n');
}

var email_db = "email.db";
if (program.db_name) {
    email_db = program_db_name;
}
module.exports.email_db = email_db;

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

module.exports = (function displayDebugMessageState() {
    let message = "This is an example logging message.";
    logger.debug(message);
    logger.error(message);
    logger.info(message);
    logger.warn(message);
    logger.log("\n");
})();

if (program.sqlite) {
    logger.info("running in db mode");
    sqlite = true;
    require('./email_dao');
};
