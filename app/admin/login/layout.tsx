// 로그인 페이지는 admin 사이드바 레이아웃을 사용하지 않고
// 전체 화면을 그대로 사용합니다.
// 단, Next.js App Router에서 nested layout은 parent를 대체하지 않고 중첩되므로
// admin/layout.tsx에서 x-pathname으로 분기 처리합니다.
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
