import * as React from 'react';
 
import raf from 'raf';
 
import {
    getElementScrollPercentage,
    getScrollPercentage,
    getNodeHeight,
    getRangeIndex,
    getItemAbsoluteTop,
    GHOST_ITEM_KEY,
    getItemRelativeTop,
    getCompareItemRelativeTop,
    alignScrollTop,
 
} from './utils/itemUtil';
import { getIndexByStartLoc, findListDiffIndex } from './utils/algorithmUtil';
 
class List extends React.Component {
    static defaultProps = {
        itemHeight: 15,
        data: [],
    };

    listRef = React.createRef();

    itemElements = {};

    itemElementHeights = {};

    /**
     * Always point to the latest props if `disabled` is `false`
     */
    cachedProps;

    /**
     * Lock scroll process with `onScroll` event.
     * This is used for `data` length change and `scrollTop` restore
     */
    lockScroll = false;

    constructor(props) {
        super(props);

        this.cachedProps = props;

        this.state = {
            status: 'NONE',
            scrollTop: null,
            itemIndex: 0,
            itemOffsetPtg: 0,
            startIndex: 0,
            endIndex: 0,
            startItemTop: 0,
            itemCount: props.data.length,
        };
    }

    static getDerivedStateFromProps(nextProps) {
      
        return {
                itemCount: nextProps.data.length,
        };
    }

    /**
     * Phase 1: Initial should sync with default scroll top
     */
    componentDidMount() {
        if (this.listRef.current) {
            this.listRef.current.scrollTop = 0;
            this.onScroll(null);
        }
    }

