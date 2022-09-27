# moodle-filter_h5pdownload

Adds a hover button to H5P activities that are inserted via Moodle's Atto editor. It opens a pop-up displaying information about the content license and allows the `.h5p` file to be downloaded.

## Setup

Set the filter to **On** for **contents and title** in Moodle administration.

## Development

Run the watch mode for both CSS and JS :

`grunt watch`

Compile the CSS :

`grunt webpack`

Compile the scripts :

`grunt sass`
