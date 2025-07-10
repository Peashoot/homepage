<template>
  <section>
    <h2 class="text-lg font-semibold mb-3">Projects</h2>
    <div class="grid md:grid-cols-2 gap-3">
      <div v-for="project in projects" :key="project.name" class="bg-white border border-gray-200 rounded-lg shadow p-3 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] cursor-pointer">
        <div>
          <div class="flex items-center mb-1.5">
            <span class="i-mdi:book-outline text-gray-400 mr-1.5"></span>
            <a :href="project.link" class="font-bold text-blue-600 hover:underline text-sm" target="_blank">{{ project.name }}</a>
            <span v-if="project.status" 
              class="ml-2 px-1.5 py-0.5 text-xs rounded border"
              :class="getStatusClass(project.status)">
              {{ project.status }}
            </span>
          </div>
          <p class="text-gray-600 text-xs mb-2">{{ project.description }}</p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-1.5">
            <span v-for="tag in project.tags" :key="tag" class="px-1.5 py-0.5 text-xs rounded bg-blue-100 text-blue-600">{{ tag }}</span>
          </div>
          <div class="flex items-center space-x-2 text-xs">
            <span v-if="project.language" :class="project.languageColorClass + ' w-2 h-2 rounded-full inline-block mr-1'" />
            <span v-if="project.language">{{ project.language }}</span>
            <span v-if="project.stars" class="ml-2">★ {{ project.stars }}</span>
            <span v-if="project.forks" class="ml-2">⎇ {{ project.forks }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ProjectItem } from '../config/profile.template'
import profileConfig from '../config/profile'

// 根据状态返回对应的样式类
const getStatusClass = (status: string) => {
  switch (status) {
    case '已上线':
      return 'bg-green-50 border-green-200 text-green-700'
    case '开发中':
      return 'bg-blue-50 border-blue-200 text-blue-700'
    case '停止维护':
      return 'bg-red-50 border-red-200 text-red-700'
    case '构思中':
      return 'bg-purple-50 border-purple-200 text-purple-700'
    default:
      return 'bg-gray-50 border-gray-200 text-gray-700'
  }
}

// 从配置文件获取项目数据
const projects: ProjectItem[] = profileConfig.projects
</script>

<script lang="ts">
export default {}
</script> 