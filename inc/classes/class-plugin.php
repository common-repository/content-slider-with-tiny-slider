<?php
/**
 * Plugin manifest class.
 *
 * @package content-sliders
 */

namespace Content\Slider\Inc;

use \Content\Slider\Inc\Traits\Singleton;

/**
 * Class Plugin
 */
class Plugin {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		// Load plugin classes.
		Assets::get_instance();
		Blocks::get_instance();

	}

}
