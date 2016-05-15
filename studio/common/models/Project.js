var Base = require('./WWBase.js');
var Message = require('./Message');
var Client = require('./User');
var Address = require('./Address');
var Designbrief = require('./Designbrief');
var WWFile = require('./WWFile');
var _ = require('lodash');


function Project() {
    this.guid = Base.guid();
    this.urn = '';
    this.name = '';
    this.description = '';
    this.createdDate = new Date();
    this.submissionDate = undefined;
    this.acceptedDate = undefined;
    this.clients = [];
    this.tasks = [];
    this.events = [];
    this.messages = [];
    this.briefs = [];
    this.products = [];
    this.invoices = [];
    this.quotes = [];
    this.images = [];
    this.attachments = [];
    this.address = new Address();
    this.sha256 = '';
    this._totals = undefined;
    this._icImages = undefined;
    this._imageTags = undefined;
    this._colors = undefined;

    var project = this;

    Object.defineProperty(project, 'brief', {
        get:function () {
            if (project.briefs.length > 0) return project.briefs[project.briefs.length -1];
        },
        set: function (brief) {
            project.briefs.push(brief);
        }
    });

}

Project.prototype.className = function () {
    return 'Project';
};

Project.prototype.initAsConcept = function (user) {
    this.loc = {};
    this.clients.push(user);
    return this;
};

Project.prototype.initFromJson = function (json) {
    if (!json) return;

    this.initPrimitives(json);
    this.initArrayProperty('clients', json.clients, Client);
    //this.initArrayProperty('tasks', json.tasks, Task);
    //this.initArrayProperty('events', json.events, Task);
    this.initArrayProperty('messages', json.messages, Message);
    this.initArrayProperty('briefs', json.briefs, Designbrief);
    this.initArrayProperty('attachments', json.attachments, WWFile);

    this.address = new Address(json.address);
    //this.initArrayProperty('products', json.products, Product);
   // this.initArrayProperty('invoices', json.invoices, Invoice);
    //this.initArrayProperty('quotes', json.quotes, Invoice);
    //this.initArrayProperty('images', json.images, WWImage);

    this.resetTotals();
};

Project.prototype.initPrimitives = Base.initPrimitives;

Project.prototype.initArrayProperty = Base.initArrayProperty;

//Project.prototype.generateSha256 = function () {
//    this.sha256 = Sha256.hash(JSON.stringify(this));
//    return this.sha256;
//};

Project.prototype.formattedName = function () {
    if (this.name.length > 0) {
        return this.name;
    } else {
        var nums = this.guid.split('-');
        return [
            'New Project ...',
            nums[0],
            '...'
        ].join('');
    }
};

Project.prototype.generateUrn = function () {
    var client = this.client();
    var name;
    if (!client) {
        name = this.ran(2);
    } else {
        name = client.profile.surname.replace(/\s/g, "");
    }
    var candidate = 'V1-' + name + '-' + this.name.replace(/\s/g, "") + '-';
    this.urn = candidate + this.generateLuhn(candidate);
    return this.urn;
};

Project.prototype.generateLuhn = function (s) {
    var sum = 0;
    var alt = true;
    var digits = s.split('');
    digits = digits.map(function (x) {
        return x.charCodeAt(0);
    });
    for (var i = digits.length - 1; i >= 0; i--) {
        var curDigit = digits[i];
        if (alt) {
            curDigit *= 2;
            if (curDigit > 9) curDigit -= 9;
        }
        sum += curDigit;
        alt = !alt;

    }
    return (10 - (sum % 10)).toString();
};

Project.prototype.ran = function (chars) {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1, chars + 1)
        .toUpperCase();
};

Project.prototype.submissionVerified = function () {
    return (this.detailsVerified() && this.locVerified() && this.hasClient) ? true : false;
};

Project.prototype.detailsVerified = function () {
    return !!(this.name != '' && this.description != '');
};

Project.prototype.locVerified = function () {
    return (this.address.loc.geometry.coordinates.length > 0);
};

Project.prototype.hasVerifiedAddress = function () {
    return this.locVerified();
};


