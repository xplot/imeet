from models import Palette

palettes = []
for x in Palette.query().fetch():
    palettes.append({
        'name': x.name,
        'bg_color':x.main_bg_color,
        'color': x.main_color
    })


print palettes
