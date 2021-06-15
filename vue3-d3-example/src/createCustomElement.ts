/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApp, defineComponent, h, ref, ComponentOptions } from 'vue';
import { camelize, hyphenate } from '@vue/shared';

// convert attributes according to Vue types
function convertAttribute(value: string | undefined, type: unknown) {
  if (value === undefined) {
    return undefined;
  }
  if (type === Array || type === Object) {
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  if (type === Number) {
    return Number(value);
  }
  if (type === Boolean) {
    return Boolean(value);
  }
  return value;
}

export function createCustomElement(componentOptions: ComponentOptions<any>): typeof HTMLElement {
  return class CustomElement extends HTMLElement {
    private props = ref<Record<string, unknown>>({});
    private attrs = ref<Record<string, unknown>>({});

    private updateAttr(attrName: string, value: string) {
      const camelizedName = camelize(attrName);
      const vueProp = componentOptions.props[camelizedName];
      if (vueProp !== undefined) {
        this.attrs.value[camelizedName] = convertAttribute(value, vueProp.type);
      }
    }

    static get observedAttributes() {
      return Object.keys(componentOptions.props).map(hyphenate);
    }

    connectedCallback() {
      for (const vuePropName in componentOptions.props) {
        // define getter/setter based on Vue props
        Object.defineProperty(this, vuePropName, {
          get() {
            return this.props.value[vuePropName];
          },
          set(newValue) {
            this.props.value[vuePropName] = newValue;
          },
        });
      }

      // get and parse initial attributes
      for (let i = 0; i < this.attributes.length; i++) {
        const attr = this.attributes.item(i);
        if (attr !== null) {
          this.updateAttr(attr.name, attr.value);
        }
      }

      // create a wrapper that renders the component with updated props
      const attrs = this.attrs;
      const props = this.props;
      const Wrapper = defineComponent({
        setup() {
          return () => h(componentOptions, { ...attrs.value, ...props.value });
        },
      });

      const app = createApp(Wrapper);
      app.mount(this);
    }

    attributeChangedCallback(attrName: string, _: string, value: string) {
      this.updateAttr(attrName, value);
    }
  };
}
