this["JST"] = this["JST"] || {};

this["JST"]["add-group.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal addGroup-modal" tabindex="-1" >\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\r\n            <h4 class="modal-title" id="myModalLabel">Add New Group</h4>\r\n            </div>\r\n            <div class="modal-body">\r\n                <input type="text" class="form-control new-group-input" />\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\r\n                <button type="button" class="btn btn-primary new-group-btn">Create</button>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</div>';

}
return __p
};

this["JST"]["attendee_host_list_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="block block1 invite-background" data-id="' +
__e( unique_id ) +
'"\r\n        ';
 if (poster_image_id != null) {
            print("style='background-image: url(/image/" + poster_image_id + ")'")
        }
        else {
            print("style='background-image: url(/img/default_image.jpg)'")
        } ;
__p += '\r\n    >\r\n    <div class="center-block" data-id="' +
__e( unique_id ) +
'">\r\n        <h1 class="main-h1" data-id="' +
__e( unique_id ) +
'">' +
__e( title ) +
'</h1>\r\n\r\n        <div class="actions">\r\n            <div class="row">\r\n                ';
 if (invite_attendee_role == 'organizer') { ;
__p += '\r\n                    <div class="col-xs-6 col-md-6 no-padding">\r\n                        <button type=\'button\' class=\'btn btn-info form-control btn-duplicate\' data-id="' +
__e( unique_id ) +
'">Duplicate</button>\r\n                    </div>\r\n\r\n                    <div class="col-xs-6 col-md-6 no-padding edit-btn">\r\n                        <button type=\'button\' class=\'btn btn-info form-control btn-edit\' data-id="' +
__e( unique_id ) +
'">Edit</button>\r\n                    </div>\r\n                ';

                }
                else { ;
__p += '\r\n                    <div class="col-xs-6 col-md-6 no-padding btn-yes ';
 if ( invite_attendee_role == 'no') {;
__p += 'confirmed-negative ';
};
__p += ' ';
 if ( invite_attendee_role == 'yes') {;
__p += 'confirmed-positive ';
};
__p += '" data-attendee_id="' +
__e( invite_attendee_id ) +
'">\r\n\r\n                        <button type=\'button\' class=\'btn form-control\' data-attendee_id="' +
__e( invite_attendee_id ) +
'">Going <i class="fa fa-check-mark"></i> </button>\r\n                    </div>\r\n\r\n                    <div class="btn-group col-xs-6 col-md-6 no-padding btn-no ';
 if ( invite_attendee_role == 'yes') {;
__p += 'confirmed-negative ';
};
__p += ' ';
 if ( invite_attendee_role == 'no') {;
__p += 'confirmed-positive ';
};
__p += '" data-attendee_id="' +
__e( invite_attendee_id ) +
'">\r\n                        <button type=\'button\' class=\'btn form-control\' data-attendee_id="' +
__e( invite_attendee_id ) +
'">Not <i class="fa fa-check-mark"></i></button>\r\n                    </div>\r\n                ';
 } ;
__p += '\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["attendee_list_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="block block1 invite-background" data-id="' +
__e( unique_id ) +
'"\r\n        ';
 if (poster_image_id != null) {
            print("style='background-image: url(/image/" + poster_image_id + ")'")
        }
        else {
            print("style='background-image: url(/img/default_image.jpg)'")
        } ;
__p += '\r\n    >\r\n    <div class="center-block" data-id="' +
__e( unique_id ) +
'">\r\n        <h1 class="main-h1" data-id="' +
__e( unique_id ) +
'">' +
__e( title ) +
'</h1>\r\n\r\n        <div class="actions">\r\n            <div class="row">\r\n                ';
 if (invite_attendee_role == 'organizer') { ;
__p += '\r\n                    <div class="col-xs-6 col-md-6 no-padding">\r\n                        <button type=\'button\' class=\'btn btn-info form-control btn-duplicate\' data-id="' +
__e( unique_id ) +
'">Duplicate</button>\r\n                    </div>\r\n\r\n                    <div class="col-xs-6 col-md-6 no-padding edit-btn">\r\n                        <button type=\'button\' class=\'btn btn-info form-control btn-edit\' data-id="' +
__e( unique_id ) +
'">Edit</button>\r\n                    </div>\r\n                ';

                }
                else { ;
__p += '\r\n                    <div class="col-xs-6 col-md-6 no-padding btn-yes ';
 if ( invite_attendee_role == 'no') {;
__p += 'confirmed-negative ';
};
__p += ' ';
 if ( invite_attendee_role == 'yes') {;
__p += 'confirmed-positive ';
};
__p += '" data-attendee_id="' +
__e( invite_attendee_id ) +
'">\r\n\r\n                        <button type=\'button\' class=\'btn form-control\' data-attendee_id="' +
__e( invite_attendee_id ) +
'">Going <i class="fa fa-check-mark"></i> </button>\r\n                    </div>\r\n\r\n                    <div class="btn-group col-xs-6 col-md-6 no-padding btn-no ';
 if ( invite_attendee_role == 'yes') {;
__p += 'confirmed-negative ';
};
__p += ' ';
 if ( invite_attendee_role == 'no') {;
__p += 'confirmed-positive ';
};
__p += '" data-attendee_id="' +
__e( invite_attendee_id ) +
'">\r\n                        <button type=\'button\' class=\'btn form-control\' data-attendee_id="' +
__e( invite_attendee_id ) +
'">Not <i class="fa fa-check-mark"></i></button>\r\n                    </div>\r\n                ';
 } ;
__p += '\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>';

}
return __p
};

