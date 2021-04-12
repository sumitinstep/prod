<?php
/**
 * Video-gallery_component
 *
 * @package     video-gallery_component
 * Description Video-gallery_component
 */

add_action( 'acf/init', 'register_video_gallery_block' );
/** * Register_video_gallery_block */
function register_video_gallery_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register video gallery block.
		acf_register_block_type(
			array(
				'name'            => 'video-gallery',
				'title'           => __( 'Video gallery' ),
				'description'     => __( 'A custom video gallery block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'video', 'gallery' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/video-gallery-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
