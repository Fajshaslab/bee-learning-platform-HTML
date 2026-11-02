-- BEE Learning Platform - Supabase SQL migration
-- Apply once via Supabase SQL Editor. Set Auth > Providers > Email: Confirm email ON.
-- This is a designed schema, not a substitute for production security review.
create table if not exists public.lesson_catalog (
  lesson_id text primary key, module_id text not null,
  position integer not null unique check (position between 1 and 40),
  check_rule text not null
);
create table if not exists public.module_questions (
  module_id text not null, question_id text primary key, correct_answer integer not null check(correct_answer between 0 and 2)
);
create table if not exists public.lesson_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lesson_catalog(lesson_id),
  completed_at timestamptz not null default now(), primary key(user_id,lesson_id)
);
create table if not exists public.module_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  module_id text not null,
  completed_at timestamptz not null default now(), primary key(user_id,module_id)
);
create table if not exists public.student_drafts (
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null references public.lesson_catalog(lesson_id),
  html text not null default '', css text not null default '', js text not null default '',
  version integer not null default 1 check(version>=1), updated_at timestamptz not null default now(),
  primary key(user_id,exercise_id)
);
create index if not exists lesson_completions_user_idx on public.lesson_completions(user_id);
create index if not exists module_completions_user_idx on public.module_completions(user_id);
create index if not exists student_drafts_user_idx on public.student_drafts(user_id);

insert into public.lesson_catalog(lesson_id,module_id,position,check_rule) values
('m1-l1','m1',1,'h1,p'),
('m1-l2','m1',2,'h1,p'),
('m1-l3','m1',3,'h1,p'),
('m1-l4','m1',4,'h1,a'),
('m1-l5','m1',5,'h1,ul,li'),
('m2-l1','m2',6,'h1,p'),
('m2-l2','m2',7,'ul,li'),
('m2-l3','m2',8,'a'),
('m2-l4','m2',9,'img'),
('m2-l5','m2',10,'h1,p,ul'),
('m3-l1','m3',11,'main,section'),
('m3-l2','m3',12,'form,input'),
('m3-l3','m3',13,'label,input'),
('m3-l4','m3',14,'table,td,th'),
('m3-l5','m3',15,'article,h2,p'),
('m4-l1','m4',16,'css:h1:color'),
('m4-l2','m4',17,'css:body:background-color'),
('m4-l3','m4',18,'css:body:font-family'),
('m4-l4','m4',19,'css:p:padding'),
('m4-l5','m4',20,'css:p:border'),
('m5-l1','m5',21,'css:.container:display'),
('m5-l2','m5',22,'css:.container:flex-direction'),
('m5-l3','m5',23,'css:.grid:display'),
('m5-l4','m5',24,'css:@media'),
('m5-l5','m5',25,'css:.container:gap'),
('m6-l1','m6',26,'js:console.log'),
('m6-l2','m6',27,'js:const'),
('m6-l3','m6',28,'js:boolean'),
('m6-l4','m6',29,'js:if'),
('m6-l5','m6',30,'js:function'),
('m7-l1','m7',31,'js:array'),
('m7-l2','m7',32,'js:object'),
('m7-l3','m7',33,'js:querySelector'),
('m7-l4','m7',34,'js:addEventListener'),
('m7-l5','m7',35,'js:console.log'),
('m8-l1','m8',36,'h1,p'),
('m8-l2','m8',37,'css:body:background-color'),
('m8-l3','m8',38,'js:function'),
('m8-l4','m8',39,'h1,p'),
('m8-l5','m8',40,'h1,ul')
on conflict (lesson_id) do update set module_id=excluded.module_id,position=excluded.position,check_rule=excluded.check_rule;
insert into public.module_questions(module_id,question_id,correct_answer) values
('m1','m1-q1',1),
('m1','m1-q2',2),
('m1','m1-q3',0),
('m1','m1-q4',1),
('m1','m1-q5',2),
('m2','m2-q1',2),
('m2','m2-q2',0),
('m2','m2-q3',1),
('m2','m2-q4',2),
('m2','m2-q5',0),
('m3','m3-q1',0),
('m3','m3-q2',1),
('m3','m3-q3',2),
('m3','m3-q4',0),
('m3','m3-q5',1),
('m4','m4-q1',1),
('m4','m4-q2',2),
('m4','m4-q3',0),
('m4','m4-q4',1),
('m4','m4-q5',2),
('m5','m5-q1',2),
('m5','m5-q2',0),
('m5','m5-q3',1),
('m5','m5-q4',2),
('m5','m5-q5',0),
('m6','m6-q1',0),
('m6','m6-q2',1),
('m6','m6-q3',2),
('m6','m6-q4',0),
('m6','m6-q5',1),
('m7','m7-q1',1),
('m7','m7-q2',2),
('m7','m7-q3',0),
('m7','m7-q4',1),
('m7','m7-q5',2),
('m8','m8-q1',2),
('m8','m8-q2',0),
('m8','m8-q3',1),
('m8','m8-q4',2),
('m8','m8-q5',0)
on conflict (question_id) do update set module_id=excluded.module_id,correct_answer=excluded.correct_answer;

