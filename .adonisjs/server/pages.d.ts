import '@adonisjs/inertia/types'

import type { VNodeProps, AllowedComponentProps, ComponentInstance } from 'vue'

type ExtractProps<T> = Omit<
  ComponentInstance<T>['$props'],
  keyof VNodeProps | keyof AllowedComponentProps
>

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'about': ExtractProps<(typeof import('../../inertia/pages/about.vue'))['default']>
    'admin/contact_requests': ExtractProps<(typeof import('../../inertia/pages/admin/contact_requests.vue'))['default']>
    'admin/dashboard': ExtractProps<(typeof import('../../inertia/pages/admin/dashboard.vue'))['default']>
    'admin/pages/edit': ExtractProps<(typeof import('../../inertia/pages/admin/pages/edit.vue'))['default']>
    'admin/project_types': ExtractProps<(typeof import('../../inertia/pages/admin/project_types.vue'))['default']>
    'admin/services/form': ExtractProps<(typeof import('../../inertia/pages/admin/services/form.vue'))['default']>
    'admin/services/index': ExtractProps<(typeof import('../../inertia/pages/admin/services/index.vue'))['default']>
    'admin/settings': ExtractProps<(typeof import('../../inertia/pages/admin/settings.vue'))['default']>
    'auth/forgot_password': ExtractProps<(typeof import('../../inertia/pages/auth/forgot_password.vue'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.vue'))['default']>
    'contact': ExtractProps<(typeof import('../../inertia/pages/contact.vue'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.vue'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.vue'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.vue'))['default']>
    'legal': ExtractProps<(typeof import('../../inertia/pages/legal.vue'))['default']>
    'password_reset': ExtractProps<(typeof import('../../inertia/pages/password_reset.vue'))['default']>
    'privacy': ExtractProps<(typeof import('../../inertia/pages/privacy.vue'))['default']>
    'profile': ExtractProps<(typeof import('../../inertia/pages/profile.vue'))['default']>
    'rental_permit': ExtractProps<(typeof import('../../inertia/pages/rental_permit.vue'))['default']>
    'service_area': ExtractProps<(typeof import('../../inertia/pages/service_area.vue'))['default']>
    'services': ExtractProps<(typeof import('../../inertia/pages/services.vue'))['default']>
  }
}
