"use client";

import { switchOrgAction } from "@/app/(app)/actions";

type OrgOption = { orgId: string; name: string };

export function OrgSwitcher({
  organizations,
  currentOrgId,
}: {
  organizations: OrgOption[];
  currentOrgId: string;
}) {
  if (organizations.length <= 1) {
    return <span className="text-sm font-medium">{organizations[0]?.name}</span>;
  }

  return (
    <form action={switchOrgAction}>
      <select
        name="orgId"
        defaultValue={currentOrgId}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-9 rounded-md border border-input bg-background px-2 text-sm"
      >
        {organizations.map((org) => (
          <option key={org.orgId} value={org.orgId}>
            {org.name}
          </option>
        ))}
      </select>
    </form>
  );
}
