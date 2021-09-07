"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var tslib_1 = require("tslib");
var ShopifyErrors = tslib_1.__importStar(require("./error"));
var memory_1 = require("./auth/session/storage/memory");
var base_types_1 = require("./base_types");
var scopes_1 = require("./auth/scopes");
var Context = {
    API_KEY: '',
    API_SECRET_KEY: '',
    SCOPES: new scopes_1.AuthScopes([]),
    HOST_NAME: '',
    API_VERSION: base_types_1.ApiVersion.Unstable,
    IS_EMBEDDED_APP: true,
    IS_PRIVATE_APP: false,
    SESSION_STORAGE: new memory_1.MemorySessionStorage(),
    WEBHOOKS_REGISTRY: {},
    initialize: function (params) {
        var scopes;
        if (params.SCOPES instanceof scopes_1.AuthScopes) {
            scopes = params.SCOPES;
        }
        else {
            scopes = new scopes_1.AuthScopes(params.SCOPES || '');
        }
        // Make sure that the essential params actually have content in them
        var missing = [];
        if (!params.API_KEY) {
            missing.push('API_KEY');
        }
        if (!params.API_SECRET_KEY) {
            missing.push('API_SECRET_KEY');
        }
        if (!scopes.toArray().length) {
            missing.push('SCOPES');
        }
        if (!params.HOST_NAME) {
            missing.push('HOST_NAME');
        }
        if (!params.API_VERSION) {
            missing.push('API_VERSION');
        }
        if (!Object.prototype.hasOwnProperty.call(params, 'IS_EMBEDDED_APP')) {
            missing.push('IS_EMBEDDED_APP');
        }
        if (missing.length) {
            throw new ShopifyErrors.ShopifyError("Cannot initialize Shopify API Library. Missing values for: " + missing.join(', '));
        }
        this.API_KEY = params.API_KEY;
        this.API_SECRET_KEY = params.API_SECRET_KEY;
        this.SCOPES = scopes;
        this.HOST_NAME = params.HOST_NAME;
        this.API_VERSION = params.API_VERSION;
        this.IS_EMBEDDED_APP = params.IS_EMBEDDED_APP;
        if (Object.prototype.hasOwnProperty.call(params, 'IS_PRIVATE_APP')) {
            this.IS_PRIVATE_APP = params.IS_PRIVATE_APP;
        }
        else {
            this.IS_PRIVATE_APP = false;
        }
        if (params.SESSION_STORAGE) {
            this.SESSION_STORAGE = params.SESSION_STORAGE;
        }
        else {
            this.SESSION_STORAGE = new memory_1.MemorySessionStorage();
        }
        if (params.WEBHOOKS_REGISTRY) {
            this.WEBHOOKS_REGISTRY = params.WEBHOOKS_REGISTRY;
        }
        else {
            this.WEBHOOKS_REGISTRY = {};
        }
        if (params.LOG_FILE) {
            this.LOG_FILE = params.LOG_FILE;
        }
        else {
            delete this.LOG_FILE;
        }
        if (params.USER_AGENT_PREFIX) {
            this.USER_AGENT_PREFIX = params.USER_AGENT_PREFIX;
        }
        else {
            delete this.USER_AGENT_PREFIX;
        }
        if (params.PRIVATE_APP_STOREFRONT_ACCESS_TOKEN) {
            this.PRIVATE_APP_STOREFRONT_ACCESS_TOKEN = params.PRIVATE_APP_STOREFRONT_ACCESS_TOKEN;
        }
        else {
            delete this.PRIVATE_APP_STOREFRONT_ACCESS_TOKEN;
        }
    },
    throwIfUninitialized: function () {
        if (!this.API_KEY || this.API_KEY.length === 0) {
            throw new ShopifyErrors.UninitializedContextError('Context has not been properly initialized. Please call the .initialize() method to setup your app context object.');
        }
    },
    throwIfPrivateApp: function (message) {
        if (Context.IS_PRIVATE_APP) {
            throw new ShopifyErrors.PrivateAppError(message);
        }
    },
};
exports.Context = Context;
