this["JST"] = this["JST"] || {};

this["JST"]["contacts.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '{% extends "base.html" %}\n{% block title %}Contacts{% endblock %}\n{% block content %}\n    <br/>\n    <br/>\n    <br/>\n    <h3>Contacts</h3>\n\n\n\n\n\n{% endblock %}';

}
return __p
};

this["JST"]["editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container">\n            <h4>Edit your profile</h4>\n           <div class="row controls">\n               <div class="col-sm-3"></div>\n                <div class="col-sm-6">\n                    <br/><br/>\n                    <div class="floating-label-form-group">\n                        <div id="edit-profile-email">Email</div>\n                    </div>\n                    <br/><br/>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-name" class="fl">Full Name</label>\n                        <input id="edit-profile-name" type="text" class="form-control valid-before-submit" placeholder="John Smith..."\n                                data-validation="required">\n                    </div>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-username" class="fl" data-validation="required">Username</label>\n                        <input id="edit-profile-username" type="text" class="form-control valid-before-submit" placeholder="username..." data-validation="required">\n                    </div>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-username" class="fl" data-validation="required">Pasword</label>\n                        <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control valid-before-submit" placeholder="password..." data-validation="required">\n                    </div>\n                    <div class="floating-label-form-group">\n                        <label for="edit-profile-username" class="fl">Pasword Confirm</label>\n                        <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control valid-before-submit" placeholder=" confirm password..." data-validation="required">\n                    </div>\n                </div>\n            </div>\n            <div class="form-group col-xs-9 medium-margin">\n                <a class="btn btn-primary btn-lg save-profile pull-right" role="button">Save</a>\n            </div>\n        </div>\n</div>\n';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="snap-panel invite-create">\n    <section data-panel="first" class="container invite first">\n        <div class="row text-center invite-content ">\n            <div class="">\n                <h4>Event</h4>\n            </div>\n            <div class="">\n\n                ';
  if( currentUser == null )  { ;
__p += '\n                    <label class="small-text">\n                    Note: For sms/calls to work, you have to be a registered\n                    <br/>\n                    Note2: Sms/calls will be free only during the beta phase. After that a subscription base fee will be offered\n                    </label>\n                ';
 } ;
__p += '\n            </div>\n            <div class="row">\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\n                    <input required type="text" class="form-control event-name valid-before-submit" placeholder="Event" autofocus data-validation="required" >\n                </div>\n            </div>\n\n            <div class="row">\n                <div class="col-xs-12  col-md-3 col-md-offset-2">\n                    <div class="date-group" id="start-date-group">\n                        <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000"\n                               data-validation="required,date"\n                        >\n                        <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required" >\n                    </div>\n                </div>\n                <div class="col-xs-12 col-md-2 text-center label-text">\n                    To\n                </div>\n                <div class="col-xs-12 col-md-3">\n                    <div class="date-group">\n                        <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000">\n                        <input readonly="true" required type="text" class="time event-end-time" placeholder="00:00 AM"  >\n                    </div>\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\n                  <textarea class="form-control event-description desktop tablet" rows="6"></textarea>\n                </div>\n            </div>\n        </div>\n        <div class="row  menu-container menu-down">\n            <ul class="menu">\n                <li>\n                    <a href="" data-panel="second"><i class="fa fa-angle-down fa-5x"></i></a>\n                </li>\n            </ul>\n        </div>\n    </section>\n\n        <section data-panel="second" class="container invite second">\n\n            <div class="row text-center invite-content ">\n                <div class="">\n                    <h4>Where</h4>\n                </div>\n\n                <div class="row">\n                    <div class="col-xs-8 col-md-6 col-md-offset-2">\n                        <input type="text" class="form-control event-address-street" placeholder="Address"  >\n                    </div>\n                    <div class="col-xs-4 col-md-2">\n                        <input type="text" class="form-control event-address-suite" placeholder="Apt"  >\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-md-4 col-md-offset-2">\n                        <input type="text" class="form-control event-address-city" placeholder="City"  >\n                    </div>\n\n                    <div class="col-xs-8 col-md-2">\n                        <select class="form-control event-address-state" placeholder="State">\n\n                        </select>\n                    </div>\n                    <div class="col-xs-4 col-md-2">\n                        <input type="text" class="form-control event-address-zip" placeholder="Zip"  >\n                    </div>\n                </div>\n            </div>\n            <div class="row menu-container menu-down desktop tablet">\n                <ul class="menu">\n                    <li>\n                        <a href="" data-panel="third"><i class="fa fa-angle-down fa-5x"></i></a>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <section data-panel="third" class="container invite third">\n            <div class="row text-center invite-content ">\n                <div class="row2 text-center">\n                    <h4>Who is invited?</h4>\n                </div>\n\n                <div class="row zero-margin">\n                    <div class="col-md-4 col-md-offset-2">\n                        <input type="text" class="new-contact-name form-control" placeholder="Name">\n                    </div>\n\n                    <div class="col-md-3">\n                        <input type="text" class="new-contact-phone form-control"\n                            ';
  if( features.indexOf('voice') != -1 )  { ;
__p += '\n                                data-validation=\'required,email|phone\' placeholder=\'Phone Number or Email Address\'\n                            ';
 } else { ;
__p += '\n                                data-validation=\'required,email\' placeholder=\'Email Address\'\n                            ';
 } ;
__p += '\n                            name="newPhone" id="newPhone">\n                    </div>\n                    <div class="col-md-1">\n                        <button type="button" class="btn btn-info new-contact form-control">+</button>\n                    </div>\n                </div>\n\n                <div class="row2 contact-table">\n                </div>\n            </div>\n\n            <div class="row menu-container menu-down  desktop tablet">\n                <ul class="menu">\n                    <li>\n                        <a href="" data-panel="fourth"><i class="fa fa-angle-down fa-5x"></i></a>\n                    </li>\n                </ul>\n            </div>\n        </section>\n\n        <section data-panel="fourth" class="container invite fourth">\n            <div class="row text-center invite-content">\n                <div id="reportXXX"></div>\n            </div>\n\n             <div class="row  menu-container menu-down">\n                 <div class="row bt_toggle_parent">\n                    <label for="bt_toggle">Share on Facebook</label>\n                    <input type="checkbox"\n                       data-toggle="toggle"\n                       id="bt_toggle"\n                       class="share_to_facebook"\n                       data-style="android"\n                       data-onstyle="info"\n                       data-onstyle="success" data-offstyle="danger" />\n                </div>\n                <button type="button" class="btn form-control btn-success send">Send</button>\n            </div>\n        </section>\n</div>\n\n<!--<ul class="menu">-->\n    <!--<li>-->\n        <!--<a href="" data-panel="first" class="active"><i class="fa fa-circle-line fa-1x"></i></a>-->\n    <!--</li>-->\n    <!--<li>-->\n\n    <!--</li>-->\n    <!--<li>-->\n        <!--<a href="" data-panel="third" ><i class="fa fa-circle-line fa-1x"></i></a>-->\n    <!--</li>-->\n    <!--<li>-->\n        <!--<a href="" data-panel="fourth" ><i class="fa fa-circle-line fa-1x"></i></a>-->\n    <!--</li>-->\n<!--</ul>-->\n\n<!-- Footer -->\n<div class="section-container footer desktop navbar-fixed-bottom">\n<div class="footer-below">\n    <div class="container">\n      <div class="row">\n          <div class="col-lg-12">\n              Miami, FL<br/>\n              Copyright 2014 &copy; iMeet Inc. All rights reserved.\n          </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12 quiet">\n            <br/>Built with love, Internet style\n        </div>\n      </div>\n    </div>\n</div>\n</div>\n';

}
return __p
};

