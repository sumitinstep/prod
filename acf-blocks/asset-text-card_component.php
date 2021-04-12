<?php
/**
 * Asset-textcard_component
 *
 * @package     Asset-textcard_component
 * Description  Asset-textcard_component
 */

add_action( 'acf/init', 'register_asset_text_card_block' );
/** * Register_asset_text_card_block */
function register_asset_text_card_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Asset  Text Card block.
		acf_register_block_type(
			array(
				'name'            => 'asset-text-card',
				'title'           => __( 'Asset + Text Card' ),
				'description'     => __( 'A custom Asset + Text Card block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'asset', 'text', 'card' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/asset-text-card-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
