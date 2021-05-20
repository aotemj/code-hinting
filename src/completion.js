const vscode = require('vscode');
const {keywords} = require("./keywords");

/**
 * 自动提示实现，根据当前输入单词判断是否命中当前项目
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(document, position, token, context) {
    const line = document.lineAt(position);

    // 最后一个单词
    const words = line.text.split(' ');
    const lastWord = words.pop()

    let res = []

    // vscode.CompletionItemKind 是当前item 的提示类型
    keywords.forEach(item => {
        if (item.includes(lastWord)) {
            res.push(
                new vscode.CompletionItem(item, vscode.CompletionItemKind.Field)
            )
        }
    })

    return res
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item, token) {
    return null;
}

module.exports = function (context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};