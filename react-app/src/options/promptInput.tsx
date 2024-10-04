import { useCallback, ChangeEvent, useState, useRef } from "react";
import { useImmer } from "use-immer";
import { Button } from "primereact/button";
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from "primereact/toast";
import { ColorPicker, ColorPickerChangeEvent } from 'primereact/colorpicker';
import {
    GrammarPrompt,
    SummaryPrompt,
    PromptConfig,
    DefinitionPrompt,
    generateIconAndColor,
} from "../utils/promptsUtils";
import { FillColorIcon, TextColorIcon } from "../utils/icons";


export function PromptInput({
    promptObj,
    onChange,
}: {
    promptObj: PromptConfig;
    onChange: Function;
}) {
    const toast = useRef<Toast>(null);
    const [localPromptObj, setLocalPromptObj] = useImmer(promptObj)
    const [isGenerating, setIsGenerating] = useState(false);
    const onChangePrompt = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            setLocalPromptObj(obj => {
                obj.prompt = e.target.value
            })
        },
        [setLocalPromptObj]
    );

    const onPredefinedPrompt = useCallback(
        (header: string, prompt: string) => {
            setLocalPromptObj(obj => {
                obj.prompt = prompt
                obj.header = header
            })
        },
        [setLocalPromptObj]
    );

    const onChangeHeader = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setLocalPromptObj(obj => {
                obj.header = e.target.value
            })
        },
        [setLocalPromptObj]
    );

    const onChangeIcon = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length <= 2) {
                setLocalPromptObj(obj => {
                    obj.icon = e.target.value
                })
            }
        },
        [setLocalPromptObj]
    )

    const onChangeBgColor = useCallback((e: ColorPickerChangeEvent) => {
        if (typeof e.value === "string") {
            setLocalPromptObj(obj => {
                obj.bgcolor = `#${e.value}`
            })
        }
    }, [setLocalPromptObj])

    const onChangeColor = useCallback((e: ColorPickerChangeEvent) => {
        if (typeof e.value === "string") {
            setLocalPromptObj(obj => {
                obj.color = `#${e.value}`
            })
        }
    }, [setLocalPromptObj])

    const onSave = useCallback(() => {
        onChange(localPromptObj);
    }, [localPromptObj]);

    const onAutoGenerate = useCallback(async () => {
        setIsGenerating(true);
        try {
            const { icon, bgcolor } = await generateIconAndColor(localPromptObj.prompt);
            setLocalPromptObj(obj => {
                obj.icon = icon;
                obj.bgcolor = bgcolor;
            });
        } catch (error) {
            console.error("Error generating icon and color:", error);
            if (toast.current) {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Generate icon and color failed, try again later.",
                });
            }
        } finally {
            setIsGenerating(false);
        }
    }, [localPromptObj.prompt, setLocalPromptObj]);

    return (
        <div className="cs-flex cs-flex-col">
            <Toast ref={toast} />
            <Fieldset legend="Title">
                <div className="cs-flex cs-items-center cs-mb-2 cs-gap-2">
                    <InputText
                        className="p-inputtext-sm"
                        value={localPromptObj.header}
                        onInput={onChangeHeader}
                    />
                </div>
            </Fieldset>
            <div className="cs-flex cs-gap-2">
            <Fieldset className="cs-mt-2 cs-w-1/2" legend="Prompt">
                <div>
                    <textarea
                        id="prompt"
                        className="cs-w-80 cs-block cs-text-sm cs-p-2 cs-rounded-md cs-border cs-border-gray-300 cs-h-40"
                        onChange={onChangePrompt}
                        value={localPromptObj.prompt}
                    />
                    <p className="cs-font-sans cs-text-teal-800">
                        {"{{text}} will be replaced with selected text"}
                    </p>
                </div>
            </Fieldset>
            <Fieldset className="cs-mt-2 cs-w-1/2 cs-relative" legend="Icon">
                <div className="cs-flex cs-flex-col cs-gap-2">
                    <div className="cs-flex cs-flex-row cs-gap-2 cs-items-center">
                        <FillColorIcon/>
                        <ColorPicker value={localPromptObj.bgcolor} onChange={onChangeBgColor}/>
                        <TextColorIcon/>
                        <ColorPicker value={localPromptObj.color} onChange={onChangeColor}/>
                    </div>
                    <div>Icon</div>
                    <InputText
                        style={{width: "2.8rem"}}
                        className="p-inputtext-sm"
                        value={localPromptObj.icon}
                        onChange={onChangeIcon}
                    />
                    <div>Preview</div>
                    <button className="cs-button" style={{backgroundColor: localPromptObj.bgcolor, color: localPromptObj.color }}>{localPromptObj.icon}</button>
                    <div className="cs-flex cs-justify-end">
                        <Button
                            className="p-button-rounded p-button-outlined p-button-info"
                            icon="pi pi-bolt"
                            onClick={onAutoGenerate}
                            tooltip="Auto-generate icon and color"
                            tooltipOptions={{ position: 'top' }}
                        />
                        {isGenerating && (
                            <div className="cs-absolute cs-inset-0 cs-bg-gray-100 cs-bg-opacity-50 cs-flex cs-items-center cs-justify-center">
                                <div className="cs-flex cs-flex-col cs-items-center">
                                <ProgressSpinner
                                    style={{width: '50px', height: '50px'}}
                                    strokeWidth="4"
                                    animationDuration=".5s"
                                />
                                <span className="rainbow-text">Summoning the perfect icon and colors...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Fieldset>
            </div>
            <div className="cs-relative">
                <button
                    id="grammer"
                    className="cs-my-2 cs-mr-2 cs-bg-blue-500 hover:cs-bg-blue-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Grammer", GrammarPrompt);
                    }}
                >
                    Grammar
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-green-500 hover:cs-bg-green-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Summary", SummaryPrompt);
                    }}
                >
                    Summary
                </button>
                <button
                    id="grammer"
                    className="cs-my-2 cs-mx-2 cs-bg-red-500 hover:cs-bg-red-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                    onClick={() => {
                        onPredefinedPrompt("Definition", DefinitionPrompt);
                    }}
                >
                    Definition
                </button>
                <div className="cs-absolute cs-right-0 cs-top-0 cs-my-2">
                    <Button
                        disabled={ localPromptObj == promptObj }
                        onClick={onSave}
                        icon="pi pi-save"
                    />
                </div>
            </div>
        </div>
    );
}
