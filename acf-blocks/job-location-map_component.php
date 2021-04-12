<?php
/**
 * Job-location-map_component
 *
 * @package     Job-location-map_component
 * Description  Job-location-map_component
 */

add_action( 'acf/init', 'register_job_location_map_block' );
/** * Register_job_location_map_block */
function register_job_location_map_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Job Location Map block.
		acf_register_block_type(
			array(
				'name'            => 'job-location-map',
				'title'           => __( 'Job Location Map' ),
				'description'     => __( 'A custom Job Location Map block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'job', 'location', 'map' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/job-location-map-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
