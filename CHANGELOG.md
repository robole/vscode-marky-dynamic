# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2023-04-13

### Changed

- Use *logo.png* in *README.md* instead of *banner.png*.
- Regenerate *package-lock.json* after NPM was down.
- Updated GitHub secrets to see if publishing action will work.

## [0.4.0] - 2023-04-13

### Changed

- Refactoring:
	- Renamed *active-document.js* to *activeDocument.js*.
	- Improved readability of *extension.js* to separate disposables.
- Upgraded webpack and webpack CLI to work with latest Node.
- Shortened *.vscodeignore*.

### Added

- Added sponsor in *package.json* and *funding.yml*.

### Removed

- Removed unused functions such as `getWordCount()`, `getCharacterCount()`, and `getLineCount()` from *active-document.js* and *document.js*.

## [0.3.0] - 2021-05-09

## Changed

- Refined description in package.json and README.

## [0.2.0] - 2021-05-09

## Changed

- Changed format of README.
- Updated .vscodeignore.
- Tweaked banner image.
- Updated keys for publishing to marketplaces.
- Added `enablement` clause to all commands in package.json. This enables removal of extra activation events.

## [0.1.4] - 2021-03-02

### Changed

- Added more badges.

## [0.1.3] - 2021-03-02

### Changed

- Upgrade only to test github action using new VS Code PAN.

## [0.1.2] - 2021-03-02

### Added

- Added github action to publish to Visual Studio Code Marketplace and Open-VSX.

## [0.1.1] - 2021-02-28

### Fixed

- Issue with addSectionNumbering in document.js. Section numbering was not resetting when going from a deep level to a higher level.

### Added

- Added extra badges to README.md.
- Added automatic task to run webpack when project is opened.

## [0.1.0] - 2020-08-19

### Added

- Initial release. The features are taken from "Marky Markdown" v2.5.1.
- Added banner image to README.md.
