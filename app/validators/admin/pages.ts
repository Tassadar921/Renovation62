import vine from '@vinejs/vine';

export const updatePageValidator = vine.create({
    title: vine.string().trim().minLength(1).maxLength(70),
    description: vine.string().trim().minLength(1).maxLength(320),
    body: vine.string().trim().maxLength(3000).optional().nullable(),
    image: vine.file({ size: '5mb', extnames: ['jpg', 'jpeg', 'png', 'webp'] }).optional(),
    removeImage: vine.boolean().optional(),
});
