<?php
/**
 * Form-component
 *
 * @package     Form-component
 * Description  Form-component
 */

add_action( 'acf/init', 'register_form_block' );
/** * Register_form_block */
function register_form_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Card View block.
		acf_register_block_type(
			array(
				'name'            => 'form-component',
				'title'           => __( 'Form Component' ),
				'description'     => __( 'Form block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'form', 'marketo' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/form-component.php',
				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
