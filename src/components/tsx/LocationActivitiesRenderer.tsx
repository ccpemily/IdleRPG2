import { useI18n } from "vue-i18n";
import { Activities, ActivityID } from "../../core/activity";

export default function ({ activity, onclick }: { activity: ActivityID, onclick: (loc: ActivityID) => void }) {
    const { t } = useI18n()
    const act = Activities[activity];
    return (
        <a onClick={() => {onclick(activity)}}>{t(act.name)}</a>
    )
}