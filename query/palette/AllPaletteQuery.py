from google.appengine.ext import ndb

from models import Palette
from .PaletteQuery import PaletteQuery


class AllPaletteQuery(object):

    def __init__(self):
        pass

    def query(self):
        """
        Returns a list of all designed palettes
        """

        return [
            PaletteQuery(palette=x).query() for x in Palette.query().fetch()
        ]
