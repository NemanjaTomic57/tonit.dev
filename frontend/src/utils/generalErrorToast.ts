import toast from 'react-hot-toast';

export const generalErrorToast = () => {
    toast.error('Something went wrong...');
};

export const networkErrorToast = () => {
    toast.error('Network error. Please try again.');
};