this["JST"]["inviteReport.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\n    <div class="panel">\n         <div class="panel-heading" >\n            <div class="row">\n                 <div class=\'pull-left col-xs-3 col-md-6\'><h2 class=\'invite-title\'></h2></div>\n                 <div class=\'col-xs-9 col-md-4 text-right\'>\n                    <div class=\'col-xs-12 col-md-12 invite-date\'></div>\n                 </div>\n            </div>\n         </div>\n     </div>\n\n    <div class="invite-location row pull-left"></div>\n\n    <div class="invite-content">\n        <div class="col-md-6 attendees">\n            <h5><b>Attendees</b></h5>\n            <div class="invite-table"></div>\n        </div>\n        <div class="col-md-4 hangout">\n            <h5><b>Hangout</b></h5>\n            <ul class="invite-comments">\n            </ul>\n            <input placeholder="Write a comment..." class="invite-newComment form-control ">\n        </div>\n    </div>\n</div>\n\n\n<!-- Footer -->\n<div class="section-container footer desktop navbar-fixed-bottom">\n<div class="footer-below">\n    <div class="container">\n      <div class="row">\n          <div class="col-lg-12">\n              Miami, FL<br/>\n              Copyright 2014 &copy; iMeet Inc. All rights reserved.\n          </div>\n      </div>\n      <div class="row">\n        <div class="col-lg-12 quiet">\n            <br/>Built with love, Internet style\n        </div>\n      </div>\n    </div>\n</div>\n</div>\n\n';

}
return __p
};

