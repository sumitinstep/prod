<?php
/**
 * Product-carousel_component
 *
 * @package     Product-carousel_component
 * Description  Product-carousel_component
 */

add_action( 'acf/init', 'register_product_carousel_block' );
/** * Register_product_carousel_block */
function register_product_carousel_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Product Carousel block.
		acf_register_block_type(
			array(
				'name'            => 'product-carousel',
				'title'           => __( 'Product Carousel' ),
				'description'     => __( 'A custom Product Carousel block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'product', 'carousel' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/product-carousel-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
