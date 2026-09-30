/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'services': {
    methods: ["GET","HEAD"],
    pattern: '/prestations',
    tokens: [{"old":"/prestations","type":0,"val":"prestations","end":""}],
    types: placeholder as Registry['services']['types'],
  },
  'rental.permit': {
    methods: ["GET","HEAD"],
    pattern: '/permis-de-louer',
    tokens: [{"old":"/permis-de-louer","type":0,"val":"permis-de-louer","end":""}],
    types: placeholder as Registry['rental.permit']['types'],
  },
  'service.area': {
    methods: ["GET","HEAD"],
    pattern: '/zone-intervention',
    tokens: [{"old":"/zone-intervention","type":0,"val":"zone-intervention","end":""}],
    types: placeholder as Registry['service.area']['types'],
  },
  'service.area.municipalities': {
    methods: ["GET","HEAD"],
    pattern: '/zone-intervention/communes',
    tokens: [{"old":"/zone-intervention/communes","type":0,"val":"zone-intervention","end":""},{"old":"/zone-intervention/communes","type":0,"val":"communes","end":""}],
    types: placeholder as Registry['service.area.municipalities']['types'],
  },
  'about': {
    methods: ["GET","HEAD"],
    pattern: '/a-propos',
    tokens: [{"old":"/a-propos","type":0,"val":"a-propos","end":""}],
    types: placeholder as Registry['about']['types'],
  },
  'contact': {
    methods: ["GET","HEAD"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['contact']['types'],
  },
  'contact.store': {
    methods: ["POST"],
    pattern: '/contact',
    tokens: [{"old":"/contact","type":0,"val":"contact","end":""}],
    types: placeholder as Registry['contact.store']['types'],
  },
  'password.reset.show': {
    methods: ["GET","HEAD"],
    pattern: '/password-reset',
    tokens: [{"old":"/password-reset","type":0,"val":"password-reset","end":""}],
    types: placeholder as Registry['password.reset.show']['types'],
  },
  'password.reset.update': {
    methods: ["POST"],
    pattern: '/password-reset',
    tokens: [{"old":"/password-reset","type":0,"val":"password-reset","end":""}],
    types: placeholder as Registry['password.reset.update']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'profile.export': {
    methods: ["GET","HEAD"],
    pattern: '/profile/export',
    tokens: [{"old":"/profile/export","type":0,"val":"profile","end":""},{"old":"/profile/export","type":0,"val":"export","end":""}],
    types: placeholder as Registry['profile.export']['types'],
  },
  'profile.update': {
    methods: ["PUT"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.update']['types'],
  },
  'profile.passwordReset': {
    methods: ["POST"],
    pattern: '/profile/password-reset',
    tokens: [{"old":"/profile/password-reset","type":0,"val":"profile","end":""},{"old":"/profile/password-reset","type":0,"val":"password-reset","end":""}],
    types: placeholder as Registry['profile.passwordReset']['types'],
  },
  'profile.destroy': {
    methods: ["DELETE"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.destroy']['types'],
  },
  'login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login']['types'],
  },
  'auth.login.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login.store']['types'],
  },
  'forgot.password': {
    methods: ["GET","HEAD"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['forgot.password']['types'],
  },
  'forgot.password.store': {
    methods: ["POST"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['forgot.password.store']['types'],
  },
  'auth.logout': {
    methods: ["DELETE"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'admin.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/admin',
    tokens: [{"old":"/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['admin.dashboard']['types'],
  },
  'admin.pages.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/pages/:slug',
    tokens: [{"old":"/admin/pages/:slug","type":0,"val":"admin","end":""},{"old":"/admin/pages/:slug","type":0,"val":"pages","end":""},{"old":"/admin/pages/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['admin.pages.edit']['types'],
  },
  'admin.pages.update': {
    methods: ["POST"],
    pattern: '/admin/pages/:slug',
    tokens: [{"old":"/admin/pages/:slug","type":0,"val":"admin","end":""},{"old":"/admin/pages/:slug","type":0,"val":"pages","end":""},{"old":"/admin/pages/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['admin.pages.update']['types'],
  },
  'admin.services.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/services',
    tokens: [{"old":"/admin/services","type":0,"val":"admin","end":""},{"old":"/admin/services","type":0,"val":"services","end":""}],
    types: placeholder as Registry['admin.services.index']['types'],
  },
  'admin.services.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/services/create',
    tokens: [{"old":"/admin/services/create","type":0,"val":"admin","end":""},{"old":"/admin/services/create","type":0,"val":"services","end":""},{"old":"/admin/services/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.services.create']['types'],
  },
  'admin.services.store': {
    methods: ["POST"],
    pattern: '/admin/services',
    tokens: [{"old":"/admin/services","type":0,"val":"admin","end":""},{"old":"/admin/services","type":0,"val":"services","end":""}],
    types: placeholder as Registry['admin.services.store']['types'],
  },
  'admin.services.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/services/:id/edit',
    tokens: [{"old":"/admin/services/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/services/:id/edit","type":0,"val":"services","end":""},{"old":"/admin/services/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/services/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.services.edit']['types'],
  },
  'admin.services.update': {
    methods: ["PUT"],
    pattern: '/admin/services/:id',
    tokens: [{"old":"/admin/services/:id","type":0,"val":"admin","end":""},{"old":"/admin/services/:id","type":0,"val":"services","end":""},{"old":"/admin/services/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.services.update']['types'],
  },
  'admin.services.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/services/:id',
    tokens: [{"old":"/admin/services/:id","type":0,"val":"admin","end":""},{"old":"/admin/services/:id","type":0,"val":"services","end":""},{"old":"/admin/services/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.services.destroy']['types'],
  },
  'admin.services.move': {
    methods: ["POST"],
    pattern: '/admin/services/:id/move',
    tokens: [{"old":"/admin/services/:id/move","type":0,"val":"admin","end":""},{"old":"/admin/services/:id/move","type":0,"val":"services","end":""},{"old":"/admin/services/:id/move","type":1,"val":"id","end":""},{"old":"/admin/services/:id/move","type":0,"val":"move","end":""}],
    types: placeholder as Registry['admin.services.move']['types'],
  },
  'admin.contactRequests.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/contact-requests',
    tokens: [{"old":"/admin/contact-requests","type":0,"val":"admin","end":""},{"old":"/admin/contact-requests","type":0,"val":"contact-requests","end":""}],
    types: placeholder as Registry['admin.contactRequests.index']['types'],
  },
  'admin.contactRequests.process': {
    methods: ["PATCH"],
    pattern: '/admin/contact-requests/:id',
    tokens: [{"old":"/admin/contact-requests/:id","type":0,"val":"admin","end":""},{"old":"/admin/contact-requests/:id","type":0,"val":"contact-requests","end":""},{"old":"/admin/contact-requests/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.contactRequests.process']['types'],
  },
  'admin.contactRequests.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/contact-requests/:id',
    tokens: [{"old":"/admin/contact-requests/:id","type":0,"val":"admin","end":""},{"old":"/admin/contact-requests/:id","type":0,"val":"contact-requests","end":""},{"old":"/admin/contact-requests/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.contactRequests.destroy']['types'],
  },
  'admin.projectTypes.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/project-types',
    tokens: [{"old":"/admin/project-types","type":0,"val":"admin","end":""},{"old":"/admin/project-types","type":0,"val":"project-types","end":""}],
    types: placeholder as Registry['admin.projectTypes.index']['types'],
  },
  'admin.projectTypes.store': {
    methods: ["POST"],
    pattern: '/admin/project-types',
    tokens: [{"old":"/admin/project-types","type":0,"val":"admin","end":""},{"old":"/admin/project-types","type":0,"val":"project-types","end":""}],
    types: placeholder as Registry['admin.projectTypes.store']['types'],
  },
  'admin.projectTypes.update': {
    methods: ["PUT"],
    pattern: '/admin/project-types/:id',
    tokens: [{"old":"/admin/project-types/:id","type":0,"val":"admin","end":""},{"old":"/admin/project-types/:id","type":0,"val":"project-types","end":""},{"old":"/admin/project-types/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.projectTypes.update']['types'],
  },
  'admin.projectTypes.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/project-types/:id',
    tokens: [{"old":"/admin/project-types/:id","type":0,"val":"admin","end":""},{"old":"/admin/project-types/:id","type":0,"val":"project-types","end":""},{"old":"/admin/project-types/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.projectTypes.destroy']['types'],
  },
  'admin.projectTypes.move': {
    methods: ["POST"],
    pattern: '/admin/project-types/:id/move',
    tokens: [{"old":"/admin/project-types/:id/move","type":0,"val":"admin","end":""},{"old":"/admin/project-types/:id/move","type":0,"val":"project-types","end":""},{"old":"/admin/project-types/:id/move","type":1,"val":"id","end":""},{"old":"/admin/project-types/:id/move","type":0,"val":"move","end":""}],
    types: placeholder as Registry['admin.projectTypes.move']['types'],
  },
  'admin.settings.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/settings',
    tokens: [{"old":"/admin/settings","type":0,"val":"admin","end":""},{"old":"/admin/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['admin.settings.edit']['types'],
  },
  'admin.settings.update': {
    methods: ["PUT"],
    pattern: '/admin/settings',
    tokens: [{"old":"/admin/settings","type":0,"val":"admin","end":""},{"old":"/admin/settings","type":0,"val":"settings","end":""}],
    types: placeholder as Registry['admin.settings.update']['types'],
  },
  'legal.show': {
    methods: ["GET","HEAD"],
    pattern: '/mentions-legales',
    tokens: [{"old":"/mentions-legales","type":0,"val":"mentions-legales","end":""}],
    types: placeholder as Registry['legal.show']['types'],
  },
  'privacy.show': {
    methods: ["GET","HEAD"],
    pattern: '/politique-de-confidentialite',
    tokens: [{"old":"/politique-de-confidentialite","type":0,"val":"politique-de-confidentialite","end":""}],
    types: placeholder as Registry['privacy.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
