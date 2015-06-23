this["JST"] = this["JST"] || {};

this["JST"]["add-group.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal addGroup-modal" tabindex="-1" >\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\n            <h4 class="modal-title" id="myModalLabel">Add New Group</h4>\n            </div>\n            <div class="modal-body">\n                <input type="text" class="form-control new-group-input" />\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\n                <button type="button" class="btn btn-primary new-group-btn">Create</button>\n        </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["contact_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal addContact-modal" tabindex="-1" >\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\n            <h4 class="modal-title" id="myModalLabel">\n                ';
 if(createMode) {;
__p += '\n                    Add New Contact\n              ';
} else { ;
__p += '\n                    Edit\n              ';
} ;
__p += '\n\n            </h4>\n            </div>\n            <div class="modal-body">\n                <div class="row">\n                    <div class="col-md-2">Name: </div>\n                    <div class="col-md-10">\n                        <input type="text" value="' +
__e(contact.name ) +
'" class="form-control contact_input" id="nameInput" placeholder="Jane Doe" data-validation="required">\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-md-2">Phone: </div>\n                    <div class="col-md-10">\n                        <input type="text" value="' +
__e(contact.phone ) +
'" class="form-control contact_input" id="phoneInput" placeholder="000 000 0000" data-validation="phone">\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-md-2">Email: </div>\n                    <div class="col-md-10">\n                        <input type="text" value="' +
__e(contact.email ) +
'" class="form-control contact_input" id="emailInput" placeholder="john.smith@example.com" data-validation="email">\n                    </div>\n                </div>\n\n                <div class="small-margin-top"></div>\n\n                <div class="row">\n                    <div class="col-md-2">Groups: </div>\n                    <div class="col-md-10">\n                ';
 if(!createMode) {;
__p += '\n                        <div class="contact-groups"></div>\n                ';
} else { ;
__p += '\n                        <i>Create the contact first, then you can add it to groups</i>\n                ';
} ;
__p += '\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\n                <button type="button" class="btn btn-primary new-contact-btn">\n                    ';
 if(createMode) {;
__p += '\n                            Create\n                      ';
} else { ;
__p += '\n                            Update\n                      ';
} ;
__p += '\n                </button>\n        </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["contact_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="contact-row" data-id="' +
__e( unique_id ) +
'" draggable="true">\n    <div class="editable contact-picture" >\n        <i class="fa fa-person fa-2x"></i>\n    </div>\n\n    <div class="contact-row-container">\n        <div class="contact-name" >\n            ' +
__e( name ) +
'\n        </div>\n        <div class="contact-email" >\n            ' +
__e( email ) +
'\n        </div>\n        <div class="contact-phone" >\n            ' +
__e( phone ) +
'\n        </div>\n    </div>\n\n    <a class="update-contact" href="#"><i class="fa-pen fa-1_2x"></i></a>\n\n    <div class="editable contact-actions">\n        <a class="delete-contact" href="#"><i data-id="' +
__e( unique_id ) +
'" class="fa-delete-garbage-streamline fa-1_2x"></i></a>\n    </div>\n</div>';

}
return __p
};

this["JST"]["contact_item_typeahead.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="item-container" data-id="' +
__e( unique_id ) +
'">\n    <i class="fa fa-person fa-2x"></i>\n    <b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\n</div>';

}
return __p
};

this["JST"]["contacts.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="new-contact-container"></div>\n\n<div class="row no-margin contacts-header">\n\n    <h3 class="current-page">Contacts</h3>\n    <h3 ><a href="#" class="navigate-to-groups inactive-page">Groups</a></h3>\n\n    <a class="btn btn-success add-contact pull-right" href="contacts/new">New Contact</a>\n    <!--<a class="btn add-group pull-right" href="#">New Group</a>-->\n</div>\n\n<div class="row small-margin-top no-margin contacts-table-container">\n    <div id="contacts_table" class="small-margin-top"></div>\n</div>';

}
return __p
};

