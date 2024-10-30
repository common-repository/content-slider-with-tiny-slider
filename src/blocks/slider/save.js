
/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	
	const {
		pagination,
		navigation,
		isEditing: isBlockEditing,
		minHeight,
		minHeightUnit,
		autoplay,
		autoplayDelay,
		pauseOnMouseEnter,
		effect,
		loop,
		speed,
		colors
	} = attributes;
	
	const blockProps = useBlockProps.save({ className: 'content-sliders-slider content-sliders-is-fe' });
	
	const settings = {
		pagination,
		navigation,
		minHeight,
		minHeightUnit,
		autoplay,
		autoplayDelay,
		pauseOnMouseEnter,
		effect,
		loop,
		speed
	};
	
	
	
	const colorStyles = Object.fromEntries( Object.keys( colors ).map(
		key => typeof colors[key] ? [ `--tns-` + key, colors[key] ] : []
	) );
	
	const otherStyles = Object.fromEntries(
		[
			'arrowSize',
			'arrowPadding',
			'arrowRadius',
			'arrowOffset',
			'dotsSize',
			'dotsOffset',
			'dotsGap',
			'arrowStyle'
		].map( key => {
			return typeof attributes[key] !== "undefined" ? [ '--tns-' + key, attributes[key] + 'px' ] : []
		} )
	)
	
	const style = {
		...colorStyles,
		...otherStyles,
		...( blockProps?.style ? blockProps?.style : {} )
	}
	
	return (
		<div {...blockProps} style={ style }>
			<div className="swiper" data-config={ JSON.stringify( settings ) }>
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				
				{ pagination && <div className="swiper-pagination"></div> }
				
				{
					navigation && (
						<>
							<div className="swiper-button-prev"></div>
							<div className="swiper-button-next"></div>
						</>
					)
				}
			</div>
		</div>
	);
}
