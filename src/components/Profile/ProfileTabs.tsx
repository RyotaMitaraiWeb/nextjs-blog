import { Box, Tab, Tabs } from "@mui/material";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { IUser } from "../../../types/types";
import UserArticles from "./Tabs/Articles";
import GeneralInfo from "./Tabs/General";

export default function Profile({ user, session }: { user: IUser, session: User | null }) {
    const [value, setValue] = useState(0);

    function changeTab(event: React.SyntheticEvent, newValue: number) {
        setValue(newValue);
    }

    return (
        <div>
            <Box sx={{background: 'rgba(217, 217, 217, 0.69)'}}>
                <Tabs
                    indicatorColor="secondary"
                    onChange={changeTab}
                    value={value}
                    variant="fullWidth"
                >
                    <Tab value={0} label="General" />
                    <Tab value={1} label="Articles" />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GeneralInfo user={user} session={session} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserArticles user={user} />
            </TabPanel>
        </div>
    );
}

function TabPanel({ value, index, children }: { value: number, index: number, children: JSX.Element}) {
    if (value !== index) {
        return null;
    }

    return children;
}