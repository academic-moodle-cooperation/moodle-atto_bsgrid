# This file is part of Moodle - http://moodle.org/
#
# Moodle is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Moodle is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
#
# Tests for Bootstrap grid.
#
# @package    atto_bsgrid
# @copyright  2015 Guy Thomas <gthomas@moodlerooms.com>
# @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later


@editor @editor_atto @atto @atto_bsgrid @_bug_phantomjs
Feature: Atto bsgrid
  To layout content in Atto, I need to insert bootstrap grids

  Background: Ensure grid button in toolbar
    Given the following config values are set as admin:
      | toolbar  | "bootstrap = bsgrid" | editor_atto  |
      | enabled_templates | col2,col3,col1x3,col3x1,col4,col6 | atto_bsgrid |

  @javascript
  Scenario: Create a 2 column grid
    Given I log in as "admin"
    And the following config values are set as admin:
      | toolbar  | bsgrid = bsgrid | editor_atto |
    And I am on homepage
    And I follow "Courses"
    And I click on "Add a new course" "button"
    And I click on ".editor_atto_content" "css_element"
    And I click on "Bootstrap Grid" "button"
    When I click on "a[title='50% Columns']" "css_element"
    Then ".editor_atto_content .container-fluid .row-fluid" "css_element" should be visible
    And ".editor_atto_content .span2" "css_element" should not exist
    And ".editor_atto_content .span3" "css_element" should not exist
    And ".editor_atto_content .span4" "css_element" should not exist
    And ".editor_atto_content .span6" "css_element" should be visible
    And ".editor_atto_content .span8" "css_element" should not exist

  @javascript
  Scenario: Create a 3 column grid
    Given I log in as "admin"
    And the following config values are set as admin:
      | toolbar  | bsgrid = bsgrid | editor_atto |
    And I am on homepage
    And I follow "Courses"
    And I click on "Add a new course" "button"
    And I click on ".editor_atto_content" "css_element"
    And I click on "Bootstrap Grid" "button"
    When I click on "a[title='33% Columns']" "css_element"
    Then ".editor_atto_content .container-fluid .row-fluid" "css_element" should be visible
    And ".editor_atto_content .span2" "css_element" should not exist
    And ".editor_atto_content .span3" "css_element" should not exist
    And ".editor_atto_content .span4" "css_element" should be visible
    And ".editor_atto_content .span6" "css_element" should not exist
    And ".editor_atto_content .span8" "css_element" should not exist

  @javascript
  Scenario: Create a 25% 75% column grid
    Given I log in as "admin"
    And the following config values are set as admin:
      | toolbar  | bsgrid = bsgrid | editor_atto |
    And I am on homepage
    And I follow "Courses"
    And I click on "Add a new course" "button"
    And I click on ".editor_atto_content" "css_element"
    And I click on "Bootstrap Grid" "button"
    When I click on "a[title='25%, 75% Columns']" "css_element"
    Then ".editor_atto_content .container-fluid .row-fluid" "css_element" should be visible
    And ".editor_atto_content .span2" "css_element" should not exist
    And ".editor_atto_content .span3" "css_element" should not exist
    And ".editor_atto_content .span4" "css_element" should be visible
    And ".editor_atto_content .span6" "css_element" should not exist
    And ".editor_atto_content .span8" "css_element" should be visible

  @javascript
  Scenario: Create a 75% 25% column grid
    Given I log in as "admin"
    And the following config values are set as admin:
      | toolbar  | bsgrid = bsgrid | editor_atto |
    And I am on homepage
    And I follow "Courses"
    And I click on "Add a new course" "button"
    And I click on ".editor_atto_content" "css_element"
    And I click on "Bootstrap Grid" "button"
    When I click on "a[title='75%, 25% Columns']" "css_element"
    Then ".editor_atto_content .container-fluid .row-fluid" "css_element" should be visible
    And ".editor_atto_content .span2" "css_element" should not exist
    And ".editor_atto_content .span3" "css_element" should not exist
    And ".editor_atto_content .span4" "css_element" should be visible
    And ".editor_atto_content .span6" "css_element" should not exist
    And ".editor_atto_content .span8" "css_element" should be visible

  @javascript
  Scenario: Create a 4 column grid
    Given I log in as "admin"
    And the following config values are set as admin:
      | toolbar  | bsgrid = bsgrid | editor_atto |
    And I am on homepage
    And I follow "Courses"
    And I click on "Add a new course" "button"
    And I click on ".editor_atto_content" "css_element"
    And I click on "Bootstrap Grid" "button"
    When I click on "a[title='25% Columns']" "css_element"
    Then ".editor_atto_content .container-fluid .row-fluid" "css_element" should be visible
    And ".editor_atto_content .span2" "css_element" should not exist
    And ".editor_atto_content .span3" "css_element" should be visible
    And ".editor_atto_content .span4" "css_element" should not exist
    And ".editor_atto_content .span6" "css_element" should not exist
    And ".editor_atto_content .span8" "css_element" should not exist

  @javascript
  Scenario: Create a 6 column grid
    Given I log in as "admin"
    And the following config values are set as admin:
      | toolbar  | bsgrid = bsgrid | editor_atto |
    And I am on homepage
    And I follow "Courses"
    And I click on "Add a new course" "button"
    And I click on ".editor_atto_content" "css_element"
    And I click on "Bootstrap Grid" "button"
    When I click on "a[title='16% Columns']" "css_element"
    Then ".editor_atto_content .container-fluid .row-fluid" "css_element" should be visible
    And ".editor_atto_content .span2" "css_element" should be visible
    And ".editor_atto_content .span3" "css_element" should not exist
    And ".editor_atto_content .span4" "css_element" should not exist
    And ".editor_atto_content .span6" "css_element" should not exist
    And ".editor_atto_content .span8" "css_element" should not exist