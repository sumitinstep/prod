<?php
/**
 * Collateral-filter_component
 *
 * @package     Collateral-filter_component
 * Description  Collateral-filter_component
 */

add_action( 'acf/init', 'register_collateral_filter_block' );
/** * Register_collateral_filter_block */
function register_collateral_filter_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Collateral block.
		acf_register_block_type(
			array(
				'name'            => 'collateral-filter',
				'title'           => __( 'Collateral Filter' ),
				'description'     => __( 'A custom Featured Collateral Filter block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'filter', 'collateral', 'search' ),
				'post_types'      => array( 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/collateral-filter-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);
	}
}
