<template>
    <div v-html="svgContent" class="svg-content" :class="name">
    </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import { fetchSvgContent } from '../utils/SvgUtils';

// 定义组件属性
const props = defineProps({
    // SVG文件名称
    name: {
        type: String,
        required: true,
        default: ''
    }
});

const svgContent = ref('');

onMounted(async () => {
    if (props.name) {
        try {
            svgContent.value = await fetchSvgContent(props.name);
        } catch (error) {
            console.error(`Failed to load SVG file: ${props.name}`, error);
            svgContent.value = '';
        }
    }
});
</script>
<script lang="ts">
export default {
    name: 'SvgIcon'
}
</script>