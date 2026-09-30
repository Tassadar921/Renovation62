import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'services': { paramsTuple?: []; params?: {} }
    'rental.permit': { paramsTuple?: []; params?: {} }
    'service.area': { paramsTuple?: []; params?: {} }
    'service.area.municipalities': { paramsTuple?: []; params?: {} }
    'about': { paramsTuple?: []; params?: {} }
    'contact': { paramsTuple?: []; params?: {} }
    'contact.store': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple?: []; params?: {} }
    'password.reset.update': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.export': { paramsTuple?: []; params?: {} }
    'profile.update': { paramsTuple?: []; params?: {} }
    'profile.passwordReset': { paramsTuple?: []; params?: {} }
    'profile.destroy': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'auth.login.store': { paramsTuple?: []; params?: {} }
    'forgot.password': { paramsTuple?: []; params?: {} }
    'forgot.password.store': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.pages.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.pages.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.services.index': { paramsTuple?: []; params?: {} }
    'admin.services.create': { paramsTuple?: []; params?: {} }
    'admin.services.store': { paramsTuple?: []; params?: {} }
    'admin.services.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.services.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.services.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.services.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contactRequests.index': { paramsTuple?: []; params?: {} }
    'admin.contactRequests.process': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contactRequests.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projectTypes.index': { paramsTuple?: []; params?: {} }
    'admin.projectTypes.store': { paramsTuple?: []; params?: {} }
    'admin.projectTypes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projectTypes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projectTypes.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.edit': { paramsTuple?: []; params?: {} }
    'admin.settings.update': { paramsTuple?: []; params?: {} }
    'legal.show': { paramsTuple?: []; params?: {} }
    'privacy.show': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'services': { paramsTuple?: []; params?: {} }
    'rental.permit': { paramsTuple?: []; params?: {} }
    'service.area': { paramsTuple?: []; params?: {} }
    'service.area.municipalities': { paramsTuple?: []; params?: {} }
    'about': { paramsTuple?: []; params?: {} }
    'contact': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.export': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'forgot.password': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.pages.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.services.index': { paramsTuple?: []; params?: {} }
    'admin.services.create': { paramsTuple?: []; params?: {} }
    'admin.services.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contactRequests.index': { paramsTuple?: []; params?: {} }
    'admin.projectTypes.index': { paramsTuple?: []; params?: {} }
    'admin.settings.edit': { paramsTuple?: []; params?: {} }
    'legal.show': { paramsTuple?: []; params?: {} }
    'privacy.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'services': { paramsTuple?: []; params?: {} }
    'rental.permit': { paramsTuple?: []; params?: {} }
    'service.area': { paramsTuple?: []; params?: {} }
    'service.area.municipalities': { paramsTuple?: []; params?: {} }
    'about': { paramsTuple?: []; params?: {} }
    'contact': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'profile.export': { paramsTuple?: []; params?: {} }
    'login': { paramsTuple?: []; params?: {} }
    'forgot.password': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.pages.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.services.index': { paramsTuple?: []; params?: {} }
    'admin.services.create': { paramsTuple?: []; params?: {} }
    'admin.services.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contactRequests.index': { paramsTuple?: []; params?: {} }
    'admin.projectTypes.index': { paramsTuple?: []; params?: {} }
    'admin.settings.edit': { paramsTuple?: []; params?: {} }
    'legal.show': { paramsTuple?: []; params?: {} }
    'privacy.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'contact.store': { paramsTuple?: []; params?: {} }
    'password.reset.update': { paramsTuple?: []; params?: {} }
    'profile.passwordReset': { paramsTuple?: []; params?: {} }
    'auth.login.store': { paramsTuple?: []; params?: {} }
    'forgot.password.store': { paramsTuple?: []; params?: {} }
    'admin.pages.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'admin.services.store': { paramsTuple?: []; params?: {} }
    'admin.services.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projectTypes.store': { paramsTuple?: []; params?: {} }
    'admin.projectTypes.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'profile.update': { paramsTuple?: []; params?: {} }
    'admin.services.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projectTypes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.settings.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'profile.destroy': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'admin.services.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.contactRequests.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.projectTypes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'admin.contactRequests.process': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}