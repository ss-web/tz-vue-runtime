import { defineComponent, h, ref, watch } from 'vue';

export default defineComponent({
  name: 'AppStyle',
  props: {
    style: String,
  },
  setup(props) {
    const styleContent = ref(props.style);

    // Следим за изменениями свойства style и обновляем стили
    watch(() => props.style, (newVal) => {
      styleContent.value = newVal;
    });

    return {
      styleContent,
    };
  },
  render() {
    const styleElement = h('style', {}, this.styleContent);

    return h('span', null, styleElement);
  },
});