-- This is an empty migration.
CREATE OR REPLACE FUNCTION prevent_self_manager()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW."managerId" = NEW.id THEN
    RAISE EXCEPTION 'MEMBERSHIP_SELF_MANAGER: An employee cannot be their own manager'
      USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_self_manager
BEFORE INSERT OR UPDATE ON "Membership"
FOR EACH ROW
EXECUTE FUNCTION prevent_self_manager();
