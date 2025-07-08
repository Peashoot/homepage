<script setup lang="ts">
import ProfileSidebar from './components/ProfileSidebar.vue'
import PinnedProjects from './components/PinnedProjects.vue'
import PersonalResume from './components/PersonalResume.vue'
import TopNavbar from './components/TopNavbar.vue'
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 text-gray-800 overflow-hidden">
    <!-- 顶部导航栏 -->
    <TopNavbar />

    <!-- 主要内容区域 -->
    <div class="flex-1 mx-auto w-full max-w-7xl flex flex-col md:flex-row md:items-start gap-4 p-4 overflow-auto">
      <!-- 左侧个人信息栏 -->
      <aside class="w-full md:w-[300px] flex-shrink-0">
        <ProfileSidebar />
      </aside>
      <!-- 右侧主内容区 -->
      <main class="flex-1 flex flex-col gap-4">
        <section class="bg-white border border-gray-200 rounded-xl shadow p-4">
          <PinnedProjects />
        </section>
        <section class="bg-white border border-gray-200 rounded-xl shadow p-4">
          <PersonalResume />
        </section>
      </main>
    </div>

    <!-- 页脚 -->
    <footer class="text-center text-gray-400 py-2 text-sm border-t bg-white">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        class="text-gray-400 hover:text-gray-600">浙ICP备2025170805号</a>
      &nbsp;&nbsp;@2025 DebugW
    </footer>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  aside {
    position: static !important;
    width: 100% !important;
    margin-bottom: 1.5rem;
  }
}
</style>
