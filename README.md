JSON Lint (LOC INFO)
=========

A modified version of the JavaScript [JSON parser](https://github.com/zaach/jsonlint/) by Z. Carter.


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


## JSON Lint

for more details of Command Line Interface (cli) etc. see the 
original site of the [JSON Lint parser](https://github.com/zaach/jsonlint/).


## MIT License


Modification by russa


based on JSON Lint by

Copyright (C) 2012 Zachary Carter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
