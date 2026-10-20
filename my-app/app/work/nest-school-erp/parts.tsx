import Image from "next/image";
import type { Shot } from "../_kit/parts";
import { BrowserFrame } from "../_kit/parts";
import n from "./nest.module.css";

const APP = "/case-studies/nest/app";
const LANDING = "/case-studies/nest/landing";

// Desktop captures are 1440×900 at 2x; full-page and device variants carry their own sizes.
const app = (file: string, alt: string, w = 2880, h = 1800): Shot => ({ src: `${APP}/${file}`, alt, w, h });
const landing = (file: string, alt: string, w: number, h: number): Shot => ({ src: `${LANDING}/${file}`, alt, w, h });

export const shots = {
  login: app("login.png", "Nest sign-in screen with a school photo panel"),
  dashboard: app("dashboard.png", "Dashboard with school banner, quick actions, KPI tiles and pending actions"),
  addStaff: app("dashboard-add-staff.png", "Add Staff dialog choosing teaching, transport or supporting staff"),
  dashboardTablet: app("dashboard-tablet.png", "Dashboard on a tablet", 2048, 1536),
  dashboardMobile: app("dashboard-mobile.png", "Dashboard on a phone with a bottom tab bar", 780, 1688),
  students: app("students-list.png", "Students table with search, filters and bulk actions"),
  studentFilters: app("students-filters.png", "Students filter drawer by grade, section, transport and programme"),
  studentProfile: app("student-profile.png", "Student profile with tabs for personal details, attendance, fees, transport and documents"),
  studentAttendance: app("student-attendance.png", "Student attendance KPIs and monthly calendar"),
  studentFees: app("student-fees.png", "Student fee details with instalments and payment status"),
  addStudent: app("add-student.png", "Add New Student, step 1 of 7: personal details"),
  grades: app("grades-list.png", "Grades and sections overview"),
  logAttendance: app("log-attendance.png", "Log Attendance sheet with mark-all-present and tick/cross per student"),
  teacherAttendance: app("teacher-attendance.png", "Teacher profile attendance calendar"),
  transport: app("transport-vehicles.png", "Transportation vehicles with capacity and assigned staff"),
  reportCard: app("report-card.png", "Student progress report card with subject-wise marks"),
  feeReceipts: app("fee-receipts.png", "Fee receipts table with search and filters"),
  feeReceipt: app("fee-receipt.png", "Payment receipt detail dialog"),
  feeTemplates: app("fee-templates.png", "Fee configuration templates"),
  feeTemplateNew: app("fee-template-new.png", "Create fee template form"),
  pendingFees: app("pending-fees.png", "Pending fees list with reminders"),
  notices: app("notices.png", "Create Notice editor with audience targeting and previous notices"),
  holidays: app("holidays-calendar.png", "Holidays and events calendar"),
  roles: app("roles-permissions.png", "Roles and permissions by module"),

  lpHero: landing("hero.png", "Redesigned Nest landing page hero", 2880, 1800),
  lpFull: landing("home-full.png", "The full redesigned Nest landing page", 2880, 16344),
  lpValue: landing("value-at-glance.png", "Landing section: value at a glance", 2880, 1332),
  lpRoles: landing("for-every-role.png", "Landing section: tailored tools for every role", 2880, 1784),
  lpParent: landing("parent-app.png", "Landing section: the Nest parent app", 2880, 2598),
  lpBelieve: landing("what-we-believe.png", "About page: what we believe", 2752, 1822),
  lpFees: landing("feature-fees.png", "Features page: fees and receipts", 2560, 900),
  lpPricing: landing("pricing.png", "Pricing page plans", 2432, 3260),
} satisfies Record<string, Shot>;

export type ShotKey = keyof typeof shots;

/** Main browser window with an optional smaller one overlapping its corner. */
export function Stack({
  main,
  sub,
  url = "nest.emmple.com",
  flip = false,
}: {
  main: ShotKey;
  sub?: ShotKey;
  url?: string;
  flip?: boolean;
}) {
  return (
    <div className={`${n.stack} ${sub ? n.stackHasSub : ""} ${flip ? n.stackFlip : ""}`}>
      <BrowserFrame shot={shots[main]} url={url} className={n.stackMain} />
      {sub && (
        <div className={n.stackSub}>
          <BrowserFrame shot={shots[sub]} sizes="(max-width: 1024px) 60vw, 420px" />
        </div>
      )}
    </div>
  );
}

/** A phone-sized capture inside a simple device bezel. */
export function Phone({ k, className = "" }: { k: ShotKey; className?: string }) {
  const sh = shots[k];
  return (
    <div className={`${n.phone} ${className}`}>
      <Image src={sh.src} alt={sh.alt} width={sh.w} height={sh.h} sizes="(max-width: 768px) 40vw, 240px" className="block w-full h-auto" />
    </div>
  );
}

/** A tall page that scrolls inside its window on hover/focus (and is plainly scrollable on touch). */
export function ScrollingPage({ k }: { k: ShotKey }) {
  const sh = shots[k];
  return (
    <figure className={n.scrollWin} tabIndex={0} aria-label={`${sh.alt} — hover or focus to scroll`}>
      <div className={n.scrollBar} aria-hidden>
        <i />
        <i />
        <i />
        <span>nest by emmple — landing</span>
      </div>
      <div className={n.scrollView}>
        <Image src={sh.src} alt={sh.alt} width={sh.w} height={sh.h} sizes="(max-width: 1024px) 92vw, 560px" className={n.scrollImg} />
      </div>
    </figure>
  );
}

export function NestLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <>
      <Image src="/case-studies/nest/nest-logo.svg" alt="Nest" width={420} height={139} className={`${className} show-in-light`} />
      <Image src="/case-studies/nest/nest-logo-dark.svg" alt="Nest" width={420} height={139} className={`${className} show-in-dark`} />
    </>
  );
}
