import { useI18n } from "vue-i18n";
import { mainLogic } from "../../main";
import { EntityAttributeType } from "../../core/entity/attribute";

export default function (
    { id, isallocating, allocatedperks, onattributeclick, canallocate }: 
    { 
        id: EntityAttributeType,
        isallocating: boolean,
        allocatedperks: {
            strength: number, constitution: number, dexterity: number, intelligence: number, wisdom: number, charisma: number, consumed: number
        }
        onattributeclick: (id: EntityAttributeType) => void;
        canallocate: (id: EntityAttributeType) => boolean
    }
) {
    const { t } = useI18n();
    const player = mainLogic.currentPlayer;
    return (
    <div class="tooltip tooltip-bottom flex flex-grow flex-1" data-tip={t('player.attribute.' + id + '.description')}>
    <button type="button" 
        class="btn rounded-none flex flex-col flex-1"
        disabled={isallocating && !canallocate(id)}
        onclick={() => onattributeclick(id)}
    >
        <span class="text-center">{ t("player.attribute." + id) }</span>
        <span class="text-center">{ player[id].base.toFixed(0) + (isallocating ? "(+" + allocatedperks[id] + ")" : '') }</span>
    </button>
    </div>)
}