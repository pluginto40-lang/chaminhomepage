-- =============================================
-- 채민이 홈페이지 Supabase 테이블 설정
-- =============================================

-- posts 테이블 (편지/일기)
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  written_at date not null default current_date,
  is_public boolean default true,
  created_at timestamptz default now()
);

-- photos 테이블 (갤러리 사진)
create table if not exists photos (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  caption text,
  taken_at date,
  album_month text,
  created_at timestamptz default now()
);

-- milestones 테이블 (타임라인)
create table if not exists milestones (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  occurred_at date not null,
  emoji text default '⭐',
  created_at timestamptz default now()
);

-- RLS (Row Level Security) 활성화
alter table posts enable row level security;
alter table photos enable row level security;
alter table milestones enable row level security;

-- 공개 읽기 정책
create policy "누구나 공개 글 읽기 가능" on posts
  for select using (is_public = true);

create policy "누구나 사진 읽기 가능" on photos
  for select using (true);

create policy "누구나 타임라인 읽기 가능" on milestones
  for select using (true);

-- 인증된 사용자 쓰기 정책
create policy "인증된 사용자 글 관리" on posts
  for all using (auth.role() = 'authenticated');

create policy "인증된 사용자 사진 관리" on photos
  for all using (auth.role() = 'authenticated');

create policy "인증된 사용자 타임라인 관리" on milestones
  for all using (auth.role() = 'authenticated');

-- =============================================
-- Storage 버킷 설정 (Supabase Dashboard에서 수동으로)
-- =============================================
-- 1. Supabase Dashboard → Storage → New bucket
-- 2. 버킷 이름: photos
-- 3. Public bucket: 체크 (공개 버킷)
-- 4. Policies 탭에서:
--    - SELECT: 모두 허용 (public)
--    - INSERT/UPDATE/DELETE: authenticated만 허용
