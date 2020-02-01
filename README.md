## README.md

This package is very rough. However, it does work. 

This package expects text files with an email per line. If password credentials are delimited with ':' or ';', they will automatically be removed.
This package accepts a filename or a path in which it will take the text files comtaining the emails, line by line, attempt smtp/MX/mailbox verification, and write out to a timestamped labelled file. Writing out to file is not implemented.

Bonus: Included is a file called "email_preprocessor.sh". Let's say you have a bunch of tar.gz of credentials. Run this processor in that folder and it will untar, renumber, throw-away the credentials and just keep the emails for running. There is an additional funciton: party which calls the package in parallel, on top of the internal concurrency. You are welcome.


```
Usage: verify-emails-cli [options]

Options:
  -V, --version                    output the version number
  -d, --debug                      DEBUG, ERROR, INFO, WARN
  -f, --filename <string>          i.e.filename
  -l, --directory <string>         i.e. directory (priority over file)
  -o, --output <string>            i.e. filename
  -z, --output-directory <string>  i.e. directory name
  -h, --help                       output usage information
  ```