import l10n from '../l10n/localization';

export default {
    name: {
        presence: {
            message: l10n.validation.required
        },
    },
    image: {
        url: {
            allowEmpty: true,
            message: l10n.validation.url
        }
    },
    startDate: {
        presence: {
            message: l10n.validation.required
        },
    },
    'venue._id': {
        presence: {
            message: l10n.validation.required
        },
    }
};