this["JST"]["contact_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal addContact-modal" tabindex="-1" >\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\r\n            <h4 class="modal-title" id="myModalLabel">\r\n                ';
 if(createMode) {;
__p += '\r\n                    Add New Contact\r\n              ';
} else { ;
__p += '\r\n                    Edit\r\n              ';
} ;
__p += '\r\n\r\n            </h4>\r\n            </div>\r\n            <div class="modal-body">\r\n                <div class="row">\r\n                    <div class="col-md-2">Name: </div>\r\n                    <div class="col-md-10">\r\n                        <input type="text" value="' +
__e(contact.name ) +
'" class="form-control contact_input" id="nameInput" placeholder="Jane Doe" data-validation="required">\r\n                    </div>\r\n                </div>\r\n                <div class="row">\r\n                    <div class="col-md-2">Phone: </div>\r\n                    <div class="col-md-10">\r\n                        <input type="text" value="' +
__e(contact.phone ) +
'" class="form-control contact_input" id="phoneInput" placeholder="000 000 0000" data-validation="phone">\r\n                    </div>\r\n                </div>\r\n                <div class="row">\r\n                    <div class="col-md-2">Email: </div>\r\n                    <div class="col-md-10">\r\n                        <input type="text" value="' +
__e(contact.email ) +
'" class="form-control contact_input" id="emailInput" placeholder="john.smith@example.com" data-validation="email">\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="small-margin-top"></div>\r\n\r\n                <div class="row">\r\n                    <div class="col-md-2">Groups: </div>\r\n                    <div class="col-md-10">\r\n                ';
 if(!createMode) {;
__p += '\r\n                        <div class="contact-groups"></div>\r\n                ';
} else { ;
__p += '\r\n                        <i>Create the contact first, then you can add it to groups</i>\r\n                ';
} ;
__p += '\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\r\n                <button type="button" class="btn btn-primary new-contact-btn">\r\n                    ';
 if(createMode) {;
__p += '\r\n                            Create\r\n                      ';
} else { ;
__p += '\r\n                            Update\r\n                      ';
} ;
__p += '\r\n                </button>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</div>';

}
return __p
};

this["JST"]["contact_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="contact-row" data-id="' +
__e( unique_id ) +
'" draggable="true">\r\n    <div class="editable contact-picture" data-id="' +
__e( unique_id ) +
'" >\r\n        <i class="fa fa-person fa-2x" data-id="' +
__e( unique_id ) +
'"></i>\r\n    </div>\r\n\r\n    <div class="contact-row-container" data-id="' +
__e( unique_id ) +
'">\r\n        <div class="contact-name" data-id="' +
__e( unique_id ) +
'">\r\n            ' +
__e( name ) +
'\r\n        </div>\r\n        <div class="contact-email" data-id="' +
__e( unique_id ) +
'">\r\n            ' +
__e( email ) +
'\r\n        </div>\r\n        <div class="contact-phone" data-id="' +
__e( unique_id ) +
'">\r\n            ' +
__e( phone ) +
'\r\n        </div>\r\n    </div>\r\n\r\n    <a class="update-contact" href="#"><i class="fa-pen fa-1_2x"></i></a>\r\n\r\n    <div class="editable contact-actions">\r\n        <a class="delete-contact" href="#"><i data-id="' +
__e( unique_id ) +
'" class="fa-delete-garbage-streamline fa-1_2x"></i></a>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["contact_item_typeahead.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="item-container" data-id="' +
__e( unique_id ) +
'">\r\n    <i class="fa fa-person fa-2x"></i>\r\n    <b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\r\n</div>';

}
return __p
};

this["JST"]["contacts.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="new-contact-container"></div>\r\n\r\n<div class="row no-margin contacts-header">\r\n\r\n    <h3 class="current-page">Contacts</h3>\r\n    <h3 ><a href="#" class="navigate-to-groups inactive-page">Groups</a></h3>\r\n\r\n    <a class="btn btn-success add-contact pull-right" href="contacts/new">New Contact</a>\r\n    <!--<a class="btn add-group pull-right" href="#">New Group</a>-->\r\n</div>\r\n\r\n<div class="row no-margin empty-contacts text-center small-margin-top">\r\n    ';
 if (contacts.length == 0) { ;
__p += '\r\n        You dont have any contacts. <a href="/new" type="button" class="btn add-contact">Create New!</a>\r\n    ';
} ;
__p += '\r\n</div>\r\n\r\n<div class="row small-margin-top no-margin contacts-table-container">\r\n\r\n    <div id="contacts_table" class="small-margin-top">\r\n\r\n        ';
 _.each( contacts, function( contact ){ ;
__p += '\r\n            ' +
((__t = ( partial('contact_item.html', contact) )) == null ? '' : __t) +
'\r\n        ';
 }); ;
__p += '\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["group_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal addGroup-modal" tabindex="-1" >\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\r\n            <h4 class="modal-title" id="myModalLabel">\r\n                ';
 if(createMode) {;
__p += '\r\n                    Add New Group\r\n              ';
} else { ;
__p += '\r\n                    Edit\r\n              ';
} ;
__p += '\r\n\r\n            </h4>\r\n            </div>\r\n            <div class="modal-body">\r\n                <div class="row">\r\n                    <div class="col-md-2">Name: </div>\r\n                    <div class="col-md-10">\r\n                        <input type="text" value="' +
__e(group.name ) +
'" class="form-control group_input" id="nameInput" placeholder="My Group" data-validation="required">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\r\n                <button type="button" class="btn btn-primary new-group-btn">\r\n                    ';
 if(createMode) {;
__p += '\r\n                            Create\r\n                      ';
} else { ;
__p += '\r\n                            Update\r\n                      ';
} ;
__p += '\r\n                </button>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</div>';

}
return __p
};

