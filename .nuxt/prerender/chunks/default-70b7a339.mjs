import { u as useNuxtApp, b as appPageTransition, e as _wrapIf, f as appKeepalive, g as _export_sfc, _ as __nuxt_component_0$1 } from './server.mjs';
import { e as useSiteSettingsStore, f as useGetImageFieldUrl, g as useGetLinkListValue, h as useGetTextFieldValue, i as useSocialLinkListValue } from './useHomePage.store-27f93160.mjs';
import { useSSRContext, defineComponent, h, Suspense, nextTick, Transition, computed, provide, reactive, withAsyncContext, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString } from 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/vue/server-renderer/index.mjs';
import { RouterView } from 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/vue-router/dist/vue-router.node.mjs';
import { defu } from 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/defu/dist/defu.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/ofetch/dist/node.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/hookable/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/unctx/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/ufo/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/h3/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/@unhead/vue/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/@unhead/dom/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/@unhead/ssr/dist/index.mjs';
import './config.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/destr/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/scule/dist/index.mjs';
import 'file://E:/Projects/Konten-Nuxt/runner-shop/node_modules/ohash/dist/index.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "appHeader",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => useSiteSettingsStore().getContent()), __temp = await __temp, __restore(), __temp);
    const imageUrl = useGetImageFieldUrl(siteSettings, "header_logo");
    const headerLinkLists = useGetLinkListValue(siteSettings, "header_links");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-expand-lg navbar-light shadow" }, _attrs))}><div class="container d-flex justify-content-between align-items-center">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "navbar-brand text-success logo h1 align-self-center",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(imageUrl))} style="${ssrRenderStyle({ "max-width": "200px" })}"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: unref(imageUrl),
                style: { "max-width": "200px" }
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between" id="templatemo_main_nav"><div class="flex-fill"><ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto"><!--[-->`);
      ssrRenderList(unref(headerLinkLists), (item, index) => {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_nuxt_link, {
          class: "nav-link",
          to: item.url
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.text)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div></nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/appHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!((_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          return _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
              h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, { default: () => h(RouteProvider, { key, routeProps, pageKey: key, hasTransition }) })
            )
          ).default();
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const RouteProvider = defineComponent({
  name: "RouteProvider",
  // TODO: Type props
  // eslint-disable-next-line vue/require-prop-types
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "appFooter",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => useSiteSettingsStore().getContent()), __temp = await __temp, __restore(), __temp);
    const shopName = useGetTextFieldValue(siteSettings, "footer_shop_name");
    const email = useGetTextFieldValue(siteSettings, "email");
    const phone = useGetTextFieldValue(siteSettings, "phone");
    const address = useGetTextFieldValue(siteSettings, "address");
    const footerColumn1Text = useGetTextFieldValue(
      siteSettings,
      "footer_column_1_title"
    );
    const footerColumn1LinkLists = useGetLinkListValue(
      siteSettings,
      "footer_column_1_links"
    );
    const footerColumn2Text = useGetTextFieldValue(
      siteSettings,
      "footer_column_2_title"
    );
    const footerColumn2LinkLists = useGetLinkListValue(
      siteSettings,
      "footer_column_2_links"
    );
    const socialLinks = useSocialLinkListValue(siteSettings, "social_links");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "bg-dark",
        id: "tempaltemo_footer"
      }, _attrs))}><div class="container"><div class="row"><div class="col-md-4 pt-5"><h2 class="h2 text-success border-bottom pb-3 border-light logo">${ssrInterpolate(unref(shopName))}</h2><ul class="list-unstyled text-light footer-link-list"><li><i class="fas fa-map-marker-alt fa-fw"></i> ${ssrInterpolate(unref(address))}</li><li><i class="fa fa-phone fa-fw"></i>\xA0 <a class="text-decoration-none"${ssrRenderAttr("href", "tel:" + unref(phone))}>${ssrInterpolate(unref(phone))}</a></li><li><i class="fa fa-envelope fa-fw"></i>\xA0 <a class="text-decoration-none"${ssrRenderAttr("href", "mailto:" + unref(email))}>${ssrInterpolate(unref(email))}</a></li></ul></div><div class="col-md-4 pt-5"><h2 class="h2 text-light border-bottom pb-3 border-light">${ssrInterpolate(unref(footerColumn1Text))}</h2><ul class="list-unstyled text-light footer-link-list"><!--[-->`);
      ssrRenderList(unref(footerColumn1LinkLists), (item, index) => {
        _push(`<li><a class="text-decoration-none"${ssrRenderAttr("href", item.url)}>${ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="col-md-4 pt-5"><h2 class="h2 text-light border-bottom pb-3 border-light">${ssrInterpolate(unref(footerColumn2Text))}</h2><ul class="list-unstyled text-light footer-link-list"><!--[-->`);
      ssrRenderList(unref(footerColumn2LinkLists), (item, index) => {
        _push(`<li><a class="text-decoration-none"${ssrRenderAttr("href", item.url)}>${ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></div></div><div class="row text-light mb-4"><div class="col-12 mb-3"><div class="w-100 my-3 border-top border-light"></div></div><div class="col-auto me-auto"><ul class="list-inline text-left footer-icons"><!--[-->`);
      ssrRenderList(unref(socialLinks), (item, index) => {
        _push(`<li class="list-inline-item border border-light rounded-circle text-center"><a class="text-light text-decoration-none" target="_blank" href="http://facebook.com/"><i class="${ssrRenderClass("fab fa-lg fa-fw " + item.icon)}"></i></a></li>`);
      });
      _push(`<!--]--></ul></div><div class="col-auto"><label class="sr-only" for="subscribeEmail">Email address</label><div class="input-group mb-2"><input type="text" class="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address"><div class="input-group-text btn-success text-light">Subscribe</div></div></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/appFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_appHeader = _sfc_main$2;
  const _component_NuxtPage = __nuxt_component_1;
  const _component_appFooter = _sfc_main$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_appHeader, null, null, _parent));
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(ssrRenderComponent(_component_appFooter, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-70b7a339.mjs.map
