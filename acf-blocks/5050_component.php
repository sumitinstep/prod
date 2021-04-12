<?php
/**
 * 5050_component
 *
 * @package     5050_component
 * Description  5050_component
 */

/** * Register_5050_component_block */
function register_5050_component_block() {
	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 5050 Component block.
		acf_register_block_type(
			array(
				'name'            => 'component-5050',
				'title'           => __( '5050 Component' ),
				'description'     => __( 'A custom 5050 Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '5050', 'component' ),
				'post_types'      => array( 'post', 'page', 'webinar', 'job_location_details' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/5050-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}
}

add_action( 'acf/init', 'register_5050_component_block' );
