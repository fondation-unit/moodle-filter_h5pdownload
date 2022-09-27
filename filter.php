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

    /*
     * Searches the filtered text for H5P occurrences.
     *
     * @param string $text The text to filter.
     * @param array $options The filter options.
     */
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
            // Non string data or no H5P url don't need to be filtered.
            return $text;
        }

        if ($ishvp or $isintegration) {
            // Early return if the modname matches the conditions.
            $this->load_script($PAGE, $ishvp);
            return $text;
        }

        if (preg_match($h5purl, $text)) {
            $this->load_script($PAGE);
            return $text;
        }

        return $text;
    }

    /*
     * Require the AMD script only once in the page.
     *
     * @param object $page the current page.
     * @param boolean $ishvp the modname is hvp.
     */
    function load_script($page, $ishvp = false) {
        if ($page->requires->should_create_one_time_item_now('h5pdownload_filter')) {
            $page->requires->js_call_amd('filter_h5pdownload/index', 'init', array(
                'cfg' => array(
                    'backgroundColor' => get_config('filter_h5pdownload', 'backgroundcolor'),
                    'textColor' => get_config('filter_h5pdownload', 'textcolor'),
                    'licenceIntro' => get_config('filter_h5pdownload', 'licence_intro'),
                    'licenceTarget' => get_config('filter_h5pdownload', 'licence_target'),
                    'licenceName' => get_config('filter_h5pdownload', 'licence_name'),
                    'licenceImage' => $this->get_licence_image(),
                    'licenceUrl' => get_config('filter_h5pdownload', 'licence_url'),
                    'reuseConditions' => get_config('filter_h5pdownload', 'reuse_conditions'),
                    'isHVP' => $ishvp
                )
            ));
        }
    }

    /*
     * Get the default licence image.
     */
    function get_licence_image() {
        $image = null;
        $imagename = get_config('filter_h5pdownload', 'licence_image');
        if (isset($imagename) && strlen($imagename) > 0) {
            $image = moodle_url::make_pluginfile_url(
                context_system::instance()->id,
                'filter_h5pdownload',
                'licence_image',
                null,
                null,
                $imagename);
            $image = $image->out();
        }
        return $image;
    }
}
