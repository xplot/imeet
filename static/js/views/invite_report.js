ReportView = Backbone.View.extend({
    bindings: inviteBindings,
    new_contact_string: "\
            <li id='contact_{2}' class='contact-row' data-contact='{0};{1};{2}'>\
                {0} - {1} \
            </li>",
    initialize: function(options){
        this.options = options || {};
        this.model = this.options.model;
    },

    template: JST['invite_report.html'],

    render: function() {
        this.$el.html(this.template());
        this.$report_table = this.$el.find(".contact-read-table");
        this.stickit();
        return this;
    },

    addContact: function(contact){
        this.$report_table.append(this.new_contact_string.format(contact.name, contact.address, contact.index));
    },
    removeContact: function(dataId){
        this.$report_table.find(dataId).remove();
    }
});
