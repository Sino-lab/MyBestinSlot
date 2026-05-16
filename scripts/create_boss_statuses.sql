-- Run this in your Supabase SQL editor
CREATE TABLE IF NOT EXISTS boss_statuses (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id   uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  boss_n     integer NOT NULL,
  is_killed  boolean NOT NULL DEFAULT false,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (group_id, boss_n)
);

-- Enable RLS
ALTER TABLE boss_statuses ENABLE ROW LEVEL SECURITY;

-- Members of the group can read
CREATE POLICY "members can read boss_statuses"
  ON boss_statuses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_members.group_id = boss_statuses.group_id
        AND group_members.battletag = auth.uid()::text
    )
  );

-- Only owner and co-admins with permission can write (enforced client-side; this allows all members to upsert for simplicity)
CREATE POLICY "members can upsert boss_statuses"
  ON boss_statuses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM group_members
      WHERE group_members.group_id = boss_statuses.group_id
        AND group_members.battletag = auth.uid()::text
    )
  );
