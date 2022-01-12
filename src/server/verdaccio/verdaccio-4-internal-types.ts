// These types are defined but unfortunately not made available.
// https://github.com/verdaccio/verdaccio/blob/master/types/index.ts

import {
  IBasicAuth,
  // IBasicStorage,
  // IStorageManager,
  UpLinkConf,
  Callback,
  Versions,
  Version,
  RemoteUser,
  Config,
  Logger,
  JWTSignOptions,
  PackageAccess,
  IPluginStorage,
  StringValue as verdaccio$StringValue,
  IReadTarball,
  Package,
  IPluginStorageFilter,
  Author,
  AuthPluginPackage,
  Token,
  ITokenActions,
  TokenFilter,
} from "@verdaccio/types"
import { NextFunction, Request, Response } from "express"

export type StringValue = verdaccio$StringValue

export interface StartUpConfig {
  storage: string
  plugins?: string
  self_path: string
}

// legacy should be removed in long term

export interface LegacyPackageList {
  [key: string]: LegacyPackageAccess
}

export type LegacyPackageAccess = PackageAccess & {
  allow_publish?: string[]
  allow_proxy?: string[]
  allow_access?: string[]
  proxy_access?: string[]
  // FIXME: should be published on @verdaccio/types
  unpublish?: string[]
}

export type MatchedPackage = PackageAccess | void

export type JWTPayload = RemoteUser & {
  password?: string
}

export interface AESPayload {
  user: string
  password: string
}

export interface AuthTokenHeader {
  scheme: string
  token: string
}

export type BasicPayload = AESPayload | void
export type AuthMiddlewarePayload = RemoteUser | BasicPayload

export interface ProxyList {
  [key: string]: IProxy
}

export interface CookieSessionToken {
  expires: Date
}

export interface Utils {
  ErrorCode: any
  getLatestVersion: Callback
  isObject: (value: any) => boolean
  validate_name: (value: any) => boolean
  tag_version: (value: any, version: string, tag: string) => void
  normalizeDistTags: (pkg: Package) => void
  semverSort: (keys: string[]) => string[]
}

export interface Profile {
  tfa: boolean
  name: string
  email: string
  email_verified: string
  created: string
  updated: string
  cidr_whitelist: any
  fullname: string
}

export type $RequestExtend = Request & { remote_user?: any; log: Logger }
export type $ResponseExtend = Response & { cookies?: any }
export type $NextFunctionVer = NextFunction & any
export type $SidebarPackage = Package & { latest: any }

export interface IAuthWebUI {
  jwtEncrypt(user: RemoteUser, signOptions: JWTSignOptions): Promise<string>
  // aesEncrypt(buf: Buffer): Buffer
}

interface IAuthMiddleware {
  apiJWTmiddleware(): $NextFunctionVer
  webUIJWTmiddleware(): $NextFunctionVer
}

export interface IAuth extends IBasicAuth<Config>, IAuthMiddleware, IAuthWebUI {
  config: Config
  logger: Logger
  secret: string
  plugins: any[]
  allow_unpublish(
    pkg: AuthPluginPackage,
    user: RemoteUser,
    callback: Callback,
  ): void
}

// FIXME: This prop should be on @verdaccio/types
export type UpLinkConfLocal = UpLinkConf & {
  no_proxy?: string
}

export interface IProxy {
  config: UpLinkConfLocal
  failed_requests: number
  userAgent: string
  ca?: string | void
  logger: Logger
  server_id: string
  url: any
  maxage: number
  timeout: number
  max_fails: number
  fail_timeout: number
  upname: string
  fetchTarball(url: string): IReadTarball
  isUplinkValid(url: string): boolean
  search(options: any): any
  getRemoteMetadata(name: string, options: any, callback: Callback): void
}
