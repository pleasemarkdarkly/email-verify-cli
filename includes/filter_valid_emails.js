exports = lineByLine = require('n-readlines');
exports = EmailValidator = require('email-deep-validator');
exports = jetpack = require('fs-jetpack');

const ora = require('ora');
require('./verify-email-commands');

exports = filter_valid_emails = async function (filename) {
    const liner = new lineByLine(filename.toString());

    let email;
    const yahoo = "yahoo";

    while (line = liner.next()) {
        email = line.toString();

        const spinner = ora().start();
        try {
            const emailValidator = new EmailValidator({ verifyDomain: true, verifyMailbox: true });
            const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);

            if (wellFormed == true && validDomain == true && validMailbox == true) {
                spinner.stop();
                logger.imfo(email);
            } else if (wellFormed == true && validDomain == true && validMailbox == null) {
                if (email.indexOf(yahoo) != -1) {
                    spinner.stop();
                    logger.warn(email);
                }
            } else {
                spinner.stop();
                logger.error(email);
            }
        } catch (error) {
            spinner.stop();
            logger.error("email validator failed");
        }
    };

};
