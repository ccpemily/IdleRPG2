import { useI18n } from "vue-i18n";
import { Activities, ActivityID } from "../../core/activity";
import { mainLogic } from "../../main";

export default function ({ id, onstop }: { id: ActivityID, onstop: () => void}) {
    const { t } = useI18n()
    const act = Activities[id];
    return (
        <ul class="menu">
            <li><a>{ t(act.textWhenDoing) + '.'.repeat(Math.floor(mainLogic.uiframe / 2) % 4) }</a></li>
            <li><a class="italic text-gray-500">{ t(act.description) + (act.tickCooldown >= 0 ? t("activity.remains", [act.tickCooldown]) : "") }</a></li>
            <li><a onClick={() => {onstop()}}>{t(act.textWhenStop)}</a></li>
        </ul>
    )
}