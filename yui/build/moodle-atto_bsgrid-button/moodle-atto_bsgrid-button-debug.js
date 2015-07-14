YUI.add('moodle-atto_bsgrid-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_bsgrid
 * @copyright  2015 Peter Feigl <peter.feigl@nexoid.at>,
 *             Guy Thomas <gthomas@moodlerooms.com>,
 *             Stuart Lamour <slamour@moodlerooms.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_bsgrid-button
 */

/**
 * Atto text editor bsgrid plugin.
 *
 * @namespace M.atto_bsgrid
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_bsgrid';
var LOGNAME = 'atto_bsgrid';

var CSS = {
  INPUTSUBMIT: 'atto_bsgrid_selectcolumns'
};

// Note - the paragraph tags inside the BS grid divs is important - without it, deleting the contents
// of a column will delete the actuall column!

var col2_template =
    '<div class="atto_bsgrid container-fluid">' +
        '<div class="row-fluid">' +
            '<div class="col-md-6 span6"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-6 span6"><p>'+M.util.get_string('column2', 'atto_bsgrid')+'</p></div>' +
        '</div>' +
    '</div>';
var col3_template =
    '<div class="atto_bsgrid container-fluid">' +
        '<div class="row-fluid">' +
            '<div class="col-md-4 span4"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-4 span4"><p>'+M.util.get_string('column2', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-4 span4"><p>'+M.util.get_string('column3', 'atto_bsgrid')+'</p></div>' +
        '</div>' +
    '</div>';

var col1x3_template =
    '<div class="atto_bsgrid container-fluid">' +
        '<div class="row row-fluid">' +
            '<div class="col-md-4 span4"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-8 span8"><p>'+M.util.get_string('column2', 'atto_bsgrid')+'</p></div>' +
        '</div>' +
    '</div>';

var col3x1_template =
    '<div class="atto_bsgrid container-fluid">' +
        '<div class="row row-fluid">' +
            '<div class="col-md-8 span8"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-4 span4"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
        '</div>' +
    '</div>';


var col4_template =
    '<div class="atto_bsgrid container-fluid">' +
        '<div class="row-fluid">' +
            '<div class="col-md-3 span3"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-3 span3"><p>'+M.util.get_string('column2', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-3 span3"><p>'+M.util.get_string('column3', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-3 span3"><p>'+M.util.get_string('column4', 'atto_bsgrid')+'</p></div>' +
        '</div>' +
    '</div>';

var col6_template =
    '<div class="atto_bsgrid container-fluid">' +
        '<div class="row-fluid">' +
            '<div class="col-md-2 span2"><p>'+M.util.get_string('column1', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-2 span2"><p>'+M.util.get_string('column2', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-2 span2"><p>'+M.util.get_string('column3', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-2 span2"><p>'+M.util.get_string('column4', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-2 span2"><p>'+M.util.get_string('column5', 'atto_bsgrid')+'</p></div>' +
            '<div class="col-md-2 span2"><p>'+M.util.get_string('column6', 'atto_bsgrid')+'</p></div>' +
        '</div>' +
    '</div>';

var templates = { col2: { template: col2_template, icon: "col2", title: M.util.get_string('col2', 'atto_bsgrid') },
          col3: { template: col3_template, icon: "col3", title: M.util.get_string('col3', 'atto_bsgrid') },
        col1x3: { template: col1x3_template, icon: "col1x3", title: M.util.get_string('col1x3', 'atto_bsgrid') },
        col3x1: { template: col3x1_template, icon: "col3x1", title: M.util.get_string('col3x1', 'atto_bsgrid') },
          col4: { template: col4_template, icon: "col4", title: M.util.get_string('col4', 'atto_bsgrid') },
          col6: { template: col6_template, icon: "col6", title: M.util.get_string('col6', 'atto_bsgrid') }
        };
function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}
var TEMPLATE="";
Y.namespace('M.atto_bsgrid').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

  /**
   * Initialize the button
   *
   * @method Initializer
   */
  initializer: function() {
    // If we don't have the capability to view then give up.
    if (this.get('disabled')){
      return;
    }

    var twoicons = ['iconone'];

    TEMPLATE +=
      '<form class="atto_form">' +
      '<div id="{{elementid}}_{{innerform}}" class="mdl-align">';
    for(var t in templates) {
      if(contains(this.get('enabled_templates'),t)) {
        TEMPLATE += '<a class="bsgridtemplateicon {{CSS.INPUTSUBMIT}}" alt="' + templates[t].title +  '" title="' +
                    templates[t].title + '" data-template="'+ t + '">' +
                        '<img src="'+ M.util.image_url("ed/" + templates[t].icon,"atto_bsgrid") + '"/>' +
                    '</a>';
      }
    }

    TEMPLATE += '</div>' + '</form>';

    Y.Array.each(twoicons, function(theicon) {
      // Add the bsgrid icon/buttons
      this.addButton({
        icon: 'ed/' + theicon,
        iconComponent: 'atto_bsgrid',
        buttonName: theicon,
        callback: this._displayDialogue,
        callbackArgs: theicon
      });
    }, this);

  },

  /**
   * Display the bsgrid Dialogue
   *
   * @method _displayDialogue
   * @private
   */
  _displayDialogue: function(e, clickedicon) {
    e.preventDefault();
    var width=400;


    var dialogue = this.getDialogue({
      headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
      width: width + 'px',
      focusAfterHide: clickedicon
    });
    //dialog doesn't detect changes in width without this
    //if you reuse the dialog, this seems necessary
    if(dialogue.width !== width + 'px'){
      dialogue.set('width',width+'px');
    }

    //append buttons to iframe
    var buttonform = this._getFormContent(clickedicon);

    var bodycontent =  Y.Node.create('<div></div>');
    bodycontent.append(buttonform);

    //set to bodycontent
    dialogue.set('bodyContent', bodycontent);
    dialogue.show();
    this.markUpdated();
  },


  /**
   * Return the dialogue content for the tool, attaching any required
   * events.
   *
   * @method _getDialogueContent
   * @return {Node} The content to place in the dialogue.
   * @private
   */
  _getFormContent: function(clickedicon) {
    var template = Y.Handlebars.compile(TEMPLATE),
        content = Y.Node.create(template({
          elementid: this.get('host').get('elementid'),
          CSS: CSS,
          component: COMPONENTNAME,
          clickedicon: clickedicon
        }));

    this._form = content;
    this._form.all('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);
    return content;
  },

  /**
   * Inserts the users input onto the page
   * @method _getDialogueContent
   * @private
   */
  _doInsert : function(e){
    e.preventDefault();
    this.getDialogue({
      focusAfterHide: null
    }).hide();
    this.editor.focus();
    var templateName = e.currentTarget.getAttribute('data-template');
    this.get('host').insertContentAtFocusPoint(templates[templateName].template);
    this.markUpdated();

  }
}, { ATTRS: {
  enabled_templates: {
    values: ['col2','col3','col1x3','col3x1','col4','col6']
  }
}
   });


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
