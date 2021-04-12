<?php
/**
 * Carousel-quote-component
 *
 * @package    Carousel-quote-component
 * Description Carousel-quote-component
 */

add_action( 'acf/init', 'register_carousel_quote_block' );
/** * Register_carousel_quote_block */
function register_carousel_quote_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register accordion text and image block.
		acf_register_block_type(
			array(
				'name'            => 'carousel-quote',
				'title'           => __( 'Carousel quote' ),
				'description'     => __( 'A custom carousel quote block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'carousel', 'quote' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/carousel-quote-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
