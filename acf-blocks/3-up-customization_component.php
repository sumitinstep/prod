<?php
/**
 * 3-up-customization_component
 *
 * @package     3-up-customization_component
 * Description  3-up-customization_component
 */

add_action( 'acf/init', 'register_3_up_with_customization_block' );
/** * Register_3_up_with_customization_block */
function register_3_up_with_customization_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register 3-up With Customization block.
		acf_register_block_type(
			array(
				'name'            => 'component-3-up-with-customization',
				'title'           => __( '3-up With Customization' ),
				'description'     => __( 'A custom 3-up With Customization block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( '3', 'up', 'with', 'customization' ),
				'post_types'      => array( 'post', 'page', 'job_location_details' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/3-up-customization-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
