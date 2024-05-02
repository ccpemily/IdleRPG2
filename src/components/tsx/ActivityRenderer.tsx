import { useI18n } from "vue-i18n";
import { Activities, ActivityID } from "../../core/activity";
import { mainLogic } from "../../main";

export default function ({ id, onstop }: { id: ActivityID, onstop: () => void}) {
    const { t } = useI18n()
    return (
        <div>
            <ul class="menu">
                <li><a>
                        {
                            (() => {
                                return t(Activities[id].textWhenDoing) + '.'.repeat(Math.floor(mainLogic.uiclock / 2) % 4)
                            })()
                        }
                </a></li>
                <li><a class="italic">
                        {
                            (() => {
                                return t(Activities[id].description) + (Activities[id].tickCooldown >= 0 ? t("activity.remains", [Activities[id].tickCooldown]) : "")
                            })()
                        }
                </a></li>
                <li><a onClick={() => {onstop()}}>{
                            (() => {
                                return t(Activities[id].textWhenStop)
                            })()
                        }
                </a></li>
            </ul>
        </div>
    )
}