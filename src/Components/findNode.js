export function findNode(id, currentNode) {
    var i,
        currentChild,
        result;

    if (id == currentNode.id) {
        return currentNode;
    } else {
        for (i = 0; i < currentNode.replies.length; i += 1) {
            currentChild = currentNode.replies[i];
            result = findNode(id, currentChild);
            if (result !== false) {
                return result;
            }
        }
        return false;
    }
}