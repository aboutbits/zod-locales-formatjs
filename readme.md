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

First you need to install the package:

```bash
npm install @aboutbits/zod-locales-formatjs
```

Second, add the custom language packages to your `IntlProvider`:

```js
import { de } from '@aboutbits/zod-locales-formatjs'
import { IntlProvider } from 'react-intl'

<IntlProvider messages={{...youMessages, ...de }} {...}>{children}</IntlProvider>

```

Finally, configure `Zod` to use the new translations. You can use these helpers with `React`:

```js
import { useZodInternationalizationWithReactIntl } from '@aboutbits/zod-locales-formatjs'

useZodInternationalizationWithReactIntl()
```

or

```js
import { ZodInternationalizationWithReactIntl } from '@aboutbits/zod-locales-formatjs'

<ZodInternationalizationWithReactIntl />
```

These `React` helpers require to install the `react-intl` package.

If you don't use `React`, you can set the `ZodErrorMap` manually with:

```js
import { setZodErrorMap } from '@aboutbits/zod-locales-formatjs'

setZodErrorMap(intl)
```

## Build & Publish

To build and publish the package, simply commit all changes and push them to master. Then run one of the following commands locally:

```bash
npm version patch
npm version minor
npm version major
```

## Information

About Bits is a company based in South Tyrol, Italy. You can find more information about us on [our website](https://aboutbits.it).

### Support

For support, please contact [info@aboutbits.it](mailto:info@aboutbits.it).

### Credits

- [All Contributors](../../contributors)

### License

The MIT License (MIT). Please see the [license file](LICENSE.md) for more information.
