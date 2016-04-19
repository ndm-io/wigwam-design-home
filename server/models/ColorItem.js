var mongoose = require('mongoose');
var _ = require('lodash');

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

var colorSchema = new mongoose.Schema({
	guid:String,
	r:String,
	g:String,
	b:String,
	name:String,
	code:String,
	manufacturer:String,
	selected:{type:Boolean,default:false},
	favouite:{type:Boolean, default:false}
});

colorSchema.statics.itemFromRgb = function itemFromRgb (rgb) {
	var newItem = {
		guid:guid(),
		r:rgb[0],
		g:rgb[1],
		b:rgb[2]
	};
	return new this(newItem);
};

colorSchema.statics.itemsFromRgbArray = function itemsFromRgbArray (rgbArray) {
	var items = [];
	var self = this;
	_.each(rgbArray, function (rgb) {
		var item = self.itemFromRgb(rgb);
		items.push(item);
	});
	return items;
};

module.exports = mongoose.model('ColorItem', colorSchema);