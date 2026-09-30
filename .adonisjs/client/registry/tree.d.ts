/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  services: typeof routes['services']
  rental: {
    permit: typeof routes['rental.permit']
  }
  service: {
    area: typeof routes['service.area'] & {
      municipalities: typeof routes['service.area.municipalities']
    }
  }
  about: typeof routes['about']
  contact: typeof routes['contact'] & {
    store: typeof routes['contact.store']
  }
  password: {
    reset: {
      show: typeof routes['password.reset.show']
      update: typeof routes['password.reset.update']
    }
  }
  profile: {
    show: typeof routes['profile.show']
    export: typeof routes['profile.export']
    update: typeof routes['profile.update']
    passwordReset: typeof routes['profile.passwordReset']
    destroy: typeof routes['profile.destroy']
  }
  login: typeof routes['login']
  auth: {
    login: {
      store: typeof routes['auth.login.store']
    }
    logout: typeof routes['auth.logout']
  }
  forgot: {
    password: typeof routes['forgot.password'] & {
      store: typeof routes['forgot.password.store']
    }
  }
  admin: {
    dashboard: typeof routes['admin.dashboard']
    pages: {
      edit: typeof routes['admin.pages.edit']
      update: typeof routes['admin.pages.update']
    }
    services: {
      index: typeof routes['admin.services.index']
      create: typeof routes['admin.services.create']
      store: typeof routes['admin.services.store']
      edit: typeof routes['admin.services.edit']
      update: typeof routes['admin.services.update']
      destroy: typeof routes['admin.services.destroy']
      move: typeof routes['admin.services.move']
    }
    contactRequests: {
      index: typeof routes['admin.contactRequests.index']
      process: typeof routes['admin.contactRequests.process']
      destroy: typeof routes['admin.contactRequests.destroy']
    }
    projectTypes: {
      index: typeof routes['admin.projectTypes.index']
      store: typeof routes['admin.projectTypes.store']
      update: typeof routes['admin.projectTypes.update']
      destroy: typeof routes['admin.projectTypes.destroy']
      move: typeof routes['admin.projectTypes.move']
    }
    settings: {
      edit: typeof routes['admin.settings.edit']
      update: typeof routes['admin.settings.update']
    }
  }
  legal: {
    show: typeof routes['legal.show']
  }
  privacy: {
    show: typeof routes['privacy.show']
  }
}
