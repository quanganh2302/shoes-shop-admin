"use client";

import { userOrigin } from "@/hooks/user-origin";
import { ApiAlert } from "./api-alert";

interface AplListProps {
  entityName: string;
  entityIdName: string;
}

export const ApiList: React.FC<AplListProps> = ({
  entityName,
  entityIdName,
}) => {
  const origin = userOrigin();
  const baseUrl = `${origin}/api`;
  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
