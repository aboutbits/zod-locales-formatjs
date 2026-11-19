import { useIntl } from 'react-intl'
import { setZodErrorMap } from '../zod/setZodErrorMap'

export function useZodInternationalizationWithReactIntl() {
  const intl = useIntl()

  setZodErrorMap(intl)
}
