/**
 * WordPress dependencies
 */
import { withColors } from '@wordpress/block-editor';

/**
 * Generate block colors.
 */
const applyWithColors = withColors(
	'arrowColor',
	'arrowBackground',
	'dotColor',
	'dotActiveColor'
);

export default applyWithColors;
