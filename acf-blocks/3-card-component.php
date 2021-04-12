<?php
/**
 * 3-card-component
 *
 * @package     3-card-component
 * Description  3-card-component
 */

add_action( 'acf/init', 'register_3_card_block' );
/** * Register_3_card_block */
function register_3_card_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Card View block.
		acf_register_block_type(
			array(
				'name'            => 'card-3',
				'title'           => __( '3-Card Component' ),
				'description'     => __( '3-Card block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'three', '3', '3-card', 'card', 'view' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/3-card-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
