<h1 align="center">
  <br>
    <img align="center" src="img/logo.png" alt="Marky Dynamic logo" style="width:200px;">
  <br>
	<br>
  Marky Dynamic
  <br>
  <br>
</h1>
<h4 align="center">Automate updating dynamic content in a markdown document e.g. Table of Contents.</h4>

<p align="center">
<img src="https://img.shields.io/static/v1?logo=visual-studio-code&label=made%20for&message=VS%20Code&color=0000ff" alt="Made for VSCode">
<img src="https://img.shields.io/visual-studio-marketplace/v/robole.marky-dynamic?logo=visual-studio-code&color=ffa500" alt="Visual Studio Marketplace Version">
<img src="https://img.shields.io/static/v1?logo=visual-studio-code&label=size&message=20KB&color=008000"
alt="Extension file size in bytes">
<img src="https://img.shields.io/visual-studio-marketplace/r/robole.marky-dynamic?logo=visual-studio-code&color=yellow" alt="Visual Studio Marketplace Rating">
<img src="https://img.shields.io/visual-studio-marketplace/d/robole.marky-dynamic?logo=visual-studio-code&color=blue" alt="downloads"/>
<img src="https://img.shields.io/visual-studio-marketplace/i/robole.marky-dynamic?logo=visual-studio-code&color=blue" alt="installs"/>
<img src="https://img.shields.io/static/v1?label=built%20with&message=good%20vibrations%20%26%20javascript&color=violet" alt="Built with carrot juice and javascript"/>
<a href="https://ko-fi.com/roboleary"><img src="https://img.shields.io/badge/Buy%20me%20a%20coffee-$4-orange?logo=buy-me-a-coffee" alt="Buy me a coffee"></a>
</p>

## Commands

The following commands can be run from the Command Palette (`Ctrl+Shift+P`):

1. `Marky Dynamic: Add/Update the Table of Contents (TOC)`: Add a Table of Contents (TOC) at the cursor position in the active markdown document. If the TOC exists already, it will be updated.
1. `Marky Dynamic: Remove the Table of Contents (TOC)`: Remove the TOC from the document. You do not need to select the TOC for this to happen.
1. `Marky Dynamic: Add/Update Heading Bookmarks`
1. `Marky Dynamic: Remove Heading Bookmarks`
1. `Marky Dynamic: Add/Update Section Numbering`
1. `Marky Dynamic: Remove Section Numbering`

## Features

Marky Dynamic supports open and closed ATX-style headings (the ones that use hashes).

### (1) Manage a Table of Contents (TOC)

The command `Marky Dynamic: Add/Update the Table of Contents (TOC)` will add a table of contents (TOC) at the cursor position in the active markdown document. If the TOC exists already, it will be updated.

![Add TOC](img/screenshots/add-toc.gif)

- The setting `Marky Markdown › Table of Contents: Level Range` determines which headings are included.
- The setting `Marky Markdown › Slugify Style` determines how the ID for the links are generated. It excludes the text from bookmark links.
- Indentation is based on your User Settings (`Editor: Insert Spaces`, `Editor: Tab Size`, and `Editor: Detect Indentation` )
- The CodeLens entry on the top of the TOC indicates if it is "up-to-date" with the document. You can click this entry to update the TOC.

  	![Update TOC](img/screenshots/update-toc.gif)

- You can choose to have the TOC update automatically whenever the document is saved by enabling the `Marky Markdown › Update On Save` option in the Settings.
- You can choose to add a label to the top of the TOC by editing the `Marky Markdown › Table Of Contents: Label` option in the Settings.

The command `Marky Dynamic: Remove the Table of Contents (TOC)` will remove the TOC. You do not need to select the TOC for this to happen.

### (2) Manage Heading Bookmarks

It is helpful to readers to have a link in headings for bookmarking different sections of a document for navigation and sharing. You probably have seen this done automatically by GitHub to `readme.md` files, like in the image below.

