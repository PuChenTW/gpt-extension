import React from "react";
import { useFormik } from "formik";
import { ListBox } from "primereact/listbox";
import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";

interface blacklistitem {
    label: string;
    value: string;
}

function ItemTemplate(option: blacklistitem, onDelete: (option: blacklistitem) => void) {
    return (
        <div className="cs-flex cs-flex-row cs-items-center cs-justify-between">
            <div className="cs-break-all">{option.label}</div>
            <i className="pi pi-times-circle" onClick={() => onDelete(option)}></i>
        </div>
    );
}

export function BlackList() {
    const [blacklist, setBlacklist] = useImmer<blacklistitem[]>([]);

    useEffect(() => {
        chrome.storage.local.get({ blacklistDomain: [] }, ({ blacklistDomain }) => {
            setBlacklist(blacklistDomain);
        });
    }, [setBlacklist]);

    const formik = useFormik({
        initialValues: {
            value: "",
        },
        onSubmit: ({ value }) => {
            const matches = value.match(/^https?:\/\/(?<domain>[^/?#]+)(?:[/?#]|$)/i);
            const domain = (matches && matches[1]) || value;
            const update = [...blacklist, { label: domain, value: domain }];
            chrome.storage.local.set({ blacklistDomain: update });
            setBlacklist(update);
            formik.resetForm();
        },
    });

    const onDelete = useCallback(
        (option: blacklistitem) => {
            setBlacklist((blacklist) => {
                const newBlacklist = blacklist.filter((item) => item.value !== option.value);
                chrome.storage.local.set({ blacklistDomain: newBlacklist });
                return newBlacklist;
            });
        },
        [setBlacklist],
    );

    return (
        <div className="cs-flex cs-flex-col cs-gap-2">
            <form onSubmit={formik.handleSubmit} className="cs-flex cs-gap-2">
                <input
                    type="text"
                    id="value"
                    className="cs-block cs-rounded-md cs-border-0 cs-py-1.5 cs-pl-7 cs-pr-7 cs-text-gray-900 cs-ring-1 cs-ring-inset cs-ring-gray-300 placeholder:cs-text-gray-400 focus:cs-ring-2 focus:cs-ring-inset focus:cs-ring-indigo-600 sm:cs-text-sm sm:cs-leading-6"
                    onChange={(e) => {
                        formik.setFieldValue("value", e.target.value);
                    }}
                />
                <button
                    type="submit"
                    className="cs-mx-2 cs-bg-green-500 hover:cs-bg-green-700 cs-text-white cs-font-bold cs-py-2 cs-px-4 cs-rounded"
                >
                    Submit
                </button>
            </form>
            <ListBox
                options={blacklist}
                itemTemplate={(option: blacklistitem) => ItemTemplate(option, onDelete)}
            />
        </div>
    );
}