Project.prototype.isConcept = function () {
    return !this.submissionVerified();
};

Project.prototype.hasClient = function () {
    var candidate = this.client();
    if (candidate) return (candidate._id || candidate.email) ? true : false;
    return false;
};

Project.prototype.setClient = function (clientJson) {
    var client = new Client();
    this.clients.push(client.initFromJson(clientJson));
};

Project.prototype.client = function () {
    return this.clients[this.clients.length - 1];
};

Project.prototype.setClientAsLocation = function () {
    this.address = this.client().address;
};

Project.prototype.removeClient = function (client) {
    _.remove(this.clients, function (item) {
        return item === client;
    });
};

Project.prototype.summaryComplete = function () {
    return (this.detailsVerified() && this.hasVerifiedAddress());
};

Project.prototype.taskCount = function () {
    return this.tasks.length;
};

Project.prototype.outstandingTaskCount = function () {
    var count = 0;
    angular.forEach(this.tasks, function (task) {
        if (!task.isComplete()) {
            count++;
        }
    });
    return count;
};

Project.prototype.hasOutstandingTasks = function () {
    return (this.outstandingTaskCount() > 0);
};

Project.prototype.addTask = function (task) {
    task.type = 'task';
    task.projectGuid = this.guid;
    this.tasks.push(task);
};

Project.prototype.addEvent = function (event) {
    event.type = 'event';
    event.assignedToId = this.client()._id;
    event.projectGuid = this.guid;
    this.events.push(event);
};

Project.prototype.eventWithGuid = function (eventGuid) {
    return _.find(this.events, function (event) {
        return event.guid === eventGuid;
    });
};

Project.prototype.removeEvent = function (event) {
    _.remove(this.events, function (item) {
        return item === event;
    });
};

Project.prototype.colors = function () {
    if (!this._colors) {
        this._colors = _.chain(this.images)
            .map(function (image) {
                return image.palette;
            })
            .flatten()
            .uniq(function (n) {
                return n.sumValues();
            })
            .value()
            .sort(function (a, b) {
                return a.sumValues() > b.sumValues() ? -1 : 1;
            });
    }
    return this._colors;
};

Project.prototype.summaryColors = function (results) {
    results = results || 6;
    if (!this._summaryColors) {
        var colors = this.colors();
        var num = colors.length;
        if (num > results) {
            this._summaryColors = _.take(colors, results);
        } else {
            var numNeeded = results - num;
            var greys = this.generateGreyRgbs(numNeeded);
            this._summaryColors = _.union(colors, greys);
        }
    }
    return this._summaryColors;
};

Project.prototype.generateGreyRgbs = function (num) {
    var greyColor = new ColorItem();
    greyColor.setRgbFromString('rgb(10,10,10)');
    return greyColor.monochromaticColors(num || 6);
};

Project.prototype.briefWithGuid = function (guid) {
    return _.find(this.briefs, function (brief) {
        return brief.guid === guid;
    });
};

Project.prototype.hasAttachments = function () {
    return (this.attachments.length > 0);
};

Project.prototype.addAttachments = function (files) {
    var self = this;
    _.each(files, function (file) {
        self.attachments.push(file);
    });
};

Project.prototype.removeAttachment = function (attachment) {

    var attachmentGuid = (typeof attachment === 'string') ? attachment : attachment.guid;

    _.remove(this.attachments, function (file) {
        return file.guid === attachmentGuid;
    });
};

Project.prototype.upsertAttachments = function (jsonArray) {
    var self = this;

    _.each(jsonArray, function (jsonAttachment) {

        var att = _.find(self.attachments, function (attachment) {
            return attachment.guid === jsonAttachment.guid;
        });

        if (att) {
            att.updateFromJson(jsonAttachment);
        } else {
            att = new WWFile();
            att.initFromJson(jsonAttachment);
            self.attachments.push(att);
        }

    });
};

