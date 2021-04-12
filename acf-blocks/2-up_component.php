<?php
/**
 * 2-up_component
 *
 * @package    2-up_component
 * Description 2-up_component
 */

add_action( 'acf/init', 'register_2_up_component_block' );
/** * Register_2_up_component_block */
function register_2_up_component_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 2 Up Component block.
		acf_register_block_type(
			array(
				'name'            => 'component-2-up',
				'title'           => __( '2 Up Component' ),
				'description'     => __( 'A custom 2 Up Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '2', 'up', 'component' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/2-up-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
