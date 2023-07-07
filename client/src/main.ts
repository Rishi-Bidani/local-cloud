import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Directive, DirectiveBinding } from "vue";

const clickOutside: Directive = {
    beforeMount: (
        el: {
            clickOutsideEvent: { (event: any): void; (this: Document, ev: MouseEvent): any };
            contains: (arg0: any) => any;
        },
        binding: DirectiveBinding
    ) => {
        el.clickOutsideEvent = (event) => {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                binding.value();
            }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: (el: { clickOutsideEvent: (this: Document, ev: MouseEvent) => any }) => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};

const escape: Directive = {
    beforeMount(el, binding: DirectiveBinding) {
        el._keydownCallback = (event: { key: string }) => {
            if (event.key === "Escape") {
                binding.value();
            }
        };
        document.addEventListener("keydown", el._keydownCallback);
    },
    unmounted(el, binding) {
        document.removeEventListener("keydown", el._keydownCallback);
        delete el._keydownCallback;
    },
};

createApp(App).directive("click-outside", clickOutside).directive("esc", escape).mount("#app");
