import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react-native';
import { Input, type InputProps } from '@freshman-plus/ui';
import { colors } from '@/theme';

export interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'value' | 'onChangeText' | 'error'> {
  control: Control<T>;
  name: Path<T>;
  /** Adds the show/hide eye used on password fields. */
  secureToggle?: boolean;
}

export function FormInput<T extends FieldValues>({ control, name, secureToggle, ...rest }: FormInputProps<T>) {
  const [hidden, setHidden] = useState(true);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          {...rest}
          value={(value as string | undefined) ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          secureTextEntry={secureToggle ? hidden : rest.secureTextEntry}
          rightIcon={
            secureToggle ? (
              <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8} accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
                {hidden ? <Eye size={18} color={colors.text.muted} /> : <EyeOff size={18} color={colors.text.muted} />}
              </Pressable>
            ) : (
              rest.rightIcon
            )
          }
        />
      )}
    />
  );
}