alter table public.lesson_catalog enable row level security;
alter table public.module_questions enable row level security;
alter table public.lesson_completions enable row level security;
alter table public.module_completions enable row level security;
alter table public.student_drafts enable row level security;

revoke all on public.lesson_catalog,public.module_questions,public.lesson_completions,public.module_completions,public.student_drafts from public,anon,authenticated;
grant select on public.lesson_catalog,public.lesson_completions,public.module_completions,public.student_drafts to authenticated;
-- Question keys and answer data never exposed through direct table SELECT.
-- Grant no operations on module_questions to anon/authenticated.

drop policy if exists "lesson read own" on public.lesson_completions;
create policy "lesson read own" on public.lesson_completions for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists "module read own" on public.module_completions;
create policy "module read own" on public.module_completions for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists "draft read own" on public.student_drafts;
create policy "draft read own" on public.student_drafts for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists "catalog read authenticated" on public.lesson_catalog;
create policy "catalog read authenticated" on public.lesson_catalog for select to authenticated using (true);

-- Used by definer functions only. No direct progress writes are granted.
create or replace function public.submit_lesson(p_lesson_id text,p_html text,p_css text,p_js text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid(); v_position int; v_module text; v_rule text;
  v_missing int; v_token text; v_source text; v_parts text[]; v_valid boolean := true;
begin
  if v_user is null or not exists(select 1 from auth.users where id=v_user and email_confirmed_at is not null) then
    raise exception 'Eerst een geverifieerd account nodig';
  end if;
  if length(coalesce(p_html,''))>100000 or length(coalesce(p_css,''))>100000 or length(coalesce(p_js,''))>100000 then
    raise exception 'Code te groot';
  end if;
  select position,module_id,check_rule into v_position,v_module,v_rule
    from public.lesson_catalog where lesson_id=p_lesson_id;
  if v_position is null then raise exception 'Onbekende les'; end if;
  select count(*) into v_missing from public.lesson_catalog c
    where c.position < v_position
    and not exists(select 1 from public.lesson_completions p where p.user_id=v_user and p.lesson_id=c.lesson_id);
  if v_missing>0 then raise exception 'Eerdere lessen zijn nog niet afgerond'; end if;
  select count(*) into v_missing from (select distinct module_id from public.lesson_catalog where position < v_position) c
    where c.module_id <> v_module
    and not exists(select 1 from public.module_completions p where p.user_id=v_user and p.module_id=c.module_id);
  if v_missing>0 then raise exception 'Een eerdere modulecheck is nog niet afgerond'; end if;

  -- Technical form check only. Does not prove mastery or semantic correctness.
  v_parts := string_to_array(v_rule,':');
  if v_parts[1]='css' then
    v_source:=coalesce(p_css,'');
    if array_length(v_parts,1)=2 then
      v_valid := position(lower(v_parts[2]) in lower(v_source))>0;
    else
      v_valid := position(lower(v_parts[2]) in lower(v_source))>0
          and position(lower(v_parts[3])||':' in lower(v_source))>0;
    end if;
  elsif v_parts[1]='js' then
    v_source:=coalesce(p_js,'');
    if v_parts[2]='boolean' then v_valid:=v_source ~ '\m(true|false)\M';
    elsif v_parts[2]='function' then v_valid:=v_source ~ '(function|=>)';
    elsif v_parts[2]='array' then v_valid:=v_source ~ '\[[^]]*\]';
    elsif v_parts[2]='object' then v_valid:=v_source ~ '\{';
    else v_valid:=position(v_parts[2] in v_source)>0; end if;
  else
    foreach v_token in array string_to_array(v_rule,',') loop
      if lower(coalesce(p_html,'')) !~ ('<'||v_token||'([[:space:]>])') then v_valid:=false; end if;
    end loop;
  end if;
  if not v_valid then return jsonb_build_object('ok',false,'message','Vereiste broncode-onderdelen niet herkend.'); end if;
  insert into public.lesson_completions(user_id,lesson_id) values(v_user,p_lesson_id) on conflict do nothing;
  return jsonb_build_object('ok',true,'message','Les technisch geregistreerd.');
end;
$$;

create or replace function public.submit_module_check(p_module_id text,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid:=auth.uid(); v_number int; v_missing int; v_q record;
begin
  if v_user is null or not exists(select 1 from auth.users where id=v_user and email_confirmed_at is not null) then raise exception 'Geen bevestigd account'; end if;
  if p_module_id !~ '^m[1-8]$' then raise exception 'Onbekende module'; end if;
  v_number := substring(p_module_id from 2)::int;
  select count(*) into v_missing from public.lesson_catalog c where c.module_id=p_module_id
    and not exists(select 1 from public.lesson_completions l where l.user_id=v_user and l.lesson_id=c.lesson_id);
  if v_missing>0 then raise exception 'Niet alle lessen van deze module zijn afgerond'; end if;
  if v_number>1 and not exists(select 1 from public.module_completions where user_id=v_user and module_id='m'||(v_number-1)) then
    raise exception 'Voorgaande modulecheck nog niet afgerond';
  end if;
  if jsonb_typeof(p_answers)<>'object' then raise exception 'Ongeldig antwoordformaat'; end if;
  if (select count(*) from jsonb_object_keys(p_answers)) <> 5 then
    raise exception 'Beantwoord precies vijf vragen';
  end if;
  if (select count(*) from public.module_questions where module_id=p_module_id) <> 5 then
    raise exception 'Modulecheck heeft niet precies vijf geconfigureerde vragen';
  end if;
  for v_q in select question_id,correct_answer from public.module_questions where module_id=p_module_id loop
    if not (p_answers ? v_q.question_id) or p_answers->>v_q.question_id <> v_q.correct_answer::text then
      return jsonb_build_object('ok',false,'message','Nog niet alle antwoorden zijn correct. Probeer opnieuw.');
    end if;
  end loop;
  insert into public.module_completions(user_id,module_id) values(v_user,p_module_id) on conflict do nothing;
  return jsonb_build_object('ok',true,'message','Modulecheck geregistreerd.');
end;
$$;

create or replace function public.save_student_draft(
 p_exercise_id text,p_html text,p_css text,p_js text,p_expected_version integer
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid:=auth.uid(); v_current public.student_drafts%rowtype;
  v_position integer; v_module text; v_missing integer;
begin
  if v_user is null or not exists(
    select 1 from auth.users where id=v_user and email_confirmed_at is not null
  ) then raise exception 'Geverifieerd account vereist'; end if;
  select position,module_id into v_position,v_module
    from public.lesson_catalog where lesson_id=p_exercise_id;
  if v_position is null then raise exception 'Onbekende oefening'; end if;
  -- Drafts for locked lessons cannot be created via direct RPC calls.
  select count(*) into v_missing from public.lesson_catalog c
    where c.position < v_position
    and not exists(
      select 1 from public.lesson_completions p
      where p.user_id=v_user and p.lesson_id=c.lesson_id
    );
  if v_missing>0 then raise exception 'Eerdere lessen zijn nog niet afgerond'; end if;
  select count(*) into v_missing from (
    select distinct module_id from public.lesson_catalog where position < v_position
  ) c where c.module_id <> v_module
    and not exists(
      select 1 from public.module_completions p
      where p.user_id=v_user and p.module_id=c.module_id
    );
  if v_missing>0 then raise exception 'Eerdere modulecheck nog niet afgerond'; end if;
  if length(coalesce(p_html,''))>100000 or length(coalesce(p_css,''))>100000 or length(coalesce(p_js,''))>100000 then raise exception 'Code te groot'; end if;
  -- NULL must never bypass optimistic concurrency checks (NULL <> x is UNKNOWN in SQL).
  if p_expected_version is null or p_expected_version < 0 then
    raise exception 'Ongeldige verwachte revisie';
  end if;
  -- Serialize concurrent saves of the same user+exercise to enforce optimistic revision checks.
  perform pg_advisory_xact_lock(hashtextextended(v_user::text||':'||p_exercise_id,0));
  select * into v_current from public.student_drafts where user_id=v_user and exercise_id=p_exercise_id;
  if found then
    if v_current.version is distinct from p_expected_version then
      return jsonb_build_object('ok',false,'conflict',true,'version',v_current.version,
        'server',jsonb_build_object('html',v_current.html,'css',v_current.css,'js',v_current.js));
    end if;
    update public.student_drafts set html=coalesce(p_html,''),css=coalesce(p_css,''),js=coalesce(p_js,''),
      version=v_current.version+1,updated_at=now() where user_id=v_user and exercise_id=p_exercise_id;
    return jsonb_build_object('ok',true,'version',v_current.version+1);
  end if;
  if p_expected_version <> 0 then
    return jsonb_build_object('ok',false,'conflict',true,'version',0,'server',null);
  end if;
  insert into public.student_drafts(user_id,exercise_id,html,css,js)
    values(v_user,p_exercise_id,coalesce(p_html,''),coalesce(p_css,''),coalesce(p_js,''));
  return jsonb_build_object('ok',true,'version',1);
end;
$$;

revoke all on function public.submit_lesson(text,text,text,text) from public,anon;
revoke all on function public.submit_module_check(text,jsonb) from public,anon;
revoke all on function public.save_student_draft(text,text,text,text,integer) from public,anon;
grant execute on function public.submit_lesson(text,text,text,text) to authenticated;
grant execute on function public.submit_module_check(text,jsonb) to authenticated;
grant execute on function public.save_student_draft(text,text,text,text,integer) to authenticated;

-- Own-account deletion: authenticated caller may delete ONLY their own Auth user.
-- FK ON DELETE CASCADE removes associated BEE progress and drafts.
-- This deliberately cannot delete another user's account.
create or replace function public.delete_my_account()
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_user uuid := auth.uid();
begin
  if v_user is null then raise exception 'Inloggen vereist'; end if;
  delete from auth.users where id = v_user;
  if not found then raise exception 'Account niet gevonden'; end if;
  return jsonb_build_object('ok',true);
end;
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
