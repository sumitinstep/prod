<?php
/**
 * Product-family-grid_component
 *
 * @package     Product-family-grid_component
 * Description  Product-family-grid_component
 */

add_action( 'acf/init', 'register_product_family_block' );
/** * Register_product_family_block */
function register_product_family_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Tile Grid block.
		acf_register_block_type(
			array(
				'name'            => 'product-family-grid',
				'title'           => __( 'Product Family Grid' ),
				'description'     => __( 'A custom Product Family Grid block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'product', 'grid' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/product-family-grid-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
