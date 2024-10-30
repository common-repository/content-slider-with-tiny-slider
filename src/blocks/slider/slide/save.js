
/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	
	const blockProps = useBlockProps.save({ className: 'content-sliders-slide swiper-slide' });
	
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}