this["JST"]["group_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal addGroup-modal" tabindex="-1" >\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\n            <h4 class="modal-title" id="myModalLabel">\n                ';
 if(createMode) {;
__p += '\n                    Add New Group\n              ';
} else { ;
__p += '\n                    Edit\n              ';
} ;
__p += '\n\n            </h4>\n            </div>\n            <div class="modal-body">\n                <div class="row">\n                    <div class="col-md-2">Name: </div>\n                    <div class="col-md-10">\n                        <input type="text" value="' +
__e(group.name ) +
'" class="form-control group_input" id="nameInput" placeholder="My Group" data-validation="required">\n                    </div>\n                </div>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\n                <button type="button" class="btn btn-primary new-group-btn">\n                    ';
 if(createMode) {;
__p += '\n                            Create\n                      ';
} else { ;
__p += '\n                            Update\n                      ';
} ;
__p += '\n                </button>\n        </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["group_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="group-row" data-id="' +
__e( unique_id ) +
'" draggable="true">\n    <div class="editable group-picture" >\n        <i class="fa fa-organization fa-2x"></i>\n    </div>\n\n    <div class="group-row-container">\n        <div class="group-name" >\n            ' +
__e( name ) +
'\n        </div>\n    </div>\n\n    <a class="update-group" href="#"><i class="fa-pen fa-1_2x"></i></a>\n\n    <div class="editable group-actions">\n        <a class="delete-group" href="#"><i data-id="' +
__e( unique_id ) +
'" class="fa-delete-garbage-streamline fa-1_2x"></i></a>\n    </div>\n</div>';

}
return __p
};

this["JST"]["group_item_typeahead.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="item-container" data-id="' +
__e( unique_id ) +
'">\n    <i class="fa fa-organization fa-2x"></i>\n    <b>' +
__e(name ) +
'</b>\n</div>';

}
return __p
};

this["JST"]["group_search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n<div class="contact-group-list col-md-12 no-padding">\n    ';
 _.each( contact.groups, function( group){ ;
__p += '\n        ' +
((__t = ( partial('group_item.html', group) )) == null ? '' : __t) +
'\n    ';
 }); ;
__p += '\n</div>\n\n';
 if(!searchMode) {;
__p += '\n    <a href=\'#\' class=\'add-to-group\'>+Add to Group</a>\n';
} else { ;
__p += '\n    <input type="text" class="group-input" />\n';
} ;


}
return __p
};

this["JST"]["groups.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="new-group-container"></div>\n\n<div class="row no-margin groups-header">\n    <h3><a href="#" class="navigate-to-contacts inactive-page">Contacts</a></h3>\n    <h3 class="current-page">Groups</h3>\n\n    <a class="btn btn-success add-group pull-right" href="#">New Group</a>\n</div>\n\n<div class="row small-margin-top no-margin contacts-table-container">\n    <div id="groups_table" class="small-margin-top"></div>\n</div>';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\n    <div class="row">\n        <div id="invite-header"></div>\n    </div>\n    <div class="row no-margin">\n        <div id="invite-details" class="invite-subheader-banner palette-editable"></div>\n    </div>\n\n    <div class="row invite-body no-margin">\n        <div class="small-margin-top"></div>\n        <div class="col-md-1"/>\n        <div class="col-md-4 attendees">\n            <div id="invite-attendees">\n                <!--using invite_attendees.html subview-->\n            </div>\n        </div>\n        <div class="col-md-1"/>\n        <div class="col-md-5 hangout">\n            <div class="row small-margin-top desktop desktop-description">\n                <div class="col-md-12">\n                    <h4>Message from the host</h4>\n                    <div class="invite-description"/>\n                </div>\n            </div>\n\n            <div id="invite-comments"></div>\n\n        </div>\n        <div class="col-md-1"/>\n    </div>\n</div>\n\n\n\n';

}
return __p
};

this["JST"]["invite_admin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\n    <div class="row">\n        <div id="invite-header"></div>\n    </div>\n    <div class="row no-margin">\n        <div id="invite-details" class="invite-subheader-banner palette-editable"></div>\n    </div>\n\n    <div class="row invite-body no-margin">\n        <div class="small-margin-top"></div>\n        <div class="col-md-1"/>\n        <div class="col-md-4 attendees">\n            <div class="notify-all">\n                Want to let people know? <div class=\'notify-all-btn btn btn btn-success\'>Notify All</div>\n            </div>\n\n            <div id="invite-new-attendee"></div>\n\n            <div id="invite-attendees">\n                <!--using invite_attendees.html subview-->\n            </div>\n        </div>\n        <div class="col-md-1"/>\n        <div class="col-md-5 hangout">\n            <div class="row small-margin-top desktop desktop-description">\n                <div class="col-md-12">\n                    <h4>Message from the host</h4>\n                    <div id="invite-description"/>\n                </div>\n            </div>\n\n            <div id="invite-comments"></div>\n\n        </div>\n        <div class="col-md-1"/>\n    </div>\n</div>\n\n\n\n\n';

}
return __p
};

