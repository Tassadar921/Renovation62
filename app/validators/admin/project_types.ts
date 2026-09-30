import vine from '@vinejs/vine';

export const projectTypeValidator = vine.create({
    label: vine.string().trim().minLength(1).maxLength(80),
});

export const moveProjectTypeValidator = vine.create({
    direction: vine.enum(['up', 'down']),
});
