"use client";

import { MouseEvent, useState, useTransition } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { User } from "@supabase/auth-js";
import { logoutAction } from "@/actions/users";
import { Loader } from "./Loader";
import { ProfileAvatar } from "./ProfileAvatar";

export default function AccountMenu({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();

  const open = Boolean(anchorEl);

  const handleOpenAccountMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLogoutButton = () => {
    startTransition(async () => {
      const { errorMessage } = await logoutAction();

      if (errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: "8px",
        }}
      >
        <Tooltip title="Account">
          <IconButton
            onClick={handleOpenAccountMenu}
            size="small"
            sx={{ ml: 2 }}
          >
            <ProfileAvatar
              username={user.user_metadata["user_name"]}
              avatarUrl={user.user_metadata["avatar_url"]}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseAccountMenu}
        onClick={handleCloseAccountMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem className="pointer-events-none">
          Username: {user.user_metadata["user_name"]}
        </MenuItem>
        <MenuItem onClick={handleClickLogoutButton}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Loader open={isPending} />
    </>
  );
}
