InviteModel = Backbone.Model.extend({
  defaults: {
        'title': '',
        'start': '04-04-2014',
        'end': '04-04-2014',
        'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry""s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        'address': {
            'street': '',
            'suite':'',
            'city': '',
            'state': '',

            'zip': ''
        },
        'contacts': [],
    }
});

var inviteBindings = {
    '.event-name': 'title',
    '.event-start-date': 'start',
    '.event-end-date': 'end',
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
                        // {value: "01", label: "January"},
                        // {value: "02", label: "February"},
                        // {value: "03", label: "March"},
                        // {value: "04", label: "April"},
                        // {value: "05", label: "May"},
                        // {value: "06", label: "June"},
                        // {value: "07", label: "July"},
                        // {value: "08", label: "August"},
                        // {value: "09", label: "September"},
                        // {value: "10", label: "October"},
                        // {value: "11", label: "November"},
                        // {value: "12", label: "December"},
                ]}
            }
    },
};


ReportView = Backbone.View.extend({
    bindings: inviteBindings,

    initialize: function(options){
        this.options = options || {};
        console.log(this.options.model);
        this.model = this.options.model;
    },

    template: JST['invite_report.html'],

    render: function() {
        this.$el.html(this.template());
        this.stickit();
        return this;
    }
});
