JSON Lint (LOC INFO)
=========

A pure [JavaScript version](http://zaach.github.com/jsonlint/) of the service provided at [jsonlint.com](http://jsonlint.com).


MODIFICATION (russa)
----

Modified JSON parser which additionally extracts the position / location information
for the parsed JSON object.

Parser returns position information for parsed JSON objects, i.e.
the location within the input-string that is parsed.

Enable extraction of position information:
```javascript

var jsonlint = require("jsonlint");

//enable meta-data extraction:
jsonlint.setLocEnabled(true);

var data = jsonlint.parse('{"creative?": false}');

```

the result for parsed data object would be:
```javascript

// Index (in 3 lines)
//
//  2 4 6 8 10 13 16 19
// 1|3|5|7|9|11|14|17|20
// |||||||||||12|15|18|
// {"creative?": false}
//
// extracted meta data:
{
  "creative?": false,
  "_loc": {
    ///// location for whole object itself
    "first_line": 1,
    "last_line": 1,
    "first_column": 1,
    "last_column": 19,
    ///// location for property "creative?" in parent object
    "_creative?": [
      {//// position of property/name
        "first_line": 1,
        "last_line": 1,
        "first_column": 1,
        "last_column": 12
      },
      {//// position of property/value
        "first_line": 1,
        "last_line": 1,
        "first_column": 14,
        "last_column": 19
      }
    ],
    "_this": {///// location for object itself
      "first_line": 1,
      "last_line": 1,
      "first_column": 1,
      "last_column": 19
    }
  }
}
``` 

Position information is stored in property `"_loc"`.
Positions for properties are noted in the object's `"_loc"` in sub-property: `"_"+ property-name`
e.g.:
```javascript
{
  "_loc": {
    "_someProperty": {
            ...
```
             
Positions for array entries are noted in the array's `"_loc"` in sub-property: ´"_"+ entry-index`
e.g.:
```javascript
{
  "_loc": {
    "_0": {
    "_1": {
            ...
```

The object's / array's own position is noted in `"_loc"` in sub-property `"_this"`
e.g.:
```javascript
{
  "_loc": {
    "_this": { ...
````

Each position/location information object has properties:
```javascript
{ 
  "first_line"   : NUMBER
  "last_line"    : NUMBER 
  "first_column" : NUMBER
  "last_column"  : NUMBER
}
```


## Command line interface
Install jsonlint with npm to use the command line interface:

    npm install jsonlint -g

Validate a file like so:

    jsonlint myfile.json

or pipe input into stdin:

    cat myfile.json | jsonlint

jsonlint will either report a syntax error with details or pretty print the source if it is valid.

### Options

    $ jsonlint -h

    Usage: jsonlint [file] [options]

    file     file to parse; otherwise uses stdin

    Options:
       -v, --version            print version and exit
       -s, --sort-keys          sort object keys
       -i, --in-place           overwrite the file
       -t CHAR, --indent CHAR   character(s) to use for indentation  [  ]
       -c, --compact            compact error display
       -V, --validate           a JSON schema to use for validation
       -e, --environment        which specification of JSON Schema the validation file uses  [json-schema-draft-03]
       -q, --quiet              do not print the parsed json to STDOUT  [false]
       -p, --pretty-print       force pretty printing even if invalid


## Module interface

I'm not sure why you wouldn't use the built in `JSON.parse` but you can use jsonlint from a CommonJS module:

    var jsonlint = require("jsonlint");

    jsonlint.parse('{"creative?": false}');

It returns the parsed object or throws an `Error`.

## Vim Plugins

* [Syntastic](http://www.vim.org/scripts/script.php?script_id=2736)
* [sourcebeautify](http://www.vim.org/scripts/script.php?script_id=4079) 

## MIT License


Modification by russa


based on JSON Lint by

Copyright (C) 2012 Zachary Carter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
