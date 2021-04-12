<?php
/**
 * CTA-banner_component
 *
 * @package     CTA-banner_component
 * Description  CTA-banner_component
 */

/** * Register_cta_banner_component_block */
function register_cta_banner_component_block() {
	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register CTA Banner Component block.
		acf_register_block_type(
			array(
				'name'            => 'component-cta-banner',
				'title'           => __( 'CTA Banner Component' ),
				'description'     => __( 'A custom CTA Banner Component block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'cta-banner', 'component' ),
				'post_types'      => array( 'page' ),
				'mode'            => 'auto',
				'render_template' => 'template-parts/blocks/cta-banner-component.php',
			)
		);

	}
}

add_action( 'acf/init', 'register_cta_banner_component_block' );
