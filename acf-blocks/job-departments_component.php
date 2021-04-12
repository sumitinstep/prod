<?php
/**
 * Job-departments_component
 *
 * @package     Job-departments_component
 * Description  Job-departments_component
 */

add_action( 'acf/init', 'register_job_departments_block' );
/** * Register_job_departments_block */
function register_job_departments_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Job Departments block.
		acf_register_block_type(
			array(
				'name'            => 'job-departments',
				'title'           => __( 'Job Departments' ),
				'description'     => __( 'A custom Job Departments block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'job', 'departments' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/job-departments-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
