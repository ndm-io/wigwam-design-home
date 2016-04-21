'use strict';

var _ = require('lodash');

var items = [
    {
        label: 'Scope',
        order: 1,
        description: 'How big is this project',
        options: [
            {
                label: 'Single Room',
                description: 'My initial intention is that this project will be a single room'
            },
            {
                label: 'Multiple Rooms',
                description: 'I expect this project will contain multiple rooms, but will retain a coherent design throughout'
            }
        ]
    },
    {
        label: 'Timescale',
        order: 2,
        description:'When do you need us to start',
        options: [
            {
                label:'Start soon as',
                description:[
                    'I\'ve already got some ideas and i\'ve got a deadline to meet. I want you to start right away ',
                    'and my priority is getting the design I want before my own deadline is up'
                ].join('')
            },
            {
                label:'Start next month',
                description:[
                    'I\'m keen to get cracking but I want to take my time to get everything right. ',
                    'I don\'t have a particular deadline but I want to get things up and running'
                ].join('')
            },
            {
                label:'6 months +',
                description: [
                    'I know what I am like and I need time to think about things. I want to start the planning now, ',
                    'however the execution may come later'
                ].join('')
            },
            {
                label:'Other',
                description: 'None of your options suits me. I\'ll tell you want I need when I speak to you'
            }
        ]
    },
    {
        label: 'Budget',
        order: 3,
        description:'How much are we to spend',
        options: [
            {
                label: 'Loads',
                description: 'I want the best and I\'m willing to pay for it'
            },
            {
                label: 'Loads but there is a limit',
                description: [
                    'I want the best but I also like a bargain. I\'ll push the budget for something unique ',
                    'or something that has a real impact'
                ].join('')
            },
            {
                label: 'Strict budget',
                description: 'I\'ve done my homework and I know what the budget is, so we must stick to it'
            },
            {
                label: 'Tight budget',
                description: 'I want the designer look on a shoestring. Do whatever magic you can so it looks like I spent loads'
            }
        ]
    },
    {
        label: 'Style',
        order: 4,
        description: 'Openness to ideas',
        options: [
            {
                label: 'Open book',
                description:[
                    'I\'m an open book, consider that I have never even seen a design. If you show me something, i\'ll',
                    ' tell you if I like it or not. I don\'t have any fixed ideas on what style the design should end up as'
                ].join('')
            },
            {
                label: 'Open minded',
                description: 'I know what I like, but when i\'m shown a better alternative I go with it'
            },
            {
                label: 'Set',
                description: 'I\'ve seen a design I like already and I want you to implement it for me'
            }
        ]
    },
    {
        label: 'Involvement',
        order: 5,
        description: 'Designing to Project Managing',
        options: [
            {
                label: 'Project Management',
                description: [
                    'In my ideal world, I would come home one day and it would be done. I want you to take care ',
                    'of the design and implementation of this project. You source and arrange trades and supplies, ',
                    'I reap the rewards'
                ].join('')
            },
            {
                label: 'Design and guide',
                description: [
                    'I want to be involved in the design and process and I will take on board your suggestions for tradesmen ',
                    'but i\'ll have the final say'
                ].join('')
            },
            {
                label: 'Design',
                description: 'Just do the design and leave the rest to me'
            }
        ]
    }
];

module.exports = {
    items: items,
    orderForLabel: function (label) {
        var item = _.find(items, function (itm) {
            return itm.label === label;
        });
        return item.order;
    }
};