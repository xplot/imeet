

class TemplateModel(object):

    def __init__(self, template_id):
        self.template = None

    def get_email_template_url(self):
        return "http://imeet.io/template/default_invite_template.html"

    def get_email_response_url(self):
        return "http://imeet.io/template/default_invite_response.html"