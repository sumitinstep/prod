<?php
/**
 * Notification-bar-component
 *
 * @package     Notification-bar-component
 * Description  Notification-bar-component
 */

add_action( 'acf/init', 'register_notification_bar_block' );
/** * Register_notification_bar_block */
function register_notification_bar_block() {

	if ( function_exists( 'acf_register_block_type' ) ) {

		// Register Notification Bar block.
		acf_register_block_type(
			array(
				'name'            => 'notification-bar',
				'title'           => __( 'Notification Bar' ),
				'description'     => __( 'A custom Notification Bar block.' ),
				'category'        => 'formatting',
				'icon'            => 'layout',
				'keywords'        => array( 'notification', 'bar' ),
				'post_types'      => array( 'post', 'page' ),
				'mode'            => 'auto',
				'align'           => 'full',
				'render_template' => 'template-parts/blocks/notification-bar-component.php',

				'supports'        => array(
					'align'   => array( 'full' ),
					'default' => 'full',
				),
			)
		);

	}

}
