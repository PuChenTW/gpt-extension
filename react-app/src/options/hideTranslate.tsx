import { useState, useEffect, useCallback } from "react";

import { Checkbox } from "primereact/checkbox";

export function HideGoogleTranslateCheckbox() {
    const [hideTranslate, setHideTranslate] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(
            {
                hideTranslate: false,
            },
            ({ hideTranslate }) => {
                setHideTranslate(hideTranslate);
            },
        );
    }, [setHideTranslate]);

    const onChangeHideTranslate = useCallback(
        (hideTranslate: boolean) => {
            setHideTranslate(hideTranslate);
            chrome.storage.local.set({ hideTranslate });
        },
        [setHideTranslate],
    );

    return (
        <Checkbox
            onChange={(e) => onChangeHideTranslate(!!e.checked)}
            checked={hideTranslate}
        ></Checkbox>
    );
}
