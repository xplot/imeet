
// First, checks if it isn't implemented yet.
if (!String.prototype.format)
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };

Backbone.Model.prototype.toJSON2 = function() {
  var json = _.clone(this.attributes);
  for(var attr in json) {
    if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
      json[attr] = json[attr].toJSON();
    }
  }
  return json;
};

function guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function alert_notification(alerts){

    $('.alert').remove();

    var alert_string = '' +
        '<div class="alert alert-{0} alert-dismissible flyover flyover-in" role="alert">'+
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '{1}' +
        '</div>';

    var $alertDiv = $('body');
    alerts.forEach(function(alert){
        $alertDiv.prepend(alert_string.format(alert.alertType, alert.message));
    });
}

var validator = {
    digitsRegex: new RegExp("^[0-9]{10}$"),
    charsRegex: new RegExp(".*"),
    emailRegex:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    validateItems: function(selector){
        var result = true;
        var $elements_to_validate = $(selector);

        $elements_to_validate.each(function(index){
            var $item = $($elements_to_validate[index]);
            result = validator.validateItem($item) && result ;
        });
        return result;
    },

    validateString:function(fieldValue, validation){
        var passed = false;
        switch(validation){
            case "required":
                passed = fieldValue.length > 0;
                break;
            case "digits":
                passed = validator.digitsRegex.test(fieldValue);
                break;
            case "non_numerics":
                passed = validator.charsRegex.test(fieldValue);
                break;
            case "email":
                passed = fieldValue.length == 0 ||  validator.emailRegex.test(fieldValue);
                break;
            case "phone":
                passed = validator.digitsRegex.test(fieldValue) || fieldValue.length == 0 ;
                break;
            case "date":
                var date = new Date(fieldValue);
                passed = date instanceof Date && !isNaN(date.valueOf());
                break;
            case "time":
                passed = true;
                break;
        }

        return passed;
    },
    validateItem:function($item){
        var totalResult = true;

        var validations = $item.data('validation');
        validations.split(',').forEach(function(validation){
            var length = -1;
            if(validation.indexOf(':')>=0){
                var split = validation.split(':');
                validation = split[0];
                length = parseInt(split[1]);
            }

            var passed;
            try
            {
                var fieldValue = $item.val();
                if($item.is(':checkbox')){
                    if(!$item.is(':checked'))
                        fieldValue = "";
                }

                //Composed Validations
                if(validation.indexOf('|') != -1 ){

                    var composedValidation = function(values, validations){
                        var validations = validation.split('|');
                        var valueList = values.split(',');
                        if(valueList.length == 0 || validations.length == 0)
                            return true;

                        var allValuesGood = true;
                        valueList.forEach(function(value){
                            value = value.trim();
                            var atLeastOne = false;
                            validations.forEach(function(validation){
                                atLeastOne = validator.validateString(value, validation) || atLeastOne;
                            });

                            allValuesGood = allValuesGood && atLeastOne;
                        });

                        return allValuesGood;
                    };

                    passed = composedValidation(fieldValue, validation)
                }
                else
                    passed = validator.validateString(fieldValue, validation);

                if(length != -1)
                    passed = passed && fieldValue.length == length;
            }
            catch(err){
                passed = false
            }
            totalResult = passed && totalResult;
        });

        if($item.is(':checkbox')){
            $item = $item.parent();
        }

        if(!totalResult)
            this.errorValidationForItem($item);
        else
            this.succeedValidationForItem($item);

        return totalResult;
    },

    errorValidationForItem: function($item){
        this.validationUI($item, true);
    },
    succeedValidationForItem: function($item){
        this.validationUI($item, false);
    },

    validationUI:function($item, failed){
        if(failed)
            $item.addClass('failed-validation');
        else
            $item.removeClass('failed-validation');
        var siblingItems = $item.data('validation-siblings');

        if(siblingItems != null){
            siblingItems.split(',').forEach(function(sibling){
                var $sibling = $(sibling);
                if(failed)
                    $sibling.addClass('failed-validation');
                else
                    $sibling.removeClass('failed-validation');
            });
        }
    }
};

var randomColor = function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var cut = function cutText(text) {
    if(text.length >= 8)
        return text.substring(0,8) + "...";
    return text;
}

var colorInverter = function invertHex(hexnum){
  if(hexnum.length != 6) {
    console.error("Hex color must be six hex numbers in length.");
    return false;
  }

  hexnum = hexnum.toUpperCase();
  var splitnum = hexnum.split("");
  var resultnum = "";
  var simplenum = "FEDCBA9876".split("");
  var complexnum = new Array();
  complexnum.A = "5";
  complexnum.B = "4";
  complexnum.C = "3";
  complexnum.D = "2";
  complexnum.E = "1";
  complexnum.F = "0";

  for(i=0; i<6; i++){
    if(!isNaN(splitnum[i])) {
      resultnum += simplenum[splitnum[i]];
    } else if(complexnum[splitnum[i]]){
      resultnum += complexnum[splitnum[i]];
    } else {
      console.error("Hex colors must only include hex numbers 0-9, and A-F");
      return false;
    }
  }

  return resultnum;
}




