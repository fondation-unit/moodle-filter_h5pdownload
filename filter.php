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
 * Display H5P download pop-up
 *
 * @package    filter_h5pdownload
 * @copyright  2022 Pierre Duverneix - Fondation UNIT
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

class filter_h5pdownload extends moodle_text_filter {
    function filter($text, array $options = array()) {
        global $PAGE;

        $coursectx = $this->context->get_course_context(false);
        if (!$coursectx) {
            return $text;
        }

        $h5purl = '(http[^ &<]*h5p)';
        $ishvp = isset($PAGE->cm->modname) && $PAGE->cm->modname == 'hvp';
        $isintegration = isset($PAGE->cm->modname) && $PAGE->cm->modname == 'h5pactivity';

        if (!is_string($text) or empty($text)) {
            return $text; // Non string data or no H5P url don't need to be filtered.
        }

        if (preg_match($h5purl, $text) or $ishvp or $isintegration) {
            if ($PAGE->requires->should_create_one_time_item_now('h5pdownload_filter')) {
                $PAGE->requires->js_call_amd('filter_h5pdownload/index', 'init', array(
                    'cfg' => array(
                        'backgroundColor' => get_config('filter_h5pdownload', 'backgroundcolor'),
                        'textColor' => get_config('filter_h5pdownload', 'textcolor'),
                        'licenceIntro' => get_config('filter_h5pdownload', 'licence_intro'),
                        'licenceTarget' => get_config('filter_h5pdownload', 'licence_target'),
                        'licenceName' => get_config('filter_h5pdownload', 'licence_name'),
                        'licenceUrl' => get_config('filter_h5pdownload', 'licence_url'),
                        'reuseConditions' => get_config('filter_h5pdownload', 'reuse_conditions'),
                        'isHVP' => $ishvp
                    )
                ));
            }
        }

        return $text;
    }
}
