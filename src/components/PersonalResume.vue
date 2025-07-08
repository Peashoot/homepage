<template>
  <section>
    <h2 class="text-lg font-semibold mb-3">Timeline</h2>
    
    <!-- 时间线容器 -->
    <div class="relative">
      <!-- 横向时间线 -->
      <div class="absolute left-0 right-0 top-4 h-0.5 bg-gray-200"></div>
      
      <!-- 时间节点 -->
      <div class="relative flex justify-between items-center mb-8">
        <div v-for="(item, index) in timeline" :key="item.date" 
          class="relative flex flex-col items-center cursor-pointer group"
          @click="handleNodeClick(index)">
          <!-- 时间点 -->
          <div class="relative w-4 h-4 mb-2">
            <!-- 背景圆 -->
            <div class="absolute inset-0 bg-white border-2 rounded-full"
              :class="[selectedIndex === index ? 'border-blue-500' : 'border-gray-400 group-hover:border-blue-400']">
            </div>
            <!-- 进度扇形 -->
            <div v-if="selectedIndex === index" 
              class="absolute inset-0 rounded-full overflow-hidden">
              <div class="w-full h-full progress-pie"></div>
            </div>
          </div>
          <!-- 日期标签 -->
          <span class="text-xs text-gray-500 whitespace-nowrap"
            :class="{'text-blue-500': selectedIndex === index}">
            {{ item.date.split(' - ')[0] }}
          </span>
        </div>
      </div>

      <!-- 详细信息卡片 -->
      <transition name="fade">
        <div v-if="selectedIndex !== null" 
          class="bg-white rounded-lg border border-gray-200 p-3 shadow-lg">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-medium text-sm text-gray-900">{{ timeline[selectedIndex].title }}</h3>
            <span class="text-xs text-gray-500">{{ timeline[selectedIndex].date }}</span>
          </div>
          <p class="text-xs text-gray-600 mb-2">{{ timeline[selectedIndex].description }}</p>
          <div v-if="timeline[selectedIndex].tags" class="flex flex-wrap gap-1">
            <span v-for="tag in timeline[selectedIndex].tags" :key="tag" 
              class="px-1.5 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
              {{ tag }}
            </span>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TimelineItem {
  date: string
  title: string
  description: string
  tags?: string[]
}

const selectedIndex = ref<number>(0)
let autoPlayTimer: number | null = null

// 处理节点点击
const handleNodeClick = (index: number) => {
  selectedIndex.value = index
  resetAutoPlay()
}

// 切换到下一个节点
const nextNode = () => {
  selectedIndex.value = (selectedIndex.value + 1) % timeline.length
}

// 重置自动播放计时器
const resetAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
  }
  autoPlayTimer = window.setInterval(nextNode, 10000)
}

// 组件挂载时启动自动播放
onMounted(() => {
  resetAutoPlay()
})

// 组件卸载时清理计时器
onUnmounted(() => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
  }
})

const timeline: TimelineItem[] = [
  {
    date: '2017.09 - 2021.06',
    title: '浙江工业大学',
    description: '软件工程专业，获得学士学位。期间参与多个创新项目，并获得省级创新创业奖项。担任技术社团负责人，组织多场技术分享活动。',
    tags: ['计算机基础', '软件工程', '创新创业', '团队管理']
  },
  {
    date: '2021.07 - 2023.05',
    title: '软件工程师 @ CodeCraft',
    description: '从事企业级应用开发，负责核心模块的设计与实现。开发了自动化测试框架，将测试覆盖率提升至85%，显著提高了代码质量。',
    tags: ['C#', '.NET Core', 'Redis', 'MongoDB', 'CI/CD']
  }, 
  {
    date: '2023.06 - 2024.02',
    title: '高级后端开发 @ TechFlow',
    description: '参与开发高并发微服务系统，优化系统性能，提升用户体验。设计并实现了分布式缓存方案，将系统吞吐量提高3倍。',
    tags: ['Java', 'Spring Cloud', 'MySQL', 'Redis', 'Kafka']
  },
  {
    date: '2024.03 - 至今',
    title: '全栈开发工程师 @ StarSeeker',
    description: '负责公司核心业务系统的开发和维护，包括后端服务架构设计、前端界面开发等。主导了多个重要项目的技术选型和架构设计，成功将系统响应时间提升了50%。',
    tags: ['Vue3', 'Go', 'PostgreSQL', 'Docker', 'Kubernetes']
  },
]
</script>

<script lang="ts">
export default {
  name: 'Timeline'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@property --progress {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

@keyframes pie-progress {
  from {
    --progress: 0%;
  }
  to {
    --progress: 100%;
  }
}

.progress-pie {
  background: conic-gradient(
    rgb(59 130 246) var(--progress),
    transparent var(--progress)
  );
  animation: pie-progress 10s linear;
}
</style> 