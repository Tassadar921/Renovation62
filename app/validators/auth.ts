import vine from '@vinejs/vine';

export const loginValidator = vine.create({
    email: vine.string().trim().email().maxLength(100),
    password: vine.string().trim(),
});

export const forgotPasswordValidator = vine.create({
    email: vine.string().trim().email().maxLength(100),
});
