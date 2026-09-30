import vine from '@vinejs/vine';

export const updateSettingsValidator = vine.create({
    phone: vine
        .string()
        .trim()
        .maxLength(20)
        .regex(/^\+?[0-9 .()-]{6,20}$/)
        .optional()
        .nullable(),
    email: vine.string().trim().maxLength(255).email().optional().nullable(),
    facebook: vine
        .string()
        .trim()
        .maxLength(255)
        .url({ require_protocol: true, protocols: ['https'] })
        .regex(/^https:\/\/(www\.|m\.|web\.)?(facebook\.com|fb\.com)\/.+/)
        .optional()
        .nullable(),
});
