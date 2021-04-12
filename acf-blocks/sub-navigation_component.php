<?php
/**
 * Sub-navigation_component
 *
 * @package     Sub-navigation_component
 * Description Sub-navigation_component
 */

add_action( 'acf/init', 'register_sub_navigation_block' );
/** * Register_sub_navigation_block */
function register_sub_navigation_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Sub Navigation block.
		acf_register_block_type(
			array(
				'name'            => 'sub-navigation',
				'title'           => __( 'Sub Navigation' ),
				'description'     => __( 'A custom Sub Navigation block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'sub', 'navigation' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/sub-navigation-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
