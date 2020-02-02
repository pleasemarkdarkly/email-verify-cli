program = require('commander');
logger = require('node-color-log');

var chalk = require('chalk'),
    normal = chalk.blue,
    error = chalk.bold.red,
    warning = chalk.keyword('orange');

var walkPath = '.',
    sqlite = false;

program.version('1.0.4');

program
    .option('-d, --debug', 'DEBUG, ERROR, INFO, WARN')
    .option('--sqlite', 'search for emails..')
    .option('-b --db-name <string>', 'specify custom db name, overiding emails.db')
    .option('-f, --filename <string>', 'i.e.filename')
    .option('-l, --directory <string>', 'i.e. directory (priority over file)')
    .option('-o, --output', 'timestamped filename')
    .option('-z, --output-directory <string>', '** unimplemented')
    .parse(process.argv);

if (program.debug) {
    console.log(program.opts());
    console.log('\n');
}

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
    sqlite = true;
    logger.info('db: mode enabled (' + sqlite + ')');

    if (program.dbName) {
        db_name = program.dbName;
        logger.info('db (filename) (' + program.dbName.toString() + ')');
    } else {
        db_name = email_db = "email.db"
        logger.info('db (filename default): ' + email_db);
    }

    if (program.directory) {
        walkPath = program.directory;
        logger.info('db scan dir: (' + walkPath + ')');
    } else {
        walkPath = '.';
    }
};

module.exports = {
    walkPath: walkPath,
    sqlite: sqlite,
    dbName: db_name,
    program_version: program.version
}