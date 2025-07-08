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

export interface ProfileConfig {
  avatar: string
  nickname: string
  username: string
  bio: string
  birthday: string
  constellation: string
  location: string
  contactInfo: ContactItem[]
  skills: SkillItem[]
  timeline: TimelineItem[]
}

const profileConfig: ProfileConfig = {
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
  ]
}

export default profileConfig 