import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { User } from "@prisma/client";
import { useState } from "react";
import { SuperAdminGuard } from "../../../guards/SuperAdminGuard";

export default function PromoteMenu({ user, session }: { user: User, session: User | null }) {
    const role = session?.role || 'guest';
    const [currentSelectRole, setRole] = useState(user?.role || 'user');

    if (!SuperAdminGuard(role) || user?.role === 'superadmin') {
        return null;
    }

    function changeRole(event: SelectChangeEvent) {
        event.preventDefault();
        const target = event.target as HTMLSelectElement;
        const value = target.value;
        setRole(value);
    }

    return (
        <FormControl
            fullWidth
            component="form"
            method="POST"
            action={`/api/profile/${user.id}/role`}
        >
            {/* <InputLabel id="change-role">Change {user.name}'s role</InputLabel> */}
            <Select
                name="role"
                labelId="change-role"
                id="role"
                value={currentSelectRole}
                onChange={changeRole}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="writer">Writer</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
            </Select>
            <Button type="submit" variant="contained">Change role</Button>
        </FormControl>
    );
}