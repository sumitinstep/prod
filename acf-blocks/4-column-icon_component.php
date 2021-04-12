<?php
/**
 * 4-column-icon_component
 *
 * @package     4-column-icon_component
 * Description  4-column-icon_component
 */

add_action( 'acf/init', 'register_4_column_icon_block' );
/** * Register_4_column_icon_block */
function register_4_column_icon_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Card View block.
		acf_register_block_type(
			array(
				'name'            => 'four-column-icon',
				'title'           => __( '4 Column Icon Component', 'meraki-admin' ),
				'description'     => __( '4 Column Icon block.', 'meraki-admin' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'four', '4', '4-column', 'icon', 'view' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/4-column-icon-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
