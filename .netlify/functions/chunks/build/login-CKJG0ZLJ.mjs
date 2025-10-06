import { _ as __nuxt_component_0 } from './Logo-D0I1XJAn.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-B6ucwbT6.mjs';
import { ref, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = __nuxt_component_0;
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex bg-zinc-900 h-screen" }, _attrs))}><div class="bg-black w-[500px] p-10 flex flex-col justify-center">`);
      _push(ssrRenderComponent(_component_Logo, null, null, _parent));
      _push(`<h1 class="text-white font-bold text-lg mt-8">Log in to your account</h1><p class="text-zinc-300 text-sm mt-1"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/register",
        class: "font-bold text-yellow-500 underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign up `);
          } else {
            return [
              createTextVNode(" Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` for one. </p><form><div class="mt-10"><label for="email" class="text-zinc-300 text-sm block mb-1">Email Address</label><input${ssrRenderAttr("value", unref(email))} type="email" autocomplete="email" class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400" placeholder="email@example.com"></div><div class="mt-6"><label for="password" class="text-zinc-300 text-sm block mb-1">Password</label><input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="password" class="block w-full bg-gray-700 border border-zinc-400 rounded text-white text-sm px-3 py-2 placeholder:text-zinc-400" placeholder="***********"></div><div><button class="w-full mt-4 bg-yellow-500 rounded-full px-3 py-2 text-sm font-bold flex justify-center items-center space-x-2"><span>Log in</span>`);
      _push(ssrRenderComponent(ArrowRight, null, null, _parent));
      _push(`</button></div></form></div><div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CKJG0ZLJ.mjs.map
