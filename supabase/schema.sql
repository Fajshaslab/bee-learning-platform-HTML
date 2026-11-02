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

-- BEE 2.2: apply the authoritative assessment upgrade for NEW installations.
-- BEE 2.2: strictere technische beoordeling van NIEUWE afrondingen.
-- Veilig uit te voeren na het bestaande schema; geen DELETE, DROP TABLE, of wijziging aan bestaande voortgang.
-- Vereist: eigenaar met recht om public.submit_lesson te vervangen (Supabase SQL Editor).
begin;

-- Deze functie draait alleen onder de eigenaar van submit_lesson.
-- Niet aanroepen via publieke RPC; geen privileges voor anon/authenticated/PUBLIC.
create or replace function public.bee_validate_exercise(
  p_lesson_id text, p_rule text, p_html text, p_css text, p_js text
) returns boolean language plpgsql immutable set search_path = '' as $validator$
declare
 v_html text := regexp_replace(coalesce(p_html,''), '<!--.*?-->', '', 'gs');
 v_css text := regexp_replace(coalesce(p_css,''), '/\*.*?\*/', '', 'gs');
 v_js text := regexp_replace(coalesce(p_js,''), '/\*.*?\*/', '', 'gs');
 v_fields text[] := string_to_array(p_rule,':');
 v_tag text; v_mat text[]; v_other text[]; v_attrs text;
 v_link text; v_alt text; v_id text; v_label text; v_prop text; v_val text;
 v_selectors text; v_kind text; v_found boolean;
