import type { Shot } from "../_kit/parts";

const APP = "/case-studies/teamday/app";
const DESIGN = "/case-studies/teamday/design";

// Live captures are 1440×900 at 2x (anonymised); Figma exports are 1440 wide at 1x.
const live = (file: string, alt: string): Shot => ({ src: `${APP}/${file}`, alt, w: 2880, h: 1800 });
const design = (file: string, alt: string, h = 1024): Shot => ({ src: `${DESIGN}/${file}`, alt, w: 1440, h });

export const shots = {
  login: live("login.png", "TeamDay sign-in screen with the brand illustration"),
  todayEmpty: live("today-empty.png", "Today's plan with time stats, projects and an empty task list"),
  todayPlan: live("today-plan.png", "Today's plan with a carried-forward task and its estimate"),
  backlog: live("backlog.png", "Project backlog with boards, stories, statuses, assignees and task counts"),
  backlogBoard: live("backlog-board.png", "Project backlog showing another board's stories"),
  backlogFilter: live("backlog-filter.png", "Backlog filter by status and value"),
  storyDetail: live("story-detail.png", "Story panel with its tasks, estimates and actual time"),
  taskDetail: live("task-detail.png", "Task panel with links, remarks and actual time logs next to its story"),
  backlogEmpty: live("backlog-empty.png", "Backlog empty state"),
  projectPlan: live("project-plan.png", "Project plan showing a member's tasks for a date range"),
  holidays: live("holidays.png", "Holiday calendar"),
  activityLog: live("activity-log.png", "Activity log"),
  teams: live("teams-integration.png", "Profile with Microsoft Teams integration authorised"),
  conceptDashboard: design("dashboard.png", "Early concept: Today's Tasks dashboard with status tiles, project contribution and blocked tasks"),
  conceptEod: design("eod-report.png", "Early concept: end-of-day report with achieved goals and difficulties", 1020),
  conceptSignup: design("signup-early.png", "Early concept: sign-up screen under the working name Planoday"),
} satisfies Record<string, Shot>;
