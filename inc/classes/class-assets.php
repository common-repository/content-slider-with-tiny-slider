<?php
/**
 * Assets class.
 *
 * @package content-sliders
 */

namespace Content\Slider\Inc;

use Content\Slider\Inc\Traits\Singleton;

/**
 * Class Assets
 */
class Assets {

	use Singleton;

	/**
	 * Current page blocks.
	 *
	 * @var array
	 */
	protected $blocks = [];

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->setup_hooks();

	}

	/**
	 * To setup action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'localize_scripts' ] );
        add_action( 'enqueue_block_editor_assets', [ $this, 'action_enqueue_block_editor_assets' ] ); // Register block editor assets

	}
	
	
	public function register_swiper() {
		wp_register_style("swiper", TINY_BLOCKS_URL . "/vendors/swiper@9.2.4/swiper-bundle.min.css", array(), "9.2.4");
		wp_register_script("swiper", TINY_BLOCKS_URL . "/vendors/swiper@9.2.4/swiper-bundle.min.js", array(), "9.2.4", true );
	}

	/**
	 * To enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		$this->register_swiper();
		$this->localize_scripts();
	}

	/**
	 * To localize scripts
	 */
	public function localize_scripts() {

		$local_script_handle = 'content-sliders-local-object';
		wp_register_script( $local_script_handle, '', array(), TINY_BLOCKS_VERSION );
		wp_localize_script(
			$local_script_handle,
			'tinyBlocks',
			[
				'url' => TINY_BLOCKS_URL,
				'images' => TINY_BLOCKS_URL . '/images'
			]
		);
		wp_enqueue_script( $local_script_handle );
	}

    /**
     * Enqueue scripts.
     *
     * @return void
     */
    public function action_enqueue_block_editor_assets(): void {
		
		$this->register_swiper();
	    
	    $cssName = '/build/block-editor.css';
	    $jsName = '/build/block-editor.js';
	    
	    if ( file_exists( TINY_BLOCKS_PATH . $cssName ) ) {
		    
		    wp_register_style(
			    'content-sliders-editor',
			    TINY_BLOCKS_URL . $cssName,
			    [],
			    filemtime(  TINY_BLOCKS_PATH . $cssName  )
		    );
		    
	    }
	    
	    if ( file_exists( TINY_BLOCKS_PATH . $jsName ) ) {
		    
		    $block_script_asset = [
			    'dependencies' => [],
			    'version'      => filemtime( TINY_BLOCKS_PATH . $jsName ),
		    ];
		    
		    $assets_file = TINY_BLOCKS_PATH . '/build/block-editor.asset.php';
		    
		    if ( file_exists( $assets_file ) ) {
			    $assets             = require( $assets_file );
			    $block_script_asset = [
				    'dependencies' => $assets['dependencies'],
				    'version'      => $assets['version'],
			    ];
		    }
		    
		    wp_register_script(
			    'content-sliders-editor',
			    TINY_BLOCKS_URL . $jsName,
			    $block_script_asset['dependencies'],
			    $block_script_asset['version'],
			    true
		    );
	    }
	    
	    wp_enqueue_script( 'content-sliders-editor' );
	    wp_enqueue_style( 'content-sliders-editor' );
    }

}