this["JST"]["group_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="group-row" data-id="' +
__e( unique_id ) +
'" draggable="true">\r\n    <div class="editable group-picture" data-id="' +
__e( unique_id ) +
'">\r\n        <i class="fa fa-organization fa-2x"></i>\r\n    </div>\r\n\r\n    <div class="group-row-container" data-id="' +
__e( unique_id ) +
'">\r\n        <div class="group-name" data-id="' +
__e( unique_id ) +
'">\r\n            ' +
__e( name ) +
'\r\n        </div>\r\n    </div>\r\n\r\n    <a class="update-group" href="#"><i class="fa-pen fa-1_2x"></i></a>\r\n\r\n    <div class="editable group-actions">\r\n        <a class="delete-group" href="#"><i data-id="' +
__e( unique_id ) +
'" class="fa-delete-garbage-streamline fa-1_2x"></i></a>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["group_item_typeahead.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="item-container" data-id="' +
__e( unique_id ) +
'">\r\n    <i class="fa fa-organization fa-2x"></i>\r\n    <b>' +
__e(name ) +
'</b>\r\n</div>';

}
return __p
};

this["JST"]["group_search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n<div class="contact-group-list col-md-12 no-padding">\r\n    ';
 _.each( contact.groups, function( group){ ;
__p += '\r\n        ' +
((__t = ( partial('group_item.html', group) )) == null ? '' : __t) +
'\r\n    ';
 }); ;
__p += '\r\n</div>\r\n\r\n';
 if(!searchMode) {;
__p += '\r\n    <a href=\'#\' class=\'add-to-group\'>+Add to Group</a>\r\n';
} else { ;
__p += '\r\n    <input type="text" class="group-input" />\r\n';
} ;


}
return __p
};

this["JST"]["groups.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="new-group-container"></div>\r\n\r\n<div class="row no-margin groups-header">\r\n    <h3><a href="#" class="navigate-to-contacts inactive-page">Contacts</a></h3>\r\n    <h3 class="current-page">Groups</h3>\r\n\r\n    <a class="btn btn-success add-group pull-right" href="#">New Group</a>\r\n</div>\r\n\r\n<div class="row no-margin empty-groups text-center small-margin-top">\r\n    ';
 if (groups.length == 0) { ;
__p += '\r\n        You dont have any groups. <a href="/new" type="button" class="btn add-group">Create New!</a>\r\n    ';
} ;
__p += '\r\n</div>\r\n\r\n<div class="row small-margin-top no-margin contacts-table-container">\r\n    <div id="groups_table" class="small-margin-top">\r\n        ';
 _.each( groups, function( group ){ ;
__p += '\r\n            ' +
((__t = ( partial('group_item.html', group) )) == null ? '' : __t) +
'\r\n        ';
 }); ;
__p += '\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\r\n    <div class="row">\r\n        <div id="invite-header"></div>\r\n    </div>\r\n    <div class="row no-margin">\r\n        <div id="invite-details" class="invite-subheader-banner palette-editable"></div>\r\n    </div>\r\n\r\n    <div class="row invite-body no-margin">\r\n        <div class="small-margin-top"></div>\r\n        <div class="col-md-1"/>\r\n        <div class="col-md-4 attendees">\r\n            <div id="invite-attendees">\r\n                <!--using invite_attendees.html subview-->\r\n            </div>\r\n        </div>\r\n        <div class="col-md-1"/>\r\n        <div class="col-md-5 hangout">\r\n            <div class="row desktop desktop-description">\r\n                <div class="col-md-12">\r\n                    <h4>Message from the host</h4>\r\n                    <div class="invite-description">' +
__e( description ) +
'</div>\r\n                </div>\r\n            </div>\r\n\r\n            <div id="invite-comments"></div>\r\n\r\n        </div>\r\n        <div class="col-md-1"/>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n';

}
return __p
};

