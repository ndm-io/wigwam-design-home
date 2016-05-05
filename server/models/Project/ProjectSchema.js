'use strict';

var mongoose = require('mongoose'),
    GeoJSON = require('mongoose-geojson-schema'),
    designbriefSchema = require('./DesignbriefSchema'),
    ObjectId = mongoose.Types.ObjectId,
    Promise = require('promise'),
    deepPopulate = require('mongoose-deep-populate')(mongoose),
    roles = require('../../config/constants').ROLES,
    _ = require('lodash'),
    props = require('./helpers/ProjectSchemaProps');

var projectSchema = new mongoose.Schema({
    guid: {type: String, default: ''},
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
    briefs: [designbriefSchema],
    attachments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attachment'}]
});

projectSchema.methods.saveProject = function saveProject() {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.save(function (err) {
            if (err) reject(err);
            resolve(self);
        });
    });
};

projectSchema.methods.hasClient = function hasClient(clientId, callback) {
    var objId = new ObjectId(clientId);
    return this.model('Project')
        .find({_id: this._id, clients: objId},
            function (err, docs) {
                var success = (docs.length > 0);
                callback(success);
            });
};

projectSchema.plugin(deepPopulate, {
    populate: {
        'attachments': {
            select: props.attachment
        }
    }
});

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

projectSchema.statics.deepPopProps = function () {
    return props.project;
};

projectSchema.statics.projectWithGuid = function projectWithGuid(guid) {
    return new Promise(function (resolve, reject) {
        var Project = mongoose.model('Project');

        Project.find({guid: guid})
            .limit(1)
            .deepPopulate(props.project)
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
            .deepPopulate(props.project)
            .exec(function (err, docs) {
                if (err) reject(err);
                resolve(docs);
            });

    });
};

module.exports = projectSchema;


