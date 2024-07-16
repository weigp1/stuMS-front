<script setup>
// 定义组件的 props
defineProps({
  // 标签文本，类型为字符串，默认为空
  label: { type: String, default: '' },
  // 标签宽度，类型为数字，默认为 80
  labelWidth: { type: Number, default: 80 },
  // 内容宽度，类型为数字，默认为 220
  contentWidth: { type: Number, default: 220 },
})
</script>

<template>
  <!-- 容器，使用 flex 布局，子元素垂直居中 -->
  <div class="flex items-center">
    <!-- 标签，如果 label prop 不为空则显示，宽度由 labelWidth prop 控制 -->
    <label v-if="label" class="flex-shrink-0" :style="{ width: `${labelWidth}px` }">
      {{ label }}
    </label>
    <!-- 内容，宽度由 contentWidth prop 控制 -->
    <div class="flex-shrink-0" :style="{ width: `${contentWidth}px` }">
      <!-- 插槽，用于在父组件中插入自定义内容 -->
      <slot />
    </div>
  </div>
</template>