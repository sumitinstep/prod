<?php
/**
 * Asset-multi-paragraph_component
 *
 * @package    Asset-multi-paragraph_component
 * Description Asset-multi-paragraph_component
 */

add_action( 'acf/init', 'register_asset__multi_paragraph_banner_block' );
/** * Register_asset__multi_paragraph_banner_block */
function register_asset__multi_paragraph_banner_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Asset  Multi-Paragraph Banner block.
		acf_register_block_type(
			array(
				'name'            => 'asset-multi-paragraph-banner',
				'title'           => __( 'Asset + Multi-Paragraph Banner' ),
				'description'     => __( 'A custom Asset + Multi-Paragraph Banner block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'asset', 'multi', 'paragraph', 'banner' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/asset-multi-paragraph-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
