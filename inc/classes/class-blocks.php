<?php
/**
 * Registers assets for all blocks, and additional global functionality for gutenberg blocks.
 *
 * @package content-sliders
 */

namespace Content\Slider\Inc;

use Content\Slider\Inc\Blocks\Static_Blocks;
use Content\Slider\Inc\Traits\Singleton;

/**
 * Class Blocks
 */
class Blocks {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->setup_hooks();
//		Accordion::get_instance();
		Static_Blocks::get_instance();

	}

	/**
	 * Setup hooks.
	 *
	 * @return void
	 */
	public function setup_hooks() {

		/**
		 * Filters.
		 */
		add_filter( 'block_categories_all', [ $this, 'filter_block_categories_all' ], 9, 2 );

	}

	/**
	 * Add a Gutenberg Content Sliders Block Category.
	 *
	 * @param array                           $block_categories     Array of categories for block types.
	 * @param \WP_Block_Editor_Context|string $block_editor_context The current block editor context, or a string defining the context.
	 */
	public function filter_block_categories_all( $block_categories, $block_editor_context ) {

		if ( ! ( $block_editor_context instanceof \WP_Block_Editor_Context ) ) {

			return $block_categories;

		}

		return array_merge(
			[
				[
					'slug'  => 'content-sliders',
					'title' => esc_html__( 'Gutenberg Content Sliders', 'content-sliders' ),
					'icon'  => null,
				],
			],
			$block_categories
		);

	}

}
