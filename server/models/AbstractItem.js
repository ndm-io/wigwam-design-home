var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var newsSchema = new mongoose.Schema({
			imgUrl:String,
			imgUrlLarge:String,
    		imgAlt:String,
    		title:String,
    		content:String,
    		date:{type:Date,default:Date.now},
    		loc:GeoJSON.Feature
});




module.exports = mongoose.model('NewsItem', newsSchema);
module.exports = mongoose.model('ProjectItem', newsSchema);

