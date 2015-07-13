<?php
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

/**
 * Atto text editor integration version file.
 *
 * @package    atto_bsgrid
 * @copyright  2015 Peter Feigl <peter.feigl@nexoid.at>,
 *             Guy Thomas <gthomas@moodlerooms.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();


/**
 * Initialise this plugin
 * @param string $elementid
 */
function atto_bsgrid_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
        [
            'insert',
            'cancel',
            'column1',
            'column2',
            'column3',
            'column4',
            'column5',
            'column6',
            'col2',
            'col3',
            'col1x3',
            'col3x1',
            'col4',
            'col6',
            'dialogtitle'
        ],
        'atto_bsgrid'
    );
}

/**
 * Return the js params required for this module.
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_bsgrid_params_for_js($elementid, $options, $fpoptions) {
    // Get config
    $config = get_config('atto_bsgrid', 'enabled_templates');

    // Explode settings csv values
    $attributes = explode(',', $config);

    // Return object
    return array(
        'enabled_templates' => $attributes
    );
}

