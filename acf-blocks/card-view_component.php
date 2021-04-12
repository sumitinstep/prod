<?php
/**
 * Cardview_component
 *
 * @package     Cardview_component
 * Description  Cardview_component
 */

add_action( 'acf/init', 'register_card_view_block' );
/** * Register_card_view_block */
function register_card_view_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Card View block.
		acf_register_block_type(
			array(
				'name'            => 'card-view',
				'title'           => __( 'Card View' ),
				'description'     => __( 'A custom Card View block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'card', 'view' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/card-view-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
