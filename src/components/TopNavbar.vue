<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧 Logo -->
        <div class="flex items-center">
          <a href="https://github.com/peashoot/homepage" class="flex-shrink-0">
            <img src="../assets/logo.svg" alt="Logo" class="h-8 w-8" />
          </a>
          <span class="ml-2 text-lg font-semibold text-gray-800 hidden md:block">{{ profileConfig.title }}</span>
        </div>

        <!-- 移动端居中标题 -->
        <div class="md:hidden absolute left-1/2 transform -translate-x-1/2">
          <span class="text-lg font-semibold text-gray-800">{{ profileConfig.title }}</span>
        </div>

        <!-- 桌面端菜单 -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- 工具链接 -->
          <a v-for="tool in profileConfig.tools" :key="tool.name" :href="tool.url" target="_blank"
            class="text-gray-500 hover:text-gray-700 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
            :title="tool.description">
            <SvgIcon :name="tool.icon" class="h-5 w-5" />
            <span class="text-sm">{{ tool.name }}</span>
          </a>
        </div>

        <!-- 移动端折叠按钮 -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors p-2 rounded-md hover:bg-gray-100 z-10 relative"
            aria-label="切换菜单" type="button">
            <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端下拉菜单 -->
      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-gray-200 bg-white">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a v-for="tool in profileConfig.tools" :key="tool.name" :href="tool.url" target="_blank"
            class="text-gray-500 hover:text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            @click="closeMobileMenu">
            <div class="flex items-center space-x-2">
              <SvgIcon :name="tool.icon" class="h-5 w-5" />
              <span>{{ tool.name }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import profileConfig from '../config/profile'
import SvgIcon from './SvgIcon.vue'

// 移动端菜单状态
const isMobileMenuOpen = ref(false)



// 切换移动端菜单
const toggleMobileMenu = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('nav')) {
    isMobileMenuOpen.value = false
  }
}

// 组件挂载时添加事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时移除事件监听器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<script lang="ts">
export default {}
</script> 