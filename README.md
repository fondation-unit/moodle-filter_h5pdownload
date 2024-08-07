# moodle-filter_h5pdownload

This plugin adds a button at the bottom of H5P activities on a Moodle page. When the button is clicked, a modal window appears and displays information about the license mentioned in the course (via the `block_informations`), as well as a download button for the H5P file.

## Requirements

> [!IMPORTANT]
> This plugin relies on another block plugin to retrieve the license information for display.
> You must install the [block_informations](https://github.com/fondation-unit/moodle-block_informations) plugin before installing `filter_h5pdownload`.
> 
> See [version.php](version.php) :
> 
> ```php
> $plugin->dependencies = array(
>    'block_informations' => ANY_VERSION
>);
> ```


## Settings

| Setting name     | Description |
| ---------------- | ---------------------------------------------|
| backgroundcolor  | background color of the licence text element |
| textcolor        | color of the licence text |
| licence_intro    | introduction text of the modal |
| licence_target   | the ID of the HTML <a> element containing the licence image ; by default `block_informations-cc-licence` |
| licence_name     | the default licence name, used if no target element is found using the HTML ID from the `licence_target` setting |
| licence_image    | the default licence image, used if no target element is found using the HTML ID from the `licence_target` setting |
| reuse_conditions | text displaying the conditions for reuse of the content |
| licence_url      | the default licence URL, used if no target element is found using the HTML ID from the `licence_target` setting |


## How to use the filter

1. Fill in the various settings from the previous step. Don't forget to fill in the settings of [block_informations](https://github.com/fondation-unit/moodle-block_informations) as well.
2. Set the filter to `On` (or `Off, but available`) for `Content and headings` in Moodle administration, at `/admin/filters.php`.
3. If you have chosen the setting `Off, but available`, you can activate the filter in a course category or within a course through the settings.
4. Add an instance of `block_informations` in your Moodle course.
5. If the filter is active in a course, you should see download buttons at the bottom of each H5P activity.


## Development

Run the watch mode for both CSS and JS :

`grunt watch`

#### Styling

Stylesheets are located in the `sass` folder.

Compile the CSS :

`grunt webpack`

#### Javascript

The typescript files are located in the `src` folder.

Compile the scripts :

`grunt sass`
