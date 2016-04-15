var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
var ObjectId = mongoose.Types.ObjectId;
var Promise = require('promise');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var roles = require('../config/constants').ROLES;
var url = require('url');
var fs = require('fs-extra');
var _ = require('lodash');
var async = require('async');
var request = require('request');
var secrets = require('../config/secrets');
var ColorThief = require('color-thief');
var colorThief = new ColorThief();

var Clarifai = require('./clarifai_node.js');
Clarifai.initAPI(secrets.clarifai.clientId, secrets.clarifai.clientSecret);

var sizeOf = require('image-size');

var clientSchema = mongoose.model('User');
var ColorItem = require('./ColorItem.js');
var colorItemSchema = ColorItem.schema;

var moodboardSchema = new mongoose.Schema({
    title: {type: String, default: ''}
});

var viewSchema = new mongoose.Schema({
    userEmail: {type: String},
    ip: {type: String},
    createdDate: {type: Date, default: Date.now},
    userId: {type: mongoose.Schema.Types.ObjectId}
});

var receiptSchema = new mongoose.Schema({
    guid: {type: String},
    createdDate: {type: Date, default: Date.now},
    amount: {type: Number}
});

var invoiceSchema = new mongoose.Schema({
    guid: {type: String},
    projectName: {type: String, default: ''},
    projectDescription: {type: String, default: ''},
    projectUrn: {type: String, default: ''},
    products: [mongoose.Schema.Types.Mixed],
    clients: [mongoose.Schema.Types.Mixed],
    views: [viewSchema],
    receipts: [receiptSchema],
    createdDate: {type: Date, default: Date.now},
    sentDate: {type: Date},
    paidDate: {type: Date},
    receiptDate: {type: Date},
    sha256: {type: String}
});

var productSchema = new mongoose.Schema({
    guid: {type: String},
    name: {type: String},
    description: {type: String},
    category: {type: String},
    url: {type: String},
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],

    supplier: {type: String},
    supplierUrl: {type: String},

    vat: {type: Number, default: 0.2},
    _trade: {type: Number, default: 0},
    _retail: {type: Number, default: 0},
    _deliveryCost: {type: Number, default: 0},
    _deliveryPrice: {type: Number, default: 0},
    feePercent: {type: Number, default: 0.1},
    noCostItem: {type: Boolean, default: false},
    noVatItem: {type: Boolean, default: false},
    qty: {type: Number, default: 1},

    invoiced: {type: Boolean, default: false},
    quoted: {type: Boolean, default: false},

    createdDate: {type: Date, default: Date.now},
    selected: {type: Boolean, default: false}
});

var tagSchema = new mongoose.Schema({
    tag: {type: String},
    prob: {type: Number}
});

var imageSchema = new mongoose.Schema({
    guid: {type: String},
    originalUrl: {type: String},
    projectId: {type: String},
    contentType: {type: String, default: 'image/jpeg'},
    isComplete: {type: Boolean, default: false},
    description: {type: String},
    createdDate: {type: Date, default: Date.now},
    createdById: {type: mongoose.Schema.Types.ObjectId},
    tags: [tagSchema],
    dimensions: {
        height: {type: Number, default: 0},
        width: {type: Number, default: 0},
        type: {type: String, default: ''}
    },
    palette: [colorItemSchema]
});

var taskNoteSchema = new mongoose.Schema({
    guid: {type: String},
    markdown: {type: String},
    createdDate: {type: Date, default: Date.now},
    createdBy: {type: String}
});

var taskSchema = new mongoose.Schema({
    guid: {type: String, default: ''},
    assignedToId: {type: mongoose.Schema.Types.ObjectId},
    createdById: {type: mongoose.Schema.Types.ObjectId},
    projectGuid: {type: String},
    createdDate: {type: Date},
    start: {type: Date},
    end: {type: Date},
    allDay: {type: Boolean, default: false},
    completedDate: {type: Date},
    title: {type: String, default: 'Task'},
    taskNotes: [taskNoteSchema],
    priority: {type: Number, default: 50},
    type: {type: String, default: 'event'},
    _today: {type: Date, default: new Date()}
});

var messageSchema = new mongoose.Schema({
    guid: {type: String, default: ''},
    projectGuid: {type: String},
    createdDate: {type: Date, default: Date.now},
    createdBy: {type: String},
    createdById: {type: String},
    createdByGravatar: {type: String},
    base64Encoded: {type: String},
    heading: {type: String, default: ''},
    readBy: {type: mongoose.Schema.Types.Mixed, default: {}}
});

var projectSchema = new mongoose.Schema({
        guid: {type: String, default: ''},
        sha256: {type: String, default: ''},
        createdDate: {type: Date},
        submissionDate: {type: Date},
        acceptedDate: {type: Date},
        urn: {type: String, default: ''},
        address: {
            address1: {
                type: String,
                default: ''
            }
            ,
            address2: {
                type: String,
                default: ''
            }
            ,
            address3: {
                type: String,
                default: ''
            }
            ,
            postcode: {
                type: String,
                default: ''
            }
            ,
            loc: GeoJSON.Feature
        },
        name: {type: String, default: ''},
        description: {type: String, default: ''},
        clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        moodboards: [moodboardSchema],
        tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
        events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
        messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
        products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
        invoices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}],
        quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}],
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
        initialConsultations: [{type: mongoose.Schema.Types.ObjectId, ref: 'InitialConsultation'}],
        defaultInitialConsultationImageGuids: [String]
    })
    ;