this["JST"]["invite_attendee.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="details">\n    ';
 if(status == 'organizer') {;
__p += '\n        <b><i>Host</i></b>\n    ';
 } ;
__p += '\n    <b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\n</div>';

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
'" >\n    <div class="details">\n        ';
 if(status == 'organizer') {;
__p += '\n            <b><i>Host</i></b>\n        ';
 } ;
__p += '\n        <i class="fa-pen fa-1x"></i>&nbsp;<b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\n    </div>\n</a>';

}
return __p
};

this["JST"]["invite_attendee_create.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row rsvp no-margin">\n    <div class="panel panel-default no-border no-margin">\n      <div class="panel-heading no-padding palette-editable">Invite People</div>\n      <div class="panel-body  micro-margin-top">\n          <div>\n              <div class="col-md-10 col-xs-12 no-padding">\n                  <input type="text" class="contact-input form-control"\n                    ';
  if( features.indexOf('voice') != -1 )  { ;
__p += '\n                    data-validation=\'required,email|phone\' placeholder=\'Name, Phone Number, Email\'\n                    ';
 } else { ;
__p += '\n                    data-validation=\'required,email\' placeholder=\'Email Address\'\n                    ';
 } ;
__p += '>\n              </div>\n              <div class="col-md-2 col-xs-12 no-padding">\n                  <button type="button" class="btn new-contact-button">+</button>\n              </div>\n          </div>\n      </div>\n    </div>\n</div>';

}
return __p
};

this["JST"]["invite_attendees.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(attendee != null && attendee.status == 'organizer') {;
__p += '\n    <div id="new-contact-container" ></div>\n';
};
__p += '\n\n';
 if(attendee != null && attendee.status != 'organizer') {;
__p += '\n    <div class="row rsvp small-margin-top">\n          ';
 if(attendee.status != 'deleted') {;
__p += '\n            <div class="panel panel-default">\n              <div class="panel-heading palette-editable">\n                  ';
 if(attendee.status == 'no_response') {;
__p += '\n                        Are you coming?\n                  ';
} else if(attendee.status == 'no') { ;
__p += '\n                        Sad you can\'t attend :(\n                  ';
} else if(attendee.status == 'yes') { ;
__p += '\n                        Glad you\'re coming :)\n                  ';
} ;
__p += '\n              </div>\n\n              <div class="panel-body acknowledge-body">\n                <div class="col-md-6 yes-button">\n                    <button type="button" class="btn form-control btn-success invite-attendees-acknowledge-yes response-' +
__e( attendee.status ) +
'">YES</button>\n                </div>\n                <div class="col-md-6 no-button">\n                    <button type="button" class="btn form-control btn-danger invite-attendees-acknowledge-no response-' +
__e( attendee.status ) +
'">NO</button>\n                </div>\n              </div>\n            </div>\n          ';
} else if(attendee != null && attendee.status == 'deleted') {;
__p += '\n            <div class="panel panel-default">\n                <div class="panel-heading"></div>\n                  <div class="panel-body">\n                    <b>The organizer removed you from this event</b>\n                </div>\n            </div>\n          ';
} else if(attendee != null && attendee.status == 'organizer') {;
__p += '\n            <!-- Potentially also add people here -->\n          ';
} else{;
__p += '\n\n          ';
};
__p += '\n    </div>\n';
} ;
__p += '\n\n<div class="row rsvp no-margin">\n    <div class="panel panel-default no-border">\n      <div class="panel-heading yes palette-editable"> Who is coming? (' +
__e(confirmed.length) +
')</div>\n      <div class="panel-body">\n        ';
 _.each( confirmed, function( item ){ ;
__p += '\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n      </div>\n   </div>\n\n    <div class="panel panel-default no-border">\n      <div class="panel-heading no palette-editable">Who is not coming? ';
 if(negated.length>0){;
__p += '(' +
__e(negated.length) +
')';
};
__p += '</div>\n      <div class="panel-body">\n        ';
 _.each( negated, function( item ){ ;
__p += '\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n      </div>\n   </div>\n\n    <div class="panel panel-default no-border">\n      <div class="panel-heading palette-editable">\n          Who is invited?\n\n      </div>\n      <div class="panel-body no-response-table">\n        ';
 _.each( no_response, function( item ){ ;
__p += '\n          ';
 if(edit_view && attendee != null && attendee.status == 'organizer') {;
__p += '\n                ' +
((__t = ( partial('invite_attendee_admin.html', item) )) == null ? '' : __t) +
'\n          ';
} else {;
__p += '\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\n          ';
} ;
__p += '\n        ';
 }); ;
__p += '\n      </div>\n   </div>\n\n\n</div>\n\n';

}
return __p
};

this["JST"]["invite_comment.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row ">\n    <span class="comment-date pull-right">' +
__e(on) +
'</span>\n    <div class="col-md-12 invite-comment-row">\n        <span class="comment-author">\n            ';
 if(author == null) {;
__p += '\n                Anonymous\n            ';
} else { ;
__p += '\n                ' +
__e(author) +
'\n            ';
 };
__p += '\n            </span> : ' +
__e(comment) +
'\n    </div>\n</div>';

}
return __p
};

this["JST"]["invite_comment_box.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row comment-box" >\n    <div class="col-md-12 no-margin">\n        <textarea class="invite-comment-input"  placeholder="Add comment"></textarea>\n    </div>\n</div>\n\n<div class="row comment-box">\n    <div class="col-md-6 no-margin">\n        <button type="button" class="btn form-control btn-success add-comment">Add Comment</button>\n    </div>\n</div>';

}
return __p
};

