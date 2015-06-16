from google.appengine.ext import ndb

from models import Palette
from query.invite import InviteNotFoundException
from query.attendee import InviteAttendeeQuery


class PaletteQuery(object):

    def __init__(self, palette_unique_id=None, palette=None):
        self.palette = palette
        self.palette_unique_id = palette_unique_id

    def query(self):
        """
        Returns a view of the Palette
        """

        if not self.palette:
            self.palette = Palette.get_by_unique_id(self.palette_unique_id)

        return {
            'unique_id': self.palette.unique_id,
            'name': self.palette.name,
            'main_color': self.palette.main_color,
            'main_bg_color': self.palette.main_bg_color
        }
