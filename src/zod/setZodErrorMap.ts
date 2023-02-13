import { IntlShape } from '@formatjs/intl'
import { z } from 'zod'
import { makeZodErrorMap } from './makeZodErrorMap'

export function setZodErrorMap<T>(intl: IntlShape<T>) {
  z.setErrorMap((issue) => makeZodErrorMap(issue, intl))
}
