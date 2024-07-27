import { useState } from "react";

import { User, Session } from "@supabase/auth-js";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

// uppy imports

import { Dashboard } from "@uppy/react";
import { Uppy } from "@uppy/core";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@/styles/uppy.css";
import { enqueueSnackbar } from "notistack";

interface UploaderModalProps {
  open: boolean;
  handleClose: () => void;
  user: User;
  session: Session;
  setImageUrl: (url: string) => void;
}

interface UppyFile {
  id: string;
  name: string;
  type: string;
  meta: {
    [key: string]: any;
  };
}

export const UploaderModal = ({
  open,
  handleClose,
  user,
  session,
  setImageUrl,
}: UploaderModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1000 * 1000,
      },
    }).use(Tus, {
      endpoint:
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable",
      onBeforeRequest: (req, file) => {
        req.setHeader("Authorization", `Bearer ${session.access_token}`);
      },
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );

  const handleUpload = () => {
    if (uppy.getFiles().length === 0) {
      enqueueSnackbar("Please select a file to upload", {
        variant: "error",
      });
      return;
    }

    uppy.setFileMeta(uppy.getFiles()[0].id, {
      objectName: user?.id + "/posts/" + uppy.getFiles()[0].name,
    });

    uppy.upload();
  };

  uppy.on("file-added", (file) => {
    file.meta = {
      ...file.meta,
      bucketName: "images",
      contentType: file.type,
    };
  });

  uppy.on("upload-success", (file, response) => {
    setImageUrl(file?.meta.objectName as string);
    uppy.cancelAll();
    handleClose();
  });

  return (
    <Dialog
      sx={{ zIndex: "100 !important" }}
      PaperProps={{
        style: {
          minWidth: !isMobile ? "580px" : "",
          maxWidth: "580px",
        },
      }}
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className="w-full flex justify-between items-center">
        <Typography className="text-lg font-bold">Upload Image</Typography>
        <Tooltip title="Close">
          <IconButton onClick={handleClose}>
            <HighlightOffOutlinedIcon fontSize="large" color="error" />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent className="p-0" dividers>
        <Dashboard
          uppy={uppy}
          hideUploadButton
          proudlyDisplayPoweredByUppy={false}
        />
      </DialogContent>
      <DialogActions className="p-6">
        <Button
          onClick={handleUpload}
          className="py-3 px-4 bg-primary text-white text-sm font-bold normal-case hover:bg-primary/70 disabled:text-white disabled:opacity-50 md:py-2"
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
