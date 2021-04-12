<?php
/**
 * Staggered-3_component
 *
 * @package     Staggered-3_component
 * Description Staggered-3_component
 */

add_action( 'acf/init', 'register_staggered_3_block' );
/** * Register_staggered_3_block */
function register_staggered_3_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Staggered 3 block.
		acf_register_block_type(
			array(
				'name'            => 'staggered-3',
				'title'           => __( 'Staggered 3' ),
				'description'     => __( 'A custom Staggered 3 block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'staggered', '3' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/staggered-3-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
