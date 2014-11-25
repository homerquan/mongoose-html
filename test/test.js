var should = require('should');
var mongoose = require('mongoose');
var Html = require('../index.js').loadType(mongoose);
var Schema = mongoose.Schema;

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
var Content = mongoose.model('Product', ContentSchema);

var content = new Content({
  richContent: "<a href='http://google.com' style='display: block'>google</a>"
});

describe('Html Type', function() {
  describe('the returned object from requiring mongoose-html', function() {
    it('should have a loadType method', function() {
      var htmlModule = require('../index.js');
      htmlModule.should.have.ownProperty('loadType');
      htmlModule.loadType.should.be.a('function');
    });
  });

  describe('mongoose.Schema.Types.Html', function() {
    before(function() {
      var htmlModule = require('../index.js').loadType(mongoose);
    });
    it('mongoose.Schema.Types should have a type called Html', function() {
      mongoose.Schema.Types.should.have.ownProperty('Html');
    });
    it('mongoose.Types should have a type called Html', function() {
      mongoose.Types.should.have.ownProperty('Html');
    });
    it('should be a function', function() {
      mongoose.Schema.Types.Html.should.be.a('function');
    });
    it('should have a method called cast', function() {
      mongoose.Schema.Types.Html.prototype.cast.should.be.a('function');
    });
  });

  describe('setting a html field and not saving the record', function() {
    it("should store a plain string", function() {
      var content = new Content({
        richContent: "abc"
      });
      content.richContent.should.equal('abc');
    });
    it("should store a html", function() {
      var content = new Content({
        richContent: "<p>abc</p>"
      });
      content.richContent.should.equal('<p>abc</p>');
    });
    it("should strip out js", function() {
      var content = new Content({
        richContent: "<script>alert('abc')</script><p>abc</p>"
      });
      content.richContent.should.equal('<p>abc</p>');
    });
    it("should strip out tags not in setting", function() {
      var content = new Content({
        richContent: "<div>abc</div>"
      });
      content.richContent.should.equal('abc');
    });
  });
})