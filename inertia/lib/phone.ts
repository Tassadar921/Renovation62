// Same rule as PHONE_REGEX in app/validators/contact.ts
const FRENCH_PHONE_REGEX = /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

export const isValidFrenchPhone = (phone: string): boolean => FRENCH_PHONE_REGEX.test(phone.trim());

export const phoneHref = (phone: string): string => `tel:${phone.replace(/[^0-9+]/g, '')}`;

/**
 * Formats French numbers for display: "0780488199" -> "07 80 48 81 99",
 * "+33780488199" -> "+33 7 80 48 81 99". Other numbers are returned as entered.
 */
export const formatPhone = (phone: string): string => {
    const compact = phone.replace(/[^0-9+]/g, '');
    const pairs = (digits: string): string => digits.match(/.{1,2}/g)!.join(' ');

    if (/^0\d{9}$/.test(compact)) return pairs(compact);
    if (/^\+33\d{9}$/.test(compact)) return `+33 ${compact[3]} ${pairs(compact.slice(4))}`;
    if (/^0033\d{9}$/.test(compact)) return `+33 ${compact[4]} ${pairs(compact.slice(5))}`;

    return phone.trim();
};
