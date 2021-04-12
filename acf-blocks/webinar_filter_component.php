<?php
/**
 * Webinar-filter-component
 *
 * @package    webinar-filter-component
 * Description webinar-filter-component
 */

add_action( 'acf/init', 'register_webinar_filter_block' );
/**
 * Register_webinar_filter_block
 */
function register_webinar_filter_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Webinars block.
		acf_register_block_type(
			array(
				'name'            => 'webinar-filter',
				'title'           => __( 'Webinar Filter' ),
				'description'     => __( 'A custom Featured Webinar Filter block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'filter', 'webinar', 'search' ),
				'post_types'      => array( 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/webinar-filter-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),

			)
		);

	}

}
