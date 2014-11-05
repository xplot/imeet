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
__p += '<div class="section section-item controls">\n        <div class="row medium-margin-top">\n            <div class="col-md-8 col-md-offset-2 equidistant">\n                    <div class="row"></div>\n                    <h4>Create your event</h4>\n                    <div class="row controls">\n                        <div class="col-sm-7 form-group">\n                            <input required type="text" class="form-control event-name valid-before-submit" placeholder="Event" autofocus data-validation="required" >\n                        </div>\n                        <div class="col-sm-5">\n                            <input required type="date" class="form-control event-date valid-before-submit" placeholder="when..." name="when" id="when" data-validation="required,date">\n                        </div>\n                    </div>\n            </div>\n        </div>\n\n        <div class="row small-margin-top equidistant desktop">\n            <div class="row col-md-8 col-md-offset-2">\n                <div class="line nav-color-bg"></div>\n            </div>\n        </div>\n\n        <div class="row small-margin-top equidistant">\n            <div class="row col-md-8 col-md-offset-2">\n                <h4>Who is invited?</h4>\n                    <div class="row controls">\n                        <div class="col-sm-5 form-group">\n                            <input type="text" class="new-contact-name form-control" placeholder="Name">\n                        </div>\n                        <div class="col-sm-5 form-group">\n                            <input type="text" class="new-contact-phone form-control" data-validation="required,email|phone"\n                                   placeholder="Phone Number or Email Address" name="newPhone" id="newPhone">\n                        </div>\n                        <div class="col-sm-2 form-group">\n                            <button type="button" class="btn btn-info new-contact form-control">+</button>\n                        </div>\n                    </div>\n            </div>\n\n            <!--Attendees-->\n            <div class="row contact-table col-md-8 col-md-offset-2"></div>\n        </div>\n\n        <div class="row small-margin-top equidistant">\n            <div class="row col-md-8 col-md-offset-2">\n                <button type="button" class="btn form-control btn-success send" disabled>Create Invite</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- Footer -->\n<div class="section-container footer desktop navbar-fixed-bottom">\n    <div class="footer-below">\n        <div class="container">\n          <div class="row">\n              <div class="col-lg-12">\n                  Miami, FL<br/>\n                  Copyright 2014 &copy; iMeet Inc. All rights reserved.\n              </div>\n          </div>\n          <div class="row">\n            <div class="col-lg-12 quiet">\n                <br/>Built with love, Internet style\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n';

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
__p += '<div class="modal-content">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container">\n            <div class="row controls">\n                <div class="col-sm-10">\n                    <input id="searchBox" type="text" class="form-control event-name" placeholder="Invite Title" data-validation="required">\n                </div>\n                <div class="col-sm-2">\n                    <button type="button" class="btn btn-success form-control search">Go</button>\n                </div>\n            </div>\n            <div class="row" style="height: 50px"></div>\n            <div class="row search-result">\n            </div>\n        </div>\n</div>\n';

}
return __p
};