<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧 Logo -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" stroke-width="2" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h12" />
            </svg>
          </div>
          <span class="ml-2 text-lg font-semibold text-gray-800 hidden md:block">{{ profileConfig.title }}</span>
        </div>

        <!-- 移动端居中标题 -->
        <div class="md:hidden absolute left-1/2 transform -translate-x-1/2">
          <span class="text-lg font-semibold text-gray-800">{{ profileConfig.title }}</span>
        </div>

        <!-- 桌面端菜单 -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- 工具链接 -->
          <a v-for="tool in profileConfig.tools" :key="tool.name"
             :href="tool.url" target="_blank"
             class="text-gray-500 hover:text-gray-700 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
             :title="tool.description">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="renderIcon(tool.icon).path" />
            </svg>
            <span class="text-sm">{{ tool.name }}</span>
          </a>
        </div>

        <!-- 移动端折叠按钮 -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors p-2 rounded-md hover:bg-gray-100 z-10 relative"
            aria-label="切换菜单"
            type="button"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端下拉菜单 -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 bg-white"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            v-for="tool in profileConfig.tools" :key="tool.name"
            :href="tool.url"
            target="_blank"
            class="text-gray-500 hover:text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            @click="closeMobileMenu"
          >
            <div class="flex items-center space-x-2">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="renderIcon(tool.icon).path" />
              </svg>
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

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 渲染图标的函数
const renderIcon = (iconType: string) => {
  switch (iconType) {
    case 'code':
      return {
        path: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      }
    case 'cloud':
      return {
        path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      }
    case 'blog':
      return {
        path: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
      }
    case 'share':
      return {
        path: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
      }
    case 'digital':
      return {
        path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      }
    case 'github':
      return {
        fill: "currentColor",
        path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      }
    case 'email':
      return {
        path: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      }
    default:
      return {
        path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      }
  }
}

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