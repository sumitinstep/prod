<?php
/**
 * 3-card-tabbed_component
 *
 * @package     3-card-tabbed_component
 * Description  3-card-tabbed_component
 */

add_action( 'acf/init', 'register_3_card_component___tabbed_block' );
/** * Register_3_card_component___tabbed_block */
function register_3_card_component___tabbed_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 3 Card Component - Tabbed block.
		acf_register_block_type(
			array(
				'name'            => 'card-3-tabbed',
				'title'           => __( '3 Card Component - Tabbed' ),
				'description'     => __( 'A custom 3 Card Component - Tabbed block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '3', 'card', 'component', 'tabbed' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/3-card-tabbed-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
