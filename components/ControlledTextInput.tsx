import { Controller, useController } from "react-hook-form";
import { Text, TextInput, TextInputProps } from "react-native";

type Props = {
  label: string;
  name: string;
  control: any;
  errors: any;
} & TextInputProps;

const ControlledTextInput = ({
  label,
  name,
  control,
  errors,
  ...textInputProps
}: Props) => {
  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    name,
  });

  return (
    <>
      <Text className="mt-12 color-slate-600">{label}</Text>

      <TextInput
        {...textInputProps}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        className="mb-4 px-4 py-4 rounded-xl border border-slate-400"
      />

      {errors[name] && (
        <Text className="color-red-500">*{errors[name].message}</Text>
      )}
    </>
  );
};

export default ControlledTextInput;
