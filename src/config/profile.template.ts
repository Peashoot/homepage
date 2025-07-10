export interface ContactItem {
  label: string
  value: string
  isLink?: boolean
  displayText?: string
}

export interface SkillItem {
  name: string
  imageUrl: string
  link: string
}

export interface TimelineItem {
  date: string
  title: string
  description: string
  tags?: string[]
}

export interface ProjectItem {
  name: string
  description: string
  link: string
  status: '已上线' | '开发中' | '停止维护' | '构思中'
  tags: string[]
  language?: string
  languageColorClass?: string
  stars?: number
  forks?: number
}

export interface ProfileConfig {
  avatar: string
  nickname: string
  username: string
  bio: string
  birthday: string
  constellation: string
  location: string
  title: string
  icpText: string
  copyright: string
  contactInfo: ContactItem[]
  skills: SkillItem[]
  timeline: TimelineItem[]
  projects: ProjectItem[]
}

const profileConfig: ProfileConfig = {
  title: 'Your title',
  icpText: 'xICP备xxxxxxxxxxxx号',
  copyright: '© 2025 Your name',
  avatar: '/path/to/your/avatar.jpg',
  nickname: '你的昵称',
  username: '用户名',
  bio: '个人简介',
  birthday: 'YYYY-MM',
  constellation: '星座',
  location: '城市',
  contactInfo: [
    {
      label: 'E-Mail',
      value: 'your.email@example.com'
    },
    {
      label: 'WeChat',
      value: 'your_wechat_id'
    },
    {
      label: 'GitHub',
      value: 'https://github.com/yourusername',
      isLink: true,
      displayText: 'github.com/yourusername'
    }
  ],
  skills: [
    {
      name: 'Skill Name',
      imageUrl: 'https://path/to/skill/icon.svg',
      link: 'https://skill.homepage.com'
    }
  ],
  timeline: [
    {
      date: 'YYYY.MM - YYYY.MM',
      title: '标题',
      description: '描述',
      tags: ['标签1', '标签2']
    }
  ],
  projects: [
    {
      name: '项目名称',
      description: '项目描述',
      link: 'https://github.com/yourusername/project',
      status: '开发中',
      tags: ['技术栈'],
      language: '主要语言',
      languageColorClass: 'bg-blue-400',
      stars: 0,
      forks: 0
    }
  ]
}

export default profileConfig 