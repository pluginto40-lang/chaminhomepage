# 채민이 홈페이지 사용 가이드 🌸

## 시작하기 전에 해야 할 것

### 1단계: Supabase 테이블 만들기
1. https://supabase.com 접속 → 로그인
2. 프로젝트 선택 (ztjmuvkscnxivmqnsheb)
3. 왼쪽 메뉴 → SQL Editor
4. supabase_setup.sql 파일 내용 전체 복사
5. SQL Editor에 붙여넣기 → Run 버튼 클릭
6. "Success" 나오면 완료!

### 2단계: Storage 버킷 만들기 (사진 업로드용)
1. Supabase → Storage → New bucket
2. Name: photos
3. Public bucket: ✅ 체크
4. Create bucket 클릭

### 3단계: 관리자 계정 만들기
1. Supabase → Authentication → Users
2. Invite user 또는 Add user
3. 이메일/비밀번호 입력
4. 이 이메일/비번으로 /admin/login 접속

### 4단계: 개발 서버 실행
터미널에서:
```
cd chaemin-home
npm run dev
```
브라우저에서 http://localhost:3000 접속

## 페이지 안내

| 페이지 | 주소 | 설명 |
|--------|------|------|
| 메인 | / | 채민이 소개 |
| 갤러리 | /gallery | 사진 앨범 |
| 타임라인 | /timeline | 성장 기록 |
| 편지 | /letters | 부모님 편지 |
| 관리자 | /admin/login | 관리자 로그인 |

## 배포하기 (나중에)
1. GitHub에 코드 올리기
2. vercel.com에서 GitHub 연결
3. 환경변수 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) 입력
4. Deploy!
