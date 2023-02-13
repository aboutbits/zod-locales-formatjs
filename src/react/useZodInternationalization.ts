import { useIntl } from 'react-intl'
import { setZodErrorMap } from '../zod/setZodErrorMap'

export function useZodInternationalization() {
  const intl = useIntl()

  setZodErrorMap(intl)
}
