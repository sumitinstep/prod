<?php
/**
 * Featured-webinars_component
 *
 * @package     Featured-webinars_component
 * Description  Featured-webinars_component
 */

add_action( 'acf/init', 'register_featured_webinars_block' );
/** * Register_featured_webinars_block */
function register_featured_webinars_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Webinars block.
		acf_register_block_type(
			array(
				'name'            => 'featured-webinars',
				'title'           => __( 'Featured Webinars' ),
				'description'     => __( 'A custom Featured Webinars block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'featured', 'webinars' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/featured-webinars-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),

			)
		);

	}

}
