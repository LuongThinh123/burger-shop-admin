import { Role } from "@services/role";
import { BaseFilter, SearchType } from "@types";

export type RoleFilter = BaseFilter & {
  code?: string;
  name?: string;
  createdAtTo?: number;
  createdAtFrom?: number;
};

export type RoleForm = {
  open: boolean;
  role: Role | null;
};
