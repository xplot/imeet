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
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '    <section data-panel="first" class="container invite top-separator">\n        <div class="row text-center">\n            <h4>Event</h4>\n        </div>\n        <div class="row equidistant">\n            <div class="col-xs-12 col-md-8 col-md-offset-2">\n                <input required type="text" class="form-control event-name valid-before-submit" placeholder="Event" autofocus data-validation="required" >\n            </div>\n        </div>\n\n        <div class="row equidistant">\n            <div class="col-xs-12  col-md-3 col-md-offset-2">\n                <div class="date-group">\n                    <input required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000" data-validation="required" >\n                    <input required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required" >\n                </div>\n            </div>\n            <div class="col-xs-12 col-md-2 text-center label-text">\n                To\n            </div>\n            <div class="col-xs-12 col-md-3">\n                <div class="date-group">\n                    <input required type="text" class="date event-end-date valid-before-submit" placeholder="01/01/2000" data-validation="required,date" >\n                    <input required type="text" class="time event-end-time valid-before-submit" placeholder="00:00 AM" data-validation="required,time" >\n                </div>\n            </div>\n        </div>\n        <div class="row equidistant">\n            <div class="col-xs-12 col-md-8 col-md-offset-2">\n              <textarea class="form-control event-description" rows="6"></textarea>\n            </div>\n        </div>\n    </section>\n\n    <section data-panel="second" class="container invite top-separator">\n        <div class="row text-center">\n            <h4>Where</h4>\n        </div>\n\n        <div class="row equidistant">\n            <div class="col-xs-8 col-md-6 col-md-offset-2">\n                <input type="text" class="form-control event-address-street" placeholder="Address"  >\n            </div>\n            <div class="col-xs-4 col-md-2">\n                <input type="text" class="form-control event-address-suite" placeholder="Apt"  >\n            </div>\n        </div>\n        <div class="row equidistant">\n            <div class="col-xs-12 col-md-4 col-md-offset-2">\n                <input type="text" class="form-control event-address-city" placeholder="City"  >\n            </div>\n\n            <div class="col-xs-8 col-md-2">\n                <select class="form-control event-address-state" placeholder="State">\n\n                </select>\n            </div>\n            <div class="col-xs-4 col-md-2">\n                <input type="text" class="form-control event-address-zip" placeholder="Zip"  >\n            </div>\n        </div>\n\n    </section>\n\n    <section data-panel="third" class="container invite top-separator">\n\n        <div class="row text-center">\n            <h4>Who is invited?</h4>\n        </div>\n\n        <div class="row equidistant">\n            <div class="col-md-4 col-md-offset-2">\n                <input type="text" class="new-contact-name form-control" placeholder="Name">\n            </div>\n\n            <div class="col-md-3">\n                <input type="text" class="new-contact-phone form-control"\n                    ';
  if( features.indexOf('voice') != -1 )  { ;
__p += '\n                        data-validation=\'required,email|phone\' placeholder=\'Phone Number or Email Address\'\n                    ';
 } else { ;
__p += '\n                        data-validation=\'required,email\' placeholder=\'Email Address\'\n                    ';
 } ;
__p += '\n                    name="newPhone" id="newPhone">\n            </div>\n            <div class="col-md-1">\n                <button type="button" class="btn btn-info new-contact form-control">+</button>\n            </div>\n        </div>\n        <div class="contact-table equidistant">\n        </div>\n    </section>\n\n    <section data-panel="fourth" class="top-separator invite">\n        <div id="reportXXX"></div>\n\n        <div class="row equidistant">\n            <div class="col-md-8 col-md-offset-2">\n                <button type="button" class="btn form-control btn-success send" disabled>Create Invite</button>\n            </div>\n        </div>\n    </section>\n\n<!-- Footer -->\n<div class="section-container footer desktop navbar-fixed-bottom">\n    <div class="footer-below">\n        <div class="container">\n          <div class="row">\n              <div class="col-lg-12">\n                  Miami, FL<br/>\n                  Copyright 2014 &copy; iMeet Inc. All rights reserved.\n              </div>\n          </div>\n          <div class="row">\n            <div class="col-lg-12 quiet">\n                <br/>Built with love, Internet style\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n\n\n<ul class="menu">\n    <li>\n        <a href="" data-panel="first" class="active"><i class="fa fa-circle-line fa-1x"></i></a>\n    </li>\n    <li>\n        <a href="" data-panel="second"><i class="fa fa-circle-line fa-1x"></i></a>\n    </li>\n    <li>\n        <a href="" data-panel="third" ><i class="fa fa-circle-line fa-1x"></i></a>\n    </li>\n    <li>\n        <a href="" data-panel="fourth" ><i class="fa fa-circle-line fa-1x"></i></a>\n    </li>\n</ul>\n';

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

this["JST"]["invite_report.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row equidistant invite_report">\n    <div class="col-xs-12 col-md-8 col-md-offset-2">\n        <div class="panel panel-primary">\n         <div class="panel-heading" >\n                <div class="row">\n                     <div class=\'pull-left col-xs-3 col-md-6\'><h4 class=\'event-name\'></h4></div>\n                     <div class=\'col-xs-9 col-md-6 text-right\'>\n                        <div class=\'col-xs-12 col-md-12 event-start-date-formatted\'></div>\n                        <div class=\'col-xs-12 col-md-12 event-end-date-formatted\'></div>\n                     </div>\n                </div>\n             </div>\n         </div>\n\n          <div class="panel-body">\n            <div class=\'col-xs-12 col-md-12 event-description\'>\n            </div>\n\n            <div class=\'col-xs-12 col-md-8 small-margin-top\'>\n                <div class=\'label_title col-md-1 text-right\'>Where:</div>\n                <div class=\'pull-left col-md-5 text-left small-margin-left\'>\n                    <div class=\'event-address-street-with-number\'></div>\n                    <div class=\'event-address-state-city\'></div>\n                    <div class=\'event-address-zip\'></div>\n                </div>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n';

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
__p += '<div class="modal-content">\n    <div class="close-modal" data-action="dismiss">\n        <div class="lr">\n            <div class="rl">\n            </div>\n        </div>\n    </div>\n    <div class="container">\n        <div class="row controls">\n            <div class="col-sm-10">\n                <input id="searchBox" type="text" class="form-control event-name" placeholder="Invite Title" data-validation="required">\n            </div>\n            <div class="col-sm-2">\n                <button type="button" class="btn btn-success form-control search">Go</button>\n            </div>\n        </div>\n        <div class="row" style="height: 50px"></div>\n        <div class="row search-result">\n        </div>\n    </div>\n</div>\n';

}
return __p
};