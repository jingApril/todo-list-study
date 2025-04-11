import React from  "react";
import {useSettings} from "../contexts/SettingsContext";

function Settings() {
    const {
        hideCompleted,
        handleToggleHideCompleted,
        handleClearCompleted,
      } = useSettings();
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4"> 设置</h2>
            <div className="space-y-4">
                <div>
                    <label className="flex items-center gap-2">
                        <input 
                        type="checkbox"
                        checked = {hideCompleted}
                        onChange = {handleToggleHideCompleted}
                         /> 隐藏已完成任务
                    </label>
                </div>
                <button
                    onClick = {handleClearCompleted}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    清除所有已完成任务
                </button>
            </div>
        </div>
    )
}


export default Settings;