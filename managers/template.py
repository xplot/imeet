

class TemplateModel(object):
    """
        At some point this class will obtain the urls from the datastore
        Depending on what Template the user have selected
    """
    def __init__(self):
        pass

    def get_email_template_url(self):
        return "http://imeet.io/email/{{invite_unique_id}}/{{invite_attendee_id}}"

    def get_email_response_url(self):
        return "http://imeet.io/template/default_invite_response.html"

    def get_email_redirect_url(self):
        return "http://imeet.io/invite/{{invite_unique_id}}/{{unique_id}}"