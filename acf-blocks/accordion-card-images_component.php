<?php
/**
 * Accordian-card-images_component
 *
 * @package    Accordian-card-images_component
 * Description Accordian-card-images_component
 */

add_action( 'acf/init', 'register_accordion_card_images_block' );
/** * Register_accordion_card_images_block */
function register_accordion_card_images_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register accordion text and image block.
		acf_register_block_type(
			array(
				'name'            => 'accordion-card-images',
				'title'           => __( 'Accordion card and images' ),
				'description'     => __( 'A custom accordion card and images block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'accordion', 'card', 'images' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/accordion-card-images-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
