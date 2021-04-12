<?php
/**
 * Collage-component
 *
 * @package     Collage-component
 * Description  Collage-component
 */

add_action( 'acf/init', 'register_collage_component_block' );
/** * Register_collage_component_block */
function register_collage_component_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Collateral block.
		acf_register_block_type(
			array(
				'name'            => 'collage-component',
				'title'           => __( 'Collage Component' ),
				'description'     => __( 'A custom Featured Collage Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'filter', 'collage', 'search' ),
				'post_types'      => array( 'post', 'page', 'job_location_details' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/collage-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);
	}
}
