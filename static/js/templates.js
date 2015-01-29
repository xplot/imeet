this["JST"] = this["JST"] || {};

this["JST"]["contact_item.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td class="editable">' +
__e( name ) +
'</td>\r\n<td>' +
__e( email ) +
'</td>\r\n<td>' +
__e( phone ) +
'</td>\r\n<td><a class="update-contact" href="api/contacts/' +
__e( unique_id ) +
'"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>\r\n<a class="delete-contact" href="api/contacts/' +
__e( unique_id ) +
'"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>';

}
return __p
};

this["JST"]["editProfile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="edit-profile-view">\r\n\r\n   <div class="col-xs-12 text-center">\r\n       <h4>Edit your profile</h4>\r\n   </div>\r\n\r\n   <div class="col-xs-12 text-center">\r\n       <div id="edit-profile-email">Email</div>\r\n   </div>\r\n\r\n   <div class="col-xs-12 text-center">\r\n       <input id="edit-profile-name" type="text" class="form-control valid-before-submit" placeholder="John Smith..." data-validation="required">\r\n   </div>\r\n\r\n   <div class="col-xs-12 text-center">\r\n       <input id="edit-profile-username" type="text" class="form-control valid-before-submit" placeholder="username..." data-validation="required">\r\n   </div>\r\n\r\n   <div class="col-xs-12 text-center">\r\n       <input id="edit_profile_password" name="edit_profile_password" type="password" class="form-control valid-before-submit" placeholder="password..." data-validation="required">\r\n   </div>\r\n\r\n    <div class="col-xs-12 text-center">\r\n       <input name="edit_profile_password_confirm" id="edit_profile_password_confirm" type="password" class="form-control valid-before-submit" placeholder=" confirm password..." data-validation="required">\r\n   </div>\r\n\r\n    <div class="col-xs-12 text-center">\r\n       <button type=\'button\' class=\'save-profile btn btn-info form-control\'>Save</button>\r\n    </div>\r\n\r\n</div>\r\n';

}
return __p
};

this["JST"]["edit_contact.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="form-horizontal contacts-form">\r\n  <div class="form-group">\r\n    <label for="nameInput">Name</label>\r\n    <input type="text" class="form-control" id="nameInput" placeholder="Jane Doe">\r\n  </div>\r\n\r\n  <div class="form-group">\r\n    <label for="emailInput">Email contact</label>\r\n    <input type="email" class="form-control" id="emailInput" placeholder="jane.doe@example.com">\r\n  </div>\r\n  <div class="form-group">\r\n    <label for="phoneInput">Phone number</label>\r\n    <input type="text" class="form-control" id="phoneInput" placeholder="123-456-7890">\r\n  </div>\r\n\r\n  <div class="form-group">\r\n    <button id="save-contact" type="submit" class="btn btn-default">Add contact</button>\r\n  </div>\r\n</div>';

}
return __p
};

