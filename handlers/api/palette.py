from base import JsonHandler
from query import AllPaletteQuery


class PaletteHandler(JsonHandler):

    def get(self):
        """Get all the Palette in inventory"""
        return AllPaletteQuery().query()