//Project.prototype.addImage = function (image) {
//    this.images.push(image);
//};
//
//Project.prototype.deleteImage = function (image) {
//    _.remove(this.images, function (item) {
//        return item === image;
//    });
//};
//
//Project.prototype.imageWithGuid = function (imageGuid) {
//    return _.find(this.images, function (image) {
//        return image.guid == imageGuid;
//    });
//};
//
//Project.prototype.addImageToDefaults = function (image) {
//    this.defaultInitialConsultationImageGuids.push(image.guid);
//    if (!this._icImages) this._icImages = [];
//    this._icImages.push(image);
//};
//
//Project.prototype.removeDefaultImage = function (image) {
//    _.remove(this.defaultInitialConsultationImageGuids, function (imageGuid) {
//        return imageGuid == image.guid;
//    });
//    _.remove(this._icImages, function (icImage) {
//        return image.guid == icImage.guid;
//    });
//};
//
//Project.prototype.icImages = function () {
//    if (!this._icImages && this.defaultInitialConsultationImageGuids.length > 0) {
//        this._icImages = [];
//        var self = this;
//        _.each(this.defaultInitialConsultationImageGuids, function (imageGuid) {
//            var img = self.imageWithGuid(imageGuid);
//            if (img) self._icImages.push(img);
//        });
//    }
//    return this._icImages;
//};

//Project.prototype.imageTags = function () {
//    if (!this._imageTags) {
//        var tags = [];
//        _.each(this.images, function (image) {
//            var n = image.tags;
//            tags = _.union(tags, n);
//        });
//        this._imageTags = _.uniq(tags, function (tag) {
//            return tag.tag;
//        });
//    }
//    return this._imageTags;
//};
//
//Project.prototype.imageGuids = function () {
//    return this.images.map(function (image) {
//        return image.guid;
//    });
//};
//
//Project.prototype.addInitialConsultation = function (con) {
//    this.initialConsultations.push(con);
//};
//
//Project.prototype.initialConsultationWithGuid = function (guid) {
//    return _.find(this.initialConsultations, function (ic) {
//        return ic.guid == guid;
//    });
//};

Project.prototype.messageCount = function () {
    return this.messages.length;
};

Project.prototype.allMessagesHtml = function () {
    if (!this._allMessagesHtml) {
        this._allMessagesHtml = this.messagesHtml(this.messages);
    }
    return this._allMessagesHtml;
};

Project.prototype.messagesHtml = function (messages) {
    var str = '';
    _.each(messages, function (message) {
        str += message.html();
    });
    return str;
};

Project.prototype.markHeadingMessagesRead = function (heading, user) {
    var u = this.unreadMessagesForHeading(heading, user)
    _.each(u, function (message) {
        message.markReadByUser(user);
    });
    return u;
};

Project.prototype.markAllMessagesRead = function (userId) {
    _.each(this.messages, function (message) {
        message.markReadBy(userId);
    });
};

Project.prototype.addMessage = function (message) {
    message.projectGuid = this.guid;
    this.messages.push(message);
};

Project.prototype.messageWithGuid = function (guid) {
    return _.find(this.messages, function (message) {
        return message.guid == guid;
    });
};

Project.prototype.unreadMessagesCount = function (user) {
    var msgs = this.unreadMessages(user);
    return msgs.length;
};

Project.prototype.unreadMessages = function (user) {
    if (!user) return [];
    return _.filter(this.messages, function (message) {
        return !message.isReadByUser(user);
    });
};

Project.prototype.messagesForHeading = function (heading) {
    heading = heading.toLowerCase();
    var msgs = _.filter(this.messages, function (message) {
        return message.heading == heading;
    });
    return msgs;
};

Project.prototype.unreadMessagesForHeading = function (heading, user) {
    if (!heading || !user) return [];
    var msgs = this.messagesForHeading(heading);
    return _.filter(msgs, function (message) {
        return !message.isReadByUser(user);
    })
};

Project.prototype.messagesByUser = function (user) {
    return _.filter(this.messages, function (message) {
        return message.isEditableBy(user);
    });
};

Project.prototype.messageHeadings = function () {
    var headings = this.messages.map(function (message) {
        return message.heading;
    });
    return _.uniq(headings, function (heading) {
        return heading;
    });
};

Project.prototype.messagesForHeading = function (heading) {
    if (!heading) return this.messages;
    return _.filter(this.messages, function (message) {
        return heading == message.heading;
    });
};

