## README.md

This package is very rough. However, it does work. 

This package expects text files with an email per line. If password credentials are delimited with ':' or ';', they will automatically be removed.
This package accepts a filename or a path in which it will take the text files comtaining the emails, line by line, attempt smtp/MX/mailbox verification, and write out to a timestamped labelled file. Writing out to file is not implemented.


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