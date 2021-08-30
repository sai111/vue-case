const bt2 = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}

/***
 * 力扣：104.二叉树的最大深度
 * 提示：二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 说明：叶子节点是指没有字节点的节点
 * 示例： 给定二叉树，返回它的最大深度 3  
 *        3
 *       / \
 *      9   20
 *          / \
 *         15   7
 */


var maxDepth = function (root) {
   let res = 0
  const dfs = (n, l) => {
    if (!n) { return }
    if (!n.left && !n.right) {
      res = Math.max(res, l)
    }
    dfs(n.left, l + 1)
    dfs(n.right, l + 1)
  }
  dfs(root, 1)
  return res
}
console.log(maxDepth(bt2, 0), '104：返回结果')

/***
 * 力扣：111.二叉树的最小深度
 * 提示：二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 说明：叶子节点是指没有字节点的节点
 * 示例： 给定二叉树，返回它的最大深度 3  
 *        3
 *       / \
 *      9   20
 *          / \
 *         15   7
 * 求最小深度，考虑使用广度优先遍历，并记录每个节点的层级
 * 在广度优先遍历过程中，遇到叶子节点，停止遍历，返回节点层级
 */

var minDepth = function(root) {
  if (!root) { return 0 }
  // 广度优先遍历-队列
  const q = [[root, 1]]
  while(q.length) {
    const [n, l] = q.shift()
    if (!n.left && !n.right) {
      return l
    }
    console.log(n, 'nnn', n.val, l)
    if (n.left) q.push([n.left, l + 1])
    if (n.right) q.push([n.right, l + 1])
  }
}
