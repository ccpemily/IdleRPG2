import { useI18n } from "vue-i18n";
import { Activities, ActivityID } from "../../core/activity";

export default function ({ activity, onclick }: { activity: ActivityID, onclick: (loc: ActivityID) => void }) {
    const { t } = useI18n()
    return (<li>
        <a onClick={() => {
            onclick(activity)
        }}>{
                (() => {
                    const act = Activities[activity];
                    return t(act.name)
                })()
            }</a>
    </li>)
}