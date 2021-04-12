<?php
/**
 * Tile-grid_component
 *
 * @package     Tile-grid_component
 * Description Tile-grid_component
 */

add_action( 'acf/init', 'register_tile_grid_block' );
/** * Register_tile_grid_block */
function register_tile_grid_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Tile Grid block.
		acf_register_block_type(
			array(
				'name'            => 'tile-grid',
				'title'           => __( 'Tile Grid' ),
				'description'     => __( 'A custom Tile Grid block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'tile', 'grid' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/tile-grid-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
