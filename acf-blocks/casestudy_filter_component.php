<?php
/**
 * Casestudy_filter_component
 *
 * @package    Casestudy_filter_component
 * Description Casestudy_filter_component
 */

add_action( 'acf/init', 'register_casestudy_filter_block' );
/** * Register_casestudy_filter_block */
function register_casestudy_filter_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Webinars block.
		acf_register_block_type(
			array(
				'name'            => 'casestudy-filter',
				'title'           => __( 'Case Study Filter' ),
				'description'     => __( 'A custom Featured Case Study Filter block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'filter', 'casestudy', 'search', 'case', 'customer' ),
				'post_types'      => array( 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/casestudy-filter-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),

			)
		);

	}

}
