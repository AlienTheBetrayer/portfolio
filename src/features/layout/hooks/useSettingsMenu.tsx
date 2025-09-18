import { usePopup } from "../../../shared/hooks/usePopup"
import { SettingsMenu } from "../../settings/components/SettingsMenu";

export const useSettingsMenu = (hideScrollbar: boolean) => {
    const menu = usePopup(<SettingsMenu onInteract={() => menu.setShown(false)}/>, () => menu.setShown(false), 1001, hideScrollbar);
    return menu;
}