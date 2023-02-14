globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { withoutBase, parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false}}},"public":{"kontent":{"baseDeliveryApiUrl":"","projectId":""}},"kontent":{"baseDeliveryApiUrl":"https://deliver.kontent.ai","projectId":"b1df6711-4e2a-023d-c7ae-c75d64d8321a"}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.node.req.url?.endsWith(".json") || event.node.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: statusCode !== 404 ? `<pre>${stack.map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n")}</pre>` : "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-dev.mjs') ;
    {
      errorObject.description = errorObject.message;
    }
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-02-03T13:45:14.000Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/marker-icon.png": {
    "type": "image/png",
    "etag": "\"5ba-YKkLy7K0K33bRVbblOt8EISw5do\"",
    "mtime": "2023-02-14T03:34:50.590Z",
    "size": 1466,
    "path": "../public/marker-icon.png"
  },
  "/marker-shadow.png": {
    "type": "image/png",
    "etag": "\"26a-e2qN9jkwOB6WYE5wUWjQUn1rgrw\"",
    "mtime": "2023-02-14T03:34:37.299Z",
    "size": 618,
    "path": "../public/marker-shadow.png"
  },
  "/js/bootstrap.bundle.min.js": {
    "type": "application/javascript",
    "etag": "\"13bb5-zUKjci8NkL/tAMsum+NysHqoVi8\"",
    "mtime": "2020-12-30T04:13:26.000Z",
    "size": 80821,
    "path": "../public/js/bootstrap.bundle.min.js"
  },
  "/js/custom.js": {
    "type": "application/javascript",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2020-10-28T11:48:00.000Z",
    "size": 0,
    "path": "../public/js/custom.js"
  },
  "/js/jquery-1.11.0.min.js": {
    "type": "application/javascript",
    "etag": "\"1787d-tm7XCHF78LSgBaTQETr4hD7zuP8\"",
    "mtime": "2021-01-03T13:33:34.000Z",
    "size": 96381,
    "path": "../public/js/jquery-1.11.0.min.js"
  },
  "/js/jquery-migrate-1.2.1.min.js": {
    "type": "application/javascript",
    "etag": "\"1c1f-dDBSMggJUU+3iP4dPfN/yHzpBFI\"",
    "mtime": "2021-01-03T13:33:38.000Z",
    "size": 7199,
    "path": "../public/js/jquery-migrate-1.2.1.min.js"
  },
  "/js/slick.min.js": {
    "type": "application/javascript",
    "etag": "\"a76f-O0GzvJVmhQFaNHoiOOcdsp36Dbs\"",
    "mtime": "2021-01-03T08:38:24.000Z",
    "size": 42863,
    "path": "../public/js/slick.min.js"
  },
  "/js/templatemo.js": {
    "type": "application/javascript",
    "etag": "\"616-AkFdX+XqoyiAFNyWZ2EI8oLC2PM\"",
    "mtime": "2021-01-09T16:03:05.883Z",
    "size": 1558,
    "path": "../public/js/templatemo.js"
  },
  "/js/templatemo.min.js": {
    "type": "application/javascript",
    "etag": "\"396-opiR+wJCJQMd/yq7ao8uss/Zrs0\"",
    "mtime": "2021-01-04T14:56:44.000Z",
    "size": 918,
    "path": "../public/js/templatemo.min.js"
  },
  "/_nuxt/about-us.a145f0ae.js": {
    "type": "application/javascript",
    "etag": "\"357-Gq5IFLx8aSDegagEQIg/FfbX4ZU\"",
    "mtime": "2023-02-14T06:54:52.029Z",
    "size": 855,
    "path": "../public/_nuxt/about-us.a145f0ae.js"
  },
  "/_nuxt/composables.2a4317bc.js": {
    "type": "application/javascript",
    "etag": "\"61-HOiX9Bp/PSCbUGzbDmUtNGCybXQ\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 97,
    "path": "../public/_nuxt/composables.2a4317bc.js"
  },
  "/_nuxt/contact-us.d47a0f8c.js": {
    "type": "application/javascript",
    "etag": "\"a03-TewYyd5eu5HsFNSkm8r8mJbLhws\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 2563,
    "path": "../public/_nuxt/contact-us.d47a0f8c.js"
  },
  "/_nuxt/contentArea.vue.f480a44b.js": {
    "type": "application/javascript",
    "etag": "\"19bd-cDp0tNi9AFFxmWeWPb737kVZw3U\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 6589,
    "path": "../public/_nuxt/contentArea.vue.f480a44b.js"
  },
  "/_nuxt/default.0006455a.js": {
    "type": "application/javascript",
    "etag": "\"173a-XFhoFtKjT4WsQ3BDZkfcGFMCPdw\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 5946,
    "path": "../public/_nuxt/default.0006455a.js"
  },
  "/_nuxt/entry.c3b8c020.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3427e-gdSnn146VPP+jMhFQ01dEVtXh2A\"",
    "mtime": "2023-02-14T06:54:52.027Z",
    "size": 213630,
    "path": "../public/_nuxt/entry.c3b8c020.css"
  },
  "/_nuxt/entry.f4899e2f.js": {
    "type": "application/javascript",
    "etag": "\"22014-Von9wmJtz2iBGBhcYgL48giaXgk\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 139284,
    "path": "../public/_nuxt/entry.f4899e2f.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.b9eb4dcb.js": {
    "type": "application/javascript",
    "etag": "\"8cf-a16tD5uicQLEdql8ZwqyQDEzlgY\"",
    "mtime": "2023-02-14T06:54:52.027Z",
    "size": 2255,
    "path": "../public/_nuxt/error-404.b9eb4dcb.js"
  },
  "/_nuxt/error-500.14b9c712.js": {
    "type": "application/javascript",
    "etag": "\"778-Pd8vQIwWSGep4voAg58AqZErHfM\"",
    "mtime": "2023-02-14T06:54:52.034Z",
    "size": 1912,
    "path": "../public/_nuxt/error-500.14b9c712.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.bb77c113.js": {
    "type": "application/javascript",
    "etag": "\"49e-6Pl7Vii/i1hHWjMVcFJtmogtugE\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 1182,
    "path": "../public/_nuxt/error-component.bb77c113.js"
  },
  "/_nuxt/fa-brands-400.404d6083.ttf": {
    "type": "font/ttf",
    "etag": "\"21544-m0nGxbDL3vFYrjGypOSBRVVAg4k\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 136516,
    "path": "../public/_nuxt/fa-brands-400.404d6083.ttf"
  },
  "/_nuxt/fa-brands-400.6128dd44.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"21676-xxn0N1Z57ljhVkNPm6lye+Zpzwc\"",
    "mtime": "2023-02-14T06:54:52.025Z",
    "size": 136822,
    "path": "../public/_nuxt/fa-brands-400.6128dd44.eot"
  },
  "/_nuxt/fa-brands-400.71b3ce72.woff2": {
    "type": "font/woff2",
    "etag": "\"1327c-9ybEJ1u0lKBF/eBZF18HLeBsAd8\"",
    "mtime": "2023-02-14T06:54:52.025Z",
    "size": 78460,
    "path": "../public/_nuxt/fa-brands-400.71b3ce72.woff2"
  },
  "/_nuxt/fa-brands-400.a0375c05.woff": {
    "type": "font/woff",
    "etag": "\"167e8-pCrEqU9ODpMzzbGy+2wTwK5pD/I\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 92136,
    "path": "../public/_nuxt/fa-brands-400.a0375c05.woff"
  },
  "/_nuxt/fa-brands-400.e2749cb2.svg": {
    "type": "image/svg+xml",
    "etag": "\"b6819-aaD/eanZOkUen6kL15rnAI0qnaU\"",
    "mtime": "2023-02-14T06:54:52.028Z",
    "size": 747545,
    "path": "../public/_nuxt/fa-brands-400.e2749cb2.svg"
  },
  "/_nuxt/fa-regular-400.5e811f0b.ttf": {
    "type": "font/ttf",
    "etag": "\"8504-1k5YmBpBneUrrBEMl5iH0042YTU\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 34052,
    "path": "../public/_nuxt/fa-regular-400.5e811f0b.ttf"
  },
  "/_nuxt/fa-regular-400.6799c999.woff": {
    "type": "font/woff",
    "etag": "\"4184-Jq/CnTmrn6xtC2B75+dtsJP/fDo\"",
    "mtime": "2023-02-14T06:54:52.027Z",
    "size": 16772,
    "path": "../public/_nuxt/fa-regular-400.6799c999.woff"
  },
  "/_nuxt/fa-regular-400.ce20ed8a.woff2": {
    "type": "font/woff2",
    "etag": "\"34ec-+5ZIRpUwoF+pqsgOR9TWlgRyokI\"",
    "mtime": "2023-02-14T06:54:52.025Z",
    "size": 13548,
    "path": "../public/_nuxt/fa-regular-400.ce20ed8a.woff2"
  },
  "/_nuxt/fa-regular-400.d42a64dc.svg": {
    "type": "image/svg+xml",
    "etag": "\"2354a-xBpogVjVd+Oic4E3mS1JsFsXq48\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 144714,
    "path": "../public/_nuxt/fa-regular-400.d42a64dc.svg"
  },
  "/_nuxt/fa-regular-400.f9853ad3.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"862e-K6qaiqaPHS1HErPHIF+RBaryGHk\"",
    "mtime": "2023-02-14T06:54:52.023Z",
    "size": 34350,
    "path": "../public/_nuxt/fa-regular-400.f9853ad3.eot"
  },
  "/_nuxt/fa-solid-900.1a46e780.svg": {
    "type": "image/svg+xml",
    "etag": "\"e0047-Nt5qKYZg7T/qqzeQD3sow+mB2A4\"",
    "mtime": "2023-02-14T06:54:52.028Z",
    "size": 917575,
    "path": "../public/_nuxt/fa-solid-900.1a46e780.svg"
  },
  "/_nuxt/fa-solid-900.2caded24.ttf": {
    "type": "font/ttf",
    "etag": "\"31ef0-1Te/TMcnPds/11TVPyskGur67+c\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 204528,
    "path": "../public/_nuxt/fa-solid-900.2caded24.ttf"
  },
  "/_nuxt/fa-solid-900.6b555920.woff2": {
    "type": "font/woff2",
    "etag": "\"139ac-m1kgSLkGKwDwst14LXCpW33Gm4M\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 80300,
    "path": "../public/_nuxt/fa-solid-900.6b555920.woff2"
  },
  "/_nuxt/fa-solid-900.aab971ad.woff": {
    "type": "font/woff",
    "etag": "\"19758-O4agzhXY1TS2XphWDjIakz0xBog\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 104280,
    "path": "../public/_nuxt/fa-solid-900.aab971ad.woff"
  },
  "/_nuxt/fa-solid-900.e0e3c4af.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"3200e-w5uJ9/p7ZpMasCpUAC21/8v/IGw\"",
    "mtime": "2023-02-14T06:54:52.026Z",
    "size": 204814,
    "path": "../public/_nuxt/fa-solid-900.e0e3c4af.eot"
  },
  "/_nuxt/index.aeec12d7.js": {
    "type": "application/javascript",
    "etag": "\"1a2-9RV6mhlG7cLDlAaXktlYiGc6V9E\"",
    "mtime": "2023-02-14T06:54:52.028Z",
    "size": 418,
    "path": "../public/_nuxt/index.aeec12d7.js"
  },
  "/_nuxt/useHomePage.store.687c8d9c.js": {
    "type": "application/javascript",
    "etag": "\"31fc-sMFriDEHRAt6EK6PE2SDPgn7k3U\"",
    "mtime": "2023-02-14T06:54:52.033Z",
    "size": 12796,
    "path": "../public/_nuxt/useHomePage.store.687c8d9c.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_fLuVWR = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_fLuVWR, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_fLuVWR, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
