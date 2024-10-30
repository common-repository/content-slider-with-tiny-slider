import {
	BlockControls,
	ButtonBlockAppender,
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps
} from "@wordpress/block-editor";
import Inspector from "./inspector";
import {useEffect, useMemo, useRef, useState} from "@wordpress/element";
import {useDispatch, useSelect} from "@wordpress/data";
import {ToolbarButton, ToolbarGroup, Button} from "@wordpress/components";
import {edit as editIcon, seen as seenIcon} from '@wordpress/icons';
import {__} from "@wordpress/i18n";
import classnames from "classnames";

const allowedBlocks = [ 'content-sliders/slide' ];
const template = [
	[ "content-sliders/slide", { align: "wide"} ],
	[ "content-sliders/slide", { align: "wide"} ],
];

export default function edit( props ) {
	
	const {
		clientId,
		isSelected,
		attributes,
		attributes: {
			pagination,
			navigation,
			minHeight,
			minHeightUnit,
			autoplay,
			autoplayDelay,
			pauseOnMouseEnter,
			effect,
			loop,
			speed,
			colors,
		  previewMode
		},
		setAttributes
	} = props;
	
	const _swiper_el = useRef(null);
	const instance = useRef( null )
	const { updateBlockAttributes } = useDispatch( blockEditorStore );
	
	const blockProps = useBlockProps({
		className: 'content-sliders-slider'
	});
	
	const { children, ...innerBlockProps } = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		template,
		renderAppender: false
	} );
	
	const settings = useMemo(() => {
		
		const _autoplay = {
			delay: autoplayDelay,
			pauseOnMouseEnter
		}
		
		let effect2 = {};
		
		if ( effect === 'fade' ) {
			effect2 = {
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				}
			}
		}
		
		if ( effect === 'flip') {
			effect2 = {
				effect: 'flip',
				flipEffect: {
					slideShadows: false,
				},
			}
		}
		
		return {
			autoplay: autoplay ? _autoplay : false,
			loop,
			speed,
			...effect2
		}
	}, [
		autoplay,
		autoplayDelay,
		pauseOnMouseEnter,
		loop,
		speed,
		effect,
	]);
	
	
	function destroy() {
		instance.current?.destroy();
	}
	
	function initCarousel() {
		if ( ! Swiper ) {
			console.warn("Swiper not found");
			return;
		}
		
		const node = _swiper_el.current?.querySelector('.swiper')
		
		if (  ! node ) {
			console.warn("Swiper element not found");
			return;
		}
		
		instance.current?.destroy?.();
		instance.current = new Swiper( node, {
			slidesPerView: 1,
			autoHeight: true,
			observeSlideChildren: true,
			preventClicks: false,
			allowTouchMove: false,
			pagination: {
				el: node.querySelector('.swiper-pagination'),
				clickable: true
			},
			navigation: {
				nextEl: node.querySelector('.swiper-button-next'),
				prevEl: node.querySelector('.swiper-button-prev'),
			},
			...settings
		} );
		
	}
	
	const hasInnerBlocksSelected = useSelect(
	( select ) => select( blockEditorStore ).hasSelectedInnerBlock( clientId, true )
	);
	
	const colorStyles = Object.fromEntries( Object.keys( colors ).map( key => typeof colors[key] ? [ `--tns-` + key, colors[key] ] : [] ) );
	
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
		...( innerBlockProps?.style ? innerBlockProps?.style : {} )
	}
	
	useEffect(() => {
			setAttributes({ previewMode: ! (hasInnerBlocksSelected || isSelected) })
	}, [ isSelected, hasInnerBlocksSelected ]);
	
	const displayPagination = previewMode && pagination;
	const displayNavigation = previewMode && navigation;
	
	useEffect(() => {
		
		if ( ! previewMode ) {
			return;
		}
		
		initCarousel()
		
	}, [ previewMode ]);
	
	useEffect(() => {
		setAttributes({ previewMode: true })
	}, [ settings, pagination, navigation ]);
	
	useEffect(() => {
		if ( ! previewMode ) {
			return;
		}
		setTimeout( initCarousel, 400 )
	})
	
	return (
		<div { ...innerBlockProps } style={ style }>
			
			{ isSelected && <Inspector { ...props } /> }
			
			{
				(isSelected || hasInnerBlocksSelected) && (
					<div className="content-sliders-toggle-edit-mode">
						{
							! previewMode ? <Button onClick={ () => setAttributes({ previewMode: true })  } variant="primary" icon={seenIcon}>Switch to preview mode</Button> :
												<Button onClick={() => setAttributes({ previewMode: false })} variant="primary" icon={editIcon}>Switch to edit mode</Button>
						}
					</div>
				)
			}
			
			<div ref={ _swiper_el }>
				{
					previewMode ? (
					 <div className="swiper">
						 <div className="swiper-wrapper">{ children }</div>
						 {
							 displayPagination && <div className="swiper-pagination" />
						 }
						 
						 {
							 displayNavigation && (
								 <div>
									 <div className="swiper-button-prev" />
									 <div className="swiper-button-next" />
								 </div>
							 )
						 }
					 </div>
					) : children
				}
			</div>
			<div className="content-sliders-slider-appender">
				<ButtonBlockAppender rootClientId={ clientId } />
			</div>
		</div>
	);
}
