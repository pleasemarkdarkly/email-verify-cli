const lineByLine = require('n-readlines'),
    EmailValidator = require('email-deep-validator'),
    logger = logger = require('node-color-log'),
    ts = require('./timestamp'),
    ora = require('ora'),
    fs = require('fs');

// require('./verify-email-commands');

module.exports.filter_valid_emails = filter_valid_emails = async function (filename) {
    const liner = new lineByLine(filename.toString());
    const yahoo = "yahoo";

    let email, line_count = 0, error_count = 0, warn_count = 0, valid_email_count = 0;
    let new_date = new Date();
    let valid_email_file_output = ts.timestamp(new_date) + '_valid.csv';
    let warning_email_file_output = ts.timestamp(new_date) + '_warning.csv';

    try {
        fs.open(valid_email_file_output, 'w', function (err, file) {
            if (err) throw err;
            logger.info('created csv for (valid) emails: ' + valid_email_file_output.toString());
        });
        fs.appendFile(valid_email_file_output, 'email' + '\n', function (err) {
            if (err) throw err;
        });
    } catch (err) {
        logger.error('csv valid (create, append) error: ' + err);
    }

    try {
        fs.open(warning_email_file_output, 'w', function (err, file) {
            if (err) throw err;
            logger.info('created csv (warning) emails: ' + warning_email_file_output.toString());
        });
        fs.appendFile(warning_email_file_output, 'email' + '\n', function (err) {
            if (err) throw err;
        });
    } catch (err) {
        logger.error('csv warning (create, append) error: ' + err);
    }


    while (line = liner.next()) {
        email = line.toString();
        line_count++;

        const spinner = ora().start();

        try {
            const emailValidator = new EmailValidator({ verifyDomain: true, verifyMailbox: true, timeout: 10000 });
            const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);

            if (wellFormed == true && validDomain == true && validMailbox == true) {
                spinner.stop();
                valid_email_count++;
                logger.info(email);
                try {
                    fs.appendFile(valid_email_file_output, email + ',\n', function (error) {
                        spinner.stop();
                        if (error) {
                            spinner.stop();
                            throw error;
                        }
                    });
                } catch (error) {
                    spinner.stop();
                    logger.error("writing " + email + " (valid) file failed")
                }
            } else if (wellFormed == true && validDomain == true && validMailbox == null) {
                if (email.indexOf(yahoo) != -1) {
                    spinner.stop();
                    warn_count++;
                    logger.warn(email);
                    try {
                        fs.appendFile(warning_email_file_output, email + ',\n', function (error) {
                            spinner.stop();
                            if (error) {
                                spinner.stop();
                                throw error;
                            }
                        });
                    } catch (error) {
                        spinner.stop();
                        logger.error("writing " + email + " (warning) file failed")
                    }
                }
            } else {
                spinner.stop();
                error_count++;
                logger.error(email);
            }
            spinner.stop();
        } catch (error) {
            spinner.stop();
            logger.error("email-deep-validation check failed");
        }
    };

    var stats = fs.statSync(valid_email_file_output);
    var fileSize = stats["size"];
    logger.info('-------------------------------------------------------------');
    logger.info(filename.toString() + " => " + valid_email_file_output);
    logger.info(valid_email_file_output + " statistics: (" + fileSize + " bytes) (" + valid_email_count + " valid) / (" + warn_count + " warning) / (" + error_count + " errors) / (" + line_count + " total)");
    logger.info('-------------------------------------------------------------');

    /*
    try {
        if (fileSize <= 8) fs.unlink(valid_email_file_output, function (error) {
            if (error) {
                throw error;
            }
        });
    } catch {
        logger.error("removing empty files failed")
    }
    */

    stats = fs.statSync(warning_email_file_output);
    fileSize = stats["size"];
    logger.info('-------------------------------------------------------------');
    logger.info(filename.toString() + " => " + warning_email_file_output);
    logger.info(warning_email_file_output + " statistics: (" + fileSize + " bytes) (" + valid_email_count + " valid) / (" + warn_count + " warning) / (" + error_count + " errors) / (" + line_count + " total)");
    logger.info('-------------------------------------------------------------');

    /*
    try {
        if (fileSize <= 8) fs.unlink(warning_email_file_output, function (error) {
            if (error) {
                throw error;
            }
        });
    } catch {
        logger.error("removing empty files failed")
    }
    */
};
