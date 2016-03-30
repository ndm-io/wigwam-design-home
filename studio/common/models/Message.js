'use strict';

var Base = require('./WWBase'),
    _ = require('lodash'),
    TextRank = require('./TextRank.js'),
    nlp = require("./nlp_compromise.min.js"),
    moment = require('moment');

function Message() {
    this.guid = Base.guid();
    this.projectGuid = '';
    this.createdDate = new Date();
    this.createdBy = '';
    this.createdByGravatar = '';
    this.createdById = '';
    this.base64Encoded = '';
    this._summary = undefined;
    this.heading = '';
    this.readBy = {};

    this.__defineGetter__("md", function () {
        return this.html();
    });

    this.__defineSetter__("md", function (markdown) {
        this.html(markdown);
    });
}

Message.prototype.className = function () {
    return 'Message';
};

Message.prototype.initPrimitives = Base.initPrimitives;
Message.prototype.html = Base.getSetHtml;

Message.prototype.initFromJson = function (json) {
    this.initPrimitives(json);
};

Message.prototype.clearHtml = function () {
    this._html = undefined;
};

Message.prototype.markReadByUser = function (user) {
    this.markReadBy(user._id);
};

Message.prototype.markUnreadByUser = function (user) {
    this.markUnreadBy(user._id);
};

Message.prototype.markUnreadBy = function (userId) {
    if (this.isReadBy(userId)) this.readBy[userId] = undefined;
};

Message.prototype.markReadBy = function (userId) {
    if (!this.isReadBy(userId)) this.readBy[userId] = new Date();
};

Message.prototype.isReadByUser = function (user) {
    return this.isReadBy(user._id);
};

Message.prototype.isReadBy = function (userId) {
    return (this.readBy[userId]) ? true : false;
};

Message.prototype.isEditableBy = function (user) {
    return (this.createdById == '' || this.createdById == user._id || user.isPrivileged) ? true : false;
};

Message.prototype.setCreatedByUser = function (user, gravatarSize) {
    this.createdBy = user.profile.firstname;
    this.createdById = user._id;
    this.readBy = {};
    this.createdByGravatar = user.gravatar(gravatarSize || 20);
    this.markReadBy(user._id);
};

Message.prototype.isFrom = function (user) {
    return this.createdById === user._id;
};

Message.prototype.resetSummary = function () {
    this._summary = undefined;
};

Message.prototype.rankTokens = (function () {
    var textRank = new TextRank();
    return function (tokens) {
        var graph = textRank.sentExGraph(tokens);
        return textRank.rank(graph, 40);
    };
}());

Message.prototype.summary = function (snippet_length) {
    var ret;
    if (!this._summary) {
        var tokens = this.tokens();
        var ws = this.rankTokens(tokens);

        if (ws.length > 0) {
            this._summary = ws[0].name.join(' ');
            ret = this._summary;
        } else {
            var sentence = this.firstSentence();
            if (sentence) {
                ret = (snippet_length && sentence.length > snippet_length) ?
                sentence.substring(0, snippet_length) + '..' :
                    sentence;
            }
        }
    } else {
        ret = this._summary;
    }
    return ret;
};

Message.prototype.firstSentence = function () {
    var s = this.sentences();
    if (s.length > 0) return s[0].text();
};

Message.prototype.tokens = function () {
    var tokens = [];
    var sentences = this.sentences();
    var self = this;
    _.each(sentences, function (sentence) {
        tokens.push(self.sentenceTokens(sentence));
    });
    return tokens;
};

Message.prototype.sentences = function () {
    return nlp.text(this.text()).sentences;
};

Message.prototype.sentencesAsText = function () {
    return _(this.sentences())
        .map(function (sentence) {
            return sentence.text();
        })
        .value();
};

Message.prototype.sentenceTokens = function (sentence) {
    return sentence.terms.map(function (t) {
        return t.text;
    });
};

Message.prototype.text = function () {
    return this.html().replace(/(<([^>]+)>)/ig, "\n").replace('\n\n', '\n');
};

Message.prototype.containsSearchText = function (searchText) {
    return (this.text().toLowerCase().indexOf(searchText) > -1);
};

Message.prototype.appendHtml = function (html) {
    this.html(this.html() + html);
    return this;
};

Message.prototype.ago = function () {
    return moment(this.createdDate).fromNow();
};

module.exports = Message;