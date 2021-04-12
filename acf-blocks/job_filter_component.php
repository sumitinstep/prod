<?php
/**
 * Job-filter_component
 *
 * @package     Job-filter_component
 * Description  Job-filter_component
 */

add_action( 'acf/init', 'register_job_filter_block' );
/** * Register_job_filter_block */
function register_job_filter_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Webinars block.
		acf_register_block_type(
			array(
				'name'            => 'job-filter',
				'title'           => __( 'Job Filter' ),
				'description'     => __( 'A custom Job List Filter block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'filter', 'job', 'search' ),
				'post_types'      => array( 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/job-filter-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),

			)
		);

	}

}
