<template>
  <nav class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>

        <!-- 右侧功能按钮 -->
        <div class="flex items-center space-x-4">
          <a href="https://code.debugw.site" target="_blank"
            class="text-gray-500 hover:text-gray-700 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
            title="在线代码编辑器">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span class="text-sm">Code Editor</span>
          </a>
          <a href="https://pan.debugw.site" target="_blank"
            class="text-gray-500 hover:text-gray-700 flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
            title="网盘">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span class="text-sm">Cloud Drive</span>
          </a>
          <img class="h-8 w-8 rounded-full" :src="profileConfig.avatar" alt="Profile" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import profileConfig from '../config/profile'
// 可以添加交互逻辑
</script>

<script lang="ts">
export default {}
</script> 