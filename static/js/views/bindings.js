var inviteBindings = {
    '.event-name': 'title',

    '.event-start-date': 'start-date',
    '.event-start-time': 'start-time',
    '.event-end-date': 'end-date',
    '.event-end-time': 'end-time',
    '.event-description': 'description',
    '.event-address': 'address',

    '.event-start-date-formatted': {
        observe: ['start-date','start-time'],
        onGet: function (values) {
            if(Date.parse(values[0] + ' ' + values[1]))
                return 'From: ' + values[0] + ' ' + values[1];
        }
    },
    '.event-end-date-formatted': {
        observe: ['end-date','end-time'],
        onGet: function (values) {
            return 'To: ' + values[0] + ' ' +  values[1];
        }
    }
};
