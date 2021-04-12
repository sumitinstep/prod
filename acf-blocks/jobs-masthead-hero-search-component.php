<?php
/**
 * Jobs-masthead-hero-search-component
 *
 * @package  Jobs-masthead-hero-search-component

 * Description Jobs-masthead-hero-search-component
 */

add_action( 'acf/init', 'register_jobs_masthead_search' );
/** * Register_jobs_masthead_search */
function register_jobs_masthead_search() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Card View block.
		acf_register_block_type(
			array(
				'name'            => 'jobs-masthead-search',
				'title'           => __( 'Jobs Masthead Search Component' ),
				'description'     => __( 'Jobs Masthead Search block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'jobs', 'search' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/jobs-masthead-hero-search-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
