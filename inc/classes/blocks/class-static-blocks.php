<?php
/**
 * Static Blocks class.
 *
 * @package content-sliders
 */

namespace Content\Slider\Inc\Blocks;

use Content\Slider\Inc\Traits\Singleton;

class Static_Blocks {

    use Singleton;

    /**
     * Construct method.
     */
    protected function __construct() {

        $this->setup_hooks();

    }

    /**
     * Setup hooks.
     */
    protected function setup_hooks() {

        /**
         * Actions.
         */
        add_action( 'init', [ $this, 'register_block_type' ] );

    }

    /**
     * List all static blocks...
     *
     * @return string[]
     */
    public function get_blocks() {
        return [
			"slider",
			"slider/slide",
		];
    }

    public function render_callbacks() {
        return [];
    }

	/**
     * Register scripts.
     */
	public function register_block_type() {
        // Register Block.

        foreach ( $this->get_blocks() as $raw ) {

            $block_arr = explode( '/', $raw );
            $block = "";

            if (  count( $block_arr ) === 1  ) {
                $block = $raw;
            } else {
                foreach ( $block_arr as $cp ) {
                    $block .= $cp . '/';
                }
            }

            $block = rtrim( $block, '/' );
   
			if ( file_exists( TINY_BLOCKS_PATH . '/build/blocks/' . $block . '/block.json' ) ) {

                $args = array();

                if ( array_key_exists( $raw, $this->render_callbacks() ) ) {
                    $args['render_callback'] = $this->render_callbacks()[$raw];
                }

                register_block_type( TINY_BLOCKS_PATH . '/build/blocks/' . $block, $args );
            }
        }
    }

}
