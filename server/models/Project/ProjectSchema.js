'use strict';

var mongoose = require('mongoose'),
    GeoJSON = require('mongoose-geojson-schema'),
    designbriefSchema = require('./DesignbriefSchema'),
    ObjectId = mongoose.Types.ObjectId,
    Promise = require('promise'),
    deepPopulate = require('mongoose-deep-populate')(mongoose),
    roles = require('../../config/constants').ROLES,
    _ = require('lodash');

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
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    briefs:[designbriefSchema],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    invoices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}],
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Invoice'}],
    images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}]
});

projectSchema.methods.saveProject = function saveProject() {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.save(function (err) {
            if (err) reject(err);
            resolve(self);
        });
    });
};

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
            done(err);
        }
    );
};

projectSchema.methods.briefWithGuid = function (briefGuid) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var brief = _.find(self.briefs, function (brief) {
            return brief.guid === briefGuid;
        });
        if (brief) {
            resolve(brief);
        } else {
            reject(new Error('Brief not found'));
        }
    });
};

var props = [
    'clients',
    'address',
    'tasks',
    'events',
    'messages',
    'briefs',
    'products',
    'invoices',
    'quotes',
    'images'].join(' ');

projectSchema.statics.deepPopProps = function () {
    return props;
};

projectSchema.statics.projectWithGuid = function projectWithGuid(guid) {
    return new Promise(function (resolve, reject) {
        var Project = mongoose.model('Project');

        Project.find({guid: guid})
            .limit(1)
            .deepPopulate(props)
            .exec(function (err, projects) {
                if (err) reject(err);
                if (projects.length < 1) reject(new Error('Project not found with that guid'));
                resolve(projects[0]);
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

module.exports = projectSchema;

