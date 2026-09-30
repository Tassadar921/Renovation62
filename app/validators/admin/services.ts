import vine from '@vinejs/vine';
import ServiceIconEnum from '#types/enum/service_icon_enum';

export const serviceValidator = vine.create({
    title: vine.string().trim().minLength(1).maxLength(60),
    icon: vine.enum(Object.values(ServiceIconEnum)),
    summary: vine.string().trim().minLength(1).maxLength(160),
    description: vine.string().trim().minLength(1).maxLength(2000),
    features: vine.string().trim().maxLength(1000).optional(),
});

export const moveServiceValidator = vine.create({
    direction: vine.enum(['up', 'down']),
});
