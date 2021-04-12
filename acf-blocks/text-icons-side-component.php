<?php
/**
 * Tile-icons-side-component
 *
 * @package     Tile-icons-side-component
 * Description Tile-icons-side-component
 */

add_action( 'acf/init', 'register_text_icons_side_block' );
/** * Register_text_icons_side_block */
function register_text_icons_side_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Text Icons Side-by-Side block.
		acf_register_block_type(
			array(
				'name'            => 'text-icons-side',
				'title'           => __( 'Text Icons Side-by-Side' ),
				'description'     => __( 'A custom Text Icons Side-by-Side block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'text', 'icons', 'side' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/text-icons-side-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);
	}
}