this["JST"]["invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="snap-panel invite-create">\r\n    <section data-panel="first" class="container invite first">\r\n        <div class="row text-center invite-content ">\r\n            <div class="">\r\n                <h4>Event</h4>\r\n            </div>\r\n            <div class="">\r\n\r\n                ';
  if( currentUser == null )  { ;
__p += '\r\n                    <label class="small-text">\r\n                    Note: For sms/calls to work, you have to be a registered\r\n                    <br/>\r\n                    Note2: Sms/calls will be free only during the beta phase. After that a subscription base fee will be offered\r\n                    </label>\r\n                ';
 } ;
__p += '\r\n            </div>\r\n            <div class="row">\r\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n                    <input required type="text" class="form-control event-name valid-before-submit" placeholder="Event" autofocus data-validation="required" >\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row">\r\n                <div class="col-xs-12  col-md-3 col-md-offset-2">\r\n                    <div class="date-group" id="start-date-group">\r\n                        <input readonly="true" required type="text" class="date event-start-date valid-before-submit" placeholder="01/01/2000"\r\n                               data-validation="required,date"\r\n                        >\r\n                        <input readonly="true" required type="int" class="time event-start-time  valid-before-submit" placeholder="00:00 AM" data-validation="required" >\r\n                    </div>\r\n                </div>\r\n                <div class="col-xs-12 col-md-2 text-center label-text">\r\n                    To\r\n                </div>\r\n                <div class="col-xs-12 col-md-3">\r\n                    <div class="date-group">\r\n                        <input readonly="true" required type="text" class="date event-end-date" placeholder="01/01/2000">\r\n                        <input readonly="true" required type="text" class="time event-end-time" placeholder="00:00 AM"  >\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="row">\r\n                <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n                  <textarea class="form-control event-description desktop tablet" rows="6"></textarea>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="row  menu-container menu-down">\r\n            <ul class="menu">\r\n                <li>\r\n                    <a href="" data-panel="second"><i class="fa fa-angle-down fa-5x"></i></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </section>\r\n\r\n        <section data-panel="second" class="container invite second">\r\n\r\n            <div class="row text-center invite-content ">\r\n                <div class="">\r\n                    <h4>Where</h4>\r\n                </div>\r\n\r\n                <div class="row">\r\n                    <div class="col-xs-8 col-md-6 col-md-offset-2">\r\n                        <input type="text" class="form-control event-address-street" placeholder="Address"  >\r\n                    </div>\r\n                    <div class="col-xs-4 col-md-2">\r\n                        <input type="text" class="form-control event-address-suite" placeholder="Apt"  >\r\n                    </div>\r\n                </div>\r\n                <div class="row">\r\n                    <div class="col-xs-12 col-md-4 col-md-offset-2">\r\n                        <input type="text" class="form-control event-address-city" placeholder="City"  >\r\n                    </div>\r\n\r\n                    <div class="col-xs-8 col-md-2">\r\n                        <select class="form-control event-address-state" placeholder="State">\r\n\r\n                        </select>\r\n                    </div>\r\n                    <div class="col-xs-4 col-md-2">\r\n                        <input type="text" class="form-control event-address-zip" placeholder="Zip"  >\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class="row menu-container menu-down desktop tablet">\r\n                <ul class="menu">\r\n                    <li>\r\n                        <a href="" data-panel="third"><i class="fa fa-angle-down fa-5x"></i></a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </section>\r\n\r\n        <section data-panel="third" class="container invite third">\r\n            <div class="row text-center invite-content ">\r\n                <div class="row2 text-center">\r\n                    <h4>Who is invited?</h4>\r\n                </div>\r\n\r\n                <div class="row zero-margin">\r\n                    <div class="col-md-4 col-md-offset-2">\r\n                        <input type="text" class="new-contact-name form-control" placeholder="Name">\r\n                    </div>\r\n\r\n                    <div class="col-md-3">\r\n                        <input type="text" class="new-contact-phone form-control"\r\n                            ';
  if( features.indexOf('voice') != -1 )  { ;
__p += '\r\n                                data-validation=\'required,email|phone\' placeholder=\'Phone Number or Email Address\'\r\n                            ';
 } else { ;
__p += '\r\n                                data-validation=\'required,email\' placeholder=\'Email Address\'\r\n                            ';
 } ;
__p += '\r\n                            name="newPhone" id="newPhone">\r\n                    </div>\r\n                    <div class="col-md-1">\r\n                        <button type="button" class="btn btn-info new-contact form-control">+</button>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class="row2 contact-table">\r\n                </div>\r\n            </div>\r\n\r\n            <div class="row menu-container menu-down  desktop tablet">\r\n                <ul class="menu">\r\n                    <li>\r\n                        <a href="" data-panel="fourth"><i class="fa fa-angle-down fa-5x"></i></a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </section>\r\n\r\n        <section data-panel="fourth" class="container invite fourth">\r\n            <div class="row text-center invite-content">\r\n                <div id="reportXXX"></div>\r\n            </div>\r\n\r\n             <div class="row  menu-container menu-down">\r\n                 <div class="row bt_toggle_parent">\r\n                    <label for="bt_toggle">Share on Facebook</label>\r\n                    <input type="checkbox"\r\n                       data-toggle="toggle"\r\n                       id="bt_toggle"\r\n                       class="share_to_facebook"\r\n                       data-style="android"\r\n                       data-onstyle="info"\r\n                       data-onstyle="success" data-offstyle="danger" />\r\n                </div>\r\n                <button type="button" class="btn form-control btn-success send">Send</button>\r\n            </div>\r\n        </section>\r\n</div>\r\n\r\n<!--<ul class="menu">-->\r\n    <!--<li>-->\r\n        <!--<a href="" data-panel="first" class="active"><i class="fa fa-circle-line fa-1x"></i></a>-->\r\n    <!--</li>-->\r\n    <!--<li>-->\r\n\r\n    <!--</li>-->\r\n    <!--<li>-->\r\n        <!--<a href="" data-panel="third" ><i class="fa fa-circle-line fa-1x"></i></a>-->\r\n    <!--</li>-->\r\n    <!--<li>-->\r\n        <!--<a href="" data-panel="fourth" ><i class="fa fa-circle-line fa-1x"></i></a>-->\r\n    <!--</li>-->\r\n<!--</ul>-->\r\n\r\n<!-- Footer -->\r\n<div class="section-container footer desktop navbar-fixed-bottom">\r\n<div class="footer-below">\r\n    <div class="container">\r\n      <div class="row">\r\n          <div class="col-lg-12">\r\n              Miami, FL<br/>\r\n              Copyright 2014 &copy; iMeet Inc. All rights reserved.\r\n          </div>\r\n      </div>\r\n      <div class="row">\r\n        <div class="col-lg-12 quiet">\r\n            <br/>Built with love, Internet style\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["inviteReport.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="invite-view">\r\n    <div class="panel">\r\n         <div class="panel-heading" >\r\n            <div class="row">\r\n                 <div class=\'pull-left col-xs-3 col-md-6\'><h2 class=\'invite-title\'></h2></div>\r\n                 <div class=\'col-xs-9 col-md-4 text-right\'>\r\n                    <div class=\'col-xs-12 col-md-12 invite-date\'></div>\r\n                 </div>\r\n            </div>\r\n         </div>\r\n     </div>\r\n\r\n    <div class="invite-location row pull-left"></div>\r\n\r\n    <div class="invite-content">\r\n        <div class="col-md-6 attendees">\r\n            <h5><b>Attendees</b></h5>\r\n            <div class="invite-table"></div>\r\n        </div>\r\n        <div class="col-md-4 hangout">\r\n            <h5><b>Hangout</b></h5>\r\n            <ul class="invite-comments">\r\n            </ul>\r\n            <input placeholder="Write a comment..." class="invite-newComment form-control ">\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<!-- Footer -->\r\n<div class="section-container footer desktop navbar-fixed-bottom">\r\n<div class="footer-below">\r\n    <div class="container">\r\n      <div class="row">\r\n          <div class="col-lg-12">\r\n              Miami, FL<br/>\r\n              Copyright 2014 &copy; iMeet Inc. All rights reserved.\r\n          </div>\r\n      </div>\r\n      <div class="row">\r\n        <div class="col-lg-12 quiet">\r\n            <br/>Built with love, Internet style\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["invite_report.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<style>\r\n  .toggle.android { border-radius: 0px;}\r\n  .toggle.android .toggle-handle { border-radius: 0px; }\r\n</style>\r\n\r\n<div class="row equidistant invite_report">\r\n    <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n        <div class="panel">\r\n         <div class="panel-heading" >\r\n                <div class="row">\r\n                     <div class=\'pull-left col-xs-3 col-md-6\'><h4 class=\'event-name\'></h4></div>\r\n\r\n                     <div class=\'col-xs-9 col-md-6 text-right\'>\r\n                        <div class=\'col-xs-12 col-md-12 event-start-date-formatted\'></div>\r\n                        <div class=\'col-xs-12 col-md-12 event-end-date-formatted\'></div>\r\n                     </div>\r\n                </div>\r\n             </div>\r\n         </div>\r\n\r\n          <div class="panel-body container">\r\n\r\n            <div class=\'left col-xs-12 col-md-6\'>\r\n                <div class=\' event-description\'></div>\r\n                <div class=\'small-margin-top event-where\'>\r\n                    <div class=\'label_title col-md-1 text-right\'>Address:</div>\r\n                    <div class=\'pull-left col-md-5 text-left small-margin-left\'>\r\n                        <div class=\'event-address-street-with-number\'></div>\r\n                        <div class=\'event-address-state-city\'></div>\r\n                        <div class=\'event-address-zip\'></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\' right col-xs-12 col-md-3\'>\r\n                <ul class="contact-read-table" style="list-style: none">\r\n\r\n                </ul>\r\n            </div>\r\n          </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n';

}
return __p
};

