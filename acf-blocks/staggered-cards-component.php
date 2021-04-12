<?php
/**
 * Staggered-cards-component
 *
 * @package    Staggered-cards-component
 * Description Staggered-cards-component
 */

add_action( 'acf/init', 'register_staggered_cards_block' );
/** * Register_staggered_cards_block */
function register_staggered_cards_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Staggered Cards block.
		acf_register_block_type(
			array(
				'name'            => 'staggered-cards',
				'title'           => __( 'Staggered Cards' ),
				'description'     => __( 'A custom Staggered Cards block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'staggered', 'cards' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/staggered-cards-component.php',

				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
