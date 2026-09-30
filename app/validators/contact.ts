import vine from '@vinejs/vine';

/**
 * French phone numbers: 0X XX XX XX XX, +33 X XX XX XX XX or 0033…, with optional spaces, dots or dashes.
 */
export const PHONE_REGEX = /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export const contactValidator = vine.create({
    name: vine.string().trim().minLength(2).maxLength(100),
    phone: vine.string().trim().regex(PHONE_REGEX),
    email: vine.string().trim().maxLength(255).email(),
    postalCode: vine
        .string()
        .trim()
        .regex(/^\d{5}$/),
    projectType: vine.string().uuid(),
});