this["JST"]["invite_comments.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row small-margin-top">\n    <div class="col-md-12 no-margin">\n        <h4>Comments</h4>\n    </div>\n</div>\n\n<div class="row no-margin comment-box">\n    ';
if(current_attendee != null){ ;
__p += '\n        ' +
((__t = ( partial('invite_comment_box.html', null) )) == null ? '' : __t) +
'\n    ';
} ;
__p += '\n</div>\n\n<div class="row invite-comments">\n    <div class="col-md-12 invite-comments-container">\n        ';
 _.each( comments, function( comment ){ ;
__p += '\n            ' +
((__t = ( partial('invite_comment.html', comment) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["invite_create.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="invite-create">\n    <div class="row no-margin event-title-row">\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2 text-center">\n            <h1>Create iMeet <i class="fa fa-paper-plane fa-1x"></i></h1>\n        </div>\n    </div>\n\n    ';
  if( currentUser == null )  { ;
__p += '\n        <div class="desktop row no-margin">\n            <div class="no-padding col-xs-12 col-md-8 col-md-offset-2 text-center">\n                <label class="small-text">\n                Note: For sms/calls to work, you have to be a registered\n                <br/>\n                Note2: Sms/calls will be free only during the beta phase. After that a subscription base fee will be offered\n                </label>\n            </div>\n        </div>\n    ';
 } ;
__p += '\n\n    <div class="row no-margin event-title-input-row">\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2">\n            <input type="text" class="form-control event-name-input valid-before-submit" placeholder="Event Title" autofocus data-validation="required" value="' +
__e(title) +
'" >\n        </div>\n    </div>\n\n    <div class="row no-margin location-input-row">\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2">\n              <input type="text" class="form-control event-location-input" placeholder="Location...."  >\n        </div>\n    </div>\n\n    <div class="mobile tablet row no-margin from-event-date-row">\n        <div class="no-padding col-xs-12 col-md-2 text-center label-text text-center">\n            <h1>From</h1>\n        </div>\n    </div>\n\n    <div class="row no-margin event-date-row">\n        <div class="no-padding date-group col-xs-12 col-md-3 col-md-offset-2" id="start-date-group">\n            <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000" data-validation="required,date"  value="' +
__e(start_date ) +
'">\n            <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required"  value="' +
__e(start_time ) +
'">\n        </div>\n\n        <div class="no-padding col-xs-12 col-md-2 text-center to-event-date-row">\n            <h1>To</h1>\n        </div>\n\n        <div class="no-padding date-group col-xs-12  col-md-3 end-event-date-input-row" id="end-date-group">\n            <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000" value="' +
__e(end_date ) +
'">\n            <input readonly="true" required type="text" class="time event-end-time" placeholder="00:00 AM"  value="' +
__e(end_time ) +
'">\n        </div>\n\n    </div>\n\n    <div class="row desktop no-margin description-row">\n        <div class="no-padding col-xs-12 col-md-8 col-md-offset-2 ">\n          <textarea class="form-control event-description-input" rows="6"></textarea>\n        </div>\n    </div>\n\n\n    <!--<div class="no-margin">-->\n        <!--<div class="no-padding col-xs-12  col-md-3 col-md-offset-2">-->\n            <!--<div class=" facebook_share pull-right" style="display: inline-block">-->\n                <!--<div>Share on Facebook</div>-->\n                <!--<div><input type="checkbox"-->\n                   <!--data-toggle="toggle"-->\n                   <!--id="bt_toggle"-->\n                   <!--class="share_to_facebook"-->\n                   <!--data-style="android"-->\n                   <!--data-on=" " data-off=" "-->\n                   <!--data-onstyle="info"-->\n                   <!--data-onstyle="success" data-offstyle="danger" />-->\n                <!--</div>-->\n            <!--</div>-->\n        <!--</div>-->\n    <!--</div>-->\n\n    <div class="row no-margin button-row">\n        <div class="no-padding text-center col-xs-12  col-md-8 col-md-offset-2">\n            <button type="button" class="btn form-control btn-success send">Create</button>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["invite_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n\n<div id="invite-details-container" class="details-row ';
  if( is_edit ) { ;
__p += ' clickable edit';
 } ;
__p += '">\n';
  if( is_admin )  { ;
__p += '\n    <div class="row">\n        <div class=\'col-md-12 col-xs-12 edit_button_container\'>\n        ';
  if( !is_edit )  { ;
__p += '\n            <button class="btn btn-success edit_invite">Edit iMeet</button>\n         ';
 } else { ;
__p += '\n            <button class="btn btn-success save_invite">Save</button>\n         ';
 } ;
__p += '\n    </div>\n';
 } ;
__p += '\n\n\n</div>\n\n<div class="row no-margin">\n    <div class="col-md-2 no-padding"></div>\n\n    <div class=\'col-md-2 col-xs-12 no-padding\'>\n        <div class="title">Start</div>\n        ';
  if( !is_edit )  { ;
__p += '\n            <div class="details invite-date">' +
__e( start_date ) +
' ' +
__e( start_time ) +
'</div>\n        ';
 } else { ;
__p += '\n            <div class="date-group" id="start-date-group">\n                <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000" data-validation="required,date"  value="' +
__e(start_date ) +
'">\n                <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required"  value="' +
__e(start_time ) +
'">\n            </div>\n        ';
 } ;
__p += '\n    </div>\n\n    <div class=\'col-md-2  col-xs-12 no-padding\'>\n        <div class="title">End</div>\n        ';
  if( !is_edit )  { ;
__p += '\n            <div class="details invite-end-date">' +
__e( end_date ) +
' ' +
__e( end_time ) +
'</div>\n        ';
 } else { ;
__p += '\n            <div class="date-group" id="end-date-group">\n                <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000" data-validation="date"  value="' +
__e(end_date ) +
'">\n                <input readonly="true" required type="int" class="time event-end-time" placeholder="00:00 AM" data-validation="required"  value="' +
__e(end_time ) +
'">\n            </div>\n        ';
 } ;
__p += '\n    </div>\n\n     <div class=\'col-md-4 col-xs-12 invite-location-container no-padding\'>\n         ';
  if( !is_edit )  { ;
__p += '\n            <div class="location-image"><i class="fa fa-map-pin-streamline fa-15x"></i></div>\n            <div id="invite-location" class="title">\n                ' +
__e( where ) +
'\n            </div>\n         ';
 } else { ;
__p += '\n            <div class="title">Location</div>\n            <div><input type="text" class="form-control event-location-input" placeholder="Location...."  ></div>\n         ';
 } ;
__p += '\n     </div>\n</div>\n\n<div id="palette-container" class="row no-margin small-margin-top"></div>\n\n</div>\n\n';

}
return __p
};

this["JST"]["invite_header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="block block1 invite-background"\n     ';
 if (poster_image_id != null) {
         print("style='background-image: url(/image/" + poster_image_id + ")'")
    }
    else {
         print("style='background-image: url(/img/default_image.jpg)'")
    } ;
__p += '\n>\n    <div class="center-block">\n       <div class="invite-title-container">\n       </div>\n       <div class="upload">\n            <form id="upload_image_form" data-id="' +
__e( unique_id ) +
'" method="POST" enctype="multipart/form-data">\n                <input type="file" name="upload_image_file" id="upload_image_file" >\n            </form>\n            <button id="image_select_btn" class="btn btn-success">Change cover</button>\n       </div>\n\n    </div>\n\n</div>\n';

}
return __p
};

this["JST"]["invite_search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n<div id="search-view">\n\n    <div class="row no-margin desktop">\n        <div class="col-sm-10 no-padding">\n            <input id="searchBox" type="text" class="form-control event-name" placeholder="Invite Title" data-validation="required">\n        </div>\n\n        <div class="col-sm-2 no-padding">\n            <button type="button" class="btn btn-success form-control search">Search</button>\n        </div>\n    </div>\n\n    <div class="controls" id="search-result">\n        ';
 if (invites.length == 0) { ;
__p += '\n            Your search didn\'t resolved any iMeets. <a href="/new" type="button" class="btn btn-success">Start sending!</a>\n        ';
 } ;
__p += '\n\n        ';
 _.each( invites, function( item ){ ;
__p += '\n\n            <div class="block block1 invite-background" data-id="' +
__e( item.unique_id ) +
'"\n                    ';
 if (item.poster_image_id != null) {
                        print("style='background-image: url(/image/" + item.poster_image_id + ")'")
                    }
                    else {
                        print("style='background-image: url(/img/default_image.jpg)'")
                    } ;
__p += '\n                >\n                <div class="center-block" data-id="' +
__e( item.unique_id ) +
'">\n                    <h1 class="main-h1" data-id="' +
__e( item.unique_id ) +
'">' +
__e( item.title ) +
'</h1>\n                    <div class="actions">\n                        <div class="row">\n                            <div class="col-xs-6 col-md-6 no-padding">\n                                <button type=\'button\' class=\'btn btn-info form-control btn-duplicate\' data-id="' +
__e( item.unique_id ) +
'">Duplicate</button>\n                            </div>\n\n                            <div class="col-xs-6 col-md-6 no-padding edit-btn">\n                                <button type=\'button\' class=\'btn btn-info form-control btn-edit\' data-id="' +
__e( item.unique_id ) +
'">Edit</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        ';
 }); ;
__p += '\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["invite_sent.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal-content">\n    <form id="registerForm">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n\n        <div class="container">\n            <div class="row">\n                Invite Link <a href="http://imeet.io/invite/';
  print(invite_id) ;
__p += '"><h5 class="text-lowercase">http://imeet.io/invite/';
  print(invite_id) ;
__p += '</h5></a>\n            </div>\n            <div class="row small-margin-top"></div>\n            <div class="row">\n               Register\n               <div class="controls">\n                   <div class="col-sm-3"></div>\n                    <div class="col-sm-6">\n                        <div class="col-sm-9">\n                            <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\n                        </div>\n                        <div class="col-sm-3">\n                            <button type="button" class="btn btn-success form-control submit-register">Go</button>\n                        </div>\n                    </div>\n                    <div class="col-sm-3"></div>\n                </div>\n           </div>\n        </div>\n    </form>\n</div>\n';

}
return __p
};

this["JST"]["login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="login-page">\n<form id="loginForm" action="/login" method="post">\n\n<div class="login-box">\n    <div class="row no-margin text-center">\n        <div class="no-padding col-md-6 col-xs-6">\n             <a href="/social_login/facebook" class="btn btn-facebook ">Login with Facebook<i class="fa fa-facebook fa-2x"></i></a>\n        </div>\n        <div class="no-padding col-md-6 col-xs-6">\n            <a href="/social_login/google"  class="btn btn-google">Login with Google<i class="fa fa-google fa-2x"></i></a>\n        </div>\n    </div>\n\n\n    <div class="row no-margin">\n        <div class="no-padding col-md-12 section-item contact-table equidistant">\n          <h4>Have an account with us?</h4>\n        </div>\n    </div>\n\n    <div class="row no-margin">\n        <div class="no-padding col-md-12">\n            <input id="username" name="username" required type="text" class="form-control " placeholder="Username">\n        </div>\n    </div>\n\n    <div class="row no-margin">\n        <div class="no-padding col-md-12">\n            <input id="password" name="password" required type="password" class="form-control " placeholder="Password">\n        </div>\n    </div>\n\n    <div class="row no-margin">\n        <div class="no-padding col-md-12">\n            <label class="remember pull-right" style="padding: 10px">\n                Remember me?\n                <input type="checkbox" name="remember_me" id="remember_me" value="on">\n              </label>\n        </div>\n    </div>\n\n     <div class="row no-margin">\n          <div class="col-sm-12 no-padding">\n              <button type="submit" class="btn btn-success form-control pull-right">Login</button>\n          </div>\n      </div>\n\n    <div class="row no-margin">\n        <div class="no-padding col-md-12">\n            <label class="remember pull-right">\n              Don\'t have an account?\n              <a href="/register" class="btn">Sign Up - It\'s Free.</a>\n            </label>\n        </div>\n    </div>\n</div>\n</form>\n</div>';

}
return __p
};

this["JST"]["palette.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="palette-modal">\n    <div class="row no-margin palette">\n        ';
 _.each( palettes, function( item ){ ;
__p += '\n          <div class="palette-item" style="background-color: ' +
__e( item.main_bg_color ) +
'" data-id="' +
__e( item.unique_id ) +
'"></div>\n        ';
 }); ;
__p += '\n    </div>\n</div>';

}
return __p
};

this["JST"]["profile_edit.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="edit-profile-view">\n\n    <div class="row no-margin">\n        <div class="col-xs-12 no-padding">\n           <h4>Edit your profile</h4>\n       </div>\n    </div>\n\n    <div class="row no-margin">\n       <div class="col-xs-12 no-padding">\n           <div id="edit-profile-email"></div>\n       </div>\n    </div>\n\n    <div class="row no-margin">\n       <div class="col-xs-12 no-padding">\n        <input id="edit-profile-name" type="text" class="form-control valid-before-submit" placeholder="John Smith..." data-validation="required">\n       </div>\n    </div>\n\n    <div class="row no-margin username-row">\n        <div class="col-xs-12 no-padding">\n            <input id="edit-profile-username" type="text" class="form-control valid-before-submit" placeholder="username..." data-validation="required">\n        </div>\n    </div>\n\n    <div class="row no-margin password-row">\n        <div class="col-xs-12 no-padding">\n            <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control" placeholder="password...">\n        </div>\n    </div>\n\n    <div class="row no-margin">\n        <div class="col-xs-12 no-padding">\n            <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control" placeholder=" confirm password...">\n        </div>\n    </div>\n\n    <div class="row no-margin button-row">\n        <div class="col-xs-12 no-padding">\n            <button type=\'button\' class=\'save-profile btn btn-info form-control\'>Save</button>\n        </div>\n    </div>\n\n</div>\n';

}
return __p
};

this["JST"]["register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="signup-container">\n    <div class="signup">\n        <h4>I want in!</h4>\n       <div class="row controls">\n           <div class="col-sm-3"></div>\n            <div class="col-sm-6">\n                <div class="col-sm-9">\n                    <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\n                </div>\n                <div class="col-sm-3">\n                    <button type="button" class="btn btn-success form-control submit-register">Go</button>\n                </div>\n            </div>\n            <div class="col-sm-3"></div>\n        </div>\n    </div>\n</div>\n\n<!-- Footer -->\n<div class="section-container footer desktop navbar-fixed-bottom">\n<div class="footer-below">\n    <div class="container">\n      <div class="row">\n          <div class="col-lg-12">\n              Miami, FL<br/>\n              Copyright 2014 &copy; iMeet Inc. All rights reserved.\n          </div>\n      </div>\n    </div>\n</div>\n</div>\n';

}
return __p
};