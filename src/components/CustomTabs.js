import React from 'react'
import { Tabs } from 'antd'

export const CustomTabs = ({ tabs, defaultActiveKey,activeKey,onChange }) => {

    const { TabPane } = Tabs;

    const handleChange =(e)=>{
        onChange(e)
    }

    return (
        <Tabs activeKey={activeKey} defaultActiveKey={defaultActiveKey} onChange={handleChange}>
            {tabs.map((tab, index) => (
                <TabPane key={index + 1} tab={tab.label}>
                    {tab.content}
                </TabPane>
            ))}
        </Tabs>
    )
}