Project.prototype.messageHtmlForHeading = function (heading) {
    var messages = this.messagesForHeading(heading);
    return this.messagesHtml(messages);
};

Project.prototype.normalizedImagesToMessages = function () {
    var messageCount = (this.messages.length > 0) ? this.messages.length : 1;
    var imageCount = (this.images.length > 0) ? this.images.length : 1;
    var max = Math.max(messageCount, imageCount);
    var scaledM = messageCount / max;
    var scaledI = imageCount / max;
    return Math.abs(scaledM - scaledI);
};

Project.prototype.selectAllProducts = function () {
    angular.forEach(this.products, function (product) {
        product.selected = true;
    });
};

Project.prototype.deselectAllProducts = function () {
    angular.forEach(this.products, function (product) {
        product.selected = false;
    });
};

Project.prototype.addProduct = function (product) {
    var index = _.indexOf(this.products, _.find(this.products, {guid: product.guid}));
    if (index == -1) {
        product.setProjectId(this._id);
        this.products.push(product);
    }
};

Project.prototype.removeProduct = function (product) {
    _.remove(this.products, function (item) {
        return item === product;
    });
};

Project.prototype.replaceProductWithProduct = function (productJson) {
    //var guid = productJson.guid;
    //var index = _.indexOf(this.products, _.find(this.products, {guid: guid}));
    //if (index > -1) {
    //    var newVal = new Product();
    //    newVal.initFromJson(productJson);
    //    this.products.splice(index, 1, newVal);
    //}
    throw new Error('This method has been deprecated, replaceProductWithProduct c', arguments);
};

Project.prototype.invoiceWithGuid = function (invoiceGuid) {
    return _.find(this.invoices, function (invoice) {
        return invoice.guid == invoiceGuid;
    });
};

Project.prototype.invoiceSelectedProducts = function () {
    return this.handleSelectedProducts('invoices', 'invoiced');
};

Project.prototype.quoteSelectedProducts = function () {
    return this.handleSelectedProducts('quotes', 'quoted');
};

Project.prototype.handleSelectedProducts = function (projectKey, productKey) {
    var products = this.selectedProducts(productKey);
    var invoice = new Invoice();
    invoice.products = products;
    invoice.clients.push(this.client());
    invoice.setProject(this);
    invoice.generateSha256();

    this[projectKey].push(invoice);
    this.deselectAllProducts();
    this.resetTotals();

    return invoice;
};

Project.prototype.selectedProducts = function (productKey) {
    return _.filter(this.products, function (product) {
        if (product.selected && productKey) product[productKey] = true;
        return product.selected;
    });
};

Project.prototype.removeDataItem = function (item, key) {
    _.remove(this[key], function (candidate) {
        return candidate === item;
    });
    this.resetTotals();
};

Project.prototype.removeInvoice = function (invoice) {
    this.removeDataItem(invoice, 'invoices');
};

Project.prototype.removeQuote = function (quote) {
    this.removeDataItem(quote, 'quotes');
};

Project.prototype.invoiceQuote = function (quote) {
    var invoice = new Invoice();
    invoice.products = quote.products;
    invoice.clients = quote.clients;
    invoice.setProject(this);
    this.invoices.push(invoice);
    return invoice;
};

Project.prototype.totals = function () {
    if (!this._totals) {
        var totals = {value: 0, profit: 0, outstandingInvoices: 0, amountOutstanding: 0};
        _.each(this.invoices, function (invoice) {
            totals.value += invoice.totalValue();
            totals.profit += invoice.totalProfit();
            if (!invoice.isPaid()) {
                totals.outstanding++;
                totals.amountOutstanding += invoice.totalValue();
            }
        });
        this._totals = totals;
    }
    return this._totals;
};

Project.prototype.resetTotals = function () {
    this._totals = undefined;
};

Project.prototype.totalValue = function () {
    return this.totals().value;
};

Project.prototype.totalProfit = function () {
    return this.totals().profit;
};

Project.prototype.totalOutstanding = function () {
    return this.totals().amountOutstanding;
};

module.exports = Project;