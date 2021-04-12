<?php
/**
 * Text-heavy_component
 *
 * @package     Text-heavy_component
 * Description Text-heavy_component
 */

add_action( 'acf/init', 'register_text_heavy_component_block' );
/** * Register_text_heavy_component_block */
function register_text_heavy_component_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Text Heavy Component block.
		acf_register_block_type(
			array(
				'name'            => 'text-heavy-component',
				'title'           => __( 'Text Heavy Component' ),
				'description'     => __( 'A custom Text Heavy Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'text', 'heavy', 'component' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/text-heavy-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),

			)
		);

	}

}
