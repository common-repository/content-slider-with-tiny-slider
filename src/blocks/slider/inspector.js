/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {  InspectorControls, useSetting, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	// __experimentalUseCustomUnits as useCustomUnits,
	// __experimentalUnitControl as UnitControl,
	// __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
	RangeControl,
	SelectControl
} from '@wordpress/components';
// import { useInstanceId } from '@wordpress/compose';
import { useMemo, useEffect } from "@wordpress/element";
import applyWithColors from "./colors";
import { compose } from '@wordpress/compose';


// export const COVER_MIN_HEIGHT = 50;
// export const COVER_MAX_HEIGHT = 1000;

// function CoverHeightInput( {
// 	 onChange,
// 	 onUnitChange,
// 	 unit = 'px',
// 	 value = ''
//  } ) {
// 	const instanceId = useInstanceId( UnitControl );
// 	const inputId = `block-cover-height-input-${ instanceId }`;
// 	const isPx = unit === 'px';
//
// 	// console.log( instanceId, clientId)
//
// 	const units = useCustomUnits( {
// 		availableUnits: useSetting( 'spacing.units' ) || [
// 			'px',
// 			'em',
// 			'rem',
// 			'vw',
// 			'vh',
// 		],
// 		defaultValues: { px: 430, '%': 20, em: 20, rem: 20, vw: 20, vh: 50 },
// 	} );
//
// 	const handleOnChange = ( unprocessedValue ) => {
// 		const inputValue =
// 		unprocessedValue !== ''
// 		? parseFloat( unprocessedValue )
// 		: undefined;
//
// 		if ( isNaN( inputValue ) && inputValue !== undefined ) {
// 			return;
// 		}
// 		onChange( inputValue );
// 	};
//
// 	const computedValue = useMemo( () => {
// 		const [ parsedQuantity ] = parseQuantityAndUnitFromRawValue( value );
// 		return [ parsedQuantity, unit ].join( '' );
// 	}, [ unit, value ] );
//
// 	const min = isPx ? COVER_MIN_HEIGHT : 0;
// 	const max = isPx ? COVER_MAX_HEIGHT : undefined;
//
// 	return (
// 	<UnitControl
// 		label={ __( 'Default Slide Height', 'content-sliders' ) }
// 		id={ inputId }
// 		isResetValueOnUnitChange
// 		max={ max }
// 		min={ min }
// 		onChange={ handleOnChange }
// 		onUnitChange={ onUnitChange }
// 		__unstableInputWidth={ '80px' }
// 		units={ units }
// 		value={ computedValue }
// 		help={ __('Note: individual cover (slide) height can be updated from each Cover block setting.', 'content-sliders') }
// 	/>
// 	);
// }


/**
 * Inspector controls
 *
 * @param { Object } props
 */
