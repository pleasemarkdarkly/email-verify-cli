exports = lineByLine = require('n-readlines');
exports = EmailValidator = require('email-deep-validator');
exports = jetpack = require('fs-jetpack');

const ora = require('ora');
const fs = require('fs');

require('./verify-email-commands');

exports = filter_valid_emails = async function (filename) {
    const liner = new lineByLine(filename.toString());
    const yahoo = "yahoo";

    let email, line_count = 0, error_count = 0, valid_email_count = 0;
    let valid_email_file_output = timestamp(new Date()) + '.csv';

    try {
        fs.open(valid_email_file_output, 'w', function (err, file) {
            if (err) throw err;
            logger.info('created csv valid emails: ' + valid_email_file_output.toString());
        });
        fs.appendFile(valid_email_file_output, 'email' + '\n', function (err) {
            if (err) throw err;
        });
    } catch (err) {
        logger.error('csv create, append error: ' + err);
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
                    logger.error("writing valid email to file failed")
                }
                valid_email_count++;
                logger.info(email);
            } else if (wellFormed == true && validDomain == true && validMailbox == null) {
                if (email.indexOf(yahoo) != -1) {
                    spinner.stop();
                    error_count++;
                    logger.warn(email);
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
};

/**
logger.info(filename.toString() + " : " + valid_email_file_output + " (" + valid_email_count + "/" + error_count + "/" + line_count + ")");

    var stats = fs.statSync(valid_email_file_output);
    var fileSize = stats["size"];
    if (fileSize < 8) {
        fs.unlink(valid_email_file_output)
        logger.warning("removing csv: " + valid_email_file_output + " (" + fileSize + ") size");
    };
     */