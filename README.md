## What it does

* Saves a String as an sanitized html (remove js and css, limit tags...). For more details about sanitized html, check https://github.com/punkave/sanitize-html. For mongoose schema types, check http://mongoosejs.com/docs/schematypes.html.

## How to use

```JavaScript
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-html').loadType(mongoose);
var Html = mongoose.Types.Html;

// If you don't have the Html variable declared you can use 'mongoose.Types.Html'
var ContentSchema = Schema({
  richContent: {
    type: Html,
    setting: {
      allowedTags: ['p', 'b', 'i', 'em', 'strong', 'a'],
      allowedAttributes: {
        'a': ['href']
      }
    }
  }
});

var Content = mongoose.model('Content', ContentSchema);

var content = new Content({ richContent: "<a href='http://google.com' style='display:block'>google</a>" });

```
### How to install
 * `npm i mongoose-html`
 
### How to test
 * `sudo npm i mocha -g`
 * `mocha test`

### Schema options
Same as sanitize-html https://github.com/punkave/sanitize-html


### About author
Created by [Homer Quan](http://homerquan.com) for [reflen.com](http://www.reflen.com)

