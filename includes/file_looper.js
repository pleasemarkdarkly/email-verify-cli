const program = require('./verify-email-commands');
const parse_file = require('./ingest_file_contents');
const ora = require('ora');

const fs = require('fs');
var db = require('./email_dao');

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
                        logger.log('-------------------------------------------------------------');
                        logger.log('db processing no. (' + extension_count + ') ' + file);
                        logger.log('-------------------------------------------------------------');
                        
                        const spinner = ora().start();
                        if (program.sqlite) {
                            db.insert_files(file)                            
                            parse_file.ingest_file_contents(file);
                            spinner.stop();
                        } else if (program.filename) {
                            const rm_creds = require('./remove_credentials');
                            rm_creds.remove_credentials(file);
                            const filter = require('./filter_valid_emails');
                            filter.filter_valid_emails(file);
                        }
                    }
                    next();
                }
            });
        })();
    });
};
