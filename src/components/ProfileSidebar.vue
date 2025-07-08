<template>
  <aside class="w-full bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
    <!-- 头像 -->
    <img src="../assets/avatar.jfif" alt="avatar" class="w-28 h-28 rounded-full border-4 border-gray-200 mb-3" />
    <!-- 昵称和用户名 -->
    <h1 class="text-xl font-bold mb-1">DebugW</h1>
    <h2 class="text-gray-500 text-base mb-2">Peashoot</h2>
    <!-- 简介 -->
    <p class="text-center text-gray-700 text-sm mb-3">Learn every day! Happy every day! Sing every day! Code every day!
    </p>
    <!-- 喜欢按钮 -->
    <button
      @click="toggleLike"
      class="w-full flex items-center justify-center space-x-2 bg-gray-100 border border-gray-300 rounded py-1.5 mb-3 hover:bg-gray-200 transition text-sm"
      :class="{ 'text-red-500': isLiked, 'text-gray-500': !isLiked }">
      <svg class="h-5 w-5" :class="{ 'fill-red-500': isLiked }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{{ isLiked ? '已支持' : '支持' }}</span>
      <span class="text-gray-500">({{ likeCount }})</span>
    </button>
    <!-- 基本信息 -->
    <div class="flex items-center space-x-3 mb-3 text-xs text-gray-600">
      <span class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        1995-08
      </span>
      <span>·</span>
      <span class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        狮子座
      </span>
      <span>·</span>
      <span class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        浙江杭州
      </span>
    </div>
    <!-- 其他信息 -->
    <div class="w-full space-y-1.5 mb-3 text-sm">
      <table class="w-full">
        <tbody>
          <tr v-for="item in contactInfo" :key="item.label">
            <td class="py-0.5 pr-2 text-gray-500 w-16 align-middle">{{ item.label }}:</td>
            <td class="py-0.5 text-gray-700 flex items-center">
              <template v-if="item.isLink">
                <a :href="item.value" class="text-blue-500 hover:underline text-xs leading-6" target="_blank">{{ item.displayText || item.value }}</a>
              </template>
              <template v-else>
                <span class="text-xs leading-6">{{ item.value }}</span>
              </template>
              <button 
                v-if="item.displayText || item.value"
                @click="copyText(item.displayText || item.value)"
                class="ml-1 p-0.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                :title="`复制${item.label}`">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 技能徽章 -->
    <div class="w-full">
      <h3 class="font-semibold text-gray-700 mb-2 text-sm">Skills</h3>
      <div class="flex flex-wrap gap-2">
        <a v-for="skill in skills" 
          :key="skill.name"
          :href="skill.link"
          target="_blank"
          class="relative group">
          <img 
            :src="skill.imageUrl" 
            :alt="skill.name"
            class="w-8 h-8 rounded transition-transform hover:scale-110" />
          <!-- Tooltip -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded
            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
            {{ skill.name }}
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 
              border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
          </div>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ContactItem {
  label: string
  value: string
  isLink?: boolean
  displayText?: string
}

interface SkillItem {
  name: string
  imageUrl: string
  link: string
}

const contactInfo: ContactItem[] = [
  {
    label: 'E-Mail',
    value: 'debugw@debugw.site'
  },
  {
    label: 'WeChat',
    value: 'Peashoot'
  },
  {
    label: 'GitHub',
    value: 'https://github.com/Peashoot',
    isLink: true,
    displayText: 'https://github.com/Peashoot'
  }
]

const skills: SkillItem[] = [
  {
    name: 'Java',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    link: 'https://www.java.com/'
  },
  {
    name: 'C#',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    link: 'https://dotnet.microsoft.com/languages/csharp'
  },
  {
    name: 'Go',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
    link: 'https://golang.org/'
  },
  {
    name: 'Python',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    link: 'https://www.python.org/'
  },
  {
    name: 'Vue.js',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    link: 'https://vuejs.org/'
  },
  {
    name: 'Docker',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    link: 'https://www.docker.com/'
  }
]

const isLiked = ref(false)
const likeCount = ref(128)

const toggleLike = () => {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
}

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 这里可以添加一个复制成功的提示，比如使用第三方通知库
    console.log('复制成功')
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<script lang="ts">
export default {
  name: 'ProfileSidebar'
}
</script> 