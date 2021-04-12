<?php
/**
 * 3070-assettext_component
 *
 * @package     3070-assettext_component
 * Description  3070-assettext_component
 */

add_action( 'acf/init', 'register_30_70_asset__text_block' );
/** * Register_30_70_asset__text_block */
function register_30_70_asset__text_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 30-70 Asset  Text block.
		acf_register_block_type(
			array(
				'name'            => 'component-3070',
				'title'           => __( '30-70 Asset Text' ),
				'description'     => __( 'A custom 30-70 Asset  Text block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '30', '70', 'asset', 'text' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/3070-asset-text-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