const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		
		arrowColor,
		arrowBackground,
		dotColor,
		dotActiveColor,
		setArrowColor,
		setArrowBackground,
		setDotColor,
		setDotActiveColor,
	} = props;
	
	const {
		navigation,
		pagination,
		minHeight,
		minHeightUnit,
		autoplay,
		autoplayDelay,
		pauseOnMouseEnter,
		effect,
		loop,
		speed,
		arrowSize,
		arrowOffset,
		dotsSize,
		dotsOffset,
		arrowStyle,
		dotsGap,
		colors,
		arrowPadding,
		arrowRadius
	} = attributes;
	
	
	useEffect(
	() => {
		setAttributes({
			colors: {
				arrowColor: arrowColor.color,
				arrowBackground: arrowBackground.color,
				dotColor: dotColor.color,
				dotActiveColor: dotActiveColor.color,
			}
		})
	},
	[ arrowColor, arrowBackground, dotColor, dotActiveColor ]
	);
	
	return (
	<>
		<InspectorControls>
			<PanelBody title={ __( 'Slider Settings', 'content-sliders' ) }>
				
				<ToggleControl
				/* translators: visually display open as opposed to closed */
				checked={ !! navigation }
				help={ ( checked ) => {
					return checked ? __( 'Navigation arrows are enabled.', 'content-sliders' ) : __( 'Toggle to enable navigation arrows.', 'content-sliders' )
				} }
				label={ __( 'Navigation arrows', 'content-sliders' ) }
				onChange={ () => setAttributes( { navigation: ! navigation } ) }
				/>
				<ToggleControl
				/* translators: visually display open as opposed to closed */
				checked={ !! pagination }
				help={ ( checked ) => {
					return checked ? __( 'Pagination dots are enabled.', 'content-sliders' ) : __( 'Toggle to enable pagination dots.', 'content-sliders' );
				} }
				label={ __( 'Pagination dots', 'content-sliders' ) }
				onChange={ () => setAttributes( { pagination: ! pagination } ) }
				/>
				<SelectControl
				label={ __("Animation") }
				value={ effect }
				options={ [
					{ label: 'Slide (default)', value: '' },
					{ label: 'Fade', value: 'fade' },
					{ label: 'Flip', value: 'flip' },
				] }
				help={ __( 'Slider animation effects.', 'content-sliders') }
				onChange={ ( newEffect ) => setAttributes( { effect: newEffect } ) }
				__nextHasNoMarginBottom
				/>
				<RangeControl
				/* translators: visually display open as opposed to closed */
				min={ 100 }
				step={ 10 }
				max={ 1000 }
				help={ __( 'Duration of transition between slides (in ms).', 'content-sliders') }
				value={ speed }
				label={ __( 'Animation Speed', 'content-sliders' ) }
				onChange={ ( value ) => setAttributes( { speed: value } ) }
				/>
				<ToggleControl
				/* translators: visually display open as opposed to closed */
				checked={ !! loop }
				help={ ( checked ) => {
					return checked ? __('Continuous loop mode is enabled.', 'content-sliders') : __('Toggle to enable continuous loop mode.', 'content-sliders')
				}}
				label={ __( 'Infinite loop', 'content-sliders' ) }
				onChange={ () => setAttributes( { loop: ! loop } ) }
				/>
				<ToggleControl
				/* translators: visually display open as opposed to closed */
				checked={ !! autoplay }
				help={ ( checked ) => {
					return checked ? __("Autoplay slideshow is enabled.", "content-sliders") : __("Toggle to enable autoplay slideshow.")
				}}
				label={ __( 'Autoplay', 'content-sliders' ) }
				onChange={ () => setAttributes( { autoplay: ! autoplay } ) }
				/>
				
				{
				autoplay && (
				<>
					<RangeControl
					/* translators: visually display open as opposed to closed */
					min={ 500 }
					step={ 100 }
					max={5000}
					help={ __( 'Delay between autoplay transitions (in ms).', 'content-sliders') }
					value={ autoplayDelay }
					label={ __( 'Autoplay delay', 'content-sliders' ) }
					onChange={ ( value ) => setAttributes( { autoplayDelay: value } ) }
					/>
					<ToggleControl
					/* translators: visually display open as opposed to closed */
					checked={ pauseOnMouseEnter }
					help={ __("When enabled autoplay will be paused on pointer (mouse) enter over slider.", 'content-sliders') }
					label={ __( 'Autoplay pause on hover', 'content-sliders' ) }
					onChange={ () => setAttributes( { pauseOnMouseEnter: ! pauseOnMouseEnter } ) }
					/>
				</>
				)
				}
				
				{/*<CoverHeightInput*/}
				{/*value={ minHeight }*/}
				{/*unit={ minHeightUnit }*/}
				{/*onChange={ ( newMinHeight ) =>*/}
				{/*setAttributes( { minHeight: newMinHeight } )*/}
				{/*}*/}
				{/*onUnitChange={ ( nextUnit ) =>*/}
				{/*setAttributes( {*/}
				{/*	minHeightUnit: nextUnit,*/}
				{/*} )*/}
				{/*}*/}
				{/*/>*/}
			
			</PanelBody>
			
			
			<PanelColorSettings
			colorSettings={ [
				{
					value: arrowColor.color,
					onChange: setArrowColor,
					label: __( 'Arrow color', 'content-sliders' ),
					enableAlpha: true
				},
				{
					value: arrowBackground.color,
					onChange: setArrowBackground,
					label: __( 'Arrow background', 'content-sliders' ),
					enableAlpha: true
				},
				{
					value: dotActiveColor.color,
					onChange: setDotActiveColor,
					label: __( 'Dots active color', 'content-sliders' ),
					enableAlpha: true
				},
				{
					value: dotColor.color,
					onChange: setDotColor,
					label: __( 'Dots inactive color', 'content-sliders' ),
					enableAlpha: true
				},
			] }
			initialOpen={ false }
			title={ __( 'Color settings', 'content-sliders' ) }
			/>
			
			<PanelBody initialOpen={ false } title={ __( 'Additional Slider Settings', 'content-sliders' ) }>
				
				<RangeControl
				label={ __('Arrow Size', 'content-sliders') }
				value={ arrowSize }
				min={ 15 }
				max={ 80 }
				onChange={ ( v )  => setAttributes({ arrowSize: v })}
				help={ __("Adjust slider arrow size.", 'content-sliders') }
				/>
				
				<RangeControl
				label={ __('Arrow Padding', 'content-sliders') }
				value={ arrowPadding }
				min={ 0 }
				max={ 50 }
				onChange={ ( v )  => setAttributes({ arrowPadding: v })}
				help={ __("Adjust slider arrow padding.", 'content-sliders') }
				/>
				
				
				<RangeControl
				label={ __('Arrow Radius', 'content-sliders') }
				value={ arrowRadius }
				min={ 0 }
				max={ 200 }
				onChange={ ( v )  => setAttributes({ arrowRadius: v })}
				help={ __("Adjust slider arrow background radius.", 'content-sliders') }
				/>
				
				<RangeControl
				label={ __('Arrow Offset', 'content-sliders') }
				value={ arrowOffset }
				min={ 0 }
				max={ 120 }
				onChange={ ( v )  => setAttributes({ arrowOffset: v })}
				help={ __("Adjust slider arrow position from edge.", 'content-sliders') }
				/>
				
				
				<RangeControl
				label={ __('Pagination dots size', 'content-sliders') }
				value={ dotsSize }
				min={ 4 }
				max={ 24 }
				onChange={ ( v )  => setAttributes({ dotsSize: v })}
				help={ __("Adjust slider pagination dots size.", 'content-sliders') }
				/>
				
				<RangeControl
				label={ __('Pagination dots gap', 'content-sliders') }
				value={ dotsGap }
				min={ 0 }
				max={ 30 }
				onChange={ ( v )  => setAttributes({ dotsGap: v })}
				help={ __("Adjust gap between slider pagination dots.", 'content-sliders') }
				/>
				
				<RangeControl
				label={ __('Pagination dots offset', 'content-sliders') }
				value={ dotsOffset }
				min={ 0 }
				max={ 120 }
				onChange={ ( v )  => setAttributes({ dotsOffset: v })}
				help={ __("Adjust slider pagination dots offset.", 'content-sliders') }
				/>
			</PanelBody>
		
		</InspectorControls>
	</>
	);
};


export default compose( [
	applyWithColors,
] )( Inspector );

