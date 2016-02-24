var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var subContractorSchema = new mongoose.Schema({
	company:{type:String},
	contact: {
		firstname:{type: String, default:''},
		surname:{type: String, default:''},
		title:{type: String, default:''}
	},
	address: {
		address1:{type:String},
		address2:{type:String, default:''},
		address3:{type:String, default:''},
		postcode:{type:String, default:''},
		loc: GeoJSON.Feature
	},
	phone:{type:String,default:''},
	trade:{type:String,default:'Undefined'},
	current:{type:Boolean, default:true},
	logoUrl:{type:String},
	webpage:{type:String},
	email:{type:String}
});

subContractorSchema.virtual('contact.fullName').get(function() {
	return this.contact.title + ' ' + this.contact.firstname + ' ' + this.contact.surname;
});

module.exports = mongoose.model('SubContractor', subContractorSchema);