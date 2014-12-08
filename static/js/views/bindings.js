var inviteBindings = {
    '.event-name': 'title',

    '.event-start-date': 'start_date',
    '.event-start-time': 'start_time',
    '.event-end-date': 'end_date',
    '.event-end-time': 'end_time',
    '.event-description': 'description',
    '.event-address-street': 'address.street',
    '.event-address-suite': 'address.suite',
    '.event-address-city': 'address.city',
    '.event-address-zip': 'address.zip',
    '.event-address-state': {
        observe: 'address.state',
        selectOptions: {
            collection: function() {
                return [
                    {value: null, label: ""},
                    {value: "FL", label: "Florida"},
                    {value: "NY", label: "New York"},
                    {value: "CA", label: "California"}
                ]
            }
        }
    },
    '.event-start-date-formatted': {
        observe: ['start_date','start_time'],
        onGet: function (values) {
            if(Date.parse(values[0] + ' ' + values[1]))
                return 'From: ' + values[0] + ' ' + values[1];
        }
    },
    '.event-end-date-formatted': {
        observe: ['end_date','end_time'],
        onGet: function (values) {
            return 'To: ' + values[0] + ' ' +  values[1];
        }
    },
    '.event-address-state-city': {
        observe: ['address.state','address.city'],
        onGet: function (values) {
            var state = values[0] || '';
            var city = values[1] || '';
            if(state == null && city == null)
                return '';
            return city + ', ' + state;
        }
    },
    '.event-address-street-with-number': {
        observe: ['address.street', 'address.suite'],
        onGet: function (values) {
            var street = values[0] || '';
            var suite = values[1] || '';
            return street + ' ' + suite;
        }
    }
};
