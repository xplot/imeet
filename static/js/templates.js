this["JST"] = this["JST"] || {};

this["JST"]["add-group.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal addGroup-modal" tabindex="-1" >\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&amp;times;</button>\n            <h4 class="modal-title" id="myModalLabel">Add New Group</h4>\n            </div>\n            <div class="modal-body">\n                <input type="text" class="form-control new-group-input" />\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default close-dialog" data-dismiss="modal">Close</button>\n                <button type="button" class="btn btn-primary new-group-btn">Create</button>\n        </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["contact_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="contact-row col-md-12 col-xs-12 col-sm-12" data-id="' +
__e( unique_id ) +
'" draggable="true">\n    <div class="editable col-md-3 col-xs-8 col-sm-4" >\n        ' +
__e( name ) +
'\n    </div>\n    <div class="editable desktop tablet col-md-3 col-sm-3">' +
__e( email ) +
'</div>\n    <div class="editable desktop tablet col-md-3 col-sm-3">' +
__e( phone ) +
'</div>\n    <div class="col-md-2 col-xs-4 update-column pull-right col-sm-2">\n        <a class="editable" href="#"><i class="fa-pen fa-1_2x"></i></a>\n        <a class="delete-contact" href="#"><i data-id="' +
__e( unique_id ) +
'" class="fa-delete-garbage-streamline fa-1_2x"></i></a>\n    </div>\n</div>';

}
return __p
};

this["JST"]["contact_item_edit.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row" data-id="' +
__e( unique_id ) +
'">\n    <div class="editable col-md-3 col-xs-8">\n        <input id="edit-name" value="' +
__e( name ) +
'" placeholder="Name...">\n    </div>\n    <div class="desktop tablet col-md-3">\n        <input id="edit-email" value="' +
__e( email ) +
'" placeholder="Email...">\n    </div>\n    <div class="desktop tablet col-md-3">\n        <input id="edit-phone" value="' +
__e( phone ) +
'" placeholder="Phone...">\n    </div>\n    <div class="col-md-3 update-column">\n        <a href="#" class="finish-edit">OK</a>\n    </div>\n</div>';

}
return __p
};

this["JST"]["contact_item_typeahead.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="details" data-id="' +
__e( unique_id ) +
'">\n    <i class="fa fa-happy-face fa-2x"></i>\n    <b>' +
__e(name ) +
'</b> ' +
__e(email ) +
' ' +
__e(phone ) +
'\n</div>';

}
return __p
};

this["JST"]["editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="edit-profile-view medium-margin-top">\n\n   <div class="col-xs-12 text-center">\n       <h4>Edit your profile</h4>\n   </div>\n\n   <div class="col-xs-12 text-center">\n       <div id="edit-profile-email"></div>\n   </div>\n\n   <div class="col-xs-12 text-center">\n       <input id="edit-profile-name" type="text" class="form-control valid-before-submit" placeholder="John Smith..." data-validation="required">\n   </div>\n\n   <div class="col-xs-12 text-center">\n       <input id="edit-profile-username" type="text" class="form-control valid-before-submit" placeholder="username..." data-validation="required">\n   </div>\n\n   <div class="col-xs-12 text-center">\n       <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control" placeholder="password...">\n   </div>\n\n    <div class="col-xs-12 text-center">\n       <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control" placeholder=" confirm password...">\n   </div>\n\n    <div class="col-xs-12 text-center">\n       <button type=\'button\' class=\'save-profile btn btn-info form-control\'>Save</button>\n    </div>\n\n</div>\n';

}
return __p
};

this["JST"]["edit_contact.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="form-horizontal contacts-form">\n  <div class="form-group">\n    <label for="nameInput">Name</label>\n    <input type="text" class="form-control contact_input" id="nameInput" placeholder="Jane Doe" data-validation="required">\n  </div>\n\n  <div class="form-group">\n    <label for="emailInput">Email contact</label>\n    <input type="email" class="form-control contact_input" id="emailInput" placeholder="jane.doe@example.com" data-validation="email">\n  </div>\n  <div class="form-group">\n    <label for="phoneInput">Phone number</label>\n    <input type="text" class="form-control contact_input" id="phoneInput" placeholder="123-456-7890" data-validation="phone">\n  </div>\n\n  <div class="form-group">\n    <a class="add-contact btn" id="save-contact">Add contact</a>\n  </div>\n</div>';

}
return __p
};

