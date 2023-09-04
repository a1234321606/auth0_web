import React, {
  ReactElement, useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

interface IOpenProps {
  title?: string | ReactElement
  content?: string | ReactElement
  okDisabled?: boolean
  cancelDisabled?: boolean
  onOk?: () => void
  onCancel?: () => void
}

const useConfirm = () => {
  const ref: any = useRef();

  const open = (props: IOpenProps) => {
    if (ref.current) {
      ref.current.open(props);
    }
  };

  const close = () => {
    if (ref.current) {
      ref.current.close();
    }
  };

  return {
    ref,
    open,
    close,
  };
};

const Confirm = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<IOpenProps>({});

  useImperativeHandle(ref, () => ({
    open(openProps: IOpenProps) {
      setIsOpen(true);
      setOptions(openProps);
    },
    close() {
      setIsOpen(false);
    },
  }));

  return (
    <Dialog open={isOpen} onClose={options.onCancel}>
      {options.title && <DialogTitle>{options.title}</DialogTitle>}
      {options.content && <DialogContent>{options.content}</DialogContent>}
      <DialogActions>
        {options.onOk && <Button onClick={options.onOk}>OK</Button>}
        {options.onCancel && <Button onClick={options.onCancel} color="secondary">Cancel</Button>}
      </DialogActions>
    </Dialog>
  );
});
export default Confirm;
export {
  useConfirm,
};
