import { useI18n } from "vue-i18n";
import { NPCs, NPCsID } from "../../core/npc";

export default function ({ npcid, onclick }: { npcid: NPCsID, onclick: (id: NPCsID) => void }) {
    const { t } = useI18n()
    const npc = NPCs[npcid];
    return (<a onClick={() => onclick(npcid)}>{ t("npc.select." + npc.selectType, [t(npc.name)])}</a>)
}