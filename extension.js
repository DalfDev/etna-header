// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "etna-header" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.etna-header', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
        vscode.window.showInformationMessage('Adding Header !');

        let editor = vscode.window.activeTextEditor;
        let pos = editor.selection.active;

		if (editor) {
            let box = vscode.window.createInputBox();
            box.onDidAccept(() => {
                let login = box.value;
                box.hide()

                let box2 = vscode.window.createInputBox();
                box2.placeholder = "Description";
                box2.show()

                box2.onDidAccept(() => {
                    box2.hide()
                    let desc = box2.value;
                    let ext = editor.document.uri.fsPath;
                    vscode.window.showInformationMessage(ext);
                    editor.edit(editBuilder => {
                        editBuilder.insert(
                            new vscode.Position(pos.line, pos.character + 1),
                            "/*\n\
** ETNA PROJECT, " + convertDate(Date()) +" by " + login + "\n\
** " + vscode.workspace.rootPath + "\n\
** File description:\n\
**      " + desc + "\n\
*/\n"
                        );
                    });
                })
            })
            box.placeholder = "Login"
            box.show()
		}
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
