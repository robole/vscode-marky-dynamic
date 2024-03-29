const assert = require("assert");
const doc = require("../../src/document");

describe("Document", function () {
  describe("addBookmarks()", function () {
    let lines;
    let linesNumbered;

    beforeEach(function () {
      lines = [];
      lines[0] = "# Document title";
      lines[1] = "## Subdoc 1 ✌ ##";
      lines[2] = "text";

      linesNumbered = [];
      linesNumbered[0] = "# Document title";
      linesNumbered[1] = "## 1. Subdoc 1 ✌";
      linesNumbered[2] = "### 1.1. Subdoc 2 mister 😊 ###";
    });

    afterEach(function () {
      lines = null;
      linesNumbered = null;
    });

    it("should add links to headings", function () {
      let expected = "# Document title,";
      expected += "## [∞](#subdoc-1-) Subdoc 1 ✌ ##,text";
      assert.equal(
        doc.addBookmarks(lines, "", "∞", "github", 2, 6).toString(),
        expected
      );
    });

    it("should add links to headings and keep section numbering", function () {
      let expected2 = "# Document title,";
      expected2 +=
        "## [∞](#subdoc-1-) 1. Subdoc 1 ✌,### [∞](#subdoc-2-mister-) 1.1. Subdoc 2 mister 😊 ###";
      assert.equal(
        doc.addBookmarks(linesNumbered, "", "∞", "github", 2, 6).toString(),
        expected2
      );
    });

    it("should add links with a given image to each heading", function () {
      let expected = "# Document title,";
      expected += "## [![](/img/link.png)](#subdoc-1-) Subdoc 1 ✌ ##,text";
      assert.equal(
        doc.addBookmarks(lines, "/img/link.png", "", "github", 2, 6).toString(),
        expected
      );
    });

    it("should add links with given text and image to each heading", function () {
      let expected = "# Document title,";
      expected += "## [![](/img/link.png) ∞](#subdoc-1-) Subdoc 1 ✌ ##,text";
      assert.equal(
        doc
          .addBookmarks(lines, "/img/link.png", "∞", "github", 2, 6)
          .toString(),
        expected
      );
    });

    it("should add links with given text and an image to each heading for a specific range", function () {
      let expected =
        "# [![](/img/link.png) ∞](#document-title) Document title,";
      expected += "## [![](/img/link.png) ∞](#subdoc-1-) Subdoc 1 ✌ ##,text";
      assert.equal(
        doc
          .addBookmarks(lines, "/img/link.png", "∞", "github", 1, 6)
          .toString(),
        expected
      );
    });

    it("should not add a link to heading when no text and no image are given", function () {
      assert.equal(
        doc.addBookmarks(lines, "", "", "github", 1, 6).toString(),
        lines.toString()
      );
    });
  });

  describe("removeBookmarks()", function () {
    let lines;
    let linesNumbered;

    beforeEach(function () {
      lines = [];
      lines[0] = "# Document title";
      lines[1] = "## [∞](#subdoc-1-) Subdoc 1 ✌";
      lines[2] =
        "### [∞ ![alt](/img.png)](#subdoc-2-mister-) Subdoc 2 mister 😊 ###";

      linesNumbered = [];
      linesNumbered[0] = "# Document title";
      linesNumbered[1] = "## [∞](#subdoc-1-) 1. Subdoc 1 ✌";
      linesNumbered[2] =
        "### [∞ ![alt](/img.png)](#subdoc-2-mister-) 1.1. Subdoc 2 mister 😊 ###";
    });

    afterEach(function () {
      lines = null;
      linesNumbered = null;
    });

    it("should remove links from each doc", function () {
      let expected = "# Document title,";
      expected += "## Subdoc 1 ✌,### Subdoc 2 mister 😊 ###";
      assert.equal(doc.removeBookmarks(lines, 2, 6).toString(), expected);
    });

    it("should remove links from headings and keep section numbering", function () {
      let expected2 = "# Document title,";
      expected2 += "## 1. Subdoc 1 ✌,### 1.1. Subdoc 2 mister 😊 ###";
      assert.equal(
        doc.removeBookmarks(linesNumbered, 2, 6).toString(),
        expected2
      );
    });

    it("should remove links from headings for a specific range", function () {
      let expected = "# Document title,";
      expected += "## [∞](#subdoc-1-) Subdoc 1 ✌,### Subdoc 2 mister 😊 ###";
      assert.equal(doc.removeBookmarks(lines, 3, 3).toString(), expected);
    });

    it("should remove links from headings for a specific range and keep section numbering", function () {
      let expected2 = "# Document title,";
      expected2 +=
        "## [∞](#subdoc-1-) 1. Subdoc 1 ✌,### 1.1. Subdoc 2 mister 😊 ###";
      assert.equal(
        doc.removeBookmarks(linesNumbered, 3, 3).toString(),
        expected2
      );
    });

    it("should not change a doc with no link", function () {
      let noLinks = ["# doc 1", "## doc 2"];
      assert.equal(
        doc.removeBookmarks(noLinks, 1, 6).toString(),
        noLinks.toString()
      );
    });
  });

  describe("hasBookmarks()", function () {
    it("should return true if the docs within a range have bookmarks", function () {
      const TEXT1 =
        "# doc 1\r\n\r\npppp\r\n\r\n## [∞](#doc-2) doc 2\r\n\r\n### 3";
      assert.equal(doc.hasBookmarks(TEXT1, 2, 6), true);
      assert.equal(doc.hasBookmarks(TEXT1, 3, 6), false);
    });
  });

  describe("hasSectionNumbering()", function () {
    it("should return true if the docs within a range have bookmarks", function () {
      const TEXT1 =
        "# doc 1\r\n\r\npppp\r\n\r\n## [∞](#doc-2) doc 2\r\n\r\n### 3";
      const TEXT2 =
        "# Title\r\n\r\npppp\r\n\r\n## 1. [∞](#doc-2) Heading Level 2\r\n\r\n### 1.1 Heading level 3";
      assert.equal(doc.hasSectionNumbering(TEXT1, 2, 6), false);
      assert.equal(doc.hasSectionNumbering(TEXT2, 2, 6), true);
      assert.equal(doc.hasSectionNumbering(TEXT2, 4, 6), false);
    });
  });

  describe("getHeadings()", function () {
    const TEXT1 =
      "# Heading 1\r\n\r\npppp\r\n\r\n## Heading 2\r\n\r\n### Heading 3";

    it("should get all headings from the text", function () {
      // @ts-ignore
      let headings = doc.getHeadings(TEXT1, 1); // 3rd arg left out on purpose to check default
      assert.equal(headings.length, 3);
    });

    it("should get all headings from the text from a selected range of levels (1 to 3)", function () {
      let headings = doc.getHeadings(TEXT1, 1, 2);
      assert.equal(headings.length, 2);
      assert.equal(headings[0], "# Heading 1");
      assert.equal(headings[1], "## Heading 2");
    });
  });

  describe("getGroupedHeadings()", function () {
    const TEXT1 =
      "# Heading 1\r\n\r\npppp\r\n\r\n## [∞](#heading-2) Heading 2 ##\r\n\r\n### 3 ###";

    it("should get all headings from the text formed into subgroups", function () {
      const headings = doc.getGroupedHeadings(TEXT1, 1, 6);
      assert.equal(headings.length, 3);
      assert.equal(headings[1].length, 7);
      assert.equal(headings[1][2], "[∞](#heading-2) ");
      assert.equal(headings[1][5], "Heading 2");
    });

    it("should get all headings from the text from a selected range of levels (1 to 3)", function () {
      const headings = doc.getGroupedHeadings(TEXT1, 1, 1);
      assert.equal(headings.length, 1);
      const headings2 = doc.getGroupedHeadings(TEXT1, 1, 3);
      assert.equal(headings2.length, 3);
    });
  });

  describe("addSectionNumbering()", function () {
    it("should add section numbers to headings", function () {
      let lines = [];
      lines[0] = "# Document title";
      lines[1] = "## Section level 2 ##";
      lines[2] = "### Section level 3";
      lines[3] = "## Section level 2 again";
      lines[4] = "### Section level 3 again";

      let expected =
        "# Document title,## 1. Section level 2 ##,### 1.1. Section level 3,## 2. Section level 2 again,### 2.1. Section level 3 again";
      assert.equal(doc.addSectionNumbering(lines, 2, 6).toString(), expected);
    });

    it("should add section numbers to headings for a particular range", function () {
      let lines = [];
      lines[0] = "# Document title";
      lines[1] = "## Section level 2 ##";
      lines[2] = "### Section level 3";
      lines[3] = "## Section level 2 again";
      lines[4] = "### Section level 3 again";

      let expected =
        "# 1. Document title,## 1.1. Section level 2 ##,### Section level 3,## 1.2. Section level 2 again,### Section level 3 again";
      assert.equal(doc.addSectionNumbering(lines, 1, 2).toString(), expected);
    });

    it("should reset section numbers when going from low level sections to high level sections", function () {
      let lines = [];
      lines[0] = "# Document Title";
      lines[1] = "## Section 1";
      lines[2] = "### Section 1.1";
      lines[3] = "#### Section 1.1.1";
      lines[4] = "##### Section 1.1.1.1";
      lines[5] = "###### Section 1.1.1.1.1";
      lines[6] = "## Section 2";

      let expected =
        "# Document Title,## 1. Section 1,### 1.1. Section 1.1,#### 1.1.1. Section 1.1.1,##### 1.1.1.1. Section 1.1.1.1,###### 1.1.1.1.1. Section 1.1.1.1.1,## 2. Section 2";
      assert.equal(doc.addSectionNumbering(lines, 2, 6).toString(), expected);
    });
  });

  describe("removeSectionNumbering()", function () {
    let lines;

    beforeEach(function () {
      lines = [];
      lines[0] = "# Document title";
      lines[1] = "## 1. Section level 2 ##";
      lines[2] =
        "### [![](/bookmark.png)](#section-level-3) 1.1. Section level 3";
      lines[3] = "## 2. Section level 2 again";
      lines[4] = "### 2.1 Section level 3 again";
      lines[5] = "#### 2.1.1. Section level 4";
    });

    afterEach(function () {
      lines = null;
    });

    it("should remove section numbers from headings", function () {
      let expected = `# Document title,## Section level 2 ##,### [![](/bookmark.png)](#section-level-3) Section level 3,## Section level 2 again,### 2.1 Section level 3 again,#### Section level 4`;
      assert.equal(
        doc.removeSectionNumbering(lines, 2, 6).toString(),
        expected
      );
    });

    it("should remove section numbers from headings for a particular range", function () {
      let expected = `# Document title,## Section level 2 ##,### [![](/bookmark.png)](#section-level-3) Section level 3,## Section level 2 again,### 2.1 Section level 3 again,#### 2.1.1. Section level 4`;
      assert.equal(
        doc.removeSectionNumbering(lines, 2, 3).toString(),
        expected
      );
    });
  });
});
