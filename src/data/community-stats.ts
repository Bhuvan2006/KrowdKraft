export interface CommunityStat {
  icon: string
  title: string
  metric: string
  description: string
}

export const communityStats: CommunityStat[] = [
  {
    icon: "Users",
    title: "Community Members",
    metric: "1000+",
    description: "Active members in our growing community"
  },
  {
    icon: "Calendar",
    title: "Events Conducted",
    metric: "10+",
    description: "Successful seminars and competitions"
  },
  {
    icon: "GraduationCap",
    title: "Institutions Reached",
    metric: "5",
    description: "Universities and colleges in our network"
  }
]
