palettes = [{'name': u'green_dark', 'color': u'#fff', 'bg_color': u'#1B5E20'}, {'name': u'amber', 'color': u'#000', 'bg_color': u'#FFE082'}, {'name': u'lightgreen_dark', 'color': u'#fff', 'bg_color': u'#33691E'}, {'name': u'deeporange', 'color': u'#fff', 'bg_color': u'#FF5722'}, {'name': u'amber', 'color': u'#000', 'bg_color': u'#FFC107'}, {'name': u'yellow_light', 'color': u'#000', 'bg_color': u'#FFF59D'}, {'name': u'cyan_dark', 'color': u'#fff', 'bg_color': u'#006064'}, {'name': u'green_light', 'color': u'#000', 'bg_color': u'#A5D6A7'}, {'name': u'lightblue_light', 'color': u'#000', 'bg_color': u'#03A9F4'}, {'name': u'pink', 'color': u'#fff', 'bg_color': u'#F8BBD0'}, {'name': u'indigo', 'color': u'#fff', 'bg_color': u'#3F51B5'}, {'name': u'lightgreen_light', 'color': u'#000', 'bg_color': u'#C5E1A5'}, {'name': u'pink_dark', 'color': u'#fff', 'bg_color': u'#E91E63'}, {'name': u'teal_dark', 'color': u'#fff', 'bg_color': u'#004D40'}, {'name': u'white', 'color': u'#000', 'bg_color': u'#FFFFFF'}, {'name': u'red_dark', 'color': u'#fff', 'bg_color': u'#B71C1C'}, {'name': u'blue_dark', 'color': u'#fff', 'bg_color': u'#0D47A1'}, {'name': u'lime_dark', 'color': u'#fff', 'bg_color': u'#827717'}, {'name': u'yellow_dark', 'color': u'#000', 'bg_color': u'#F57F17'}, {'name': u'deeporange_dark', 'color': u'#fff', 'bg_color': u'#BF360C'}, {'name': u'purple2', 'color': u'#fff', 'bg_color': u'#9575CD'}, {'name': u'amber', 'color': u'#000', 'bg_color': u'#FF6F00'}, {'name': u'lime', 'color': u'#000', 'bg_color': u'#CDDC39'}, {'name': u'cyan_light', 'color': u'#000', 'bg_color': u'#80DEEA'}, {'name': u'brown', 'color': u'#fff', 'bg_color': u'#795548'}, {'name': u'orange_dark', 'color': u'#fff', 'bg_color': u'#E65100'}, {'name': u'indigo_dark', 'color': u'#fff', 'bg_color': u'#1A237E'}, {'name': u'x', 'color': u'#fff', 'bg_color': u'#607D8B'}, {'name': u'deeporange_light', 'color': u'#000', 'bg_color': u'#FFAB91'}, {'name': u'lime_light', 'color': u'#000', 'bg_color': u'#E6EE9C'}, {'name': u'lightblue_light', 'color': u'#000', 'bg_color': u'#B3E5FC'}, {'name': u'teal', 'color': u'#fff', 'bg_color': u'#009688'}, {'name': u'red', 'color': u'#fff', 'bg_color': u'#F44336'}, {'name': u'purple2_dark', 'color': u'#fff', 'bg_color': u'#673AB7'}, {'name': u'orange_light', 'color': u'#000', 'bg_color': u'#FFCC80'}, {'name': u'yellow', 'color': u'#000', 'bg_color': u'#FFEB3B'}, {'name': u'blackblack', 'color': u'#ffffff', 'bg_color': u'#000000'}, {'name': u'blue', 'color': u'#fff', 'bg_color': u'#2196F3'}, {'name': u'blue_light', 'color': u'#000', 'bg_color': u'#BBDEFB'}, {'name': u'purple', 'color': u'#fff', 'bg_color': u'#9C27B0'}, {'name': u'brown_light', 'color': u'#000', 'bg_color': u'#BCAAA4'}, {'name': u'brown_dark', 'color': u'#fff', 'bg_color': u'#3E2723'}, {'name': u'lightblue_dark', 'color': u'#fff', 'bg_color': u'#01579B'}, {'name': u'black', 'color': u'#fff', 'bg_color': u'#9E9E9E'}, {'name': u'teal_light', 'color': u'#000', 'bg_color': u'#80CBC4'}, {'name': u'black_dark', 'color': u'#fff', 'bg_color': u'#212121'}, {'name': u'orange', 'color': u'#000', 'bg_color': u'#FF9800'}, {'name': u'cyan', 'color': u'#000', 'bg_color': u'#00BCD4'}, {'name': u'black_light', 'color': u'#000', 'bg_color': u'#EEEEEE'}, {'name': u'lightgreen', 'color': u'#000', 'bg_color': u'#8BC34A'}, {'name': u'purple_dark', 'color': u'#fff', 'bg_color': u'#4A148C'}, {'name': u'green', 'color': u'#000', 'bg_color': u'#4CAF50'}]


def hex_to_rgb(value):
    value = value.lstrip('#')
    lv = len(value)
    return tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))

template = """.%(name)s{
  .navbar{
    background-color: %(bg_color)s;
    a:focus{
      color: %(color)s;
    }
  .beta{
    background-color: %(color)s !important;
    color: %(bg_color)s !important;
  }
  .palette-editable{
      background-color: %(bg_color)s !important;
      color: %(color)s !important;
  }
  .palette-editable:hover{
      background-color: %(color)s !important;
      color: %(bg_color)s !important;
  }
    .dropdown-menu{
      background-color: %(bg_color)s !important;
    }
  }
  .invite-title-container{
    .main-h1{
      background-color: %(rgb_color)s,0.7) !important;
      color: %(color)s !important;
    }
  }
  #invite-details{
    background-color: %(bg_color)s !important;
    color: %(color)s;
    .save_invite, .edit_invite{
      background-color: %(color)s !important;
      color: %(bg_color)s;
      border: solid 1px %(bg_color)s;
    }
    .save_invite:hover, .edit_invite:hover{
      background-color: %(bg_color)s !important;
      color: %(color)s;
      border: solid 1px %(color)s;
    }
    .date,.time{
      color: #000000;
    }
  }
  .btn{
    background-color: %(rgb_color)s,0.7) !important;
    color: %(color)s;
    border: solid 1px %(bg_color)s;
  }
  .btn:hover{
    background-color: %(color)s !important;
    color: %(bg_color)s;
    border: solid 1px %(bg_color)s;
  }

  .invite-attendees-acknowledge-yes{
    border: solid 1px #01579b !important;
  }

  .invite-attendees-acknowledge-no{
    border: solid 1px #d50000 !important;
  }

  .attendees{
    .panel-heading{
      background-color: %(rgb_color)s,0.7) !important;
      color:%(color)s;
    }
  }
  .edit-invite-description-input, .invite-comment-input{
    background-color: %(rgb_color)s,0.1) !important;
  }


}"""



for x in palettes:
    rgb = hex_to_rgb(x['bg_color'])
    print template %({
        'name': x['name'],
        'bg_color': x['bg_color'],
        'color': x['color'],
        'rgb_color': 'rgba(%s,%s,%s'%(rgb)
    })
