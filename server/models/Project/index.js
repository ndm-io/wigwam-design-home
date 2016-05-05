'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Project', require('./ProjectSchema'));
module.exports = mongoose.model('Attachment', require('./AttachmentSchema'));
module.exports = mongoose.model('Designbrief', require('./DesignbriefSchema'));
//module.exports = mongoose.model('Message', require('./MessageSchema'));
//module.exports = mongoose.model('Task', require('./TaskSchema'));
//module.exports = mongoose.model('Product', require('./ProductSchema'));
//module.exports = mongoose.model('Receipt', require('./ReceiptSchema'));
//module.exports = mongoose.model('View', require('./ViewSchema'));
//module.exports = mongoose.model('Invoice', require('./InvoiceSchema'));

//module.exports = mongoose.model('Image', require('./ImageSchema'));
//module.exports = mongoose.model('Tag', require('./TagSchema'));