<img src="img/screenshots/heading-link.jpg" style="border:1px black solid;" alt="heading link" /><br>

The command `Marky Dynamic: Add/Update Heading Bookmarks` will add bookmark links to the headings in the active markdown document.

![add bookmark link to headings](img/screenshots/add-heading-link.gif)

It does the following:

- The `Marky Markdown › Table of Contents: Level Range` determines which headings are included.
- By default, it will add a link with the text '**∞**', this is the infinity character, which looks like a link! In the Settings, you can customise this text (`Marky Markdown › Bookmarks: Link Text`), or specify an image (`Marky Markdown › Bookmarks: Link Image Path`). If you provide text and an image, the image will come first.
- The setting `Marky Markdown › Slugify Style` determines how the ID for the links are generated. It excludes the text from bookmark links.
- You can choose to have the bookmarks update automatically whenever the document is saved by enabling the `Marky Markdown › Update On Save` option in the Settings.

The command `Marky Dynamic: Remove Heading Bookmarks` will remove the bookmark links from all headings.

### (3) Manage Section Numbering

The command `Marky Dynamic: Add/Update Section Numbering` will add section numbers to the headings of the active markdown document.

It does the following:

- The `Marky Markdown › Section Numbering: Level Range` determines which headings are included.

The command `Marky Dynamic: Remove Section Numbering` will remove the section numbers from all headings.

## Activation

The extension is only loaded when a markdown file is open. To be more specific, the [activation event](https://code.visualstudio.com/api/references/activation-events) is `onLanguage: markdown`.

## Settings

| Name                                            | Type    | Enum Values          | Default | Description                                                                                                                                                                                             |
| ----------------------------------------------- | ------- | -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marky Markdown › Bookmarks: Level Range         | String  |                      | "2..6"  | Select the range of heading levels (from most important to least important) to which bookmarks are managed. For example, the range of '2..6' includes headings from level 2 to level 6.                 |
| Marky Markdown › Bookmarks: Link Image Path     | String  |                      | ""      | Add an image to the heading bookmark link. If both text and an image are specified, the image will come first.                                                                                          |
| Marky Markdown › Bookmarks: Link Text           | String  |                      | "∞"       | Customize the text of the heading bookmark links.                                                                                                                                                       |
| Marky Markdown › Section Numbering: Level Range         | String  |                      | "2..6"  | Select the range of heading levels (from most important to least important) for section numbers to be managed. For example, the range of '2..6' includes headings from level 2 to level 6.                 |
| Marky Markdown › Slugify Style                  | String  | "github", "gitlab" | "github"  | Creates a formatted version of the heading text that can be used as an ID, this is used as a fragment URL in links. Vendors produce slugs that are formatted differently.                               |
| Marky Markdown › Table Of Contents: Label       | String  |                      | ""      | Add a label to the top of the Table of Contents.                                                                                                                                                        |
| Marky Markdown › Table of Contents: Level Range | String  |                      | "2..6"  | Select the range of heading levels (from most important to least important) to which are included in the Table of Contents. For example, the range of '2..6' includes headings from level 2 to level 6. |
| Marky Markdown › Table of Contents: List Type                 | String  | "unordered list", "ordered list" | "unordered list"  | The type of list for arranging the Table of Contents                               |
| Marky Markdown › Update On Save                 | Boolean |                      | false   | Update the Bookmarks, Table of Contents, and Section Numbers automatically when the document is saved.                                                                  |

## Contribute

If you have a suggestion or find a bug, please file an issue.

## Appreciate

You can show your appreciation by:
1. [Buying me a coffee or sponsoring me](https://ko-fi.com/roboleary)
1. Leaving a positive review in the [visual studio marketplace](<https://marketplace.visualstudio.com/items?itemName=robole.marky-stats&ssr=false#review-details>).
1. Starring the repo 🌟.

This will **help other people find the extension**.

It will **offer me encouragement** to continue, and can provide **a path to dedicating more time to open-source** in the future.

Thank you! 🙏
