<?php
/**
 * Featured-jobs_component
 *
 * @package     Featured-jobs_component
 * Description  Featured-jobs_component
 */

add_action( 'acf/init', 'register_featured_jobs_component_block' );
/** * Register_featured_jobs_component_block */
function register_featured_jobs_component_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Jobs Component block.
		acf_register_block_type(
			array(
				'name'            => 'featured-jobs-component',
				'title'           => __( 'Featured Jobs Component' ),
				'description'     => __( 'A custom Featured Jobs Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'featured', 'jobs', 'component' ),
				'post_types'      => array( 'post', 'page', 'job_location_details' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/featured-jobs-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