this["JST"]["invite_report.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<style>\n  .toggle.android { border-radius: 0px;}\n  .toggle.android .toggle-handle { border-radius: 0px; }\n</style>\n\n<div class="row equidistant invite_report">\n    <div class="col-xs-12 col-md-8 col-md-offset-2">\n        <div class="panel">\n         <div class="panel-heading" >\n                <div class="row">\n                     <div class=\'pull-left col-xs-3 col-md-6\'><h4 class=\'event-name\'></h4></div>\n\n                     <div class=\'col-xs-9 col-md-6 text-right\'>\n                        <div class=\'col-xs-12 col-md-12 event-start-date-formatted\'></div>\n                        <div class=\'col-xs-12 col-md-12 event-end-date-formatted\'></div>\n                     </div>\n                </div>\n             </div>\n         </div>\n\n          <div class="panel-body container">\n\n            <div class=\'left col-xs-12 col-md-6\'>\n                <div class=\' event-description\'></div>\n                <div class=\'small-margin-top event-where\'>\n                    <div class=\'label_title col-md-1 text-right\'>Address:</div>\n                    <div class=\'pull-left col-md-5 text-left small-margin-left\'>\n                        <div class=\'event-address-street-with-number\'></div>\n                        <div class=\'event-address-state-city\'></div>\n                        <div class=\'event-address-zip\'></div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\' right col-xs-12 col-md-3\'>\n                <ul class="contact-read-table" style="list-style: none">\n\n                </ul>\n            </div>\n          </div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["invite_sent.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal-content">\n    <form id="registerForm">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n\n        <div class="container">\n            <div class="row">\n                Invite Link <a href="http://imeet.io/view/';
  print(invite_id) ;
__p += '"><h5 class="text-lowercase">http://imeet.io/view/';
  print(invite_id) ;
__p += '</h5></a>\n            </div>\n            <div class="row small-margin-top"></div>\n            <div class="row">\n               Register\n               <div class="controls">\n                   <div class="col-sm-3"></div>\n                    <div class="col-sm-6">\n                        <div class="col-sm-9">\n                            <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\n                        </div>\n                        <div class="col-sm-3">\n                            <button type="button" class="btn btn-success form-control submit-register">Go</button>\n                        </div>\n                    </div>\n                    <div class="col-sm-3"></div>\n                </div>\n           </div>\n        </div>\n    </form>\n</div>\n';

}
return __p
};

this["JST"]["register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\n    <form id="registerForm">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n        <div class="container">\n            <h4>I want in!</h4>\n           <div class="row controls">\n               <div class="col-sm-3"></div>\n                <div class="col-sm-6">\n                    <div class="col-sm-9">\n                        <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\n                    </div>\n                    <div class="col-sm-3">\n                        <button type="button" class="btn btn-success form-control submit-register">Go</button>\n                    </div>\n                </div>\n                <div class="col-sm-3"></div>\n            </div>\n        </div>\n    </form>\n</div>\n';

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