
function _objectSpread(target) { 
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) { 
            ownKeys(Object(source), true).forEach(function (key) 
            { _defineProperty(target, key, source[key]); });
        } else if (Object.getOwnPropertyDescriptors) { 
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } 
        else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

export function flattenTreeData() {
    //treeData传过来的数据
    let treeNodeList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    //flattenList定义一个新数组
    let flattenList = [];

}

export function flattenTreeData() {
    var treeNodeList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var flattenList = [];

    function dig(list) {

        return list.map(function (treeNode, index) {
            var pos = getPosition('0', index);

            var flattenNode = _objectSpread(_objectSpread({}, treeNode), {}, {
                pos: pos,
                children: null,
                data: treeNode,
                isStart: [].concat(_toConsumableArray(parent ? parent.isStart : []), [index === 0]),
                isEnd: [].concat(_toConsumableArray(parent ? parent.isEnd : []), [index === list.length - 1])
            });

            flattenList.push(flattenNode); // Loop treeNode children


            return flattenNode;
        });
    }

    dig(treeNodeList);
    return flattenList;
}