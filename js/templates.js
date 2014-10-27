this["JST"] = this["JST"] || {};

this["JST"]["editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\r\n    <form id="editProfileForm">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="container">\r\n            <h4>Edit your profile</h4>\r\n           <div class="row controls">\r\n               <div class="col-sm-3"></div>\r\n                <div class="col-sm-6">\r\n                    <br/><br/>\r\n                    <div class="floating-label-form-group">\r\n                        <div id="edit-profile-email">Email</div>\r\n                    </div>\r\n                    <br/><br/>\r\n                    <div class="floating-label-form-group">\r\n                        <label for="edit-profile-name" class="fl">Full Name</label>\r\n                        <input required id="edit-profile-name" type="text" class="form-control" placeholder="John Smith..." >\r\n                    </div>\r\n                    <div class="floating-label-form-group">\r\n                        <label for="edit-profile-username" class="fl">Username</label>\r\n                        <input required id="edit-profile-username" type="text" class="form-control" placeholder="username...">\r\n                    </div>\r\n                    <div class="floating-label-form-group">\r\n                        <label for="edit-profile-username" class="fl">Pasword</label>\r\n                        <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control" placeholder="password...">\r\n                    </div>\r\n                    <div class="floating-label-form-group">\r\n                        <label for="edit-profile-username" class="fl">Pasword Confirm</label>\r\n                        <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control" placeholder=" confirm password...">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="form-group col-xs-9 medium-margin">\r\n                <a class="btn btn-primary btn-lg save-profile pull-right" role="button">Save</a>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row medium-margin-top">\r\n    <div class="col-md-8 col-md-offset-2 section-item contact-table equidistant">\r\n        <form id="newInviteForm">\r\n            <div class="row"></div>\r\n            <h4>Create your event</h4>\r\n            <div class="row controls">\r\n                <div class="col-sm-5 form-group">\r\n                    <input required type="text" class="form-control event-name" placeholder="Event" autofocus >\r\n                </div>\r\n                <div class="col-sm-3">\r\n                    <input required type="date" class="form-control event-date" placeholder="when..." name="when" id="when">\r\n                </div>\r\n            </div>\r\n        </form>\r\n        <div class="row medium-margin line"></div>\r\n\r\n        <h4>Who is invited?</h4>\r\n        <form id="newContactForm">\r\n            <div class="row">\r\n                <div class="col-sm-5">\r\n                    <input type="text" class="new-contact-name form-control" placeholder="Name">\r\n                </div>\r\n                <div class="col-sm-5">\r\n                    <input type="text" class="new-contact-phone form-control"\r\n                           placeholder="Phone Number or Email Address" name="newPhone" id="newPhone">\r\n                </div>\r\n                <div class="col-sm-1">\r\n                    <button type="button" class="btn btn-info new-contact form-control">+</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class="row medium-margin line"/>\r\n\r\n      <div class="row col-md-3 col-md-offset-4 col-xs-11 equidistant">\r\n          <button type="button" class="btn btn-success form-control send" disabled form="newInviteForm">Create Invite</button>\r\n      </div>\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["inviteReport.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="container invite-table">\r\n            <div class="row controls">\r\n                <div class="col-sm-6">\r\n                    <h4>Event</h4>\r\n                    <div class="invite-title"></div>\r\n                </div>\r\n                <div class="col-sm-6 ">\r\n                    <h4>When</h4>\r\n                    <div class="invite-date"></div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row medium-margin line"></div>\r\n\r\n            <h4>Attendees</h4>\r\n            <div class="row medium-margin line"></div>\r\n            <div class="row medium-margin line"></div>\r\n            <div class=\'row contact-row small-margin\'>\r\n                <div class=\'col-sm-2\'> <strong>Name</strong></div>\r\n                <div class=\'col-sm-2\'>  <strong>Phone</strong> </div>\r\n                <div class=\'col-sm-2\'> <strong>Email</strong></div>\r\n                <div class=\'col-sm-2\'> <strong>Sms Response</strong></div>\r\n                <div class=\'col-sm-2\'> <strong>Voice Response</strong></div>\r\n                <div class=\'col-sm-2\'> <strong>Email Response</strong></div>\r\n            </div>\r\n            <!--<div class="row medium-margin line"></div>-->\r\n        </div>\r\n    </div>\r\n';

}
return __p
};

this["JST"]["register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content small-modal">\r\n    <form id="registerForm">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="container">\r\n            <h4>I want in!</h4>\r\n           <div class="row controls">\r\n               <div class="col-sm-3"></div>\r\n                <div class="col-sm-6">\r\n                    <div class="col-sm-9">\r\n                        <input required type="email" class="form-control register-email" placeholder="Enter email...">\r\n                    </div>\r\n                    <div class="col-sm-3">\r\n                        <button type="button" class="btn btn-success form-control submit-register">Go</button>\r\n                    </div>\r\n                </div>\r\n                <div class="col-sm-3"></div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n';

}
return __p
};

this["JST"]["search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\r\n    <form id="searchForm" onsubmit="return false;">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="container">\r\n            <div class="row controls">\r\n                <div class="col-sm-10">\r\n                    <input id="searchBox" required type="text" class="form-control event-name" placeholder="Invite Title" required>\r\n                </div>\r\n                <div class="col-sm-2">\r\n                    <button type="button" class="btn btn-success form-control search">Go</button>\r\n                </div>\r\n            </div>\r\n            <div class="row" style="height: 50px"></div>\r\n            <div class="row search-result">\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n';

}
return __p
};