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
 * @copyright  COPYRIGHTINFO
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
var FLAVORCONTROL = 'bsgrid_flavor';
var LOGNAME = 'atto_bsgrid';

var CSS = {
  INPUTSUBMIT: 'atto_bsgrid_selectcolumns',
  FLAVORCONTROL: 'flavorcontrol'
},
    SELECTORS = {
      FLAVORCONTROL: '.flavorcontrol'
    };

var col2_template = '<div class="row"><div class="span6">Column 1</div><div class="span6">Column 2</div></div>';
var col3_template = '<div class="row"><div class="span4">Column 1</div><div class="span4">Column 2</div><div class="span4">Column 3</div></div>';
var col4_template = '<div class="row"><div class="span3">Column 1</div><div class="span3">Column 2</div><div class="span3">Column 3</div><div class="span3">Column 4</div></div>';
var col6_template = '<div class="row"><div class="span2">Column 1</div><div class="span2">Column 2</div><div class="span2">Column 3</div><div class="span2">Column 4</div><div class="span2">Column 5</div><div class="span2">Column 6</div></div>';

var templates = { col2: { template: col2_template, icon: "col2" },
		  col3: { template: col3_template, icon: "col3" },
		  col4: { template: col4_template, icon: "col4" },
		  col6: { template: col6_template, icon: "col6" }
		};

var TEMPLATE = '' +
      '<form class="atto_form">' +
      '<div id="{{elementid}}_{{innerform}}" class="mdl-align">';
for(var t in templates) {
  TEMPLATE += '<button data-template="'+ t + '" class="{{CSS.INPUTSUBMIT}}"><img src="'
    + M.util.image_url("ed/" + templates[t].icon,"atto_bsgrid") + '"/></button>';
};
TEMPLATE +=   '</div>' +
  '</form>';

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
   * Get the id of the flavor control where we store the ice cream flavor
   *
   * @method _getFlavorControlName
   * @return {String} the name/id of the flavor form field
   * @private
   */
  _getFlavorControlName: function(){
    return(this.get('host').get('elementid') + '_' + FLAVORCONTROL);
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
          FLAVORCONTROL: FLAVORCONTROL,
          component: COMPONENTNAME,
          defaultflavor: this.get('defaultflavor'),
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

    // var flavorcontrol = this._form.one(SELECTORS.FLAVORCONTROL);

    // If no file is there to insert, don't do it.
    // if (!flavorcontrol.get('value')){
    //     Y.log('No flavor control or value could be found.', 'warn', LOGNAME);
    //     return;
    // }

    this.editor.focus();
    var templateName = e.target.getAttribute('data-template');
    this.get('host').insertContentAtFocusPoint(templates[templateName].template);
    this.markUpdated();

  }
}, { ATTRS: {
  disabled: {
    value: false
  },

  usercontextid: {
    value: null
  },

  defaultflavor: {
    value: ''
  }
}
   });