this["JST"]["invite_sent.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="modal-content">\r\n    <form id="registerForm">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class="container">\r\n            <div class="row">\r\n                Invite Link <a href="http://imeet.io/view/';
  print(invite_id) ;
__p += '"><h5 class="text-lowercase">http://imeet.io/view/';
  print(invite_id) ;
__p += '</h5></a>\r\n            </div>\r\n            <div class="row small-margin-top"></div>\r\n            <div class="row">\r\n               Register\r\n               <div class="controls">\r\n                   <div class="col-sm-3"></div>\r\n                    <div class="col-sm-6">\r\n                        <div class="col-sm-9">\r\n                            <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\r\n                        </div>\r\n                        <div class="col-sm-3">\r\n                            <button type="button" class="btn btn-success form-control submit-register">Go</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class="col-sm-3"></div>\r\n                </div>\r\n           </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n';

}
return __p
};

this["JST"]["login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row medium-margin-top">\r\n   <div class="col-md-12 section-item contact-table equidistant">\r\n      <form id="loginForm" action="/login" method="post">\r\n          <section class="section">\r\n              <div class="row controls">\r\n                  <div class="col-sm-4"></div>\r\n                  <div class="col-sm-4 medium-margin">\r\n                      <h4>Login</h4>\r\n                      <fieldset>\r\n                          <div class="row">\r\n                              <div class="col-sm-1"></div>\r\n                              <div class="col-sm-10">\r\n                                  <input id="username" name="username" required type="text" class="form-control small-margin" placeholder="Username">\r\n                                  <input id="password" name="password" required type="password" class="form-control small-margin" placeholder="Password">\r\n                              </div>\r\n                              <div class="col-sm-1"></div>\r\n\r\n                          </div>\r\n                          <div class="row">\r\n                              <div class="col-sm-1"></div>\r\n                              <div class="col-sm-10">\r\n                                  <label class="remember pull-right" style="padding: 10px">\r\n                                    Remember me?\r\n                                    <input type="checkbox" name="remember_me" id="remember_me" value="on">\r\n                                  </label>\r\n                              </div>\r\n                              <div class="col-sm-1"></div>\r\n                          </div>\r\n                          <div class="row">\r\n                              <div class="col-sm-1"></div>\r\n                              <div class="col-sm-10"><button type="submit" class="btn btn-success form-control pull-right">Login</button></div>\r\n                              <div class="col-sm-1"></div>\r\n                          </div>\r\n\r\n                          <div class="row" style="margin-top: 20px">\r\n                              <div class="col-sm-1"></div>\r\n                              <div class="col-sm-10">\r\n                                  <div id="third_party_login">\r\n                                      <ul class="social-login-icons">\r\n                                          <li style="width: auto">\r\n\r\n                                          </li>\r\n                                          <li>\r\n                                              <a href="/social_login/google">\r\n                                                  <i class="fa fa-google fa-2x"></i>\r\n                                              </a>\r\n                                          </li>\r\n                                          <li>\r\n\r\n                                              <a href="/social_login/facebook">\r\n                                                  <i class="fa fa-facebook fa-2x"></i>\r\n                                              </a>\r\n                                          </li>\r\n                                      </ul>\r\n                                  </div>\r\n                              </div>\r\n                              <div class="col-sm-1"></div>\r\n                          </div>\r\n\r\n                          <div class="row" style="margin-top: 20px">\r\n                              <div class="col-sm-1"></div>\r\n                              <div class="col-sm-10">\r\n                                  <label class="remember pull-right">\r\n                                      <a href=\'/password-forgot\'>Forgot your password?</a>\r\n                                  </label>\r\n                              </div>\r\n                              <div class="col-sm-1"></div>\r\n                          </div>\r\n\r\n                          <div class="row">\r\n                              <div class="col-sm-1"></div>\r\n                              <div class="col-sm-10">\r\n                                  <label class="remember pull-right">\r\n                                      Don\'t have an account?\r\n                                      <a href="/register" class="">Sign Up - It\'s Free.</a>\r\n                                  </label>\r\n                              </div>\r\n                              <div class="col-sm-1"></div>\r\n                          </div>\r\n                      </fieldset>\r\n                  </div>\r\n                  <div class="col-sm-4"></div>\r\n              </div>\r\n          </section>\r\n        </form>\r\n    </div>\r\n</div>';

}
return __p
};

