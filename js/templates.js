this["JST"] = this["JST"] || {};

this["JST"]["../views/invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '    <div class="modal-content">\n        <div class="close-modal" data-action="dismiss">\n            <div class="lr">\n                <div class="rl">\n                </div>\n            </div>\n        </div>\n\n        <div class="container contact-table">\n            <form id="newInviteForm">\n                <div class="row controls">\n                    <div class="col-sm-6">\n                        <input required type="text" class="form-control event-name" placeholder="Event" required>\n                    </div>\n                    <div class="col-sm-3">\n                        <input required type="date" class="form-control event-date" placeholder="when..." required name="when" id="when">\n                    </div>\n                    <div class="col-sm-3">\n                        <button type="button" class="btn btn-success form-control send">Create Invite</button>\n                    </div>\n                </div>\n            </form>\n            <div class="row medium-margin line"></div>\n\n            <h4>Attendees</h4>\n            <form id="newContactForm">\n                <div class="row">\n                        <div class="col-sm-3">\n                            <input type="text" class="new-contact-name form-control" placeholder="Name">\n                        </div>\n                        <div class="col-sm-3">\n                            <input type="text" class="new-contact-phone form-control"\n                                   placeholder="Phone Number" name="newPhone" id="newPhone">\n                        </div>\n                        <div class="col-sm-3">\n                            <input type="email"\n                                   class="new-contact-email form-control" placeholder="Email">\n                            <p class="help-block text-danger"></p>\n                        </div>\n                        <div class="col-sm-3">\n                            <button type="button" class="btn btn-info new-contact form-control">+</button>\n                        </div>\n                </div>\n            </form>\n            <div class="row medium-margin line"></div>\n        </div>\n    </div>\n';

}
return __p
};