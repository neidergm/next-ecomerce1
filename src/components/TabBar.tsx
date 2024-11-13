'use client';

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {
    tabOptions?: number[];
    currentTab: number;
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab }: Props) => {

    const [selected, setSelected] = useState(currentTab);
    const router = useRouter();

    const onSelectTab = (index: number) => {
        setSelected(index);
        Cookies.set('cartCurrentTab', index.toString());
        router.refresh();
    }

    return (
        <div className={`flex w-full space-x-2 rounded-xl bg-white p-2`}>

            {tabOptions.map((option) => (
                <div key={option} className="w-full" onClick={() => onSelectTab(option)}>
                    <input
                        readOnly
                        type="radio"
                        id={option.toString()}
                        className="peer hidden"
                        checked={selected === option}
                    />
                    <label className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                        {option}
                    </label>
                </div>
            ))}
        </div>
    )
}