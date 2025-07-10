<template>
  <section>
    <h2 class="text-lg font-semibold mb-3">Timeline</h2>
    
    <!-- 桌面端横向时间线 -->
    <div class="hidden md:block relative">
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
    </div>

    <!-- 移动端垂直时间线 -->
    <div class="md:hidden">
      <div class="space-y-4">
        <div v-for="(item, index) in timeline" :key="item.date" 
          class="relative flex items-start cursor-pointer group"
          @click="handleNodeClick(index)">
          <!-- 左侧时间线 -->
          <div class="flex flex-col items-center mr-4 flex-shrink-0">
            <!-- 时间点 -->
            <div class="relative w-4 h-4 mb-2">
              <div class="absolute inset-0 bg-white border-2 rounded-full"
                :class="[selectedIndex === index ? 'border-blue-500' : 'border-gray-400 group-hover:border-blue-400']">
              </div>
              <div v-if="selectedIndex === index" 
                class="absolute inset-0 rounded-full overflow-hidden">
                <div class="w-full h-full progress-pie"></div>
              </div>
            </div>
            <!-- 连接线 -->
            <div v-if="index < timeline.length - 1" 
              class="w-0.5 h-8 bg-gray-200"></div>
          </div>
          
          <!-- 右侧内容 -->
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start mb-1">
              <h3 class="font-medium text-sm text-gray-900 truncate">{{ item.title }}</h3>
              <span class="text-xs text-gray-500 flex-shrink-0 ml-2">{{ item.date.split(' - ')[0] }}</span>
            </div>
            
            <!-- 可折叠的详细信息 -->
            <transition name="expand">
              <div v-if="selectedIndex === index" class="overflow-hidden">
                <p class="text-xs text-gray-600 mb-2">{{ item.description }}</p>
                <div v-if="item.tags" class="flex flex-wrap gap-1">
                  <span v-for="tag in item.tags" :key="tag" 
                    class="px-1.5 py-0.5 text-xs rounded bg-gray-100 text-gray-600">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 桌面端详细信息卡片 -->
    <transition name="fade">
      <div v-if="selectedIndex !== null" 
        class="hidden md:block bg-white rounded-lg border border-gray-200 p-3 shadow-lg">
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import profileConfig from '../config/profile'

const selectedIndex = ref<number>(profileConfig.timeline.length - 1)
let autoPlayTimer: number | null = null

// 处理节点点击
const handleNodeClick = (index: number) => {
  selectedIndex.value = index
  resetAutoPlay()
}

// 切换到下一个节点（从后往前）
const nextNode = () => {
  selectedIndex.value = selectedIndex.value === 0 
    ? profileConfig.timeline.length - 1 
    : selectedIndex.value - 1
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

const { timeline } = profileConfig
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

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
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