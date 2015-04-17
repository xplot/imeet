

class TemplateModel(object):
    """
        At some point this class will obtain the urls from the datastore
        Depending on what Template the user have selected
    """
    def __init__(self, template_id=None):
        self.template_id = template_id

    def get_email_template_url(self):
        return "http://imeet.io/template/default_invite_template.html"

    def get_email_response_url(self):
        return "http://imeet.io/template/default_invite_response.html"