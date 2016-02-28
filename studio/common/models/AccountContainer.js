var Feature = require('./Feature');

function AccountContainer (user) {
    this.emailRe = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    this.phoneRe = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    this.postcodeRe = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
    this.success = false;

    this.validate = function (signup) {
        this.errors.length = 0;
        this.success = false;
        this.address.postcode = this.address.postcode.toUpperCase();
        if (!this.emailRe.test(this.email)) this.errors.push({description:'Email appears invalid',solution:'Check your typing for email address'});
        if (!this.phoneRe.test(this.phone)) this.errors.push({description:'Phone appears invalid',solution:'We need a number to contact you on, check the digits'});
        if (!signup) {
            if (!this.postcodeRe.test(this.address.postcode)) this.errors.push({description:'Postcode invalid',solution:'We need a valid postcode for your address'});
        }
        return (this.errors.length == 0);
    };

    this.formattedAddress = function () {
        var array = [];
        for (var key in this.address) {
            if (Object.prototype.hasOwnProperty.call(this.address, key)) {
                var val = this.address[key];
                if (val) array.push(val);
            }
        }
        return array.join(', ');
    };

    this.populate = function (user) {
        this.email = user.email || '';
        this.phone = user.phone || '';
        this.address = user.address || {
                address1:'',
                address2:'',
                address3:'',
                postcode:''
            };

        if (user.loc) {
            var feature = new Feature();
            feature.initFromJson(user.loc);
            user.loc = feature;
        }
        this.loc = user.loc || new Feature('Point',undefined,{name:'Home Address', formattedAddress:this.formattedAddress});
        this.profile = user.profile || {
                firstname:'',
                surname:''
            };
        this.success = false;
        this.errors = [];
    };

    this.model = function () {
        return {
            email: this.email,
            phone: this.phone,
            address: this.address,
            postcode: this.postcode,
            loc: this.loc,
            profile: this.profile
        };
    };

    this.populate(user || {});
}



module.exports = AccountContainer;