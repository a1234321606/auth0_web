import React, {
  useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface IOpenProps {
  message: string
  severity: AlertColor
}

const useNotification = () => {
  const ref: any = useRef();

  const open = (props: IOpenProps) => {
    if (ref.current) {
      ref.current.open(props);
    }
  };

  return {
    ref,
    open,
  };
};

export default forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [seve, setSeve] = useState<AlertColor>();
  const [msg, setMsg] = useState<string>();

  useImperativeHandle(ref, () => ({
    open({ message, severity }: IOpenProps) {
      setIsOpen(true);
      setSeve(severity);
      setMsg(message);

      // autoHideDuration doesn't work when duration is less that 6s
      setTimeout(() => setIsOpen(false), 5000);
    },
  }));

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={5000}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Alert severity={seve} onClose={() => setIsOpen(false)}>{msg}</Alert>
    </Snackbar>
  );
});
export {
  useNotification,
};
