this["JST"] = this["JST"] || {};

this["JST"]["editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\n    <form id="editProfileForm">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container">\n            <h4>Edit your profile</h4>\n           <div class="row controls">\n               <div class="col-sm-3"></div>\n                <div class="col-sm-6">\n                    <br/><br/>\n                    <div class="floating-label-form-group">\n                        <div id="edit-profile-email">Email</div>\n                    </div>\n                    <br/><br/>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-name" class="fl">Full Name</label>\n                        <input required id="edit-profile-name" type="text" class="form-control" placeholder="John Smith..." >\n                    </div>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-username" class="fl">Username</label>\n                        <input required id="edit-profile-username" type="text" class="form-control" placeholder="username...">\n                    </div>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-username" class="fl">Pasword</label>\n                        <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control" placeholder="password...">\n                    </div>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-username" class="fl">Pasword Confirm</label>\n                        <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control" placeholder=" confirm password...">\n                    </div>\n                </div>\n            </div>\n            <div class="form-group col-xs-9 medium-margin">\n                <a class="btn btn-primary btn-lg save-profile pull-right" role="button">Save</a>\n            </div>\n        </div>\n    </form>\n</div>\n';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row medium-margin-top">\n    <div class="col-md-8 col-md-offset-2 section-item contact-table equidistant">\n        <form id="newInviteForm">\n            <div class="row"></div>\n            <h4>Create your event</h4>\n            <div class="row controls">\n                <div class="col-sm-6 form-group">\n                    <input required type="text" class="form-control event-name" placeholder="Event" autofocus >\n                </div>\n                <div class="col-sm-3">\n                    <input required type="date" class="form-control event-date" placeholder="when..." name="when" id="when">\n                </div>\n                <div class="col-sm-3">\n                    <button type="button" class="btn btn-success form-control send" disabled>Create Invite</button>\n                </div>\n            </div>\n        </form>\n        <div class="row medium-margin line"></div>\n\n        <h4>Attendees</h4>\n        <form id="newContactForm">\n            <div class="row">\n                    <div class="col-sm-3">\n                        <input type="text" class="new-contact-name form-control" placeholder="Name">\n                    </div>\n                    <div class="col-sm-3">\n                        <input type="text" class="new-contact-phone form-control"\n                               placeholder="Phone Number" name="newPhone" id="newPhone">\n                    </div>\n                    <div class="col-sm-3">\n                        <input type="email"\n                               class="new-contact-email form-control" placeholder="Email">\n                        <p class="help-block text-danger"></p>\n                    </div>\n                    <div class="col-sm-3">\n                        <button type="button" class="btn btn-info new-contact form-control">+</button>\n                    </div>\n            </div>\n        </form>\n    </div>\n</div>';

}
return __p
};

this["JST"]["inviteReport.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container invite-table">\n            <div class="row controls">\n                <div class="col-sm-6">\n                    <h4>Event</h4>\n                    <div class="invite-title"></div>\n                </div>\n                <div class="col-sm-6 ">\n                    <h4>When</h4>\n                    <div class="invite-date"></div>\n                </div>\n            </div>\n\n            <div class="row medium-margin line"></div>\n\n            <h4>Attendees</h4>\n            <div class="row medium-margin line"></div>\n            <div class="row medium-margin line"></div>\n            <div class=\'row contact-row small-margin\'>\n                <div class=\'col-sm-2\'> <strong>Name</strong></div>\n                <div class=\'col-sm-2\'>  <strong>Phone</strong> </div>\n                <div class=\'col-sm-2\'> <strong>Email</strong></div>\n                <div class=\'col-sm-2\'> <strong>Sms Response</strong></div>\n                <div class=\'col-sm-2\'> <strong>Voice Response</strong></div>\n                <div class=\'col-sm-2\'> <strong>Email Response</strong></div>\n            </div>\n            <!--<div class="row medium-margin line"></div>-->\n        </div>\n    </div>\n';

}
return __p
};

this["JST"]["register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content small-modal">\n    <form id="registerForm">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container">\n            <h4>I want in!</h4>\n           <div class="row controls">\n               <div class="col-sm-3"></div>\n                <div class="col-sm-6">\n                    <div class="col-sm-9">\n                        <input required type="email" class="form-control register-email" placeholder="Enter email...">\n                    </div>\n                    <div class="col-sm-3">\n                        <button type="button" class="btn btn-success form-control submit-register">Go</button>\n                    </div>\n                </div>\n                <div class="col-sm-3"></div>\n            </div>\n        </div>\n    </form>\n</div>\n';

}
return __p
};

this["JST"]["search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\n    <form id="searchForm" onsubmit="return false;">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container">\n            <div class="row controls">\n                <div class="col-sm-10">\n                    <input id="searchBox" required type="text" class="form-control event-name" placeholder="Invite Title" required>\n                </div>\n                <div class="col-sm-2">\n                    <button type="button" class="btn btn-success form-control search">Go</button>\n                </div>\n            </div>\n            <div class="row" style="height: 50px"></div>\n            <div class="row search-result">\n            </div>\n        </div>\n    </form>\n</div>\n';

}
return __p
};