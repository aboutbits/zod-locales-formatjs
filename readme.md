Custom Zod Locales for FormatJS
===============================

[![npm version](https://badge.fury.io/js/%40aboutbits%2Fzod-locales-formatjs.svg)](https://badge.fury.io/js/%40aboutbits%2Fzod-locales-formatjs)

This package provides simplified translations for Zod error messages.
It contains translations for German and Italian.

## Table of content

- [Usage](#usage)
- [Build & Publish](#build--publish)
- [Information](#information)

## Usage

First you need to install the package together with its peer dependencies:

```bash
npm install @aboutbits/zod-locales-formatjs zod @formatjs/intl
```

Requirements:

- `zod` 4
- `@formatjs/intl` 6
- `react-intl` 12, only when using the React helpers
- The package is ESM only. It needs Node.js 26 or later, or a bundler that supports package `exports`.
- TypeScript projects need `moduleResolution` set to `node16`, `nodenext` or `bundler`.

Second, add the custom language packages to your `IntlProvider`:

```js
import { de } from '@aboutbits/zod-locales-formatjs'
import { IntlProvider } from 'react-intl'

<IntlProvider messages={{...yourMessages, ...de }} {...}>{children}</IntlProvider>

```

Finally, configure `Zod` to use the new translations. The following helpers can be used with `React`. They require the `react-intl` package to be installed.

```js
import { useZodInternationalizationWithReactIntl } from '@aboutbits/zod-locales-formatjs/react-intl'

useZodInternationalizationWithReactIntl()
```

or

```js
import { ZodInternationalizationWithReactIntl } from '@aboutbits/zod-locales-formatjs/react-intl'

<ZodInternationalizationWithReactIntl />
```

If you don't use `React`, you can set the `ZodErrorMap` manually with:

```js
import { setZodErrorMap } from '@aboutbits/zod-locales-formatjs'

setZodErrorMap(intl)
```

## Build & Publish

To build and publish the package, visit the GitHub Actions page of the repository.

You can choose between two workflows:
- `Release Package` to publish a new version of the package.
- `Pre-Release Package` to publish a new pre-release version of the package.

**Note:** Pre-releases need to be supplied with a pre-id.

**Note:** To increment a pre-release, you have to run the normal release workflow and select "prerelease". For this action you need to already be on a pre-release version.

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](LICENSE.md) for more information.
