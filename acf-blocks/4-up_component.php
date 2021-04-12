<?php
/**
 * 4-up_component
 *
 * @package     4-up_component
 * Description  4-up_component
 */

add_action( 'acf/init', 'register_4_up_component_block' );
/** * Register_4_up_component_block */
function register_4_up_component_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 2 Up Component block.
		acf_register_block_type(
			array(
				'name'            => 'component-4-up',
				'title'           => __( '4 Up Component' ),
				'description'     => __( 'A custom 4 Up Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '4', 'up', 'component' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/4-up-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
