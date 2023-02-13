import { IntlShape } from '@formatjs/intl'
import { z } from 'zod'
import { errorMessages } from './errorMessages'

// Docs https://zod.dev/ERROR_HANDLING?id=error-map-priority
export function makeZodErrorMap<T>(
  issue: z.ZodIssueOptionalMessage,
  intl: IntlShape<T>
) {
  const descriptorItem = getDescriptorItem(issue)

  return descriptorItem.key in errorMessages
    ? {
        message: intl.formatMessage(
          errorMessages[descriptorItem.key as keyof typeof errorMessages],
          descriptorItem.values
        ),
      }
    : { message: intl.formatMessage(errorMessages['default']) }
}

export function getDescriptorItem(issue: z.ZodIssueOptionalMessage): {
  key: string
  values?: Record<string, string | number>
} {
  if (issue.code === z.ZodIssueCode.invalid_string) {
    return {
      key: `string.invalid.${issue.validation}`,
    }
  }

  if (issue.code === z.ZodIssueCode.not_multiple_of) {
    return {
      key: `number.${issue.code}`,
    }
  }

  if (issue.code === z.ZodIssueCode.invalid_date) {
    return { key: `date.${issue.code}` }
  }

  if (
    issue.code === z.ZodIssueCode.too_small ||
    issue.code === z.ZodIssueCode.too_big
  ) {
    if (issue.exact) {
      return {
        key: `${issue.type}.exact`,
        values: {
          value:
            issue.code === z.ZodIssueCode.too_small
              ? issue.minimum
              : issue.code === z.ZodIssueCode.too_big
              ? issue.maximum
              : '?',
        },
      }
    }

    if (
      issue.code === z.ZodIssueCode.too_small &&
      issue.type === 'string' &&
      issue.minimum === 1
    ) {
      return { key: 'string.required' }
    }

    return {
      key: `${issue.type}.${issue.code}.${
        issue.inclusive ? 'inclusive' : 'exclusive'
      }`,
      values: {
        value:
          issue.code === z.ZodIssueCode.too_small
            ? issue.minimum
            : issue.code === z.ZodIssueCode.too_big
            ? issue.maximum
            : '?',
      },
    }
  }

  return { key: 'default' }
}
