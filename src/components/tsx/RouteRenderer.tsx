import { useI18n } from "vue-i18n";
import { LocationId, Locations, Routes } from "../../core/location";

export default function ({ from, to, onclick }: { from: LocationId, to: LocationId, onclick: ({ from, to }: { from: LocationId, to: LocationId }) => void }) {
    const { t } = useI18n()
    return (<li>
        <a onClick={() => {
            onclick({ from, to })
        }}>{
                (() => {
                    const route = Routes[from].find(r => r.dst == to);
                    return t(route.text, [t(Locations[to].name)])
                })()
            }</a>
    </li>)
}