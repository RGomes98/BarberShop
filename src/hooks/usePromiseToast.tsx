import { ToastLoadingState } from '@/components/ToastLoadingState';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type PromiseResponse = Promise<{ status: string; message: string }>;

export const usePromiseToast = () => {
  const { refresh } = useRouter();

  const createPromiseToast = <T,>(
    message: string,
    promise: T extends PromiseResponse[] ? T : PromiseResponse,
    onSuccess?: () => void,
  ) => {
    return toast.promise(Array.isArray(promise) ? promise[0] : promise, {
      loading: <ToastLoadingState loadingMessage={message} />,
      success: (response) => {
        refresh();
        if (onSuccess) onSuccess();
        return response.message;
      },
      error: (error) => error.message,
    });
  };

  return { createPromiseToast };
};
