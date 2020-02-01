logger = logger = require('node-color-log');
program = require('./verify-email-commands');

module.exports.walkPath = walkPath = '.',
    fs = require('fs');

const extension = '.txt';
var extension_count = 0;

module.exports.walk = walk = function (dir, done) {
    fs.readdir(dir, function (error, list) {
        if (error) {
            return done(error);
        }
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) {
                return done(null);
            }
            file = dir + '/' + file;
            fs.stat(file, function (error, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (error) {
                        next();
                    });
                } else {
                    if (file.indexOf(extension) !== -1) {
                        extension_count++;
                        logger.warn('-------------------------------------------------------------');
                        if (sqlite) {
                            const scanner_db = require('./email_dao');
                            scanner_db.insert_files(file);

                            /**TODO: 
                             * 
                             * 1. configure walk path as parameter
                             * 2. parameter file saves last scanned file
                             * 3. split credential files
                             * 4. dashboard for status and stastics
                             * 
                             * 
                             */


                        } else if (program.filename) {
                            const rm_creds = require('./remove_credentials');
                            rm_creds.remove_credentials(file);
                            const filter = require('./filter_valid_emails');
                            filter.filter_valid_emails(file);
                        }
                        logger.warn('-------------------------------------------------------------');
                    }
                    next();
                }
            });
        })();
    });
};
