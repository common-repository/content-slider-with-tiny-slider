/**
 * Internal dependencies
 */
import save from './save';
import edit from './edit';
import metadata from './block.json';
import Icon from "./icon";
import "./slide";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Block constants
 */
const { name, category, attributes, supports } = metadata;

const settings = {
	attributes,
	/* translators: block description */
	description: __( 'Display multiple images, videos, and contents in a beautiful slideshow.', 'content-sliders' ),
	edit,
	example: {},
	category,
	icon: Icon,
	keywords: [
		'content-sliders',
		/* translators: block keyword */
		__( 'cover', 'content-sliders' ),
		__( 'cover slider', 'content-sliders' ),
		__( 'slider', 'content-sliders' ),
		__( 'content slider', 'content-sliders' ),
		__( 'slideshow', 'content-sliders' ),
	],
	save,
	supports,
	/* translators: block name */
	title: __( 'Content Sliders', 'content-sliders' )
};

registerBlockType({ name, ...metadata }, settings);
