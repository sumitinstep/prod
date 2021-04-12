<?php
/**
 * Sub-navigation-anchor-component
 *
 * @package     Sub-navigation-anchor-component
 * Description Sub-navigation-anchor-component
 */

add_action( 'acf/init', 'register_sub_navigation_anchor_block' );
/** * Register_sub_navigation_anchor_block */
function register_sub_navigation_anchor_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Sub Navigation Anchor block.
		acf_register_block_type(
			array(
				'name'            => 'sub-navigation-anchor',
				'title'           => __( 'Sub Navigation Anchor' ),
				'description'     => __( 'A custom Sub Navigation Anchor block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'sub', 'navigation', 'anchor' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/sub-navigation-anchor-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