begin
 if p_rule is null or p_lesson_id is null then return false; end if;
 if left(p_rule,4)='css:' then
   if array_length(v_fields,1)=2 then
     return v_css ~* '@media[[:space:]]*\([^)]*(max-width|min-width|width)[^)]*\)[[:space:]]*\{.*\{[[:space:]]*[^{}]+:[^{}]+\}';
   end if;
   if array_length(v_fields,1)<>3 then return false; end if;
   for v_mat in select regexp_matches(v_css, '([^{}]+)\{([^{}]*)\}', 'g') loop
     v_selectors:=v_mat[1]; v_prop:=v_fields[3];
     if not exists (
       select 1 from unnest(string_to_array(v_selectors,',')) s
       where btrim(s)=v_fields[2]
     ) then continue; end if;
     v_val:=substring(v_mat[2] from ('(?:^|;)[[:space:]]*'||v_prop||'[[:space:]]*:[[:space:]]*([^;{}]+)'));
     if v_val is null then continue; end if;
     v_val:=lower(btrim(v_val));
     if v_val in ('','none','initial','unset','revert','inherit','invalid','undefined','todo','xxx','placeholder') then continue; end if;
     if v_prop='display' then
       if v_fields[2]='.container' and v_val not in ('flex','inline-flex') then continue; end if;
       if v_fields[2]='.grid' and v_val not in ('grid','inline-grid') then continue; end if;
       if v_val not in ('flex','inline-flex','grid','inline-grid') then continue; end if;
     end if;
     if v_prop='flex-direction' and v_val not in ('row','row-reverse','column','column-reverse') then continue; end if;
     if v_prop in ('padding','gap') and v_val !~ '[0-9]|(var|calc|clamp)\(' then continue; end if;
     if v_prop='border' and v_val !~* '(solid|dashed|dotted|double|groove|ridge|inset|outset)' then continue; end if;
     if v_prop in ('color','background-color') and v_val !~* '^(#[0-9a-f]{3,8}|(rgb|hsl|oklch|lab|color|var)[[:space:]]*\(|[a-z]+$)' then continue; end if;
     return true;
   end loop;
   return false;
 end if;

 if left(p_rule,3)='js:' then
   -- Eerst strings maskeren: API-namen binnen letterlijke tekst zijn geen code.
   v_js:=regexp_replace(v_js, $rx$"[^"]*"$rx$, '"tekst"', 'g');
   v_js:=regexp_replace(v_js, $rx$'[^']*'$rx$, $$'tekst'$$, 'g');
   v_js:=regexp_replace(v_js, '//[^\n]*', '', 'g');
   v_kind:=v_fields[2];
   if btrim(v_js)='' then return false; end if;
   if v_kind='console.log' then
     if v_js !~ 'console[[:space:]]*\.[[:space:]]*log[[:space:]]*\([[:space:]]*[^)[:space:]][^)]*\)' then return false; end if;
     if p_lesson_id='m7-l5' then
       -- Deze les vraagt specifiek een gedeclareerde variabele in console.log.
       for v_mat in select regexp_matches(v_js, '(const|let|var)[[:space:]]+([a-zA-Z_$][a-zA-Z0-9_$]*)[[:space:]]*=[[:space:]]*[^;\n]+', 'g') loop
         if v_js ~ ('console[[:space:]]*\.[[:space:]]*log[[:space:]]*\([^)]*\m'||v_mat[2]||'\M[^)]*\)') then return true; end if;
       end loop;
       return false;
     end if;
     return true;
   elsif v_kind='const' then
     return v_js ~ '\mconst[[:space:]]+[a-zA-Z_$][a-zA-Z0-9_$]*[[:space:]]*=[[:space:]]*[^;[:space:]\n]';
   elsif v_kind='boolean' then
     return v_js ~ '\m(const|let|var)[[:space:]]+[a-zA-Z_$][a-zA-Z0-9_$]*[[:space:]]*=[[:space:]]*(true|false)\M';
   elsif v_kind='if' then
     return v_js ~ '\mif[[:space:]]*\([[:space:]]*[^)[:space:]][^)]*\)[[:space:]]*\{[[:space:]]*[^}[:space:]]';
   elsif v_kind='function' then
     return v_js ~ '\mfunction[[:space:]]+[a-zA-Z_$][a-zA-Z0-9_$]*[[:space:]]*\([^)]*\)[[:space:]]*\{[[:space:]]*[^}[:space:]]'
       or v_js ~ '(\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)[[:space:]]*=>[[:space:]]*(\{[[:space:]]*[^}[:space:]]|[^[:space:]])';
   elsif v_kind='array' then
     return v_js ~ '\m(const|let|var)[[:space:]]+[a-zA-Z_$][a-zA-Z0-9_$]*[[:space:]]*=[[:space:]]*\[[[:space:]]*[^][:space:]]';
   elsif v_kind='object' then
     return v_js ~ '\m(const|let|var)[[:space:]]+[a-zA-Z_$][a-zA-Z0-9_$]*[[:space:]]*=[[:space:]]*\{[[:space:]]*[a-zA-Z_$"'']+[[:space:]]*:[[:space:]]*[^}[:space:]]';
   elsif v_kind='querySelector' then
     return v_js ~ 'document[[:space:]]*\.[[:space:]]*querySelector[[:space:]]*\([[:space:]]*["''][^"'']+["''][[:space:]]*\)';
   elsif v_kind='addEventListener' then
     return v_js ~ '\.[[:space:]]*addEventListener[[:space:]]*\([[:space:]]*["''][a-z]+["''][[:space:]]*,[[:space:]]*(function|\([^)]*\)[[:space:]]*=>|[a-zA-Z_$][a-zA-Z0-9_$]*)';
   end if;
   return false;
 end if;

 -- HTML-commentaar, lege tags en ontbrekende sluittags mogen geen voortgang opleveren.
 if p_lesson_id='m2-l4' then
   for v_mat in select regexp_matches(v_html, '<img[[:space:]]+([^>]*)>', 'gi') loop
     v_attrs:=v_mat[1];
     v_link:=coalesce(substring(v_attrs from $rx$src[[:space:]]*=[[:space:]]*"([^"]+)"$rx$),
       substring(v_attrs from $rx$src[[:space:]]*=[[:space:]]*'([^']+)'$rx$),
       substring(v_attrs from $rx$src[[:space:]]*=[[:space:]]*([^"'[:space:]>]+)$rx$));
     v_alt:=coalesce(substring(v_attrs from $rx$alt[[:space:]]*=[[:space:]]*"([^"]+)"$rx$),
       substring(v_attrs from $rx$alt[[:space:]]*=[[:space:]]*'([^']+)'$rx$),
       substring(v_attrs from $rx$alt[[:space:]]*=[[:space:]]*([^"'[:space:]>]+)$rx$));
     if nullif(btrim(v_link),'') is not null and length(btrim(coalesce(v_alt,'')))>=4
        and lower(btrim(v_alt)) not in ('foto','image','afbeelding') then return true; end if;
   end loop;
   return false;
 end if;

 foreach v_tag in array string_to_array(p_rule,',') loop
   if v_tag='input' then
     if v_html !~* '<input[[:space:]>]' then return false; end if;
   elsif v_tag in ('h1','h2','p','li','td','th','label','a') then
     v_found:=false;
     for v_mat in select regexp_matches(v_html, '<'||v_tag||'([[:space:]][^>]*)?>(.*?)</'||v_tag||'[[:space:]]*>', 'gi') loop
       if btrim(regexp_replace(v_mat[2], '<[^>]*>', '', 'g'))<>'' then v_found:=true; exit; end if;
     end loop;
     if not v_found then return false; end if;
   else
     if v_html !~* ('<'||v_tag||'([[:space:]][^>]*)?>.*</'||v_tag||'[[:space:]]*>') then return false; end if;
   end if;
 end loop;

 if p_lesson_id in ('m1-l4','m2-l3') then
   for v_mat in select regexp_matches(v_html, '<a[[:space:]]+([^>]*)>(.*?)</a[[:space:]]*>', 'gi') loop
     v_attrs:=v_mat[1];v_label:=btrim(regexp_replace(v_mat[2], '<[^>]*>', '', 'g'));
     v_link:=coalesce(substring(v_attrs from $rx$href[[:space:]]*=[[:space:]]*"([^"]+)"$rx$),
       substring(v_attrs from $rx$href[[:space:]]*=[[:space:]]*'([^']+)'$rx$),
       substring(v_attrs from $rx$href[[:space:]]*=[[:space:]]*([^"'[:space:]>]+)$rx$));
     if v_link is null or v_link !~* '^https?://[a-z0-9.-]+(:[0-9]+)?(/|$|[?#])' then continue; end if;
     if p_lesson_id='m1-l4' and v_link !~* '^https?://example[.]com(/|$|[?#])' then continue; end if;
     if length(v_label)<8 or lower(v_label) in ('klik hier','hier','meer','link','website','click here') then continue; end if;
     return true;
   end loop;
   return false;
 end if;
 if p_lesson_id='m1-l5' and v_html !~* '<p([[:space:]][^>]*)?>[[:space:]]*[^<[:space:]][^<]*</p[[:space:]]*>' then return false; end if;
 if p_lesson_id in ('m1-l5','m2-l2','m2-l5','m8-l5') and
    v_html !~* '<ul([[:space:]][^>]*)?>.*<li([[:space:]][^>]*)?>[[:space:]]*[^<[:space:]][^<]*</li[[:space:]]*>.*</ul[[:space:]]*>' then return false; end if;
 if p_lesson_id='m3-l1' and v_html !~* '<main([[:space:]][^>]*)?>.*<section([[:space:]][^>]*)?>.*</section[[:space:]]*>.*</main[[:space:]]*>' then return false; end if;
 if p_lesson_id='m3-l2' and v_html !~* '<form([[:space:]][^>]*)?>.*<input[[:space:]>].*</form[[:space:]]*>' then return false; end if;
 if p_lesson_id='m3-l3' then
   for v_mat in select regexp_matches(v_html, '<label[[:space:]]+([^>]*)>([^<]+)</label[[:space:]]*>', 'gi') loop
     v_id:=coalesce(substring(v_mat[1] from $rx$for[[:space:]]*=[[:space:]]*"([^"]+)"$rx$),
       substring(v_mat[1] from $rx$for[[:space:]]*=[[:space:]]*'([^']+)'$rx$));
     if nullif(v_id,'') is null then continue; end if;
     for v_other in select regexp_matches(v_html, '<input[[:space:]]+([^>]*)>', 'gi') loop
       v_label:=coalesce(substring(v_other[1] from $rx$id[[:space:]]*=[[:space:]]*"([^"]+)"$rx$),
         substring(v_other[1] from $rx$id[[:space:]]*=[[:space:]]*'([^']+)'$rx$));
       if v_id=v_label then return true; end if;
     end loop;
   end loop;
   return false;
 end if;
 if p_lesson_id='m3-l4' and v_html !~* '<table([[:space:]][^>]*)?>.*<tr([[:space:]][^>]*)?>.*<th([[:space:]][^>]*)?>[^<]+</th[[:space:]]*>.*</tr[[:space:]]*>.*<tr([[:space:]][^>]*)?>.*<td([[:space:]][^>]*)?>[^<]+</td[[:space:]]*>.*</tr[[:space:]]*>.*</table[[:space:]]*>' then return false; end if;
 if p_lesson_id='m3-l5' and v_html !~* '<article([[:space:]][^>]*)?>.*<h2([[:space:]][^>]*)?>[^<]+</h2[[:space:]]*>.*<p([[:space:]][^>]*)?>[^<]+</p[[:space:]]*>.*</article[[:space:]]*>' then return false; end if;
 return true;
end;
$validator$;

revoke all on function public.bee_validate_exercise(text,text,text,text,text) from public,anon,authenticated;

-- Replaces only submit_lesson. Retains the existing session/sequence/security restrictions.
create or replace function public.submit_lesson(p_lesson_id text,p_html text,p_css text,p_js text)
returns jsonb language plpgsql security definer set search_path = '' as $submit$
declare v_user uuid := auth.uid(); v_position int; v_module text; v_rule text; v_missing int;
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

  if not public.bee_validate_exercise(p_lesson_id,v_rule,p_html,p_css,p_js) then
    return jsonb_build_object('ok',false,'message','Code voldoet nog niet aan alle technische eisen. Controleer de uitleg, attributen, structuur en waarden.');
  end if;
  insert into public.lesson_completions(user_id,lesson_id) values(v_user,p_lesson_id) on conflict do nothing;
  return jsonb_build_object('ok',true,'message','Les technisch geregistreerd.');
end;
$submit$;

revoke all on function public.submit_lesson(text,text,text,text) from public,anon;
grant execute on function public.submit_lesson(text,text,text,text) to authenticated;
-- Atomic smoke tests: 40 echte gidsvoorbeelden plus belangrijke foutgevallen.
-- Als een voorbeeld faalt wordt de hele transactie teruggedraaid.
do $smoke$
begin
  if not public.bee_validate_exercise($bee$m1-l1$bee$,$bee$h1,p$bee$,$bee$<h1>Welkom op mijn pagina</h1>
<p>Mijn browser laat deze tekst zien.</p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m1-l1'; end if;
  if not public.bee_validate_exercise($bee$m1-l2$bee$,$bee$h1,p$bee$,$bee$<h1>De drie webtalen</h1>
<p>HTML bouwt de structuur. CSS geeft stijl. JavaScript maakt interactie mogelijk.</p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m1-l2'; end if;
  if not public.bee_validate_exercise($bee$m1-l3$bee$,$bee$h1,p$bee$,$bee$<h1>Mijn bestanden</h1>
<p>index.html bevat de inhoud; style.css bevat de vormgeving.</p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m1-l3'; end if;
  if not public.bee_validate_exercise($bee$m1-l4$bee$,$bee$h1,a$bee$,$bee$<h1>Handige informatie</h1>
<p>Bekijk <a href="https://example.com">de voorbeeldwebsite Example Domain</a>.</p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m1-l4'; end if;
  if not public.bee_validate_exercise($bee$m1-l5$bee$,$bee$h1,ul,li$bee$,$bee$<h1>Mijn onderwerpen</h1>
<p>Dit wil ik leren:</p>
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m1-l5'; end if;
  if not public.bee_validate_exercise($bee$m2-l1$bee$,$bee$h1,p$bee$,$bee$<h1>Mijn reisblog</h1>
<p>Hier schrijf ik over mijn reizen.</p>
<h2>Mijn favoriete stad</h2>
<p>Ik bezoek graag Gent.</p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m2-l1'; end if;
  if not public.bee_validate_exercise($bee$m2-l2$bee$,$bee$ul,li$bee$,$bee$<h1>Mijn ochtend</h1>
<ul>
  <li>Water drinken</li>
  <li>Ontbijten</li>
</ul>
<ol>
  <li>Opstaan</li>
  <li>Tanden poetsen</li>
</ol>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m2-l2'; end if;
  if not public.bee_validate_exercise($bee$m2-l3$bee$,$bee$a$bee$,$bee$<h1>Bronnen</h1>
<p><a href="https://developer.mozilla.org">Lees webdocumentatie op MDN</a></p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m2-l3'; end if;
  if not public.bee_validate_exercise($bee$m2-l4$bee$,$bee$img$bee$,$bee$<h1>Een foto</h1>
<img src="https://example.com/foto.jpg" alt="Een fietser op een brug">$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m2-l4'; end if;
  if not public.bee_validate_exercise($bee$m2-l5$bee$,$bee$h1,p,ul$bee$,$bee$<!doctype html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Mijn pagina</title>
</head>
<body>
  <h1>Welkom</h1>
  <p>Een alinea</p>
  <ul><li>HTML oefenen</li></ul>
</body>
</html>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m2-l5'; end if;
  if not public.bee_validate_exercise($bee$m3-l1$bee$,$bee$main,section$bee$,$bee$<main>
  <h1>Mijn website</h1>
  <section>
    <h2>Over mij</h2>
    <p>Ik leer webontwikkeling.</p>
  </section>
</main>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m3-l1'; end if;
  if not public.bee_validate_exercise($bee$m3-l2$bee$,$bee$form,input$bee$,$bee$<h1>Contact</h1>
<form>
  <input type="text" name="naam" placeholder="Je naam">
</form>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m3-l2'; end if;
  if not public.bee_validate_exercise($bee$m3-l3$bee$,$bee$label,input$bee$,$bee$<form>
  <label for="voornaam">Voornaam</label>
  <input id="voornaam" name="voornaam" type="text">
</form>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m3-l3'; end if;
  if not public.bee_validate_exercise($bee$m3-l4$bee$,$bee$table,td,th$bee$,$bee$<h1>Training</h1>
<table>
  <tr><th>Dag</th><th>Activiteit</th></tr>
  <tr><td>Maandag</td><td>Sporten</td></tr>
</table>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m3-l4'; end if;
  if not public.bee_validate_exercise($bee$m3-l5$bee$,$bee$article,h2,p$bee$,$bee$<h1>Mijn blog</h1>
<article>
  <h2>Waarom ik leer programmeren</h2>
  <p>Ik wil mijn eigen websites kunnen maken.</p>
</article>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m3-l5'; end if;
  if not public.bee_validate_exercise($bee$m4-l1$bee$,$bee$css:h1:color$bee$,$bee$<h1>Kleur mij</h1>$bee$,$bee$h1 {
  color: blue;
  font-size: 28px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m4-l1'; end if;
  if not public.bee_validate_exercise($bee$m4-l2$bee$,$bee$css:body:background-color$bee$,$bee$<h1>Mijn achtergrond</h1>$bee$,$bee$body {
  padding: 20px;
  background-color: lightyellow;
  color: #17191c;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m4-l2'; end if;
  if not public.bee_validate_exercise($bee$m4-l3$bee$,$bee$css:body:font-family$bee$,$bee$<h1>Leesbare tekst</h1><p>Goede typografie helpt.</p>$bee$,$bee$body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m4-l3'; end if;
  if not public.bee_validate_exercise($bee$m4-l4$bee$,$bee$css:p:padding$bee$,$bee$<h1>Boxmodel</h1><p>Ruimte om mij heen</p>$bee$,$bee$p {
  background: lightyellow;
  padding: 20px;
  margin: 16px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m4-l4'; end if;
  if not public.bee_validate_exercise($bee$m4-l5$bee$,$bee$css:p:border$bee$,$bee$<h1>Een kader</h1><p>Dit is een kaart</p>$bee$,$bee$p {
  padding: 16px;
  border: 2px solid #27364a;
  border-radius: 8px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m4-l5'; end if;
  if not public.bee_validate_exercise($bee$m5-l1$bee$,$bee$css:.container:display$bee$,$bee$<div class="container"><p>Links</p><p>Rechts</p></div>$bee$,$bee$.container {
  display: flex;
  gap: 16px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m5-l1'; end if;
  if not public.bee_validate_exercise($bee$m5-l2$bee$,$bee$css:.container:flex-direction$bee$,$bee$<div class="container"><p>A</p><p>B</p></div>$bee$,$bee$.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m5-l2'; end if;
  if not public.bee_validate_exercise($bee$m5-l3$bee$,$bee$css:.grid:display$bee$,$bee$<div class="grid"><p>1</p><p>2</p></div>$bee$,$bee$.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m5-l3'; end if;
  if not public.bee_validate_exercise($bee$m5-l4$bee$,$bee$css:@media$bee$,$bee$<h1>Responsive pagina</h1>$bee$,$bee$h1 { font-size: 30px; }

@media (max-width: 600px) {
  h1 { font-size: 22px; }
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m5-l4'; end if;
  if not public.bee_validate_exercise($bee$m5-l5$bee$,$bee$css:.container:gap$bee$,$bee$<div class="container"><p>Een</p><p>Twee</p></div>$bee$,$bee$.container {
  display: flex;
  gap: 24px;
}
.container p {
  padding: 12px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m5-l5'; end if;
  if not public.bee_validate_exercise($bee$m6-l1$bee$,$bee$js:console.log$bee$,$bee$<h1>JavaScript leren</h1>$bee$,$bee$$bee$,$bee$console.log("Hallo vanuit JavaScript!");$bee$) then raise exception 'BEE voorbeeld afgewezen: m6-l1'; end if;
  if not public.bee_validate_exercise($bee$m6-l2$bee$,$bee$js:const$bee$,$bee$<h1>Variabelen</h1>$bee$,$bee$$bee$,$bee$const voornaam = "Sam";
console.log(voornaam);$bee$) then raise exception 'BEE voorbeeld afgewezen: m6-l2'; end if;
  if not public.bee_validate_exercise($bee$m6-l3$bee$,$bee$js:boolean$bee$,$bee$<h1>Datatypes</h1>$bee$,$bee$$bee$,$bee$const naam = "Sam";
const leeftijd = 18;
const isStudent = true;$bee$) then raise exception 'BEE voorbeeld afgewezen: m6-l3'; end if;
  if not public.bee_validate_exercise($bee$m6-l4$bee$,$bee$js:if$bee$,$bee$<h1>Keuzes</h1>$bee$,$bee$$bee$,$bee$const heeftToegang = true;
if (heeftToegang) {
  console.log("Welkom!");
}$bee$) then raise exception 'BEE voorbeeld afgewezen: m6-l4'; end if;
  if not public.bee_validate_exercise($bee$m6-l5$bee$,$bee$js:function$bee$,$bee$<h1>Functies</h1>$bee$,$bee$$bee$,$bee$function begroet() {
  console.log("Hallo!");
}

begroet();$bee$) then raise exception 'BEE voorbeeld afgewezen: m6-l5'; end if;
  if not public.bee_validate_exercise($bee$m7-l1$bee$,$bee$js:array$bee$,$bee$<h1>Mijn lijst</h1>$bee$,$bee$$bee$,$bee$const hobbys = ["gamen", "sporten", "lezen"];
console.log(hobbys[0]);$bee$) then raise exception 'BEE voorbeeld afgewezen: m7-l1'; end if;
  if not public.bee_validate_exercise($bee$m7-l2$bee$,$bee$js:object$bee$,$bee$<h1>Objecten</h1>$bee$,$bee$$bee$,$bee$const persoon = {
  naam: "Sam",
  leeftijd: 18,
  actief: true
};
console.log(persoon.naam);$bee$) then raise exception 'BEE voorbeeld afgewezen: m7-l2'; end if;
  if not public.bee_validate_exercise($bee$m7-l3$bee$,$bee$js:querySelector$bee$,$bee$<h1 id="titel">DOM</h1>$bee$,$bee$$bee$,$bee$const titel = document.querySelector("#titel");
console.log(titel);$bee$) then raise exception 'BEE voorbeeld afgewezen: m7-l3'; end if;
  if not public.bee_validate_exercise($bee$m7-l4$bee$,$bee$js:addEventListener$bee$,$bee$<button>Klik</button>$bee$,$bee$$bee$,$bee$const knop = document.querySelector("button");
function toonBericht() {
  console.log("Geklikt!");
}
knop.addEventListener("click", toonBericht);$bee$) then raise exception 'BEE voorbeeld afgewezen: m7-l4'; end if;
  if not public.bee_validate_exercise($bee$m7-l5$bee$,$bee$js:console.log$bee$,$bee$<h1>Debugging</h1>$bee$,$bee$$bee$,$bee$const totaal = 2 + 3;
console.log("totaal:", totaal);$bee$) then raise exception 'BEE voorbeeld afgewezen: m7-l5'; end if;
  if not public.bee_validate_exercise($bee$m8-l1$bee$,$bee$h1,p$bee$,$bee$<h1>Mijn leerportfolio</h1>
<p>Dit heb ik deze week geleerd.</p>
<h2>Onderwerpen</h2>
<ul><li>HTML</li><li>CSS</li></ul>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m8-l1'; end if;
  if not public.bee_validate_exercise($bee$m8-l2$bee$,$bee$css:body:background-color$bee$,$bee$<h1>Mijn ontwerp</h1>$bee$,$bee$body {
  background-color: #f7f7f7;
  color: #17191c;
  padding: 16px;
}$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m8-l2'; end if;
  if not public.bee_validate_exercise($bee$m8-l3$bee$,$bee$js:function$bee$,$bee$<h1>Mijn interactie</h1>$bee$,$bee$$bee$,$bee$function begroet() {
  console.log("Welkom!");
}
const knop = document.querySelector("button");
knop.addEventListener("click", begroet);$bee$) then raise exception 'BEE voorbeeld afgewezen: m8-l3'; end if;
  if not public.bee_validate_exercise($bee$m8-l4$bee$,$bee$h1,p$bee$,$bee$<h1>Mijn eerste receptenwebsite</h1>
<p>Hier verzamel ik eenvoudige maaltijden voor studenten.</p>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m8-l4'; end if;
  if not public.bee_validate_exercise($bee$m8-l5$bee$,$bee$h1,ul$bee$,$bee$<h1>Plan: website over mijn hobby</h1>
<ul>
  <li>Doel: bezoekers informeren</li>
  <li>Doelgroep: beginners</li>
  <li>Onderdelen: intro, tips, contact</li>
</ul>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE voorbeeld afgewezen: m8-l5'; end if;
  if public.bee_validate_exercise($bee$m1-l4$bee$,$bee$h1,a$bee$,$bee$<h1>Hallo</h1><a>Bekijk de voorbeeldwebsite</a>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m1-l4'; end if;
  if public.bee_validate_exercise($bee$m1-l4$bee$,$bee$h1,a$bee$,$bee$<h1>Hallo</h1><a href="https://example.com">Klik hier</a>$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m1-l4'; end if;
  if public.bee_validate_exercise($bee$m2-l4$bee$,$bee$img$bee$,$bee$<img src="foto.png">$bee$,$bee$$bee$,$bee$$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m2-l4'; end if;
  if public.bee_validate_exercise($bee$m4-l1$bee$,$bee$css:h1:color$bee$,$bee$$bee$,$bee$/* h1 {color:red} */$bee$,$bee$$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m4-l1'; end if;
  if public.bee_validate_exercise($bee$m5-l1$bee$,$bee$css:.container:display$bee$,$bee$$bee$,$bee$.container{display:grid}$bee$,$bee$$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m5-l1'; end if;
  if public.bee_validate_exercise($bee$m6-l1$bee$,$bee$js:console.log$bee$,$bee$$bee$,$bee$$bee$,$bee$// console.log("Hallo")$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m6-l1'; end if;
  if public.bee_validate_exercise($bee$m6-l1$bee$,$bee$js:console.log$bee$,$bee$$bee$,$bee$$bee$,$bee$const fake = "console.log(123)";$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m6-l1'; end if;
  if public.bee_validate_exercise($bee$m7-l5$bee$,$bee$js:console.log$bee$,$bee$$bee$,$bee$$bee$,$bee$const totaal=42; console.log("hallo");$bee$) then raise exception 'BEE onjuiste code goedgekeurd: m7-l5'; end if;
end;
$smoke$;
commit;
