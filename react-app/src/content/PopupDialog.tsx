import { useState, useEffect } from 'react';
import { ChatGptButton, TranslateButton } from './Button'

export function PopupDialog({top="0px", left="0px", hide}: {top?: string, left?: string, hide: boolean}) {
    return (
        <div
            id="gpt-ex-dialog"
            style={{top, left, display: hide ? 'none' : 'flex'}}
        >
            <ChatGptButton onMouseUp={() => {}} hide={false}/>
            <TranslateButton onMouseUp={() => {}} hide={false}/>
        </div>
    )
}
