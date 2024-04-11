export const phoneNumberRegex = /(\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})/g;

export function formatPhoneNumber(phoneNumber: string) {
    if (phoneNumber === '+' || phoneNumber === '+7') {
        return phoneNumber;
    }
    const numericPhoneNumber = phoneNumber.replace(/^(\+7|8)/g, '').replace(/\D/g, '');

    const formattedPhoneNumber = numericPhoneNumber.replace(
        /^(\d{1,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?/,
        (_, p1, p2, p3, p4) => {
            let formatted = '';
            if (p1) {
                formatted += `+7 (${p1}`;
            }
            if (p2) {
                formatted += `) ${p2}`;
            }
            if (p3) {
                formatted += `-${p3}`;
            }
            if (p4) {
                formatted += `-${p4}`;
            }
            return formatted;
        },
    );

    return formattedPhoneNumber;
}
