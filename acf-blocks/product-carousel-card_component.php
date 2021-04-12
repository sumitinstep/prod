<?php
/**
 * Product-carousel-card_component
 *
 * @package     Product-carousel-card_component
 * Description  Product-carousel-card_component
 */

add_action( 'acf/init', 'register_product_carousel_card_block' );
/** * Register_product_carousel_card_block */
function register_product_carousel_card_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Product Carousel Card block.
		acf_register_block_type(
			array(
				'name'            => 'product-carousel-card',
				'title'           => __( 'Product Carousel Card' ),
				'description'     => __( 'A custom Product Carousel Card block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'product', 'carousel', 'card' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/product-carousel-card-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