this["JST"]["group-item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


    var color = randomColor();
    var inverse = colorInverter(color);
;
__p += '\n<div class="panel panel-default ' +
__e( panel_class ) +
'" data-id="' +
__e( unique_id ) +
'" id="panel_' +
__e( unique_id ) +
'">\n    <div class="panel-heading group-drop-area" role="tab" id="heading_' +
__e( unique_id ) +
'" data-id="' +
__e( unique_id ) +
'">\n        <div class="panel-title group-drop-area" data-id="' +
__e( unique_id ) +
'">\n            <a class="collapsed group-drop-area" data-toggle="collapse" data-parent="#groups_accordion" href="#collapse_' +
__e( unique_id ) +
'"\n               aria-expanded="false" aria-controls="collapse_' +
__e( unique_id ) +
'" data-id="' +
__e( unique_id ) +
'">\n                <div data-id="' +
__e( unique_id ) +
'" class="group-drop-area">\n                    ' +
__e( cut(name)) +
'<i style="float: right" class="fa fa-angle-down fa-1_5x"></i>\n                </div>\n            </a>\n      </div>\n    </div>\n    <div id="collapse_' +
__e( unique_id ) +
'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" >\n        <div class="panel-body group-box group-drop-area" data-id="' +
__e( unique_id ) +
'" id="groupbox_' +
__e( unique_id ) +
'">\n            Drop Here!!! <br/>\n            ';
_.each(contacts, function(contact) { ;
__p += '\n\n                <div class="col-md-5 group-contact">\n                    ' +
__e( cut(contact.name,8) ) +
'\n                </div>\n            ';
 }) ;
__p += '\n        </div>\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["group_item_typeahead.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="details" data-id="' +
__e( unique_id ) +
'">\n    <i class="fa fa-group fa-2x"></i>\n    <b>' +
__e(name ) +
'</b>\n</div>';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\n    <div class="row">\n        <div id="invite-header"></div>\n    </div>\n    <div class="row">\n        <div id="invite-details" class="invite-subheader-banner"></div>\n    </div>\n\n    <div class="row invite-body no-margin">\n        <div class="small-margin-top"></div>\n        <div class="col-md-2"/>\n        <div class="col-md-4 attendees">\n            <div id="invite-attendees">\n                <!--using invite_attendees.html subview-->\n            </div>\n        </div>\n\n        <div class="col-md-4 hangout">\n            <div class="row small-margin-top desktop desktop-description">\n                <div class="col-md-12">\n                    <h4>Message from the host</h4>\n                    <div class="invite-description"/>\n                </div>\n            </div>\n\n            <div id="invite-comments"></div>\n\n        </div>\n        <div class="col-md-2"/>\n    </div>\n</div>\n\n\n\n';

}
return __p
};