this["JST"]["invite_admin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\r\n    <div class="row">\r\n        <div id="invite-header"></div>\r\n    </div>\r\n    <div class="row no-margin">\r\n        <div id="invite-details" class="invite-subheader-banner palette-editable"></div>\r\n    </div>\r\n\r\n    <div class="row invite-body no-margin">\r\n        <div class="small-margin-top"></div>\r\n        <div class="col-md-1"/>\r\n        <div class="col-md-4 attendees">\r\n            <div id="invite-new-attendee"></div>\r\n\r\n            <div id="invite-attendees">\r\n                <!--using invite_attendees.html subview-->\r\n            </div>\r\n        </div>\r\n        <div class="col-md-1"/>\r\n        <div class="col-md-5 hangout">\r\n            <div class="row desktop desktop-description">\r\n                <div class="col-md-12">\r\n                    <h4>Message from the host</h4>\r\n                    <div id="invite-description"></div>\r\n                </div>\r\n            </div>\r\n\r\n            <div id="invite-comments"></div>\r\n\r\n        </div>\r\n        <div class="col-md-1"/>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n';

}
return __p
};

this["JST"]["invite_attendee.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="details">\r\n    ';
 if(status == 'organizer') {;
__p += '\r\n        <b><i>Host</i></b>\r\n    ';
 } ;
__p += '\r\n    <b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\r\n</div>';

}
return __p
};

this["JST"]["invite_attendee_admin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<a href="#" class="edit-attendee" data-rowid="' +
__e( invite_attendee_id ) +
'" ';
 if(!notified) {;
__p += ' title="Pending for notification!" ';
 } ;
__p += ' >\r\n    <div class="details ';
 if(!notified) {;
__p += ' un_notified ';
 } ;
__p += '">\r\n        ';
 if(status == 'organizer') {;
__p += '\r\n            <b><i>Host</i></b>\r\n        ';
 } ;
__p += '\r\n        <i class="fa-pen fa-1x"></i>&nbsp;<b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\r\n        <p class="warning" title="Pending for notification">!</p>\r\n    </div>\r\n</a>';

}
return __p
};

this["JST"]["invite_attendee_create.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row rsvp no-margin">\r\n    <div class="panel panel-default no-border no-margin">\r\n      <div class="panel-heading no-padding palette-editable">Invite People</div>\r\n      <div class="panel-body  micro-margin-top">\r\n          <div>\r\n              <div class="col-md-10 col-xs-12 no-padding">\r\n                  <input type="text" class="contact-input form-control"\r\n                    ';
  if( features.indexOf('voice') != -1 )  { ;
__p += '\r\n                    data-validation=\'required,email|phone\' placeholder=\'Name, Phone Number, Email\'\r\n                    ';
 } else { ;
__p += '\r\n                    data-validation=\'required,email\' placeholder=\'Email Address\'\r\n                    ';
 } ;
__p += '>\r\n              </div>\r\n              <div class="col-md-2 col-xs-12 no-padding">\r\n                  <button type="button" class="btn new-contact-button">+</button>\r\n              </div>\r\n          </div>\r\n      </div>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["invite_attendees.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(attendee != null && attendee.status == 'organizer') {;
__p += '\r\n    <div id="new-contact-container" ></div>\r\n';
};
__p += '\r\n\r\n';
 if(attendee != null && attendee.status != 'organizer') {;
__p += '\r\n    <div class="row rsvp small-margin-top">\r\n          ';
 if(attendee.status != 'deleted') {;
__p += '\r\n            <div class="panel panel-default">\r\n              <div class="panel-heading palette-editable">\r\n                  ';
 if(attendee.status == 'no_response') {;
__p += '\r\n                        Are you coming?\r\n                  ';
} else if(attendee.status == 'no') { ;
__p += '\r\n                        Sad you can\'t attend :(\r\n                  ';
} else if(attendee.status == 'yes') { ;
__p += '\r\n                        Glad you\'re coming :)\r\n                  ';
} ;
__p += '\r\n              </div>\r\n\r\n              <div class="panel-body acknowledge-body">\r\n                <div class="col-md-6 yes-button">\r\n                    <button type="button" class="btn form-control btn-success invite-attendees-acknowledge-yes response-' +
__e( attendee.status ) +
'">YES<i class="fa fa-check-mark"></i></button>\r\n                </div>\r\n                <div class="col-md-6 no-button">\r\n                    <button type="button" class="btn form-control btn-danger invite-attendees-acknowledge-no response-' +
__e( attendee.status ) +
'">NO<i class="fa fa-check-mark"></i></button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          ';
} else if(attendee != null && attendee.status == 'deleted') {;
__p += '\r\n            <div class="panel panel-default">\r\n                <div class="panel-heading"></div>\r\n                  <div class="panel-body">\r\n                    <b>The organizer removed you from this event</b>\r\n                </div>\r\n            </div>\r\n          ';
} else if(attendee != null && attendee.status == 'organizer') {;
__p += '\r\n            <!-- Potentially also add people here -->\r\n          ';
} else{;
__p += '\r\n\r\n          ';
};
__p += '\r\n    </div>\r\n';
} ;
__p += '\r\n\r\n<div class="row rsvp no-margin">\r\n    <div class="panel panel-default no-border">\r\n      <div class="panel-heading yes palette-editable"> Who is coming? (' +
__e(confirmed.length) +
')</div>\r\n      <div class="panel-body">\r\n        ';
 _.each( confirmed, function( item ){ ;
__p += '\r\n            ';
 if(item.status != 'organizer' && edit_view && attendee != null && attendee.status == 'organizer') {;
__p += '\r\n                ' +
((__t = ( partial('invite_attendee_admin.html', item) )) == null ? '' : __t) +
'\r\n          ';
} else {;
__p += '\r\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\r\n          ';
} ;
__p += '\r\n        ';
 }); ;
