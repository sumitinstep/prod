<?php
/**
 * Tabbed-navigation_component
 *
 * @package     Tabbed-navigation-component
 * Description  Tabbed-navigation-component
 */

add_action( 'acf/init', 'register_tabbed_navigation_control_block' );
/**
 * Register_tabbed_navigation_control_block
 */
function register_tabbed_navigation_control_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Tabbed Menu Control block.
		acf_register_block_type(
			array(
				'name'            => 'tabbed-navigation-control',
				'title'           => __( 'Tabbed Navigation Control' ),
				'description'     => __( 'A custom Tabbed Navigation Control block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'tabbed', 'menu', 'control' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/tabbed-navigation-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