var initialConsultationSchema = new mongoose.Schema({
    guid: {type: String},
    base64Encoded: {type: String, default: ''},
    createdDate: {type: Date},
    createdById: {type: String},
    lockedDate: {type: Date},
    lockedById: {type: String},
    images: [imageSchema],
    colors: [colorItemSchema]
});

projectSchema.methods.hasClient = function hasClient(clientId, callback) {
    var objId = new ObjectId(clientId);
    return this.model('Project')
        //.find({_id:this._id, clients: { $elemMatch: { _id:objId}}},
        .find({_id: this._id, clients: objId},
            function (err, docs) {
                var success = (docs.length > 0);
                callback(success);
            });
};

projectSchema.plugin(deepPopulate, {});

projectSchema.methods.addProduct = function addProduct(productJson, userId, done) {
    var project = this;

    var cb = function (err, product) {

        if (!product || !product._id) {
            var error = new Error('Product not created');
            done(error);
        } else {

            var existing = _.find(project.products, function (p) {
                return p.guid === product.guid;
            });

            if (!existing) {
                project.products.push(product._id);
            }

            project.save(function (err) {
                done(err, product);
            });
        }
    };

    mongoose.model('Product').updateProduct(productJson, userId, cb);

};

projectSchema.methods.deleteProducts = function deleteProducts(productsJson, done) {
    var self = this;
    async.each(productsJson, function (pJ, callback) {
        self.products.pull(pJ);
        callback();
    }, function (err) {
        self.save(function (error) {
            done(error);
        });

    });
};

projectSchema.methods.markAllMessagesReadBy = function markAllMessagesReadBy(userId, dateStr, cb) {
    var projectGuid = this.guid;
    mongoose.model('Message').find({projectGuid: projectGuid}, function (err, messages) {
        if (err) {
            cb(err);
            return;
        }
        async.each(messages, function (message, callback) {
            message.markReadBy(userId, dateStr, function (err) {
                callback(err);
            });
        }, function (err) {
            if (err) {
                cb(errorsFromErr(err));
                return;
            }
            cb();
        });
    });
};

projectSchema.methods.markMessagesRead = function (msgs, userId, dateStr, done) {
    var Message = mongoose.model('Message');
    async.each(msgs, function (msg, cb) {
            Message.findOne({_id: msg._id}, function (err, message) {
                message.markReadBy(userId, dateStr, function () {
                });
                if (err) {
                    cb(err);
                } else {
                    cb();
                }
            });
        }, function (err) {
            done(errorsFromErr(err));
        }
    );
};

var props = [
    'clients',
    'address',
    'tasks',
    'events',
    'messages',
    'products',
    'invoices',
    'quotes',
    'images',
    'initialConsultations',
    'defaultInitialConsultationImageGuids'].join(' ');

projectSchema.statics.deepPopProps = function () {
    return props;
};

projectSchema.statics.projectWithGuid = function projectWithGuid(guid) {
    return new Promise(function (resolve, reject) {
        var Project = mongoose.model('Project');

        Project.find({guid: guid})
            .limit(1)
            .deepPopulate(props)
            .exec(function (err, project) {
                if (err) reject(err);
                if (!project) reject(new Error('Project not found with that guid'));
                resolve(project);
            });

    });
};

projectSchema.statics.projectsForUser = function projectsForUser(user) {
    return new Promise(function (resolve, reject) {
        var Project = mongoose.model('Project'),
            query;


        if (user.role >= roles.editor) {
            query = {};
        } else {
           query = {clients: user.id};
        }

        Project.find(query)
            .deepPopulate(props)
            .exec(function (err, docs) {
                if (err) reject(err);
                resolve(docs);
            });

    });
};

messageSchema.methods.markReadBy = function markReadBy(userId, dateStr, cb) {

    if (this.readBy[userId]) {
        cb();
    } else {
        this.readBy[userId] = dateStr;
        this.markModified('readBy');
        this.save(function (err) {
            cb(err);
        });
    }
};

function errorsFromErr(err) {
    var errors;
    if (err) {
        errors = [{problem: '', solution: '', err: err}];
    } else {
        errors = [];
    }
    return errors;
}

productSchema.plugin(deepPopulate, {});

productSchema.statics.updateProduct = function updateProduct(productJson, userId, done) {

    var imagesJson = productJson.images;
    var q = {guid: productJson.guid};
    var opts = {upsert: true};

    productJson.images = [];
    delete productJson.guid;
    delete productJson._id;

    _.each(imagesJson, function (imageJson) {
        if (imageJson._id) productJson.images.push(imageJson._id);
    });

    var Product = mongoose.model('Product');

    Product.update(q, productJson, opts, function (err, num) {
        Product.find(q)
            .limit(1)
            .deepPopulate('images')
            .exec(function (err, docs) {
                done(errorsFromErr(err), docs[0]);
            });
    });

};

