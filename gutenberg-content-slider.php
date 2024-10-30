<?php
	/**
	 * Plugin Name: Content Sliders - Essential Slider Block
	 * Description: Tiny, Powerful, and Super-fast Gutenberg Essential Slider Block.
	 * Plugin URI:  https://unei.dev/index.php/slider/
	 * Author:      delowardev
	 * Author URI:  https://delowar.dev/
	 * License:     GPL2
	 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
	 * Version:     1.0.2
	 * Requires PHP: 7.4
	 * Text Domain: content-sliders
	 *
	 * @package content-sliders
	 */
	
	define( 'TINY_BLOCKS_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
	define( 'TINY_BLOCKS_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );
	define( 'TINY_BLOCKS_SRC_PATH', plugin_dir_path( __FILE__ ) . 'assets/src/blocks' );
	const TINY_BLOCKS_VERSION        = 1.0;

// phpcs:disable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
	require_once TINY_BLOCKS_PATH . '/inc/helpers/autoloader.php';
// phpcs:enable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
	
	/**
	 * To load plugin manifest class.
	 *
	 * @return void
	 */
	function content_slider_plugin_loader() {
		\Content\Slider\Inc\Plugin::get_instance();
	}
	
	content_slider_plugin_loader();
