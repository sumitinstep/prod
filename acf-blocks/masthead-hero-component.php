<?php
/**
 * Masthead-hero-component
 *
 * @package   Masthead-hero-component

 * Description Masthead-hero-component
 */

add_action( 'acf/init', 'register_masthead_hero_block' );
/** * Register_masthead_hero_block */
function register_masthead_hero_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Masthead Hero block.
		acf_register_block_type(
			array(
				'name'            => 'masthead-hero',
				'title'           => __( 'Masthead Hero' ),
				'description'     => __( 'A custom Masthead Hero block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'masthead', 'hero' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',

				'render_template' => 'template-parts/blocks/masthead-hero-component.php',

				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
