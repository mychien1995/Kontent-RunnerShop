import { u as useGetModularContentValue, a as useGetContentImageFieldUrl, b as useGetContentTextFieldValue, c as useGetContentAreaValue, d as useHomePageStore } from "./useHomePage.store-27f93160.js";
import { defineComponent, mergeProps, unref, useSSRContext, createVNode, resolveDynamicComponent, withAsyncContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderVNode, ssrRenderComponent } from "vue/server-renderer";
import "../server.mjs";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "ufo";
import "h3";
import "@vue/devtools-api";
import "@unhead/vue";
import "@unhead/dom";
import "@unhead/ssr";
import "vue-router";
import "ohash";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "carousel",
  __ssrInlineRender: true,
  props: {
    parentContent: null,
    fieldName: null,
    content: null
  },
  setup(__props) {
    const props = __props;
    const bannersContent = useGetModularContentValue(
      props.parentContent,
      props.content,
      "images"
    );
    const banners = bannersContent.map(
      (content) => ({
        imageSrc: useGetContentImageFieldUrl(content, "banner_image"),
        description: useGetContentTextFieldValue(content, "description"),
        title: useGetContentTextFieldValue(content, "title"),
        subTitle: useGetContentTextFieldValue(content, "subtitle")
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "template-mo-zay-hero-carousel",
        class: "carousel slide",
        "data-bs-ride": "carousel"
      }, _attrs))}><ol class="carousel-indicators"><!--[-->`);
      ssrRenderList(unref(banners), (item, index) => {
        _push(`<li data-bs-target="#template-mo-zay-hero-carousel"${ssrRenderAttr("data-bs-slide-to", index)} class="${ssrRenderClass(index == 0 ? "active" : "")}"></li>`);
      });
      _push(`<!--]--></ol><div class="carousel-inner"><!--[-->`);
      ssrRenderList(unref(banners), (item, index) => {
        _push(`<div class="${ssrRenderClass("carousel-item " + (index == 0 ? "active" : ""))}"><div class="container"><div class="row p-5"><div class="mx-auto col-md-8 col-lg-6 order-lg-last banner-img-wrapper"><img class="img-fluid"${ssrRenderAttr("src", item.imageSrc)} alt=""></div><div class="col-lg-6 mb-0 d-flex align-items-center"><div class="text-align-left align-self-center"><h1 class="h1 text-success">${ssrInterpolate(item.title)}</h1><h3 class="h2">${ssrInterpolate(item.subTitle)}</h3><div>${item.description}</div></div></div></div></div></div>`);
      });
      _push(`<!--]--></div><a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev"><i class="fas fa-chevron-left"></i></a><a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next"><i class="fas fa-chevron-right"></i></a></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "categoryBlock",
  __ssrInlineRender: true,
  props: {
    parentContent: null,
    fieldName: null,
    content: null
  },
  setup(__props) {
    const props = __props;
    const categoryItemsContent = useGetModularContentValue(
      props.parentContent,
      props.content,
      "category_items"
    );
    const categoryItems = categoryItemsContent.map(
      (c) => ({
        imageSrc: useGetContentImageFieldUrl(c, "thumbnail"),
        link: useGetContentTextFieldValue(c, "link"),
        title: useGetContentTextFieldValue(c, "title")
      })
    );
    const title = useGetContentTextFieldValue(props.content, "title");
    const subtitle = useGetContentTextFieldValue(props.content, "subtitle");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}><div class="row text-center pt-3"><div class="col-lg-6 m-auto"><h1 class="h1">${ssrInterpolate(unref(title))}</h1><p>${ssrInterpolate(unref(subtitle))}</p></div></div><div class="row"><!--[-->`);
      ssrRenderList(unref(categoryItems), (item, index) => {
        _push(`<div class="col-12 col-md-4 p-5 mt-3"><a href="#"><img${ssrRenderAttr("src", item.imageSrc)} class="rounded-circle img-fluid border category-img"></a><h5 class="text-center mt-3 mb-3">${ssrInterpolate(item.title)}</h5><p class="text-center"><a${ssrRenderAttr("href", item.link)} class="btn btn-success">Go Shop</a></p></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/categoryBlock.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "featuredProduct",
  __ssrInlineRender: true,
  props: {
    parentContent: null,
    fieldName: null,
    content: null
  },
  setup(__props) {
    const props = __props;
    const productsContent = useGetModularContentValue(
      props.parentContent,
      props.content,
      "products"
    );
    const title = useGetContentTextFieldValue(props.content, "title");
    const subtitle = useGetContentTextFieldValue(props.content, "subtitle");
    const products = productsContent.map(
      (p) => ({
        imageSrc: useGetContentImageFieldUrl(p, "thumbnail"),
        name: useGetContentTextFieldValue(p, "product_name"),
        price: parseFloat(useGetContentTextFieldValue(p, "price")),
        rating: parseFloat(useGetContentTextFieldValue(p, "rating")),
        description: useGetContentTextFieldValue(
          p,
          "_pagebase__page_description"
        )
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-light" }, _attrs))}><div class="container py-5"><div class="row text-center py-3"><div class="col-lg-6 m-auto"><h1 class="h1">${ssrInterpolate(unref(title))}</h1><p>${ssrInterpolate(unref(subtitle))}</p></div></div><div class="row"><!--[-->`);
      ssrRenderList(unref(products), (item, index) => {
        _push(`<div class="col-12 col-md-4 mb-4"><div class="card h-100"><a href="/"><img${ssrRenderAttr("src", item.imageSrc)} class="card-img-top"></a><div class="card-body"><ul class="list-unstyled d-flex justify-content-between"><li><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-warning fa fa-star"></i><i class="text-muted fa fa-star"></i><i class="text-muted fa fa-star"></i></li><li class="text-muted text-right">$${ssrInterpolate(item.price)}</li></ul><a href="shop-single.html" class="h2 text-decoration-none text-dark">${ssrInterpolate(item.name)}</a><p class="card-text">${ssrInterpolate(item.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/featuredProduct.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "contentArea",
  __ssrInlineRender: true,
  props: {
    content: null,
    contentAreaFieldName: null
  },
  setup(__props) {
    const props = __props;
    const componentMap = {
      carousel: _sfc_main$4,
      category_block: _sfc_main$3,
      featured_product_block: _sfc_main$2
    };
    const contentAreaValues = useGetContentAreaValue(
      props.content,
      props.contentAreaFieldName
    );
    const contentAreaElements = contentAreaValues.map(
      (v) => ({
        content: v,
        component: componentMap[v.system.type]
      })
    ).filter((v) => v.component);
    const getChildProps = (element) => ({
      parentContent: props.content,
      fieldName: element.system.codename,
      content: element
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(unref(contentAreaElements), (element, index) => {
        _push(`<div>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(element.component), getChildProps(element.content), null), _parent);
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/contentArea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const homePageContent = ([__temp, __restore] = withAsyncContext(() => useHomePageStore().getContent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_contentArea = _sfc_main$1;
      _push(ssrRenderComponent(_component_contentArea, mergeProps({ content: unref(homePageContent), contentAreaFieldName: "components" }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-bb2ae33b.js.map
