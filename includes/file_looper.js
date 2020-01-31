exports = logger = require('node-color-log');
const walkPath = './',
    fs = require('fs');

exports = walk = function (dir, done) {
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
                    logger.warn('-------------------------------------------------------------');
                    logger.warn(file);
                    require('./remove_credentials');
                    remove_credentials(file);
                    require('./filter_valid_emails')
                    filter_valid_emails(file);
                    logger.warn('-------------------------------------------------------------');
                    next();
                }
            });
        })();
    });
};