this["JST"]["register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-content">\r\n    <form id="registerForm">\r\n        <div class="close-modal" data-action="dismiss">\r\n            <div class="lr">\r\n                <div class="rl">\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="container">\r\n            <h4>I want in!</h4>\r\n           <div class="row controls">\r\n               <div class="col-sm-3"></div>\r\n                <div class="col-sm-6">\r\n                    <div class="col-sm-9">\r\n                        <input required type="email" class="form-control register-email" placeholder="Enter email..." data-validation="email">\r\n                    </div>\r\n                    <div class="col-sm-3">\r\n                        <button type="button" class="btn btn-success form-control submit-register">Go</button>\r\n                    </div>\r\n                </div>\r\n                <div class="col-sm-3"></div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>\r\n';

}
return __p
};

this["JST"]["search.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="search-view">\r\n    <div class="controls">\r\n        <div class="col-sm-10">\r\n            <input id="searchBox" type="text" class="form-control event-name" placeholder="Invite Title" data-validation="required">\r\n        </div>\r\n        <div class="col-sm-2">\r\n            <button type="button" class="btn btn-success form-control search">Search</button>\r\n        </div>\r\n    </div>\r\n    <div class="" style="height: 50px"></div>\r\n    <div class="search-result">\r\n    </div>\r\n</div>\r\n\r\n';

}
return __p
};