    /**
     * Phase 4: Record used item height
     * Phase 5: Trigger re-render to use correct position
     */
    componentDidUpdate() {
        const { status } = this.state;
        const { data, height, itemHeight, onSkipRender, virtual } = this.props;
        const prevData = this.cachedProps.data || [];

        let changedItemIndex = null;
        if (prevData.length !== data.length) {
            const diff = findListDiffIndex(prevData, data, this.getItemKey);
            changedItemIndex = diff ? diff.index : null;
        }

         

 
        let nextStatus = status;
       

        if (status === 'MEASURE_START') {
            const { startIndex, itemIndex, itemOffsetPtg } = this.state;
            const { scrollTop } = this.listRef.current;

            // Record here since measure item height will get warning in `render`
            this.collectItemHeights();

            // Calculate top visible item top offset
            const locatedItemTop = getItemAbsoluteTop({
                itemIndex,
                itemOffsetPtg,
                itemElementHeights: this.itemElementHeights,
                scrollTop,
                scrollPtg: getElementScrollPercentage(this.listRef.current),
                clientHeight: this.listRef.current.clientHeight,
                getItemKey: this.getIndexKey,
            });

            let startItemTop = locatedItemTop;
            for (let index = itemIndex - 1; index >= startIndex; index -= 1) {
                startItemTop -= this.itemElementHeights[this.getIndexKey(index)] || 0;
            }

            this.setState({
                status: 'MEASURE_DONE',
                startItemTop,
            });
        }

        if (status === 'SWITCH_TO_RAW') {
            /**
             * After virtual list back to raw list,
             * we update the `scrollTop` to real top instead of percentage top.
             */
            const {
                cacheScroll: { itemIndex, relativeTop },
            } = this.state;
            let rawTop = relativeTop;
            for (let index = 0; index < itemIndex; index += 1) {
                rawTop -= this.itemElementHeights[this.getIndexKey(index)] || 0;
            }

            this.lockScroll = true;
            this.listRef.current.scrollTop = -rawTop;

            this.setState({
                status: 'MEASURE_DONE',
                itemIndex: 0,
            });

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.lockScroll = false;
                });
            });
        } else if (prevData.length !== data.length && changedItemIndex !== null && height) {
            /**
             * Re-calculate the item position since `data` length changed.
             * [IMPORTANT] We use relative position calculate here.
             */
            let { itemIndex: originItemIndex } = this.state;
            const {
                itemOffsetPtg: originItemOffsetPtg,
                startIndex: originStartIndex,
                endIndex: originEndIndex,
                scrollTop: originScrollTop,
            } = this.state;

            // 1. Refresh item heights
            this.collectItemHeights();

            // 1. Get origin located item top
            let originLocatedItemRelativeTop;

            if (this.state.status === 'SWITCH_TO_VIRTUAL') {
                originItemIndex = 0;
                originLocatedItemRelativeTop = -this.state.scrollTop;
            } else {
                originLocatedItemRelativeTop = getItemRelativeTop({
                    itemIndex: originItemIndex,
                    itemOffsetPtg: originItemOffsetPtg,
                    itemElementHeights: this.itemElementHeights,
                    scrollPtg: getScrollPercentage({
                        scrollTop: originScrollTop,
                        scrollHeight: prevData.length * itemHeight,
                        clientHeight: this.listRef.current.clientHeight,
                    }),
                    clientHeight: this.listRef.current.clientHeight,
                    getItemKey: (index) => this.getIndexKey(index, this.cachedProps),
                });
            }

            // 2. Find the compare item
            let originCompareItemIndex = changedItemIndex - 1;
            // Use next one since there are not more item before removed
            if (originCompareItemIndex < 0) {
                originCompareItemIndex = 0;
            }

            // 3. Find the compare item top
            const originCompareItemTop = getCompareItemRelativeTop({
                locatedItemRelativeTop: originLocatedItemRelativeTop,
                locatedItemIndex: originItemIndex,
                compareItemIndex: originCompareItemIndex,
                startIndex: originStartIndex,
                endIndex: originEndIndex,
                getItemKey: (index) => this.getIndexKey(index, this.cachedProps),
                itemElementHeights: this.itemElementHeights,
            });

            if (nextStatus === 'SWITCH_TO_RAW') {
                /**
                 * We will record current measure relative item top and apply in raw list after list turned
                 */
                this.setState({
                    cacheScroll: {
                        itemIndex: originCompareItemIndex,
                        relativeTop: originCompareItemTop,
                    },
                });
            } else {
                this.internalScrollTo({
                    itemIndex: originCompareItemIndex,
                    relativeTop: originCompareItemTop,
                });
            }
        } else if (nextStatus === 'SWITCH_TO_RAW') {
            // This is only trigger when height changes that all items can show in raw
            // Let's reset back to top
            this.setState({
                cacheScroll: {
                    itemIndex: 0,
                    relativeTop: 0,
                },
            });
        }

        this.cachedProps = this.props;
    }

    /**
     * Phase 2: Trigger render since we should re-calculate current position.
     */
    onScroll = event => {
        const { data, height, itemHeight } = this.props;

        const { scrollTop: originScrollTop, clientHeight, scrollHeight } = this.listRef.current;
        const scrollTop = alignScrollTop(originScrollTop, scrollHeight - clientHeight);

        // Skip if `scrollTop` not change to avoid shake
        if (scrollTop === this.state.scrollTop || this.lockScroll) {
            return;
        }

        const scrollPtg = getElementScrollPercentage(this.listRef.current);
        const visibleCount = Math.ceil(height / itemHeight);

        const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(
            scrollPtg,
            data.length,
            visibleCount,
        );

        this.setState({
            status: 'MEASURE_START',
            scrollTop,
            itemIndex,
            itemOffsetPtg,
            startIndex,
            endIndex,
        });

        this.triggerOnScroll(event);
    };

    onRawScroll = event => {
        const { scrollTop } = this.listRef.current;

        this.setState({ scrollTop });
        this.triggerOnScroll(event);
    };

    triggerOnScroll = event => {
        const { onScroll } = this.props;
        if (onScroll && event) {
            onScroll(event);
        }
    };

    getIndexKey = (index, props) => {
        const mergedProps = props || this.props;
        const { data = [] } = mergedProps;

        // Return ghost key as latest index item
        if (index === data.length) {
            return GHOST_ITEM_KEY;
        }

        const item = data[index];
        if (item === undefined) {
            /* istanbul ignore next */
            console.error('Not find index item. Please report this since it is a bug.');
            return null;
        }

        return this.getItemKey(item, mergedProps);
    };

    getItemKey = (item, props) => {
        const { itemKey } = props || this.props;

        return typeof itemKey === 'function' ? itemKey(item) : item[itemKey];
    };

    /**
     * Collect current rendered dom element item heights
     */
    collectItemHeights = (range) => {
        const { startIndex, endIndex } = range || this.state;
        const { data } = this.props;

        // Record here since measure item height will get warning in `render`
        for (let index = startIndex; index <= endIndex; index += 1) {
            const item = data[index];

            // Only collect exist item height
            if (item) {
                const eleKey = this.getItemKey(item);
                this.itemElementHeights[eleKey] = getNodeHeight(this.itemElements[eleKey]);
            }
        }
    };

    scrollTo = (arg0) => {
        raf(() => {
            // Number top
            if (typeof arg0 === 'object') {
            
                const { height, itemHeight, data } = this.props;
                const { align = 'auto' } = arg0;

                let index = 0;
                if ('index' in arg0) {
                    ({ index } = arg0);
                } else if ('key' in arg0) {
                    const { key } = arg0;
                    index = data.findIndex(item => this.getItemKey(item) === key);
                }

                const visibleCount = Math.ceil(height / itemHeight);
                const item = data[index];
                if (item) {
                    const { clientHeight } = this.listRef.current;
 
                        // Raw list without virtual scroll set position directly
                        this.collectItemHeights({ startIndex: 0, endIndex: data.length - 1 });
                        let mergedAlgin = align;

                        // Collection index item position
                        const indexItemHeight = this.itemElementHeights[this.getIndexKey(index)];
                        let itemTop = 0;
                        for (let i = 0; i < index; i += 1) {
                            const eleKey = this.getIndexKey(i);
                            itemTop += this.itemElementHeights[eleKey] || 0;
                        }
                        const itemBottom = itemTop + indexItemHeight;

                        if (mergedAlgin === 'auto') {
                            if (itemTop < this.listRef.current.scrollTop) {
                                mergedAlgin = 'top';
                            } else if (itemBottom > this.listRef.current.scrollTop + clientHeight) {
                                mergedAlgin = 'bottom';
                            }
                        }

                        if (mergedAlgin === 'top') {
                            this.listRef.current.scrollTop = itemTop;
                        } else if (mergedAlgin === 'bottom') {
                            this.listRef.current.scrollTop = itemTop - (clientHeight - indexItemHeight);
                        }
                   
                }
            } else {
                this.listRef.current.scrollTop = arg0;
            }
        });
    };

    internalScrollTo(relativeScroll) {
        const { itemIndex: compareItemIndex, relativeTop: compareItemRelativeTop } = relativeScroll;
        const { scrollTop: originScrollTop } = this.state;
        const { data, itemHeight, height } = this.props;

        // 1. Find the best match compare item top
        let bestSimilarity = Number.MAX_VALUE;
        let bestScrollTop = null;
        let bestItemIndex = null;
        let bestItemOffsetPtg = null;
        let bestStartIndex = null;
        let bestEndIndex = null;

        let missSimilarity = 0;

        const scrollHeight = data.length * itemHeight;
        const { clientHeight } = this.listRef.current;
        const maxScrollTop = scrollHeight - clientHeight;

        for (let i = 0; i < maxScrollTop; i += 1) {
            const scrollTop = getIndexByStartLoc(0, maxScrollTop, originScrollTop, i);

            const scrollPtg = getScrollPercentage({ scrollTop, scrollHeight, clientHeight });
            const visibleCount = Math.ceil(height / itemHeight);

            const { itemIndex, itemOffsetPtg, startIndex, endIndex } = getRangeIndex(
                scrollPtg,
                data.length,
                visibleCount,
            );

            // No need to check if compare item out of the index to save performance
            if (startIndex <= compareItemIndex && compareItemIndex <= endIndex) {
                // 1.1 Get measure located item relative top
                const locatedItemRelativeTop = getItemRelativeTop({
                    itemIndex,
                    itemOffsetPtg,
                    itemElementHeights: this.itemElementHeights,
                    scrollPtg,
                    clientHeight,
                    getItemKey: this.getIndexKey,
                });

                const compareItemTop = getCompareItemRelativeTop({
                    locatedItemRelativeTop,
                    locatedItemIndex: itemIndex,
                    compareItemIndex, // Same as origin index
                    startIndex,
                    endIndex,
                    getItemKey: this.getIndexKey,
                    itemElementHeights: this.itemElementHeights,
                });

                // 1.2 Find best match compare item top
                const similarity = Math.abs(compareItemTop - compareItemRelativeTop);
                if (similarity < bestSimilarity) {
                    bestSimilarity = similarity;
                    bestScrollTop = scrollTop;
                    bestItemIndex = itemIndex;
                    bestItemOffsetPtg = itemOffsetPtg;
                    bestStartIndex = startIndex;
                    bestEndIndex = endIndex;

                    missSimilarity = 0;
                } else {
                    missSimilarity += 1;
                }
            }

            // If keeping 10 times not match similarity,
            // check more scrollTop is meaningless.
            // Here boundary is set to 10.
            if (missSimilarity > 10) {
                break;
            }
        }

        // 2. Re-scroll if has best scroll match
        if (bestScrollTop !== null) {
            this.lockScroll = true;
            this.listRef.current.scrollTop = bestScrollTop;

            this.setState({
                status: 'MEASURE_START',
                scrollTop: bestScrollTop,
                itemIndex: bestItemIndex,
                itemOffsetPtg: bestItemOffsetPtg,
                startIndex: bestStartIndex,
                endIndex: bestEndIndex,
            });

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.lockScroll = false;
                });
            });
        }
    }

    /**
     * Phase 4: Render item and get all the visible items height
     */
    renderChildren = (list, startIndex, renderFunc) => {
        const { status } = this.state;
        // We should measure rendered item height
        return list.map((item, index) => {
            const eleIndex = startIndex + index;
            const node = renderFunc(item, eleIndex, {
                style: status === 'MEASURE_START' ? { visibility: 'hidden' } : {},
            });
            const eleKey = this.getIndexKey(eleIndex);

            // Pass `key` and `ref` for internal measure
            return React.cloneElement(node, {
                key: eleKey,
                ref: (ele) => {
                    this.itemElements[eleKey] = ele;
                },
            });
        });
    };

    render() {
       
        const {
         
            data,
            children
        } = this.props;



        return (
            <div
                className="rc-tree-virtual"
            >

                {this.renderChildren(data, 0,children)}

            </div>
        );



    }
}

export default List;