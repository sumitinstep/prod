<?php
/**
 * 6-up_component
 *
 * @package    6-up_component
 * Description 6-up_component
 */

add_action( 'acf/init', 'register_6_up_block' );
/** * Register_6_up_block */
function register_6_up_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 6 Up block.
		acf_register_block_type(
			array(
				'name'            => 'component-6-up',
				'title'           => __( '6 Up Component' ),
				'description'     => __( 'A custom 6 Up block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '6', 'up' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/6-up-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