__p += '\r\n      </div>\r\n   </div>\r\n\r\n    <div class="panel panel-default no-border">\r\n      <div class="panel-heading no palette-editable">Who is not coming? ';
 if(negated.length>0){;
__p += '(' +
__e(negated.length) +
')';
};
__p += '</div>\r\n      <div class="panel-body">\r\n        ';
 _.each( negated, function( item ){ ;
__p += '\r\n            ';
 if(edit_view && attendee != null && attendee.status == 'organizer') {;
__p += '\r\n                ' +
((__t = ( partial('invite_attendee_admin.html', item) )) == null ? '' : __t) +
'\r\n          ';
} else {;
__p += '\r\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\r\n          ';
} ;
__p += '\r\n        ';
 }); ;
__p += '\r\n      </div>\r\n   </div>\r\n\r\n    <div class="panel panel-default no-border">\r\n      <div class="panel-heading palette-editable">\r\n          Who is invited?\r\n          <button class="btn invited-recipients-notification pull-right hide" value="Notify !" data-toggle="tooltip" data-placement="bottom" title="We will only notify pending (!) attendees">\r\n              Notify <span id="total_pending_notifications">' +
__e( pending_notifications.total) +
'</span><span class="warning" title="Contacts pending for notification">!</span>\r\n          </button>\r\n      </div>\r\n      <div class="panel-body no-response-table">\r\n        ';
 _.each( no_response, function( item ){ ;
__p += '\r\n          ';
 if(edit_view && attendee != null && attendee.status == 'organizer') {;
__p += '\r\n                ' +
((__t = ( partial('invite_attendee_admin.html', item) )) == null ? '' : __t) +
'\r\n          ';
} else {;
__p += '\r\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\r\n          ';
} ;
__p += '\r\n        ';
 }); ;
__p += '\r\n      </div>\r\n   </div>\r\n\r\n\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["invite_attendees_invited_list_actionBox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal addContact-modal" tabindex="-1" >\r\n    <div class="modal-dialog">\r\n        <div class="modal-content">\r\n            <div class="modal-header">\r\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\r\n            <h4 class="modal-title" id="myModalLabel">\r\n                    Actions\r\n            </h4>\r\n            </div>\r\n            <div class="modal-body">\r\n                <div class="notify-all">\r\n                <div class=\'notify-all-btn btn btn btn-success\'>Notify again?</div>\r\n            </div>\r\n            </div>\r\n            <div class="modal-footer">\r\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\r\n                <button type="button" class="btn btn-primary new-contact-btn">\r\n                    ';
 if(createMode) {;
__p += '\r\n                            Create\r\n                      ';
} else { ;
__p += '\r\n                            Update\r\n                      ';
} ;
__p += '\r\n                </button>\r\n        </div>\r\n    </div>\r\n  </div>\r\n</div>';

}
return __p
};

this["JST"]["invite_comment.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\r\n    <span class="comment-date pull-right">' +
__e(on) +
'</span>\r\n    <div class="col-md-12 invite-comment-row" data-rowid="' +
__e( unique_id ) +
'">\r\n        <span class="comment-author">\r\n            ';
 if(author == null) {;
__p += '\r\n                Anonymous\r\n            ';
} else { ;
__p += '\r\n                ' +
__e(author) +
'\r\n            ';
 };
__p += '\r\n            </span> : ' +
__e(comment) +
'\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["invite_comment_box.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row comment-box" >\r\n    <div class="col-md-12 no-margin">\r\n        <input type="text" class="invite-comment-input"  placeholder="Add comment"></input>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["invite_comments.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row small-margin-top">\r\n    <div class="col-md-12 no-margin">\r\n        <h4>Comments</h4>\r\n    </div>\r\n</div>\r\n\r\n<div class="row no-margin comment-box">\r\n    ';
if(current_attendee != null){ ;
__p += '\r\n        ' +
((__t = ( partial('invite_comment_box.html', null) )) == null ? '' : __t) +
'\r\n    ';
} ;
__p += '\r\n</div>\r\n\r\n<div class="row invite-comments">\r\n    <div class="col-md-12 invite-comments-container">\r\n        ';
 _.each( comments, function( comment ){ ;
__p += '\r\n            ' +
((__t = ( partial('invite_comment.html', comment) )) == null ? '' : __t) +
'\r\n        ';
 }); ;
__p += '\r\n    </div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["invite_confirmation.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\r\n    A confirmation email was sent to:\r\n\r\n    Check your email and follow the instructions.\r\n</div>';

}
return __p
};

