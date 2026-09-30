import vine from '@vinejs/vine';

export const processContactRequestValidator = vine.create({
    processed: vine.boolean(),
});
