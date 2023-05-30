import type { App } from 'vue'
import {
    Form as VeeForm,
    Field as VeeField,
    defineRule,
    ErrorMessage,
    configure
} from 'vee-validate'
import {
    required,
    email,
    min,
    max,
    min_value as minValue,
    max_value as maxValue,
    alpha_spaces as alphaSpaces,
    confirmed,
    not_one_of as excluded
} from '@vee-validate/rules'

export default {
    install(app: App) {
        app.component('VeeForm', VeeForm)
        app.component('VeeField', VeeField)
        app.component('ErrorMessage', ErrorMessage)

        defineRule('required', required)
        defineRule('tos', required)
        defineRule('email', email)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('min_value', minValue)
        defineRule('max_value', maxValue)
        defineRule('alpha_spaces', alphaSpaces)
        defineRule('password_mismatch', confirmed)
        defineRule('excluded', excluded)
        defineRule('country_excluded', excluded)

        configure({
            generateMessage: (context): string => {
                const messages = {
                    required: `The field ${context.field} is required.`,
                    min: `The field ${context.field} is too short.`,
                    max: `The field ${context.field} is too long.`,
                    alpha_spaces: `The field ${context.field} may only contain alphabetical characters and spaces.`,
                    email: `The field ${context.field} must be a valid email.`,
                    min_value: `The field ${context.field} is too low.`,
                    max_value: `The field ${context.field} is too high.`,
                    excluded: `You are not allow to use this value for the field ${context.field}`,
                    country_excluded: `Due to restriccions, we do not accept users from this location.`,
                    password_mismatch: "The passwords don't match.",
                    tos: 'You must accept The Terms of Service.'
                }

                const message: string = messages[context.rule.name]
                    ? messages[context.rule.name]
                    : `The field ${context.field} is invalid.`

                return message
            }
        })
    }
}