productSchema.statics.updateProducts = function updateProducts(productsArrayJson, userId, done) {
    var Product = mongoose.model('Product');
    async.each(productsArrayJson, function (pJ, callback) {
            Product.updateProduct(pJ, userId, function (err, product) {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        }, function (err) {
            done(errorsFromErr(err));
        }
    );
};

imageSchema.virtual('needsDownload')
    .get(function () {
        return this.originalUrl.substring(0, 1) != '/';

    });

imageSchema.virtual('filePath')
    .get(function () {
        return secrets.productImagesPrefix + this.guid;
    });

imageSchema.methods.fetch = function fetch(cb) {

    if (!cb) {
        cb = function (image) {
            console.log('no call back in image fetch');
        };
    }

    var resultHandler = function (image) {
        if (image) {
            image.tag(function (taggedImage) {
                cb(taggedImage);
            });
        } else {
            cb();
        }
    };

    var head = this.originalUrl.substring(0, 4);

    if (head.substring(0, 1) == '/') {
        this.local(function (image) {
            cb(image);
        });
    } else if (head.substring(0, 4) == 'data') {
        this.base64(resultHandler);
    } else {
        var matches = this.originalUrl.match(/^(https?:)/);
        if (matches) {
            this.download(resultHandler);
        } else {
            cb();
        }
    }
};

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

    if (matches.length !== 3) {
        return;
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

imageSchema.methods.base64 = function base64(cb) {
    var image = this;
    var imageBuffer = decodeBase64Image(image.originalUrl);

    fs.writeFile(image.filePath, imageBuffer.data, function (err) {
        image.originalUrl = 'data';
        image.contentType = imageBuffer.type;
        image.isComplete = true;
        image.save(function (err) {
            cb(image);
        });
    });
};

imageSchema.methods.local = function local(cb) {
    this.isComplete = true;
    var image = this;
    this.save(function (err) {
        cb(image);
    });
};

imageSchema.methods.download = function download(cb) {
    var ws = fs.createOutputStream(this.filePath);
    var image = this;

    request
        .get(image.originalUrl)
        .on('response', function (response) {
            image.contentType = response.headers['content-type'];
            image.isComplete = true;

        })
        .on('error', function (err) {
            console.log('error downloading image', err);
        })
        .pipe(ws)
        .on('finish', function () {
            image.save(function (err) {
                cb(image);
            });
        });
};

imageSchema.methods.updateFromClarifaiResult = function updateFromClarifaiResult(result) {
    var Tag = this.model('Tag');
    var r = result.result.tag;
    var classes, probs;

    if (typeof r.classes[0] != 'string') {
        classes = r.classes[0];
        probs = r.probs[0];
    } else {
        classes = r.classes;
        probs = r.probs;
    }

    for (var i = 0; i < classes.length; i++) {
        var json = {tag: classes[i], prob: probs[i]};
        var tag = new Tag(json);
        this.tags.push(tag);
    }
};

imageSchema.methods.tag = function tag(cb) {
    var self = this;
    this.getPalette();

    var path = self.filePath;
    sizeOf(path, function (err, dimensions) {
        if (dimensions) self.dimensions = dimensions;

        Clarifai.tagImage(self, function (err, res) {
            if (!res) {
                cb();
            } else {
                _.each(res.results, function (result) {
                    self.updateFromClarifaiResult(result);
                });
                self.save(function (err) {
                    cb(self);
                });
            }
        });

    })
};

imageSchema.methods.getPalette = function getPalette(cb) {
    var palette = colorThief.getPalette(this.filePath, 8);
    var colorItems = ColorItem.itemsFromRgbArray(palette);
    this.palette = colorItems;
};

imageSchema.pre('remove', function (next) {
    var Project = this.model('Project');
    Project.update({images: this._id}, {$pull: {images: this._id}}, next);

    fs.unlink(this.filePath, function (err) {
    });
});

invoiceSchema.pre('remove', function (next) {
    this.model('Project').update({quotes: this._id}, {$pull: {quotes: this._id}}, next);
});

invoiceSchema.virtual('client.email')
    .get(function () {
        var client = this.clients[this.clients.length - 1];
        return client.email;
    });

module.exports = mongoose.model('Project', projectSchema);
module.exports = mongoose.model('Invoice', invoiceSchema);
module.exports = mongoose.model('Receipt', receiptSchema);
module.exports = mongoose.model('Task', taskSchema);
module.exports = mongoose.model('Message', messageSchema);
module.exports = mongoose.model('Product', productSchema);
module.exports = mongoose.model('Image', imageSchema);
module.exports = mongoose.model('InitialConsultation', initialConsultationSchema);
module.exports = mongoose.model('Tag', tagSchema);
module.exports = mongoose.model('View', viewSchema);