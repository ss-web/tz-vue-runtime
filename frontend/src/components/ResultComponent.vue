<template>
  <div id="work" class="layout"><v-runtime-template :template="layout" /></div>
  <AppStyle :style="compiledCss" />
</template>

<script setup>
import { computed } from 'vue';
import VRuntimeTemplate from "vue3-runtime-template";
import AppStyle from './AppStyle.js';

const props = defineProps(['layout', 'styles']);

const layout = computed(() => props.layout);

const prefixCss = (css) => {
  let id = `#work`
  let char
  let nextChar
  let isAt
  let isIn
  const classLen = id.length

  // makes sure the id will not concatenate the selector
  id += ' '

  // removes comments
  css = css.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')

  // makes sure nextChar will not target a space
  css = css.replace(/}(\s*)@/g, '}@')
  css = css.replace(/}(\s*)}/g, '}}')

  for (let i = 0; i < css.length - 2; i++) {
    char = css[i]
    nextChar = css[i + 1]

    if (char === '@' && nextChar !== 'f') isAt = true
    if (!isAt && char === '{') isIn = true
    if (isIn && char === '}') isIn = false

    if (
      !isIn &&
      nextChar !== '@' &&
      nextChar !== '}' &&
      (char === '}' ||
        char === ',' ||
        ((char === '{' || char === ';') && isAt))
    ) {
      css = css.slice(0, i + 1) + id + css.slice(i + 1)
      i += classLen
      isAt = false
    }
  }

  // prefix the first select if it is not `@media` and if it is not yet prefixed
  if (css.indexOf(id) !== 0 && css.indexOf('@') !== 0) css = id + css
  return css
}

const compiledCss = computed(() => {
  if (props.styles && props.styles.length > 0) {
    return prefixCss(props.styles);
  }
  return '';
});
</script>

<style scoped>
.layout{
  box-sizing: border-box;
  border: 4px solid var(--color-purple);
  border-radius: 4px;
  padding: 8px;
  margin: auto;
  max-width: 360px;
  min-width: 240px;
  min-height: 100px;
  width: 100%;
}
</style>