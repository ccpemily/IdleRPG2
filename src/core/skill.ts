import { RegistryClass, createRegistry } from "./staticregistry";

export class PlayerSkill extends RegistryClass<string> {

}

export const PlayerSkills = createRegistry({
    "default": new PlayerSkill()
});

export type PlayerSkillID = keyof typeof PlayerSkills;