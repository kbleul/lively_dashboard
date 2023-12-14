"use client";
import { Input } from "@/components/ui/input";
import cn from "@/utils/class-names";
import { useField, ErrorMessage } from "formik";
interface FormikInputProps {
  label: string;
  name: string;
  type?:
    | "number"
    | "text"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "url"
    | "week"
    | undefined;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  color?:
    | "DEFAULT"
    | "primary"
    | "secondary"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  prefix,
  suffix,
  className,
  inputClassName,
  color,
}) => {
  const [field] = useField(name);
  return (
    <div className="w-full">
      <div className="mt-1">
        <Input
          autoComplete="off"
          {...field}
          type={type}
          label={label}
          name={name}
          prefix={prefix}
          suffix={suffix}
          placeholder={placeholder}
          className={cn("[&>label>span]:font-medium ", className)}
          inputClassName={cn("text-sm ", inputClassName)}
          color={color}
        />
        <ErrorMessage
          name={name}
          component="div"
          className={"text-xs capitalize text-red-500 pt-1 font-medium"}
        />
      </div>
    </div>
  );
};

export default FormikInput;
