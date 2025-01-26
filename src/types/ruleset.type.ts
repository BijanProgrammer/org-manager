export type RuleSet = {
  name: string;
  target?: "tag" | "branch" | "push";
  enforcement: "active" | "disabled" | "evaluate";
  bypass_actors: {
    actor_id?: number | null | undefined;
    actor_type:
      | "Integration"
      | "OrganizationAdmin"
      | "RepositoryRole"
      | "Team"
      | "DeployKey";
    bypass_mode: "pull_request" | "always";
  }[];
  conditions: {
    ref_name: { exclude: string[]; include: string[] };
  };
  rules: never[];
};
