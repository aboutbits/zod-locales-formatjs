import { useIntl } from 'react-intl'
import { setZodErrorMap } from '../zod/setZodErrorMap.js'

export function useZodInternationalizationWithReactIntl() {
  const intl = useIntl()

  setZodErrorMap(intl)
}
