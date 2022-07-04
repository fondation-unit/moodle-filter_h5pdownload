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
 * Display H5P download settings
 *
 * @package    filter_h5pdownload
 * @copyright  2022 Pierre Duverneix - Fondation UNIT
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    $default_target_id = 'block_punchy-cc-licence';

    // Licence area background color
    $name = 'filter_h5pdownload/backgroundcolor';
    $title = get_string('settings:backgroundcolor', 'filter_h5pdownload');
    $description = get_string('settings:backgroundcolor_desc', 'filter_h5pdownload');
    $setting = new admin_setting_configcolourpicker($name, $title, $description, '');
    $setting->set_updatedcallback('theme_reset_all_caches');
    $settings->add($setting);

    // Licence area text color
    $name = 'filter_h5pdownload/textcolor';
    $title = get_string('settings:textcolor', 'filter_h5pdownload');
    $description = get_string('settings:textcolor_desc', 'filter_h5pdownload');
    $setting = new admin_setting_configcolourpicker($name, $title, $description, '');
    $setting->set_updatedcallback('theme_reset_all_caches');
    $settings->add($setting);

    // Licence intro
    $name = 'filter_h5pdownload/licence_intro';
    $title = get_string('settings:licence_intro', 'filter_h5pdownload');
    $default = get_string('settings:licence_intro_default', 'filter_h5pdownload');
    $setting = new admin_setting_configtext($name, $title, null, $default, PARAM_TEXT);
    $settings->add($setting);

    // Grab licence from block_punchy plugin
    $name = 'filter_h5pdownload/licence_target';
    $title = get_string('settings:licence_target', 'filter_h5pdownload');
    $desc = get_string('settings:licence_target', 'filter_h5pdownload');
    $setting = new admin_setting_configtext($name, $title, $desc, $default_target_id, PARAM_TEXT);
    $settings->add($setting);

    // Licence name
    $name = 'filter_h5pdownload/licence_name';
    $title = get_string('settings:licence_name', 'filter_h5pdownload');
    $desc = get_string('settings:licence_name', 'filter_h5pdownload');
    $default = get_string('settings:licence_name_default', 'filter_h5pdownload');
    $setting = new admin_setting_configtext($name, $title, $desc, $default, PARAM_TEXT);
    $settings->add($setting);

    // Conditons of reuse
    $name = 'filter_h5pdownload/reuse_conditions';
    $title = get_string('settings:reuse_conditions', 'filter_h5pdownload');
    $default = get_string('settings:reuse_conditions_default', 'filter_h5pdownload');
    $setting = new admin_setting_configtext($name, $title, null, $default, PARAM_TEXT);
    $settings->add($setting);

    // Licence URL
    $name = 'filter_h5pdownload/licence_url';
    $title = get_string('settings:licence_url', 'filter_h5pdownload');
    $default = get_string('settings:licence_url_default', 'filter_h5pdownload');
    $setting = new admin_setting_configtext($name, $title, null, $default, PARAM_URL);
    $settings->add($setting);
}
