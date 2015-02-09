ReportView = Backbone.View.extend({
    bindings: inviteBindings,
    new_contact_string: "\
            <li id='{2}' class='contact-row' data-contact='{0};{1}'>\
                {0} {3} {1} \
            </li>",
    initialize: function(options){
        this.options = options || {};
        this.model = this.options.model;
    },

    template: JST['invite_report.html'],

    render: function() {
        this.$el.html(this.template());
        this.$report_table = this.$el.find(".contact-read-table");

        this.listenTo(this.model.attributes.contacts, 'add', this.addContact);
        this.listenTo(this.model.attributes.contacts, 'remove', this.removeContact);

        this.stickit();
        return this;
    },

    addContact: function(contact){
        this.$report_table.append(
            this.new_contact_string.format(
                contact.get('name'),
                contact.get('email') + " " + contact.get('phone'),
                contact.get('unique_id'),
                (contact.get('name').length > 0)?"&nbsp;":""
            )
        );
    },
    removeContact: function(contact){
        this.$report_table.find('#'+contact.get('unique_id')).remove();
    }
});