this["JST"]["invite_admin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\n    <div class="row">\n        <div id="invite-header"></div>\n    </div>\n    <div class="row">\n        <div id="invite-details" class="invite-subheader-banner"></div>\n    </div>\n\n    <div class="row invite-body no-margin">\n        <div class="small-margin-top"></div>\n        <div class="col-md-2"/>\n        <div class="col-md-4 attendees">\n            <div class="notify-all">\n                Want to let people know? <div class=\'notify-all-btn btn btn btn-success\'>Notify All</div>\n            </div>\n\n            <div id="invite-new-attendee"></div>\n\n            <div id="invite-attendees">\n                <!--using invite_attendees.html subview-->\n            </div>\n        </div>\n\n        <div class="col-md-4 hangout">\n            <div class="row small-margin-top desktop desktop-description">\n                <div class="col-md-12">\n                    <h4>Message from the host</h4>\n                    <div class="invite-description"/>\n                </div>\n            </div>\n\n            <div id="invite-comments"></div>\n\n        </div>\n        <div class="col-md-2"/>\n    </div>\n</div>\n\n\n\n\n';

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

this["JST"]["invite_attendee_create.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row rsvp no-margin">\n    <div class="panel panel-default no-border no-margin">\n      <div class="panel-heading no-padding">Invite People</div>\n      <div class="panel-body  micro-margin-top">\n          <div>\n              <div class="col-md-10 col-xs-12 no-padding">\n                  <input type="text" class="contact-input form-control"\n                    ';
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
__p += '<div class="row rsvp small-margin-top">\n      ';
 if(attendee != null && attendee.status != 'deleted' && attendee.status != 'organizer') {;
__p += '\n        <div class="panel panel-default">\n          <div class="panel-heading">\n              ';
 if(attendee.status == 'no_response') {;
__p += '\n                    Are you coming?\n              ';
} else if(attendee.status == 'no') { ;
__p += '\n                    Sad you can\'t attend :(\n              ';
} else if(attendee.status == 'yes') { ;
__p += '\n                    Glad you\'re coming :)\n              ';
} ;
__p += '\n          </div>\n\n          <div class="panel-body acknowledge-body">\n            <div class="col-md-6 yes-button">\n                <button type="button" class="btn form-control btn-success invite-attendees-acknowledge-yes response-' +
__e( attendee.status ) +
'">YES</button>\n            </div>\n            <div class="col-md-6 no-button">\n                <button type="button" class="btn form-control btn-danger invite-attendees-acknowledge-no response-' +
__e( attendee.status ) +
'">NO</button>\n            </div>\n          </div>\n        </div>\n      ';
} else if(attendee != null && attendee.status == 'deleted') {;
__p += '\n        <div class="panel panel-default">\n            <div class="panel-heading"></div>\n              <div class="panel-body">\n                <b>The organizer removed you from this event</b>\n            </div>\n        </div>\n      ';
} else if(attendee != null && attendee.status == 'organizer') {;
__p += '\n        <!-- Potentially also add people here -->\n      ';
} else{;
__p += '\n\n      ';
};
__p += '\n\n</div>\n\n<div class="row rsvp no-margin">\n    <div class="panel panel-default no-border">\n      <div class="panel-heading yes">Who is coming?</div>\n      <div class="panel-body">\n        ';
 _.each( confirmed, function( item ){ ;
__p += '\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n      </div>\n   </div>\n\n    <div class="panel panel-default no-border">\n      <div class="panel-heading no">Who is not coming?</div>\n      <div class="panel-body">\n        ';
 _.each( negated, function( item ){ ;
__p += '\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n      </div>\n   </div>\n\n    <div class="panel panel-default no-border">\n      <div class="panel-heading">\n          Who is invited?\n\n      </div>\n\n      <div class="panel-body no-response-table">\n        ';
 _.each( no_response, function( item ){ ;
__p += '\n            ' +
((__t = ( partial('invite_attendee.html', item) )) == null ? '' : __t) +
'\n        ';
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

this["JST"]["invite_comments.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row small-margin-top">\n    <div class="col-md-12 no-margin">\n        <h4>Comments</h4>\n    </div>\n</div>\n\n<div class="row ">\n    <div class="col-md-12 no-margin">\n        <textarea class="invite-comment-input" placeholder="Add comment"></textarea>\n    </div>\n</div>\n\n<div class="row">\n    <div class="col-md-6 no-margin">\n        <button type="button" class="btn form-control btn-success add-comment">Add Comment</button>\n    </div>\n</div>\n\n<div class="row invite-comments">\n    <div class="col-md-12 invite-comments-container">\n        ';
 _.each( comments, function( comment ){ ;
__p += '\n            ' +
((__t = ( partial('invite_comment.html', comment) )) == null ? '' : __t) +
'\n        ';
 }); ;
__p += '\n    </div>\n</div>\n\n';

}
return __p
};

this["JST"]["invite_details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="invite-details-container"\n    ';
  if( is_edit )  { ;
__p += '\n        class="edit"\n     ';
 } else { ;
__p += '\n        class=""\n     ';
 } ;
__p += '\n>\n';
  if( is_admin )  { ;
__p += '\n    <div class="row">\n        <div class=\'col-md-12 col-xs-12 edit_button_container\'>\n        ';
  if( !is_edit )  { ;
__p += '\n            <button class="btn btn-success edit_invite">Edit iMeet</button>\n         ';
 } else { ;
__p += '\n            <button class="btn btn-success save_invite">Save</button>\n         ';
 } ;
__p += '\n    </div>\n';
 } ;
__p += '\n\n\n</div>\n\n<div class="row">\n    <div class="col-md-2"></div>\n\n    <div class=\'col-md-2 col-xs-12 mobile-padding\'>\n        <div class="title">Event Start Time</div>\n        ';
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
__p += '\n    </div>\n\n    <div class=\'col-md-2  col-xs-12 mobile-padding\'>\n        <div class="title">Event End Time</div>\n        ';
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
__p += '\n    </div>\n\n     <div class=\'col-md-4 col-xs-12 mobile-padding invite-location-container\'>\n         ';
  if( !is_edit )  { ;
__p += '\n            <div class="location-image"><i class="fa fa-map-pin-streamline fa-15x"></i></div>\n            <div id="invite-location" class="title">\n                ' +
__e( where ) +
'\n            </div>\n         ';
 } else { ;
__p += '\n            <div class="title">Location</div>\n            <div><input type="text" class="form-control event-location-input" placeholder="Location...."  ></div>\n         ';
 } ;
__p += '\n     </div>\n</div>\n\n</div>\n\n';

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
__p += '\n<div class="search-view">\n    <div class="controls zero-margin">\n        <div class="col-sm-10">\n            <input id="searchBox" type="text" class="form-control event-name" placeholder="Invite Title" data-validation="required">\n        </div>\n        <div class="col-sm-2">\n            <button type="button" class="btn btn-success form-control search">Search</button>\n        </div>\n    </div>\n    <div class="" style="height: 50px"></div>\n    <div class="controls" id="search-result">\n\n        ';
 if (invites.length == 0) { ;
__p += '\n            Your search didn\'t resolved any iMeets. <a href="/new" type="button" class="btn btn-success">Start sending!</a>\n        ';
 } ;
__p += '\n\n        ';
 _.each( invites, function( item ){ ;
__p += '\n                <div class="col-md-3 invite-card">\n                    <div class="row title"><a href="#" class="invite-link" data-id=\'' +
__e(item.unique_id ) +
'\'>' +
__e( item.title ) +
'</a> </div>\n                    <div class="row date">' +
__e( item.start ) +
' </div>\n                    <div class="row description">' +
__e( item.description ) +
' </div>\n                    <div class="row actions">\n                        <button type=\'button\' class=\'btn btn-success btn-duplicate\' data-id=\'' +
__e(item.unique_id ) +
'\'>DUPLICATE</button>\n                        <button type=\'button\' class=\'btn btn-warning btn-edit\' data-id=\'' +
__e(item.unique_id ) +
'\'>EDIT</button>\n                        <button type=\'button\' class=\'btn btn-danger btn-cancel\' data-id=\'' +
__e(item.unique_id ) +
'\'>CANCEL</button>\n                    </div>\n                </div>\n        ';
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
__p += '<div class="row medium-margin-top">\n   <div class="col-md-12 section-item contact-table equidistant">\n      <form id="loginForm" action="/login" method="post">\n          <section class="section">\n              <div class="row controls">\n                  <div class="col-sm-4"></div>\n                  <div class="col-sm-4 medium-margin">\n                      <h4>Login</h4>\n                      <fieldset>\n                          <div class="row">\n                              <div class="col-sm-1"></div>\n                              <div class="col-sm-10">\n                                  <input id="username" name="username" required type="text" class="form-control small-margin" placeholder="Username">\n                                  <input id="password" name="password" required type="password" class="form-control small-margin" placeholder="Password">\n                              </div>\n                              <div class="col-sm-1"></div>\n\n                          </div>\n                          <div class="row">\n                              <div class="col-sm-1"></div>\n                              <div class="col-sm-10">\n                                  <label class="remember pull-right" style="padding: 10px">\n                                    Remember me?\n                                    <input type="checkbox" name="remember_me" id="remember_me" value="on">\n                                  </label>\n                              </div>\n                              <div class="col-sm-1"></div>\n                          </div>\n                          <div class="row">\n                              <div class="col-sm-1"></div>\n                              <div class="col-sm-10"><button type="submit" class="btn btn-success form-control pull-right">Login</button></div>\n                              <div class="col-sm-1"></div>\n                          </div>\n\n                          <div class="row" style="margin-top: 20px">\n                              <div class="col-sm-1"></div>\n                              <div class="col-sm-10">\n                                  <div id="third_party_login">\n                                      <ul class="social-login-icons">\n                                          <li style="width: auto">\n\n                                          </li>\n                                          <li>\n                                              <a href="/social_login/google">\n                                                  <i class="fa fa-google fa-2x"></i>\n                                              </a>\n                                          </li>\n                                          <li>\n\n                                              <a href="/social_login/facebook">\n                                                  <i class="fa fa-facebook fa-2x"></i>\n                                              </a>\n                                          </li>\n                                      </ul>\n                                  </div>\n                              </div>\n                              <div class="col-sm-1"></div>\n                          </div>\n\n                          <div class="row" style="margin-top: 20px">\n                              <div class="col-sm-1"></div>\n\n                              <div class="col-sm-1"></div>\n                          </div>\n\n                          <div class="row">\n                              <div class="col-sm-1"></div>\n                              <div class="col-sm-10">\n                                  <label class="remember pull-right">\n                                      Don\'t have an account?\n                                      <a href="/register" class="">Sign Up - It\'s Free.</a>\n                                  </label>\n                              </div>\n                              <div class="col-sm-1"></div>\n                          </div>\n                      </fieldset>\n                  </div>\n                  <div class="col-sm-4"></div>\n              </div>\n          </section>\n        </form>\n    </div>\n</div>';

}
return __p
};

this["JST"]["new.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="snap-panel invite-create">\n    <section data-panel="first" class="invite first">\n        <div class="zero-margin text-center invite-content ">\n            <div class="zero-margin">\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\n                    <h4>Event</h4>\n                </div>\n            </div>\n            <div class="">\n\n                ';
  if( currentUser == null )  { ;
__p += '\n                    <label class="small-text">\n                    Note: For sms/calls to work, you have to be a registered\n                    <br/>\n                    Note2: Sms/calls will be free only during the beta phase. After that a subscription base fee will be offered\n                    </label>\n                ';
 } ;
__p += '\n            </div>\n\n            <div class="zero-margin">\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\n                    <input type="text" class="form-control event-name-input valid-before-submit" placeholder="Event" autofocus data-validation="required" value="' +
__e(title) +
'" >\n                </div>\n            </div>\n\n            <div class="zero-margin">\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\n                    <h4>Details</h4>\n                </div>\n            </div>\n\n            <div class="zero-margin">\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\n                  <input type="text" class="form-control event-location-input" placeholder="Location...."  >\n                </div>\n            </div>\n\n            <div class="zero-margin">\n                <div class="col-xs-12  col-md-3 col-md-offset-2">\n                    <div class="date-group" id="start-date-group">\n                        <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000" data-validation="required,date"  value="' +
__e(start_date ) +
'">\n                        <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required"  value="' +
__e(start_time ) +
'">\n                    </div>\n                </div>\n                <div class="col-xs-12 col-md-2 text-center label-text">\n                    <h4>To</h4>\n                </div>\n                <div class="col-xs-12 col-md-3">\n                    <div class="date-group">\n                        <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000" value="' +
__e(end_date ) +
'">\n                        <input readonly="true" required type="text" class="time event-end-time" placeholder="00:00 AM"  value="' +
__e(end_time ) +
'">\n                    </div>\n                </div>\n            </div>\n            <div class="zero-margin desktop tablet small-margin-top">\n                <div class="col-xs-12 col-md-8 col-md-offset-2 ">\n                  <textarea class="form-control event-description-input" rows="6"></textarea>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\'row send-container col-xs-offset-0 col-xs-12 col-md-8 col-md-offset-2\'>\n            <div class="facebook_share pull-right">\n                <div>Share on Facebook</div>\n                <div><input type="checkbox"\n                   data-toggle="toggle"\n                   id="bt_toggle"\n                   class="share_to_facebook"\n                   data-style="android"\n                   data-on=" " data-off=" "\n                   data-onstyle="info"\n                   data-onstyle="success" data-offstyle="danger" />\n                </div>\n            </div>\n            <div class="">\n                <button type="button" class="btn form-control btn-success send">Create</button>\n            </div>\n\n        </div>\n    </section>\n</div>\n';

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