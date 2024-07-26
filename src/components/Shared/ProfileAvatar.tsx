import Avatar from "@mui/material/Avatar";

export const ProfileAvatar = ({
  username,
  avatarUrl,
}: {
  username: string;
  avatarUrl?: string;
}) => {
  return (
    <>
      {avatarUrl ? (
        <Avatar
          sx={{ width: 48, height: 48 }}
          src={avatarUrl}
          alt={`${username} avatar`}
        />
      ) : (
        <Avatar
          className="bg-primary text-white"
          sx={{ width: 48, height: 48 }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>
      )}
    </>
  );
};
