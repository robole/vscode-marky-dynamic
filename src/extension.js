const vscode = require("vscode");
const activeDoc = require("./activeDocument");

function activate(context) {
  let disposable1 = vscode.commands.registerCommand(
    "marky-markdown.addBookmarks",
    () => {
      activeDoc.addBookmarks();
    }
  );

  let disposable2 = vscode.commands.registerCommand(
    "marky-markdown.removeBookmarks",
    () => {
      activeDoc.removeBookmarks();
    }
  );

  let disposable3 = vscode.commands.registerCommand(
    "marky-markdown.addTableOfContents",
    () => {
      activeDoc.addTableOfContents();
    }
  );

  let disposable4 = vscode.commands.registerCommand(
    "marky-markdown.removeTableOfContents",
    () => {
      activeDoc.removeTableOfContents();
    }
  );

  let disposable5 = vscode.commands.registerCommand(
    "marky-markdown.addSectionNumbering",
    () => {
      activeDoc.addSectionNumbering();
    }
  );

  let disposable6 = vscode.commands.registerCommand(
    "marky-markdown.removeSectionNumbering",
    () => {
      activeDoc.removeSectionNumbering();
    }
  );

  let disposable7 = vscode.languages.registerCodeLensProvider("markdown", {
    provideCodeLenses() {
      // expects iterator of codelenses, so we comply!
      const lenses = [];
      lenses.push(activeDoc.getTableOfContentsCodeLens());
      return lenses;
    },
  });

  let disposable8 = vscode.workspace.onWillSaveTextDocument(
    activeDoc.onWillSave
  );

  context.subscriptions = [
    disposable1,
    disposable2,
    disposable3,
    disposable4,
    disposable5,
    disposable6,
    disposable7,
    disposable8,
  ];
}

module.exports = {
  activate,
};
