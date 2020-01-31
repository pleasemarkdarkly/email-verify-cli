const fs = require('fs');
require('./includes/timestamp');

module.exports = () => {
  var commands = require('./includes/verify-email-commands');
  let single_file, directory_path, output_single_file, output_directory_path;

  if (program.filename == undefined && program.directory == undefined) {
    logger.error("verify-emails-cli requires emails from a file and directory to process.");
    logger.log('\n');
    program.help();
    return (-1);
  }

  if (program.filename != undefined) {
    logger.info("program filename: " + program.filename);
    fs.lstat(program.filename, (err, stats) => {
      if (err)
        return logger.error(err);
      if (stats.isFile()) {
        logger.info('-------------------------------------------------------------');
        single_file = program.filename;
        logger.info('filename: ' + single_file);
        require('./includes/remove_credentials');
        remove_credentials(single_file);
        require('./includes/filter_valid_emails');
        filter_valid_emails(single_file);
        logger.info('-------------------------------------------------------------');
      }
    });
  }

  if (program.directory != undefined) {
    logger.info("program directory: " + program.directory);
    fs.lstat(program.directory, (err, stats) => {
      if (err)
        return logger.error(err);
      if (stats.isDirectory()) {
        logger.info("directory is valid.")
        directory_path = program.directory;
        require('./includes/file_looper')
        walk(directory_path, function (error) {
          if (error) {
            throw error;
          } else {
            logger.info('-------------------------------------------------------------');
            logger.info('finished looping through folder: ' + directory_path + '.');
            logger.info('-------------------------------------------------------------');
          }
        });
      }
    });
  }

  if (program.output == undefined && program.outputDirectory == undefined) {
    logger.warn('-------------------------------------------------------------');
    logger.warn('output filename and output directory not defined.');
    logger.warn('default session name: ' + timestamp(new Date()));
    logger.warn('-------------------------------------------------------------');
    logger.log('\n');
  } else {
    if (program.output != undefined) {
      output_single_file = program.output;
      logger.info('-------------------------------------------------------------');
      logger.info('output filename: ' + output_single_file);
      logger.info('-------------------------------------------------------------');
    } else if (program.outputDirectory != undefined) {
      output_directory_path = program.outputDirectory;
      logger.info('-------------------------------------------------------------');
      logger.info('output directory: ' + output_directory_path);
      logger.info('-------------------------------------------------------------');
    }
  }

  return (-1);

  logger.log("\n");
  logger.warn('-------------------------------------------------------------');
  logger.warn("exiting variable state")
  logger.info("single file: " + single_file);
  logger.info("directory path: " + directory_path);
  logger.info("timestamp: " + timestamp(new Date()));
  logger.info("output single file: " + output_single_file);
  logger.info("output directory: " + output_directory_path);
  logger.warn('-------------------------------------------------------------');
};
