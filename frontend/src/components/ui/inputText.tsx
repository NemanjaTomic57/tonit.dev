import { useFormContext } from "react-hook-form";
import InputValidationError from "./inputValidationError";

interface Props {
    label: string;
    inputName: string;
    button?: boolean;
}

export default function InputText({ label, inputName, button }: Props) {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    const value = watch(inputName);
    const errorMessage = errors[inputName]?.message as string;

    return (
        <div className="relative bg-gray-tint/10 border-1 border-gray-tint rounded-sm">
            {value === "" && (
                <label className="absolute  top-1/2 -translate-y-1/2 pointer-events-none text-gray-tint pl-5">
                    {label}
                </label>
            )}
            <input
                {...register(inputName)}
                type="text"
                className="h-full w-full py-3 px-5 outline-none"
            />
            {button && (
                <button className="btn-fill-primary rounded-sm absolute right-1 top-1 bottom-1 px-8 text-sm font-bold cursor-pointer">
                    Submit
                </button>
            )}

            <InputValidationError>{errorMessage}</InputValidationError>
        </div>
    );
}
