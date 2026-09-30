/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| Validation messages are translated in resources/lang/fr/validator.json
| (see LanguageMiddleware).
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon';
import { VineDate } from '@vinejs/vine';

declare module '@vinejs/vine/types' {
    interface VineGlobalTransforms {
        date: DateTime;
    }
}

VineDate.transform((value) => DateTime.fromJSDate(value));
