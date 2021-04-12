<?php
/**
 * Media-carousel_component
 *
 * @package     Media-carousel_component
 * Description  Media-carousel_component
 */

add_action( 'acf/init', 'register_media_carousel_block' );
/** * Register_media_carousel_block */
function register_media_carousel_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Featured Webinars block.
		acf_register_block_type(
			array(
				'name'            => 'media-carousel',
				'title'           => __( 'Media Carousel' ),
				'description'     => __( 'A custom Featured Webinar Filter block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'media', 'carousel' ),
				'post_types'      => array( 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/media-carousel-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),

			)
		);

	}

}
