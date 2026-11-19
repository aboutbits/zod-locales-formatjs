import { z } from 'zod'
import { makeZodErrorMap } from './makeZodErrorMap.js'
import type { IntlShape } from '@formatjs/intl'

export function setZodErrorMap<T>(intl: IntlShape<T>) {
  z.config({ customError: (issue) => makeZodErrorMap(issue, intl) })
}
