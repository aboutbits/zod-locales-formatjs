import { errorMessages } from './errorMessages'
import type {
  FormatDateOptions,
  IntlShape,
  MessageDescriptor,
} from '@formatjs/intl'
import type { z } from 'zod'

// Docs https://zod.dev/error-customization#global-error-customization
export function makeZodErrorMap<T>(
  issue: z.core.$ZodRawIssue,
  intl: IntlShape<T>,
) {
  const descriptorItem = getDescriptorItem<T>(issue, intl)

  const descriptor: MessageDescriptor =
    descriptorItem.key in errorMessages
      ? errorMessages[descriptorItem.key as keyof typeof errorMessages]
      : errorMessages.default

  return {
    message: intl.formatMessage(descriptor, descriptorItem.values),
  }
}

/**
 * Zod 4 uses snake_case names for some string formats. The translation keys keep their original names.
 */
const stringFormatKeys: Partial<Record<string, string>> = {
  starts_with: 'startsWith',
  ends_with: 'endsWith',
}

export function getDescriptorItem<T>(
  issue: z.core.$ZodRawIssue,
  intl: IntlShape<T>,
): {
  key: string
  values?: Record<string, string | number>
} {
  if (issue.code === 'invalid_format') {
    return {
      key: `string.invalid.${stringFormatKeys[issue.format] ?? issue.format}`,
      values:
        issue.format === 'starts_with'
          ? { value: String(issue.prefix) }
          : issue.format === 'ends_with'
            ? { value: String(issue.suffix) }
            : undefined,
    }
  }

  if (issue.code === 'not_multiple_of') {
    return {
      key: `number.${issue.code}`,
      values: { value: formatNumeric(issue.divisor, intl) },
    }
  }

  if (
    issue.code === 'invalid_type' &&
    issue.expected === 'date' &&
    issue.input instanceof Date
  ) {
    return { key: 'date.invalid_date' }
  }

  if (
    issue.code === 'too_small' &&
    issue.origin === 'string' &&
    issue.minimum === 1
  ) {
    return { key: 'string.required' }
  }

  if (issue.code === 'too_small' || issue.code === 'too_big') {
    const limit = issue.code === 'too_small' ? issue.minimum : issue.maximum

    const value =
      issue.origin === 'date'
        ? formatDate(limit, intl)
        : formatNumeric(limit, intl)

    return {
      key: issue.exact
        ? `${issue.origin}.exact`
        : `${issue.origin}.${issue.code}.${
            issue.inclusive ? 'inclusive' : 'exclusive'
          }`,
      values: {
        value,
      },
    }
  }

  return { key: 'default' }
}

/**
 * The intl.formatMessage function does not support bigint values to be passed as values. That's why we have to
 * handle these values and format them already here.
 */
function formatNumeric<T>(value: number | bigint, intl: IntlShape<T>) {
  return typeof value === 'bigint' ? intl.formatNumber(value) : value
}

function formatDate<T>(value: number | bigint, intl: IntlShape<T>) {
  const date = new Date(Number(value))

  if (isNaN(date.getTime())) {
    return '-'
  }

  const dateOptions: FormatDateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

  const timeOptions: FormatDateOptions | null =
    date.getHours() === 0 && date.getMinutes() === 0
      ? null
      : {
          hour: '2-digit',
          minute: '2-digit',
        }

  return intl.formatDate(date, {
    ...dateOptions,
    ...timeOptions,
  })
}