this["JST"]["invite_create.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="invite-create">\r\n    <div class="row no-margin event-title-row">\r\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2 text-center">\r\n            <h1>Create iMeet <i class="fa fa-paper-plane fa-1x"></i></h1>\r\n        </div>\r\n    </div>\r\n\r\n    ';
  if( anonymous )  { ;
__p += '\r\n        <div class="desktop row no-margin">\r\n            <div class="no-padding col-xs-12 col-md-8 col-md-offset-2 text-center">\r\n                <label class="small-text">\r\n                Note: For sms/calls to work, you have to be a registered User\r\n                <br/>\r\n                Note1: Your email is required, because you\'re not logged in\r\n                <br/>\r\n                Note2: Sms/calls will be free only during the beta phase. After that a subscription base fee will be offered\r\n                </label>\r\n            </div>\r\n        </div>\r\n    ';
 } ;
__p += '\r\n\r\n    <div class="row no-margin event-title-input-row">\r\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2">\r\n            <input type="text" class="form-control event-name-input valid-before-submit" placeholder="Event Title" autofocus data-validation="required" value="' +
__e(title) +
'" >\r\n        </div>\r\n    </div>\r\n\r\n    ';
  if( anonymous )  { ;
__p += '\r\n        <div class="row no-margin organizer-email-input-row">\r\n            <div class="no-padding col-xs-12 col-md-8 col-md-offset-2">\r\n                <input type="text" class="form-control organizer-email-input valid-before-submit" placeholder="Your Email" autofocus data-validation="required,email" value="' +
__e(organizer_email) +
'" >\r\n            </div>\r\n        </div>\r\n    ';
};
__p += '\r\n\r\n    <div class="row no-margin location-input-row">\r\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2">\r\n              <input type="text" class="form-control event-location-input" placeholder="Location...."  >\r\n        </div>\r\n    </div>\r\n\r\n    <div class="mobile tablet row no-margin from-event-date-row">\r\n        <div class="no-padding col-xs-12 col-md-2 text-center label-text text-center">\r\n            <h1>From</h1>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin event-date-row">\r\n        <div class="no-padding date-group col-xs-12 col-md-3 col-md-offset-2" id="start-date-group">\r\n            <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000" data-validation="required,date"  value="' +
__e(start_date ) +
'">\r\n            <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required"  value="' +
__e(start_time ) +
'">\r\n        </div>\r\n\r\n        <div class="no-padding col-xs-12 col-md-2 text-center to-event-date-row">\r\n            <h1>To</h1>\r\n        </div>\r\n\r\n        <div class="no-padding date-group col-xs-12  col-md-3 end-event-date-input-row" id="end-date-group">\r\n            <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000" value="' +
__e(end_date ) +
'">\r\n            <input readonly="true" required type="text" class="time event-end-time" placeholder="00:00 AM"  value="' +
__e(end_time ) +
'">\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <div class="row desktop no-margin description-row">\r\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2 ">\r\n          <textarea class="form-control event-description-input" rows="6"></textarea>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <!--<div class="no-margin">-->\r\n        <!--<div class="no-padding col-xs-12  col-md-3 col-md-offset-2">-->\r\n            <!--<div class=" facebook_share pull-right" style="display: inline-block">-->\r\n                <!--<div>Share on Facebook</div>-->\r\n                <!--<div><input type="checkbox"-->\r\n                   <!--data-toggle="toggle"-->\r\n                   <!--id="bt_toggle"-->\r\n                   <!--class="share_to_facebook"-->\r\n                   <!--data-style="android"-->\r\n                   <!--data-on=" " data-off=" "-->\r\n                   <!--data-onstyle="info"-->\r\n                   <!--data-onstyle="success" data-offstyle="danger" />-->\r\n                <!--</div>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n    <!--</div>-->\r\n\r\n    <div class="row no-margin button-row">\r\n        <div class="no-padding text-center col-xs-12  col-md-8 col-md-offset-2">\r\n            <button type="button" class="btn form-control btn-success send">Create</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["invite_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n\r\n\r\n\r\n<div class="row no-margin">\r\n    <div class="col-md-2 no-padding"></div>\r\n\r\n    <div class=\'col-md-2 col-xs-12 no-padding\'>\r\n        <div class="title">Start</div>\r\n        ';
  if( !is_edit )  { ;
__p += '\r\n        <div class="' +
__e( editable_class) +
' details invite-date pull-left" style="">' +
__e( start_date ) +
' ' +
__e( start_time ) +
'\r\n            <i class="fa fa-pen pull-right"></i>\r\n        </div>            \r\n        ';
 } else { ;
__p += '\r\n        <div class="date-group" id="start-date-group">\r\n            <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000" data-validation="required,date"  value="' +
__e(start_date ) +
'">\r\n            <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required"  value="' +
__e(start_time ) +
'">\r\n        </div>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n\r\n    <div class=\'col-md-2  col-xs-12 no-padding\'>\r\n        <div class="title">End</div>\r\n        ';
  if( !is_edit )  { ;
__p += '\r\n        <div class="' +
__e( editable_class) +
' details invite-end-date pull-left">\r\n            ' +
__e( end_date ) +
' ' +
__e( end_time ) +
'\r\n            <i class="fa fa-pen pull-right"></i>\r\n        </div>\r\n        ';
 } else { ;
__p += '\r\n        <div class="date-group" id="end-date-group">\r\n            <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000" data-validation="date"  value="' +
__e(end_date ) +
'">\r\n            <input readonly="true" required type="int" class="time event-end-time" placeholder="00:00 AM" data-validation="required"  value="' +
__e(end_time ) +
'">\r\n        </div>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n\r\n    <div class=\'col-md-4 col-xs-12 invite-location-container no-padding\'>\r\n        ';
  if( !is_edit )  { ;
__p += '\r\n        <div class="' +
__e( editable_class) +
' details">\r\n            <div class="location-image pull-left"><i class="fa fa-map-pin-streamline fa-1x"></i></div>\r\n            <div id="invite-location" class="title pull-left">\r\n                ';
 if (where) {;
__p += '\r\n                <a href="https://www.google.com/maps/place/' +
__e( where ) +
'" target="_blank">' +
__e( where ) +
'</a>\r\n                ';
 } else {;
__p += '\r\n                Click to add location\r\n                ';
};
__p += '\r\n                <i class="fa fa-pen pull-right"></i>\r\n            </div>\r\n        </div>\r\n        ';
 } else { ;
__p += '\r\n        <div class="title">Location</div>\r\n        <div><input type="text" class="form-control event-location-input" placeholder="Location...."  ></div>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n</div>\r\n\r\n';
 if( is_admin ) { ;
__p += '\r\n<div class="row no-margin second-row">\r\n    <div class="col-md-2 no-padding"></div>\r\n\r\n    <div class=\'col-md-2 col-xs-12 no-padding invite-palette\'>\r\n        <div class="title">Background</div>    \r\n        ';
  if( !is_edit )  { ;
__p += '\r\n        <div class=" ' +
__e( editable_class) +
' details pull-left">\r\n            <div class="palette-item pull-left" style="background-color: #607D8B"></div>\r\n            <div class="palette-item pull-left" style="background-color: #0D47A1"></div>\r\n            <div class="palette-item pull-left" style="background-color: #2196F3"></div>\r\n            <div class="palette-item pull-left" style="background-color: #A5D6A7"></div>\r\n            ';
 } ;
__p += '\r\n        </div>    \r\n    </div>\r\n</div>\r\n<div id="palette-container" class="row no-margin"></div>\r\n';
 } ;
__p += '\r\n\r\n\r\n<div id="invite-details-container" class="details-row ';
  if( is_edit ) { ;
__p += ' clickable edit';
 } ;
__p += '">\r\n    ';
  if( is_admin )  { ;
__p += '\r\n    <div class="row">\r\n        <div class=\'col-md-12 col-xs-12 edit_button_container\'>\r\n            ';
  if( is_edit )  { ;
__p += '\r\n            <button class="btn btn-success save_invite">Save</button>\r\n            ';
 } ;
__p += '\r\n        </div>\r\n        ';
 } ;
__p += '\r\n    </div>\r\n\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["invite_header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="block block1 invite-background"\r\n     ';
 if (poster_image_id != null) {
         print("style='background-image: url(/image/" + poster_image_id + ")'")
    }
    else {
         print("style='background-image: url(/img/default_image.jpg)'")
    } ;
__p += '\r\n>\r\n    <div class="center-block">\r\n       <div class="invite-title-container">\r\n       </div>\r\n       <div class="upload">\r\n            <form id="upload_image_form" data-id="' +
__e( unique_id ) +
'" method="POST" enctype="multipart/form-data">\r\n                <input type="file" name="upload_image_file" id="upload_image_file" >\r\n            </form>\r\n            <button id="image_select_btn" class="btn btn-success">Change cover</button>\r\n       </div>\r\n\r\n    </div>\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["invite_search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\r\n<div id="search-view">\r\n\r\n    <div class="row no-margin desktop">\r\n        <div class="col-sm-10 no-padding">\r\n            <input id="searchBox" type="text" class="form-control event-name" placeholder="Invite Title" data-validation="required">\r\n        </div>\r\n\r\n        <div class="col-sm-2 no-padding">\r\n            <button type="button" class="btn btn-success form-control search">Search</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin filter-row">\r\n        <div class="navigator">\r\n            <div><a href="" class="filter unread" data-filter="unread">Unread</a></div>\r\n            <div>|</div>\r\n            <div><a href="" class="filter accepted" data-filter="accepted">Accepted</a></div>\r\n            <div>|</div>\r\n            <div><a href="" class="filter denied" data-filter="denied">Denied</a></div>\r\n            <div>|</div>\r\n            <div><a href="" class="filter hosting" data-filter="host">Hosting</a> </div>\r\n            <div>|</div>\r\n            <div><a href="" class="filter all" data-filter="">All</a> </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="controls" id="search-result">\r\n        ';
 if (invites.length == 0) { ;
__p += '\r\n            Your search didn\'t resolved any iMeets. <a href="/new" type="button" class="btn btn-success">Start sending!</a>\r\n        ';

        } ;
__p += '\r\n        ';
 _.each( invites, function( item ){ ;
__p += '\r\n            ';
 if (item.invite_attendee_role == 'organizer') { ;
__p += '\r\n                ' +
((__t = ( partial('attendee_host_list_item.html', item) )) == null ? '' : __t) +
'\r\n            ';

            } else { ;
__p += '\r\n                ' +
((__t = ( partial('attendee_list_item.html', item) )) == null ? '' : __t) +
'\r\n            ';
 } ;
__p += '\r\n\r\n        ';
 }); ;
__p += '\r\n    </div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["invite_sent.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal-content">\r\n    <form id="registerForm">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class="container">\r\n            <div class="row">\r\n                Invite Link <a href="http://imeet.io/invite/';
  print(invite_id) ;
__p += '"><h5 class="text-lowercase">http://imeet.io/invite/';
  print(invite_id) ;
__p += '</h5></a>\r\n            </div>\r\n            <div class="row small-margin-top"></div>\r\n            <div class="row">\r\n               Register\r\n               <div class="controls">\r\n                   <div class="col-sm-3"></div>\r\n                    <div class="col-sm-6">\r\n                        <div class="col-sm-9">\r\n                            <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\r\n                        </div>\r\n                        <div class="col-sm-3">\r\n                            <button type="button" class="btn btn-success form-control submit-register">Go</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class="col-sm-3"></div>\r\n                </div>\r\n           </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n';

}
return __p
};

this["JST"]["login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="login-page">\r\n<form id="loginForm" action="/login" method="post">\r\n\r\n<div class="login-box">\r\n    <div class="row no-margin text-center">\r\n        <div class="no-padding col-md-6 col-xs-6">\r\n             <a href="/login/social/facebook" class="btn btn-facebook ">\r\n              <div class="text">Login with Facebook</div>\r\n              <div class="letter">\r\n                <i class="fa fa-facebook fa-2x"></i>\r\n              </div>\r\n            </a>\r\n        </div>\r\n        <div class="no-padding col-md-6 col-xs-6">\r\n            <a href="/login/social/google"  class="btn btn-google">\r\n                <div class="text">\r\n                    Login with Google\r\n                </div>\r\n                <div class="letter">\r\n                    <i class="fa fa-google fa-2x"></i>\r\n                </div>\r\n            </a>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="row no-margin">\r\n        <div class="no-padding col-md-12 section-item contact-table equidistant">\r\n          <h4>Have an account with us?</h4>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin">\r\n        <div class="no-padding col-md-12">\r\n            <input id="username" name="username" required type="text" class="form-control " placeholder="Username">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin">\r\n        <div class="no-padding col-md-12">\r\n            <input id="password" name="password" required type="password" class="form-control " placeholder="Password">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin">\r\n        <div class="no-padding col-md-12">\r\n            <label class="remember pull-right" style="padding: 10px">\r\n                Remember me?\r\n                <input type="checkbox" name="remember_me" id="remember_me" value="on">\r\n              </label>\r\n        </div>\r\n    </div>\r\n\r\n     <div class="row no-margin">\r\n          <div class="col-sm-12 no-padding">\r\n              <button type="submit" class="btn btn-success form-control pull-right">Login</button>\r\n          </div>\r\n      </div>\r\n\r\n    <div class="row no-margin">\r\n        <div class="no-padding col-md-12">\r\n            <label class="remember pull-right">\r\n              Don\'t have an account?\r\n              <a href="" class="btn signup">Sign Up - It\'s Free.</a>\r\n            </label>\r\n        </div>\r\n    </div>\r\n</div>\r\n</form>\r\n</div>';

}
return __p
};

this["JST"]["palette.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="palette-modal">\r\n    <div class="row no-margin palette">\r\n        ';
 _.each( palettes, function( item ){ ;
__p += '\r\n          <div class="palette-item" style="background-color: ' +
__e( item.main_bg_color ) +
'" data-id="' +
__e( item.unique_id ) +
'"></div>\r\n        ';
 }); ;
__p += '\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["profile_edit.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="edit-profile-view">\r\n\r\n    <div class="row no-margin">\r\n        <div class="col-xs-12 no-padding">\r\n           <h4>Edit your profile</h4>\r\n       </div>\r\n    </div>\r\n\r\n    <div class="row no-margin">\r\n       <div class="col-xs-12 no-padding">\r\n           <div id="edit-profile-email"></div>\r\n       </div>\r\n    </div>\r\n\r\n    <div class="row no-margin">\r\n       <div class="col-xs-12 no-padding">\r\n        <input id="edit-profile-name" type="text" class="form-control valid-before-submit" placeholder="John Smith..." data-validation="required">\r\n       </div>\r\n    </div>\r\n\r\n    <div class="row no-margin username-row">\r\n        <div class="col-xs-12 no-padding">\r\n            <input id="edit-profile-username" type="text" class="form-control valid-before-submit" placeholder="username..." data-validation="required">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin password-row">\r\n        <div class="col-xs-12 no-padding">\r\n            <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control" placeholder="password...">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin">\r\n        <div class="col-xs-12 no-padding">\r\n            <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control" placeholder=" confirm password...">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="row no-margin button-row">\r\n        <div class="col-xs-12 no-padding">\r\n            <button type=\'button\' class=\'save-profile btn btn-info form-control\'>Save</button>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="register">\r\n    <div class="block block1 register-background">\r\n        <div class="center-block">\r\n          <h1 class="main-h1">Make the jump! Join the Fun</h1>\r\n        </div>\r\n    </div>\r\n\r\n\r\n\r\n    <div class="row no-margin register-box-parent">\r\n        <div class="register-box">\r\n            <div class="input-div"><input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="required,email"></div>\r\n            <div class="button-div"><button type="button" class="btn btn-success form-control submit-register">Register</button></div>\r\n        </div>\r\n    </div>\r\n</div>';

}
return __p
};