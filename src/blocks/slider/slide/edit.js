import {
	useInnerBlocksProps,
	useBlockProps,
	ButtonBlockAppender,
	store as blockEditorStore,
	InspectorControls
} from "@wordpress/block-editor";
import {useDispatch, useSelect} from "@wordpress/data";
import {useEffect, useRef, useCallback} from "@wordpress/element";
import classnames from "classnames";
import { debounce } from "lodash";
import {PanelBody, Button} from "@wordpress/components";

const allowedBlocks = [ "core/cover" ];


const getTemplate = ( blockIndex ) => {
	
	let overlayColor = "pale-cyan-blue";
	
	if ( blockIndex % 2 === 0 ) {
		overlayColor = "vivid-cyan-blue";
	}
	
	if ( blockIndex % 3 === 0 ) {
		overlayColor = "light-green-cyan";
	}
	
	return [
		[
			"core/cover",
			{
				overlayColor
			},
			[
				[
					"core/heading",
					{
						content: "Content sliders",
						textAlign: "center"
					}
				]
			]
		]
	]
}


export default function edit({  clientId, context, isSelected, attributes }) {
	
	const minHeight = context['content-sliders/slider/min-height'];
	const minHeightUnit = context['content-sliders/slider/min-height-unit'];
	const isPreviewMode = context['content-sliders/slider/preview-mode'];

	
	const blockProps = useBlockProps({
		className: classnames('content-sliders-slide', { 'swiper-slide': isPreviewMode })
	});
	
	const elem = useRef( null );
	
	const { updateBlockAttributes, selectBlock } = useDispatch( blockEditorStore );
	
	const { blockIndex, isBlockSelected, parents } = useSelect( select => {
		const { getBlockIndex, getBlockHierarchyRootClientId, getSelectedBlockClientId, getBlockParents } = select( blockEditorStore);
		const rootClientId = getBlockHierarchyRootClientId( clientId );
		const selectedRootClientId = getBlockHierarchyRootClientId( getSelectedBlockClientId() );
		
		return {
			blockIndex: getBlockIndex( clientId ),
			isBlockSelected: rootClientId === selectedRootClientId,
			parents: getBlockParents( clientId )
		}
	} )
	
	const { children, ...innerBlockProps } = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		template: getTemplate( blockIndex )
	} );
	
	const getBlock = useSelect( select => select(blockEditorStore).getBlock)
	
	const innerBlockIDs = useSelect( ( select ) => {
		const innerBlocks = getBlock( clientId )?.innerBlocks;
		return innerBlocks?.map( block => block?.clientId ) || [];
	}, [ clientId ]);
	
	useEffect( () => {
		updateBlockAttributes( innerBlockIDs, { lock: { move: true, remove: true  }} )
	}, [ innerBlockIDs ]);
	
	
	const coverHeight = useSelect( select => {
		return select( blockEditorStore ).getBlock( clientId )?.innerBlocks?.[0]?.attributes?.minHeight;
	} );
	
	const updateWithDebounce = useCallback(
		debounce(function () {
				elem.current?.closest(".swiper")?.swiper?.updateAutoHeight(50);
			}, 200 ),
		[]
	)
	
	
	useEffect( () => {
		updateWithDebounce();
	}, [ coverHeight ])
	
	const showAppender = useSelect( select => {
		return ! select( blockEditorStore ).getBlock( clientId )?.innerBlocks.length
	} )
	
	return (
		<div {...innerBlockProps}>
			<InspectorControls>
				<PanelBody>
					<Button onClick={ () => {
						
						const _parent = parents.at(-1);
						
						selectBlock(_parent)
						
					} } variant="primary">Edit slider settings</Button>
				</PanelBody>
			</InspectorControls>
			<span ref={ elem } />
			{ children }
			{
				showAppender && (
					<div className="content-sliders-slide-appender">
						<ButtonBlockAppender rootClientId={ clientId } />
					</div>
				)
 			}
		</div>
	);
}
