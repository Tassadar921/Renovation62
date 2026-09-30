/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['home']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['home']>>>
    }
  }
  'services': {
    methods: ["GET","HEAD"]
    pattern: '/prestations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['services']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['services']>>>
    }
  }
  'rental.permit': {
    methods: ["GET","HEAD"]
    pattern: '/permis-de-louer'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['rentalPermit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['rentalPermit']>>>
    }
  }
  'service.area': {
    methods: ["GET","HEAD"]
    pattern: '/zone-intervention'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['serviceArea']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['serviceArea']>>>
    }
  }
  'service.area.municipalities': {
    methods: ["GET","HEAD"]
    pattern: '/zone-intervention/communes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/service_area').municipalitySearchValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/service_area_controller').default['searchMunicipalities']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/service_area_controller').default['searchMunicipalities']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'about': {
    methods: ["GET","HEAD"]
    pattern: '/a-propos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['about']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['about']>>>
    }
  }
  'contact': {
    methods: ["GET","HEAD"]
    pattern: '/contact'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['contact']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pages_controller').default['contact']>>>
    }
  }
  'contact.store': {
    methods: ["POST"]
    pattern: '/contact'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/contact').contactValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/contact').contactValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/contact_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/contact_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'password.reset.show': {
    methods: ["GET","HEAD"]
    pattern: '/password-reset'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/token').tokenValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/password_reset_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/password_reset_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'password.reset.update': {
    methods: ["POST"]
    pattern: '/password-reset'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/token').tokenValidator)>|InferInput<(typeof import('#validators/password_reset').resetPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/token').tokenValidator)>|InferInput<(typeof import('#validators/password_reset').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/password_reset_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/password_reset_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.export': {
    methods: ["GET","HEAD"]
    pattern: '/profile/export'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['exportData']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['exportData']>>>
    }
  }
  'profile.update': {
    methods: ["PUT"]
    pattern: '/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/profile').updateProfileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/profile').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.passwordReset': {
    methods: ["POST"]
    pattern: '/profile/password-reset'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['sendPasswordReset']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['sendPasswordReset']>>>
    }
  }
  'profile.destroy': {
    methods: ["DELETE"]
    pattern: '/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['destroy']>>>
    }
  }
  'login': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'auth.login.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'forgot.password': {
    methods: ["GET","HEAD"]
    pattern: '/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/forgot_password_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/forgot_password_controller').default['show']>>>
    }
  }
  'forgot.password.store': {
    methods: ["POST"]
    pattern: '/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/forgot_password_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/forgot_password_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["DELETE"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'admin.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/dashboard_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/dashboard_controller').default['index']>>>
    }
  }
  'admin.pages.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/pages_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/pages_controller').default['edit']>>>
    }
  }
  'admin.pages.update': {
    methods: ["POST"]
    pattern: '/admin/pages/:slug'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/pages').updatePageValidator)>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/pages').updatePageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/pages_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/pages_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.services.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/services'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['index']>>>
    }
  }
  'admin.services.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/services/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['create']>>>
    }
  }
  'admin.services.store': {
    methods: ["POST"]
    pattern: '/admin/services'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/services').serviceValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/services').serviceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.services.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/services/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['edit']>>>
    }
  }
  'admin.services.update': {
    methods: ["PUT"]
    pattern: '/admin/services/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/services').serviceValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/services').serviceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.services.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/services/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['destroy']>>>
    }
  }
  'admin.services.move': {
    methods: ["POST"]
    pattern: '/admin/services/:id/move'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/services').moveServiceValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/services').moveServiceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['move']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/services_controller').default['move']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.contactRequests.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/contact-requests'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/contact_requests_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/contact_requests_controller').default['index']>>>
    }
  }
  'admin.contactRequests.process': {
    methods: ["PATCH"]
    pattern: '/admin/contact-requests/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/contact_requests').processContactRequestValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/contact_requests').processContactRequestValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/contact_requests_controller').default['process']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/contact_requests_controller').default['process']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.contactRequests.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/contact-requests/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/contact_requests_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/contact_requests_controller').default['destroy']>>>
    }
  }
  'admin.projectTypes.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/project-types'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['index']>>>
    }
  }
  'admin.projectTypes.store': {
    methods: ["POST"]
    pattern: '/admin/project-types'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/project_types').projectTypeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/project_types').projectTypeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.projectTypes.update': {
    methods: ["PUT"]
    pattern: '/admin/project-types/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/project_types').projectTypeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/project_types').projectTypeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.projectTypes.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/project-types/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['destroy']>>>
    }
  }
  'admin.projectTypes.move': {
    methods: ["POST"]
    pattern: '/admin/project-types/:id/move'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/project_types').moveProjectTypeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/project_types').moveProjectTypeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['move']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/project_types_controller').default['move']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.settings.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/settings_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/settings_controller').default['edit']>>>
    }
  }
  'admin.settings.update': {
    methods: ["PUT"]
    pattern: '/admin/settings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin/settings').updateSettingsValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin/settings').updateSettingsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin/settings_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/admin/settings_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'legal.show': {
    methods: ["GET","HEAD"]
    pattern: '/mentions-legales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'privacy.show': {
    methods: ["GET","HEAD"]
    pattern: '/politique-de-confidentialite'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
