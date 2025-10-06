import { _ as __nuxt_component_0 } from './Logo-D0I1XJAn.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-B6ucwbT6.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderDynamicModel, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { A as ArrowRight } from './ArrowRight-CEkNV4IV.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './server.mjs';
import 'vue-router';
import 'jsonwebtoken';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex bg-zinc-900 h-screen" }, _attrs))}><div class="bg-black w-[500px] p-10 flex flex-col justify-center">`);
      _push(ssrRenderComponent(_component_Logo, null, null, _parent));
      _push(`<h1 class="text-white font-bold text-lg mt-8">Sign up for a free account</h1><p class="text-zinc-300 text-sm mt-1"> Already registered? `);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/login",
        class: "font-bold text-yellow-500 underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log in `);
          } else {
            return [
              createTextVNode(" Log in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` to your account </p><form class="mt-8"><div><label for="email" class="text-zinc-300 text-sm block mb-1">Email Address</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" inputmode="email" autocomplete="email" required class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400" placeholder="you@example.com"></div><div class="mt-6 relative"><label for="password" class="text-zinc-300 text-sm block mb-1">Password</label><input id="password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(password), null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} autocomplete="new-password" required class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400 pr-10" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"><button type="button" class="absolute right-3 top-8 text-zinc-400 hover:text-white text-xs focus:outline-none">${ssrInterpolate(unref(showPassword) ? "Hide" : "Show")}</button><p class="text-xs text-zinc-400 mt-1">Use at least 8 characters with uppercase, lowercase, a number, and a symbol.</p></div><div class="mt-6 relative"><label for="confirmPassword" class="text-zinc-300 text-sm block mb-1">Confirm Password</label><input id="confirmPassword"${ssrRenderDynamicModel(unref(showConfirmPassword) ? "text" : "password", unref(confirmPassword), null)}${ssrRenderAttr("type", unref(showConfirmPassword) ? "text" : "password")} autocomplete="new-password" required class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400 pr-10" placeholder="Re-enter password"><button type="button" class="absolute right-3 top-8 text-zinc-400 hover:text-white text-xs focus:outline-none">${ssrInterpolate(unref(showConfirmPassword) ? "Hide" : "Show")}</button></div>`);
      if (unref(errorMessage)) {
        _push(`<p class="text-sm text-red-400 mt-3" role="alert">${ssrInterpolate(unref(errorMessage))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><button${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full mt-5 bg-yellow-500 rounded-full px-4 py-2 text-sm font-bold flex justify-center items-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"><span>${ssrInterpolate(unref(loading) ? "Creating account\u2026" : "Sign Up")}</span>`);
      if (!unref(loading)) {
        _push(ssrRenderComponent(ArrowRight, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></form></div><div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-BQmS9P2f.mjs.map
